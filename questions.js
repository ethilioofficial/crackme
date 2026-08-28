// CrackMe — shared question bank.
// Every quiz uses the same 15 questions. The creator locks in the
// correct option for each; friends then try to guess it.
// Each option has an emoji "sticker" + text so it never feels like a bare list.

const QUESTIONS = [
  { text: "{name}'s favorite color is...", options: [
    { text: "Red", emoji: "🔴" }, { text: "Blue", emoji: "🔵" },
    { text: "Black", emoji: "⚫" }, { text: "Green", emoji: "🟢" } ] },

  { text: "If I could have any superpower, I'd pick...", options: [
    { text: "Teleportation", emoji: "🌀" }, { text: "Mind reading", emoji: "🧠" },
    { text: "Invisibility", emoji: "👻" }, { text: "Time travel", emoji: "⏳" } ] },

  { text: "My comfort food when I'm sad is...", options: [
    { text: "Pizza", emoji: "🍕" }, { text: "Ice cream", emoji: "🍦" },
    { text: "Biryani", emoji: "🍛" }, { text: "Instant noodles", emoji: "🍜" } ] },

  { text: "You'll probably catch me at 2 AM...", options: [
    { text: "Scrolling reels", emoji: "📱" }, { text: "Overthinking", emoji: "🌀" },
    { text: "Snacking", emoji: "🍫" }, { text: "Fast asleep", emoji: "😴" } ] },

  { text: "Have I ever cried because of someone?", options: [
    { text: "Yes", emoji: "✅" }, { text: "No", emoji: "❌" } ] },

  { text: "My biggest fear in life is...", options: [
    { text: "Failure", emoji: "😨" }, { text: "Being alone", emoji: "🌑" },
    { text: "Losing loved ones", emoji: "💔" }, { text: "Public embarrassment", emoji: "😳" } ] },

  { text: "Do I believe in love at first sight?", options: [
    { text: "Yes", emoji: "💘" }, { text: "No", emoji: "🙅" } ] },

  { text: "If I could relive one age, I'd go back to...", options: [
    { text: "Childhood", emoji: "🧸" }, { text: "Teenage years", emoji: "🎒" },
    { text: "College days", emoji: "🎓" }, { text: "Right now", emoji: "✨" } ] },

  { text: "If I'm upset, I'd rather...", options: [
    { text: "Talk it out", emoji: "🗣️" }, { text: "Be alone", emoji: "🌑" },
    { text: "Vent to a friend", emoji: "👯" }, { text: "Ignore it", emoji: "🙈" } ] },

  { text: "Do I currently have a crush on someone?", options: [
    { text: "Yes", emoji: "😍" }, { text: "No", emoji: "🙅" } ] },

  { text: "My biggest regret in life is about...", options: [
    { text: "A missed opportunity", emoji: "💼" }, { text: "A relationship", emoji: "💔" },
    { text: "Something I said", emoji: "🗣️" }, { text: "A choice I made", emoji: "📚" } ] },

  { text: "Have I ever failed an exam?", options: [
    { text: "Yes", emoji: "✅" }, { text: "No", emoji: "❌" } ] },

  { text: "My idea of true happiness is...", options: [
    { text: "Peace & quiet", emoji: "🏡" }, { text: "Being surrounded by people", emoji: "🎉" },
    { text: "Achieving goals", emoji: "🏆" }, { text: "Being loved", emoji: "❤️" } ] },

  { text: "Do I overthink before texting someone back?", options: [
    { text: "Yes", emoji: "✅" }, { text: "No", emoji: "❌" } ] },

  { text: "The thing I'm most proud of is...", options: [
    { text: "Overcoming a struggle", emoji: "💪" }, { text: "An achievement", emoji: "🎓" },
    { text: "Who I've become", emoji: "🧠" }, { text: "My relationships", emoji: "👨‍👩‍👧‍👦" } ] },
];

const EXPIRY_DAYS = 14;

// Accent color cycles through these per question, for a playful, varied feel.
const ACCENTS = ["#FF6F91", "#4FC3F7", "#FFC93C", "#7ED957"];
