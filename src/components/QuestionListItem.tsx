import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { UserInfoSnippet } from '@/components/UserInfoSnippet'; // Assuming UserInfoSnippet is created
import { MessageSquare, ThumbsUp, Eye } from 'lucide-react';

interface QuestionListItemProps {
  id: string;
  title: string;
  tags: string[];
  author: { name: string; avatarUrl?: string; reputation?: number; joinedDate?: string };
  voteCount: number;
  answerCount: number;
  viewCount: number;
  askedDate: string; // Or Date object, format as needed
  excerpt?: string; // Optional short summary of the question
}

const QuestionListItem: React.FC<QuestionListItemProps> = ({
  id,
  title,
  tags,
  author,
  voteCount,
  answerCount,
  viewCount,
  askedDate,
  excerpt,
}) => {
  console.log("Rendering QuestionListItem:", title);

  return (
    <Card className="w-full hover:shadow-md transition-shadow">
      <CardHeader>
        <Link to={`/questions/${id}`} className="hover:underline">
            <CardTitle className="text-lg">{title}</CardTitle>
        </Link>
      </CardHeader>
      {excerpt && (
        <CardContent className="pb-2">
            <p className="text-sm text-muted-foreground line-clamp-2">{excerpt}</p>
        </CardContent>
      )}
      <CardContent className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-2">
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Link to={`/tags/${tag}`} key={tag}>
                <Badge variant="secondary" className="hover:bg-muted-foreground/20">{tag}</Badge>
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1" title="Votes">
                <ThumbsUp className="h-4 w-4" />
                <span>{voteCount}</span>
            </div>
            <div className="flex items-center gap-1" title="Answers">
                <MessageSquare className="h-4 w-4" />
                <span>{answerCount}</span>
            </div>
            <div className="flex items-center gap-1" title="Views">
                <Eye className="h-4 w-4" />
                <span>{viewCount}</span>
            </div>
        </div>
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground justify-end">
        <UserInfoSnippet
            avatarUrl={author.avatarUrl}
            name={author.name}
            actionText={`asked ${askedDate}`}
            reputation={author.reputation}
        />
      </CardFooter>
    </Card>
  );
};

export default QuestionListItem;