'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import SplashIntro from '@/components/SplashIntro'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import TrustStrip from '@/components/TrustStrip'
import WhatWeDo from '@/components/WhatWeDo'
import SelectedWork from '@/components/SelectedWork'
import WhyArclights from '@/components/WhyArclights'
import HowWeWork from '@/components/HowWeWork'
import Capabilities from '@/components/Capabilities'
import AboutPreview from '@/components/AboutPreview'
import TeamPreview from '@/components/TeamPreview'
import ProjectCTA from '@/components/ProjectCTA'
import Footer from '@/components/Footer'

export default function Home() {
  const [splashDone, setSplashDone] = useState(false)

  return (
    <>
      <AnimatePresence>
        {!splashDone && <SplashIntro onDone={() => setSplashDone(true)} />}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: splashDone ? 1 : 0 }}
        transition={{ duration: 0.6 }}
      >
        <Navbar />
        <main>
          <Hero />
          <TrustStrip />
          <WhatWeDo />
          <SelectedWork />
          <WhyArclights />
          <HowWeWork />
          <Capabilities />
          <AboutPreview />
          <TeamPreview />
          <ProjectCTA />
        </main>
        <Footer />
      </motion.div>
    </>
  )
}
