"use client";

import Link from "next/link";

const stages = [
  "Application Submitted",
  "Card Processing",
  "Card Approved",
  "Card Dispatched",
  "In Transit",
  "Out for Delivery",
  "Delivered",
];

export default function CardTrackingPage() {
  const currentStage = 2;

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="mx-auto max-w-3xl">

        {/* Back to Dashboard */}
        <Link
          href="/dashboard"
          className="group inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 hover:shadow-md"
        >
          <svg
            className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Dashboard
        </Link>

        {/* Page Heading */}
        <div className="mt-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Track My Card
          </h1>

          <p className="mt-2 text-gray-500">
            Follow the progress of your debit card.
          </p>
        </div>

        {/* Tracking Card */}
        <div className="mt-8 rounded-2xl bg-white p-6 shadow-sm sm:p-8">

          {/* Status Header */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-xl font-semibold text-gray-900">
              Card Delivery Status
            </h2>

            <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
              Card Approved
            </span>
          </div>

          {/* Tracking Stages */}
          <div className="mt-8 space-y-7">
            {stages.map((stage, index) => {
              const completed = index <= currentStage;

              return (
                <div key={stage} className="flex items-center gap-4">
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                      completed
                        ? "bg-green-600 text-white"
                        : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    {completed ? (
                      <span className="text-lg">✓</span>
                    ) : (
                      <span>{index + 1}</span>
                    )}
                  </div>

                  <div>
                    <p
                      className={`font-semibold ${
                        completed
                          ? "text-gray-900"
                          : "text-gray-400"
                      }`}
                    >
                      {stage}
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                      {completed ? "Completed" : "Pending"}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Information Box */}
          <div className="mt-10 rounded-xl bg-blue-50 p-4">
            <p className="font-semibold text-blue-900">
              Your card has reached the approval stage.
            </p>

            <p className="mt-1 text-sm text-blue-700">
              Further delivery updates will be displayed here.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}