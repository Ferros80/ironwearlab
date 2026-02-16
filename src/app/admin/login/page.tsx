"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/admin";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);
    if (res?.error) {
      setError("Email o password non validi.");
      return;
    }
    router.push(callbackUrl);
    router.refresh();
  }

  return (
    <div className="flex min-h-[calc(100vh-72px)] items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-zinc-800/50 bg-zinc-900/50 p-8">
        <h1 className="text-2xl font-bold text-white">Admin Login</h1>
        <p className="mt-1 text-sm text-zinc-400">
          Accedi con le tue credenziali admin.
        </p>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-zinc-300">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              className="mt-2 w-full rounded-lg border border-zinc-700/50 bg-zinc-900 px-4 py-3 text-white focus:border-white focus:outline-none focus:ring-1 focus:ring-white"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-zinc-300">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              className="mt-2 w-full rounded-lg border border-zinc-700/50 bg-zinc-900 px-4 py-3 text-white focus:border-white focus:outline-none focus:ring-1 focus:ring-white"
            />
          </div>
          {error && (
            <p className="text-sm text-red-400">{error}</p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-white py-3 font-semibold text-zinc-950 transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {loading ? "Accesso..." : "Accedi"}
          </button>
        </form>
      </div>
    </div>
  );
}
