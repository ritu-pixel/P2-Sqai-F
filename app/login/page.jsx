"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    const body = new URLSearchParams();
    body.append('username', email);
    body.append('password', password);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: body.toString(),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('auth_token', data.access_token); // ✅ Fixed key
        setSuccess('Login successful!');
        setError('');
        setTimeout(() => router.push('/upload'), 1000);
      } else {
        setError(data.detail || 'Login failed');
        setSuccess('');
      }
    } catch (err) {
      setError('Server error');
    }
  };

  return (
    <>
    <div className="min-h-screen flex items-center justify-center bg-black bg-opacity-70 relative overflow-hidden px-4 py-6">
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        className="absolute inset-0 w-full h-full object-cover z-0 brightness-50"
      >
        <source src="/images/background.mp4" type="video/mp4" />
      </video>

      {/* Login Box */}
      <div className="relative z-10 w-full max-w-md bg-white/20 backdrop-blur-md p-6 sm:p-8 rounded-xl shadow-xl animate-fade-in overflow-hidden">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-white mb-2 sm:mb-3" style={{ fontFamily: "var(--font-manrope)" }}>
          Welcome Back
        </h2>
        <p className="text-white/70 text-center mb-2 text-sm" style={{ fontFamily: 'var(--font-eurostile)' }}>
          Sign in to continue to your account
        </p>

        {error && <p className="text-red-400 text-center mb-4 text-sm">{error}</p>}
        {success && <p className="text-green-400 text-center mb-4 text-sm">{success}</p>}

        <form onSubmit={handleLogin} className="space-y-6 sm:space-y-8">
          <div className="space-y-4">
            <div>
              <label className="text-white/80 text-sm font-medium block mb-1" style={{ fontFamily: 'var(--font-manrope)' }}>
                Email Address
              </label>
              <input
                type="email"
                placeholder="Email"
                className="w-full text-sm md:text-base border border-white bg-white/40 text-black px-4 py-2 rounded"
                style={{ fontFamily: 'var(--font-eurostile)' }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="text-white/80 text-sm font-medium block mb-1" style={{ fontFamily: 'var(--font-manrope)' }}>
                Password
              </label>
              <input
                type="password"
                placeholder="Password"
                className="w-full text-sm md:text-base border border-white bg-white/40 text-black px-4 py-2 rounded"
                style={{ fontFamily: 'var(--font-eurostile)' }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              style={{ fontFamily: 'var(--font-manrope)' }}
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-all duration-300"
            >
              Sign In
            </button>
          </div>
        </form>

        <p className="text-center mt-4 text-sm text-white" style={{ fontFamily: 'var(--font-eurostile)' }}>
          Don't have an account?{" "}
          <Link href="/register" className="text-blue-200 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
    </>
  );
}
