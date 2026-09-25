"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
export default function AccountDetailsPage() {
  const [checkingBalance, setCheckingBalance] = useState(250000);
  const [savingsBalance, setSavingsBalance] = useState(50000);
  const [copied, setCopied] = useState("");
  useEffect(() => {
    const savedChecking = localStorage.getItem("hulton_checking");
    const savedSavings = localStorage.getItem("hulton_savings");
    if (savedChecking) {
      setCheckingBalance(Number(savedChecking));
    }
    if (savedSavings) {
      setSavingsBalance(Number(savedSavings));
    }
  }, []);
  const formatMoney = (amount: number) => {
    return amount.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };
  const copyToClipboard = async (
    value: string,
    label: string
  ) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(label);
      setTimeout(() => {
        setCopied("");
      }, 2000);
    } catch {
      setCopied("");
    }
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
      {/* Background */}
      <div className="relative min-h-[calc(100vh-80px)] overflow-hidden">
        <div className="pointer-events-none absolute -left-32 top-20 h-96 w-96 rounded-full bg-blue-200/40 blur-3xl" />
        <div className="pointer-events-none absolute -right-32 top-10 h-[500px] w-[500px] rounded-full bg-indigo-200/40 blur-3xl" />
        {/* Main */}
        <section className="relative mx-auto max-w-5xl px-6 py-10">
          {/* Heading */}
          <div className="mb-8">
            <p className="text-sm font-semibold text-blue-600">
              Personal Banking
            </p>
            <h1 className="mt-1 text-3xl font-bold text-slate-900">
              Account Details
            </h1>
            <p className="mt-2 text-slate-600">
              View your account information and balances.
            </p>
          </div>
          {/* Checking Account */}
          <div className="overflow-hidden rounded-3xl border border-white/70 bg-white/95 shadow-xl backdrop-blur-sm">
            <div className="bg-slate-900 px-6 py-7 text-white md:px-8">
              <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
                <div>
                  <p className="text-sm text-slate-300">
                    Everyday Checking
                  </p>
                  <h2 className="mt-2 text-3xl font-bold">
                    ${formatMoney(checkingBalance)}
                  </h2>
                  <p className="mt-2 text-sm text-slate-400">
                    Available balance
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-green-500/15 px-3 py-1.5 text-xs font-semibold text-green-300">
                    Active
                  </span>
                  <span className="rounded-xl bg-white/10 px-3 py-2 text-sm font-semibold text-slate-200">
                    •••• 4821
                  </span>
                </div>
              </div>
            </div>
            <div className="p-6 md:p-8">
              <div className="grid gap-6 md:grid-cols-2">
                {/* Account Number */}
                <div>
                  <p className="text-sm text-slate-500">
                    Account Number
                  </p>
                  <div className="mt-2 flex items-center justify-between gap-3 rounded-xl bg-slate-50 px-4 py-3">
                    <span className="font-semibold tracking-wide text-slate-900">
                      ••••••4821
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        copyToClipboard(
                          "4821",
                          "checking-account"
                        )
                      }
                      className="text-sm font-semibold text-blue-600 hover:text-blue-700"
                    >
                      {copied === "checking-account"
                        ? "Copied"
                        : "Copy"}
                    </button>
                  </div>
                </div>
                {/* Routing Number */}
                <div>
                  <p className="text-sm text-slate-500">
                    Routing Number
                  </p>
                  <div className="mt-2 flex items-center justify-between gap-3 rounded-xl bg-slate-50 px-4 py-3">
                    <span className="font-semibold tracking-wide text-slate-900">
                      314592681
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        copyToClipboard(
                          "314592681",
                          "checking-routing"
                        )
                      }
                      className="text-sm font-semibold text-blue-600 hover:text-blue-700"
                    >
                      {copied === "checking-routing"
                        ? "Copied"
                        : "Copy"}
                    </button>
                  </div>
                </div>
                {/* Account Holder */}
                <div>
                  <p className="text-sm text-slate-500">
                    Account Holder
                  </p>
                  <p className="mt-2 font-semibold text-slate-900">
                    Alicia Mahan
                  </p>
                </div>
                {/* Account Type */}
                <div>
                  <p className="text-sm text-slate-500">
                    Account Type
                  </p>
                  <p className="mt-2 font-semibold text-slate-900">
                    Checking
                  </p>
                </div>
              </div>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/dashboard/send"
                  className="rounded-xl bg-blue-600 px-5 py-3 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
                >
                  Transfer Money
                </Link>
                <Link
                  href="/dashboard/transactions"
                  className="rounded-xl border border-slate-300 bg-white px-5 py-3 text-center text-sm font-semibold text-slate-700 hover:bg-slate-50"
                >
                  View Transactions
                </Link>
              </div>
            </div>
          </div>
          {/* Savings Account */}
          <div className="mt-6 overflow-hidden rounded-3xl border border-white/70 bg-white/95 shadow-xl backdrop-blur-sm">
            <div className="bg-slate-900 px-6 py-7 text-white md:px-8">
              <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
                <div>
                  <p className="text-sm text-slate-300">
                    Savings
                  </p>
                  <h2 className="mt-2 text-3xl font-bold">
                    ${formatMoney(savingsBalance)}
                  </h2>
                  <p className="mt-2 text-sm text-slate-400">
                    Available balance
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-green-500/15 px-3 py-1.5 text-xs font-semibold text-green-300">
                    Active
                  </span>
                  <span className="rounded-xl bg-white/10 px-3 py-2 text-sm font-semibold text-slate-200">
                    •••• 9137
                  </span>
                </div>
              </div>
            </div>
            <div className="p-6 md:p-8">
              <div className="grid gap-6 md:grid-cols-2">
                {/* Account Number */}
                <div>
                  <p className="text-sm text-slate-500">
                    Account Number
                  </p>
                  <div className="mt-2 flex items-center justify-between gap-3 rounded-xl bg-slate-50 px-4 py-3">
                    <span className="font-semibold tracking-wide text-slate-900">
                      ••••••9137
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        copyToClipboard(
                          "9137",
                          "savings-account"
                        )
                      }
                      className="text-sm font-semibold text-blue-600 hover:text-blue-700"
                    >
                      {copied === "savings-account"
                        ? "Copied"
                        : "Copy"}
                    </button>
                  </div>
                </div>
                {/* Routing Number */}
                <div>
                  <p className="text-sm text-slate-500">
                    Routing Number
                  </p>
                  <div className="mt-2 flex items-center justify-between gap-3 rounded-xl bg-slate-50 px-4 py-3">
                    <span className="font-semibold tracking-wide text-slate-900">
                      728416395
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        copyToClipboard(
                          "728416395",
                          "savings-routing"
                        )
                      }
                      className="text-sm font-semibold text-blue-600 hover:text-blue-700"
                    >
                      {copied === "savings-routing"
                        ? "Copied"
                        : "Copy"}
                    </button>
                  </div>
                </div>
                {/* Account Holder */}
                <div>
                  <p className="text-sm text-slate-500">
                    Account Holder
                  </p>
                  <p className="mt-2 font-semibold text-slate-900">
                    Alicia Mahan
                  </p>
                </div>
                {/* Account Type */}
                <div>
                  <p className="text-sm text-slate-500">
                    Account Type
                  </p>
                  <p className="mt-2 font-semibold text-slate-900">
                    Savings
                  </p>
                </div>
              </div>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/dashboard/transactions"
                  className="rounded-xl bg-blue-600 px-5 py-3 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
                >
                  View Transactions
                </Link>
                <Link
                  href="/dashboard"
                  className="rounded-xl border border-slate-300 bg-white px-5 py-3 text-center text-sm font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Back to Dashboard
                </Link>
              </div>
            </div>
          </div>
          {/* Information Notice */}
          <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50/80 p-5">
            <div className="flex gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-600">
                i
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">
                  Account Information
                </h3>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  Keep your account information private and secure.
                  Account numbers are partially masked for your
                  protection.
                </p>
                <p className="mt-2 text-xs leading-5 text-slate-500">
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}