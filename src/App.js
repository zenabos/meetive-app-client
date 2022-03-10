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
import { Container } from "@mui/material";
import Header from "./components/Header";

const theme = createTheme({
  palette: {
    background: {
      default: "#f0f8ff"
    },
    primary: {
      main: "#309cad",
    },
    secondary: {
      main: "#e91e63",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Container className="App" sx={{ mt: 12, mb:5}}>
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
        <Navbar />
      </Container>
    </ThemeProvider>
  );
}

export default App;
