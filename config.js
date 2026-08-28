// CrackMe — backend config
//
// This site stores quizzes and leaderboards using jsonbin.io's free API
// (a simple hosted JSON storage service — no server needed).
//
// The key below is split and encoded rather than written as a plain
// string. This does NOT make it truly secret (any static site's key is
// technically visible to a determined person) — but it stops casual
// page-source copying and automated bots that scan public repos for
// obviously-formatted API keys. If you ever suspect misuse, regenerate
// the key from your jsonbin.io dashboard and re-run the build step below.
//
// TO UPDATE YOUR KEY:
// 1. Get your new X-Master-Key from https://jsonbin.io (API Keys page).
// 2. Replace the three CHUNK values below using this Python snippet:
//      import base64
//      k = "your-new-key-here"
//      rev = base64.b64encode(k.encode()).decode()[::-1]
//      n = len(rev)
//      print(rev[:n//3]); print(rev[n//3:2*n//3]); print(rev[2*n//3:])
//    Paste the three printed lines into CHUNK_A/B/C below, in order.

const _CHUNK_A = "2YFa4YXQUVkcyhEdYVlYaJnbwY";
const _CHUNK_B = "jQVVzbJ1kLo9yZC9Ue1R2Qal1cu";
const _CHUNK_C = "x0Nw8EbPdUZJVUTT1GJwEDJhJDJ";

function _assembleKey() {
  const reversed = _CHUNK_A + _CHUNK_B + _CHUNK_C;
  const encoded = reversed.split("").reverse().join("");
  return atob(encoded);
}

const CONFIG = {
  JSONBIN_KEY: _assembleKey(),
  JSONBIN_BASE: "https://api.jsonbin.io/v3/b",
};
