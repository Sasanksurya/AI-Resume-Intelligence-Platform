export default function WelcomeBanner() {
  return (
    <div className="rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 p-8 text-white shadow-xl">
      <h1 className="text-4xl font-bold">
        Welcome Back 👋
      </h1>

      <p className="mt-3 text-lg text-cyan-100">
        Upload your resume, improve your ATS score, identify skill gaps,
        and receive personalized AI-powered career guidance.
      </p>
    </div>
  );
}