
import React from 'react';
import { Button } from '@/components/ui/button';
import { User } from 'lucide-react';

const UserProfile: React.FC = () => {
  return (
    <Button variant="ghost" size="sm" className="flex items-center gap-2">
      <User className="h-4 w-4" />
      <span className="hidden md:inline">Guest</span>
    </Button>
  );
};

export default UserProfile;
