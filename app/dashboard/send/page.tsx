"use client";
import { FormEvent, useState } from "react";
import Link from "next/link";
type TransferMethod = "bank" | "zelle";
type Notification = {
  id: number;
  title: string;
  message: string;
  date: string;
  type: "deposit" | "transfer" | "bill" | "security";
  read: boolean;
};
const banks = [
  "Hulton Bank",
  "Navy Federal Credit Union",
  "JPMorgan Chase Bank",
  "Bank of America",
  "Wells Fargo Bank",
  "Citibank",
  "U.S. Bank",
  "PNC Bank",
  "Truist Bank",
  "Capital One",
  "TD Bank",
  "BMO Bank",
  "Fifth Third Bank",
  "Citizens Bank",
  "KeyBank",
  "Huntington National Bank",
  "Regions Bank",
  "M&T Bank",
  "Santander Bank",
  "Discover Bank",
  "Ally Bank",
  "American Express National Bank",
  "Frost Bank",
  "Comerica Bank",
  "Zions Bank",
  "First Citizens Bank",
  "First Horizon Bank",
  "Webster Bank",
  "Old National Bank",
  "Valley Bank",
  "East West Bank",
  "CIBC Bank USA",
  "Synovus Bank",
  "Popular Bank",
  "Banc of California",
  "Umpqua Bank",
  "First National Bank of Pennsylvania",
  "Arvest Bank",
  "Associated Bank",
  "BOK Financial",
  "Commerce Bank",
  "Fulton Bank",
  "Hancock Whitney Bank",
  "Cadence Bank",
  "SouthState Bank",
  "United Bank",
  "UMB Bank",
  "FirstBank",
  "Flagstar Bank",
  "Berkshire Bank",
  "WaFd Bank",
  "Renasant Bank",
  "Trustmark National Bank",
  "Cathay Bank",
];
export default function SendMoneyPage() {
  const [method, setMethod] =
    useState<TransferMethod>("bank");
  const [recipient, setRecipient] = useState("");
  const [bank, setBank] = useState("");
  const [routingNumber, setRoutingNumber] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountType, setAccountType] = useState("");
  const [zelleContact, setZelleContact] = useState("");
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
    const transferAmount = Number(amount);
    if (!recipient.trim()) {
      setMessage("Please enter the recipient name.");
      return;
    }
    if (!amount || transferAmount <= 0) {
      setMessage("Please enter a valid amount.");
      return;
    }
    if (method === "bank") {
      if (!bank) {
        setMessage("Please select the recipient's bank.");
        return;
      }
      if (!/^\d{9}$/.test(routingNumber)) {
        setMessage(
          "Routing number must contain exactly 9 digits."
        );
        return;
      }
      if (!/^\d{10}$/.test(accountNumber)) {
        setMessage(
          "Account number must contain exactly 10 digits."
        );
        return;
      }
      if (!accountType) {
        setMessage("Please select the account type.");
        return;
      }
    }
    if (method === "zelle" && !zelleContact.trim()) {
      setMessage(
        "Please enter the recipient's Zelle email or mobile number."
      );
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
    if (transferAmount > currentChecking) {
      setMessage(
        "This payment exceeds your available checking balance."
      );
      return;
    }
    const newBalance = currentBalance - transferAmount;
    const newChecking = currentChecking - transferAmount;
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
    const transferTitle =
      method === "zelle"
        ? `Zelle to ${recipient}`
        : `Transfer to ${recipient}`;
    const newTransaction = {
      title: transferTitle,
      date: "Today",
      amount: transferAmount,
      type: "debit",
      description:
        description.trim() ||
        (method === "zelle"
          ? "Zelle payment"
          : `Bank transfer to ${bank}`),
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
      title:
        method === "zelle"
          ? "Zelle payment sent"
          : "Transfer submitted",
      message:
        method === "zelle"
          ? `A Zelle payment of $${formatMoney(
              transferAmount
            )} was sent to ${recipient}.`
          : `A transfer of $${formatMoney(
              transferAmount
            )} was submitted to ${recipient}.`,
      date: "Just now",
      type: "transfer",
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
      method === "zelle"
        ? `Zelle payment of $${formatMoney(
            transferAmount
          )} was submitted successfully.`
        : `Transfer of $${formatMoney(
            transferAmount
          )} was submitted successfully.`
    );
    setRecipient("");
    setBank("");
    setRoutingNumber("");
    setAccountNumber("");
    setAccountType("");
    setZelleContact("");
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
              Send Money
            </h1>
            <p className="mt-2 text-slate-600">
              Send money securely from your account.
            </p>
          </div>
          {/* Method Selector */}
          <div className="mb-6 rounded-2xl border border-white/70 bg-white/95 p-2 shadow-lg">
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => {
                  setMethod("bank");
                  setMessage("");
                  setIsSuccess(false);
                }}
                className={`rounded-xl px-4 py-3 text-sm font-semibold transition ${
                  method === "bank"
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                Bank Transfer
              </button>
              <button
                type="button"
                onClick={() => {
                  setMethod("zelle");
                  setMessage("");
                  setIsSuccess(false);
                }}
                className={`rounded-xl px-4 py-3 text-sm font-semibold transition ${
                  method === "zelle"
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                Zelle
              </button>
            </div>
          </div>
          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="rounded-3xl border border-white/70 bg-white/95 p-6 shadow-xl md:p-8"
          >
            <div className="space-y-6">
              {/* Recipient */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Recipient Name
                </label>
                <input
                  type="text"
                  value={recipient}
                  onChange={(event) =>
                    setRecipient(event.target.value)
                  }
                  placeholder="Enter recipient name"
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>
              {/* Bank Transfer Fields */}
              {method === "bank" && (
                <>
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Recipient&apos;s Bank
                    </label>
                    <select
                      value={bank}
                      onChange={(event) =>
                        setBank(event.target.value)
                      }
                      className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    >
                      <option value="">
                        Select recipient&apos;s bank
                      </option>
                      {banks.map((bankName) => (
                        <option
                          key={bankName}
                          value={bankName}
                        >
                          {bankName}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="grid gap-5 md:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-700">
                        Routing Number
                      </label>
                      <input
                        type="text"
                        inputMode="numeric"
                        maxLength={9}
                        value={routingNumber}
                        onChange={(event) =>
                          setRoutingNumber(
                            event.target.value.replace(
                              /\D/g,
                              ""
                            )
                          )
                        }
                        placeholder="9-digit routing number"
                        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-700">
                        Account Number
                      </label>
                      <input
                        type="text"
                        inputMode="numeric"
                        maxLength={10}
                        value={accountNumber}
                        onChange={(event) =>
                          setAccountNumber(
                            event.target.value.replace(
                              /\D/g,
                              ""
                            )
                          )
                        }
                        placeholder="10-digit account number"
                        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Account Type
                    </label>
                    <select
                      value={accountType}
                      onChange={(event) =>
                        setAccountType(event.target.value)
                      }
                      className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    >
                      <option value="">
                        Select account type
                      </option>
                      <option value="Checking">
                        Checking
                      </option>
                      <option value="Savings">
                        Savings
                      </option>
                    </select>
                  </div>
                </>
              )}
              {/* Zelle */}
              {method === "zelle" && (
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Zelle Email or Mobile Number
                  </label>
                  <input
                    type="text"
                    value={zelleContact}
                    onChange={(event) =>
                      setZelleContact(event.target.value)
                    }
                    placeholder="Enter email or mobile number"
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              )}
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
                {method === "zelle"
                  ? "Send with Zelle"
                  : "Send Money"}
              </button>
            </div>
          </form>
          {/* Notice */}
          <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50/80 p-5">
            <p className="text-sm leading-6 text-slate-600">
              Please review recipient details carefully before
              submitting a payment.
            </p>
          </div>
          {/* Back Links */}
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
        </section>
      </div>
    </main>
  );
}