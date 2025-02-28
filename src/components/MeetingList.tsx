
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useMeetingContext, Meeting } from "../context/MeetingContext";
import { formatDate } from "../utils/formatDate";
import { 
  Check, 
  X, 
  MoreVertical, 
  Trash2, 
  Clock,
  Users,
  CheckCircle,
  XCircle,
  List
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

const MeetingList: React.FC = () => {
  const { meetings, deleteMeeting } = useMeetingContext();
  const { toast } = useToast();
  const [selectedMeeting, setSelectedMeeting] = useState<Meeting | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  // Sort meetings by date descending (newest first)
  const sortedMeetings = [...meetings].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const handleDelete = (id: string) => {
    deleteMeeting(id);
    toast({
      title: "Meeting deleted",
      description: "The meeting has been successfully deleted",
    });
  };

  const handleShowDetails = (meeting: Meeting) => {
    setSelectedMeeting(meeting);
    setIsDetailsOpen(true);
  };

  return (
    <div className="w-full">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead className="hidden md:table-cell">Participants</TableHead>
              <TableHead className="hidden md:table-cell">Topics</TableHead>
              <TableHead className="hidden md:table-cell">Goal Achieved</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedMeetings.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center h-24 text-efficiency-500">
                  No meetings recorded yet
                </TableCell>
              </TableRow>
            ) : (
              sortedMeetings.map((meeting) => (
                <TableRow key={meeting.id} className="cursor-pointer hover:bg-efficiency-50" onClick={() => handleShowDetails(meeting)}>
                  <TableCell>{formatDate(meeting.date)}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Clock className="mr-2 h-4 w-4 text-efficiency-500" />
                      {meeting.duration} min
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div className="flex items-center">
                      <Users className="mr-2 h-4 w-4 text-efficiency-500" />
                      {meeting.participants}
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div className="flex items-center">
                      <List className="mr-2 h-4 w-4 text-efficiency-500" />
                      {meeting.topics.length}
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {meeting.goalAchieved ? (
                      <div className="flex items-center text-green-600">
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Yes
                      </div>
                    ) : (
                      <div className="flex items-center text-red-500">
                        <XCircle className="mr-2 h-4 w-4" />
                        No
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={(e) => {
                          e.stopPropagation();
                          handleShowDetails(meeting);
                        }}>
                          View details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(meeting.id);
                        }} className="text-red-500">
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Meeting Details</DialogTitle>
            <DialogDescription>
              {selectedMeeting && formatDate(selectedMeeting.date)}
            </DialogDescription>
          </DialogHeader>

          {selectedMeeting && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-efficiency-500">Duration</p>
                  <p className="font-medium flex items-center">
                    <Clock className="mr-2 h-4 w-4 text-efficiency-500" />
                    {selectedMeeting.duration} minutes
                  </p>
                </div>
                <div>
                  <p className="text-sm text-efficiency-500">Participants</p>
                  <p className="font-medium flex items-center">
                    <Users className="mr-2 h-4 w-4 text-efficiency-500" />
                    {selectedMeeting.participants}
                  </p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-efficiency-500">Goal Achieved</p>
                  <p className="font-medium">
                    {selectedMeeting.goalAchieved ? (
                      <span className="flex items-center text-green-600">
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Yes
                      </span>
                    ) : (
                      <span className="flex items-center text-red-500">
                        <XCircle className="mr-2 h-4 w-4" />
                        No
                      </span>
                    )}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-sm text-efficiency-500 mb-2">Topics Discussed</p>
                <ScrollArea className="h-[120px]">
                  <ul className="space-y-2">
                    {selectedMeeting.topics.map((topic) => (
                      <li key={topic.id} className="flex items-center">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary mr-2"></span>
                        {topic.name}
                      </li>
                    ))}
                  </ul>
                </ScrollArea>
              </div>
            </div>
          )}

          <DialogFooter className="sm:justify-between">
            <Button
              type="button"
              variant="destructive"
              onClick={() => {
                if (selectedMeeting) {
                  handleDelete(selectedMeeting.id);
                  setIsDetailsOpen(false);
                }
              }}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </Button>
            <Button type="button" variant="outline" onClick={() => setIsDetailsOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MeetingList;
