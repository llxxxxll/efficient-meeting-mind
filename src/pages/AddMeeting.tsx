
import NavBar from "../components/NavBar";
import MeetingForm from "../components/MeetingForm";

const AddMeeting = () => {
  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      <main className="page-container">
        <h1 className="section-title text-center mb-8">Record a New Meeting</h1>
        <div className="max-w-2xl mx-auto">
          <MeetingForm />
        </div>
      </main>
    </div>
  );
};

export default AddMeeting;
