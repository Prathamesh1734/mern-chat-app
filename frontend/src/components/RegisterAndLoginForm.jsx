import { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "./UserContext";

export default function RegisterAndLoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginOrRegister, setIsLoginOrRegister] = useState("register");
  const { setUsername: setLoggedInUsername, setId } = useContext(UserContext);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const url = isLoginOrRegister === "register" ? "register" : "login";
    try {
      const { data } = await axios.post(url, { username, password });
      setLoggedInUsername(username);
      setId(data.id);
    } catch (error) {
      if (error.response.status === 401) {
        setErrorMessage("Invalid username or password!");
      }
    }
  }

  return (
    <div className="bg-blue-50 h-screen flex items-center">
      <form className="w-64 mx-auto mb-12" onSubmit={handleSubmit}>
        <input
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
            setErrorMessage("");
          }}
          type="text"
          placeholder="Username"
          className="block w-full rounded-md p-2 mb-2 border"
        />
        <input
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setErrorMessage("");
          }}
          type="password"
          placeholder="Password"
          className="block w-full rounded-md p-2 mb-2 border"
        />
        <button className="bg-blue-500 text-white block w-full rounded-md p-2">
          {isLoginOrRegister === "register" ? "Register" : "Login"}
        </button>
        {errorMessage && (
          <div className="text-red-500 text-center mt-2">{errorMessage}</div>
        )}
        <div className="text-center mt-2">
          {isLoginOrRegister === "register" && (
            <div>
              Already a member?{" "}
              <button
                onClick={() => {
                  setIsLoginOrRegister("login");
                }}
              >
                Login here
              </button>
            </div>
          )}
          {isLoginOrRegister === "login" && (
            <div>
              Not a member?{" "}
              <button
                onClick={() => {
                  setIsLoginOrRegister("register");
                }}
              >
                Register here
              </button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
