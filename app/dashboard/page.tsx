"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Transaction = {
  title: string;
  date: string;
  amount: number;
  type: "credit" | "debit";
  description?: string;
};

export default function DashboardPage() {
  const [balance, setBalance] = useState(400000);
  const [checking, setChecking] = useState(350000);
  const [savings, setSavings] = useState(50000);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [unreadNotifications, setUnreadNotifications] = useState(0);
  const [profileOpen, setProfileOpen] = useState(false);

  useEffect(() => {
    const savedBalance = localStorage.getItem("hulton_balance");
    const savedChecking = localStorage.getItem("hulton_checking");
    const savedSavings = localStorage.getItem("hulton_savings");
    const savedTransactions = localStorage.getItem("hulton_transactions");
    const savedNotifications = localStorage.getItem("hulton_notifications");

    if (savedBalance) setBalance(Number(savedBalance));
    if (savedChecking) setChecking(Number(savedChecking));
    if (savedSavings) setSavings(Number(savedSavings));

    if (savedTransactions) {
      try {
        setTransactions(JSON.parse(savedTransactions));
      } catch {
        setTransactions([]);
      }
    } else {
      setTransactions([]);
    }

    if (savedNotifications) {
      try {
        const parsed = JSON.parse(savedNotifications);
        setUnreadNotifications(
          parsed.filter(
            (notification: { read: boolean }) => !notification.read
          ).length
        );
      } catch {
        setUnreadNotifications(0);
      }
    }
  }, []);

  const formatMoney = (amount: number) =>
    amount.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  const totalIncome = transactions
    .filter((transaction) => transaction.type === "credit")
    .reduce((total, transaction) => total + transaction.amount, 0);

  const totalSpent = transactions
    .filter((transaction) => transaction.type === "debit")
    .reduce((total, transaction) => total + transaction.amount, 0);

  const spendingPercentage =
    totalIncome > 0
      ? Math.min((totalSpent / totalIncome) * 100, 100)
      : 0;

  return (
    <main className="min-h-screen bg-slate-100">
      <header className="relative z-[200] border-b border-white/20 bg-white/95 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex h-20 items-center justify-between">
            <Link href="/dashboard" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-lg font-bold text-white shadow-sm">
                H
              </div>
              <span className="text-xl font-bold text-slate-900">
                Hulton Bank
              </span>
            </Link>

            <nav className="hidden items-center gap-7 lg:flex">
              <Link href="/dashboard" className="text-sm font-semibold text-blue-600">
                Dashboard
              </Link>
              <Link href="/dashboard/account-details" className="text-sm font-medium text-slate-600 hover:text-blue-600">
                Accounts
              </Link>
              <Link href="/dashboard/send" className="text-sm font-medium text-slate-600 hover:text-blue-600">
                Transfers
              </Link>
              <Link href="/dashboard/pay-bills" className="text-sm font-medium text-slate-600 hover:text-blue-600">
                Bill Pay
              </Link>
              <Link href="/dashboard/transactions" className="text-sm font-medium text-slate-600 hover:text-blue-600">
                Transactions
              </Link>
            </nav>

            <div className="flex items-center gap-3">
              <Link
                href="/dashboard/notifications"
                aria-label="Notifications"
                className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
              >
                <span className="text-xl">🔔</span>
                {unreadNotifications > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white ring-2 ring-white">
                    {unreadNotifications > 9 ? "9+" : unreadNotifications}
                  </span>
                )}
              </Link>

              <div className="relative z-[100]">
                <button
                  type="button"
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-sm hover:bg-slate-50"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
                    AM
                  </div>
                  <div className="hidden text-left sm:block">
                    <p className="text-sm font-semibold text-slate-900">
                      Alicia Mahan
                    </p>
                    <p className="text-xs text-slate-500">aliciamahan</p>
                  </div>
                  <span className="hidden text-slate-400 sm:block">▾</span>
                </button>

                {profileOpen && (
                  <div className="absolute right-0 z-50 mt-2 w-64 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
                    <div className="border-b border-slate-100 px-4 py-4">
                      <p className="text-sm font-semibold text-slate-900">
                        Alicia Mahan
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        aliciamahan
                      </p>
                    </div>
                    <div className="p-2">
                      <Link
                        href="/dashboard/settings"
                        onClick={() => setProfileOpen(false)}
                        className="block rounded-xl px-3 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50"
                      >
                        Profile &amp; Settings
                      </Link>
                      <Link
                        href="/dashboard/settings"
                        onClick={() => setProfileOpen(false)}
                        className="block rounded-xl px-3 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50"
                      >
                        Account Details
                      </Link>
                      <Link
                        href="/dashboard/transactions"
                        onClick={() => setProfileOpen(false)}
                        className="block rounded-xl px-3 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50"
                      >
                        Transaction History
                      </Link>
                      <Link
                        href="/dashboard/notifications"
                        onClick={() => setProfileOpen(false)}
                        className="flex items-center justify-between rounded-xl px-3 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50"
                      >
                        <span>Notifications</span>
                        {unreadNotifications > 0 && (
                          <span className="rounded-full bg-red-100 px-2 py-1 text-[10px] font-bold text-red-600">
                            {unreadNotifications} new
                          </span>
                        )}
                      </Link>
                      <button
                        type="button"
                        onClick={() => {
                          localStorage.removeItem("hulton_session");
                          window.location.href = "/login";
                        }}
                        className="mt-1 block w-full rounded-xl px-3 py-3 text-left text-sm font-medium text-red-600 hover:bg-red-50"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <nav className="flex gap-5 overflow-x-auto pb-4 lg:hidden">
            <Link href="/dashboard" className="whitespace-nowrap text-sm font-semibold text-blue-600">
              Dashboard
            </Link>
            <Link href="/dashboard/account-details" className="whitespace-nowrap text-sm font-medium text-slate-600">
              Accounts
            </Link>
            <Link href="/dashboard/send" className="whitespace-nowrap text-sm font-medium text-slate-600">
              Transfers
            </Link>
            <Link href="/dashboard/pay-bills" className="whitespace-nowrap text-sm font-medium text-slate-600">
              Bill Pay
            </Link>
            <Link href="/dashboard/transactions" className="whitespace-nowrap text-sm font-medium text-slate-600">
              Transactions
            </Link>
            <Link href="/dashboard/settings" className="whitespace-nowrap text-sm font-medium text-slate-600">
              Settings
            </Link>
          </nav>
        </div>
      </header>

      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute -left-32 top-20 h-96 w-96 rounded-full bg-blue-200/40 blur-3xl" />
        <div className="pointer-events-none absolute -right-32 top-10 h-[500px] w-[500px] rounded-full bg-indigo-200/40 blur-3xl" />

        <section className="relative mx-auto max-w-7xl px-6 py-10">
          <div className="mb-8">
            <p className="text-sm font-semibold text-blue-600">
              Personal Banking
            </p>
            <h1 className="mt-1 text-3xl font-bold text-slate-900">
              Welcome back, Alicia
            </h1>
            <p className="mt-2 text-slate-600">
              Here&apos;s your account overview.
            </p>
          </div>

          <div className="rounded-3xl bg-slate-900 p-7 text-white shadow-xl">
            <p className="text-sm font-medium text-slate-300">
              Total Available Balance
            </p>
            <p className="mt-3 text-4xl font-bold">
              ${formatMoney(balance)}
            </p>
            <p className="mt-2 text-sm text-slate-400">
              Across your Hulton Bank accounts
            </p>
          </div>

          <div className="mt-7 grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl border border-white/70 bg-white/95 p-7 shadow-lg backdrop-blur-sm">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-semibold text-blue-600">Checking</p>
                  <h2 className="mt-1 text-xl font-bold text-slate-900">
                    Everyday Checking
                  </h2>
                </div>
                <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                  Active
                </span>
              </div>
              <p className="mt-7 text-3xl font-bold text-slate-900">
                ${formatMoney(checking)}
              </p>
              <p className="mt-2 text-sm text-slate-500">•••• 4821</p>
            </div>

            <div className="rounded-3xl border border-white/70 bg-white/95 p-7 shadow-lg backdrop-blur-sm">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-semibold text-indigo-600">Savings</p>
                  <h2 className="mt-1 text-xl font-bold text-slate-900">
                    Savings
                  </h2>
                </div>
                <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                  Active
                </span>
              </div>
              <p className="mt-7 text-3xl font-bold text-slate-900">
                ${formatMoney(savings)}
              </p>
              <p className="mt-2 text-sm text-slate-500">•••• 9137</p>
            </div>
          </div>

          <div className="mt-7">
            <div className="mb-4">
              <h2 className="text-xl font-bold text-slate-900">
                Financial Overview
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                A quick look at your recent activity.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              <div className="rounded-2xl border border-white/70 bg-white/95 p-6 shadow-lg">
                <p className="text-sm font-medium text-slate-500">Income</p>
                <p className="mt-3 text-2xl font-bold text-green-600">
                  +${formatMoney(totalIncome)}
                </p>
                <p className="mt-1 text-xs text-slate-400">Money received</p>
              </div>
              <div className="rounded-2xl border border-white/70 bg-white/95 p-6 shadow-lg">
                <p className="text-sm font-medium text-slate-500">Spending</p>
                <p className="mt-3 text-2xl font-bold text-red-600">
                  -${formatMoney(totalSpent)}
                </p>
                <p className="mt-1 text-xs text-slate-400">Money spent</p>
              </div>
              <div className="rounded-2xl border border-white/70 bg-white/95 p-6 shadow-lg">
                <p className="text-sm font-medium text-slate-500">
                  Savings Balance
                </p>
                <p className="mt-3 text-2xl font-bold text-slate-900">
                  ${formatMoney(savings)}
                </p>
                <p className="mt-1 text-xs text-slate-400">Current savings</p>
              </div>
            </div>

            <div className="mt-5 rounded-2xl border border-white/70 bg-white/95 p-6 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-slate-900">
                    Spending Activity
                  </p>
                  <p className="mt-1 text-sm text-slate-500">
                    Spending compared with recorded income
                  </p>
                </div>
                <span className="text-sm font-bold text-slate-700">
                  {spendingPercentage.toFixed(0)}%
                </span>
              </div>
              <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-blue-600 transition-all"
                  style={{ width: `${spendingPercentage}%` }}
                />
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-bold text-slate-900">Quick Actions</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              <Link href="/dashboard/send" className="rounded-2xl bg-blue-600 p-5 text-white shadow-lg transition hover:bg-blue-700">
                <p className="text-lg font-bold">Send Money</p>
                <p className="mt-1 text-sm text-blue-100">
                  Send money to a recipient
                </p>
              </Link>
              <Link href="/dashboard/send" className="rounded-2xl border border-white/70 bg-white/95 p-5 shadow-lg transition hover:bg-slate-50">
                <p className="text-lg font-bold text-slate-900">
                  Transfer Money
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  Move money between accounts
                </p>
              </Link>
              <Link href="/dashboard/pay-bills" className="rounded-2xl border border-white/70 bg-white/95 p-5 shadow-lg transition hover:bg-slate-50">
                <p className="text-lg font-bold text-slate-900">Pay a Bill</p>
                <p className="mt-1 text-sm text-slate-500">
                  Pay your bills and expenses
                </p>
              </Link>
            </div>
          </div>

          <div className="mt-8 rounded-3xl border border-white/70 bg-white/95 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Recent Transactions
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Your latest account activity
                </p>
              </div>
              <Link href="/dashboard/transactions" className="text-sm font-semibold text-blue-600 hover:text-blue-700">
                View All
              </Link>
            </div>

            <div className="divide-y divide-slate-100">
              {transactions.slice(0, 5).map((transaction, index) => (
                <div
                  key={`${transaction.title}-${index}`}
                  className="flex items-center justify-between px-6 py-5"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`flex h-11 w-11 items-center justify-center rounded-xl text-lg font-bold ${
                        transaction.type === "credit"
                          ? "bg-green-50 text-green-600"
                          : "bg-red-50 text-red-600"
                      }`}
                    >
                      {transaction.type === "credit" ? "↑" : "↓"}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">
                        {transaction.title}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        {transaction.date}
                      </p>
                    </div>
                  </div>
                  <p
                    className={`font-bold ${
                      transaction.type === "credit"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {transaction.type === "credit" ? "+" : "-"}$
                    {formatMoney(transaction.amount)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}