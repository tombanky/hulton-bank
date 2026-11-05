"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";

type CardRequest = {
  cardType: string;
  network: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  phone: string;
  reference: string;
  requestDate: string;
  estimatedDelivery: string;
  status?: string;
};

const stages = [
  "Application Submitted",
  "Card Processing",
  "Card Approved",
  "Card Dispatched",
  "In Transit",
  "Out for Delivery",
  "Delivered",
];

function calculateDeliveryDate() {
  return "Monday, November 30, 2026";
}

export default function CardsPage() {
  const [showForm, setShowForm] = useState(false);
  const [request, setRequest] = useState<CardRequest | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const [cardType, setCardType] = useState("Standard");
  const [network, setNetwork] = useState("Visa");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("hulton_card_request");

    if (saved) {
      try {
        setRequest(JSON.parse(saved));
      } catch {
        localStorage.removeItem("hulton_card_request");
      }
    }
  }, []);

  async function submitRequest(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);
    setSubmitError("");

    const today = new Date();

    const newRequest: CardRequest = {
      cardType,
      network,
      address,
      city,
      state,
      postalCode,
      phone,
      reference: "HLT-" + Date.now().toString().slice(-8),
      requestDate: today.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      estimatedDelivery: calculateDeliveryDate(),
      status: "Pending",
    };

    try {
      const formData = new FormData();

      formData.append("Card Type", cardType);
      formData.append("Card Network", network);
      formData.append("Delivery Address", address);
      formData.append("City", city);
      formData.append("State", state);
      formData.append("Postal Code", postalCode);
      formData.append("Phone Number", phone);
      formData.append("Reference Number", newRequest.reference);
      formData.append("Request Date", newRequest.requestDate);
      formData.append("Estimated Delivery", newRequest.estimatedDelivery);
      formData.append("Application Status", "Pending");
      formData.append("_subject", "New Hulton Bank Card Application");

      const response = await fetch(
        "https://formspree.io/f/mpppbyko",
        {
          method: "POST",
          body: formData,
          headers: {
            Accept: "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Your application could not be submitted. Please try again.");
      }

      localStorage.setItem(
        "hulton_card_request",
        JSON.stringify(newRequest)
      );

      setRequest(newRequest);
      setShowForm(false);
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  function resetRequest() {
    localStorage.removeItem("hulton_card_request");

    setRequest(null);
    setShowForm(false);
    setSubmitError("");

    setCardType("Standard");
    setNetwork("Visa");
    setAddress("");
    setCity("");
    setState("");
    setPostalCode("");
    setPhone("");
  }

  const inputStyle =
    "w-full rounded-xl border border-slate-300 bg-white p-3 text-black placeholder:text-slate-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100";

  const labelStyle =
    "mb-2 block text-sm font-semibold text-black";

  return (
    <main className="min-h-screen bg-slate-100 text-black">

      {/* HEADER */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <Link href="/dashboard" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 font-bold text-white">
              H
            </div>

            <span className="text-xl font-bold text-black">
              Hulton Bank
            </span>
          </Link>

          <Link
            href="/dashboard"
            className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-black hover:bg-slate-50"
          >
            Back to Dashboard
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-5xl px-6 py-12">

        {/* PAGE TITLE */}
        <div className="mb-10">
          <p className="font-semibold text-blue-700">
            Card Services
          </p>

          <h1 className="mt-2 text-3xl font-bold text-black">
            Debit Cards
          </h1>

          <p className="mt-2 text-black">
            Request your Hulton Bank debit card and track its delivery.
          </p>
        </div>

        {/* CARD PREVIEW */}
        {!request && !showForm && (
          <div className="rounded-3xl bg-white p-8 shadow-lg">
            <div className="grid gap-10 md:grid-cols-2 md:items-center">

              <div>
                <p className="text-sm font-semibold text-blue-700">
                  HULTON BANK
                </p>

                <h2 className="mt-3 text-2xl font-bold text-black">
                  Your money, your card.
                </h2>

                <p className="mt-3 leading-7 text-black">
                  Get your Hulton Bank debit card and have it delivered
                  to your preferred address. Choose your card type,
                  provide your delivery information and track your request.
                </p>

                <button
                  onClick={() => setShowForm(true)}
                  className="mt-7 rounded-xl bg-blue-600 px-7 py-3 font-semibold text-white hover:bg-blue-700"
                >
                  Request Debit Card
                </button>
              </div>

              {/* CARD DESIGN */}
              <div className="rounded-2xl bg-gradient-to-br from-blue-950 via-blue-800 to-indigo-600 p-7 text-white shadow-2xl">
                <div className="flex justify-between">
                  <span className="text-lg font-bold text-white">
                    HULTON BANK
                  </span>

                  <span className="text-sm text-white">
                    DEBIT
                  </span>
                </div>

                <div className="mt-12 text-3xl text-white">
                  ▰ ▰ ▰
                </div>

                <p className="mt-8 text-lg tracking-[0.25em] text-white">
                  •••• •••• •••• ••••
                </p>

                <div className="mt-7 flex items-end justify-between">
                  <div>
                    <p className="text-xs text-blue-100">
                      CARDHOLDER
                    </p>

                    <p className="mt-1 font-semibold text-white">
                      ALICIA MAHAN
                    </p>
                  </div>

                  <span className="text-xl font-bold text-white">
                    {network}
                  </span>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* APPLICATION FORM */}
        {showForm && (
          <div className="rounded-3xl bg-white p-8 text-black shadow-lg">

            <h2 className="text-2xl font-bold text-black">
              Debit Card Application
            </h2>

            <p className="mt-2 text-sm text-black">
              Enter your details to request your debit card.
            </p>

            <form
              onSubmit={submitRequest}
              className="mt-8 space-y-6 text-black"
            >

              <div className="grid gap-5 md:grid-cols-2">

                <div>
                  <label className={labelStyle}>
                    Card Type
                  </label>

                  <select
                    value={cardType}
                    onChange={(e) => setCardType(e.target.value)}
                    className={inputStyle}
                  >
                    <option value="Standard">Standard</option>
                    <option value="Premium">Premium</option>
                    <option value="Platinum">Platinum</option>
                  </select>
                </div>

                <div>
                  <label className={labelStyle}>
                    Card Network
                  </label>

                  <select
                    value={network}
                    onChange={(e) => setNetwork(e.target.value)}
                    className={inputStyle}
                  >
                    <option value="Visa">Visa</option>
                    <option value="Mastercard">Mastercard</option>
                  </select>
                </div>

              </div>

              <h3 className="border-b border-slate-300 pb-3 text-lg font-bold text-black">
                Delivery Information
              </h3>

              <div>
                <label className={labelStyle}>
                  Delivery Address
                </label>

                <input
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter street address"
                  className={inputStyle}
                />
              </div>

              <div className="grid gap-5 md:grid-cols-2">

                <div>
                  <label className={labelStyle}>City</label>

                  <input
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Enter city"
                    className={inputStyle}
                  />
                </div>

                <div>
                  <label className={labelStyle}>State</label>

                  <input
                    required
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    placeholder="Enter state"
                    className={inputStyle}
                  />
                </div>

                <div>
                  <label className={labelStyle}>Postal Code</label>

                  <input
                    required
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    placeholder="Enter postal code"
                    className={inputStyle}
                  />
                </div>

                <div>
                  <label className={labelStyle}>Phone Number</label>

                  <input
                    required
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter phone number"
                    className={inputStyle}
                  />
                </div>

              </div>

              {/* ERROR MESSAGE */}
              {submitError && (
                <div className="rounded-xl bg-red-50 p-4 text-sm font-medium text-red-700">
                  {submitError}
                </div>
              )}

              {/* BUTTONS */}
              <div className="flex flex-wrap gap-3">

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-xl bg-blue-600 px-7 py-3 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmitting
                    ? "Submitting..."
                    : "Submit Application"}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setSubmitError("");
                  }}
                  disabled={isSubmitting}
                  className="rounded-xl border border-slate-300 px-7 py-3 font-semibold text-black hover:bg-slate-50"
                >
                  Cancel
                </button>

              </div>

            </form>
          </div>
        )}

        {/* APPLICATION CONFIRMATION */}
        {request && (
          <div className="space-y-7">

            <div className="rounded-3xl bg-white p-8 shadow-lg">

              <div className="flex flex-wrap items-center justify-between gap-4">

                <div>
                  <p className="font-semibold text-green-700">
                    Application Received
                  </p>

                  <h2 className="mt-2 text-2xl font-bold text-black">
                    Your card request has been received.
                  </h2>
                </div>

                <span className="rounded-full bg-amber-100 px-4 py-2 text-sm font-bold text-amber-800">
                  {request.status || "Pending"}
                </span>

              </div>

              <div className="mt-8 grid gap-6 md:grid-cols-2">

                <div>
                  <p className="text-sm text-slate-600">
                    Reference Number
                  </p>

                  <p className="mt-1 font-bold text-black">
                    {request.reference}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-slate-600">
                    Card Type
                  </p>

                  <p className="mt-1 font-bold text-black">
                    {request.cardType} {request.network}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-slate-600">
                    Request Date
                  </p>

                  <p className="mt-1 font-bold text-black">
                    {request.requestDate}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-slate-600">
                    Estimated Delivery
                  </p>

                  <p className="mt-1 font-bold text-blue-700">
                    {request.estimatedDelivery}
                  </p>
                </div>

              </div>
            </div>

            {/* DELIVERY TRACKING */}
            <div className="rounded-3xl bg-white p-8 shadow-lg">

              <div className="flex flex-wrap items-center justify-between gap-3">

                <h2 className="text-xl font-bold text-black">
                  Delivery Tracking
                </h2>

                <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-800">
                  {request.status || "Pending"}
                </span>

              </div>

              <p className="mt-2 text-sm text-slate-600">
                Your application has been received. The remaining stages
                will be updated as processing progresses.
              </p>

              <div className="mt-8 space-y-7">

                {stages.map((stage, index) => (
                  <div key={stage} className="flex items-center gap-4">

                    <div
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-bold ${
                        index === 0
                          ? "bg-green-500 text-white"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {index === 0 ? "✓" : index + 1}
                    </div>

                    <div>
                      <p
                        className={`font-semibold ${
                          index === 0
                            ? "text-green-700"
                            : "text-slate-500"
                        }`}
                      >
                        {stage}
                      </p>

                      <p className="text-xs text-slate-500">
                        {index === 0
                          ? "Application successfully submitted."
                          : "Pending"}
                      </p>
                    </div>

                  </div>
                ))}

              </div>
            </div>

            {/* DELIVERY ADDRESS */}
            <div className="rounded-3xl bg-white p-8 shadow-lg">

              <h2 className="text-lg font-bold text-black">
                Delivery Address
              </h2>

              <p className="mt-3 text-black">
                {request.address}
              </p>

              <p className="text-black">
                {request.city}, {request.state} {request.postalCode}
              </p>

              <p className="mt-2 text-black">
                {request.phone}
              </p>

            </div>

            <button
              onClick={resetRequest}
              className="rounded-xl border border-red-300 px-5 py-3 text-sm font-semibold text-red-700 hover:bg-red-50"
            >
              Clear Card Request
            </button>

          </div>
        )}

      </section>
    </main>
  );
}