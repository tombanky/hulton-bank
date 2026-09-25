"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
type Notification = {
  id: number;
  title: string;
  message: string;
  date: string;
  type: "deposit" | "transfer" | "bill" | "security";
  read: boolean;
};
export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  useEffect(() => {
    const saved = localStorage.getItem("hulton_notifications");
    if (saved) {
      try {
        setNotifications(JSON.parse(saved));
      } catch {
        setNotifications([]);
      }
    } else {
      const defaultNotifications: Notification[] = [
        {
          id: 1,
          title: "Direct deposit received",
          message:
            "A deposit of $250,000.00 was added to your Everyday Checking account.",
          date: "Today",
          type: "deposit",
          read: false,
        },
        {
          id: 2,
          title: "Welcome to Hulton Bank",
          message:
            "Your account is ready. You can review your accounts, send money, and manage your payments.",
          date: "Today",
          type: "security",
          read: false,
        },
        {
          id: 3,
          title: "Account information available",
          message:
            "Your checking and savings account details are available from your Accounts page.",
          date: "Yesterday",
          type: "security",
          read: true,
        },
      ];
      setNotifications(defaultNotifications);
      localStorage.setItem(
        "hulton_notifications",
        JSON.stringify(defaultNotifications)
      );
    }
  }, []);
  const unreadCount = notifications.filter(
    (notification) => !notification.read
  ).length;
  const markAsRead = (id: number) => {
    const updated = notifications.map((notification) =>
      notification.id === id
        ? { ...notification, read: true }
        : notification
    );
    setNotifications(updated);
    localStorage.setItem(
      "hulton_notifications",
      JSON.stringify(updated)
    );
  };
  const markAllAsRead = () => {
    const updated = notifications.map((notification) => ({
      ...notification,
      read: true,
    }));
    setNotifications(updated);
    localStorage.setItem(
      "hulton_notifications",
      JSON.stringify(updated)
    );
  };
  const getIcon = (type: Notification["type"]) => {
    if (type === "deposit") return "↑";
    if (type === "transfer") return "→";
    if (type === "bill") return "✓";
    return "!";
  };
  return (
    <main className="min-h-screen bg-slate-100">
      {/* Header */}
      <header className="border-b border-white/20 bg-white/95 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex h-20 items-center justify-between">
            <Link
              href="/dashboard"
              className="flex items-center gap-3"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-lg font-bold text-white shadow-sm">
                H
              </div>
              <span className="text-xl font-bold text-slate-900">
                Hulton Bank
              </span>
            </Link>
            <Link
              href="/dashboard"
              className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Back to Dashboard
            </Link>
          </div>
        </div>
      </header>
      {/* Main */}
      <div className="relative min-h-[calc(100vh-80px)] overflow-hidden">
        <div className="pointer-events-none absolute -left-32 top-20 h-96 w-96 rounded-full bg-blue-200/40 blur-3xl" />
        <div className="pointer-events-none absolute -right-32 top-10 h-[500px] w-[500px] rounded-full bg-indigo-200/40 blur-3xl" />
        <section className="relative mx-auto max-w-4xl px-6 py-10">
          {/* Heading */}
          <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-blue-600">
                Personal Banking
              </p>
              <h1 className="mt-1 text-3xl font-bold text-slate-900">
                Notifications
              </h1>
              <p className="mt-2 text-slate-600">
                Stay up to date with your account activity.
              </p>
            </div>
            {unreadCount > 0 && (
              <button
                type="button"
                onClick={markAllAsRead}
                className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50"
              >
                Mark all as read
              </button>
            )}
          </div>
          {/* Notification Summary */}
          <div className="mb-6 rounded-2xl border border-white/70 bg-white/95 p-5 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Notification Center
                </p>
                <p className="mt-1 text-lg font-bold text-slate-900">
                  {unreadCount} unread
                </p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-xl text-blue-600">
                🔔
              </div>
            </div>
          </div>
          {/* Notifications */}
          <div className="overflow-hidden rounded-3xl border border-white/70 bg-white/95 shadow-xl">
            {notifications.length > 0 ? (
              <div className="divide-y divide-slate-100">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`relative px-6 py-6 transition hover:bg-slate-50 ${
                      !notification.read
                        ? "bg-blue-50/30"
                        : "bg-white"
                    }`}
                  >
                    {!notification.read && (
                      <div className="absolute left-0 top-0 h-full w-1 bg-blue-600" />
                    )}
                    <div className="flex gap-4">
                      {/* Icon */}
                      <div
                        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-lg font-bold ${
                          notification.type === "deposit"
                            ? "bg-green-50 text-green-600"
                            : notification.type === "transfer"
                            ? "bg-blue-50 text-blue-600"
                            : notification.type === "bill"
                            ? "bg-purple-50 text-purple-600"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {getIcon(notification.type)}
                      </div>
                      {/* Content */}
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                          <div>
                            <div className="flex items-center gap-2">
                              <h2 className="font-bold text-slate-900">
                                {notification.title}
                              </h2>
                              {!notification.read && (
                                <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-blue-700">
                                  New
                                </span>
                              )}
                            </div>
                            <p className="mt-2 text-sm leading-6 text-slate-600">
                              {notification.message}
                            </p>
                          </div>
                          <span className="shrink-0 text-xs font-medium text-slate-400">
                            {notification.date}
                          </span>
                        </div>
                        {!notification.read && (
                          <button
                            type="button"
                            onClick={() =>
                              markAsRead(notification.id)
                            }
                            className="mt-4 text-sm font-semibold text-blue-600 hover:text-blue-700"
                          >
                            Mark as read
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="px-6 py-16 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-2xl">
                  🔔
                </div>
                <h2 className="mt-5 text-lg font-bold text-slate-900">
                  You&apos;re all caught up
                </h2>
                <p className="mt-2 text-sm text-slate-500">
                  There are no notifications to display.
                </p>
              </div>
            )}
          </div>
          {/* Bottom Actions */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/dashboard"
              className="rounded-xl bg-blue-600 px-6 py-3 text-center text-sm font-semibold text-white shadow-md hover:bg-blue-700"
            >
              Dashboard
            </Link>
            <Link
              href="/dashboard/transactions"
              className="rounded-xl border border-slate-300 bg-white px-6 py-3 text-center text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              View Transactions
            </Link>
            <Link
              href="/dashboard/settings"
              className="rounded-xl border border-slate-300 bg-white px-6 py-3 text-center text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Settings
            </Link>
          </div>
          {/* Prototype Notice */}
          <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50/80 p-5">
            <p className="text-sm leading-6 text-slate-600">
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}