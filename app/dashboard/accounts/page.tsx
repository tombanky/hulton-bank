"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
export default function AccountsPage() {
  const [checking, setChecking] = useState(250000);
  const [savings, setSavings] = useState(50000);
  useEffect(() => {
    const savedChecking = localStorage.getItem("hulton_checking");
    const savedSavings = localStorage.getItem("hulton_savings");
    if (savedChecking) setChecking(Number(savedChecking));
    if (savedSavings) setSavings(Number(savedSavings));
  }, []);
  const totalBalance = checking + savings;
  return (
    <main className="min-h-screen bg-slate-100 text-slate-900">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <Link href="/dashboard" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-xl font-bold text-white">
              H
            </div>
            <div>
              <div className="text-lg font-bold text-slate-900">
                Hulton Bank
              </div>
              <div className="text-xs text-slate-500">
                Personal Banking
              </div>
            </div>
          </Link>
          <Link
            href="/dashboard"
            className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Back to Dashboard
          </Link>
        </div>
      </header>
      {/* Main */}
      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-blue-600">
            Your accounts
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-slate-950">
            Accounts Overview
          </h1>
          <p className="mt-2 max-w-2xl text-slate-600">
            View your account balances, account information, and available
            banking actions.
          </p>
        </div>
        {/* Total Balance */}
        <div className="mb-8 overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-blue-950 to-blue-700 p-8 text-white shadow-xl">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-medium text-blue-200">
                Total available balance
              </p>
              <p className="mt-2 text-4xl font-bold tracking-tight">
                ${totalBalance.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>
              <p className="mt-3 text-sm text-blue-200">
                Across your checking and savings accounts
              </p>
            </div>
            <Link
              href="/dashboard/send"
              className="w-fit rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-blue-50"
            >
              Transfer Money
            </Link>
          </div>
        </div>
        {/* Account Cards */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Checking */}
          <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-semibold text-blue-600">
                  Checking Account
                </p>
                <h2 className="mt-1 text-2xl font-bold text-slate-950">
                  Everyday Checking
                </h2>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-xl">
                💳
              </div>
            </div>
            <div className="mt-7">
              <p className="text-sm text-slate-500">Available balance</p>
              <p className="mt-1 text-3xl font-bold text-slate-950">
                ${checking.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>
            </div>
            <div className="mt-7 grid gap-4 border-t border-slate-100 pt-6 sm:grid-cols-2">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Account number
                </p>
                <p className="mt-1 font-semibold text-slate-800">
                  ••••••4821
                </p>
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Routing number
                </p>
                <p className="mt-1 font-semibold text-slate-800">
                  314592681
                </p>
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Account type
                </p>
                <p className="mt-1 font-semibold text-slate-800">
                  Checking
                </p>
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Status
                </p>
                <p className="mt-1 font-semibold text-emerald-600">
                  Active
                </p>
              </div>
            </div>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/dashboard/send"
                className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Transfer Money
              </Link>
              <Link
                href="/dashboard/transactions"
                className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                View Transactions
              </Link>
            </div>
          </div>
          {/* Savings */}
          <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-semibold text-indigo-600">
                  Savings Account
                </p>
                <h2 className="mt-1 text-2xl font-bold text-slate-950">
                  Savings
                </h2>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-xl">
                💰
              </div>
            </div>
            <div className="mt-7">
              <p className="text-sm text-slate-500">Available balance</p>
              <p className="mt-1 text-3xl font-bold text-slate-950">
                ${savings.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>
            </div>
            <div className="mt-7 grid gap-4 border-t border-slate-100 pt-6 sm:grid-cols-2">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Account number
                </p>
                <p className="mt-1 font-semibold text-slate-800">
                  ••••••9137
                </p>
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Routing number
                </p>
                <p className="mt-1 font-semibold text-slate-800">
                  728416395
                </p>
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Account type
                </p>
                <p className="mt-1 font-semibold text-slate-800">
                  Savings
                </p>
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Status
                </p>
                <p className="mt-1 font-semibold text-emerald-600">
                  Active
                </p>
              </div>
            </div>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/dashboard/transactions"
                className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                View Transactions
              </Link>
              <Link
                href="/dashboard"
                className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Dashboard
              </Link>
            </div>
          </div>
        </div>
        {/* Information */}
        <div className="mt-8 rounded-2xl border border-blue-100 bg-blue-50 p-5">
          <div className="flex gap-3">
            <div className="text-xl">ℹ️</div>
            <div>
              <h3 className="font-semibold text-blue-950">
                Account information
              </h3>
              <p className="mt-1 text-sm leading-6 text-blue-900">
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}