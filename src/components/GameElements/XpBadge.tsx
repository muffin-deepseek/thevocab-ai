
import React from 'react';

interface XpBadgeProps {
  xp: number;
}

const XpBadge: React.FC<XpBadgeProps> = ({ xp }) => {
  return (
    <div className="flex items-center gap-2 bg-amber-100 px-3 py-1 rounded-full">
      <div className="bg-yellow-500 text-white h-5 w-5 rounded-full flex items-center justify-center text-xs font-bold">
        XP
      </div>
      <span className="text-amber-800 font-medium">{xp}</span>
    </div>
  );
};

export default XpBadge;
