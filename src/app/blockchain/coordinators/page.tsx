'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Mail, Linkedin, Github, ArrowLeft } from 'lucide-react'
import { AnimatedBackground } from '../components/animated-background'
import { Footer } from '../components/footer'

interface Coordinator {
  id: string
  name: string
  role: string
  skills: string[]
  avatar: string
}

const coordinators: Coordinator[] = [
  {
    id: '1',
    name: 'Alex Kumar',
    role: 'Lead Architect',
    skills: ['Solidity', 'Smart Contracts', 'Protocol Design'],
    avatar: 'AK',
  },
  {
    id: '2',
    name: 'Sam Chen',
    role: 'Consensus Lead',
    skills: ['Consensus Algorithms', 'Cryptography', 'Research'],
    avatar: 'SC',
  },
  {
    id: '3',
    name: 'Jordan Blake',
    role: 'DeFi Specialist',
    skills: ['DeFi', 'Economics', 'Smart Contracts'],
    avatar: 'JB',
  },
  {
    id: '4',
    name: 'Taylor Moon',
    role: 'Security Lead',
    skills: ['Security', 'Auditing', 'Testing'],
    avatar: 'TM',
  },
]

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
}

export default function Coordinators() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
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

      <div className="relative z-10 container mx-auto px-4 py-12">
        <Link href="/" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-12 transition-colors font-mono text-sm">
          <ArrowLeft className="w-4 h-4" />
          RETURN TO NETWORK
        </Link>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, type: 'spring' }}
          className="text-center mb-16"
        >
          <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-300 bg-clip-text text-transparent mb-6 text-balance font-mono">
            ◆ VALIDATORS ◆
          </h1>
          <p className="text-lg text-blue-300/70 max-w-3xl mx-auto text-balance font-mono">
            ▬▬ Core protocol gatekeepers ▬▬
          </p>
        </motion.div>

        {/* Coordinator cards grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-2 gap-8"
        >
          {coordinators.map((coordinator) => (
            <motion.div
              key={coordinator.id}
              variants={cardVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group glass-morphism rounded-xl p-6 border border-slate-700/50 hover:border-blue-500/50 transition-all overflow-hidden"
            >
              {/* Glow background on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/10 group-hover:to-purple-500/10 transition-all duration-300" />

              <div className="relative z-10">
                {/* Avatar */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center mb-4 group-hover:glow-blue transition-all mx-auto"
                >
                  <span className="text-2xl font-bold text-slate-900">
                    {coordinator.avatar}
                  </span>
                </motion.div>

                {/* Content */}
                <h3 className="text-lg font-bold text-blue-300 text-center mb-1">
                  {coordinator.name}
                </h3>
                <p className="text-sm text-slate-400 text-center mb-4">
                  {coordinator.role}
                </p>

                {/* Skills */}
                <div className="flex flex-wrap gap-2 justify-center mb-6">
                  {coordinator.skills.map((skill, idx) => (
                    <motion.span
                      key={idx}
                      whileHover={{ scale: 1.05 }}
                      className="px-3 py-1 rounded-full text-xs bg-blue-500/20 text-blue-300 border border-blue-500/30"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>

                {/* Social links */}
                <div className="flex justify-center gap-3 pt-4 border-t border-slate-700/50">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 rounded-lg bg-slate-800/50 hover:bg-blue-500/20 text-slate-400 hover:text-blue-300 transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 rounded-lg bg-slate-800/50 hover:bg-blue-500/20 text-slate-400 hover:text-blue-300 transition-colors"
                  >
                    <Linkedin className="w-4 h-4" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 rounded-lg bg-slate-800/50 hover:bg-blue-500/20 text-slate-400 hover:text-blue-300 transition-colors"
                  >
                    <Github className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>

              {/* Border glow effect */}
              <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="absolute inset-0 rounded-xl border border-blue-500/30 group-hover:glow-blue" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-20 grid md:grid-cols-3 gap-6"
        >
          {[
            { label: 'Active Validators', value: '4' },
            { label: 'Expertise Areas', value: '12+' },
            { label: 'Years Combined', value: '15+' },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -5 }}
              className="glass-morphism rounded-xl p-6 border border-slate-700/50 text-center"
            >
              <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
                {stat.value}
              </div>
              <p className="text-slate-400">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <Footer />
    </main>
  )
}
