"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/users/register?user_name=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`;

      const response = await fetch(url, {
        method: 'POST',
      });

      if (response.ok) {
        setSuccess('User registered successfully!');
        setError('');
        setTimeout(() => router.push('/login'), 1000);
      } else {
        const data = await response.json();
        setError(data.detail || 'Registration failed');
        setSuccess('');
      }
    } catch (err) {
      setError('Server error');
    }
  };

  return (
    <>
    <div className="min-h-screen flex items-center justify-center bg-black bg-opacity-70 relative overflow-hidden">
      <video
        autoPlay
        muted
        loop
        className="absolute inset-0 w-full h-full object-cover z-0 brightness-50"
      >
        <source src="/images/background.mp4" type="video/mp4" />
      </video>

      <div className="relative z-10 max-w-md w-full bg-white/20 backdrop-blur-md p-8 rounded-xl shadow-xl animate-fade-in">
        <h2 className="text-3xl font-bold text-center text-white mb-2" style={{ fontFamily: "var(--font-manrope)" }}>
          Register
        </h2>
        <p style={{ fontFamily: 'var(--font-eurostile)' }} className="text-white/70 text-center mb-2 text-sm">Join us today and get started</p>
        
          {error && <p className="text-red-400 text-center mb-4">{error}</p>}
          {success && <p className="text-green-400 text-center mb-4">{success}</p>}

          <form onSubmit={handleRegister} className="space-y-8">
            <div className="space-y-2">
              <label style={{ fontFamily: 'var(--font-manrope)' }}  className="text-white/80 text-sm font-medium mb-1">Email Address</label>         
              <input
                type="email"
                name="email"
                placeholder="Email"
                required
                style={{ fontFamily: 'var(--font-eurostile)' }}
                className="w-full border border-white bg-white/40 text-black px-4 py-2 mb-4 rounded"
              />
              <label style={{ fontFamily: 'var(--font-manrope)' }} className="text-white/80 text-sm font-medium mb-1">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                style={{ fontFamily: 'var(--font-eurostile)' }}
                className="w-full border border-white bg-white/40 text-black px-4 py-2 mb-6 rounded"
                required
              />
              <button
                type="submit"
                style={{ fontFamily: 'var(--font-manrope)' }}
                className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue -600 transition-all duration-300"
              >
                Sign Up
              </button>
              </div>
          </form>
              <p className="text-center mt-4 text-sm text-white" style={{ fontFamily: 'var(--font-eurostile)' }}>
                Already have an account?{" "}
                <Link href="/login" className="text-blue-200 hover:underline">
                  Login
                </Link>
              </p>
            </div>
          </div>
          </>
  );
}
