import { UseAuth } from "@/contexts/AuthContext";
import "@/styles/profile.css";
import API from "@/utils/api";
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "react-toastify";

export default function ProfilePage() {
  const { user, updateUser } = UseAuth();

  const [profileInput, setProfileInput] = useState<{
    username: string;
    email: string;
  }>({
    username: String(user?.username),
    email: String(user?.email),
  });
  const [passwordInput, setPasswordInput] = useState<{
    newPassword: string;
    password: string;
  }>({
    newPassword: String(user?.username),
    password: String(user?.email),
  });

  const handleSubmitProfile = (e: FormEvent) => {
    e.preventDefault();
    if (profileInput.username !== "" && profileInput.email !== "") {
      return API.patch("/api/profile", { ...profileInput })
        .then((response) => {
          console.log(response);
          updateUser(response.data.user);
          toast("Profile updated!", {
            type: "success",
            closeOnClick: true,
          });
        })
        .catch(() => {
          toast("Failed to update Account!", {
            type: "error",
            closeOnClick: true,
          });
        })
        .finally();
    }
    toast("All fields not provided!", { type: "error", closeOnClick: true });
  };

  const handleProfile = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmitPassword = (e: FormEvent) => {
    e.preventDefault();
    if (passwordInput.newPassword !== "" && passwordInput.password !== "") {
      return API.patch("/api/profile", { ...passwordInput })
        .then((response) => {
          console.log(response);
          toast("Password changed!", {
            type: "success",
            closeOnClick: true,
          });
        })
        .finally();
    }
    toast("All fields not provided!", { type: "error", closeOnClick: true });
  };

  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      <div className="profile-container">
        <h2>Profile: {user?.username}</h2>
        <h3>Update Profile</h3>
        <form
          onSubmit={handleSubmitProfile}
          className="profile-update-container"
        >
          <div className="profile-update-row">
            <label>Username:</label>
            <input
              type="text"
              id="user-name"
              name="username"
              placeholder="username"
              value={profileInput.username}
              onChange={handleProfile}
            />
          </div>
          <div className="profile-update-row">
            <label>Email:</label>
            <input
              type="text"
              id="user-name"
              name="username"
              placeholder="email"
              value={profileInput.email}
              onChange={handleProfile}
            />
          </div>
          <button>Update profile</button>
        </form>
        <h3>Change password</h3>
        <form
          onSubmit={handleSubmitPassword}
          className="profile-password-container"
        >
          <div className="profile-password-row">
            <label>New password:</label>
            <input
              type="password"
              name="newPassword"
              id="user-new-password"
              placeholder="New password"
              value={passwordInput.newPassword}
              onChange={handlePassword}
            />
          </div>
          <div className="profile-password-row">
            <label>Current password:</label>
            <input
              type="password"
              name="password"
              id="user-password"
              placeholder="Current password"
              value={passwordInput.password}
              onChange={handlePassword}
            />
          </div>
          <button>Change password</button>
        </form>
      </div>
    </>
  );
}
