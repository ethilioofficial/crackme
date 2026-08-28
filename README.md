# CrackMe

"How well do your friends know you?" — set the true answer to 15 questions
about yourself, send the link, and watch the scoreboard fill up as friends
try to guess you correctly.

## How it works

1. You open `index.html`, answer 15 questions about yourself, and hit
   **Lock it in & get my link**.
2. You get a shareable link (`play.html?id=...`) — send it to friends.
3. Each friend opens the link, guesses your answers, and submits.
4. Everyone's score lands on a shared leaderboard on that same link.
5. A CrackMe stays active for **14 days** after creation (set in
   `questions.js` as `EXPIRY_DAYS`), then the page shows an "expired"
   message. You can change that number any time.

No backend server needed — this is a static site that stores quiz data
using [jsonbin.io](https://jsonbin.io)'s free hosted-JSON API.

## Setup (2 minutes)

1. Go to **https://jsonbin.io** and create a free account.
2. In your dashboard, open **API Keys** and copy your **X-Master-Key**.
3. Open `config.js` in this project and paste it in:
   ```js
   const CONFIG = {
     JSONBIN_KEY: "your-key-here",
     JSONBIN_BASE: "https://api.jsonbin.io/v3/b",
   };
   ```
4. Save the file.

## Publish to GitHub Pages

1. Create a new GitHub repo and push all files in this folder
   (`index.html`, `play.html`, `style.css`, `create.js`, `play.js`,
   `questions.js`, `config.js`) to it.
2. In the repo, go to **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**,
   pick your main branch and `/ (root)`, then save.
4. After a minute, your site will be live at
   `https://<your-username>.github.io/<repo-name>/`.
5. Open that link, create a CrackMe, and share the generated `play.html`
   link with friends.

## Editing the questions

All 15 questions and their answer choices live in `questions.js`. Edit the
`QUESTIONS` array to change wording or options — both `index.html` (the
creator flow) and `play.html` (the friend flow) pull from this same file,
so you only need to edit it once.

## A couple of honest notes

- Because this is a static site, your jsonbin.io key technically has to
  live somewhere the browser can read it. `config.js` stores it split
  into three encoded chunks and reassembles it at runtime — this stops
  casual copy-pasting and automated bots that scan public repos for
  plainly-formatted keys, but it is not true secrecy. A determined
  person could still recover it. Don't reuse this key anywhere sensitive,
  and regenerate it from your jsonbin.io dashboard any time you're
  unsure. See the comments at the top of `config.js` for how to swap in
  a new key.
- If you want an extra layer, make the GitHub repo **Private** in
  Settings → General — GitHub Pages still works from a private repo on
  the free plan.
- The 14-day expiry is enforced by the page (it checks the creation date
  and stops showing the quiz) — the data itself isn't auto-deleted from
  jsonbin.io. Check jsonbin's free-tier limits if you plan to create a
  lot of CrackMe's.
- Two friends submitting at the exact same second could rarely overwrite
  each other's score — acceptable for a fun project, but worth knowing.

---
Powered by Ethilio
