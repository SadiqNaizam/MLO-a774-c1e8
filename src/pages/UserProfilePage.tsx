import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import QuestionListItem from '@/components/QuestionListItem';
import AnswerItem from '@/components/AnswerItem'; // Assuming AnswerItem can be used or adapted
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, HelpCircle, MessageSquare, Award, CalendarDays } from 'lucide-react';

const placeholderUserProfile = {
  userId: "user123",
  name: "Jane Coder",
  avatarUrl: "https://i.pravatar.cc/150?u=janecoder",
  reputation: 2750,
  joinedDate: "March 15, 2022",
  bio: "Full-stack developer passionate about React, Node.js, and building scalable web applications. Always learning and exploring new technologies.",
  stats: {
    questions: 15,
    answers: 42,
    reached: "50k+", // people reached
  },
  questions: [
    { id: "q1", title: "How to effectively use React Context API?", tags: ["react", "context-api"], author: { name: "Jane Coder" }, voteCount: 125, answerCount: 5, viewCount: 2500, askedDate: "2 days ago", excerpt: "Exploring best practices for state management..." },
    { id: "q4", title: "Deploying Docker containers to AWS ECS", tags: ["docker", "aws", "ecs"], author: { name: "Jane Coder" }, voteCount: 80, answerCount: 3, viewCount: 1500, askedDate: "1 month ago", excerpt: "Seeking guidance on CI/CD pipelines for ECS..." },
  ],
  answers: [ // Simplified AnswerItem data for profile context
    { id: "ansOnQ2", questionTitle: "Best practices for Node.js API security", content: "<p>One key aspect is thorough input validation using libraries like Joi or Zod...</p>", author: { name: "Jane Coder" }, voteCount: 18, postedDate: "3 days ago", isAccepted: false, questionId: "q2" },
    { id: "ansOnQ5", questionTitle: "GraphQL vs REST: When to choose which?", content: "<p>GraphQL shines when you need flexible data fetching and want to avoid over/under-fetching...</p>", author: { name: "Jane Coder" }, voteCount: 25, postedDate: "2 weeks ago", isAccepted: true, questionId: "q5" },
  ]
};


const UserProfilePage = () => {
  const { userId } = useParams<{ userId: string }>();
  console.log(`UserProfilePage loaded for user ID: ${userId}`);
  // In a real app, fetch user profile based on userId. If 'me', resolve to current user.
  const user = placeholderUserProfile; // Using placeholder

  if (!user) return <div>Loading profile... or User Not Found.</div>;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Card className="mb-8">
          <CardContent className="p-6 flex flex-col sm:flex-row items-start gap-6">
            <Avatar className="h-24 w-24 sm:h-32 sm:w-32 border-4 border-primary/20">
              <AvatarImage src={user.avatarUrl} alt={user.name} />
              <AvatarFallback><User className="h-16 w-16" /></AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h1 className="text-3xl font-bold">{user.name}</h1>
              <p className="text-muted-foreground text-sm">Reputation: <span className="font-semibold text-primary">{user.reputation}</span></p>
              <p className="text-muted-foreground text-sm flex items-center gap-1 mt-1">
                <CalendarDays className="h-4 w-4" /> Member since {user.joinedDate}
              </p>
              {user.bio && <p className="mt-3 text-sm">{user.bio}</p>}
            </div>
            <div className="grid grid-cols-3 gap-2 text-center w-full sm:w-auto mt-4 sm:mt-0">
                <div className="p-2">
                    <p className="font-bold text-xl">{user.stats.questions}</p>
                    <p className="text-xs text-muted-foreground">Questions</p>
                </div>
                <div className="p-2">
                    <p className="font-bold text-xl">{user.stats.answers}</p>
                    <p className="text-xs text-muted-foreground">Answers</p>
                </div>
                 <div className="p-2">
                    <p className="font-bold text-xl">{user.stats.reached}</p>
                    <p className="text-xs text-muted-foreground">Reached</p>
                </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="questions" className="w-full">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 mb-6">
            <TabsTrigger value="profile"> <User className="h-4 w-4 mr-2" />Profile Summary</TabsTrigger>
            <TabsTrigger value="questions"><HelpCircle className="h-4 w-4 mr-2" />Questions ({user.questions.length})</TabsTrigger>
            <TabsTrigger value="answers"><MessageSquare className="h-4 w-4 mr-2" />Answers ({user.answers.length})</TabsTrigger>
            <TabsTrigger value="reputation"><Award className="h-4 w-4 mr-2" />Reputation</TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card>
                <CardHeader><CardTitle>Profile Overview</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                    <p>Detailed profile information, activity summary, badges earned, etc., would go here.</p>
                    {/* For example: display badges, top tags, etc. */}
                </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="questions">
            <div className="space-y-4">
              {user.questions.length > 0 ? user.questions.map(q => (
                <QuestionListItem
                  key={q.id}
                  id={q.id}
                  title={q.title}
                  tags={q.tags}
                  author={q.author} // This might need adjustment if author structure differs for profile view
                  voteCount={q.voteCount}
                  answerCount={q.answerCount}
                  viewCount={q.viewCount}
                  askedDate={q.askedDate}
                  excerpt={q.excerpt}
                />
              )) : <p className="text-muted-foreground">This user hasn't asked any questions yet.</p>}
            </div>
          </TabsContent>

          <TabsContent value="answers">
            <div className="space-y-6">
              {user.answers.length > 0 ? user.answers.map(ans => (
                 <Card key={ans.id}>
                    <CardHeader>
                        <CardTitle className="text-md">
                            Answer on: <a href={`/questions/${ans.questionId}`} className="text-primary hover:underline">{ans.questionTitle}</a>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {/* Simplified display for an answer snippet */}
                        <div className="prose prose-sm max-w-none dark:prose-invert" dangerouslySetInnerHTML={{ __html: ans.content.substring(0, 200) + (ans.content.length > 200 ? '...' : '') }} />
                        <div className="text-xs text-muted-foreground mt-2">
                            Voted {ans.voteCount} times • Answered {ans.postedDate} {ans.isAccepted && <Badge variant="default" className="ml-2 bg-green-600">Accepted</Badge>}
                        </div>
                    </CardContent>
                </Card>
              )) : <p className="text-muted-foreground">This user hasn't provided any answers yet.</p>}
            </div>
          </TabsContent>
          <TabsContent value="reputation">
            <Card>
                <CardHeader><CardTitle>Reputation History</CardTitle></CardHeader>
                <CardContent>
                    <p>A chart or list detailing reputation changes over time would go here.</p>
                </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

export default UserProfilePage;