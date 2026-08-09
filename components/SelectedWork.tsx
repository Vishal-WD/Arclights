const PROJECTS = [
  {
    name: 'Campus Connect',
    problem:
      'A full-stack, role-based campus management platform selected as a primary showcase for global ABET accreditation.',
    tags: ['Web App', 'Full-Stack', 'RBAC'],
    github: 'https://github.com/Vishal-WD/CAMPUS-CONNECT',
    demo: null,
  },
  {
    name: 'VisionSense',
    problem:
      'A computer vision pipeline that turns retail CCTV footage into customer behavior intelligence — built for Orientbell Tiles and awarded 1st Prize at the KARE SCRS Hackathon (DEV-FEST 2.0).',
    tags: ['Computer Vision', 'AI', 'Retail Analytics'],
    github: 'https://github.com/Vishal-WD/VisionSense',
    demo: null,
  },
  {
    name: 'AquaSense AI',
    problem:
      'An IoT and AI-driven platform that monitors water quality in real time and flags contamination risk before it becomes a problem — built during the Infosys Springboard internship, 2nd Place at EUPHORIA 2026 Techno-Management Meet.',
    tags: ['IoT', 'AI', 'Full-Stack'],
    github: 'https://github.com/Vishal-WD/AquaSense',
    demo: 'https://aqua-sense-three.vercel.app',
  },
]

export default function SelectedWork() {
  return (
    <section id="work" className="bg-surface px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs font-semibold tracking-label text-gold">SELECTED WORK</p>
        <h2 className="mt-4 text-3xl font-semibold md:text-5xl">Things we&apos;ve built.</h2>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {PROJECTS.map((project) => (
            <div
              key={project.name}
              className="group flex flex-col rounded-xl border border-border bg-ivory p-8 transition hover:-translate-y-1 hover:border-gold"
            >
              <h3 className="text-xl font-semibold">{project.name}</h3>
              <p className="mt-3 flex-1 text-sm text-muted">{project.problem}</p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <li key={tag} className="rounded-lg border border-border px-3 py-1 text-xs text-muted">
                    {tag}
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap gap-4 text-sm font-medium">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${project.name} — GitHub`}
                  className="text-graphite transition hover:text-gold"
                >
                  GitHub ↗
                </a>
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${project.name} — Live Demo`}
                    className="text-graphite transition hover:text-gold"
                  >
                    Live Demo ↗
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
