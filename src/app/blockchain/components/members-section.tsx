'use client'

import { motion } from 'framer-motion'

const members = [
  { id: 1, name: 'Alex Chen', specialty: 'Smart Contracts' },
  { id: 2, name: 'Jordan Lee', specialty: 'DeFi' },
  { id: 3, name: 'Sam Patel', specialty: 'Consensus' },
  { id: 4, name: 'Emma Wilson', specialty: 'Security' },
  { id: 5, name: 'Marcus Brown', specialty: 'Game Theory' },
  { id: 6, name: 'Priya Singh', specialty: 'ZK Proofs' },
  { id: 7, name: 'Lucas Garcia', specialty: 'Layer 2' },
  { id: 8, name: 'Nina Kowalski', specialty: 'Economics' },
  { id: 9, name: 'David Kim', specialty: 'Cryptography' },
  { id: 10, name: 'Sophie Martin', specialty: 'Tokenomics' },
  { id: 11, name: 'James O\'Brien', specialty: 'Frontend' },
  { id: 12, name: 'Lisa Zhang', specialty: 'DevOps' },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
}

const nodeVariants = {
  hidden: { opacity: 0, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: 'spring', stiffness: 100 },
  },
}

export function MembersSection() {
  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
      <p className="text-slate-300">
        The active nodes in our network. Each member brings unique expertise and contributes to our research and development efforts.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {members.map((member) => (
          <motion.div
            key={member.id}
            variants={nodeVariants}
            whileHover={{ scale: 1.05, y: -5 }}
            className="group cursor-pointer"
          >
            <div className="glass-morphism p-4 rounded-lg border border-purple-500/20 hover:border-purple-500/60 transition-all text-center group-hover:bg-purple-500/10">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 mx-auto mb-2 flex items-center justify-center text-sm font-bold text-slate-900">
                {member.name.charAt(0)}
              </div>
              <h3 className="text-sm font-semibold text-white truncate">{member.name}</h3>
              <p className="text-xs text-purple-400 truncate">{member.specialty}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="pt-4 border-t border-slate-700">
        <p className="text-slate-400 text-sm">
          {members.length} active nodes contributing to the Blockchain Wing ecosystem
        </p>
      </div>
    </motion.div>
  )
}
