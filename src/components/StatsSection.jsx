import Link from 'next/link';

export default function StatsSection() {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-slate-900 dark:bg-slate-900/60 border border-slate-800 text-white py-16 px-8 sm:px-16 shadow-xl">
      <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl z-0" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl z-0" />

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <span className="text-teal-400 font-semibold text-sm uppercase tracking-widest">
            Live Achievements
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
            Proudly Empowering Healthcare Booking Across Dhaka
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            With a growing directory of highly experienced specialists, DocAppoint makes medical booking hassle-free.
          </p>
          <Link
            href="/appointments"
            className="btn btn-sm bg-teal-500 hover:bg-teal-600 text-white px-5 rounded-lg py-2.5 inline-block"
          >
            Schedule Consult
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {[
            { num: "12+", label: "Consultation Specialities" },
            { num: "5,000+", label: "Happy Patients" },
            { num: "150+", label: "Verified Doctors" },
            { num: "99.8%", label: "Booking Success Rate" }
          ].map((stat, i) => (
            <div key={i} className="glass-panel p-6 bg-slate-800/40 border-slate-700/50 space-y-1">
              <p className="text-4xl sm:text-5xl font-extrabold text-teal-400">{stat.num}</p>
              <p className="text-sm font-semibold text-slate-100">{stat.label}</p>
              <p className="text-xs text-slate-400">Dhaka Division</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}