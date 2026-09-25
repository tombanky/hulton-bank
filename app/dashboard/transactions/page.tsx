"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
type Transaction = {
  title: string;
  date: string;
  amount: number;
  type: "credit" | "debit";
  description?: string;
};
export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "income" | "spending">(
    "all"
  );
  useEffect(() => {
    const savedTransactions = localStorage.getItem(
      "hulton_transactions"
    );
    if (savedTransactions) {
      try {
        setTransactions(JSON.parse(savedTransactions));
      } catch {
        setTransactions([]);
      }
    } else {
      setTransactions([
        {
          title: "Direct Deposit",
          date: "Today",
          amount: 250000,
          type: "credit",
          description: "Deposit",
        },
      ]);
    }
  }, []);
  const formatMoney = (amount: number) => {
    return amount.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };
  const totalIncome = transactions
    .filter((transaction) => transaction.type === "credit")
    .reduce((total, transaction) => total + transaction.amount, 0);
  const totalSpending = transactions
    .filter((transaction) => transaction.type === "debit")
    .reduce((total, transaction) => total + transaction.amount, 0);
  const filteredTransactions = useMemo(() => {
    return transactions.filter((transaction) => {
      const matchesSearch =
        transaction.title
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        transaction.description
          ?.toLowerCase()
          .includes(search.toLowerCase());
      const matchesFilter =
        filter === "all" ||
        (filter === "income" && transaction.type === "credit") ||
        (filter === "spending" && transaction.type === "debit");
      return matchesSearch && matchesFilter;
    });
  }, [transactions, search, filter]);
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
        <section className="relative mx-auto max-w-6xl px-6 py-10">
          {/* Heading */}
          <div className="mb-8">
            <p className="text-sm font-semibold text-blue-600">
              Personal Banking
            </p>
            <h1 className="mt-1 text-3xl font-bold text-slate-900">
              Transaction History
            </h1>
            <p className="mt-2 text-slate-600">
              Review your account activity and recent transactions.
            </p>
          </div>
          {/* Summary Cards */}
          <div className="grid gap-5 md:grid-cols-3">
            <div className="rounded-2xl border border-white/70 bg-white/95 p-6 shadow-lg">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-slate-500">
                  Total Transactions
                </p>
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  ≡
                </div>
              </div>
              <p className="mt-4 text-2xl font-bold text-slate-900">
                {transactions.length}
              </p>
              <p className="mt-1 text-xs text-slate-500">
                Recorded activity
              </p>
            </div>
            <div className="rounded-2xl border border-white/70 bg-white/95 p-6 shadow-lg">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-slate-500">
                  Total Income
                </p>
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-green-50 text-green-600">
                  ↑
                </div>
              </div>
              <p className="mt-4 text-2xl font-bold text-green-600">
                +${formatMoney(totalIncome)}
              </p>
              <p className="mt-1 text-xs text-slate-500">
                Money received
              </p>
            </div>
            <div className="rounded-2xl border border-white/70 bg-white/95 p-6 shadow-lg">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-slate-500">
                  Total Spending
                </p>
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-50 text-red-600">
                  ↓
                </div>
              </div>
              <p className="mt-4 text-2xl font-bold text-red-600">
                -${formatMoney(totalSpending)}
              </p>
              <p className="mt-1 text-xs text-slate-500">
                Money spent
              </p>
            </div>
          </div>
          {/* Controls */}
          <div className="mt-8 rounded-2xl border border-white/70 bg-white/95 p-5 shadow-lg">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              {/* Search */}
              <div className="relative w-full lg:max-w-md">
                <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                  ⌕
                </span>
                <input
                  type="text"
                  value={search}
                  onChange={(event) =>
                    setSearch(event.target.value)
                  }
                  placeholder="Search transactions..."
                  className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-11 pr-4 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>
              {/* Filters */}
              <div className="flex rounded-xl bg-slate-100 p-1">
                <button
                  type="button"
                  onClick={() => setFilter("all")}
                  className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                    filter === "all"
                      ? "bg-white text-blue-600 shadow-sm"
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  All
                </button>
                <button
                  type="button"
                  onClick={() => setFilter("income")}
                  className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                    filter === "income"
                      ? "bg-white text-green-600 shadow-sm"
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  Income
                </button>
                <button
                  type="button"
                  onClick={() => setFilter("spending")}
                  className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                    filter === "spending"
                      ? "bg-white text-red-600 shadow-sm"
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  Spending
                </button>
              </div>
            </div>
          </div>
          {/* Transactions */}
          <div className="mt-6 overflow-hidden rounded-3xl border border-white/70 bg-white/95 shadow-xl">
            <div className="border-b border-slate-100 px-6 py-5">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    All Transactions
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    {filteredTransactions.length} transaction
                    {filteredTransactions.length === 1
                      ? ""
                      : "s"} displayed
                  </p>
                </div>
              </div>
            </div>
            {filteredTransactions.length > 0 ? (
              <div className="divide-y divide-slate-100">
                {filteredTransactions.map(
                  (transaction, index) => {
                    const isCredit =
                      transaction.type === "credit";
                    return (
                      <div
                        key={`${transaction.title}-${transaction.date}-${index}`}
                        className="flex flex-col gap-4 px-6 py-5 transition hover:bg-slate-50 sm:flex-row sm:items-center sm:justify-between"
                      >
                        <div className="flex items-center gap-4">
                          {/* Icon */}
                          <div
                            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-lg font-bold ${
                              isCredit
                                ? "bg-green-50 text-green-600"
                                : "bg-red-50 text-red-600"
                            }`}
                          >
                            {isCredit ? "↑" : "↓"}
                          </div>
                          {/* Details */}
                          <div>
                            <p className="font-semibold text-slate-900">
                              {transaction.title}
                            </p>
                            <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                              <span>
                                {transaction.date}
                              </span>
                              {transaction.description && (
                                <>
                                  <span>•</span>
                                  <span>
                                    {transaction.description}
                                  </span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                        {/* Amount */}
                        <div className="sm:text-right">
                          <p
                            className={`text-lg font-bold ${
                              isCredit
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          >
                            {isCredit ? "+" : "-"}$
                            {formatMoney(transaction.amount)}
                          </p>
                          <p className="mt-1 text-xs font-medium text-slate-400">
                            {isCredit ? "Credit" : "Debit"}
                          </p>
                        </div>
                      </div>
                    );
                  }
                )}
              </div>
            ) : (
              <div className="px-6 py-16 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-2xl text-slate-400">
                  ≡
                </div>
                <h3 className="mt-5 text-lg font-bold text-slate-900">
                  No transactions found
                </h3>
                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                  Try changing your search or filter to see
                  other account activity.
                </p>
              </div>
            )}
          </div>
          {/* Bottom Actions */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/dashboard/send"
              className="rounded-xl bg-blue-600 px-6 py-3 text-center text-sm font-semibold text-white shadow-md hover:bg-blue-700"
            >
              Send Money
            </Link>
            <Link
              href="/dashboard/pay-bills"
              className="rounded-xl border border-slate-300 bg-white px-6 py-3 text-center text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Pay a Bill
            </Link>
            <Link
              href="/dashboard"
              className="rounded-xl border border-slate-300 bg-white px-6 py-3 text-center text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Dashboard
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