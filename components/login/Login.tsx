import axios from "axios";
import { useState } from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setLoginState } from "@/lib/redux/slices/userSlice/userSlice";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { AlertCircle } from "lucide-react";
import { jwtDecode } from "jwt-decode";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isActive, setActive] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogin = async () => {
    setIsLoading(true);
    setActive(true);
    setError("");
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_HOST}/auth/login`,
        { username: username, password: password }
      );
      const { token } = response.data;
      localStorage.setItem("token", token);

      const decodedToken: { username: string; role: string } = jwtDecode(token);

      dispatch(
        setLoginState({
          isLoggedIn: true,
          username: decodedToken.username,
          role: decodedToken.role,
        })
      );
      router.push("/dashboard");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data.error ?? "Login failed, please try again";
        setError(message);
      } else if (error instanceof Error) {
        setError(error.message || "Login failed, please try later again");
      } else {
        setError("Login failed, please try later again");
      }
      setActive(false);
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
        {!isActive && (
          <Alert variant="destructive" className="mt-2">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </form>
    </div>
  );
}
