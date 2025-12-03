import { motion } from "framer-motion";
import Navbar from "../components/Navbar";

export default function Landing() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <Navbar />

      <section className="px-6 md:px-12 lg:px-20 pt-24 pb-32 flex flex-col-reverse lg:flex-row items-center justify-between">
        <div className="max-w-xl mt-10 lg:mt-0">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight text-slate-900">
            Your AI-Powered Job{" "}
            <span className="text-indigo-600">Recommendation</span> Hub
          </h1>

          <p className="mt-6 text-lg text-slate-600">
            Upload your resume, personalize your profile, and let our smart AI
            engine recommend jobs tailored exactly for you. Fast, accurate, and
            personalized.
          </p>

          <div className="mt-8 flex gap-4">
            <a
              href="/registration"
              className="px-6 py-3 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition"
            >
              Get Started
            </a>

            <a
              href="/login"
              className="px-6 py-3 rounded-xl border border-slate-300 bg-white text-slate-700 hover:bg-slate-100 transition"
            >
              Login
            </a>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md lg:max-w-lg"
        >
          <div className="backdrop-blur-xl bg-white/20 border border-white/30 shadow-[0_8px_30px_rgba(0,0,0,0.12)] rounded-3xl p-8">
            <h2 className="text-2xl font-semibold text-indigo-600">
              Smart AI Engine
            </h2>

            <p className="mt-3 text-slate-700">
              Our system analyzes your skills, experience, and interests to
              recommend the best possible jobs from multiple sources.
            </p>

            <div className="mt-6 flex items-center gap-4 bg-white/30 p-4 rounded-xl">
              <div className="w-12 h-12 bg-indigo-600/20 rounded-xl flex items-center justify-center">
                <span className="text-indigo-600 text-2xl">⚡</span>
              </div>
              <p className="text-slate-800 font-medium">
                Real-time recommendations powered by AI.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      <footer className="text-center py-6 text-slate-500">
        © {new Date().getFullYear()} JobMind AI — All rights reserved.
      </footer>
    </div>
  );
}
