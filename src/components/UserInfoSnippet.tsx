import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserCircle2 } from 'lucide-react';

interface UserInfoSnippetProps {
  userId?: string; // Optional, for linking to user profile
  name: string;
  avatarUrl?: string;
  actionText?: string; // e.g., "asked on Jan 1, 2023", "answered 2 hours ago"
  reputation?: number;
  className?: string;
}

const UserInfoSnippet: React.FC<UserInfoSnippetProps> = ({
  userId,
  name,
  avatarUrl,
  actionText,
  reputation,
  className,
}) => {
  console.log("Rendering UserInfoSnippet for:", name);
  const UserContent = (
    <>
        <Avatar className="h-6 w-6 sm:h-8 sm:w-8">
            <AvatarImage src={avatarUrl} alt={name} />
            <AvatarFallback>
                <UserCircle2 className="h-4 w-4 sm:h-5 sm:w-5" />
            </AvatarFallback>
        </Avatar>
        <div className="text-xs sm:text-sm">
            <span className="font-medium text-primary hover:underline">{name}</span>
            {reputation !== undefined && (
            <span className="ml-1 font-bold text-muted-foreground" title="Reputation">
                {reputation}
            </span>
            )}
            {actionText && <span className="block text-muted-foreground text-xs">{actionText}</span>}
        </div>
    </>
  );

  return (
    <div className={`flex items-center gap-2 ${className || ''}`}>
      {userId ? (
        <Link to={`/users/${userId}`} className="flex items-center gap-2 group">
          {UserContent}
        </Link>
      ) : (
        <div className="flex items-center gap-2">{UserContent}</div>
      )}
    </div>
  );
};

export default UserInfoSnippet;