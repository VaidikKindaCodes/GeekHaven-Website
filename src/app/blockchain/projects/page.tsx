'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowUpRight, Code2, Zap, ArrowLeft } from 'lucide-react'
import { AnimatedBackground } from '../components/animated-background'

interface Project {
  id: string
  title: string
  description: string
  tech: string[]
  status: 'Live' | 'Research' | 'Building'
  color: string
}

const projects: Project[] = [
  {
    id: '1',
    title: 'Governance Protocol',
    description:
      'A decentralized governance framework for protocol decisions and community voting',
    tech: ['Solidity', 'OpenZeppelin', 'IPFS'],
    status: 'Live',
    color: 'from-cyan-400 to-cyan-600',
  },
  {
    id: '2',
    title: 'Cross-Chain Bridge',
    description:
      'Secure cross-chain asset transfer protocol enabling interoperability',
    tech: ['Rust', 'Substrate', 'Zero-Knowledge Proofs'],
    status: 'Building',
    color: 'from-blue-400 to-blue-600',
  },
  {
    id: '3',
    title: 'DeFi Aggregator',
    description:
      'Unified interface for accessing multiple DeFi protocols and liquidity sources',
    tech: ['JavaScript', 'Web3.js', 'React'],
    status: 'Research',
    color: 'from-purple-400 to-purple-600',
  },
  {
    id: '4',
    title: 'NFT Marketplace',
    description:
      'High-performance marketplace with royalty management and creator tools',
    tech: ['Solidity', 'Next.js', 'PostgreSQL'],
    status: 'Live',
    color: 'from-pink-400 to-pink-600',
  },
  {
    id: '5',
    title: 'Layer 2 Scaling',
    description:
      'Optimistic rollup implementation for transaction throughput optimization',
    tech: ['Go', 'Ethereum', 'Cairo'],
    status: 'Building',
    color: 'from-orange-400 to-orange-600',
  },
  {
    id: '6',
    title: 'Security Auditor',
    description:
      'AI-powered smart contract vulnerability detection and analysis tool',
    tech: ['Python', 'ML', 'Slither'],
    status: 'Research',
    color: 'from-red-400 to-red-600',
  },
]

export default function Projects() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Live':
        return 'bg-green-500/20 text-green-300 border-green-500/30'
      case 'Building':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/30'
      case 'Research':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/30'
      default:
        return 'bg-slate-500/20 text-slate-300 border-slate-500/30'
    }
  }

  return (
    <main className="relative min-h-screen bg-background overflow-hidden">
      <AnimatedBackground />

      <div className="relative z-10 container mx-auto px-4 py-12">
        <Link href="/" className="inline-flex items-center gap-2 text-pink-400 hover:text-pink-300 mb-12 transition-colors font-mono text-sm">
          <ArrowLeft className="w-4 h-4" />
          RETURN TO NETWORK
        </Link>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, type: 'spring' }}
          className="text-center mb-16"
        >
          <h1 className="text-6xl font-bold bg-gradient-to-r from-pink-400 via-red-400 to-pink-300 bg-clip-text text-transparent mb-6 text-balance font-mono">
            ◆ PROTOCOLS ◆
          </h1>
          <p className="text-lg text-pink-300/70 max-w-3xl mx-auto text-balance font-mono">
            ▬▬ Active protocol deployments ▬▬
          </p>
        </motion.div>

        {/* Projects grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={cardVariants}
              whileHover={{ y: -12, scale: 1.02 }}
              className="group glass-morphism rounded-xl p-6 border border-slate-700/50 hover:border-pink-500/50 transition-all overflow-hidden relative"
            >
              {/* Glow background */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-pink-500/0 to-orange-500/0 group-hover:from-pink-500/10 group-hover:to-orange-500/10 transition-all duration-300"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 4, repeat: Infinity }}
              />

              <div className="relative z-10">
                {/* Project header */}
                <div className="flex items-start justify-between mb-6">
                  <motion.div
                    whileHover={{ rotate: 20, scale: 1.1 }}
                    className={`w-12 h-12 bg-gradient-to-br ${project.color} rounded-lg flex items-center justify-center`}
                  >
                    <Code2 className="w-6 h-6 text-slate-900" />
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 20 }}
                    className="p-2 rounded-lg bg-slate-800/50 hover:bg-pink-500/20 text-slate-400 hover:text-pink-300 transition-colors"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </motion.div>
                </div>

                {/* Title and description */}
                <h3 className="text-xl font-bold text-pink-300 mb-2">
                  {project.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6 text-balance">
                  {project.description}
                </p>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tech, idx) => (
                    <motion.span
                      key={idx}
                      whileHover={{ scale: 1.05 }}
                      className="px-3 py-1 rounded-full text-xs bg-slate-800/60 text-slate-300 border border-slate-700/50 hover:border-pink-500/30 transition-colors"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>

                {/* Status badge */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className={`inline-block px-4 py-2 rounded-full text-sm font-semibold border ${getStatusColor(project.status)}`}
                >
                  {project.status === 'Live' && (
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                      {project.status}
                    </div>
                  )}
                  {project.status === 'Building' && (
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4" />
                      {project.status}
                    </div>
                  )}
                  {project.status === 'Research' && project.status}
                </motion.div>
              </div>

              {/* Corner accent */}
              <motion.div
                className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-pink-500/10 to-transparent rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                animate={{ rotate: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-20 text-center"
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(236, 72, 153, 0.6)' }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 rounded-lg bg-gradient-to-r from-pink-500 to-orange-500 text-slate-900 font-bold hover:from-pink-600 hover:to-orange-600 transition-all"
          >
            Start Contributing
          </motion.button>
        </motion.div>
      </div>
    </main>
  )
}
