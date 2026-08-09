const CATEGORIES = [
  {
    name: 'Development',
    items: ['Web Applications', 'Backend Systems', 'APIs', 'Databases', 'Cloud-ready Architecture'],
  },
  {
    name: 'Automation',
    items: ['Workflow Automation', 'API Integration', 'Business Process Automation', 'Data Pipelines'],
  },
  {
    name: 'Artificial Intelligence',
    items: ['Generative AI', 'RAG', 'Agentic Workflows', 'AI Integration', 'Intelligent Search'],
  },
  {
    name: 'Data',
    items: ['Data Processing', 'Analytics', 'ETL / ELT', 'Dashboards', 'Data Engineering'],
  },
]

export default function Capabilities() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs font-semibold tracking-label text-gold">CAPABILITIES</p>
        <h2 className="mt-4 text-3xl font-semibold md:text-5xl">The technology behind the work.</h2>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {CATEGORIES.map((category) => (
            <div key={category.name} className="rounded-xl border border-border bg-surface p-6">
              <h3 className="text-sm font-semibold tracking-wide text-gold">{category.name}</h3>
              <ul className="mt-4 space-y-2">
                {category.items.map((item) => (
                  <li key={item} className="text-sm text-muted">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="mt-14 text-center text-sm text-muted">
          We choose technologies based on the problem — not the trend.
        </p>
      </div>
    </section>
  )
}
