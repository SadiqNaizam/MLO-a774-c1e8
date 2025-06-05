import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface VoteControlProps {
  initialScore: number;
  onVote: (newScore: number, voteType: 'up' | 'down' | 'none') => void; // Callback with new score and action
  itemId: string; // ID of the item being voted on (question, answer)
  userVote?: 'up' | 'down' | null; // Current user's vote on this item
  disabled?: boolean;
}

const VoteControl: React.FC<VoteControlProps> = ({
  initialScore,
  onVote,
  // itemId, // unused for now, but good for backend
  userVote: initialUserVote = null,
  disabled = false,
}) => {
  const [score, setScore] = useState(initialScore);
  const [currentUserVote, setCurrentUserVote] = useState<'up' | 'down' | null>(initialUserVote);

  console.log("Rendering VoteControl, initial score:", initialScore, "userVote:", initialUserVote);

  const handleVote = (voteType: 'up' | 'down') => {
    if (disabled) return;

    let newScore = score;
    let newVoteType: 'up' | 'down' | 'none' = voteType;

    if (currentUserVote === voteType) { // Clicked same button again (undo vote)
      newScore = voteType === 'up' ? score - 1 : score + 1;
      setCurrentUserVote(null);
      newVoteType = 'none';
    } else {
      if (currentUserVote === 'up') newScore--; // Was upvoted, now changing
      if (currentUserVote === 'down') newScore++; // Was downvoted, now changing

      newScore = voteType === 'up' ? newScore + 1 : newScore - 1;
      setCurrentUserVote(voteType);
    }
    setScore(newScore);
    onVote(newScore, newVoteType);
  };

  return (
    <div className="flex flex-col items-center space-y-1">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => handleVote('up')}
        className={cn("h-8 w-8", currentUserVote === 'up' && "text-primary bg-primary/10")}
        aria-label="Upvote"
        disabled={disabled}
      >
        <ThumbsUp className="h-4 w-4" />
      </Button>
      <span className="font-semibold text-sm w-8 text-center tabular-nums">{score}</span>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => handleVote('down')}
        className={cn("h-8 w-8", currentUserVote === 'down' && "text-destructive bg-destructive/10")}
        aria-label="Downvote"
        disabled={disabled}
      >
        <ThumbsDown className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default VoteControl;