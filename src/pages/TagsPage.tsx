import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const placeholderTags = [
  { name: "javascript", count: 1250, description: "For questions regarding programming in ECMAScript (JavaScript/JS) and its various dialects/implementations (excluding ActionScript). Note that JavaScript is NOT Java." },
  { name: "python", count: 1100, description: "Python is a multi-paradigm, dynamically typed, multipurpose programming language. It is designed to be quick to learn, understand, and use, and enforces a clean and uniform syntax." },
  { name: "react", count: 980, description: "React is a JavaScript library for building user interfaces. It's declarative, efficient, and flexible." },
  { name: "java", count: 950, description: "Java is a high-level, class-based, object-oriented programming language that is designed to have as few implementation dependencies as possible." },
  { name: "node.js", count: 850, description: "Node.js is an open-source, cross-platform, back-end JavaScript runtime environment that runs on the V8 engine and executes JavaScript code outside a web browser." },
  { name: "c#", count: 780, description: "C# (C-Sharp) is a programming language developed by Microsoft. It is a modern, object-oriented language." },
  { name: "typescript", count: 720, description: "TypeScript is a strict syntactical superset of JavaScript and adds optional static typing to the language." },
  { name: "html", count: 680, description: "HTML (HyperText Markup Language) is the most basic building block of the Web. It defines the meaning and structure of web content." },
  { name: "css", count: 650, description: "CSS (Cascading Style Sheets) is a stylesheet language used to describe the presentation of a document written in HTML or XML." },
  { name: "android", count: 600, description: "Android is a mobile operating system based on a modified version of the Linux kernel and other open source software, designed primarily for touchscreen mobile devices such as smartphones and tablets." },
  { name: "sql", count: 550, description: "SQL (Structured Query Language) is a domain-specific language used in programming and designed for managing data held in a relational database management system (RDBMS)." },
  { name: "git", count: 500, description: "Git is a free and open source distributed version control system designed to handle everything from small to very large projects with speed and efficiency." }
];

const TagsPage = () => {
  console.log('TagsPage loaded');
  const [filter, setFilter] = useState('');

  const filteredTags = placeholderTags.filter(tag =>
    tag.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Tags</h1>
          <p className="text-muted-foreground">
            A tag is a keyword or label that categorizes your question with other, similar questions.
            Using the right tags makes it easier for others to find and answer your question.
          </p>
        </div>
        
        <Input
          type="text"
          placeholder="Filter by tag name (e.g. javascript)"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="mb-6 max-w-sm"
        />

        <ScrollArea className="h-[calc(100vh-22rem)]"> {/* Adjust height as needed */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pr-4">
            {filteredTags.length > 0 ? filteredTags.map(tag => (
              <Card key={tag.name} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-2">
                  <Link to={`/tags/${tag.name}`}>
                    <Badge variant="default" className="text-sm px-3 py-1 mb-2 cursor-pointer">{tag.name}</Badge>
                  </Link>
                  <CardTitle className="text-sm text-muted-foreground">{tag.count} questions</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground line-clamp-3 h-[45px]"> {/* Ensure consistent height */}
                    {tag.description || "No description available for this tag."}
                  </p>
                </CardContent>
                {/* <CardFooter className="pt-2">
                    <Link to={`/tags/${tag.name}`} className="text-xs text-primary hover:underline">View questions</Link>
                </CardFooter> */}
              </Card>
            )) : (
                <p className="text-muted-foreground col-span-full text-center py-8">No tags found matching your filter.</p>
            )}
          </div>
        </ScrollArea>
      </main>
      <Footer />
    </div>
  );
};

export default TagsPage;