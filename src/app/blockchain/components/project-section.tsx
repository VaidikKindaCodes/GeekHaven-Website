'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight, Code2, Zap } from 'lucide-react'

const projects = [
  {
    name: 'TokenForge',
    description: 'Advanced ERC-20 token factory with governance and vesting mechanisms',
    tags: ['Solidity', 'ERC-20', 'Governance'],
    status: 'Live',
    statusColor: 'from-green-400 to-green-600',
  },
  {
    name: 'DeSwap AMM',
    description: 'Automated market maker with concentrated liquidity and dynamic fees',
    tags: ['Uniswap V3', 'DEX', 'Solidity'],
    status: 'Live',
    statusColor: 'from-green-400 to-green-600',
  },
  {
    name: 'VaultGuard',
    description: 'Multi-signature wallet with advanced security features and recovery mechanisms',
    tags: ['Security', 'Wallet', 'Multi-sig'],
    status: 'Live',
    statusColor: 'from-green-400 to-green-600',
  },
  {
    name: 'LendHub Protocol',
    description: 'Decentralized lending protocol with algorithmic interest rates and risk management',
    tags: ['DeFi', 'Lending', 'Risk'],
    status: 'Building',
    statusColor: 'from-blue-400 to-blue-600',
  },
  {
    name: 'ProofChain',
    description: 'Zero-knowledge proof verification system for privacy-preserving applications',
    tags: ['ZK Proofs', 'Privacy', 'Cryptography'],
    status: 'Research',
    statusColor: 'from-purple-400 to-purple-600',
  },
  {
    name: 'ChainShield',
    description: 'Advanced smart contract audit and vulnerability detection framework',
    tags: ['Security', 'Auditing', 'Testing'],
    status: 'Research',
    statusColor: 'from-purple-400 to-purple-600',
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

export function ProjectsSection() {
  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
      <p className="text-slate-300">
        Deployed protocols and active research initiatives within the Blockchain Wing ecosystem
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((project) => (
          <motion.div
            key={project.name}
            variants={cardVariants}
            whileHover={{ scale: 1.02, y: -5 }}
            className="group glass-morphism p-6 rounded-lg border border-pink-500/20 hover:border-pink-500/60 transition-all cursor-pointer"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors flex items-center gap-2">
                  {project.name}
                  <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>
                <p className="text-slate-400 text-sm mt-1">{project.description}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.map((tag) => (
                <span key={tag} className="px-2 py-1 bg-pink-500/10 border border-pink-500/30 rounded-full text-xs text-pink-400">
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-700">
              <div className="flex items-center gap-2">
                {project.status === 'Live' && <Zap className="w-4 h-4 text-green-400" />}
                {project.status === 'Building' && <Code2 className="w-4 h-4 text-blue-400" />}
                <span className={`text-sm font-semibold bg-gradient-to-r ${project.statusColor} bg-clip-text text-transparent`}>
                  {project.status}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
