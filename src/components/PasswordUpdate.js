import React, { useState } from "react";
import {
  FormDiv,
  Button,
  Input,
  PasswordChecks,
  Check,
} from "./styledElements";
import { toastConfig } from "./styledElements";
import { toast, ToastContainer } from "react-toastify";
import { CheckSquare, XCircle } from "react-feather";

function PasswordUpdate({ user, updatePassword }) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const passwordsMatch = newPassword === confirmPassword;

  const handlePasswordUpdate = (e) => {
    e.preventDefault();
    if (!passwordsMatch) {
      return toast.error("Passwords do not match", toastConfig);
    }
    const params = {
      password: user.password,
      newPassword,
      currentPassword,
    };
    updatePassword(e, params);
  };

  const characterCountRegex = /.{8,}/;
  const uppercaseRegex = /(?=.*?[A-Z])/;
  const specialCharacterRegex = /(?=.*?[#?!@$%^&*-])/;
  const digitRegex = /(?=.*?[0-9])/;

  const passwordRegex = /^(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

  return (
    <FormDiv style={{ width: "340px" }}>
      <ToastContainer />
      <form onSubmit={handlePasswordUpdate} className="password-update">
        <Input
          value={currentPassword}
          type="password"
          name="currentPassword"
          id="currentPassword"
          placeholder="Enter current password"
          onChange={(e) => setCurrentPassword(e.target.value)}
          required
        />
        <Input
          value={newPassword}
          type="password"
          name="newPassword"
          id="newPassword"
          placeholder="Enter new password"
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        {newPassword && (
          <PasswordChecks>
            <Check>
              {characterCountRegex.test(newPassword) ? (
                <CheckSquare
                  size={20}
                  style={{ marginRight: "0.5rem", color: "green" }}
                />
              ) : (
                <XCircle
                  size={20}
                  style={{ marginRight: "0.5rem", color: "red" }}
                />
              )}
              <span style={{ fontSize: "14px" }}>
                Password must contain atleast 8 characters
              </span>
            </Check>
            <Check>
              {uppercaseRegex.test(newPassword) ? (
                <CheckSquare
                  size={20}
                  style={{ marginRight: "0.5rem", color: "green" }}
                />
              ) : (
                <XCircle
                  size={20}
                  style={{ marginRight: "0.5rem", color: "red" }}
                />
              )}
              <span style={{ fontSize: "14px" }}>
                Password must contain atleast one uppercase
              </span>
            </Check>
            <Check>
              {digitRegex.test(newPassword) ? (
                <CheckSquare
                  size={20}
                  style={{ marginRight: "0.5rem", color: "green" }}
                />
              ) : (
                <XCircle
                  size={20}
                  style={{ marginRight: "0.5rem", color: "red" }}
                />
              )}
              <span style={{ fontSize: "14px" }}>
                Password must contain atleast one digit
              </span>
            </Check>
            <Check>
              {specialCharacterRegex.test(newPassword) ? (
                <CheckSquare
                  size={20}
                  style={{ marginRight: "0.5rem", color: "green" }}
                />
              ) : (
                <XCircle
                  size={20}
                  style={{ marginRight: "0.5rem", color: "red" }}
                />
              )}
              <span style={{ fontSize: "14px" }}>
                Password must contain atleast one special character
              </span>
            </Check>
          </PasswordChecks>
        )}
        <Input
          value={confirmPassword}
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          placeholder="Reenter new password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        {confirmPassword && (
          <PasswordChecks style={{ height: "auto" }}>
            <Check>
              {passwordsMatch ? (
                <CheckSquare
                  size={20}
                  style={{ marginRight: "0.5rem", color: "green" }}
                />
              ) : (
                <XCircle
                  size={20}
                  style={{ marginRight: "0.5rem", color: "red" }}
                />
              )}
              <span style={{ fontSize: "14px" }}>
                {passwordsMatch ? "Passwords match" : "Passwords do not match"}
              </span>
            </Check>
          </PasswordChecks>
        )}
        <Button
          disabled={!passwordsMatch || !passwordRegex.test(newPassword)}
          type="submit"
          style={{ width: "180px" }}
        >
          Update Password
        </Button>
      </form>
    </FormDiv>
  );
}

export default PasswordUpdate;
