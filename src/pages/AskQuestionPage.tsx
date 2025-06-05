import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import RichTextEditor from '@/components/RichTextEditor';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useNavigate } from 'react-router-dom';
import { toast } from "@/components/ui/use-toast";


const askQuestionSchema = z.object({
  title: z.string().min(15, { message: "Title must be at least 15 characters." }).max(150, { message: "Title must be at most 150 characters."}),
  body: z.string().min(30, { message: "Body must be at least 30 characters." }),
  tags: z.string().min(1, { message: "Please enter at least one tag."}) // Simple string for now, can be array with custom validation
});

type AskQuestionFormValues = z.infer<typeof askQuestionSchema>;

const AskQuestionPage = () => {
  console.log('AskQuestionPage loaded');
  const navigate = useNavigate();
  
  const form = useForm<AskQuestionFormValues>({
    resolver: zodResolver(askQuestionSchema),
    defaultValues: {
      title: "",
      body: "",
      tags: "",
    },
    mode: "onChange", // Validate on change for better UX
  });

  const onSubmit = (data: AskQuestionFormValues) => {
    console.log('Question submitted:', data);
    // Here you would typically send data to a backend API
    // For now, simulate success and redirect
    toast({
      title: "Question Posted!",
      description: "Your question has been successfully posted.",
      variant: "default", // or "success" if you have one
    });
    // Redirect to questions list or the new question page (if ID is returned)
    navigate('/'); 
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">Ask a Public Question</CardTitle>
                    <CardDescription>
                        Provide as much detail as possible so others can help you.
                        Ensure your title is specific and your body includes all relevant information.
                    </CardDescription>
                </CardHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <CardContent className="space-y-6">
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel htmlFor="title" className="font-semibold">Title</FormLabel>
                                        <FormDescription>Be specific and imagine you’re asking a question to another person.</FormDescription>
                                        <FormControl>
                                            <Input id="title" placeholder="e.g. How to implement authentication in Next.js?" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            
                            <FormField
                                control={form.control}
                                name="body"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel htmlFor="body" className="font-semibold">Body</FormLabel>
                                        <FormDescription>Include all the information someone would need to answer your question. Use Markdown for formatting and code blocks.</FormDescription>
                                        <FormControl>
                                            <RichTextEditor
                                                id="body"
                                                value={field.value}
                                                onChange={field.onChange}
                                                minHeight="min-h-[200px]"
                                                placeholder="Describe your problem in detail..."
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="tags"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel htmlFor="tags" className="font-semibold">Tags</FormLabel>
                                        <FormDescription>Add up to 5 tags to describe what your question is about. Use commas to separate tags.</FormDescription>
                                        <FormControl>
                                            <Input id="tags" placeholder="e.g. react,typescript,nextjs" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                        {/* Add autocomplete/suggestion UI here in a real app */}
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                        <CardFooter>
                             <Button type="submit" className="w-full sm:w-auto" disabled={form.formState.isSubmitting}>
                                {form.formState.isSubmitting ? "Submitting..." : "Post Your Question"}
                            </Button>
                        </CardFooter>
                    </form>
                </Form>
            </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AskQuestionPage;