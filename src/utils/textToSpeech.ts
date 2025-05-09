/**
 * A utility for text-to-speech functionality using the Web Speech API
 */

interface SpeechOptions {
  rate?: number;
  pitch?: number;
  volume?: number;
  lang?: string;
}

// Keep track of current utterance to allow stopping
let currentUtterance: SpeechSynthesisUtterance | null = null;

/**
 * Speaks the provided text using the browser's Speech Synthesis API
 */
export const speak = (text: string, options: SpeechOptions = {}): void => {
  // Stop any current speech first
  stop();

  // Create a new utterance
  const utterance = new SpeechSynthesisUtterance(text);
  
  // Set default options
  utterance.rate = options.rate || 1;
  utterance.pitch = options.pitch || 1;
  utterance.volume = options.volume || 1;
  utterance.lang = options.lang || 'en-US';
  
  // Store the current utterance so we can stop it later if needed
  currentUtterance = utterance;
  
  // Speak the text
  window.speechSynthesis.speak(utterance);
};

/**
 * Stops any current speech
 */
export const stop = (): void => {
  window.speechSynthesis.cancel();
  currentUtterance = null;
};

/**
 * Checks if text-to-speech is currently speaking
 */
export const isSpeaking = (): boolean => {
  return window.speechSynthesis.speaking;
};

/**
 * Gets all available voices
 */
export const getVoices = (): SpeechSynthesisVoice[] => {
  return window.speechSynthesis.getVoices();
};

/**
 * Pronounces a word with a slight pause after each
 */
export const pronounceWord = (word: string, options?: SpeechOptions): void => {
  speak(word, options);
};
