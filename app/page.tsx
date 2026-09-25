export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      {/* Navigation */}
      <nav className="flex items-center justify-between bg-white px-8 py-5 shadow-sm">
        <div className="flex items-center gap-3">
  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-700 text-xl font-bold text-white">
    H
  </div>

  <span className="text-2xl font-bold tracking-tight text-slate-900">
    Hulton Bank
  </span>
</div>
        <div className="flex items-center gap-3">
          <a
            href="/login"
            className="rounded-lg border border-slate-300 px-5 py-2 font-medium text-slate-700 transition hover:bg-slate-100"
          >
            Sign In
          </a>
          <button className="rounded-lg bg-blue-700 px-5 py-2 font-medium text-white transition hover:bg-blue-800">
            Open an Account
          </button>
        </div>
      </nav>
      {/* Hero */}
<section className="relative overflow-hidden bg-slate-950">
  <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-blue-600 opacity-30 blur-3xl"></div>
  <div className="absolute -bottom-40 left-1/3 h-96 w-96 rounded-full bg-blue-500 opacity-20 blur-3xl"></div>
  <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-16 px-8 py-24 lg:flex-row lg:py-28">
    {/* Hero Text */}
    <div className="max-w-3xl flex-1">
      <p className="mb-5 font-semibold tracking-widest text-blue-400">
        SIMPLE. SECURE. MODERN.
      </p>
      <h1 className="text-5xl font-bold leading-tight tracking-tight text-white sm:text-6xl">
        Banking built around your everyday life.
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
        Manage your checking and savings accounts, move money, view
        transactions, and stay in control of your finances from one place.
      </p>
      <div className="mt-9 flex gap-4">
        <button className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-500">
          Get Started
        </button>
        <button className="rounded-lg border border-slate-600 px-6 py-3 font-semibold text-white transition hover:bg-slate-800">
          Learn More
        </button>
      </div>
    </div>
    {/* Bank Card */}
    <div className="w-full max-w-md flex-1">
      <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-blue-700 to-slate-900 p-7 shadow-2xl">
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-white">
            Hulton Bank
          </span>
          <span className="text-sm text-blue-200">
            VISA
          </span>
        </div>
        <div className="mt-12">
          <p className="text-sm text-blue-200">
            Available Balance
          </p>
          <p className="mt-2 text-4xl font-bold text-white">
            $24,850.00
          </p>
        </div>
        <div className="mt-10 flex items-end justify-between">
          <div>
            <p className="text-xs text-blue-200">
              CARD NUMBER
            </p>
            <p className="mt-1 tracking-widest text-white">
              •••• •••• •••• 4821
            </p>
          </div>
          <div className="h-10 w-14 rounded-md border border-white/30 bg-white/10"></div>
        </div>
      </div>
      <div className="mt-5 rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-300">
              Recent activity
            </p>
            <p className="mt-1 font-semibold text-white">
              Everyday Checking
            </p>
          </div>
          <span className="text-sm font-semibold text-green-400">
            Active
          </span>
        </div>
      </div>
    </div>
  </div>
</section>
      {/* Features */}
      <section className="mx-auto grid max-w-6xl gap-6 px-8 py-20 md:grid-cols-3">
        <div className="rounded-2xl bg-white p-7 shadow-sm transition hover:shadow-md">
          <div className="mb-5 text-3xl">💳</div>
          <h2 className="text-xl font-bold">Checking</h2>
          <p className="mt-3 leading-7 text-slate-600">
            Everyday banking for spending, deposits, and transfers.
          </p>
        </div>
        <div className="rounded-2xl bg-white p-7 shadow-sm transition hover:shadow-md">
          <div className="mb-5 text-3xl">💰</div>
          <h2 className="text-xl font-bold">Savings</h2>
          <p className="mt-3 leading-7 text-slate-600">
            Keep your savings organized and easy to manage.
          </p>
        </div>
        <div className="rounded-2xl bg-white p-7 shadow-sm transition hover:shadow-md">
          <div className="mb-5 text-3xl">↔️</div>
          <h2 className="text-xl font-bold">Transfers</h2>
          <p className="mt-3 leading-7 text-slate-600">
            Send and receive money with a simple banking experience.
          </p>
        </div>
      </section>
    </main>
  );
}