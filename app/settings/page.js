"use client";

import PageTemplate from "../components/PageTemplate";
import Img from "../../public/globe.svg";
import Setting from "../components/Setting";
import Spacer from "../components/Spacer";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useAuth } from "../lib/authContext";
import { updateUserInfo } from "../services/dataServices";
import generateWeatherDisplayName from "../utils/nameGenerator";


const Page = () => {
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const { user, changePassword, userProfile } = useAuth();
  const [displayName, setDisplayName] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatNewPassword, setRepeatNewPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (userProfile) {
      setDisplayName(userProfile.displayName || "");
    }
  }, [userProfile]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      let updates = [];

      if (displayName !== (user?.displayName || "")) {
        const newDisplayName =
          displayName.trim() === ""
            ? generateWeatherDisplayName()
            : displayName;
        await updateUserInfo(user.uid, { displayName: newDisplayName });
        updates.push("Display name updated successfully.");
        setDisplayName(newDisplayName);
        user.displayName = newDisplayName;
      }

      if (currentPassword && newPassword && repeatNewPassword) {
        if (newPassword !== repeatNewPassword) {
          throw new Error("New passwords do not match.");
        }
        const passwordResult = await changePassword(
          currentPassword,
          newPassword
        );
        updates.push(passwordResult.message);
      }

      if (updates.length > 0) {
        setSuccess(updates.join(" "));
      } else {
        setSuccess("No changes were made.");
      }

      setCurrentPassword("");
      setNewPassword("");
      setRepeatNewPassword("");
    } catch (error) {
      setError(
        error.message || "An error occurred while updating your profile."
      );
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return <p>Please sign in to view your profile.</p>;
  }

  return (
    <PageTemplate title="User Settings">
      <Spacer />
      <div className="settings-subtitle">Update Profile</div>
      <div className="settings-container">
       

        <form className="settings-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <label htmlFor="displayName">Display Name</label>
            <input
              type="text"
              id="displayName"
              name="displayName"
              placeholder="display name - will generate a random name if empty"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
            />
          </div>

          <div className="toggle-section">
            <div>Change Password</div>
            <label htmlFor="togglePasswordChange" className="switch"><input id="togglePasswordChange" type="checkbox" onChange={() => setShowPasswordFields(!showPasswordFields)} checked={showPasswordFields}/><span className="slider1 round"></span></label>
          </div>

          {showPasswordFields && (
            <>
              <div className="form-row">
                <label htmlFor="currentPassword">Current Password</label>
                <input
                  type="password"
                  placeholder="Enter current password"
                  id="currentPassword"
                  name="currentPassword"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
              </div>

              <div className="form-row">
                <label htmlFor="newPassword">New Password</label>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>

              <div className="form-row">
                <label htmlFor="repeatNewPassword">Repeat  Password</label>
                <input
                  type="password"
                  id="repeatNewPassword"
                  name="repeatNewPassword"
                  placeholder="Repeat new password"
                  value={repeatNewPassword}
                  onChange={(e) => setRepeatNewPassword(e.target.value)}
                />
              </div>
            </>
          )}

          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>

      <div className="settings-links">
        <Setting
          onclick={() => router.push("/favourites")}
          name="Your saved locations"
          img={Img}
        />
        <Setting name="Logout" img={Img} />{" "}
      </div>
    </PageTemplate>
  );
};

export default Page;
