/**
 * 全站共用的 SVG 圖示精靈（sprite）。沿用舊站的 symbol 定義。
 * 在 layout 中渲染一次，元件用 <Icon name="i-..." /> 透過 <use> 引用。
 */
export function IconSprite() {
  return (
    <svg
      aria-hidden
      style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}
    >
      <symbol id="i-home" viewBox="0 0 24 24">
        <path d="m3 11 9-8 9 8" />
        <path d="M5 10v10h14V10" />
        <path d="M9 20v-6h6v6" />
      </symbol>
      <symbol id="i-grid" viewBox="0 0 24 24">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </symbol>
      <symbol id="i-calculator" viewBox="0 0 24 24">
        <rect x="4" y="2" width="16" height="20" rx="2" />
        <path d="M8 6h8" />
        <path d="M8 10h.01M12 10h.01M16 10h.01M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01" />
      </symbol>
      <symbol id="i-wrench" viewBox="0 0 24 24">
        <path d="M14.7 6.3a4 4 0 0 0 5 5L11 20a2.8 2.8 0 0 1-4-4l8.7-8.7Z" />
      </symbol>
      <symbol id="i-info" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 10v6" />
        <path d="M12 7h.01" />
      </symbol>
      <symbol id="i-message" viewBox="0 0 24 24">
        <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4Z" />
      </symbol>
      <symbol id="i-phone" viewBox="0 0 24 24">
        <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.7 19.7 0 0 1-8.6-3.1 19.4 19.4 0 0 1-6-6A19.7 19.7 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7l.5 3a2 2 0 0 1-.6 1.8L7.7 9.8a16 16 0 0 0 6.5 6.5l1.3-1.3a2 2 0 0 1 1.8-.6l3 .5a2 2 0 0 1 1.7 2Z" />
      </symbol>
      <symbol id="i-mail" viewBox="0 0 24 24">
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </symbol>
      <symbol id="i-clock" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </symbol>
      <symbol id="i-shirt" viewBox="0 0 24 24">
        <path d="M8 4 5 6 2 8l3 5 2-1v8h10v-8l2 1 3-5-3-2-3-2a4 4 0 0 1-8 0Z" />
      </symbol>
      <symbol id="i-polo" viewBox="0 0 24 24">
        <path d="M8 4 5 6 2 8l3 5 2-1v8h10v-8l2 1 3-5-3-2-3-2a4 4 0 0 1-8 0Z" />
        <path d="m9 5 3 4 3-4" />
        <path d="M10 10h4" />
      </symbol>
      <symbol id="i-hoodie" viewBox="0 0 24 24">
        <path d="M7 8a5 5 0 0 1 10 0l3 3-3 4-1-1v7H8v-7l-1 1-3-4Z" />
        <path d="M9 8c1.5 1 4.5 1 6 0" />
        <path d="M10 14v3M14 14v3" />
      </symbol>
      <symbol id="i-jacket" viewBox="0 0 24 24">
        <path d="M8 4 5 6 3 20h7V9" />
        <path d="M16 4l3 2 2 14h-7V9" />
        <path d="M12 9v12" />
        <path d="M9 4h6" />
      </symbol>
      <symbol id="i-apron" viewBox="0 0 24 24">
        <path d="M9 3h6l1 5 3 13H5L8 8Z" />
        <path d="M9 3c0 3 6 3 6 0" />
        <path d="M8 13h8" />
      </symbol>
      <symbol id="i-collar" viewBox="0 0 24 24">
        <path d="M8 4h8l3 16H5Z" />
        <path d="m8 4 4 6 4-6" />
        <path d="M12 10v10" />
        <path d="M8 12h2M14 12h2" />
      </symbol>
      <symbol id="i-pants" viewBox="0 0 24 24">
        <path d="M8 3h8l1 18h-4l-1-10-1 10H7Z" />
        <path d="M8 7h8" />
        <path d="M12 7v4" />
      </symbol>
      <symbol id="i-vest" viewBox="0 0 24 24">
        <path d="M8 4h3l1 4 1-4h3l3 17H5Z" />
        <path d="M9 4v7" />
        <path d="M15 4v7" />
        <path d="M9 14h6" />
      </symbol>
      <symbol id="i-kids" viewBox="0 0 24 24">
        <path d="M8 6 5 8l-2 3 3 3 1-1v7h10v-7l1 1 3-3-2-3-3-2a4 4 0 0 1-8 0Z" />
        <path d="M9 20v-4h6v4" />
      </symbol>
      <symbol id="i-sweatshirt" viewBox="0 0 24 24">
        <path d="M8 5 5 7 3 11l3 3 1-1v8h10v-8l1 1 3-3-2-4-3-2a4 4 0 0 1-8 0Z" />
        <path d="M9 10h6" />
      </symbol>
      <symbol id="i-bag" viewBox="0 0 24 24">
        <path d="M6 8h12l1 13H5Z" />
        <path d="M9 8V6a3 3 0 0 1 6 0v2" />
      </symbol>
      <symbol id="i-cap" viewBox="0 0 24 24">
        <path d="M3 14c2-4 6-6 10-6s7 2 8 6" />
        <path d="M3 14c5 3 10 3 18 0" />
        <path d="M15 14c3 0 5 1 6 3" />
      </symbol>
      <symbol id="i-cup" viewBox="0 0 24 24">
        <path d="M6 3h10v12a5 5 0 0 1-10 0Z" />
        <path d="M16 6h2a3 3 0 0 1 0 6h-2" />
        <path d="M5 21h12" />
      </symbol>
      <symbol id="i-search" viewBox="0 0 24 24">
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3.5-3.5" />
      </symbol>
      <symbol id="i-clipboard" viewBox="0 0 24 24">
        <rect x="5" y="4" width="14" height="18" rx="2" />
        <path d="M9 4a3 3 0 0 1 6 0" />
        <path d="M9 12h6M9 16h4" />
      </symbol>
      <symbol id="i-settings" viewBox="0 0 24 24">
        <path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z" />
        <path d="M19.4 15a1.8 1.8 0 0 0 .4 2l.1.1a2 2 0 0 1-2.8 2.8l-.1-.1a1.8 1.8 0 0 0-2-.4 1.8 1.8 0 0 0-1 1.6V21a2 2 0 0 1-4 0v-.1a1.8 1.8 0 0 0-1-1.6 1.8 1.8 0 0 0-2 .4l-.1.1a2 2 0 0 1-2.8-2.8l.1-.1a1.8 1.8 0 0 0 .4-2 1.8 1.8 0 0 0-1.6-1H3a2 2 0 0 1 0-4h.1a1.8 1.8 0 0 0 1.6-1 1.8 1.8 0 0 0-.4-2l-.1-.1a2 2 0 0 1 2.8-2.8l.1.1a1.8 1.8 0 0 0 2 .4 1.8 1.8 0 0 0 1-1.6V3a2 2 0 0 1 4 0v.1a1.8 1.8 0 0 0 1 1.6 1.8 1.8 0 0 0 2-.4l.1-.1a2 2 0 0 1 2.8 2.8l-.1.1a1.8 1.8 0 0 0-.4 2 1.8 1.8 0 0 0 1.6 1H21a2 2 0 0 1 0 4h-.1a1.8 1.8 0 0 0-1.5 1Z" />
      </symbol>
      <symbol id="i-smile" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="9" />
        <path d="M8 10h.01M16 10h.01" />
        <path d="M8 15c1.2 1.3 2.5 2 4 2s2.8-.7 4-2" />
        <path d="M19 4 21 2" />
        <path d="m3 22 2-2" />
      </symbol>
      <symbol id="i-card" viewBox="0 0 24 24">
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M3 10h18" />
        <path d="M7 15h3" />
      </symbol>
      <symbol id="i-truck" viewBox="0 0 24 24">
        <path d="M3 6h12v10H3Z" />
        <path d="M15 10h4l2 3v3h-6Z" />
        <circle cx="7" cy="18" r="2" />
        <circle cx="17" cy="18" r="2" />
      </symbol>
      <symbol id="i-layers" viewBox="0 0 24 24">
        <path d="m12 3 9 5-9 5-9-5Z" />
        <path d="m3 12 9 5 9-5" />
        <path d="m3 16 9 5 9-5" />
      </symbol>
      <symbol id="i-spark" viewBox="0 0 24 24">
        <path d="M12 2 9 9l-7 3 7 3 3 7 3-7 7-3-7-3Z" />
      </symbol>
      <symbol id="i-flame" viewBox="0 0 24 24">
        <path d="M12 22a7 7 0 0 0 7-7c0-5-5-7-5-12-3 2-6 6-6 10 0 1.5.5 3 1.5 4-2-.5-3-2-3.5-3.5A7.2 7.2 0 0 0 12 22Z" />
      </symbol>
      <symbol id="i-needle" viewBox="0 0 24 24">
        <path d="M20 4 9 15" />
        <path d="M14 4h6v6" />
        <path d="M5 19c2 2 5 2 7 0" />
        <path d="M9 15 5 19" />
      </symbol>
      <symbol id="i-hash" viewBox="0 0 24 24">
        <path d="M5 9h14M4 15h14M10 3 8 21M16 3l-2 18" />
      </symbol>
      <symbol id="i-user" viewBox="0 0 24 24">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21a8 8 0 0 1 16 0" />
      </symbol>
      <symbol id="i-note" viewBox="0 0 24 24">
        <path d="M5 3h11l3 3v15H5Z" />
        <path d="M16 3v4h4" />
        <path d="M8 12h8M8 16h6" />
      </symbol>
      <symbol id="i-arrow" viewBox="0 0 24 24">
        <path d="M5 12h14" />
        <path d="m13 6 6 6-6 6" />
      </symbol>
      <symbol id="i-copy" viewBox="0 0 24 24">
        <rect x="8" y="8" width="11" height="11" rx="2" />
        <path d="M5 15H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v1" />
      </symbol>
      <symbol id="i-link" viewBox="0 0 24 24">
        <path d="M10 13a5 5 0 0 0 7 0l2-2a5 5 0 0 0-7-7l-1 1" />
        <path d="M14 11a5 5 0 0 0-7 0l-2 2a5 5 0 0 0 7 7l1-1" />
      </symbol>
      <symbol id="i-upload" viewBox="0 0 24 24">
        <path d="M12 16V4" />
        <path d="m7 9 5-5 5 5" />
        <path d="M5 16v3h14v-3" />
      </symbol>
    </svg>
  );
}
