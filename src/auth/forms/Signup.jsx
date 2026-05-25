import { FaArrowRightLong } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userExists = users.some(user => user.email === formData.email);

    if (userExists) {
      setError("User already exists with this email!");
      return;
    }

    users.push(formData);
    localStorage.setItem("users", JSON.stringify(users));
    navigate("/sign-in");
  };

  return (
    <section className="min-h-screen bg-[#0b0f19] text-white">
      <div className="mx-auto grid min-h-screen max-w-6xl items-center gap-10 px-5 py-10 lg:grid-cols-[1fr_440px]">
        <div className="hidden lg:block">
          <Link to="/" className="inline-flex items-center gap-3">
            <img className="size-14" src="/assets/logo.svg" alt="Food Hub logo" />
            <span className="text-3xl font-bold tracking-normal">Food Hub</span>
          </Link>
          <div className="mt-14 max-w-xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-300">
              Fast food delivery
            </p>
            <h1 className="mt-4 text-5xl font-bold leading-tight tracking-normal">
              Order from nearby restaurants in a few taps.
            </h1>
            <p className="mt-5 text-lg leading-8 text-slate-300">
              Create your account to browse restaurants, add meals, and check out faster.
            </p>
          </div>
          <div className="mt-10 grid max-w-xl grid-cols-3 gap-3">
            {["Fresh meals", "Easy checkout", "Quick reorder"].map((item) => (
              <div key={item} className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-slate-200">
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="w-full rounded-lg border border-white/10 bg-white px-6 py-7 text-slate-950 shadow-2xl sm:px-8">
          <Link to="/" className="mb-8 flex items-center gap-3 lg:hidden">
            <img className="size-12" src="/assets/logo.svg" alt="Food Hub logo" />
            <span className="text-2xl font-bold">Food Hub</span>
          </Link>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-orange-600">
              Get started
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-normal">
              Create your account
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Join Food Hub and start ordering from restaurants near you.
            </p>
          </div>

          {error && (
            <p className="mt-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
              {error}
            </p>
          )}

          <form className="mt-7 space-y-5" onSubmit={handleSubmit}>
            <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Your name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="block w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-100"
                  placeholder="Riya Sharma"
                  required
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="riya@example.com"
                  className="block w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-100"
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Create a password"
                  className="block w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-100"
                  required
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-orange-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-orange-700 focus:outline-none focus:ring-4 focus:ring-orange-200"
              >
                Create account <FaArrowRightLong />
              </button>
              <p className="flex items-center gap-1 text-sm text-slate-500">
                Already have an account?
                <Link
                  to="/sign-in"
                  className="group flex items-center gap-1 font-bold text-orange-600 hover:text-orange-700"
                >
                  Login <FaArrowRightLong className="-rotate-45 opacity-0 transition group-hover:opacity-100" />
                </Link>
              </p>
            </form>
        </div>
      </div>
    </section>
  );
};

export default Signup;
