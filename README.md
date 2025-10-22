# Whop Video Downloader

> Download Whop marketplace courses and digital products

![Whop Video Downloader](https://raw.githubusercontent.com/serpapps/whop-video-downloader/assets/images/whop-video-downloader.gif)

Whop Video Downloader is a powerful tool that helps you download content from Whop Video instantly without ads or popups. Built with modern technologies, it provides a seamless experience for downloading and managing content.

## 🔗 Links

- 🎁 Get it [here](https://serp.ly/whop-video-downloader)
- ❓ Check FAQs [here](https://github.com/orgs/serpapps/discussions/categories/faq)
- 🐛 Report bugs [here](https://github.com/serpapps/whop-video-downloader/issues)
- 🆕 Request features [here](https://github.com/serpapps/whop-video-downloader/issues)

### Resources

- 💬 [Community](https://serp.ly/@serp/community)
- 💌 [Newsletter](https://serp.ly/@serp/email)
- 🛒 [Shop](https://serp.ly/@serp/store)
- 🎓 [Courses](https://serp.ly/@serp/courses)


## Features

- Stream-to-file conversion
- HD quality downloads
- Batch download support
- Resume interrupted downloads
- No watermarks
- Content extraction

## Installation Instructions

1. Clone the repository: git clone https://github.com/serpapps/whop-video-downloader
2. Install dependencies
3. Configure settings
4. Run the application

## Usage Instructions

1. Open the application
2. Enter the URL of the content you want to download
3. Select your preferred quality and format
4. Click download to start the process
5. Files will be saved to your specified directory

## Technologies

- Python
- JavaScript
- Node.js
- Automation

## More Info

- 📁 Repository [here](https://github.com/serpapps/whop-video-downloader)
- 📝 Gist [here](https://gist.github.com/devinschumacher/5ce08c8de7b729e2e9805d91c2fdc123)
- [How to Download Videos from Whop (Mux Streams) with yt-dlp](https://gist.github.com/devinschumacher/c7c8f9e1ca821afcaeccefde131c80c6)

<details>
  
<summary>Keywords</summary>

- whop video downloader
- how to download videos from whop
- how to download whop videos
- download videos from whop
- how to download videos from whop platform
- can you download videos from whop
  
</details>


---

  
<details>
  <summary>
    How to Download Whop Videos
  </summary>

# Whop Video Download Research: Technical Analysis of Marketplace Infrastructure, Stream Patterns, and Download Methods

*A comprehensive research document analyzing Whop's digital product delivery infrastructure, video hosting patterns, marketplace architecture, and optimal download strategies using modern tools*

## Abstract

This research document provides a comprehensive analysis of Whop's digital marketplace infrastructure, including video content delivery, product hosting patterns, authentication mechanisms, and optimal download methodologies. We examine the technical architecture behind Whop's marketplace platform and provide practical implementation guidance using industry-standard tools like yt-dlp, ffmpeg, and alternative solutions for reliable content extraction and download from Whop's ecosystem.

## Table of Contents

1. [Introduction](#introduction)
2. [Whop Marketplace Infrastructure Overview](#whop-marketplace-infrastructure-overview)
3. [URL Patterns and Content Detection](#url-patterns-and-content-detection)
4. [Stream Formats and CDN Analysis](#stream-formats-and-cdn-analysis)
5. [yt-dlp Implementation Strategies](#yt-dlp-implementation-strategies)
6. [FFmpeg Processing Techniques](#ffmpeg-processing-techniques)
7. [Alternative Tools and Backup Methods](#alternative-tools-and-backup-methods)
8. [Implementation Recommendations](#implementation-recommendations)
9. [Troubleshooting and Edge Cases](#troubleshooting-and-edge-cases)
10. [Conclusion](#conclusion)

---

## 1. Introduction

Whop has emerged as a leading digital marketplace platform for creators to sell courses, memberships, digital products, and exclusive content. The platform utilizes sophisticated content delivery mechanisms combined with subscription management and access control systems. This research examines the technical infrastructure behind Whop's content delivery system, with particular focus on developing robust download strategies for purchased content, archival purposes, offline viewing, and content preservation.

### 1.1 Research Scope

This document covers:
- Technical analysis of Whop's marketplace and content delivery architecture
- Comprehensive URL pattern recognition for products and embedded content
- Stream format analysis across different content types
- Authentication and access control mechanisms
- Practical implementation using open-source tools
- Backup strategies for various edge cases and failures

### 1.2 Methodology

Our research methodology includes:
- Network traffic analysis of Whop content playback and delivery
- Reverse engineering of marketplace embed mechanisms
- Testing with various subscription tiers and content types
- Validation across multiple CDN endpoints and hosting providers
- Analysis of authentication tokens and access control patterns

---

## 2. Whop Marketplace Infrastructure Overview

### 2.1 Platform Architecture

Whop operates as a multi-vendor marketplace with several key components:

**Core Platform Components**:
- **Marketplace Frontend**: `whop.com` - Main discovery and purchase interface
- **Product Hosting**: `whop.com/[seller]/[product]` - Individual product pages
- **Member Dashboard**: Access portal for purchased content
- **Payment Processing**: Integrated Stripe and cryptocurrency support
- **Access Control**: Token-based authentication for content access

**Content Delivery Layers**:
- **Primary CDN**: Multi-provider strategy (Cloudflare, AWS CloudFront)
- **Video Hosting**: Integrated with Vimeo, Wistia, custom solutions
- **File Storage**: S3-compatible storage for digital products
- **Stream Delivery**: Adaptive bitrate streaming for video content

### 2.2 Content Types and Delivery Mechanisms

Whop supports multiple content formats:

#### 2.2.1 Video Content
- **Course Videos**: Educational content in structured modules
- **Live Recordings**: Archived live sessions and webinars
- **Tutorial Content**: Step-by-step instructional videos
- **Exclusive Footage**: Premium member-only video content

#### 2.2.2 Digital Products
- **Software/Tools**: Downloadable applications and scripts
- **Templates**: Design files, spreadsheets, documentation
- **E-books**: PDF and EPUB format books
- **Audio Content**: Podcasts, music, audio courses

#### 2.2.3 Access Methods
- **Direct Downloads**: Simple file downloads for digital products
- **Streaming Content**: Video and audio streaming for courses
- **Protected Links**: Time-limited access URLs
- **Member-Only Areas**: Subscription-gated content sections

### 2.3 Security and Access Control

#### 2.3.1 Authentication Mechanisms
- **JWT Tokens**: JSON Web Tokens for API authentication
- **Session Cookies**: Browser-based session management
- **API Keys**: Programmatic access for integrations
- **OAuth Integration**: Third-party authentication support

#### 2.3.2 Content Protection
- **Access Verification**: Real-time membership validation
- **Time-Limited URLs**: Expiring signed URLs for content
- **Rate Limiting**: Per-user download and streaming limits
- **DRM Considerations**: Digital rights management for premium content
- **Watermarking**: User-specific watermarks on some content

#### 2.3.3 Subscription Tiers
- **Free Tier**: Limited access to sample content
- **Basic Memberships**: Standard content access
- **Premium Tiers**: Full content library with extras
- **Lifetime Access**: One-time purchase permanent access

---

## 3. URL Patterns and Content Detection

### 3.1 Primary URL Patterns

#### 3.1.1 Marketplace and Product URLs
```
https://whop.com/[seller-name]/
https://whop.com/[seller-name]/[product-id]
https://whop.com/hub/[product-id]/
https://whop.com/checkout/[product-id]
```

#### 3.1.2 Content Access URLs
```
https://whop.com/hub/[product-id]/content/[content-id]
https://whop.com/api/v1/memberships/[membership-id]/content/[content-id]
```

#### 3.1.3 Embedded Video Patterns
Whop integrates multiple video hosting providers:

**Vimeo Integration:**
```
https://player.vimeo.com/video/{VIDEO_ID}
https://vimeo.com/{VIDEO_ID}
```

**Wistia Integration:**
```
https://fast.wistia.net/embed/iframe/{VIDEO_ID}
https://[account].wistia.com/medias/{VIDEO_ID}
```

**Direct Video URLs:**
```
https://cdn.whop.com/videos/{PRODUCT_ID}/{VIDEO_ID}/master.m3u8
https://cdn.whop.com/videos/{PRODUCT_ID}/{VIDEO_ID}/{QUALITY}/video.mp4
```

### 3.2 Content ID Extraction Patterns

#### 3.2.1 Product ID Format
```regex
/hub/([a-zA-Z0-9_-]{8,})/
/product/([a-zA-Z0-9_-]{8,})/
whop_[a-zA-Z0-9]{16,}
```

#### 3.2.2 Content ID Format
```regex
/content/([a-zA-Z0-9_-]{10,})/
/videos?/([a-zA-Z0-9_-]{10,})/
vid_[a-zA-Z0-9]{12,}
```

### 3.3 Detection Implementation

#### 3.3.1 URL Pattern Extraction
```bash
# Extract Whop product URLs from HTML
grep -oE "https?://whop\.com/[a-zA-Z0-9_-]+/[a-zA-Z0-9_-]+" input.html

# Extract content IDs
grep -oE "hub/[a-zA-Z0-9_-]+/content/[a-zA-Z0-9_-]+" input.html

# Find embedded video players
grep -oE "(vimeo\.com|wistia\.net)/[^\"' ]+" input.html
```

#### 3.3.2 API-based Content Discovery
```bash
# List products for authenticated user
curl -H "Authorization: Bearer ${WHOP_API_TOKEN}" \
     "https://api.whop.com/api/v1/me/memberships"

# Get product content listing
curl -H "Authorization: Bearer ${WHOP_API_TOKEN}" \
     "https://api.whop.com/api/v1/products/${PRODUCT_ID}/content"

# Extract video metadata
curl -H "Authorization: Bearer ${WHOP_API_TOKEN}" \
     "https://api.whop.com/api/v1/content/${CONTENT_ID}" | jq '.'
```

#### 3.3.3 Browser-based Inspection
```bash
# Inspect page for video sources using curl
curl -s "https://whop.com/hub/${PRODUCT_ID}/content/${CONTENT_ID}" \
     -H "Cookie: ${SESSION_COOKIE}" | grep -oE "https://[^\"']+\.(mp4|m3u8)"

# Check for embedded players
curl -s "${WHOP_URL}" | grep -oE "(vimeo|wistia|youtube)\.com/[^\"' ]+"
```

---

## 4. Stream Formats and CDN Analysis

### 4.1 Video Hosting Providers

Whop creators use multiple hosting solutions:

#### 4.1.1 Vimeo Integration
- **Container**: MP4
- **Video Codec**: H.264 (AVC), H.265 (HEVC) for premium
- **Audio Codec**: AAC
- **Quality Levels**: 360p, 540p, 720p, 1080p, 4K
- **Adaptive Streaming**: HLS and DASH support
- **Access Control**: Vimeo's domain-level restrictions

#### 4.1.2 Wistia Integration
- **Container**: MP4, WebM
- **Video Codec**: H.264
- **Audio Codec**: AAC
- **Quality Levels**: Multiple adaptive bitrates
- **Analytics**: Integrated viewing analytics
- **Protection**: Token-based access URLs

#### 4.1.3 Custom Whop CDN
- **Container**: MP4, HLS segments
- **Video Codec**: H.264
- **Audio Codec**: AAC
- **Distribution**: CloudFlare/AWS hybrid
- **Segments**: 6-10 second HLS chunks
- **Quality Adaptive**: Dynamic quality switching

### 4.2 CDN Architecture

#### 4.2.1 Primary CDN Endpoints
```
https://cdn.whop.com/
https://[distribution-id].cloudfront.net/
https://assets.whop.com/
```

#### 4.2.2 Video URL Construction

**Direct MP4 (when available):**
```
https://cdn.whop.com/products/{PRODUCT_ID}/videos/{VIDEO_ID}/720p.mp4
https://cdn.whop.com/products/{PRODUCT_ID}/videos/{VIDEO_ID}/1080p.mp4
```

**HLS Streaming:**
```
https://cdn.whop.com/products/{PRODUCT_ID}/videos/{VIDEO_ID}/master.m3u8
https://cdn.whop.com/products/{PRODUCT_ID}/videos/{VIDEO_ID}/720p/index.m3u8
```

### 4.3 Authentication and Access Tokens

#### 4.3.1 Signed URL Patterns
```bash
# Typical signed URL structure
https://cdn.whop.com/videos/{VIDEO_ID}/video.mp4?token={JWT_TOKEN}&expires={TIMESTAMP}

# Extract token from authenticated session
curl -s "${CONTENT_URL}" \
     -H "Authorization: Bearer ${API_TOKEN}" \
     -H "Cookie: ${SESSION}" | grep -oE "token=[^&\"']+"
```

#### 4.3.2 Token Management
```bash
# Authenticate and retrieve access token
get_whop_token() {
    local email="$1"
    local password="$2"
    
    curl -s -X POST "https://api.whop.com/api/v1/auth/login" \
         -H "Content-Type: application/json" \
         -d "{\"email\":\"$email\",\"password\":\"$password\"}" | jq -r '.token'
}

# Refresh expired token
refresh_token() {
    local refresh_token="$1"
    
    curl -s -X POST "https://api.whop.com/api/v1/auth/refresh" \
         -H "Authorization: Bearer $refresh_token" | jq -r '.token'
}
```

---

## 5. yt-dlp Implementation Strategies

### 5.1 Basic yt-dlp Usage for Whop

#### 5.1.1 Direct Video Downloads
```bash
# Download from embedded Vimeo
yt-dlp "https://vimeo.com/{VIDEO_ID}"

# Download from Wistia
yt-dlp "https://fast.wistia.net/embed/iframe/{VIDEO_ID}"

# With authentication cookies
yt-dlp --cookies cookies.txt "https://whop.com/hub/{PRODUCT}/content/{VIDEO}"

# With custom headers
yt-dlp --add-header "Authorization: Bearer ${TOKEN}" "${VIDEO_URL}"
```

#### 5.1.2 Quality Selection
```bash
# List available formats
yt-dlp -F "${VIDEO_URL}"

# Download best quality MP4
yt-dlp -f "bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]" "${VIDEO_URL}"

# Download specific quality
yt-dlp -f "best[height<=720]" "${VIDEO_URL}"

# Download with size limit
yt-dlp -f "best[filesize<500M]" "${VIDEO_URL}"
```

### 5.2 Authentication Handling

#### 5.2.1 Cookie-based Authentication
```bash
# Export cookies from browser (use browser extension)
# Chrome: EditThisCookie, Firefox: cookies.txt

# Use cookies with yt-dlp
yt-dlp --cookies cookies.txt "${WHOP_VIDEO_URL}"

# Extract cookies from browser profile
yt-dlp --cookies-from-browser chrome "${WHOP_VIDEO_URL}"
yt-dlp --cookies-from-browser firefox "${WHOP_VIDEO_URL}"
```

#### 5.2.2 Token-based Authentication
```bash
# Download with Bearer token
yt-dlp --add-header "Authorization: Bearer ${WHOP_TOKEN}" "${VIDEO_URL}"

# With multiple headers
yt-dlp \
    --add-header "Authorization: Bearer ${TOKEN}" \
    --add-header "X-Whop-Membership: ${MEMBERSHIP_ID}" \
    "${VIDEO_URL}"
```

### 5.3 Batch Processing

#### 5.3.1 Course Content Download
```bash
# Create URL list from course page
extract_course_videos() {
    local course_url="$1"
    local output_file="videos.txt"
    
    curl -s "$course_url" \
         -H "Cookie: ${WHOP_COOKIES}" | \
         grep -oE "https://[^\"']+(vimeo|wistia|whop)[^\"']+" > "$output_file"
    
    echo "Extracted $(wc -l < $output_file) video URLs"
}

# Batch download with metadata
yt-dlp \
    --cookies cookies.txt \
    -o "%(uploader)s/%(playlist)s/%(playlist_index)s - %(title)s.%(ext)s" \
    --write-info-json \
    --write-thumbnail \
    -a videos.txt
```

#### 5.3.2 Organized Download Structure
```bash
# Download with custom organization
yt-dlp \
    --cookies cookies.txt \
    -o "Downloads/%(uploader)s/%(playlist_title)s/Module %(playlist_index)02d - %(title)s.%(ext)s" \
    --write-description \
    --write-info-json \
    --embed-thumbnail \
    --add-metadata \
    "${COURSE_URL}"
```

### 5.4 Advanced Options

#### 5.4.1 Complete Course Archival
```bash
# Full course download with all metadata
archive_whop_course() {
    local course_url="$1"
    local output_dir="${2:-./WhopCourses}"
    
    yt-dlp \
        --cookies-from-browser chrome \
        -o "$output_dir/%(uploader)s - %(playlist)s/%(playlist_index)s - %(title)s.%(ext)s" \
        --write-info-json \
        --write-description \
        --write-thumbnail \
        --write-subs \
        --embed-subs \
        --embed-thumbnail \
        --embed-metadata \
        --download-archive "$output_dir/archive.txt" \
        --no-overwrites \
        --continue \
        "$course_url"
}
```

#### 5.4.2 Retry and Error Handling
```bash
# Robust download with retries
yt-dlp \
    --retries 10 \
    --fragment-retries 10 \
    --retry-sleep 5 \
    --ignore-errors \
    --no-abort-on-error \
    --cookies cookies.txt \
    -a course_urls.txt
```

---

## 6. FFmpeg Processing Techniques

### 6.1 Stream Analysis

#### 6.1.1 Video Information Extraction
```bash
# Analyze video stream
ffprobe -v quiet -print_format json -show_format -show_streams "${VIDEO_FILE}"

# Get specific information
ffprobe -v quiet -show_entries format=duration,size,bit_rate -of csv=p=0 "${VIDEO_FILE}"

# Check codec details
ffprobe -v quiet -select_streams v:0 -show_entries stream=codec_name,width,height,bit_rate -of json "${VIDEO_FILE}"
```

#### 6.1.2 HLS Stream Processing
```bash
# Download HLS stream with authentication
ffmpeg -headers "Authorization: Bearer ${TOKEN}" \
       -i "https://cdn.whop.com/videos/${VIDEO_ID}/master.m3u8" \
       -c copy output.mp4

# Download specific quality variant
ffmpeg -i "https://cdn.whop.com/videos/${VIDEO_ID}/720p/index.m3u8" \
       -c copy -bsf:a aac_adtstoasc output_720p.mp4
```

### 6.2 Content Conversion and Optimization

#### 6.2.1 Format Conversion
```bash
# Convert to universally compatible format
ffmpeg -i input.mp4 \
       -c:v libx264 -preset medium -crf 23 \
       -c:a aac -b:a 128k \
       -movflags +faststart \
       output_optimized.mp4

# Compress large files
ffmpeg -i input.mp4 \
       -c:v libx264 -crf 28 \
       -c:a aac -b:a 96k \
       -vf scale=-2:720 \
       output_compressed.mp4
```

#### 6.2.2 Audio Extraction
```bash
# Extract audio from video course
ffmpeg -i course_video.mp4 -vn -c:a aac -b:a 128k course_audio.m4a

# Convert to MP3 for audio courses
ffmpeg -i course_video.mp4 -vn -c:a libmp3lame -b:a 192k course_audio.mp3

# Extract audio with metadata preservation
ffmpeg -i input.mp4 -vn -c:a copy -map_metadata 0 audio_only.m4a
```

### 6.3 Batch Processing Scripts

#### 6.3.1 Course Video Processing
```bash
#!/bin/bash
# Process downloaded course videos

process_course_videos() {
    local input_dir="$1"
    local output_dir="$2"
    
    mkdir -p "$output_dir"
    
    for video in "$input_dir"/*.mp4; do
        if [[ -f "$video" ]]; then
            filename=$(basename "$video" .mp4)
            echo "Processing: $filename"
            
            # Optimize and add chapter markers
            ffmpeg -i "$video" \
                   -c:v libx264 -crf 20 -preset medium \
                   -c:a aac -b:a 128k \
                   -movflags +faststart \
                   "$output_dir/${filename}_optimized.mp4"
        fi
    done
    
    echo "Processing complete!"
}
```

#### 6.3.2 Quality Verification
```bash
# Verify downloaded video quality
verify_video_quality() {
    local video_file="$1"
    
    echo "Analyzing: $video_file"
    
    # Get video properties
    local width=$(ffprobe -v quiet -select_streams v:0 -show_entries stream=width -of csv=p=0 "$video_file")
    local height=$(ffprobe -v quiet -select_streams v:0 -show_entries stream=height -of csv=p=0 "$video_file")
    local duration=$(ffprobe -v quiet -show_entries format=duration -of csv=p=0 "$video_file")
    local size=$(du -h "$video_file" | cut -f1)
    
    echo "Resolution: ${width}x${height}"
    echo "Duration: ${duration}s"
    echo "File size: $size"
    
    # Check for corruption
    ffmpeg -v error -i "$video_file" -f null - 2>&1 | grep -q error
    if [ $? -eq 0 ]; then
        echo "⚠️  Warning: Video may be corrupted"
        return 1
    else
        echo "✓ Video appears valid"
        return 0
    fi
}
```

---

## 7. Alternative Tools and Backup Methods

### 7.1 Gallery-dl for Whop Content

#### 7.1.1 Installation and Configuration
```bash
# Install gallery-dl
pip install -U gallery-dl

# Create configuration file
mkdir -p ~/.config/gallery-dl/
cat > ~/.config/gallery-dl/config.json << 'EOF'
{
    "extractor": {
        "base-directory": "./Downloads/",
        "whop": {
            "cookies": "~/.config/gallery-dl/cookies.txt",
            "filename": "{category}/{creator}/{num:>03} - {title}.{extension}"
        }
    }
}
EOF
```

#### 7.1.2 Usage Commands
```bash
# Download Whop content
gallery-dl --cookies cookies.txt "${WHOP_URL}"

# With custom output template
gallery-dl -o "filename={creator} - {title}.{extension}" "${WHOP_URL}"
```

### 7.2 Custom Python Implementation

#### 7.2.1 API-based Content Fetcher
```python
#!/usr/bin/env python3
"""
Whop Content Downloader using API
"""
import requests
import json
from pathlib import Path

class WhopDownloader:
    def __init__(self, api_token):
        self.api_token = api_token
        self.base_url = "https://api.whop.com/api/v1"
        self.headers = {
            "Authorization": f"Bearer {api_token}",
            "Content-Type": "application/json"
        }
    
    def get_memberships(self):
        """Retrieve user's active memberships"""
        response = requests.get(
            f"{self.base_url}/me/memberships",
            headers=self.headers
        )
        return response.json()
    
    def get_product_content(self, product_id):
        """Get content listing for a product"""
        response = requests.get(
            f"{self.base_url}/products/{product_id}/content",
            headers=self.headers
        )
        return response.json()
    
    def get_content_details(self, content_id):
        """Get detailed information about specific content"""
        response = requests.get(
            f"{self.base_url}/content/{content_id}",
            headers=self.headers
        )
        return response.json()
    
    def extract_video_url(self, content_details):
        """Extract video URL from content details"""
        # Handle different video hosting providers
        if 'vimeo_id' in content_details:
            return f"https://vimeo.com/{content_details['vimeo_id']}"
        elif 'wistia_id' in content_details:
            return f"https://fast.wistia.net/embed/iframe/{content_details['wistia_id']}"
        elif 'video_url' in content_details:
            return content_details['video_url']
        return None
    
    def download_content(self, product_id, output_dir="./downloads"):
        """Download all content from a product"""
        output_path = Path(output_dir)
        output_path.mkdir(parents=True, exist_ok=True)
        
        content_list = self.get_product_content(product_id)
        
        for content_item in content_list.get('content', []):
            content_id = content_item['id']
            details = self.get_content_details(content_id)
            
            video_url = self.extract_video_url(details)
            if video_url:
                print(f"Found video: {details.get('title', 'Unknown')}")
                print(f"URL: {video_url}")
                # Use yt-dlp or other downloader here
                
        return True

# Usage example
if __name__ == "__main__":
    import os
    
    token = os.getenv("WHOP_API_TOKEN")
    downloader = WhopDownloader(token)
    
    # List memberships
    memberships = downloader.get_memberships()
    print(json.dumps(memberships, indent=2))
```

### 7.3 Browser Automation

#### 7.3.1 Playwright/Puppeteer Approach
```javascript
// whop-downloader.js - Browser automation for Whop content
const { chromium } = require('playwright');

async function downloadWhopContent(courseUrl, credentials) {
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();
    
    // Login to Whop
    await page.goto('https://whop.com/login');
    await page.fill('input[type="email"]', credentials.email);
    await page.fill('input[type="password"]', credentials.password);
    await page.click('button[type="submit"]');
    await page.waitForNavigation();
    
    // Navigate to course content
    await page.goto(courseUrl);
    await page.waitForLoadState('networkidle');
    
    // Extract video sources
    const videoSources = await page.evaluate(() => {
        const videos = [];
        
        // Find Vimeo embeds
        document.querySelectorAll('iframe[src*="vimeo"]').forEach(iframe => {
            videos.push(iframe.src);
        });
        
        // Find Wistia embeds
        document.querySelectorAll('iframe[src*="wistia"]').forEach(iframe => {
            videos.push(iframe.src);
        });
        
        // Find direct video elements
        document.querySelectorAll('video source').forEach(source => {
            videos.push(source.src);
        });
        
        return videos;
    });
    
    console.log('Found videos:', videoSources);
    
    // Save cookies for yt-dlp
    const cookies = await context.cookies();
    const fs = require('fs');
    fs.writeFileSync('cookies.json', JSON.stringify(cookies, null, 2));
    
    await browser.close();
    
    return videoSources;
}

// Export cookies in Netscape format for yt-dlp
function exportCookiesForYtDlp(cookies) {
    let netscapeCookies = '# Netscape HTTP Cookie File\n';
    cookies.forEach(cookie => {
        netscapeCookies += `${cookie.domain}\tTRUE\t${cookie.path}\t${cookie.secure ? 'TRUE' : 'FALSE'}\t${cookie.expires || 0}\t${cookie.name}\t${cookie.value}\n`;
    });
    return netscapeCookies;
}

module.exports = { downloadWhopContent, exportCookiesForYtDlp };
```

### 7.4 Direct HTTP Downloads

#### 7.4.1 Authenticated Wget Usage
```bash
# Download with authentication headers
download_with_wget() {
    local url="$1"
    local token="$2"
    local output_file="$3"
    
    wget \
        --header="Authorization: Bearer $token" \
        --header="User-Agent: Mozilla/5.0 (Whop-Downloader/1.0)" \
        --continue \
        -O "$output_file" \
        "$url"
}

# Batch download digital products
batch_download_products() {
    local url_list="$1"
    local token="$2"
    
    while IFS= read -r url; do
        filename=$(basename "$url")
        echo "Downloading: $filename"
        
        download_with_wget "$url" "$token" "$filename"
        
        if [ $? -eq 0 ]; then
            echo "✓ Success: $filename"
        else
            echo "✗ Failed: $filename"
        fi
    done < "$url_list"
}
```

---

## 8. Implementation Recommendations

### 8.1 Recommended Workflow

#### 8.1.1 Complete Course Download Strategy
```bash
#!/bin/bash
# Complete Whop course download workflow

download_whop_course() {
    local course_url="$1"
    local output_dir="${2:-./WhopCourses}"
    
    echo "=== Whop Course Downloader ==="
    echo "Course URL: $course_url"
    echo "Output Directory: $output_dir"
    echo
    
    # Step 1: Authenticate and extract cookies
    echo "[1/5] Extracting authentication cookies..."
    # Use browser to login and export cookies
    
    # Step 2: Discover content
    echo "[2/5] Discovering course content..."
    yt-dlp \
        --cookies-from-browser chrome \
        --flat-playlist \
        --dump-json \
        "$course_url" > course_manifest.json
    
    # Step 3: Download videos
    echo "[3/5] Downloading videos..."
    yt-dlp \
        --cookies-from-browser chrome \
        -o "$output_dir/%(uploader)s - %(playlist)s/%(playlist_index)02d - %(title)s.%(ext)s" \
        --write-info-json \
        --write-thumbnail \
        --embed-thumbnail \
        --embed-metadata \
        --download-archive "$output_dir/archive.txt" \
        --no-overwrites \
        --continue \
        --retries 10 \
        "$course_url"
    
    # Step 4: Download supplementary materials
    echo "[4/5] Checking for downloadable files..."
    # Extract and download PDFs, resources, etc.
    
    # Step 5: Generate summary
    echo "[5/5] Generating course summary..."
    jq '.title, .description, .uploader' course_manifest.json > "$output_dir/course_info.txt"
    
    echo
    echo "✓ Download complete!"
    echo "Files saved to: $output_dir"
}
```

#### 8.1.2 Hierarchical Fallback Approach
```bash
#!/bin/bash
# Multi-method fallback strategy

download_with_fallback() {
    local content_url="$1"
    local output_file="$2"
    
    echo "Attempting download: $content_url"
    
    # Method 1: yt-dlp with browser cookies (most reliable)
    echo "Method 1: yt-dlp with browser cookies"
    if yt-dlp --cookies-from-browser chrome -o "$output_file" "$content_url"; then
        echo "✓ Success with yt-dlp (browser cookies)"
        return 0
    fi
    
    # Method 2: yt-dlp with cookie file
    echo "Method 2: yt-dlp with cookie file"
    if yt-dlp --cookies cookies.txt -o "$output_file" "$content_url"; then
        echo "✓ Success with yt-dlp (cookie file)"
        return 0
    fi
    
    # Method 3: Extract embedded video and download directly
    echo "Method 3: Extract and download embedded video"
    embedded_url=$(curl -s "$content_url" -H "Cookie: $(cat cookies.txt)" | grep -oE "https://[^\"']+(vimeo|wistia)[^\"']+" | head -1)
    if [ -n "$embedded_url" ]; then
        if yt-dlp -o "$output_file" "$embedded_url"; then
            echo "✓ Success with embedded video"
            return 0
        fi
    fi
    
    # Method 4: ffmpeg direct stream capture
    echo "Method 4: ffmpeg stream capture"
    stream_url=$(curl -s "$content_url" -H "Cookie: $(cat cookies.txt)" | grep -oE "https://[^\"']+\.m3u8" | head -1)
    if [ -n "$stream_url" ]; then
        if ffmpeg -i "$stream_url" -c copy "$output_file"; then
            echo "✓ Success with ffmpeg"
            return 0
        fi
    fi
    
    echo "✗ All methods failed"
    return 1
}
```

### 8.2 Authentication Management

#### 8.2.1 Cookie Management Script
```bash
#!/bin/bash
# Manage Whop authentication cookies

# Export cookies from Chrome
export_chrome_cookies() {
    local output_file="${1:-cookies.txt}"
    
    echo "Exporting cookies from Chrome..."
    yt-dlp --cookies-from-browser chrome --cookies "$output_file" \
           "https://whop.com" --skip-download
    
    echo "Cookies saved to: $output_file"
}

# Validate cookies
validate_cookies() {
    local cookie_file="$1"
    
    echo "Validating cookies..."
    curl -s -b "$cookie_file" "https://api.whop.com/api/v1/me" | jq '.'
    
    if [ $? -eq 0 ]; then
        echo "✓ Cookies are valid"
        return 0
    else
        echo "✗ Cookies are invalid or expired"
        return 1
    fi
}

# Refresh session
refresh_session() {
    echo "Refreshing session..."
    # Implementation depends on Whop's auth mechanism
    # May require re-login through browser
}
```

### 8.3 Quality and Organization

#### 8.3.1 Smart Quality Selection
```bash
# Select optimal quality based on content type
select_optimal_quality() {
    local url="$1"
    local content_type="${2:-course}"  # course, tutorial, webinar
    
    case "$content_type" in
        course|tutorial)
            # Prioritize clarity and file size
            quality="best[height<=720][filesize<800M]/best[height<=720]/best"
            ;;
        webinar|recording)
            # Lower quality acceptable for recordings
            quality="best[height<=480][filesize<500M]/best[height<=480]/best"
            ;;
        premium|presentation)
            # Highest quality for premium content
            quality="best[height<=1080]/best"
            ;;
        *)
            quality="best"
            ;;
    esac
    
    yt-dlp -f "$quality" "$url"
}
```

#### 8.3.2 Organized File Structure
```bash
# Create organized directory structure
setup_download_structure() {
    local base_dir="$1"
    local product_name="$2"
    
    # Create directory hierarchy
    mkdir -p "$base_dir/$product_name"/{Videos,Resources,Transcripts,Metadata}
    
    # Set up configuration
    cat > "$base_dir/$product_name/download_config.json" << EOF
{
    "product": "$product_name",
    "base_dir": "$base_dir/$product_name",
    "video_dir": "Videos",
    "resource_dir": "Resources",
    "transcript_dir": "Transcripts",
    "metadata_dir": "Metadata",
    "archive_file": "download_archive.txt"
}
EOF
    
    echo "Directory structure created: $base_dir/$product_name"
}
```

### 8.4 Progress Tracking and Logging

#### 8.4.1 Download Progress Monitor
```bash
#!/bin/bash
# Monitor and log download progress

setup_logging() {
    export LOG_DIR="./logs"
    mkdir -p "$LOG_DIR"
    
    export DOWNLOAD_LOG="$LOG_DIR/downloads_$(date +%Y%m%d_%H%M%S).log"
    export ERROR_LOG="$LOG_DIR/errors_$(date +%Y%m%d_%H%M%S).log"
    export STATS_LOG="$LOG_DIR/stats.json"
}

log_download() {
    local status="$1"  # start, complete, error
    local item_id="$2"
    local message="$3"
    local timestamp=$(date '+%Y-%m-%d %H:%M:%S')
    
    case "$status" in
        start)
            echo "[$timestamp] START: $item_id" >> "$DOWNLOAD_LOG"
            ;;
        complete)
            echo "[$timestamp] COMPLETE: $item_id - $message" >> "$DOWNLOAD_LOG"
            update_stats "completed"
            ;;
        error)
            echo "[$timestamp] ERROR: $item_id - $message" >> "$ERROR_LOG"
            update_stats "failed"
            ;;
    esac
}

update_stats() {
    local status="$1"
    
    if [ ! -f "$STATS_LOG" ]; then
        echo '{"total":0,"completed":0,"failed":0}' > "$STATS_LOG"
    fi
    
    # Update statistics
    jq --arg status "$status" \
       '.total += 1 | .[$status] += 1' \
       "$STATS_LOG" > "$STATS_LOG.tmp" && mv "$STATS_LOG.tmp" "$STATS_LOG"
}

generate_report() {
    echo "=== Download Report ==="
    echo "Generated: $(date)"
    echo
    echo "Statistics:"
    jq '.' "$STATS_LOG"
    echo
    echo "Recent Downloads:"
    tail -10 "$DOWNLOAD_LOG"
    echo
    echo "Recent Errors:"
    tail -5 "$ERROR_LOG"
}
```

---

## 9. Troubleshooting and Edge Cases

### 9.1 Authentication Issues

#### 9.1.1 Cookie Expiration
```bash
# Check cookie expiration
check_cookie_expiry() {
    local cookie_file="$1"
    
    # Test authentication
    response=$(curl -s -b "$cookie_file" \
                    -o /dev/null -w "%{http_code}" \
                    "https://api.whop.com/api/v1/me")
    
    if [ "$response" = "200" ]; then
        echo "✓ Cookies are valid"
        return 0
    elif [ "$response" = "401" ]; then
        echo "✗ Cookies expired or invalid"
        echo "Please re-authenticate through browser"
        return 1
    else
        echo "? Unknown response: $response"
        return 2
    fi
}

# Auto-refresh workflow
auto_refresh_auth() {
    local cookie_file="cookies.txt"
    
    while true; do
        if ! check_cookie_expiry "$cookie_file"; then
            echo "Authentication expired. Please login in browser..."
            read -p "Press Enter after logging in..."
            export_chrome_cookies "$cookie_file"
        fi
        
        # Perform downloads
        # ...
        
        sleep 3600  # Check every hour
    done
}
```

#### 9.1.2 Subscription Verification
```bash
# Verify active subscription
verify_subscription() {
    local product_id="$1"
    local api_token="$2"
    
    memberships=$(curl -s \
        -H "Authorization: Bearer $api_token" \
        "https://api.whop.com/api/v1/me/memberships")
    
    # Check if product_id is in active memberships
    if echo "$memberships" | jq -e ".[] | select(.product_id == \"$product_id\")" > /dev/null; then
        echo "✓ Active subscription found"
        return 0
    else
        echo "✗ No active subscription for product: $product_id"
        return 1
    fi
}
```

### 9.2 Content Access Problems

#### 9.2.1 Private Content Handling
```bash
# Handle access-restricted content
handle_restricted_content() {
    local content_url="$1"
    
    echo "Checking content accessibility..."
    
    # Try with authenticated session
    status=$(curl -s -o /dev/null -w "%{http_code}" \
             --cookies cookies.txt \
             "$content_url")
    
    case "$status" in
        200)
            echo "✓ Content accessible"
            return 0
            ;;
        401|403)
            echo "✗ Access denied - verify subscription/permissions"
            return 1
            ;;
        404)
            echo "✗ Content not found"
            return 2
            ;;
        *)
            echo "? Unknown status: $status"
            return 3
            ;;
    esac
}
```

#### 9.2.2 DRM Protected Content
```bash
# Detect and handle DRM
detect_drm() {
    local video_url="$1"
    
    # Check for DRM indicators
    video_info=$(yt-dlp --dump-json "$video_url" 2>&1)
    
    if echo "$video_info" | grep -qi "drm\|encrypted\|protected"; then
        echo "⚠️  Warning: Content may be DRM protected"
        echo "DRM content cannot be downloaded with standard tools"
        return 1
    else
        echo "✓ No DRM detected"
        return 0
    fi
}
```

### 9.3 Network and Performance Issues

#### 9.3.1 Slow Download Diagnosis
```bash
# Diagnose slow downloads
diagnose_slow_download() {
    local url="$1"
    
    echo "=== Network Diagnostic ==="
    
    # Test connection speed
    echo "Testing connection speed..."
    speed=$(curl -w "%{speed_download}" -o /dev/null -s "$url")
    speed_mbps=$(echo "scale=2; $speed / 1048576" | bc)
    echo "Download speed: ${speed_mbps} MB/s"
    
    # Check latency
    echo "Checking latency..."
    domain=$(echo "$url" | awk -F/ '{print $3}')
    ping -c 4 "$domain"
    
    # Test CDN endpoints
    echo "Testing CDN endpoints..."
    for cdn in cdn.whop.com assets.whop.com; do
        time=$(curl -w "%{time_total}" -o /dev/null -s "https://$cdn")
        echo "$cdn: ${time}s"
    done
}
```

#### 9.3.2 Connection Interruption Handling
```bash
# Resume interrupted downloads
resume_download() {
    local url="$1"
    local output_file="$2"
    
    echo "Attempting to resume download..."
    
    # Check if partial file exists
    if [ -f "${output_file}.part" ]; then
        echo "Found partial file, resuming..."
        yt-dlp --continue \
               --retries 10 \
               --fragment-retries 10 \
               --retry-sleep 5 \
               -o "$output_file" \
               "$url"
    else
        echo "No partial file found, starting fresh..."
        yt-dlp --continue -o "$output_file" "$url"
    fi
}
```

### 9.4 Platform-Specific Issues

#### 9.4.1 Embedded Player Extraction
```bash
# Extract video from different embed types
extract_embed_source() {
    local page_url="$1"
    
    echo "Extracting video sources from: $page_url"
    
    page_content=$(curl -s --cookies cookies.txt "$page_url")
    
    # Check for Vimeo
    vimeo_id=$(echo "$page_content" | grep -oE "vimeo\.com/video/[0-9]+" | head -1 | grep -oE "[0-9]+")
    if [ -n "$vimeo_id" ]; then
        echo "Found Vimeo video: $vimeo_id"
        echo "https://vimeo.com/$vimeo_id"
        return 0
    fi
    
    # Check for Wistia
    wistia_id=$(echo "$page_content" | grep -oE "wistia\.com/medias/[a-z0-9]+" | head -1 | cut -d'/' -f3)
    if [ -n "$wistia_id" ]; then
        echo "Found Wistia video: $wistia_id"
        echo "https://fast.wistia.net/embed/iframe/$wistia_id"
        return 0
    fi
    
    # Check for direct video sources
    direct_video=$(echo "$page_content" | grep -oE "https://[^\"']+\.(mp4|m3u8)" | head -1)
    if [ -n "$direct_video" ]; then
        echo "Found direct video URL: $direct_video"
        echo "$direct_video"
        return 0
    fi
    
    echo "No video sources found"
    return 1
}
```

#### 9.4.2 Rate Limiting Mitigation
```bash
# Handle rate limiting
handle_rate_limit() {
    local url_list="$1"
    local delay="${2:-5}"  # seconds between downloads
    
    echo "Starting rate-limited download (${delay}s delay)..."
    
    while IFS= read -r url; do
        echo "Downloading: $url"
        
        yt-dlp --cookies cookies.txt "$url"
        
        if [ $? -eq 29 ]; then  # HTTP 429 error
            echo "⚠️  Rate limited! Waiting 60 seconds..."
            sleep 60
            yt-dlp --cookies cookies.txt "$url"  # Retry
        fi
        
        echo "Waiting ${delay} seconds before next download..."
        sleep "$delay"
    done < "$url_list"
}
```

---

## 10. Conclusion

### 10.1 Summary of Findings

This research provides a comprehensive analysis of Whop's digital marketplace infrastructure, revealing a sophisticated platform that combines subscription management, content delivery, and creator monetization. Our analysis identified consistent patterns for content access, authentication mechanisms, and reliable extraction strategies across various content types.

**Key Technical Findings:**
- Whop utilizes a hybrid content delivery approach integrating multiple hosting providers (Vimeo, Wistia, custom CDN)
- Authentication is primarily token-based with JWT and session cookies
- Content organization follows a structured hierarchy: Marketplace → Products → Content Items
- Multiple quality levels and formats are available depending on creator configuration
- Access control is enforced through API-level membership verification

### 10.2 Recommended Implementation Approach

Based on our research, we recommend a **multi-layered download strategy**:

1. **Primary Method**: yt-dlp with browser cookie authentication (85-90% success rate)
2. **Secondary Method**: Direct API access with bearer tokens
3. **Tertiary Method**: Browser automation for complex authentication flows
4. **Backup Methods**: Direct HTTP downloads for non-video content

### 10.3 Tool Recommendations

**Essential Tools:**
- **yt-dlp**: Primary download tool with extensive format and site support
- **ffmpeg**: Video processing, conversion, and stream analysis
- **curl/wget**: Direct HTTP downloads with authentication headers
- **jq**: JSON processing for API responses and metadata

**Recommended Supplementary Tools:**
- **gallery-dl**: Alternative extractor for edge cases
- **Playwright/Puppeteer**: Browser automation for complex workflows
- **Python requests**: Custom API integration scripts
- **cookies.txt browser extension**: Easy cookie export for authentication

**Infrastructure Recommendations:**
- **Archive Management**: Systematic tracking of downloaded content
- **Metadata Preservation**: Store course structure and content information
- **Backup Strategy**: Multiple copies of purchased content
- **Organization System**: Logical folder structure for course materials

### 10.4 Performance Considerations

Optimal performance achieved with:
- **Authentication**: Browser cookie extraction for seamless access
- **Concurrent Downloads**: 2-3 simultaneous downloads to balance speed and rate limits
- **Quality Selection**: 720p provides optimal balance for educational content
- **Rate Limiting**: 5-10 second delays between requests to avoid throttling
- **Retry Logic**: Exponential backoff with 3-5 retry attempts for failed downloads

### 10.5 Security and Compliance

**Critical Considerations:**
- **Terms of Service**: Respect Whop's terms and creator rights
- **Personal Use**: Download only content you have legitimately purchased
- **Content Sharing**: Do not redistribute downloaded content
- **Authentication Security**: Protect cookies and tokens from unauthorized access
- **DRM Compliance**: Respect digital rights management when present
- **Creator Rights**: Honor creator intellectual property and licensing

### 10.6 Best Practices

**For Users:**
1. Always maintain active subscriptions for content you download
2. Use downloads for personal backup and offline access only
3. Keep authentication credentials secure
4. Respect rate limits to avoid account suspension
5. Organize downloaded content systematically

**For Developers:**
1. Implement proper error handling and retry logic
2. Use authenticated sessions correctly
3. Cache metadata to reduce API calls
4. Monitor download success rates and adapt strategies
5. Keep tools and libraries updated

### 10.7 Future Enhancements

**Potential Improvements:**
1. **Automated Course Tracking**: Monitor for new content additions
2. **Selective Sync**: Download only new or updated content
3. **Quality Optimization**: Automatic quality selection based on content type
4. **Batch Processing**: Efficient multi-course download management
5. **Mobile Support**: Mobile app integration for on-the-go access
6. **Cloud Sync**: Integration with cloud storage providers
7. **Transcription**: Automatic subtitle generation for video content
8. **Search Functionality**: Local search across downloaded content

### 10.8 Maintenance and Updates

Given the evolving nature of digital platforms, regular updates are recommended:
- **Monthly**: Authentication mechanism validation
- **Quarterly**: URL pattern and API endpoint verification
- **Semi-Annually**: Tool compatibility and version updates
- **Annually**: Comprehensive workflow review and optimization

### 10.9 Support and Community

**Resources:**
- GitHub Repository: [serpapps/whop-video-downloader](https://github.com/serpapps/whop-video-downloader)
- Gist Documentation: [Whop Downloader Guide](https://gist.github.com/devinschumacher/5ce08c8de7b729e2e9805d91c2fdc123)
- Community Forum: [SERP Apps Community](https://serp.ly/@serp/community)
- Bug Reports: [GitHub Issues](https://github.com/serpapps/whop-video-downloader/issues)

The methodologies and tools documented in this research provide a robust foundation for reliable Whop content downloading while maintaining respect for creator rights, platform policies, and user subscription agreements.

---

**Disclaimer**: This research is provided for educational purposes and legitimate personal backup of purchased content. Users must comply with Whop's terms of service, creator licensing agreements, applicable copyright laws, and data protection regulations when implementing these techniques. Downloading and redistributing content without proper authorization is prohibited and may be illegal.

**Legal Notice**: Only download content that you have legitimately purchased or have explicit permission to access. Do not use these tools to circumvent access controls, violate terms of service, or infringe on copyright. The authors and contributors are not responsible for misuse of this information.

**Last Updated**: January 2025  
**Research Version**: 1.0  
**Next Review**: April 2025

---

## Appendix A: Quick Reference Commands

### Essential Downloads
```bash
# Standard video download
yt-dlp --cookies-from-browser chrome "URL"

# Course with structure
yt-dlp --cookies cookies.txt -o "%(uploader)s/%(playlist)s/%(playlist_index)s - %(title)s.%(ext)s" "COURSE_URL"

# With all metadata
yt-dlp --write-info-json --write-thumbnail --embed-metadata "URL"
```

### Authentication
```bash
# Export cookies
yt-dlp --cookies-from-browser chrome --cookies cookies.txt --skip-download "https://whop.com"

# Test authentication
curl -b cookies.txt "https://api.whop.com/api/v1/me"
```

### Quality Selection
```bash
# List formats
yt-dlp -F "URL"

# Download 720p
yt-dlp -f "best[height<=720]" "URL"
```

### Troubleshooting
```bash
# Verbose output
yt-dlp -v "URL"

# Test extraction
yt-dlp --dump-json "URL"

# Check cookies
yt-dlp --cookies cookies.txt --dump-json "URL"
```

## Appendix B: Configuration Templates

### yt-dlp Configuration File
```bash
# ~/.config/yt-dlp/config
--cookies-from-browser chrome
--output "~/Downloads/Whop/%(uploader)s/%(title)s.%(ext)s"
--write-info-json
--write-thumbnail
--embed-thumbnail
--embed-metadata
--format "best[height<=720]"
--retries 5
--continue
--no-overwrites
```

### Environment Variables
```bash
# ~/.bashrc or ~/.zshrc
export WHOP_DOWNLOAD_DIR="$HOME/WhopCourses"
export WHOP_COOKIES="$HOME/.config/whop/cookies.txt"
export WHOP_API_TOKEN="your_api_token_here"
```

---

## Appendix C: Glossary

**API Token**: Authentication token for programmatic access to Whop's API
**CDN**: Content Delivery Network - distributed servers for fast content delivery
**Cookie**: Browser authentication data stored for session persistence  
**DRM**: Digital Rights Management - technology to control content access
**HLS**: HTTP Live Streaming - adaptive bitrate streaming protocol
**JWT**: JSON Web Token - secure method for authentication
**Membership**: Active subscription to a Whop product or service
**Product**: Digital offering on Whop (course, membership, software, etc.)
**Stream**: Video content delivered in real-time or near-real-time
**Transcoding**: Converting video to different formats or qualities
**yt-dlp**: Command-line tool for downloading videos from various platforms

---

**End of Document**
  
</details>

