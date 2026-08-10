const STEPS = [
  {
    title: 'Understand',
    description: 'We begin with the problem — your goals, users, workflow, challenges, and requirements.',
  },
  {
    title: 'Plan',
    description: 'We define the solution, architecture, features, technologies, milestones, and expected outcome.',
  },
  {
    title: 'Build',
    description: 'We design and develop the solution through clear, manageable iterations.',
  },
  {
    title: 'Test',
    description: 'We validate functionality, usability, reliability, and real-world behaviour.',
  },
  {
    title: 'Launch',
    description: 'We deploy the solution and make sure everything works in its intended environment.',
  },
  {
    title: 'Improve',
    description: 'We gather feedback, refine the system, and continue improving where needed.',
  },
]

export default function HowWeWork() {
  return (
    <section id="process" className="bg-surface px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs font-semibold tracking-label text-gold">HOW WE WORK</p>
        <h2 className="mt-4 text-3xl font-semibold md:text-5xl">From problem to product.</h2>

        <div className="relative mt-16">
          <svg
            aria-hidden="true"
            viewBox="0 0 1000 60"
            preserveAspectRatio="none"
            className="absolute inset-x-0 top-6 hidden w-full opacity-30 md:block"
          >
            <path
              d="M 0 50 C 150 10, 250 50, 400 30 C 550 10, 650 50, 800 30 C 900 15, 950 40, 1000 20"
              fill="none"
              className="stroke-gold"
              strokeWidth="2"
            />
          </svg>

          <ol className="relative grid gap-8 md:grid-cols-3 lg:grid-cols-6">
            {STEPS.map((step, index) => (
              <li key={step.title} className="rounded-xl border border-border bg-ivory p-5">
                <p className="text-xs font-semibold text-gold">{String(index + 1).padStart(2, '0')}</p>
                <h3 className="mt-2 text-base font-semibold">{step.title}</h3>
                <p className="mt-2 text-xs text-muted">{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
