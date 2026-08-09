const SERVICES = [
  {
    number: '01',
    title: 'Software Development',
    tagline: 'Build software around the way your business actually works.',
    description:
      'Custom web applications, internal tools, dashboards, management systems, APIs, databases, and business platforms designed around specific requirements.',
    labels: ['Web Applications', 'Business Systems', 'APIs', 'Dashboards'],
  },
  {
    number: '02',
    title: 'Automation',
    tagline: 'Turn repetitive work into intelligent workflows.',
    description:
      'We design automation systems that connect tools, move information, trigger actions, reduce manual work, and simplify everyday operations.',
    labels: ['Workflow Automation', 'Business Process Automation', 'System Integration', 'Notifications & Actions'],
  },
  {
    number: '03',
    title: 'AI Solutions',
    tagline: 'Apply AI where it creates real value.',
    description:
      'From AI-powered assistants and intelligent search to document processing and agent-based workflows, we build practical AI systems around genuine use cases.',
    labels: ['AI Assistants', 'RAG Systems', 'Intelligent Workflows', 'AI Integration'],
  },
  {
    number: '04',
    title: 'Digital Solutions',
    tagline: 'From an idea to something people can actually use.',
    description:
      'We help shape concepts, design interfaces, build prototypes, create MVPs, and turn technical ideas into deployable products.',
    labels: ['MVP Development', 'Product Prototyping', 'UI / UX', 'System Architecture'],
  },
]

export default function WhatWeDo() {
  return (
    <section id="services" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs font-semibold tracking-label text-gold">WHAT WE DO</p>
        <h2 className="mt-4 max-w-2xl text-3xl font-semibold md:text-5xl">
          Technology built around real problems.
        </h2>
        <p className="mt-4 max-w-2xl text-muted">
          We help turn business requirements, repetitive processes, and new ideas into reliable
          digital solutions — from the first concept to a working system.
        </p>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {SERVICES.map((service) => (
            <div
              key={service.number}
              className="group rounded-xl border border-border bg-surface p-8 transition hover:-translate-y-1 hover:border-gold"
            >
              <p className="text-sm font-semibold text-gold">{service.number}</p>
              <h3 className="mt-2 text-xl font-semibold">
                {service.number} — {service.title}
              </h3>
              <p className="mt-3 font-medium text-graphite">{service.tagline}</p>
              <p className="mt-3 text-sm text-muted">{service.description}</p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {service.labels.map((label) => (
                  <li
                    key={label}
                    className="rounded-lg border border-border px-3 py-1 text-xs text-muted"
                  >
                    {label}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
