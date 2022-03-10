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
import IsPrivate from "./components/IsPrivate";
import IsAnon from "./components/IsAnon";

const theme = createTheme({
  palette: {
    background: {
      default: "#f0f8ff",
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
      <Container className="App" sx={{ mt: 12, mb: 5 }}>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route
            path="/signup"
            element={
              <IsAnon>
                <SignupPage />
              </IsAnon>
            }
          />
          <Route
            path="/login"
            element={
              <IsAnon>
                <LoginPage />
              </IsAnon>
            }
          />

          <Route
            path="/meetings"
            element={
              <IsPrivate>
                <MeetingList />{" "}
              </IsPrivate>
            }
          />
          <Route
            path="/meetings/my-meetings"
            element={
              <IsPrivate>
                <MyMeetings />
              </IsPrivate>
            }
          />
          <Route
            path="/meetings/invitations"
            element={
              <IsPrivate>
                <Invitations />
              </IsPrivate>
            }
          />
          <Route
            path="/meetings/create"
            element={
              <IsPrivate>
                <CreateMeeting />
              </IsPrivate>
            }
          />
          <Route
            path="/create-topic"
            element={
              <IsPrivate>
                <CreateTopic />
              </IsPrivate>
            }
          />
          <Route
            path="/meetings/:meetingId"
            element={
              <IsPrivate>
                <MeetingDetails />
              </IsPrivate>
            }
          />
          <Route
            path="/meetings/edit/:meetingId"
            element={
              <IsPrivate>
                <EditMeeting />
              </IsPrivate>
            }
          />
          <Route
            path="/:meetingId/add-topic"
            element={
              <IsPrivate>
                <CreateTopic />
              </IsPrivate>
            }
          />
        </Routes>
        <Navbar />
      </Container>
    </ThemeProvider>
  );
}

export default App;
