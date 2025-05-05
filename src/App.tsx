
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { VocabProvider } from "./contexts/VocabContext";

// Pages
import Dashboard from "./pages/Dashboard";
import WordList from "./pages/WordList";
import FlashcardPage from "./pages/FlashcardPage";
import QuizPage from "./pages/QuizPage";
import Favorites from "./pages/Favorites";
import WordDetail from "./pages/WordDetail";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";

const queryClient = new QueryClient();

// Update page title
document.title = "Vocabu.AI | Smart Vocabulary Builder";

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <VocabProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/words" element={<WordList />} />
            <Route path="/flashcards" element={<FlashcardPage />} />
            <Route path="/quiz" element={<QuizPage />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/word/:id" element={<WordDetail />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </VocabProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
