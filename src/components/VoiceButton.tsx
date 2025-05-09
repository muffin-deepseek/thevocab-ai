
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Volume2, VolumeX } from 'lucide-react';
import { speak, stop, isSpeaking } from '@/utils/textToSpeech';
import { cn } from '@/lib/utils';

interface VoiceButtonProps {
  text: string;
  className?: string;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

const VoiceButton: React.FC<VoiceButtonProps> = ({ 
  text, 
  className,
  variant = 'ghost',
  size = 'icon'
}) => {
  const [speaking, setSpeaking] = useState(false);

  // Reset speaking state when component unmounts
  useEffect(() => {
    return () => {
      if (speaking) {
        stop();
      }
    };
  }, [speaking]);

  // Check speaking status periodically
  useEffect(() => {
    if (!speaking) return;
    
    const checkSpeakingInterval = setInterval(() => {
      if (!isSpeaking()) {
        setSpeaking(false);
      }
    }, 100);
    
    return () => clearInterval(checkSpeakingInterval);
  }, [speaking]);

  const handleClick = () => {
    if (speaking) {
      stop();
      setSpeaking(false);
    } else {
      speak(text);
      setSpeaking(true);
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleClick}
      className={cn(
        speaking ? "text-vocab-primary" : "text-gray-400",
        "relative",
        className
      )}
      aria-label={speaking ? "Stop pronunciation" : "Pronounce word"}
      title={speaking ? "Stop pronunciation" : "Pronounce word"}
    >
      {speaking ? (
        <Volume2 className="h-5 w-5" />
      ) : (
        <Volume2 className="h-5 w-5" />
      )}
      
      {speaking && (
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-vocab-primary opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-vocab-primary"></span>
        </span>
      )}
    </Button>
  );
};

export default VoiceButton;
