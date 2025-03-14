
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useVocab } from '@/contexts/VocabContext';

const LevelFilter: React.FC = () => {
  const { selectedLevel, setSelectedLevel } = useVocab();

  return (
    <div className="space-y-2">
      <Label htmlFor="level-filter">Difficulty Level</Label>
      <Select
        value={selectedLevel}
        onValueChange={(value) => setSelectedLevel(value as any)}
      >
        <SelectTrigger id="level-filter" className="w-full">
          <SelectValue placeholder="Select level" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Levels</SelectItem>
          <SelectItem value="nurture">Nurture (High School)</SelectItem>
          <SelectItem value="basic">Basic</SelectItem>
          <SelectItem value="intermediate">Intermediate</SelectItem>
          <SelectItem value="advanced">Advanced</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default LevelFilter;
