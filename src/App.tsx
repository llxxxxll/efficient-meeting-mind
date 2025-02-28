
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MeetingProvider } from "./context/MeetingContext";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import AddMeeting from "./pages/AddMeeting";
import Recommendations from "./pages/Recommendations";
import NotFound from "./pages/NotFound";
import { Toaster } from "./components/ui/toaster";
import { useEffect } from "react";

function App() {
  // Apply the saved theme on initial load or follow system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    if (savedTheme === "dark" || (!savedTheme && systemPrefersDark)) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  return (
    <Router>
      <MeetingProvider>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add-meeting" element={<AddMeeting />} />
          <Route path="/recommendations" element={<Recommendations />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
      </MeetingProvider>
    </Router>
  );
}

export default App;
