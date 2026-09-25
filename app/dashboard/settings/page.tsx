"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
export default function SettingsPage() {
  const [message, setMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [showCloseConfirmation, setShowCloseConfirmation] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [paperlessStatements, setPaperlessStatements] = useState(true);
  const [fullName, setFullName] = useState("Alicia Mahan");
  const [username, setUsername] = useState("aliciamahan");
  const [email, setEmail] = useState("alicia.mahan83@gmail.com");
  const [editName, setEditName] = useState("Alicia Mahan");
  const [editUsername, setEditUsername] = useState("aliciamahan");
  const [editEmail, setEditEmail] = useState(
    "alicia.mahan83@gmail.com"
  );
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  useEffect(() => {
    const savedFullName = localStorage.getItem("hulton_full_name");
    const savedUsername = localStorage.getItem("hulton_username");
    const savedEmail = localStorage.getItem("hulton_email");
    const savedEmailNotifications = localStorage.getItem(
      "hulton_email_notifications"
    );
    const savedPaperlessStatements = localStorage.getItem(
      "hulton_paperless_statements"
    );
    if (savedFullName) {
      setFullName(savedFullName);
      setEditName(savedFullName);
    }
    if (savedUsername) {
      setUsername(savedUsername);
      setEditUsername(savedUsername);
    }
    if (savedEmail) {
      setEmail(savedEmail);
      setEditEmail(savedEmail);
    }
    if (savedEmailNotifications !== null) {
      setEmailNotifications(savedEmailNotifications === "true");
    }
    if (savedPaperlessStatements !== null) {
      setPaperlessStatements(savedPaperlessStatements === "true");
    }
  }, []);
  const toggleEmailNotifications = () => {
    const newValue = !emailNotifications;
    setEmailNotifications(newValue);
    localStorage.setItem(
      "hulton_email_notifications",
      String(newValue)
    );
  };
  const togglePaperlessStatements = () => {
    const newValue = !paperlessStatements;
    setPaperlessStatements(newValue);
    localStorage.setItem(
      "hulton_paperless_statements",
      String(newValue)
    );
  };
  const handleEdit = () => {
    setEditName(fullName);
    setEditUsername(username);
    setEditEmail(email);
    setIsEditing(true);
    setMessage("");
  };
  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditName(fullName);
    setEditUsername(username);
    setEditEmail(email);
  };
  const handleSave = () => {
    if (!editName.trim() || !editUsername.trim() || !editEmail.trim()) {
      setMessage("Please complete all personal information fields.");
      return;
    }
    const updatedName = editName.trim();
    const updatedUsername = editUsername.trim();
    const updatedEmail = editEmail.trim();
    setFullName(updatedName);
    setUsername(updatedUsername);
    setEmail(updatedEmail);
    localStorage.setItem("hulton_full_name", updatedName);
    localStorage.setItem("hulton_username", updatedUsername);
    localStorage.setItem("hulton_email", updatedEmail);
    setIsEditing(false);
    setMessage("Personal information updated successfully.");
  };
  const handleChangePassword = () => {
    setIsChangingPassword(true);
    setMessage("");
  };
  const handleCancelPassword = () => {
    setIsChangingPassword(false);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };
  const handleSavePassword = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      setMessage("Please complete all password fields.");
      return;
    }
    const savedPassword =
      localStorage.getItem("hulton_password") || "aliciamahan83";
    if (currentPassword !== savedPassword) {
      setMessage("Current password is incorrect.");
      return;
    }
    if (newPassword.length < 8) {
      setMessage("New password must be at least 8 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setMessage("New passwords do not match.");
      return;
    }
    localStorage.setItem("hulton_password", newPassword);
    setIsChangingPassword(false);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setMessage("Password changed successfully.");
  };
  const handleCloseAccount = () => {
    setShowCloseConfirmation(false);
    setMessage(
      "Account closure request submitted. Our team will review your request."
    );
  };
  return (
    <main className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-lg font-bold text-white">
              H
            </div>
            <span className="text-xl font-bold text-slate-900">
              Hulton Bank
            </span>
          </div>
          <Link
            href="/dashboard"
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
          >
            Back to Dashboard
          </Link>
        </div>
      </header>
      <section className="mx-auto max-w-4xl px-6 py-10">
        <div className="mb-8">
          <p className="text-sm font-medium text-blue-600">
            Account Management
          </p>
          <h1 className="mt-1 text-3xl font-bold text-slate-900">
            Account Settings
          </h1>
          <p className="mt-2 text-slate-500">
            Manage your profile, security, and account preferences.
          </p>
        </div>
        <div className="space-y-6">
          {/* Personal Information */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900">
                Personal Information
              </h2>
              {!isEditing && (
                <button
                  onClick={handleEdit}
                  className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Edit
                </button>
              )}
            </div>
            {isEditing ? (
              <div className="mt-6 space-y-5">
                <div>
                  <label className="block text-sm font-medium text-slate-700">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700">
                    Username
                  </label>
                  <input
                    type="text"
                    value={editUsername}
                    onChange={(e) => setEditUsername(e.target.value)}
                    className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700">
                    Email
                  </label>
                  <input
                    type="email"
                    value={editEmail}
                    onChange={(e) => setEditEmail(e.target.value)}
                    className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <button
                    onClick={handleSave}
                    className="rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="rounded-lg border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="mt-6 grid gap-5 md:grid-cols-2">
                <div>
                  <p className="text-sm text-slate-500">Full Name</p>
                  <p className="mt-1 font-semibold text-slate-900">
                    {fullName}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Username</p>
                  <p className="mt-1 font-semibold text-slate-900">
                    {username}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Email</p>
                  <p className="mt-1 font-semibold text-slate-900">
                    {email}
                  </p>
                </div>
              </div>
            )}
            {message && (
              <p className="mt-4 text-sm font-semibold text-green-700">
                {message}
              </p>
            )}
          </div>
          {/* Security */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900">
              Security
            </h2>
            {!isChangingPassword ? (
              <div className="mt-6 flex flex-col gap-4 rounded-xl bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-semibold text-slate-900">
                    Password
                  </p>
                  <p className="mt-1 text-sm text-slate-500">
                    ••••••••••••••••
                  </p>
                </div>
                <button
                  onClick={handleChangePassword}
                  className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Change Password
                </button>
              </div>
            ) : (
              <div className="mt-6 space-y-5">
                <div>
                  <label className="block text-sm font-medium text-slate-700">
                    Current Password
                  </label>
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700">
                    New Password
                  </label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  />
                  <p className="mt-2 text-xs text-slate-500">
                    Password must be at least 8 characters.
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <button
                    onClick={handleSavePassword}
                    className="rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
                  >
                    Change Password
                  </button>
                  <button
                    onClick={handleCancelPassword}
                    className="rounded-lg border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                </div>
                {message && (
                  <p className="text-sm font-semibold text-green-700">
                    {message}
                  </p>
                )}
              </div>
            )}
          </div>
          {/* Preferences */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900">
              Preferences
            </h2>
            <div className="mt-6 space-y-6">
              {/* Email Notifications */}
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="font-semibold text-slate-900">
                    Email Notifications
                  </p>
                  <p className="mt-1 text-sm text-slate-500">
                    Receive updates about your account.
                  </p>
                </div>
                <button
                  type="button"
                  aria-label="Toggle email notifications"
                  aria-pressed={emailNotifications}
                  onClick={toggleEmailNotifications}
                  className={`relative h-6 w-11 flex-shrink-0 rounded-full transition ${
                    emailNotifications
                      ? "bg-blue-600"
                      : "bg-slate-300"
                  }`}
                >
                  <div
                    className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition ${
                      emailNotifications ? "left-6" : "left-1"
                    }`}
                  />
                </button>
              </div>
              {/* Paperless Statements */}
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="font-semibold text-slate-900">
                    Paperless Statements
                  </p>
                  <p className="mt-1 text-sm text-slate-500">
                    Receive statements electronically.
                  </p>
                </div>
                <button
                  type="button"
                  aria-label="Toggle paperless statements"
                  aria-pressed={paperlessStatements}
                  onClick={togglePaperlessStatements}
                  className={`relative h-6 w-11 flex-shrink-0 rounded-full transition ${
                    paperlessStatements
                      ? "bg-blue-600"
                      : "bg-slate-300"
                  }`}
                >
                  <div
                    className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition ${
                      paperlessStatements ? "left-6" : "left-1"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
          {/* Close Account */}
          <div className="rounded-2xl border border-red-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-red-600">
              Close Account
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              If you no longer wish to use your Hulton Bank account, you can
              submit a request to close your account.
            </p>
            {!showCloseConfirmation ? (
              <button
                onClick={() => {
                  setShowCloseConfirmation(true);
                  setMessage("");
                }}
                className="mt-5 rounded-lg border border-red-300 px-5 py-3 text-sm font-semibold text-red-600 hover:bg-red-50"
              >
                Close Account
              </button>
            ) : (
              <div className="mt-5 rounded-xl border border-red-200 bg-red-50 p-5">
                <p className="font-semibold text-red-800">
                  Are you sure you want to close your account?
                </p>
                <p className="mt-2 text-sm text-red-700">
                  This will submit an account closure request for review.
                </p>
                <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                  <button
                    onClick={handleCloseAccount}
                    className="rounded-lg bg-red-600 px-5 py-3 text-sm font-semibold text-white hover:bg-red-700"
                  >
                    Yes, Close Account
                  </button>
                  <button
                    onClick={() => setShowCloseConfirmation(false)}
                    className="rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
            {message && (
              <p className="mt-4 text-sm font-semibold text-green-700">
                {message}
              </p>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}