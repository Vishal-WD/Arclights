const PRINCIPLES = [
  {
    title: 'Practical by Design',
    description: 'We focus on solving the actual problem instead of adding technology for the sake of it.',
  },
  {
    title: 'Built Around You',
    description: 'Every project begins with understanding your workflow, requirements, users, and goals.',
  },
  {
    title: 'Clear Communication',
    description: 'You know what is being built, why it is being built, and where the project stands.',
  },
  {
    title: 'Built to Improve',
    description: 'We test, learn, refine, and improve throughout the development process.',
  },
]

export default function WhyArclights() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs font-semibold tracking-label text-gold">WHY ARCLIGHTS</p>
        <h2 className="mt-4 text-3xl font-semibold md:text-5xl">Less complexity. More clarity.</h2>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {PRINCIPLES.map((principle) => (
            <div key={principle.title} className="rounded-xl border border-border bg-surface p-6">
              <h3 className="text-lg font-semibold">{principle.title}</h3>
              <p className="mt-3 text-sm text-muted">{principle.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
