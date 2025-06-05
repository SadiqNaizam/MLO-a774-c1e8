import React from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { UserInfoSnippet } from '@/components/UserInfoSnippet';
import { VoteControl } from '@/components/VoteControl'; // Assuming VoteControl is created
import { CheckCircle2 } from 'lucide-react'; // For marking accepted answer

interface AnswerItemProps {
  id: string;
  content: string; // HTML content if from a rich text editor, or plain text
  author: { userId?: string; name: string; avatarUrl?: string; reputation?: number };
  voteCount: number;
  postedDate: string; // Or Date object
  isAccepted?: boolean;
  onVote: (newScore: number, voteType: 'up' | 'down' | 'none') => void;
  userVote?: 'up' | 'down' | null;
}

const AnswerItem: React.FC<AnswerItemProps> = ({
  id,
  content,
  author,
  voteCount,
  postedDate,
  isAccepted,
  onVote,
  userVote,
}) => {
  console.log("Rendering AnswerItem:", id);

  return (
    <Card className={`w-full ${isAccepted ? 'border-green-500 bg-green-500/5' : ''}`}>
      <div className="flex p-4 gap-4">
        <VoteControl
            itemId={id}
            initialScore={voteCount}
            onVote={onVote}
            userVote={userVote}
        />
        <div className="flex-1">
            <CardContent className="p-0 prose prose-sm max-w-none dark:prose-invert">
                {/* If content is HTML, use dangerouslySetInnerHTML. Sanitize carefully! */}
                {/* For now, assuming plain text or simple markdown handling */}
                <div dangerouslySetInnerHTML={{ __html: content }} />
                {/* If plain text: <p>{content}</p> */}
            </CardContent>
            <CardFooter className="p-0 pt-4 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2">
                {isAccepted && (
                    <div className="flex items-center gap-1 text-green-600 font-medium text-sm">
                        <CheckCircle2 className="h-5 w-5" />
                        <span>Accepted Answer</span>
                    </div>
                )}
                <div className={`sm:ml-auto ${isAccepted ? 'pt-2 sm:pt-0' : ''}`}>
                    <UserInfoSnippet
                        userId={author.userId}
                        avatarUrl={author.avatarUrl}
                        name={author.name}
                        actionText={`answered ${postedDate}`}
                        reputation={author.reputation}
                    />
                </div>
            </CardFooter>
        </div>
      </div>
    </Card>
  );
};

export default AnswerItem;