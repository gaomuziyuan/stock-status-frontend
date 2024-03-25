import axios from "axios";
import { useState } from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:3001/users?username=${username}&password=${password}`
      );
      const users = response.data;
      if (users.length > 0) {
        const user = users[0];
        if (user.password === password) {
          if (user.role === "admin") {
            router.push("/admin/dashboard");
          } else if (user.role === "manager") {
            router.push("/manager/dashboard");
          } else if (user.role === "member") {
            router.push("/member/dashboard");
          } else if (user.role === "senior") {
            router.push("/senior/dashboard");
          }
          setError("");
        } else {
          setError("Password is incorrect");
        }
      } else {
        setError("Username does not exist");
      }
    } catch (error) {
      setError("Login failed, please try again");
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form className="p-10 bg-white rounded shadow-md w-full max-w-xs">
        <h1 className="text-xl font-semibold mb-4">Login</h1>
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Username
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <Button
          variant="outline"
          onClick={() => handleLogin()}
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Log in"}
        </Button>
      </form>
    </div>
  );
}
