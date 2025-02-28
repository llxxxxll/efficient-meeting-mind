
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MeetingProvider } from "./context/MeetingContext";
import { ThemeProvider } from "./context/ThemeContext";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import AddMeeting from "./pages/AddMeeting";
import Recommendations from "./pages/Recommendations";
import NotFound from "./pages/NotFound";
import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <ThemeProvider>
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
    </ThemeProvider>
  );
}

export default App;
