"use client";
import { FormEvent, useState } from "react";
import Link from "next/link";
type Notification = {
  id: number;
  title: string;
  message: string;
  date: string;
  type: "deposit" | "transfer" | "bill" | "security";
  read: boolean;
};
const billers = [
  "Electric Company",
  "Water & Utilities",
  "Internet Service",
  "Mobile Phone",
  "Cable TV",
  "Insurance",
  "Mortgage",
  "Rent",
  "Credit Card",
  "Other",
];
export default function PayBillsPage() {
  const [biller, setBiller] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const formatMoney = (value: number) =>
    value.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("");
    setIsSuccess(false);
    const billAmount = Number(amount);
    if (!biller) {
      setMessage("Please select a biller.");
      return;
    }
    if (!accountNumber.trim()) {
      setMessage("Please enter the biller account number.");
      return;
    }
    if (!amount || billAmount <= 0) {
      setMessage("Please enter a valid amount.");
      return;
    }
    const currentBalance = Number(
      localStorage.getItem("hulton_balance") || "300000"
    );
    const currentChecking = Number(
      localStorage.getItem("hulton_checking") || "250000"
    );
    const currentSavings = Number(
      localStorage.getItem("hulton_savings") || "50000"
    );
    if (billAmount > currentChecking) {
      setMessage(
        "This payment exceeds your available checking balance."
      );
      return;
    }
    const newBalance = currentBalance - billAmount;
    const newChecking = currentChecking - billAmount;
    const savedTransactions =
      localStorage.getItem("hulton_transactions");
    let transactions = [];
    if (savedTransactions) {
      try {
        transactions = JSON.parse(savedTransactions);
      } catch {
        transactions = [];
      }
    }
    const newTransaction = {
      title: `Bill Payment - ${biller}`,
      date: "Today",
      amount: billAmount,
      type: "debit",
      description:
        description.trim() || `Payment to ${biller}`,
    };
    const updatedTransactions = [
      newTransaction,
      ...transactions,
    ];
    localStorage.setItem(
      "hulton_balance",
      newBalance.toString()
    );
    localStorage.setItem(
      "hulton_checking",
      newChecking.toString()
    );
    localStorage.setItem(
      "hulton_savings",
      currentSavings.toString()
    );
    localStorage.setItem(
      "hulton_transactions",
      JSON.stringify(updatedTransactions)
    );
    /* Create notification */
    const savedNotifications = localStorage.getItem(
      "hulton_notifications"
    );
    let notifications: Notification[] = [];
    if (savedNotifications) {
      try {
        notifications = JSON.parse(savedNotifications);
      } catch {
        notifications = [];
      }
    }
    const newNotification: Notification = {
      id: Date.now(),
      title: "Bill payment submitted",
      message: `A bill payment of $${formatMoney(
        billAmount
      )} to ${biller} was submitted.`,
      date: "Just now",
      type: "bill",
      read: false,
    };
    const updatedNotifications = [
      newNotification,
      ...notifications,
    ];
    localStorage.setItem(
      "hulton_notifications",
      JSON.stringify(updatedNotifications)
    );
    setIsSuccess(true);
    setMessage(
      `Bill payment of $${formatMoney(
        billAmount
      )} was submitted successfully.`
    );
    setBiller("");
    setAccountNumber("");
    setAmount("");
    setDescription("");
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
          <div className="mb-8">
            <p className="text-sm font-semibold text-blue-600">
              Personal Banking
            </p>
            <h1 className="mt-1 text-3xl font-bold text-slate-900">
              Pay a Bill
            </h1>
            <p className="mt-2 text-slate-600">
              Manage a bill payment from your checking account.
            </p>
          </div>
          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="rounded-3xl border border-white/70 bg-white/95 p-6 shadow-xl md:p-8"
          >
            <div className="space-y-6">
              {/* Biller */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Biller
                </label>
                <select
                  value={biller}
                  onChange={(event) =>
                    setBiller(event.target.value)
                  }
                  className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                >
                  <option value="">
                    Select biller
                  </option>
                  {billers.map((billerName) => (
                    <option
                      key={billerName}
                      value={billerName}
                    >
                      {billerName}
                    </option>
                  ))}
                </select>
              </div>
              {/* Account Number */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Biller Account Number
                </label>
                <input
                  type="text"
                  value={accountNumber}
                  onChange={(event) =>
                    setAccountNumber(event.target.value)
                  }
                  placeholder="Enter biller account number"
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>
              {/* Amount */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Amount
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 font-semibold text-slate-500">
                    $
                  </span>
                  <input
                    type="number"
                    min="0.01"
                    step="0.01"
                    value={amount}
                    onChange={(event) =>
                      setAmount(event.target.value)
                    }
                    placeholder="0.00"
                    className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-9 pr-4 text-slate-900 outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              </div>
              {/* Description */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Description
                  <span className="ml-1 font-normal text-slate-400">
                    (optional)
                  </span>
                </label>
                <textarea
                  value={description}
                  onChange={(event) =>
                    setDescription(event.target.value)
                  }
                  placeholder="Add a note"
                  rows={3}
                  className="w-full resize-none rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>
              {/* Message */}
              {message && (
                <div
                  className={`rounded-xl px-4 py-3 text-sm font-medium ${
                    isSuccess
                      ? "border border-green-200 bg-green-50 text-green-700"
                      : "border border-red-200 bg-red-50 text-red-700"
                  }`}
                >
                  {message}
                </div>
              )}
              {/* Submit */}
              <button
                type="submit"
                className="w-full rounded-xl bg-blue-600 px-6 py-4 font-semibold text-white shadow-md transition hover:bg-blue-700"
              >
                Pay Bill
              </button>
            </div>
          </form>
          {/* Actions */}
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/dashboard/transactions"
              className="rounded-xl border border-slate-300 bg-white px-6 py-3 text-center text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              View Transactions
            </Link>
            <Link
              href="/dashboard/notifications"
              className="rounded-xl border border-slate-300 bg-white px-6 py-3 text-center text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              View Notifications
            </Link>
            <Link
              href="/dashboard"
              className="rounded-xl border border-slate-300 bg-white px-6 py-3 text-center text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Dashboard
            </Link>
          </div>
          {/* Notice */}
          <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50/80 p-5">
            <p className="text-sm leading-6 text-slate-600">
              Please review the biller and payment amount before
              submitting.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}