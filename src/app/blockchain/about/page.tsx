'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Code2, Network, Zap, ArrowLeft } from 'lucide-react'
import { AnimatedBackground } from '../components/animated-background'

export default function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <main className="relative min-h-screen bg-background overflow-hidden">
      <AnimatedBackground />

      <div className="relative z-10 pt-20 pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Back button */}
          <Link href="/" className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 mb-12 transition-colors font-mono text-sm">
            <ArrowLeft className="w-4 h-4" />
            RETURN TO NETWORK
          </Link>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, type: 'spring' }}
            className="text-center mb-16"
          >
            <h1 className="text-6xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-300 bg-clip-text text-transparent mb-6 text-balance font-mono">
              ◆ GENESIS BLOCK ◆
            </h1>
            <p className="text-xl text-cyan-300/70 max-w-3xl mx-auto text-balance font-mono">
              ▬▬ The origin of decentralized innovation ▬▬
            </p>
          </motion.div>

          {/* Main content cards */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid md:grid-cols-1 gap-8 mb-20"
          >
            {/* Overview card */}
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="glass-morphism rounded-xl p-8 border border-cyan-500/20 hover:border-cyan-500/50 transition-colors"
            >
              <div className="flex items-start gap-6">
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                  className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center glow-cyan"
                >
                  <Network className="w-8 h-8 text-slate-900" />
                </motion.div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-cyan-300 mb-3 font-mono">
                    &gt; DECENTRALIZED PROTOCOL
                  </h2>
                  <p className="text-slate-400 leading-relaxed text-balance">
                    Blockchain Wing is a student-led community dedicated to exploring and building decentralized protocols. We bring together developers, researchers, and enthusiasts who are passionate about Web3 technologies and blockchain innovation.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Vision & Mission */}
            <motion.div
              variants={containerVariants}
              className="grid md:grid-cols-2 gap-8"
            >
              <motion.div
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="glass-morphism rounded-xl p-8 border border-purple-500/20 hover:border-purple-500/50 transition-colors"
              >
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                  className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg flex items-center justify-center glow-purple mb-4"
                >
                  <Zap className="w-8 h-8 text-slate-900" />
                </motion.div>
                <h3 className="text-xl font-bold text-purple-300 mb-3 font-mono">
                  &gt; OUR VISION
                </h3>
                <p className="text-slate-400 text-balance">
                  To create a thriving ecosystem where blockchain technology is explored, understood, and advanced through collaborative development and research.
                </p>
              </motion.div>

              <motion.div
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="glass-morphism rounded-xl p-8 border border-blue-500/20 hover:border-blue-500/50 transition-colors"
              >
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                  className="w-16 h-16 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-lg flex items-center justify-center glow-blue mb-4"
                >
                  <Code2 className="w-8 h-8 text-slate-900" />
                </motion.div>
                <h3 className="text-xl font-bold text-blue-300 mb-3 font-mono">
                  &gt; OUR MISSION
                </h3>
                <p className="text-slate-400 text-balance">
                  Empower the next generation of blockchain developers through hands-on projects, knowledge sharing, and community-driven development.
                </p>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Focus areas */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-cyan-300 mb-8 text-center font-mono">
              ▬ FOCUS AREAS ▬
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: 'Smart Contracts',
                  description: 'Building secure and efficient smart contracts on various blockchain platforms',
                  color: 'from-cyan-400 to-cyan-600',
                },
                {
                  title: 'Consensus Mechanisms',
                  description: 'Exploring and understanding different consensus protocols and their trade-offs',
                  color: 'from-blue-400 to-blue-600',
                },
                {
                  title: 'DeFi Protocols',
                  description: 'Developing and researching decentralized finance applications and protocols',
                  color: 'from-purple-400 to-purple-600',
                },
              ].map((area, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="glass-morphism rounded-lg p-6 border border-slate-700/50 hover:border-cyan-500/30 transition-all"
                >
                  <div
                    className={`w-12 h-12 bg-gradient-to-r ${area.color} rounded-lg mb-4`}
                  />
                  <h3 className="text-lg font-bold text-cyan-300 mb-2">
                    {area.title}
                  </h3>
                  <p className="text-slate-400 text-sm text-balance">
                    {area.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

    </main>
  )
}
