import { UseAuth } from "@/contexts/AuthContext";
import API from "@/utils/api";
import { ChangeEvent, FormEvent, useState } from "react";
import "@/styles/form.css";
import { toast } from "react-toastify";

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
          toast("Signup success, Welcome " + response.data.user.username, {
            type: "success",
            closeOnClick: true,
          });
        })
        .finally();
    }
    toast("All fields not provided!", { type: "error", closeOnClick: true });
  };

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="fill">
      <div className="form-container">
        <h2>Welcome create your account!</h2>
        <form onSubmit={handleSubmitEvent}>
          <div className="form-row">
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
          <div className="form-row">
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
          <div className="form-row">
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
