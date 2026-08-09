import ContactForm from './ContactForm'

export default function ProjectCTA() {
  return (
    <section id="contact" className="bg-black px-6 py-24 text-dark-heading">
      <div className="mx-auto max-w-xl text-center">
        <p className="text-xs font-semibold tracking-label text-dark-gold">HAVE SOMETHING IN MIND?</p>
        <h2 className="mt-4 text-3xl font-semibold md:text-5xl">
          Let&apos;s turn it into something real.
        </h2>
        <p className="mt-6 text-dark-body">
          Whether you&apos;re starting with an idea, an existing workflow, or a problem that needs
          solving, tell us what you&apos;re trying to build.
        </p>

        <ContactForm />

        <p className="mt-6 text-xs text-dark-body/70">
          Prefer email? Reach us directly at arclights.techteam@gmail.com
        </p>
      </div>
    </section>
  )
}
