
/**
 * A utility for text-to-speech functionality using the Web Speech API
 */

interface SpeechOptions {
  rate?: number;
  pitch?: number;
  volume?: number;
  lang?: string;
  onStart?: () => void;
  onEnd?: () => void;
  onPause?: () => void;
  onResume?: () => void;
  onError?: (error: SpeechSynthesisErrorEvent) => void;
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
  
  // Add event handlers if provided
  if (options.onStart) utterance.onstart = options.onStart;
  if (options.onEnd) utterance.onend = options.onEnd;
  if (options.onPause) utterance.onpause = options.onPause;
  if (options.onResume) utterance.onresume = options.onResume;
  if (options.onError) utterance.onerror = options.onError;
  
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

/**
 * Reads a conversation with appropriate pauses between sentences
 * @param conversation The conversation text to read
 * @param options Speech options
 * @param onSentenceChange Optional callback when sentence changes
 */
export const readConversation = (
  conversation: string, 
  options: SpeechOptions = {},
  onSentenceChange?: (sentenceIndex: number) => void
): void => {
  // Split conversation into sentences
  const sentences = conversation.split(/(?<=[.!?])\s+/);
  
  let currentIndex = 0;
  
  // Function to speak the next sentence
  const speakNextSentence = () => {
    if (currentIndex >= sentences.length) {
      if (options.onEnd) options.onEnd();
      return;
    }
    
    const sentence = sentences[currentIndex];
    
    // Update the current sentence index for highlighting
    if (onSentenceChange) onSentenceChange(currentIndex);
    
    // Speak the current sentence
    const utterance = new SpeechSynthesisUtterance(sentence);
    utterance.rate = options.rate || 1;
    utterance.pitch = options.pitch || 1;
    utterance.volume = options.volume || 1;
    utterance.lang = options.lang || 'en-US';
    
    utterance.onend = () => {
      currentIndex++;
      // Add a small pause between sentences
      setTimeout(speakNextSentence, 300);
    };
    
    window.speechSynthesis.speak(utterance);
  };
  
  // Start speaking the first sentence
  if (options.onStart) options.onStart();
  speakNextSentence();
};
