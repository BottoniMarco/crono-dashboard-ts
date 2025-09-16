type Step = {
  id: number;
  title: string;
  time: string;
  Icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
};

export default function Onboarding(): JSX.Element {
  const steps: Step[] = [
    { id: 1, title: "Integrations Setup", time: "5 min", Icon: IconIntegrations },
    { id: 2, title: "Add new Contact", time: "5 min", Icon: IconContact },
    { id: 3, title: "Create your first sequence", time: "10 min", Icon: IconSequence },
    { id: 4, title: "Add contacts to sequence", time: "5 min", Icon: IconAddUsers },
    { id: 5, title: "Run your first task", time: "10 min", Icon: IconTask },
  ];

  return (
    <section className="h-full bg-white border border-slate-200 rounded-2xl shadow-sm p-6 overflow-hidden">
      <div className="text-base font-semibold text-slate-900">Onboarding</div>

      <div className="mt-4 divide-y divide-slate-100">
        {steps.map((step) => (
          <div
            key={step.id}
            className="flex items-center justify-between py-4"
          >
            <div className="flex items-center gap-4 min-w-0">

              <div className="h-11 w-11 shrink-0 rounded-xl bg-slate-50 flex items-center justify-center ring-1 ring-slate-100">
                <step.Icon className="h-6 w-6" />
              </div>

              <div className="truncate text-[16px] font-semibold text-slate-900">
                {step.title}
              </div>
            </div>

            <div className="text-[12px] text-slate-500">{step.time}</div>
          </div>
        ))}
      </div>
    </section>
  );
}


function IconIntegrations(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <rect x="3" y="4" width="7" height="7" rx="2" fill="#34d399" />
      <rect x="14" y="13" width="7" height="7" rx="2" fill="#60a5fa" />
      <path d="M10 8h4M7 12v4m10-8v4" stroke="#0f172a" strokeOpacity=".35" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function IconContact(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <rect x="4" y="3" width="16" height="18" rx="2.5" fill="#BFDBFE" />
      <circle cx="12" cy="10" r="3" fill="#2563eb" />
      <path d="M6 18c1.7-2.5 4-3.5 6-3.5S16.3 15.5 18 18" stroke="#1e3a8a" strokeOpacity=".45" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function IconSequence(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <circle cx="6" cy="6" r="3" fill="#FDE68A" />
      <circle cx="18" cy="12" r="3" fill="#F472B6" />
      <circle cx="6" cy="18" r="3" fill="#93C5FD" />
      <path d="M9 6h6M9 18h6M15 12h-6" stroke="#0f172a" strokeOpacity=".35" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function IconAddUsers(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <circle cx="9" cy="9" r="3" fill="#FCD34D" />
      <path d="M3.5 19c1.6-2.2 3.8-3.2 5.5-3.2S12.9 16.8 14.5 19" stroke="#0f172a" strokeOpacity=".35" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="17.5" cy="8" r="2.5" fill="#A78BFA" />
    </svg>
  );
}

function IconTask(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <rect x="4" y="4" width="16" height="16" rx="2.5" fill="#DDD6FE" />
      <path d="M8 12l2.5 2.5L16 9.5" stroke="#6D28D9" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}