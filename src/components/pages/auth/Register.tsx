import { UseAuth } from "@/components/contexts/AuthContext";
import API from "@/utils/api";
import { ChangeEvent, FormEvent, useState } from "react";

export default function LoginPage() {
  const [input, setInput] = useState<{
    username: string;
    email: string;
    password: string;
  }>({
    username: "",
    email: "",
    password: "",
  });

  const { login } = UseAuth();

  const handleSubmitEvent = (e: FormEvent) => {
    e.preventDefault();
    if (input.username !== "" && input.password !== "") {
      return API.post("/api/auth/signup", { ...input })
        .then((response) => {
          console.log(response);
          login(response.data.user);
        })
        .finally();
    }
    alert("Please provide a valid input");
  };

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div>
      <div>
        <form onSubmit={handleSubmitEvent}>
          <div>
            <label>Username:</label>
            <input
              type="text"
              id="user-name"
              name="username"
              placeholder="Username or Email"
              aria-description="user-name"
              aria-invalid="false"
              value={input.username}
              onChange={handleInput}
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="text"
              id="user-email"
              name="email"
              placeholder="Username or Email"
              aria-description="user-email"
              aria-invalid="false"
              value={input.email}
              onChange={handleInput}
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              id="user-password"
              name="password"
              placeholder="Password"
              aria-description="user-password"
              aria-invalid="false"
              value={input.password}
              onChange={handleInput}
            />
          </div>
          <button className="">Submit</button>
        </form>
        <a href="/signin">Already have an account? SignIn</a>
      </div>
    </div>
  );
}
