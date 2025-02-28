
import { useState } from "react";
import { useMeetingContext, Topic } from "../context/MeetingContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CalendarIcon, Plus, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  date: z.date(),
  duration: z.coerce
    .number()
    .min(1, "Duration must be at least 1 minute")
    .max(480, "Duration must be less than 8 hours"),
  participants: z.coerce
    .number()
    .min(1, "Must have at least 1 participant")
    .max(100, "Must have less than 100 participants"),
  goalAchieved: z.boolean().default(false),
  topics: z.array(
    z.object({
      id: z.string(),
      name: z.string().min(1, "Topic cannot be empty"),
      duration: z.number().optional(),
    })
  ).min(1, "Must have at least one topic"),
});

type FormValues = z.infer<typeof formSchema>;

const MeetingForm = () => {
  const { addMeeting } = useMeetingContext();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [newTopic, setNewTopic] = useState("");

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: new Date(),
      duration: 30,
      participants: 3,
      goalAchieved: false,
      topics: [{ id: crypto.randomUUID(), name: "", duration: undefined }],
    },
  });

  const topics = form.watch("topics");

  const handleAddTopic = () => {
    if (newTopic.trim()) {
      form.setValue("topics", [
        ...topics,
        { id: crypto.randomUUID(), name: newTopic.trim(), duration: undefined },
      ]);
      setNewTopic("");
    } else {
      form.setValue("topics", [
        ...topics,
        { id: crypto.randomUUID(), name: "", duration: undefined },
      ]);
    }
  };

  const handleRemoveTopic = (id: string) => {
    if (topics.length > 1) {
      form.setValue(
        "topics",
        topics.filter((topic) => topic.id !== id)
      );
    } else {
      toast({
        title: "Cannot remove topic",
        description: "You must have at least one topic for the meeting",
        variant: "destructive",
      });
    }
  };

  const updateTopic = (id: string, name: string) => {
    const updatedTopics = topics.map((topic) =>
      topic.id === id ? { ...topic, name } : topic
    );
    form.setValue("topics", updatedTopics);
  };

  const onSubmit = (data: FormValues) => {
    // Remove any empty topics
    const validTopics = data.topics.filter((topic) => topic.name.trim() !== "");
    
    if (validTopics.length === 0) {
      toast({
        title: "Invalid topics",
        description: "Please add at least one topic for the meeting",
        variant: "destructive",
      });
      return;
    }
    
    // Update the topics with the valid ones
    const meetingData = {
      ...data,
      topics: validTopics,
    };
    
    addMeeting(meetingData);
    
    toast({
      title: "Meeting recorded",
      description: "Your meeting has been successfully recorded",
    });
    
    navigate("/dashboard");
  };

  return (
    <Card className="w-full max-w-xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Record a Meeting</CardTitle>
        <CardDescription>
          Enter the details of your meeting to track its efficiency.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Meeting Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Duration (minutes)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={1}
                        max={480}
                        placeholder="Enter duration in minutes"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="participants"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number of Participants</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={1}
                        max={100}
                        placeholder="Enter number of participants"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="goalAchieved"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Goal Achieved?</FormLabel>
                    <Select
                      onValueChange={(value) => field.onChange(value === "true")}
                      defaultValue={field.value ? "true" : "false"}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select..." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="true">Yes</SelectItem>
                        <SelectItem value="false">No</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormItem>
              <FormLabel>Topics Discussed</FormLabel>
              <FormDescription>
                List the topics that were discussed during the meeting.
              </FormDescription>
              <div className="space-y-3 mt-2">
                {topics.map((topic, index) => (
                  <div key={topic.id} className="flex items-center gap-2">
                    <Input
                      value={topic.name}
                      onChange={(e) => updateTopic(topic.id, e.target.value)}
                      placeholder={`Topic ${index + 1}`}
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => handleRemoveTopic(topic.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2 mt-3">
                <Input
                  value={newTopic}
                  onChange={(e) => setNewTopic(e.target.value)}
                  placeholder="Add a new topic"
                  className="flex-1"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddTopic();
                    }
                  }}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={handleAddTopic}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              {form.formState.errors.topics && (
                <p className="text-sm font-medium text-destructive mt-2">
                  {form.formState.errors.topics.message}
                </p>
              )}
            </FormItem>

            <Button type="submit" className="w-full">
              Record Meeting
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default MeetingForm;
