// CrackMe — emoji.js
// Converts plain emoji characters into small, consistent sticker-style
// images (via Twemoji, an open, license-safe emoji graphic set) so the
// app looks the same on every device instead of relying on each phone's
// built-in emoji font. No animation is applied — these are static
// images, just like a sticker on a page.

function stickerize(el) {
  if (typeof twemoji === "undefined" || !el) return;
  twemoji.parse(el, {
    base: "https://cdn.jsdelivr.net/npm/twemoji@14.0.2/assets/",
    folder: "svg",
    ext: ".svg",
  });
}
