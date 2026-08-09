export default function AboutPreview() {
  return (
    <section id="about" className="bg-surface px-6 py-24">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-xs font-semibold tracking-label text-gold">ABOUT ARCLIGHTS</p>
        <h2 className="mt-4 text-3xl font-semibold md:text-5xl">
          Small team. Serious about what we build.
        </h2>
        <p className="mt-6 text-muted">
          Arclights was started by two people with backgrounds in technology and a shared belief
          that software should solve meaningful problems. We combine development, automation,
          software quality, and continuous experimentation to turn ideas into practical solutions.
        </p>
        <a
          href="#"
          className="mt-8 inline-block rounded-lg border border-border px-6 py-3 text-sm font-medium text-graphite transition hover:border-gold"
        >
          Our Story →
        </a>
      </div>
    </section>
  )
}
