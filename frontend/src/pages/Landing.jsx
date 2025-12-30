import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <section className="relative min-h-screen flex items-center justify-center px-6 text-center">
        {/* layered glow */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-175 h-175 bg-sky-400/20 blur-3xl rounded-full" />
          <div className="absolute top-20 left-1/3 w-72 h-72 bg-indigo-500/10 blur-2xl rounded-full" />
        </div>

        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
            AI-Powered Job Recommendations <br />
            Built Around{" "}
            <span className="bg-linear-to-r from-sky-400 to-indigo-400 bg-clip-text text-transparent">
              You
            </span>
          </h1>

          <p className="mt-6 text-lg md:text-xl text-slate-300 max-w-2xl mx-auto">
            Upload your resume, discover missing skills, optimize for ATS, and
            get personalized job matches using AI.
          </p>

          <div className="mt-12 flex justify-center gap-5">
            <Link
              to="/register"
              className="px-7 py-3 rounded-xl bg-sky-400 text-slate-950 font-semibold
                   hover:bg-sky-300 transition shadow-lg shadow-sky-400/30"
            >
              Get Started
            </Link>

            <Link
              to="/login"
              className="
    relative px-7 py-3 rounded-xl
    border border-sky-400/60
    text-sky-400 font-semibold
    backdrop-blur
    transition-all duration-300

    hover:-translate-y-0.5
    hover:shadow-[0_0_25px_rgba(56,189,248,0.6)]
    hover:border-sky-400
  "
            >
              Login
            </Link>
          </div>
        </div>
      </section>

      <section className="relative py-28 px-6">
        {/* background glow */}
        <div className="absolute inset-0 -z-10">
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                    w-225 h-225 bg-sky-400/10 blur-3xl rounded-full"
          />
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-bold">
              Everything You Need to Land the Right Job
            </h2>
            <p className="mt-4 text-slate-400 max-w-2xl mx-auto">
              From resume parsing to ATS optimization — JobMind handles it all
              using AI.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <Feature
              icon="📄"
              title="Smart Resume Parsing"
              desc="AI extracts skills, experience, and confidence scores from your resume."
            />
            <Feature
              icon="🎯"
              title="Personalized Job Matching"
              desc="Scoring-based recommendations using skills, salary, location & recency."
            />
            <Feature
              icon="⚡"
              title="Resume Optimization"
              desc="ATS keyword gaps, missing skills & AI rewritten bullet points."
            />
          </div>
        </div>
      </section>

      <section className="pb-20 text-center px-6">
        <h2 className="text-3xl md:text-4xl font-bold">
          Stop Applying Blindly
        </h2>
        <p className="mt-4 text-slate-300">
          Let AI match you with the right opportunities.
        </p>
        <Link
          to="/register"
          className="inline-block mt-8 px-8 py-4 rounded-xl bg-sky-400 text-slate-950 font-semibold hover:bg-sky-300 transition"
        >
          Upload Resume & Start
        </Link>
      </section>

      <footer className="border-t border-slate-800 py-6 text-center text-slate-400 text-sm">
        © {new Date().getFullYear()} JobMind. Built with 💙 .
      </footer>
    </div>
  );
};

const Feature = ({ icon, title, desc }) => (
  <div
    className="relative group rounded-2xl p-8
                  bg-white/5 backdrop-blur-xl
                  border border-white/10
                  transition-all duration-300
                  hover:-translate-y-2 hover:border-sky-400/40
                  hover:shadow-[0_0_40px_rgba(56,189,248,0.15)]"
  >
    <div
      className="absolute inset-0 rounded-2xl bg-linear-to-br
                    from-sky-400/10 to-indigo-400/5
                    opacity-0 group-hover:opacity-100 blur-xl transition"
    />

    <div className="relative z-10 text-center">
      <div className="text-4xl mb-5">{icon}</div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
    </div>
  </div>
);

export default Landing;
