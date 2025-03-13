
export type WordLevel = 'basic' | 'intermediate' | 'advanced';

export interface Word {
  id: number;
  word: string;
  definition: string;
  example: string;
  level: WordLevel;
  mnemonic?: string;
  synonyms?: string[];
}

// This is a sample of GRE vocabulary words
export const words: Word[] = [
  {
    id: 1,
    word: "Abate",
    definition: "To decrease; reduce; diminish",
    example: "The storm finally abated after several hours.",
    level: "basic",
    mnemonic: "Think 'a-bait' - like reducing the amount of bait used for fishing.",
    synonyms: ["diminish", "reduce", "subside", "wane"]
  },
  {
    id: 2,
    word: "Aberration",
    definition: "A deviation from what is normal or expected",
    example: "His violent behavior was an aberration from his usually calm demeanor.",
    level: "intermediate",
    mnemonic: "Think 'error-ration' - a portion (ration) of error.",
    synonyms: ["anomaly", "deviation", "oddity", "irregularity"]
  },
  {
    id: 3,
    word: "Abjure",
    definition: "To renounce or reject solemnly; to recant",
    example: "She abjured her former beliefs after studying the new evidence.",
    level: "advanced",
    mnemonic: "Break it down to 'ab' (away) and 'jure' (related to jury/oath) - to swear away from.",
    synonyms: ["renounce", "reject", "forswear", "disavow"]
  },
  {
    id: 4,
    word: "Accolade",
    definition: "An award or privilege granted as a special honor; praise",
    example: "The actor received many accolades for his performance in the film.",
    level: "intermediate",
    synonyms: ["honor", "award", "tribute", "praise"]
  },
  {
    id: 5,
    word: "Acquiesce",
    definition: "To accept or comply passively; to agree without protest",
    example: "Although she disagreed with the decision, she acquiesced to avoid conflict.",
    level: "intermediate",
    mnemonic: "Sounds like 'agree yes' - to agree quietly.",
    synonyms: ["comply", "consent", "agree", "concur"]
  },
  {
    id: 6,
    word: "Admonish",
    definition: "To warn or reprimand someone firmly; to advise earnestly",
    example: "The teacher admonished the students for talking during the exam.",
    level: "basic",
    synonyms: ["reprimand", "scold", "caution", "warn"]
  },
  {
    id: 7,
    word: "Affluent",
    definition: "Having an abundance of wealth, property, or material goods; prosperous",
    example: "They lived in an affluent neighborhood with large houses and luxury cars.",
    level: "basic",
    mnemonic: "Contains 'flu' which sounds like 'flow' - wealth flowing abundantly.",
    synonyms: ["wealthy", "rich", "prosperous", "opulent"]
  },
  {
    id: 8,
    word: "Aggrandize",
    definition: "To increase the power, status, or wealth of",
    example: "He used his political position to aggrandize himself.",
    level: "advanced",
    mnemonic: "Sounds like 'a-grand-size' - to make oneself grand or bigger.",
    synonyms: ["enhance", "increase", "magnify", "exalt"]
  },
  {
    id: 9,
    word: "Alacrity",
    definition: "Brisk and cheerful readiness; eagerness; liveliness",
    example: "She accepted the challenge with alacrity.",
    level: "advanced",
    mnemonic: "Sounds like 'a-lack-re-tea' - not lacking readiness/energy (like after drinking tea).",
    synonyms: ["eagerness", "enthusiasm", "willingness", "readiness"]
  },
  {
    id: 10,
    word: "Ambivalent",
    definition: "Having mixed feelings or contradictory ideas about something",
    example: "He felt ambivalent about changing careers so late in life.",
    level: "intermediate",
    mnemonic: "Think 'ambi' (both) + 'valent' (strong) - strong feelings in both directions.",
    synonyms: ["conflicted", "uncertain", "undecided", "torn"]
  },
  {
    id: 11,
    word: "Ameliorate",
    definition: "To make better or more tolerable; improve",
    example: "The new treatment ameliorated her symptoms.",
    level: "advanced",
    mnemonic: "Sounds like 'a-melio-rate' - 'melio' comes from Latin for 'better' - to make better.",
    synonyms: ["improve", "enhance", "upgrade", "better"]
  },
  {
    id: 12,
    word: "Amorphous",
    definition: "Without a clearly defined shape or form",
    example: "The amorphous cloud of smoke drifted through the room.",
    level: "intermediate",
    mnemonic: "Break it down to 'a' (without) + 'morph' (form) - without form.",
    synonyms: ["shapeless", "formless", "undefined", "vague"]
  },
  {
    id: 13,
    word: "Anomaly",
    definition: "Something that deviates from what is standard, normal, or expected",
    example: "The results showed an anomaly that required further investigation.",
    level: "basic",
    synonyms: ["aberration", "deviation", "oddity", "peculiarity"]
  },
  {
    id: 14,
    word: "Antithetical",
    definition: "Directly opposed or contrasted; mutually incompatible",
    example: "Their views on politics are antithetical to each other.",
    level: "advanced",
    mnemonic: "Anti (against) + thesis - against the thesis or proposition.",
    synonyms: ["contrary", "opposed", "conflicting", "incompatible"]
  },
  {
    id: 15,
    word: "Apathy",
    definition: "Lack of interest, enthusiasm, or concern",
    example: "The politician was concerned about voter apathy in the upcoming election.",
    level: "basic",
    mnemonic: "A (without) + pathy (feeling) - without feeling or interest.",
    synonyms: ["indifference", "unconcern", "disinterest", "detachment"]
  },
  {
    id: 16,
    word: "Arcane",
    definition: "Understood by few; mysterious or secret",
    example: "He studied the arcane texts of ancient alchemy.",
    level: "intermediate",
    mnemonic: "Think of an 'arc' that's hidden away from view.",
    synonyms: ["obscure", "esoteric", "cryptic", "mysterious"]
  },
  {
    id: 17,
    word: "Arduous",
    definition: "Requiring great exertion; difficult and tiring",
    example: "The arduous journey through the mountains took several days.",
    level: "intermediate",
    mnemonic: "Sounds like 'hard on us' - something that's hard on us is arduous.",
    synonyms: ["difficult", "strenuous", "laborious", "demanding"]
  },
  {
    id: 18,
    word: "Articulate",
    definition: "Having or showing the ability to speak fluently and coherently",
    example: "She was an articulate speaker who could explain complex ideas clearly.",
    level: "basic",
    synonyms: ["eloquent", "fluent", "well-spoken", "expressive"]
  },
  {
    id: 19,
    word: "Ascetic",
    definition: "Characterized by severe self-discipline and abstention from all forms of indulgence",
    example: "The ascetic monk lived in a bare cell with only the most basic possessions.",
    level: "advanced",
    mnemonic: "Think 'as-set-ic' - someone who doesn't care about assets/possessions.",
    synonyms: ["austere", "severe", "self-denying", "abstinent"]
  },
  {
    id: 20,
    word: "Assiduous",
    definition: "Showing great care, attention, and effort",
    example: "Her assiduous study habits helped her excel in school.",
    level: "advanced",
    mnemonic: "Sounds like 'as-sit-uous' - someone who sits down and works continuously.",
    synonyms: ["diligent", "attentive", "careful", "meticulous"]
  },
  // Adding more words to have a robust dataset
  {
    id: 21,
    word: "Benign",
    definition: "Gentle and kind; not harmful in effect",
    example: "The benign tumor was not cancerous.",
    level: "basic",
    synonyms: ["harmless", "gentle", "kind", "mild"]
  },
  {
    id: 22,
    word: "Cacophony",
    definition: "A harsh, discordant mixture of sounds",
    example: "The cacophony of the construction site made it impossible to concentrate.",
    level: "intermediate",
    mnemonic: "Think 'caco' (bad) + 'phony' (sound) - bad sound.",
    synonyms: ["discord", "dissonance", "noise", "clamor"]
  },
  {
    id: 23,
    word: "Capricious",
    definition: "Given to sudden and unaccountable changes of mood or behavior",
    example: "Her capricious nature made it difficult to predict how she would react.",
    level: "intermediate",
    mnemonic: "Sounds like 'cap-reach-us' - reaching for different caps/hats all the time.",
    synonyms: ["fickle", "unpredictable", "whimsical", "erratic"]
  },
  {
    id: 24,
    word: "Cogent",
    definition: "Clear, logical, and convincing",
    example: "She presented a cogent argument that convinced the jury.",
    level: "advanced",
    mnemonic: "Sounds like 'co-gent' - like a co-agent helping you understand something.",
    synonyms: ["convincing", "compelling", "persuasive", "logical"]
  },
  {
    id: 25,
    word: "Diligent",
    definition: "Having or showing care and conscientiousness in one's work or duties",
    example: "His diligent preparation for the exam resulted in a high score.",
    level: "basic",
    synonyms: ["industrious", "careful", "meticulous", "thorough"]
  }
];

export const getWords = (level?: WordLevel): Word[] => {
  if (!level) return words;
  return words.filter(word => word.level === level);
};

export const getWordById = (id: number): Word | undefined => {
  return words.find(word => word.id === id);
};

export const searchWords = (query: string): Word[] => {
  const lowerQuery = query.toLowerCase();
  return words.filter(word => 
    word.word.toLowerCase().includes(lowerQuery) ||
    word.definition.toLowerCase().includes(lowerQuery) ||
    word.synonyms?.some(syn => syn.toLowerCase().includes(lowerQuery))
  );
};
