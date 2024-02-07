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
    <div className="bg-blue-50 h-screen flex items-center dark:bg-black text-white">
      <div class="container px-5 pt-32 mx-auto lg:px-4 lg:py-4">
        <div class="flex flex-col w-full mb-2 text-left md:text-center ">
          <h1 class="mb-2 text-6xl font-bold tracking-tighter text-black lg:text-8xl md:text-7xl dark:text-white">
            <span>Welcome to </span>
            <br class="hidden lg:block"></br>
            realtime ChatApp
          </h1>
          <br></br>
          <p class="mx-auto  text-xl font-normal leading-relaxed text-gray-600 dark:text-gray-300 lg:w-2/3">
            ChatApp is a free to use chatting website made with React.js and
            styled with Tailwind CSS
          </p>
        </div>
        <div className="mt-10 ">
          <form className="w-64 mx-auto mb-12" onSubmit={handleSubmit}>
            <input
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setErrorMessage("");
              }}
              type="text"
              placeholder="Username"
              className="block w-full rounded-md p-2 mb-2 border dark:bg-black text-white"
            />
            <input
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setErrorMessage("");
              }}
              type="password"
              placeholder="Password"
              className="block w-full rounded-md p-2 mb-2 border dark:bg-black text-white"
            />
            <button className="bg-blue-500 text-white block w-full rounded-md p-2 dark:bg-slate-600">
              {isLoginOrRegister === "register" ? "Register" : "Login"}
            </button>
            {errorMessage && (
              <div className="text-red-500 text-center mt-2">
                {errorMessage}
              </div>
            )}
            <div className="text-center text-black mt-2 dark:text-gray-300">
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
      </div>
    </div>
  );
}
