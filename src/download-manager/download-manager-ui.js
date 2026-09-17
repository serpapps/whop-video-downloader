export class DownloadManagerUI{constructor(e={}){this.config=e,this.panel=null,this.elements={}}createPanel(){if(this.panel)return this.panel;const e=document.getElementById("whopp-download-manager");return e?(this.panel=e,this.cacheElements(),this.bindEvents(),this.panel):(this.panel=document.createElement("div"),this.panel.id="whopp-download-manager",this.panel.style.cssText=this.generatePanelStyles(),this.panel.innerHTML=this.generatePanelHTML(),document.querySelector(this.config.integration?.parentSelector||"body").appendChild(this.panel),this.cacheElements(),this.bindEvents(),this.panel)}generatePanelStyles(){const t=typeof window<"u"&&window.innerWidth<500?Math.min(window.innerWidth-40,340):380,o=typeof window<"u"?Math.min(window.innerHeight-80,500):500,n=this.config.styles||{},i=n.border||`2px solid ${n.primaryColor||"#625df5"}`,s=n.boxShadow||"0 4px 16px rgba(0,0,0,0.5)",l=n.textColor||"#fff",a=n.fontFamily||"-apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif",r=n.fontSize||"13px",d=n.backgroundColor||"#1b1b1b";return`
      position: fixed;
      top: 20px;
      right: 20px;
      width: ${t}px;
      max-height: ${o}px;
      background: ${d};
      border: ${i};
      border-radius: 8px;
      box-shadow: ${s};
      z-index: ${this.config.integration?.zIndexBase||2147483647};
      isolation: isolate;
      pointer-events: auto;
      font-family: ${a};
      font-size: ${r};
      color: ${l};
      overflow: hidden;
      transform: translateX(100%);
      opacity: 0;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    `}generatePanelHTML(){const e=this.config.integration?.cssPrefix||"whopp",t=this.config.labels||{},o=this.config.styles||{},n=o.headerBackground||"linear-gradient(135deg, #333, #222)",i=o.headerBorder||"1px solid #444",s=o.primaryColor||"#625df5",l="#5144d8",a=typeof window<"u"?Math.min(window.innerHeight-80,500):500;return`
      <div id="${e}-download-manager-header" style="
        background: ${n};
        color: white;
        padding: 8px 12px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-weight: bold;
        cursor: pointer;
        user-select: none;
        border-bottom: ${i};
      ">
        <div id="${e}-download-manager-title">${t.title||"📥 Downloads"} (0 active)</div>
        <div style="display: flex; gap: 8px; align-items: center;">
          <button id="${e}-download-manager-cancel-all" title="${t.cancelAll||"Cancel all active downloads"}" style="
            background: #d32f2f;
            border: none;
            color: white;
            padding: 4px 8px;
            border-radius: 4px;
            cursor: pointer;
            font-size: 11px;
            transition: background 0.2s ease;
            display: none;
          " onmouseover="this.style.background='#b71c1c'" onmouseout="this.style.background='#d32f2f'">${t.cancelAll||"Cancel All"}</button>
          <button id="${e}-download-manager-clear" title="${t.clearCompleted||"Clear completed"}" style="
            background: ${s};
            border: none;
            color: white;
            padding: 4px 8px;
            border-radius: 4px;
            cursor: pointer;
            font-size: 11px;
            transition: background 0.2s ease;
          " onmouseover="this.style.background='${l}'" onmouseout="this.style.background='${s}'">${t.clearCompleted||"Clear"}</button>
          <button id="${e}-download-manager-collapse" title="${t.collapse||"Collapse"}" style="
            background: rgba(255,255,255,0.1);
            border: none;
            color: white;
            font-size: 16px;
            cursor: pointer;
            padding: 0;
            width: 20px;
            height: 20px;
            border-radius: 3px;
            transition: background 0.2s ease;
          " onmouseover="this.style.background='rgba(255,255,255,0.2)'" onmouseout="this.style.background='rgba(255,255,255,0.1)'">−</button>
        </div>
      </div>
      <div id="${e}-download-manager-content" style="
        max-height: ${a-50}px;
        overflow-y: auto;
        scrollbar-width: thin;
        scrollbar-color: #666 transparent;
        background: #1b1b1b;
      "></div>
      <style>
        #${e}-download-manager-content::-webkit-scrollbar { width: 6px; }
        #${e}-download-manager-content::-webkit-scrollbar-track { background: #1b1b1b; }
        #${e}-download-manager-content::-webkit-scrollbar-thumb { background: #666; border-radius: 3px; }
        #${e}-download-manager-content::-webkit-scrollbar-thumb:hover { background: #888; }
      </style>
    `}cacheElements(){const e=this.config.integration?.cssPrefix||"whopp";this.elements.header=document.getElementById(`${e}-download-manager-header`),this.elements.title=document.getElementById(`${e}-download-manager-title`),this.elements.content=document.getElementById(`${e}-download-manager-content`),this.elements.clearBtn=document.getElementById(`${e}-download-manager-clear`),this.elements.cancelAllBtn=document.getElementById(`${e}-download-manager-cancel-all`),this.elements.collapseBtn=document.getElementById(`${e}-download-manager-collapse`)}bindEvents(){const e=this.config.integration?.cssPrefix||"whopp";this.elements.collapseBtn&&this.elements.collapseBtn.addEventListener("click",t=>{t.stopPropagation(),this.hidePanel()}),this.elements.header&&this.elements.header.addEventListener("click",()=>{this.panel.style.transform==="translateX(0%)"?this.hidePanel():this.showPanel()}),this.elements.clearBtn&&this.elements.clearBtn.addEventListener("click",()=>{typeof this.onClearCompleted=="function"&&this.onClearCompleted()}),this.elements.cancelAllBtn&&this.elements.cancelAllBtn.addEventListener("click",()=>{typeof this.onCancelAll=="function"&&this.onCancelAll()})}showPanel(){this.panel.style.transform="translateX(0%)",this.panel.style.opacity="1"}hidePanel(){this.panel.style.transform="translateX(100%)",this.panel.style.opacity="0"}updateHeader(e){const t=this.config.labels||{},o=e.active>0?(t.activeDownloads||"({count} active)").replace("{count}",e.active):t.noActiveDownloads||"(none)";this.elements.title&&(this.elements.title.textContent=`${t.title||"📥 Downloads"} ${o}`),this.elements.cancelAllBtn&&(this.elements.cancelAllBtn.style.display=e.active>1?"inline-block":"none")}addOrUpdateItem(e,t){const o=this.config.integration?.cssPrefix||"whopp",n=this.elements.content.querySelector(`[data-id="${e}"]`),i=this.config.styles&&this.config.styles.primaryColor||"#625df5",s="#5144d8",l=a=>`
        <div class="dm-item" data-id="${e}" style="
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 8px;
          border-bottom: 1px solid #333;
          padding: 10px 12px;
        ">
          <div>
            <div class="dm-fn" style="color:#fff; font-weight:600; font-size:13px;">${(a.filename||"Video").toString().replace(/</g,"&lt;")}</div>
            <div class="dm-st" style="color:#aaa; font-size:12px; margin-top:3px;">${a.status||"Downloading..."}</div>
            <div class="dm-pb" style="height:6px; background:#2a2a2a; border-radius:3px; overflow:hidden; margin-top:8px;">
              <div class="dm-pf" style="height:100%; width:${Math.max(0,Math.min(100,a.progress||0))}%; background:${i};"></div>
            </div>
          </div>
          <div style="display:flex; gap:6px; align-items:center;">
            <button class="dm-cancel" title="Cancel" style="
              background:#d32f2f; color:#fff; border:none; border-radius:4px; padding:4px 8px; font-size:11px; cursor:pointer;"
              onmouseover="this.style.background='#b71c1c'" onmouseout="this.style.background='#d32f2f'">✕</button>
            <button class="dm-remove" title="Remove" style="
              background:${i}; color:#fff; border:none; border-radius:4px; padding:4px 8px; font-size:11px; cursor:pointer;"
              onmouseover="this.style.background='${s}'" onmouseout="this.style.background='${i}'">✔</button>
          </div>
        </div>
      `;if(n){n.querySelector(".dm-fn").textContent=t.filename||"Video",n.querySelector(".dm-st").textContent=t.status||"";const a=n.querySelector(".dm-pf");a.style.width=`${Math.max(0,Math.min(100,t.progress||0))}%`,t.isCompleted&&(n.querySelector(".dm-st").textContent=this.config.labels?.completed||"Completed")}else{const a=document.createElement("div");a.innerHTML=l(t);const r=a.firstElementChild;this.elements.content.prepend(r),r.querySelector(".dm-cancel").addEventListener("click",d=>{d.stopPropagation(),typeof this.onCancelItem=="function"&&this.onCancelItem(e)}),r.querySelector(".dm-remove").addEventListener("click",d=>{d.stopPropagation(),typeof this.onRemoveItem=="function"&&this.onRemoveItem(e)})}}removeDownloadItem(e){const t=this.elements.content?.querySelector(`[data-id="${e}"]`);t&&t.remove()}renderDownloads(e){e.forEach((o,n)=>this.addOrUpdateItem(n,o));const t=new Set(Array.from(e.keys()));this.elements.content.querySelectorAll("[data-id]")?.forEach(o=>{const n=o.getAttribute("data-id");t.has(n)||o.remove()})}updateUI(e,t){this.updateHeader(e),this.renderDownloads(t)}}
