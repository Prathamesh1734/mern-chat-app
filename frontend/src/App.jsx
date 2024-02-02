import axios from "axios";
import Routes from "./components/Routes";
import { UserContextProvider } from "./components/UserContext";

function App() {
  axios.defaults.baseURL = "http://localhost:3000";
  axios.defaults.withCredentials = true;

  return (
    <>
      <UserContextProvider>
        <Routes />
      </UserContextProvider>
    </>
  );
}

export default App;
