import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Sidebar from '@/components/layout/Sidebar';
import QuestionListItem from '@/components/QuestionListItem';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, PaginationEllipsis } from "@/components/ui/pagination";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from 'react-router-dom';

const placeholderQuestions = [
  { id: "q1", title: "How to effectively use React Context API for state management in large applications?", tags: ["react", "context-api", "state-management"], author: { name: "Jane Doe", avatarUrl: "https://i.pravatar.cc/40?u=jane", reputation: 1500, joinedDate: "2022-03-15" }, voteCount: 125, answerCount: 5, viewCount: 2500, askedDate: "2 days ago", excerpt: "I'm building a large React app and wondering about the best practices for using Context API versus Redux or Zustand for managing global and feature-specific state. Any advice on performance and scalability?" },
  { id: "q2", title: "Best practices for securing a Node.js Express API?", tags: ["node.js", "express", "security", "api"], author: { name: "John Smith", avatarUrl: "https://i.pravatar.cc/40?u=john", reputation: 2200, joinedDate: "2021-08-20" }, voteCount: 98, answerCount: 8, viewCount: 1800, askedDate: "5 days ago", excerpt: "What are the essential security measures (authentication, authorization, data validation, rate limiting, etc.) I should implement for a production Node.js Express API?" },
  { id: "q3", title: "Understanding async/await in JavaScript deep dive", tags: ["javascript", "async-await", "promises"], author: { name: "Alice Brown", avatarUrl: "https://i.pravatar.cc/40?u=alice", reputation: 950, joinedDate: "2023-01-10" }, voteCount: 75, answerCount: 3, viewCount: 1200, askedDate: "1 week ago", excerpt: "Can someone explain the event loop interaction with async/await and how it differs from .then() chains in Promises? Looking for a conceptual understanding." },
];

const popularTags = ["react", "javascript", "python", "node.js", "typescript", "java", "c#", "html", "css", "devops"];

const QuestionsListPage = () => {
  console.log('QuestionsListPage (Homepage) loaded');
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5; // Example total pages

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Here you would typically fetch data for the new page
    console.log(`Navigating to page ${page}`);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-6">
          <main className="flex-1">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-bold">All Questions</h1>
              {/* Ask Question Button is in Header */}
            </div>
            <Tabs defaultValue="newest" className="w-full mb-6">
              <TabsList>
                <TabsTrigger value="newest">Newest</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="unanswered">Unanswered</TabsTrigger>
                <TabsTrigger value="popular">Popular</TabsTrigger>
              </TabsList>
              <TabsContent value="newest">
                {/* Content for Newest questions */}
              </TabsContent>
              {/* Add other TabsContent as needed */}
            </Tabs>

            <ScrollArea className="h-[calc(100vh-20rem)]"> {/* Adjust height as needed */}
              <div className="space-y-4 pr-4">
                {placeholderQuestions.map(q => (
                  <QuestionListItem
                    key={q.id}
                    id={q.id}
                    title={q.title}
                    tags={q.tags}
                    author={q.author}
                    voteCount={q.voteCount}
                    answerCount={q.answerCount}
                    viewCount={q.viewCount}
                    askedDate={q.askedDate}
                    excerpt={q.excerpt}
                  />
                ))}
              </div>
            </ScrollArea>

            <Pagination className="mt-6">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" onClick={(e) => { e.preventDefault(); if (currentPage > 1) handlePageChange(currentPage - 1); }} />
                </PaginationItem>
                {[...Array(totalPages)].map((_, i) => (
                  <PaginationItem key={i}>
                    <PaginationLink href="#" isActive={currentPage === i + 1} onClick={(e) => { e.preventDefault(); handlePageChange(i + 1); }}>
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                {totalPages > 5 && <PaginationItem><PaginationEllipsis /></PaginationItem>}
                <PaginationItem>
                  <PaginationNext href="#" onClick={(e) => { e.preventDefault(); if (currentPage < totalPages) handlePageChange(currentPage + 1); }}/>
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </main>

          <Sidebar title="Community Highlights">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Popular Tags</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {popularTags.map(tag => (
                  <Link to={`/tags/${tag}`} key={tag}>
                    <Badge variant="secondary" className="cursor-pointer hover:bg-primary/10">{tag}</Badge>
                  </Link>
                ))}
              </CardContent>
            </Card>
            {/* Other sidebar content like "Hot Questions", "Top Users" can be added here */}
          </Sidebar>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default QuestionsListPage;