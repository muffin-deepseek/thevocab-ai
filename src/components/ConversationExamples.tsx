
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Word } from '@/data/wordData';

interface ConversationExamplesProps {
  word: Word;
}

const ConversationExamples: React.FC<ConversationExamplesProps> = ({ word }) => {
  // Generate some conversation examples using the word
  const getConversationExamples = (word: Word): string[] => {
    const wordInSentence = word.word.charAt(0).toLowerCase() + word.word.slice(1);
    
    // Custom examples based on the word's category/characteristics
    const customExamples: Record<string, string[]> = {
      // For social interaction words
      Eloquent: [
        `"Her eloquent presentation impressed everyone at the conference."`,
        `"I wish I could be as eloquent as you when explaining complex topics."`,
        `"The most eloquent speakers use simple language to express profound ideas."`
      ],
      Empathy: [
        `"Showing empathy toward others has helped me build stronger relationships."`,
        `"The doctor's empathy made a difficult diagnosis easier to handle."`,
        `"True leadership requires empathy and understanding of your team's challenges."`
      ],
      // For intellectual/cognitive words
      Astute: [
        `"That was an astute observation about the company's financial strategy."`,
        `"Her astute mind quickly identified the flaw in their argument."`,
        `"I appreciate your astute comments during our brainstorming session."`
      ],
      // Default examples that work with any word
      default: [
        `"I noticed the situation started to ${wordInSentence} after we addressed the core issues directly."`,
        `"I'm trying to use '${wordInSentence}' more frequently in my writing to expand my vocabulary."`,
        `"Would you say that her approach was particularly ${wordInSentence}, or am I misusing the term?"`,
        `"The article described the new policy as ${wordInSentence}, which I found to be an interesting characterization."`,
        `"I've been working to ${wordInSentence} my understanding of this concept by studying different perspectives."`
      ]
    };
    
    // Use custom examples if available, otherwise use default
    const examples = customExamples[word.word] || customExamples.default;
    
    // Return random 2-3 examples
    const numberOfExamples = Math.floor(Math.random() * 2) + 2; // 2-3 examples
    return examples.slice(0, numberOfExamples);
  };

  const conversationExamples = getConversationExamples(word);

  return (
    <Card className="mt-8">
      <CardHeader className="pb-2">
        <h3 className="text-lg font-semibold">Use in Conversation</h3>
        <p className="text-sm text-gray-500">Try incorporating "{word.word}" into your daily conversations:</p>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {conversationExamples.map((example, index) => (
            <li key={index} className="pl-4 border-l-2 border-vocab-light">
              <p className="italic text-gray-700">{example}</p>
            </li>
          ))}
        </ul>
        <div className="mt-4 p-3 bg-vocab-light rounded-md">
          <p className="text-sm font-medium">Practice Tip:</p>
          <p className="text-sm">Set a goal to use this word at least once today in conversation or writing!</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ConversationExamples;
