"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const savedPassword =
      localStorage.getItem("hulton_password") || "aliciamahan83";
    if (username === "aliciamahan" && password === savedPassword) {
      router.push("/dashboard");
      return;
    }
    setError("Incorrect username or password.");
  };
  return (
    <main className="min-h-screen bg-slate-900 px-6 py-10">
      <div className="mx-auto flex min-h-[90vh] max-w-md items-center justify-center">
        <div className="w-full rounded-2xl bg-white p-8 shadow-2xl">
          <div className="mb-8 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-xl font-bold text-white">
              H
            </div>
            <h1 className="mt-4 text-2xl font-bold text-slate-900">
              Hulton Bank
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Sign in to your account
            </p>
          </div>
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-700">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setError("");
                }}
                placeholder="Enter your username"
                className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 outline-none placeholder:text-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              />
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-slate-700">
                  Password
                </label>
                <button
                  type="button"
                  className="text-sm font-medium text-blue-600 hover:text-blue-700"
                >
                  Forgot password?
                </button>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                placeholder="Enter your password"
                className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 outline-none placeholder:text-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              />
            </div>
            {error && (
              <p className="rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                {error}
              </p>
            )}
            <button
              type="submit"
              className="w-full rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              Sign In
            </button>
          </form>
          <div className="mt-6 border-t border-slate-200 pt-6 text-center">
            <p className="text-sm text-slate-500">
              Don't have an account?
            </p>
            <button
              type="button"
              className="mt-2 font-semibold text-blue-600 hover:text-blue-700"
            >
              Open an Account
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}