// CrackMe — backend config
//
// This site stores quizzes and leaderboards using jsonbin.io's free API
// (a simple hosted JSON storage service — no server needed).
//
// SETUP (2 minutes):
// 1. Go to https://jsonbin.io and create a free account.
// 2. Open the "API Keys" section of your dashboard.
// 3. Copy your "X-Master-Key" and paste it below, inside the quotes.
//
// Note: because this is a static site, this key is visible to anyone who
// views the page source. That's fine for a casual game among friends —
// just don't put anything sensitive in it, and if it ever gets abused,
// you can regenerate the key from your jsonbin.io dashboard.

const CONFIG = {
  JSONBIN_KEY: "$2a$10$mSMEIeGOlO07LnsYZCduyOBg/h.MIo5UB60nrZbUXtHrrETAv8hV6",
  JSONBIN_BASE: "https://api.jsonbin.io/v3/b",
};
