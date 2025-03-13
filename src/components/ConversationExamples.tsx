
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Word } from '@/data/wordData';

interface ConversationExamplesProps {
  word: Word;
}

const ConversationExamples: React.FC<ConversationExamplesProps> = ({ word }) => {
  // Generate some conversation examples using the word
  const getConversationExamples = (word: Word): string[] => {
    const examples = [
      `"I noticed the storm started to ${word.word === 'Abate' ? 'abate' : word.word.toLowerCase()} after lunch, so we might be able to go for that walk after all."`,
      `"Let me try to use '${word.word.toLowerCase()}' in my presentation tomorrow to impress my colleagues."`,
      `"That's an interesting point. To ${word.word.toLowerCase()} your argument, I would add that..."`,
      `"I've been trying to ${word.word.toLowerCase()} my understanding of this topic by reading different perspectives."`,
      `"Would it be correct to say that the government's policy helped to ${word.word.toLowerCase()} the economic crisis?"`,
    ];
    
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
