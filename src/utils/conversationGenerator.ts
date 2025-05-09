
import { Word, WordLevel } from '@/data/wordData';

/**
 * Generates a contextual conversation with a blank space for the target word
 */
export const generateConversation = (word: Word): string => {
  // The blank placeholder that will be replaced with the word
  const BLANK_PLACEHOLDER = "__BLANK__";
  
  // Extract word properties
  const { word: wordText, level, definition, example } = word;
  
  // Base conversation templates by level
  const templates = {
    basic: [
      `Person A: I need a word that means "${definition}". Any ideas?\nPerson B: The word you're looking for is ${BLANK_PLACEHOLDER}.\nPerson A: Great, thanks! Can you use it in a sentence?\nPerson B: ${example || `Sure! ${capitalizeFirstLetter(wordText)} is a useful word to know.`}`,
      
      `Person A: I heard someone use the word ${BLANK_PLACEHOLDER} today.\nPerson B: Oh, that means "${definition}".\nPerson A: Thanks for explaining!`,
      
      `Person A: Do you know a word for "${definition}"?\nPerson B: Yes, the word is ${BLANK_PLACEHOLDER}.\nPerson A: That's perfect for what I need!`
    ],
    
    intermediate: [
      `Professor: Today we're discussing the concept of "${definition}". The term for this is ${BLANK_PLACEHOLDER}.\nStudent: Could you provide an example of ${wordText} in context?\nProfessor: ${example || `Certainly. ${capitalizeFirstLetter(wordText)} is often used in academic discussions.`}`,
      
      `Friend 1: I'm struggling to express "${definition}" concisely.\nFriend 2: You could use the word ${BLANK_PLACEHOLDER}.\nFriend 1: Perfect! That's exactly what I needed.`,
      
      `Colleague 1: In our report, we need a word that conveys "${definition}".\nColleague 2: I suggest using ${BLANK_PLACEHOLDER}.\nColleague 1: That works well in this context.`
    ],
    
    advanced: [
      `Scholar 1: The philosophical concept that represents "${definition}" is quite nuanced.\nScholar 2: Indeed, ${BLANK_PLACEHOLDER} encompasses many subtle implications.\nScholar 1: ${example || `Yes, ${wordText} is essential to understanding this field of study.`}`,
      
      `Writer: I'm looking for a precise term that means "${definition}".\nEditor: Have you considered ${BLANK_PLACEHOLDER}? It has the exact connotation you need.\nWriter: That's brilliant! It fits perfectly in this passage.`,
      
      `Expert 1: When discussing "${definition}", what terminology do you prefer?\nExpert 2: I find ${BLANK_PLACEHOLDER} to be the most accurate term.\nExpert 1: I agree, it captures the essence completely.`
    ]
  };

  // Select a random template based on word level
  const levelTemplates = templates[level] || templates.basic;
  const randomTemplate = levelTemplates[Math.floor(Math.random() * levelTemplates.length)];
  
  return randomTemplate;
};

/**
 * Capitalizes the first letter of a string
 */
const capitalizeFirstLetter = (string: string): string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

/**
 * Replaces the blank placeholder with the actual word or an underscore for display
 */
export const formatConversationWithWord = (conversation: string, word: string): string => {
  return conversation.replace("__BLANK__", word);
};

/**
 * Formats the conversation with a blank for display
 */
export const formatConversationWithBlank = (conversation: string): string => {
  return conversation.replace("__BLANK__", "_______");
};

/**
 * Splits a conversation into parts before, at, and after the blank
 */
export const splitConversationAtBlank = (conversation: string): {
  beforeBlank: string;
  afterBlank: string;
} => {
  const parts = conversation.split("__BLANK__");
  return {
    beforeBlank: parts[0],
    afterBlank: parts[1] || ""
  };
};

/**
 * Breaks the conversation into sentences for highlighting during speech
 */
export const getConversationSentences = (conversation: string): string[] => {
  // Replace blank with the word placeholder temporarily
  const tempConversation = conversation.replace("__BLANK__", "[BLANK]");
  
  // Split by lines first
  const lines = tempConversation.split("\n");
  
  // Process each line to preserve dialog structure
  const result: string[] = [];
  
  lines.forEach(line => {
    // Find the colon that separates speaker from dialog
    const colonIndex = line.indexOf(":");
    
    if (colonIndex > -1) {
      const speaker = line.substring(0, colonIndex + 1);
      const dialog = line.substring(colonIndex + 1);
      
      // Split the dialog by periods, question marks, or exclamation points
      const sentences = dialog.match(/[^.!?]+[.!?]+/g) || [dialog];
      
      // Add the speaker to the first sentence
      if (sentences.length > 0) {
        sentences[0] = speaker + sentences[0];
        result.push(...sentences);
      } else {
        result.push(line);
      }
    } else {
      result.push(line);
    }
  });
  
  // Replace the placeholder back with blank
  return result.map(s => s.replace("[BLANK]", "__BLANK__").trim());
};
