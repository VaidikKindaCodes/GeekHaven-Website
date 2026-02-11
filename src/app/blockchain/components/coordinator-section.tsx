'use client'

import { motion } from 'framer-motion'
import { Mail, Linkedin, Github } from 'lucide-react'

const coordinators = [
  {
    name: 'Alex Chen',
    role: 'Lead Architect',
    skills: ['Smart Contracts', 'Solidity', 'Ethereum'],
    email: 'alex@blockwing.dev',
    socials: { linkedin: '#', github: '#' },
  },
  {
    name: 'Sam Patel',
    role: 'Protocol Engineer',
    skills: ['Consensus', 'Rust', 'Layer 2'],
    email: 'sam@blockwing.dev',
    socials: { linkedin: '#', github: '#' },
  },
  {
    name: 'Jordan Lee',
    role: 'Research Lead',
    skills: ['DeFi', 'Economics', 'Analysis'],
    email: 'jordan@blockwing.dev',
    socials: { linkedin: '#', github: '#' },
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 100 },
  },
}

export function CoordinatorsSection() {
  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
      <p className="text-slate-300">
        Meet the core validators of the Blockchain Wing. These are the individuals driving innovation and maintaining
        the network.
      </p>

      <div className="grid grid-cols-1 gap-4">
        {coordinators.map((coord) => (
          <motion.div
            key={coord.name}
            variants={cardVariants}
            whileHover={{ scale: 1.02, borderColor: 'rgba(34, 211, 238, 0.6)' }}
            className="glass-morphism p-6 rounded-lg border border-cyan-500/20 hover:border-cyan-500/60 transition-all"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-bold text-white">{coord.name}</h3>
                <p className="text-cyan-400 text-sm">{coord.role}</p>
              </div>
              <div className="flex gap-2">
                <a
                  href={coord.socials.linkedin}
                  className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4 h-4 text-slate-400 hover:text-cyan-400" />
                </a>
                <a
                  href={coord.socials.github}
                  className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
                  aria-label="GitHub"
                >
                  <Github className="w-4 h-4 text-slate-400 hover:text-cyan-400" />
                </a>
                <a
                  href={`mailto:${coord.email}`}
                  className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
                  aria-label="Email"
                >
                  <Mail className="w-4 h-4 text-slate-400 hover:text-cyan-400" />
                </a>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {coord.skills.map((skill) => (
                <span key={skill} className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-xs text-cyan-400">
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
