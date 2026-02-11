'use client'

import { motion } from 'framer-motion'
import { Code2, Network, Zap } from 'lucide-react'

const features = [
  {
    title: 'Smart Contracts',
    description: 'Develop, deploy, and audit intelligent self-executing contracts on multiple blockchain networks',
    icon: Code2,
  },
  {
    title: 'Consensus Mechanisms',
    description: 'Research and implement advanced consensus algorithms including PoW, PoS, and hybrid models',
    icon: Network,
  },
  {
    title: 'DeFi Protocols',
    description: 'Build decentralized finance applications including AMMs, lending protocols, and derivatives',
    icon: Zap,
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

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 100 },
  },
}

export function AboutSection() {
  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8">
      <motion.div variants={itemVariants} className="space-y-3">
        <h3 className="text-xl font-bold text-cyan-400">Vision</h3>
        <p className="text-slate-300 leading-relaxed">
          To create a decentralized network of blockchain developers, researchers, and enthusiasts dedicated to
          pushing the boundaries of Web3 technology and building the future of distributed systems.
        </p>
      </motion.div>

      <motion.div variants={itemVariants} className="space-y-3">
        <h3 className="text-xl font-bold text-cyan-400">Mission</h3>
        <p className="text-slate-300 leading-relaxed">
          Foster innovation in blockchain protocols, empower the next generation of Web3 developers, and contribute
          to open-source distributed ledger technologies. We believe in learning by doing and building solutions that
          matter.
        </p>
      </motion.div>

      <motion.div variants={itemVariants} className="space-y-4">
        <h3 className="text-xl font-bold text-cyan-400">Focus Areas</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                variants={itemVariants}
                className="glass-morphism p-4 rounded-lg hover:border-cyan-500/50 transition-colors group"
              >
                <Icon className="w-6 h-6 text-cyan-400 mb-3 group-hover:scale-110 transition-transform" />
                <h4 className="font-semibold text-white mb-2">{feature.title}</h4>
                <p className="text-sm text-slate-400">{feature.description}</p>
              </motion.div>
            )
          })}
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="pt-4 border-t border-slate-700">
        <p className="text-slate-400 text-sm">
          Genesis Block launched to establish the foundation of our blockchain research and development ecosystem.
        </p>
      </motion.div>
    </motion.div>
  )
}
