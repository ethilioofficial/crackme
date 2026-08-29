// CrackMe — shared question bank.
// Every quiz uses the same 15 questions. The creator locks in the
// correct option for each; friends then try to guess it.
// Each option has an emoji "sticker" + text so it never feels like a bare list.
// Question text uses {name} as a placeholder for the quiz owner's name —
// it's swapped in at render time by both create.js and play.js.

const QUESTIONS = [
  { text: "{name}'s favorite color is...", options: [
    { text: "Red", emoji: "🔴" }, { text: "Blue", emoji: "🔵" },
    { text: "Black", emoji: "⚫" }, { text: "Green", emoji: "🟢" } ] },

  { text: "If {name} could have any superpower, they'd pick...", options: [
    { text: "Teleportation", emoji: "🌀" }, { text: "Mind reading", emoji: "🧠" },
    { text: "Invisibility", emoji: "👻" }, { text: "Time travel", emoji: "⏳" } ] },

  { text: "{name}'s comfort food when sad is...", options: [
    { text: "Pizza", emoji: "🍕" }, { text: "Ice cream", emoji: "🍦" },
    { text: "Biryani", emoji: "🍛" }, { text: "Instant noodles", emoji: "🍜" } ] },

  { text: "You'll probably catch {name} at 2 AM...", options: [
    { text: "Scrolling reels", emoji: "📱" }, { text: "Overthinking", emoji: "🌀" },
    { text: "Snacking", emoji: "🍫" }, { text: "Fast asleep", emoji: "😴" } ] },

  { text: "Has {name} ever cried because of someone?", options: [
    { text: "Yes", emoji: "✅" }, { text: "No", emoji: "❌" } ] },

  { text: "{name}'s biggest fear in life is...", options: [
    { text: "Failure", emoji: "😨" }, { text: "Being alone", emoji: "🌑" },
    { text: "Losing loved ones", emoji: "💔" }, { text: "Public embarrassment", emoji: "😳" } ] },

  { text: "Does {name} believe in love at first sight?", options: [
    { text: "Yes", emoji: "💘" }, { text: "No", emoji: "🙅" } ] },

  { text: "If {name} could relive one age, they'd go back to...", options: [
    { text: "Childhood", emoji: "🧸" }, { text: "Teenage years", emoji: "🎒" },
    { text: "College days", emoji: "🎓" }, { text: "Right now", emoji: "✨" } ] },

  { text: "If {name} is upset, they'd rather...", options: [
    { text: "Talk it out", emoji: "🗣️" }, { text: "Be alone", emoji: "🌑" },
    { text: "Vent to a friend", emoji: "👯" }, { text: "Ignore it", emoji: "🙈" } ] },

  { text: "Does {name} currently have a crush on someone?", options: [
    { text: "Yes", emoji: "😍" }, { text: "No", emoji: "🙅" } ] },

  { text: "{name}'s biggest regret in life is about...", options: [
    { text: "A missed opportunity", emoji: "💼" }, { text: "A relationship", emoji: "💔" },
    { text: "Something they said", emoji: "🗣️" }, { text: "A choice they made", emoji: "📚" } ] },

  { text: "Has {name} ever failed an exam?", options: [
    { text: "Yes", emoji: "✅" }, { text: "No", emoji: "❌" } ] },

  { text: "{name}'s idea of true happiness is...", options: [
    { text: "Peace & quiet", emoji: "🏡" }, { text: "Being surrounded by people", emoji: "🎉" },
    { text: "Achieving goals", emoji: "🏆" }, { text: "Being loved", emoji: "❤️" } ] },

  { text: "Does {name} overthink before texting someone back?", options: [
    { text: "Yes", emoji: "✅" }, { text: "No", emoji: "❌" } ] },

  { text: "The thing {name} is most proud of is...", options: [
    { text: "Overcoming a struggle", emoji: "💪" }, { text: "An achievement", emoji: "🎓" },
    { text: "Who they've become", emoji: "🧠" }, { text: "Their relationships", emoji: "👨‍👩‍👧‍👦" } ] },
];

const EXPIRY_DAYS = 14;

// Accent color cycles through these per question, for a playful, varied feel.
const ACCENTS = ["#FF6F91", "#4FC3F7", "#FFC93C", "#7ED957"];

// Swaps the {name} placeholder for the quiz owner's actual name.
function personalize(text, name) {
  return text.replace(/\{name\}/g, name || "they");
}
