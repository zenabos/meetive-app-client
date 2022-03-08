import { Route, Routes } from "react-router-dom";
import "./App.css";
import CreateMeeting from "./components/CreateMeeting";
import CreateTopic from "./components/CreateTopic";
import MeetingDetails from "./components/MeetingDetails";
import MeetingList from "./components/MeetingsList";
import Navbar from "./components/Navbar";
import Homepage from "./pages/Homepage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import EditMeeting from "./components/EditMeeting";
import Invitations from "./components/Invitations";
import MyMeetings from "./components/MyMeetings";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#309cad",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Navbar />

        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/meetings" element={<MeetingList />} />
          <Route path="/meetings/my-meetings" element={<MyMeetings />} />
          <Route path="/meetings/invitations" element={<Invitations />} />
          <Route path="/meetings/create" element={<CreateMeeting />} />
          <Route path="/create-topic" element={<CreateTopic />} />
          <Route path="/meetings/:meetingId" element={<MeetingDetails />} />
          <Route path="/meetings/edit/:meetingId" element={<EditMeeting />} />
          <Route path="/:meetingId/add-topic" element={<CreateTopic />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
