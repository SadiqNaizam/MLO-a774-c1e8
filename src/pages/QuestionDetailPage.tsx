import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Sidebar from '@/components/layout/Sidebar';
import VoteControl from '@/components/VoteControl';
import UserInfoSnippet from '@/components/UserInfoSnippet';
import AnswerItem from '@/components/AnswerItem';
import RichTextEditor from '@/components/RichTextEditor';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'; // For sidebar

const placeholderQuestionDetail = {
  id: "q1",
  title: "How to effectively use React Context API for state management in large applications?",
  body: "<p>I'm building a large React app and wondering about the best practices for using Context API versus Redux or Zustand for managing global and feature-specific state. I've read the docs but looking for practical advice on scenarios like:</p><ul><li>When does context become inefficient?</li><li>How to avoid excessive re-renders?</li><li>Structuring providers for different features.</li></ul><pre><code class='language-javascript'>// Example context setup\nconst MyContext = React.createContext();</code></pre><p>Any advice on performance and scalability would be greatly appreciated!</p>",
  tags: ["react", "context-api", "state-management", "performance"],
  author: { userId: "user123", name: "Jane Doe", avatarUrl: "https://i.pravatar.cc/40?u=jane", reputation: 1500 },
  voteCount: 125,
  userVote: null as 'up' | 'down' | null,
  askedDate: "June 10, 2024",
  answers: [
    { id: "a1", content: "<p>For large applications, while Context API is convenient, it can lead to performance issues if not managed carefully. Consider splitting contexts into smaller, more focused pieces. For complex global state, Redux Toolkit or Zustand often provide better devtools and performance optimizations out-of-the-box.</p><p>For avoiding re-renders, make sure to memoize context values or use selectors if your state management library supports them.</p>", author: { userId: "user456", name: "TechGuru", avatarUrl: "https://i.pravatar.cc/40?u=guru", reputation: 5200 }, voteCount: 42, userVote: 'up' as 'up' | 'down' | null, postedDate: "June 11, 2024", isAccepted: true },
    { id: "a2", content: "<p>I've found Zustand to be a great lightweight alternative to Redux, offering a simpler API while still being very performant. It uses a store model similar to Redux but with less boilerplate.</p><pre><code class='language-javascript'>// Zustand store example\nimport create from 'zustand';\nconst useStore = create(set => ({ bears: 0, increasePopulation: () => set(state => ({ bears: state.bears + 1 })) }));</code></pre>", author: { userId: "user789", name: "CodeWizard", avatarUrl: "https://i.pravatar.cc/40?u=wizard", reputation: 3100 }, voteCount: 28, userVote: null, postedDate: "June 11, 2024", isAccepted: false },
  ]
};

const QuestionDetailPage = () => {
  const { questionId } = useParams<{ questionId: string }>();
  console.log(`QuestionDetailPage loaded for question ID: ${questionId}`);
  // In a real app, fetch question details based on questionId
  const question = placeholderQuestionDetail; // Using placeholder
  const [newAnswer, setNewAnswer] = useState('');
  const [answers, setAnswers] = useState(question.answers);

  const handleVote = (itemId: string, newScore: number, voteType: 'up' | 'down' | 'none') => {
    console.log(`Voted on ${itemId}: score ${newScore}, type ${voteType}`);
    // Update state for question or answer votes
  };

  const handlePostAnswer = () => {
    if (!newAnswer.trim()) return;
    const newAnswerObj = {
      id: `a${answers.length + Math.random()}`, // temp id
      content: newAnswer,
      author: { userId: "currentUser", name: "Current User", avatarUrl: "https://i.pravatar.cc/40?u=current", reputation: 100 },
      voteCount: 0,
      userVote: null,
      postedDate: new Date().toLocaleDateString(),
      isAccepted: false,
    };
    setAnswers([...answers, newAnswerObj]);
    setNewAnswer('');
    console.log('Posted new answer:', newAnswerObj);
  };


  if (!question) return <div>Loading question... or Question Not Found.</div>;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow container mx-auto px-4 py-6">
        <Breadcrumb className="mb-4">
          <BreadcrumbList>
            <BreadcrumbItem><BreadcrumbLink href="/">Home</BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbLink href="/questions">Questions</BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbPage className="truncate max-w-xs sm:max-w-md">{question.title}</BreadcrumbPage></BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex flex-col md:flex-row gap-6">
          <ScrollArea className="flex-1 h-[calc(100vh-12rem)] pr-4"> {/* Adjust height */}
            {/* Question Section */}
            <article className="mb-8">
              <header className="mb-4">
                <h1 className="text-3xl font-bold mb-3">{question.title}</h1>
                <div className="flex items-center text-sm text-muted-foreground space-x-2">
                  <span>Asked {question.askedDate}</span>
                  {/* <span>Viewed X times</span> */}
                </div>
              </header>

              <div className="flex gap-4">
                <VoteControl
                  itemId={question.id}
                  initialScore={question.voteCount}
                  userVote={question.userVote}
                  onVote={(score, type) => handleVote(question.id, score, type)}
                />
                <div className="prose prose-sm sm:prose max-w-none dark:prose-invert flex-1" dangerouslySetInnerHTML={{ __html: question.body }} />
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {question.tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
              </div>

              <div className="mt-6 flex justify-end">
                <UserInfoSnippet
                  userId={question.author.userId}
                  name={question.author.name}
                  avatarUrl={question.author.avatarUrl}
                  reputation={question.author.reputation}
                  actionText={`asked ${question.askedDate}`}
                />
              </div>
            </article>

            <Separator className="my-8" />

            {/* Answers Section */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">{answers.length} Answer{answers.length === 1 ? '' : 's'}</h2>
              <div className="space-y-6">
                {answers.map(answer => (
                  <AnswerItem
                    key={answer.id}
                    id={answer.id}
                    content={answer.content}
                    author={answer.author}
                    voteCount={answer.voteCount}
                    userVote={answer.userVote}
                    postedDate={answer.postedDate}
                    isAccepted={answer.isAccepted}
                    onVote={(score, type) => handleVote(answer.id, score, type)}
                  />
                ))}
              </div>
            </section>

            <Separator className="my-8" />

            {/* Post Answer Form */}
            <section className="mt-8">
              <h3 className="text-xl font-semibold mb-3">Your Answer</h3>
              <RichTextEditor
                value={newAnswer}
                onChange={setNewAnswer}
                placeholder="Type your answer here. Markdown is supported."
                minHeight="min-h-[150px]"
              />
              <Button onClick={handlePostAnswer} className="mt-4">Post Your Answer</Button>
            </section>
          </ScrollArea>

          <Sidebar title="Related Questions">
            <Card>
              <CardHeader><CardTitle className="text-md">Linked</CardTitle></CardHeader>
              <CardContent className="text-sm">
                <ul className="space-y-2">
                  <li><a href="#" className="text-blue-600 hover:underline">Related question 1?</a></li>
                  <li><a href="#" className="text-blue-600 hover:underline">Another related question?</a></li>
                </ul>
              </CardContent>
            </Card>
             <Card className="mt-4">
              <CardHeader><CardTitle className="text-md">Hot Network Questions</CardTitle></CardHeader>
              <CardContent className="text-sm">
                 <ul className="space-y-2">
                  <li><a href="#" className="text-blue-600 hover:underline">Interesting network question?</a></li>
                </ul>
              </CardContent>
            </Card>
          </Sidebar>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default QuestionDetailPage;