const TEAM = [
  { name: 'Dharanyaa', role: 'Software · QA · Automation' },
  { name: 'Vishal', role: 'Development · Software · Technology' },
]

export default function TeamPreview() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-3xl font-semibold md:text-5xl">The People Behind Arclights</h2>

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {TEAM.map((member) => (
            <div key={member.name} className="rounded-xl border border-border bg-surface p-8">
              <p className="text-lg font-semibold">{member.name}</p>
              <p className="mt-2 text-sm text-muted">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
