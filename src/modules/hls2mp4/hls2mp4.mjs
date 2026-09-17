import {EventEmitter} from '../eventemitter.mjs';
import {FSBlob} from '../FSBlob.mjs';
import {MP4} from './MP4Generator.mjs';
import Transmuxer from './transmuxer.mjs';


const safeStringify = (value) => {
  try {
    return JSON.stringify(value);
  } catch (err) {
    try {
      return JSON.stringify(value, (key, val) => {
        if (typeof val === 'number' && !Number.isFinite(val)) {
          return String(val);
        }
        return val;
      });
    } catch (_) {
      return '[Unserializable]';
    }
  }
};

const logHLS2 = (label, payload = {}) => {
  try {
    if (typeof HLS2MP4 !== 'undefined' && typeof HLS2MP4._externalLogger === 'function') {
      HLS2MP4._externalLogger(label, payload);
    }
  } catch (_) {}

  try {
    console.log(`🎬 HLS2MP4 ${label}`, payload);
  } catch (_) {}

  try {
    if (typeof chrome !== 'undefined' && chrome.runtime?.sendMessage) {
      chrome.runtime.sendMessage({
        type: 'DEBUG_MESSAGE',
        message: `🎬 HLS2MP4 ${label}: ${safeStringify(payload)}`,
        level: 'info',
      }).catch(() => {});
    }
  } catch (_) {}
};


export class HLS2MP4 extends EventEmitter {
  constructor(registerCancel) {
    super();
    this.blobManager = new FSBlob();
    if (registerCancel) {
      registerCancel(() => {
        this.cancel();
      });
    }
  }

  static setLogger(fn) {
    HLS2MP4._externalLogger = typeof fn === 'function' ? fn : null;
  }

  cancel() {
    this.cancelled = true;
  }

  arrayEquals(a, b) {
    let i;

    if (a.length !== b.length) {
      return false;
    } // compare the value of each element in the array


    for (i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) {
        return false;
      }
    }

    return true;
  }

  async pushFragment(fragData) {
    const entry = await fragData.getEntry();
    const data = await entry.getDataFromBlob();
    const fragment = fragData.fragment;
    const isDiscontinuity = !this.prevFrag || fragment.sn !== this.prevFrag.fragment.sn + 1 || fragment.cc !== this.prevFrag.fragment.cc;

    if (isDiscontinuity) {
      console.log('discontinuity');
    }
    this.prevFrag = fragData;
    const result = this.transmuxer.pushData(new Uint8Array(data), isDiscontinuity);
    const headerLen = 8;

    if (result.video) {
      if (!this.videoTrack) {
        this.videoTrack = {
          ...result.videoTrack,
          samples: [],
          chunks: [],
          use64Offsets: false,
          nextChunkId: 1,
          elst: [],
          padding: 0,
        };
      }

      result.videoTrack.pps.forEach((pps) => {
        if (!this.videoTrack.pps.find((p) => {
          return this.arrayEquals(p, pps);
        })) {
          this.videoTrack.pps.push(pps);
        }
      });

      result.videoTrack.sps.forEach((sps) => {
        if (!this.videoTrack.sps.find((s) => {
          return this.arrayEquals(s, sps);
        })) {
          this.videoTrack.sps.push(sps);
        }
      });

      this.videoTrack.chunks.push({
        id: this.videoTrack.nextChunkId++,
        samples: result.video.outputSamples,
        offset: this.datasOffset + headerLen,
        originalOffset: this.datasOffset + headerLen,
        startDTS: result.video.startDTS,
        endDTS: result.video.endDTS,
        startPTS: result.video.startPTS,
        endPTS: result.video.endPTS,
      });

      try {
        const samples = result.video.outputSamples || [];
        const sampleCount = samples.length;
        let minCts = Number.POSITIVE_INFINITY;
        let maxCts = Number.NEGATIVE_INFINITY;
        let keyframeCount = 0;
        let firstPts = null;
        let firstDts = null;
        let lastPts = null;
        let lastDts = null;

        const trackSamples = result.videoTrack?.samples || [];
        const firstTrackSample = trackSamples[0] || null;
        const lastTrackSample = trackSamples[trackSamples.length - 1] || null;
        const trackTimescale = result.videoTrack?.inputTimeScale || result.videoTrack?.timescale || null;

        if (sampleCount > 0) {
          const firstSample = samples[0];
          const lastSample = samples[sampleCount - 1];
          firstPts = firstSample?.pts ?? null;
          firstDts = firstSample?.dts ?? null;
          lastPts = lastSample?.pts ?? null;
          lastDts = lastSample?.dts ?? null;

          samples.forEach((sample) => {
            const cts = sample?.cts;
            if (typeof cts === 'number') {
              if (cts < minCts) minCts = cts;
              if (cts > maxCts) maxCts = cts;
            }
            const dependsOn = sample?.flags?.dependsOn;
            const isKey = sample?.key || sample?.isKey || dependsOn === 2;
            if (isKey) {
              keyframeCount++;
            }
          });
        }

        logHLS2('video fragment', {
          chunkId: this.videoTrack.nextChunkId - 1,
          startPTS: result.video.startPTS,
          endPTS: result.video.endPTS,
          startDTS: result.video.startDTS,
          endDTS: result.video.endDTS,
          sampleCount,
          firstSamplePTS: firstPts,
          firstSampleDTS: firstDts,
          lastSamplePTS: lastPts,
          lastSampleDTS: lastDts,
          minCTS: isFinite(minCts) ? minCts : null,
          maxCTS: isFinite(maxCts) ? maxCts : null,
          trackSampleCount: trackSamples.length,
          trackTimescale,
          keyframeCount,
          trackFirstSample: firstTrackSample
            ? {
              pts: firstTrackSample.pts ?? null,
              dts: firstTrackSample.dts ?? null,
              cts: firstTrackSample.cts ?? firstTrackSample.compositionTimeOffset ?? null,
              duration: firstTrackSample.duration ?? null,
            }
            : null,
          trackLastSample: lastTrackSample
            ? {
              pts: lastTrackSample.pts ?? null,
              dts: lastTrackSample.dts ?? null,
              cts: lastTrackSample.cts ?? lastTrackSample.compositionTimeOffset ?? null,
              duration: lastTrackSample.duration ?? null,
            }
            : null,
        });
      } catch (logErr) {
        logHLS2('video fragment log failure', { message: logErr?.message || String(logErr) });
      }
      const blob = new Blob([result.video.data2], {
        type: 'video/mp4',
      });
      this.datas.push(this.blobManager.saveBlob(blob));
      this.datasOffset += result.video.data2.byteLength;
    }

    if (result.audio) {
      if (!this.audioTrack) {
        this.audioTrack = {
          ...result.audioTrack,
          samples: [],
          chunks: [],
          use64Offsets: false,
          nextChunkId: 1,
          elst: [],
          padding: 0,
        };
      }

      this.audioTrack.chunks.push({
        id: this.audioTrack.nextChunkId++,
        samples: result.audio.outputSamples,
        offset: this.datasOffset + headerLen,
        originalOffset: this.datasOffset + headerLen,
        startDTS: result.audio.startDTS,
        endDTS: result.audio.endDTS,
        startPTS: result.audio.startPTS,
        endPTS: result.audio.endPTS,
      });
      const blob = new Blob([result.audio.data2], {
        type: 'video/mp4',
      });
      this.datas.push(this.blobManager.saveBlob(blob));
      this.datasOffset += result.audio.data2.byteLength;
    }
  }

  async pushFragmentAudio(fragData) {
    const entry = await fragData.getEntry();
    const data = await entry.getDataFromBlob();
    const fragment = fragData.fragment;
    const isDiscontinuity = !this.prevFragAudio || fragment.sn !== this.prevFragAudio.fragment.sn + 1 || fragment.cc !== this.prevFragAudio.fragment.cc;

    if (isDiscontinuity) {
      console.log('discontinuity');
    }
    this.prevFragAudio = fragData;
    const result = this.transmuxerAudio.pushData(new Uint8Array(data), isDiscontinuity);
    const headerLen = 8;
    if (result.audio) {
      if (!this.audioTrack) {
        this.audioTrack = {
          ...result.audioTrack,
          samples: [],
          chunks: [],
          use64Offsets: false,
          nextChunkId: 1,
          elst: [],
          padding: 0,
        };
      }

      this.audioTrack.chunks.push({
        id: this.audioTrack.nextChunkId++,
        samples: result.audio.outputSamples,
        offset: this.datasOffset + headerLen,
        originalOffset: this.datasOffset + headerLen,
        startDTS: result.audio.startDTS,
        endDTS: result.audio.endDTS,
        startPTS: result.audio.startPTS,
        endPTS: result.audio.endPTS,
      });
      const blob = new Blob([result.audio.data2], {
        type: 'video/mp4',
      });
      this.datas.push(this.blobManager.saveBlob(blob));
      this.datasOffset += result.audio.data2.byteLength;
    }
  }

  setup(level, levelInitData, audioLevel, audioInitData) {
    if (!level.details) {
      throw new Error('level.details is null');
    }

    if (audioLevel && !audioLevel.details) {
      throw new Error('audioLevel.details is null');
    }


    this.transmuxer = new Transmuxer({
      audioCodec: level.audioCodec,
      videoCodec: level.videoCodec,
      initSegmentData: levelInitData || [],
      duration: level.details.totalduration,
      defaultInitPts: 0,
    });

    if (audioLevel) {
      this.transmuxerAudio = new Transmuxer({
        videoCodec: '',
        audioCodec: audioLevel.audioCodec,
        initSegmentData: audioInitData || [],
        duration: level.details.totalduration,
        defaultInitPts: 0,
      });
    }

    this.prevFrag = null;
    this.prevFragAudio = null;
    this.datas = [];
    this.datasOffset = 0;
  }

  async finalize() {
    const tracks = [];
    const videoTrack = this.videoTrack;
    const audioTrack = this.audioTrack;
    if (videoTrack) tracks.push(videoTrack);
    if (audioTrack) {
      tracks.push(audioTrack);
    }

    logHLS2('finalize start', {
      hasVideo: !!videoTrack,
      hasAudio: !!audioTrack,
      videoChunks: videoTrack?.chunks?.length || 0,
      audioChunks: audioTrack?.chunks?.length || 0,
    });

    // Validate tracks array and chunks before accessing
    if (tracks.length === 0) {
      throw new Error('No tracks available for finalization - both video and audio tracks are missing');
    }
    
    if (!tracks[0].chunks || tracks[0].chunks.length === 0) {
      throw new Error('First track has no chunks available for finalization');
    }

    const len = tracks[0].chunks.length;
    let minDts = tracks[0].chunks[0].startDTS;

    for (let i = 0; i < tracks.length; i++) {
      // Validate each track has chunks
      if (!tracks[i].chunks || tracks[i].chunks.length === 0) {
        throw new Error(`Track ${i} has no chunks available for finalization`);
      }
      
      if (tracks[i].chunks.length !== len) {
        console.log('WARNING: chunk length is not equal', tracks[i].chunks.length, len);
      }

      if (tracks[i].chunks[0].startDTS < minDts) {
        minDts = tracks[i].chunks[0].startDTS;
      }
    }

    tracks.forEach((track) => {
      // Additional safety check (should already be validated above, but being extra safe)
      if (!track.chunks || track.chunks.length === 0) {
        throw new Error('Track has no chunks in forEach processing');
      }
      
      const trackDTS = track.chunks[0].startDTS;
      const diff = trackDTS - minDts;
      if (diff > 0.01) {
        const cts = track.chunks[0].startPTS - track.chunks[0].startDTS;
        track.elst.push({
          media_time: -1,
          segment_duration: Math.floor((diff + cts) * track.timescale),
        });
        track.padding = diff;
      }
    });


    const movieTimescale = tracks[0].timescale;
    tracks.forEach((track) => {
      // Additional safety check for chunks access
      if (!track.chunks || track.chunks.length === 0) {
        throw new Error('Track has no chunks in movieTimescale processing');
      }
      
      track.movieTimescale = movieTimescale;

      track.elst.push({
        media_time: (track.chunks[0].startPTS - track.chunks[0].startDTS) * movieTimescale,
        segment_duration: (track.chunks[track.chunks.length - 1].endDTS - track.chunks[0].startDTS - track.padding) * movieTimescale,
      });

      // Optionally flatten B-frame composition offsets to zero to simplify seeking
      if (this.forceZeroCts && track.type === 'video') {
        let hasNonZeroCts = false;

        for (let i = 0; i < track.chunks.length && !hasNonZeroCts; i++) {
          const chunk = track.chunks[i];
          const samples = chunk.samples || [];

          for (let j = 0; j < samples.length; j++) {
            if (samples[j].cts) {
              hasNonZeroCts = true;
              break;
            }
          }
        }

        if (!hasNonZeroCts) {
          track.chunks.forEach((chunk) => {
            chunk.samples.forEach((s) => {
              s.cts = 0;
            });
          });
          track.noCtts = true;
        } else if (!this.forceZeroCtsWarned) {
          this.forceZeroCtsWarned = true;
          console.warn('HLS2MP4: forceZeroCts skipped due to non-zero CTS offsets');
        }
      }

      track.samples = [];
      track.chunks.forEach((chunk) => {
        track.samples.push(...chunk.samples);
      });

      if (track.type === 'video') {
        try {
          const timescale = track.timescale || track.movieTimescale || 90000;
          let minCts = Number.POSITIVE_INFINITY;
          let maxCts = Number.NEGATIVE_INFINITY;
          let keyframeCount = 0;

          track.samples.forEach((sample) => {
            const cts = sample?.cts;
            if (typeof cts === 'number') {
              if (cts < minCts) minCts = cts;
              if (cts > maxCts) maxCts = cts;
            }
            if (sample?.flags?.dependsOn === 2) {
              keyframeCount++;
            }
          });

          const samplePreview = [];
          const maxPreview = 6;
          let previewCount = 0;
          track.chunks.forEach((chunk) => {
            let dtsTicks = Math.round(chunk.startDTS * timescale);
            const chunkSamples = chunk.samples || [];
            chunkSamples.forEach((sample, sampleIdx) => {
              if (previewCount < maxPreview) {
                const sampleDts = dtsTicks;
                const samplePts = sampleDts + (sample?.cts || 0);
                samplePreview.push({
                  chunkId: chunk.id,
                  sampleIndex: sampleIdx,
                  ptsSeconds: samplePts / timescale,
                  dtsSeconds: sampleDts / timescale,
                  durationSeconds: (sample?.duration || 0) / timescale,
                  cts: sample?.cts || 0,
                  isKeyframe: sample?.flags?.dependsOn === 2,
                });
              }
              previewCount++;
              dtsTicks += sample?.duration || 0;
            });
          });

          logHLS2('video track summary', {
            chunks: track.chunks.length,
            sampleCount: track.samples.length,
            firstChunk: {
              startPTS: track.chunks[0].startPTS,
              startDTS: track.chunks[0].startDTS,
              endPTS: track.chunks[0].endPTS,
              endDTS: track.chunks[0].endDTS,
            },
            lastChunk: {
              startPTS: track.chunks[track.chunks.length - 1].startPTS,
              startDTS: track.chunks[track.chunks.length - 1].startDTS,
              endPTS: track.chunks[track.chunks.length - 1].endPTS,
              endDTS: track.chunks[track.chunks.length - 1].endDTS,
            },
            timescale,
            minCTS: isFinite(minCts) ? minCts : null,
            maxCTS: isFinite(maxCts) ? maxCts : null,
            padding: track.padding || 0,
            keyframeCount,
            samplePreview,
          });
        } catch (summaryErr) {
          logHLS2('video track summary failed', { message: summaryErr?.message || String(summaryErr) });
        }
      }

      // Explicit duration for mdhd/tkhd/mvhd consumers (e.g., VLC timeline)
      try {
        const durSec = (track.chunks[track.chunks.length - 1].endDTS - track.chunks[0].startDTS - track.padding);
        if (isFinite(durSec) && durSec > 0) {
          track.duration = durSec;
        }
      } catch (_) {}
    });

    // Ensure movie duration reflects the longest track
    try {
      const maxDur = tracks.reduce((m, t) => Math.max(m, t.duration || 0), 0);
      if (maxDur > 0) {
        tracks[0].duration = maxDur;
      }
    } catch (_) {}
    let initSeg;
    try {
      const initSegCount = MP4.initSegment(tracks);
      const len = initSegCount.byteLength;

      tracks.forEach((track) => {
        track.chunks.forEach((chunk) => {
          chunk.offset = chunk.originalOffset + len;
        });
      });

      initSeg = MP4.initSegment(tracks);
    } catch (e) {
      tracks.forEach((track) => {
        track.use64Offsets = true;
      });

      const initSegCount = MP4.initSegment(tracks);
      const len = initSegCount.byteLength;

      tracks.forEach((track) => {
        track.chunks.forEach((chunk) => {
          chunk.offset = chunk.originalOffset + len;
        });
      });

      initSeg = MP4.initSegment(tracks);
    }

    const dataChunks = await Promise.all(this.datas.map((data) => {
      return this.blobManager.getBlob(data);
    }));

    try {
      const totalDataBytes = dataChunks.reduce((sum, blob) => sum + (blob?.size || 0), 0);
      logHLS2('finalize complete', {
        initSegmentBytes: initSeg?.byteLength || 0,
        dataChunkCount: dataChunks.length,
        totalDataBytes,
      });
    } catch (finalLogErr) {
      logHLS2('finalize summary failed', { message: finalLogErr?.message || String(finalLogErr) });
    }

    return new Blob([initSeg, ...dataChunks], {
      type: 'video/mp4',
    });
  }
  async convert(level, levelInitData, audioLevel, audioInitData, zippedFragments) {
    this.setup(level, levelInitData, audioLevel, audioInitData);

    let lastProgress = 0;
    for (let i = 0; i < zippedFragments.length; i++) {
      if (this.cancelled) {
        this.destroy();
        this.blobManager.close();
        throw new Error('Cancelled');
      }
      if (zippedFragments[i].track === 0) {
        await this.pushFragment(zippedFragments[i]);
      } else {
        await this.pushFragmentAudio(zippedFragments[i]);
      }
      const newProgress = Math.floor((i + 1) / zippedFragments.length * 100);
      if (newProgress !== lastProgress) {
        lastProgress = newProgress;
        this.emit('progress', newProgress / 100);
      }
    }

    const blob = await this.finalize();
    this.destroy();

    return blob;
  }

  destroy() {
    if (this.transmuxer) this.transmuxer.destroy();
    if (this.transmuxerAudio) this.transmuxerAudio.destroy();
    this.transmuxerAudio = null;
    this.transmuxer = null;
    this.videoTrack = null;
    this.audioTrack = null;
    this.prevFrag = null;
    this.datas = null;
    this.datasOffset = 0;

    setTimeout(() => {
      this.blobManager.close();
      this.blobManager = null;
    }, 120000);
  }
}

HLS2MP4._externalLogger = null;
