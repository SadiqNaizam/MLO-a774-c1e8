import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner"; // Assuming Sonner is also used for different types of notifications
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import Page Components
import QuestionsListPage from "./pages/QuestionsListPage"; // Homepage
import QuestionDetailPage from "./pages/QuestionDetailPage";
import AskQuestionPage from "./pages/AskQuestionPage";
import UserProfilePage from "./pages/UserProfilePage";
import TagsPage from "./pages/TagsPage";
import NotFound from "./pages/NotFound"; // Assuming NotFound.tsx exists in src/pages/

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster /> {/* For shadcn/ui toasts */}
      <Sonner />  {/* For sonner toasts, if used */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<QuestionsListPage />} />
          <Route path="/questions/:questionId" element={<QuestionDetailPage />} />
          <Route path="/ask-question" element={<AskQuestionPage />} />
          <Route path="/profile/:userId" element={<UserProfilePage />} /> {/* Changed from /users/:userId */}
          <Route path="/tags" element={<TagsPage />} />
          <Route path="/tags/:tagName" element={<QuestionsListPage />} /> {/* Placeholder for questions filtered by tag */}


          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} /> {/* Always Include This Line As It Is. */}
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;