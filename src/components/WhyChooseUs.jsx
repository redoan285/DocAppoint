import { ShieldCheck, CalendarDays, BadgeDollarSign } from 'lucide-react';

export default function WhyChooseUs() {
  const features = [
    {
      icon: <ShieldCheck className="w-6 h-6" />,
      title: "Verified Clinic Experts",
      desc: "Every registered doctor is meticulously audited for professional credentials before joining."
    },
    {
      icon: <CalendarDays className="w-6 h-6" />,
      title: "Flexible Scheduling",
      desc: "Easily pick time slots and modify appointments from your secure dashboard."
    },
    {
      icon: <BadgeDollarSign className="w-6 h-6" />,
      title: "Zero Hidden Charges",
      desc: "We charge zero platform fee. You only pay the doctor's consultation fee."
    }
  ];

  return (
    <section className="space-y-10">
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <span className="text-teal-600 dark:text-teal-400 font-bold text-sm uppercase tracking-widest">
          Key Advantages
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-800 dark:text-white">
          Why Choose DocAppoint?
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, i) => (
          <div key={i} className="glass-panel p-8 space-y-4 border border-slate-200/60 dark:border-slate-800/80 hover:shadow-lg hover:border-teal-500/20 transition-all duration-300 text-center md:text-left">
            <div className="w-12 h-12 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center mx-auto md:mx-0 shadow-sm">
              {feature.icon}
            </div>
            <h3 className="text-lg font-bold text-slate-800 dark:text-white">{feature.title}</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
              {feature.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}