
export type WordLevel = 'nurture' | 'basic' | 'intermediate' | 'advanced';

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
  },
  {
    id: 26,
    word: "Ephemeral",
    definition: "Lasting for a very short time",
    example: "The ephemeral beauty of cherry blossoms lasts only a few days each spring.",
    level: "advanced",
    mnemonic: "Think of 'e-femeral' as sounding like 'for a mere' short time.",
    synonyms: ["fleeting", "transient", "momentary", "short-lived"]
  },
  {
    id: 27,
    word: "Pragmatic",
    definition: "Dealing with things sensibly and realistically; practical rather than theoretical",
    example: "She took a pragmatic approach to solving the budget problem.",
    level: "intermediate",
    mnemonic: "Think 'pragma-tic' - like practical tactics.",
    synonyms: ["practical", "realistic", "sensible", "rational"]
  },
  {
    id: 28,
    word: "Tenacious",
    definition: "Tending to keep a firm hold of something; clinging or adhering closely",
    example: "His tenacious grip on the rope saved him from falling.",
    level: "intermediate",
    mnemonic: "Sounds like 'ten-acious' - having the strength of ten people to hold on.",
    synonyms: ["persistent", "stubborn", "determined", "resolute"]
  },
  {
    id: 29,
    word: "Verbose",
    definition: "Using or containing more words than needed; wordy",
    example: "His verbose explanation confused rather than clarified the issue.",
    level: "intermediate",
    mnemonic: "Verb-ose - full of verbs and other words.",
    synonyms: ["wordy", "long-winded", "rambling", "prolix"]
  },
  {
    id: 30,
    word: "Audacity",
    definition: "Boldness or daring, especially with confident disregard for rules or norms",
    example: "She had the audacity to question the CEO's decision in front of the board.",
    level: "intermediate",
    mnemonic: "Think 'audio-city' - a place where sounds are boldly loud.",
    synonyms: ["boldness", "daring", "nerve", "impudence"]
  },
  {
    id: 31,
    word: "Equivocal",
    definition: "Open to more than one interpretation; ambiguous or uncertain",
    example: "His equivocal response left us unsure of his actual position on the issue.",
    level: "advanced",
    mnemonic: "Equi (equal) + vocal (voice) - having equal voices or meanings competing.",
    synonyms: ["ambiguous", "unclear", "vague", "uncertain"]
  },
  {
    id: 32,
    word: "Meticulous",
    definition: "Showing great attention to detail; very careful and precise",
    example: "Her meticulous research uncovered facts that everyone else had missed.",
    level: "intermediate",
    mnemonic: "Sounds like 'me-tick-ulous' - checking every tiny tick or detail.",
    synonyms: ["thorough", "careful", "precise", "scrupulous"]
  },
  {
    id: 33,
    word: "Resilient",
    definition: "Able to withstand or recover quickly from difficult conditions",
    example: "Children are often more resilient than adults when facing adversity.",
    level: "basic",
    mnemonic: "Re-silent - becoming silent (calm) again after disturbance.",
    synonyms: ["tough", "adaptable", "hardy", "flexible"]
  },
  {
    id: 34,
    word: "Profound",
    definition: "Very great or intense; having or showing great knowledge or insight",
    example: "The book had a profound impact on how I view the world.",
    level: "basic",
    mnemonic: "Pro-found - like a professional who has found deep meaning.",
    synonyms: ["deep", "intense", "wise", "penetrating"]
  },
  {
    id: 35,
    word: "Reticent",
    definition: "Not revealing one's thoughts or feelings readily; reserved",
    example: "He was reticent about his experiences during the war.",
    level: "advanced",
    mnemonic: "Think 'reti-cent' - like keeping your two cents (opinions) in a net.",
    synonyms: ["reserved", "restrained", "taciturn", "uncommunicative"]
  },
  {
    id: 36,
    word: "Ubiquitous",
    definition: "Present, appearing, or found everywhere",
    example: "Mobile phones have become ubiquitous in modern society.",
    level: "advanced",
    mnemonic: "Think 'ubi-quit-us' - like saying 'where quit us?' - it's everywhere, no quitting it.",
    synonyms: ["omnipresent", "universal", "pervasive", "widespread"]
  },
  {
    id: 37,
    word: "Obsequious",
    definition: "Obedient or attentive to an excessive or servile degree",
    example: "The obsequious waiter hovered around the table, constantly asking if everything was satisfactory.",
    level: "advanced",
    mnemonic: "Ob-sequence - following a sequence of orders from others too eagerly.",
    synonyms: ["subservient", "servile", "fawning", "sycophantic"]
  },
  {
    id: 38,
    word: "Ardent",
    definition: "Very enthusiastic or passionate",
    example: "He was an ardent supporter of the environmental movement.",
    level: "intermediate",
    mnemonic: "Sounds like 'are-dent' - having a burning (ardor) dent in your heart.",
    synonyms: ["passionate", "fervent", "zealous", "devoted"]
  },
  {
    id: 39,
    word: "Cryptic",
    definition: "Having a meaning that is mysterious or obscure",
    example: "She left a cryptic note that no one could decipher.",
    level: "intermediate",
    mnemonic: "Comes from 'crypt' - like something hidden in a burial chamber.",
    synonyms: ["enigmatic", "mysterious", "obscure", "puzzling"]
  },
  {
    id: 40,
    word: "Placate",
    definition: "Make someone less angry or hostile",
    example: "He brought flowers to placate his wife after their argument.",
    level: "intermediate",
    mnemonic: "Sounds like 'place-ate' - putting something in place to make peace.",
    synonyms: ["appease", "pacify", "mollify", "soothe"]
  },
  {
    id: 41,
    word: "Blatant",
    definition: "Completely obvious, conspicuous, or obtrusive, especially in an offensive way",
    example: "The politician's blatant lie was quickly exposed by fact-checkers.",
    level: "basic",
    mnemonic: "Sounds like 'blare-tent' - as loud and obvious as a blaring horn.",
    synonyms: ["obvious", "glaring", "flagrant", "conspicuous"]
  },
  {
    id: 42,
    word: "Zealot",
    definition: "A person who is fanatical and uncompromising in pursuit of their ideals",
    example: "He was a zealot who would never consider any opinion but his own.",
    level: "intermediate",
    mnemonic: "Think of 'zeal-lot' - having a lot of zeal (enthusiasm).",
    synonyms: ["fanatic", "extremist", "radical", "enthusiast"]
  },
  {
    id: 43,
    word: "Laconic",
    definition: "Using few words; expressing much in few words; concise",
    example: "His laconic response of 'Maybe' left us wondering what he really thought.",
    level: "advanced",
    mnemonic: "Think 'lack-sonic' - lacking in sound or words.",
    synonyms: ["terse", "concise", "brief", "succinct"]
  },
  {
    id: 44,
    word: "Taciturn",
    definition: "Reserved or uncommunicative in speech; saying little",
    example: "The taciturn farmer answered all questions with a nod or a grunt.",
    level: "advanced",
    mnemonic: "Tacit (implied, not spoken) + urn (container) - keeping words contained.",
    synonyms: ["reserved", "uncommunicative", "reticent", "quiet"]
  },
  {
    id: 45,
    word: "Lethargic",
    definition: "Lacking energy or enthusiasm",
    example: "The hot weather made everyone lethargic and unwilling to move.",
    level: "basic",
    mnemonic: "Sounds like 'less-energetic'.",
    synonyms: ["sluggish", "listless", "torpid", "drowsy"]
  },
  {
    id: 46,
    word: "Gregarious",
    definition: "Fond of company; sociable",
    example: "Her gregarious nature made her the life of every party.",
    level: "intermediate",
    mnemonic: "Think 'gathering-arious' - someone who loves gatherings.",
    synonyms: ["sociable", "outgoing", "social", "friendly"]
  },
  {
    id: 47,
    word: "Furtive",
    definition: "Attempting to avoid notice or attention, typically because of guilt or a belief that discovery would lead to trouble; secretive",
    example: "He cast a furtive glance over his shoulder before entering the building.",
    level: "advanced",
    mnemonic: "Fur-tive, like a furry animal sneaking around cautiously.",
    synonyms: ["secretive", "stealthy", "sly", "surreptitious"]
  },
  {
    id: 48,
    word: "Clandestine",
    definition: "Kept secret or done secretively, especially because illicit",
    example: "They held clandestine meetings in the basement of an abandoned building.",
    level: "advanced",
    mnemonic: "Clan-destine - like a secret clan with a hidden destiny.",
    synonyms: ["secret", "covert", "underground", "hidden"]
  },
  {
    id: 49,
    word: "Resolute",
    definition: "Admirably purposeful, determined, and unwavering",
    example: "She was resolute in her decision to pursue a medical career despite the challenges.",
    level: "intermediate",
    mnemonic: "Re-solute - like finding a solution again and again, never giving up.",
    synonyms: ["determined", "firm", "steadfast", "unwavering"]
  },
  {
    id: 50,
    word: "Jovial",
    definition: "Cheerful and friendly",
    example: "The jovial host made sure everyone at the party felt welcome.",
    level: "basic",
    mnemonic: "Related to 'Jove' (Jupiter), whose astrological influence was thought to make people happy.",
    synonyms: ["cheerful", "merry", "jolly", "happy"]
  },
  {
    id: 51,
    word: "Melancholy",
    definition: "A feeling of deep sadness, typically with no obvious cause",
    example: "A sense of melancholy came over her as she watched the autumn leaves fall.",
    level: "intermediate",
    mnemonic: "Melon (heavy) + choly (sounds like lowly) - a heavy, low feeling.",
    synonyms: ["sad", "gloomy", "dejected", "downcast"]
  },
  {
    id: 52,
    word: "Exacerbate",
    definition: "Make a problem, bad situation, or negative feeling worse",
    example: "His angry response only exacerbated the tension in the room.",
    level: "advanced",
    mnemonic: "Ex-acerb-ate - like adding extra acerbic (bitter) flavor, making things worse.",
    synonyms: ["worsen", "aggravate", "intensify", "compound"]
  },
  {
    id: 53,
    word: "Frivolous",
    definition: "Not having any serious purpose or value",
    example: "She dismissed his frivolous complaints and focused on the real issues.",
    level: "intermediate",
    mnemonic: "Fri-volous - like a free-flowing, light-hearted thing with little value.",
    synonyms: ["trivial", "silly", "shallow", "unimportant"]
  },
  {
    id: 54,
    word: "Diligent",
    definition: "Having or showing care and conscientiousness in one's work or duties",
    example: "Their diligent research uncovered crucial information for the case.",
    level: "basic",
    mnemonic: "Think 'do-ligent' - doing things in an intelligent, careful way.",
    synonyms: ["hardworking", "industrious", "careful", "thorough"]
  },
  {
    id: 55,
    word: "Egregious",
    definition: "Outstandingly bad; shocking",
    example: "The report detailed the company's egregious violations of safety regulations.",
    level: "advanced",
    mnemonic: "E-gregious - something that stands out ('e-' out) from the group (greg) in a bad way.",
    synonyms: ["flagrant", "outrageous", "shocking", "appalling"]
  },
  {
    id: 56,
    word: "Tenuous",
    definition: "Very weak or slight; insubstantial",
    example: "The evidence supporting their theory was tenuous at best.",
    level: "advanced",
    mnemonic: "Ten-u-ous - like something so thin it could only hold ten molecules.",
    synonyms: ["slight", "weak", "fragile", "flimsy"]
  },
  {
    id: 57,
    word: "Pragmatic",
    definition: "Dealing with things sensibly and realistically in a way that is based on practical rather than theoretical considerations",
    example: "We need a pragmatic approach to solving this problem.",
    level: "intermediate",
    mnemonic: "Think 'prag-matic' - like practical magic or practical tactics.",
    synonyms: ["practical", "realistic", "sensible", "down-to-earth"]
  },
  {
    id: 58,
    word: "Venerate",
    definition: "Regard with great respect; revere",
    example: "The tribe venerated their ancestors through elaborate ceremonies.",
    level: "advanced",
    mnemonic: "Ven-erate - like elevating (rating) something to a place of honor (akin to Venus, a goddess).",
    synonyms: ["revere", "respect", "honor", "esteem"]
  },
  {
    id: 59,
    word: "Impetuous",
    definition: "Acting or done quickly and without thought or care",
    example: "She regretted her impetuous decision to quit her job without having another lined up.",
    level: "advanced",
    mnemonic: "Im-pet-uous - like an impatient pet that can't wait and rushes into things.",
    synonyms: ["impulsive", "rash", "hasty", "reckless"]
  },
  {
    id: 60,
    word: "Benevolent",
    definition: "Well meaning and kindly",
    example: "The benevolent donor provided funds to build a new children's hospital.",
    level: "intermediate",
    mnemonic: "Bene (good) + volent (from 'volo', meaning 'I wish') - wishing good for others.",
    synonyms: ["kind", "generous", "charitable", "altruistic"]
  },
  {
    id: 61,
    word: "Peruse",
    definition: "To read through with thoroughness or care",
    example: "She perused the contract before signing it.",
    level: "intermediate",
    mnemonic: "Per-use - thoroughly use your eyes to read something.",
    synonyms: ["examine", "scrutinize", "study", "review"]
  },
  {
    id: 62,
    word: "Prevaricate",
    definition: "To speak or act in an evasive way; to lie",
    example: "The politician prevaricated when asked about the scandal.",
    level: "advanced",
    mnemonic: "Pre-vary-cate - preparing various stories to avoid truth.",
    synonyms: ["lie", "deceive", "equivocate", "fabricate"]
  },
  {
    id: 63,
    word: "Fastidious",
    definition: "Very attentive to and concerned about accuracy and detail",
    example: "She was fastidious about keeping her workspace clean and organized.",
    level: "advanced",
    mnemonic: "Fa-stid-ious - sounds a bit like 'fussy', which is what fastidious people often are.",
    synonyms: ["meticulous", "particular", "fussy", "finicky"]
  },
  {
    id: 64,
    word: "Nefarious",
    definition: "Wicked, villainous, or criminal in nature",
    example: "The villain's nefarious plans were thwarted by the hero.",
    level: "advanced",
    mnemonic: "Ne-farious - sounds like 'not-fair-ious', suggesting actions that are extremely unfair.",
    synonyms: ["evil", "wicked", "sinister", "villainous"]
  },
  {
    id: 65,
    word: "Lucid",
    definition: "Very clear and easy to understand",
    example: "His lucid explanation helped everyone grasp the complex concept.",
    level: "intermediate",
    mnemonic: "Lu-cid - sounds like 'loose lid', suggesting something that's easy to open and see through.",
    synonyms: ["clear", "intelligible", "comprehensible", "perspicuous"]
  },
  {
    id: 66,
    word: "Magnanimous",
    definition: "Very generous or forgiving, especially toward a rival or less powerful person",
    example: "The winner was magnanimous in victory, praising the efforts of the defeated opponent.",
    level: "advanced",
    mnemonic: "Magna (great) + animus (spirit) - having a great, generous spirit.",
    synonyms: ["generous", "benevolent", "big-hearted", "unselfish"]
  },
  {
    id: 67,
    word: "Quintessential",
    definition: "Representing the most perfect or typical example of a quality or class",
    example: "The small town diner is the quintessential American eating establishment.",
    level: "advanced",
    mnemonic: "Quint (five) - historically referred to the fifth essence or element, the perfect extract.",
    synonyms: ["classic", "archetypal", "definitive", "representative"]
  },
  {
    id: 68,
    word: "Superfluous",
    definition: "Unnecessary, especially through being more than enough",
    example: "His superfluous comments only prolonged the meeting unnecessarily.",
    level: "advanced",
    mnemonic: "Super (over) + flu (flow) - overflowing with extras that aren't needed.",
    synonyms: ["excessive", "redundant", "unnecessary", "surplus"]
  },
  {
    id: 69,
    word: "Inundate",
    definition: "To overwhelm with things or people to be dealt with",
    example: "After the announcement, they were inundated with phone calls.",
    level: "intermediate",
    mnemonic: "In-und-ate - like 'in-under-water', suggesting being flooded.",
    synonyms: ["flood", "overwhelm", "swamp", "deluge"]
  },
  {
    id: 70,
    word: "Conundrum",
    definition: "A confusing and difficult problem or question",
    example: "Finding affordable housing in the city presented a conundrum for the young couple.",
    level: "intermediate",
    mnemonic: "Con-undrum - sounds like a drum beating in your mind as you try to solve it.",
    synonyms: ["puzzle", "enigma", "riddle", "mystery"]
  },
  {
    id: 71,
    word: "Perfunctory",
    definition: "Carried out with minimum effort or reflection",
    example: "He gave the document a perfunctory glance before signing it.",
    level: "advanced",
    mnemonic: "Per-functory - just doing the function without real interest.",
    synonyms: ["cursory", "hasty", "superficial", "mechanical"]
  },
  {
    id: 72,
    word: "Precarious",
    definition: "Not securely held or in position; dangerously likely to fall or collapse",
    example: "The mountain climbers found themselves in a precarious position on the cliff face.",
    level: "intermediate",
    mnemonic: "Pre-carious - something you should care about beforehand because it's risky.",
    synonyms: ["unstable", "dangerous", "risky", "insecure"]
  },
  {
    id: 73,
    word: "Diffident",
    definition: "Modest or shy because of a lack of self-confidence",
    example: "The diffident student rarely spoke up in class despite knowing the answers.",
    level: "advanced",
    mnemonic: "Dif-fident - different from being confident.",
    synonyms: ["shy", "timid", "hesitant", "unassertive"]
  },
  {
    id: 74,
    word: "Discern",
    definition: "To recognize or find out",
    example: "With experience, you'll discern the subtle differences between the two painting styles.",
    level: "intermediate",
    mnemonic: "Dis-cern - separating the wheat from the chaff, seeing what matters.",
    synonyms: ["perceive", "recognize", "distinguish", "detect"]
  },
  {
    id: 75,
    word: "Candid",
    definition: "Truthful and straightforward; frank",
    example: "She gave me her candid opinion about my performance in the play.",
    level: "basic",
    mnemonic: "Can-did - can tell it like it did happen, truthfully.",
    synonyms: ["frank", "honest", "straightforward", "direct"]
  },
  {
    id: 76,
    word: "Voracious",
    definition: "Having a very eager approach to an activity",
    example: "She is a voracious reader, finishing several books each week.",
    level: "intermediate",
    mnemonic: "Vor-acious - sounds like 'devour-acious', eagerly devouring something.",
    synonyms: ["insatiable", "ravenous", "greedy", "hungry"]
  },
  {
    id: 77,
    word: "Eloquent",
    definition: "Fluent or persuasive in speaking or writing",
    example: "His eloquent speech moved the entire audience to tears.",
    level: "intermediate",
    mnemonic: "E-loquent - loquacious in an excellent way.",
    synonyms: ["articulate", "fluent", "expressive", "persuasive"]
  },
  {
    id: 78,
    word: "Tenuous",
    definition: "Very weak or slight",
    example: "The evidence connecting him to the crime was tenuous at best.",
    level: "advanced",
    mnemonic: "Ten-u-ous - like something so thin it could be held by only ten fibers.",
    synonyms: ["slight", "insubstantial", "flimsy", "weak"]
  },
  {
    id: 79,
    word: "Nebulous",
    definition: "In the form of a cloud or haze; vague or ill-defined",
    example: "The witness gave a nebulous account of what happened that night.",
    level: "intermediate",
    mnemonic: "Think 'nebula' - a cloud-like formation in space, similarly unclear and hazy.",
    synonyms: ["vague", "hazy", "unclear", "indistinct"]
  },
  {
    id: 80,
    word: "Circumlocution",
    definition: "The use of many words where fewer would do, especially in a deliberate attempt to be vague or evasive",
    example: "His response was a masterpiece of circumlocution that never actually answered the question.",
    level: "advanced",
    mnemonic: "Circum (around) + locution (speech) - talking around a subject instead of directly.",
    synonyms: ["verbosity", "wordiness", "indirectness", "evasiveness"]
  }
];

// Helper function to get a word by ID
export function getWordById(id: number): Word | undefined {
  return words.find(word => word.id === id);
}
