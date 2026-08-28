// CrackMe — shared question bank.
// Every quiz uses the same 15 questions. The creator locks in the
// correct option for each; friends then try to guess it.
// Each option has an emoji "sticker" + text so it never feels like a bare list.

const QUESTIONS = [
  { text: "My favorite color is...", options: [
    { text: "Red", emoji: "🔴" }, { text: "Blue", emoji: "🔵" },
    { text: "Black", emoji: "⚫" }, { text: "Green", emoji: "🟢" } ] },

  { text: "If I could have any superpower, I'd choose...", options: [
    { text: "Teleportation", emoji: "🌀" }, { text: "Mind reading", emoji: "🧠" },
    { text: "Invisibility", emoji: "👻" }, { text: "Time travel", emoji: "⏳" } ] },

  { text: "My idea of a perfect weekend is...", options: [
    { text: "Netflix & chill", emoji: "🛋️" }, { text: "Outdoor adventure", emoji: "🏕️" },
    { text: "Hanging with friends", emoji: "👯" }, { text: "Solo road trip", emoji: "🚗" } ] },

  { text: "My biggest fear is...", options: [
    { text: "Public speaking", emoji: "🎤" }, { text: "Heights", emoji: "🏔️" },
    { text: "Being alone", emoji: "🌑" }, { text: "Failure", emoji: "📉" } ] },

  { text: "My go-to comfort food is...", options: [
    { text: "Pizza", emoji: "🍕" }, { text: "Ice cream", emoji: "🍦" },
    { text: "Biryani", emoji: "🍛" }, { text: "Instant noodles", emoji: "🍜" } ] },

  { text: "I'm most likely to be found...", options: [
    { text: "Scrolling my phone", emoji: "📱" }, { text: "At the gym", emoji: "🏋️" },
    { text: "Studying / working", emoji: "📚" }, { text: "Sleeping", emoji: "😴" } ] },

  { text: "My energy at a party is...", options: [
    { text: "Dance floor MVP", emoji: "💃" }, { text: "Deep in one conversation", emoji: "🗣️" },
    { text: "Chilling with snacks", emoji: "🍟" }, { text: "Gone within an hour", emoji: "🚪" } ] },

  { text: "If I won the lottery, first thing I'd do is...", options: [
    { text: "Travel the world", emoji: "✈️" }, { text: "Buy a house", emoji: "🏠" },
    { text: "Invest it all", emoji: "📈" }, { text: "Help family & friends", emoji: "👨‍👩‍👧‍👦" } ] },

  { text: "My biggest pet peeve is...", options: [
    { text: "People being late", emoji: "⏱️" }, { text: "Loud chewing", emoji: "😬" },
    { text: "Bad grammar", emoji: "✍️" }, { text: "Getting interrupted", emoji: "🙅" } ] },

  { text: "My sleep schedule is...", options: [
    { text: "Early bird", emoji: "🌅" }, { text: "Night owl", emoji: "🦉" },
    { text: "All over the place", emoji: "🌀" }, { text: "4 hours is enough", emoji: "😅" } ] },

  { text: "My hidden talent is...", options: [
    { text: "Singing", emoji: "🎤" }, { text: "Dancing", emoji: "💃" },
    { text: "Impressions", emoji: "🎭" }, { text: "Magic tricks", emoji: "🪄" } ] },

  { text: "The movie genre I never skip is...", options: [
    { text: "Comedy", emoji: "😂" }, { text: "Horror", emoji: "👻" },
    { text: "Romance", emoji: "💕" }, { text: "Action", emoji: "💥" } ] },

  { text: "My dream travel destination is...", options: [
    { text: "Maldives", emoji: "🏝️" }, { text: "Iceland", emoji: "❄️" },
    { text: "Thailand", emoji: "🛕" }, { text: "New York", emoji: "🗽" } ] },

  { text: "If I were an animal, I'd be a...", options: [
    { text: "Cat", emoji: "🐱" }, { text: "Wolf", emoji: "🐺" },
    { text: "Owl", emoji: "🦉" }, { text: "Dolphin", emoji: "🐬" } ] },

  { text: "Do I currently have a crush on someone?", options: [
    { text: "Yes", emoji: "😍" }, { text: "No", emoji: "🙅" },
    { text: "Maybe", emoji: "🤔" }, { text: "It's complicated", emoji: "😵‍💫" } ] },
];

const EXPIRY_DAYS = 14;

// Accent color cycles through these per question, for a playful, varied feel.
const ACCENTS = ["#FF6F91", "#4FC3F7", "#FFC93C", "#7ED957"];
