
import React, { createContext, useContext, useState, useEffect } from "react";

export interface Topic {
  id: string;
  name: string;
  duration?: number; // For real-time tracking feature
}

export interface Meeting {
  id: string;
  date: Date;
  duration: number;
  participants: number;
  topics: Topic[];
  goalAchieved: boolean;
  createdAt: Date;
}

interface MeetingContextType {
  meetings: Meeting[];
  addMeeting: (meeting: Omit<Meeting, "id" | "createdAt">) => void;
  updateMeeting: (id: string, meeting: Partial<Meeting>) => void;
  deleteMeeting: (id: string) => void;
  clearMeetings: () => void;
}

const MeetingContext = createContext<MeetingContextType | undefined>(undefined);

export const useMeetingContext = () => {
  const context = useContext(MeetingContext);
  if (!context) {
    throw new Error("useMeetingContext must be used within a MeetingProvider");
  }
  return context;
};

export const MeetingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize meetings from localStorage if available
  const [meetings, setMeetings] = useState<Meeting[]>(() => {
    const savedMeetings = localStorage.getItem("meetings");
    if (savedMeetings) {
      try {
        // Parse the JSON string
        const parsedMeetings = JSON.parse(savedMeetings);
        
        // Convert string dates back to Date objects
        return parsedMeetings.map((meeting: any) => ({
          ...meeting,
          date: new Date(meeting.date),
          createdAt: new Date(meeting.createdAt)
        }));
      } catch (error) {
        console.error("Error parsing meetings from localStorage:", error);
        return [];
      }
    }
    return [];
  });

  // Save meetings to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("meetings", JSON.stringify(meetings));
  }, [meetings]);

  const addMeeting = (meeting: Omit<Meeting, "id" | "createdAt">) => {
    const newMeeting: Meeting = {
      ...meeting,
      id: crypto.randomUUID(),
      createdAt: new Date()
    };
    setMeetings([...meetings, newMeeting]);
  };

  const updateMeeting = (id: string, updatedMeeting: Partial<Meeting>) => {
    setMeetings(
      meetings.map((meeting) =>
        meeting.id === id ? { ...meeting, ...updatedMeeting } : meeting
      )
    );
  };

  const deleteMeeting = (id: string) => {
    setMeetings(meetings.filter((meeting) => meeting.id !== id));
  };

  const clearMeetings = () => {
    if (window.confirm("Are you sure you want to delete all meetings? This action cannot be undone.")) {
      setMeetings([]);
    }
  };

  return (
    <MeetingContext.Provider
      value={{
        meetings,
        addMeeting,
        updateMeeting,
        deleteMeeting,
        clearMeetings
      }}
    >
      {children}
    </MeetingContext.Provider>
  );
};
