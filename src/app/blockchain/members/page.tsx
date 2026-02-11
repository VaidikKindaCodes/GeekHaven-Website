'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import { AnimatedBackground } from '../components/animated-background'

interface Member {
  id: string
  name: string
  branch: string
  interest: string
  color: string
}

const members: Member[] = Array.from({ length: 24 }, (_, i) => ({
  id: `member-${i + 1}`,
  name: `Member ${i + 1}`,
  branch: ['CSE', 'ECE', 'IT', 'Mechs'][Math.floor(Math.random() * 4)],
  interest: ['Smart Contracts', 'DeFi', 'NFTs', 'Layer 2', 'Security'][
    Math.floor(Math.random() * 5)
  ],
  color: ['from-cyan-400 to-cyan-600', 'from-blue-400 to-blue-600', 'from-purple-400 to-purple-600', 'from-pink-400 to-pink-600'][
    Math.floor(Math.random() * 4)
  ],
}))

export default function Members() {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.2,
      },
    },
  }

  const nodeVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4 },
    },
  }

  return (
    <main className="relative min-h-screen bg-background overflow-hidden">
      <AnimatedBackground />

      <div className="relative z-10 container mx-auto px-4 py-12">
        <Link href="/" className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 mb-12 transition-colors font-mono text-sm">
          <ArrowLeft className="w-4 h-4" />
          RETURN TO NETWORK
        </Link>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, type: 'spring' }}
          className="text-center mb-16"
        >
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-300 bg-clip-text text-transparent font-mono">
            ◆ NETWORK NODES ◆
          </h1>
          <p className="text-lg text-purple-300/70 max-w-3xl mx-auto text-balance font-mono">
            ▬▬ Full network node registry ▬▬
          </p>
        </motion.div>

        {/* Filter bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-12 flex flex-wrap gap-3 justify-center"
        >
          {['All', 'Smart Contracts', 'DeFi', 'NFTs', 'Layer 2', 'Security'].map(
            (filter) => (
              <motion.button
                key={filter}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 rounded-lg glass-morphism border border-slate-700/50 hover:border-purple-500/50 text-slate-400 hover:text-purple-300 transition-all font-medium text-sm"
              >
                {filter}
              </motion.button>
            )
          )}
        </motion.div>

        {/* Node grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4"
        >
          {members.map((member) => (
            <motion.div
              key={member.id}
              variants={nodeVariants}
              onHoverStart={() => setHoveredNode(member.id)}
              onHoverEnd={() => setHoveredNode(null)}
              whileHover={{ scale: 1.15, zIndex: 50 }}
              className="group cursor-pointer relative"
            >
              {/* Expanded tooltip on hover */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={
                  hoveredNode === member.id
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 0.8 }
                }
                transition={{ duration: 0.2 }}
                className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 glass-morphism rounded-lg p-3 whitespace-nowrap border border-slate-700/50 z-50 pointer-events-none"
              >
                <div className="text-sm font-semibold text-purple-300">
                  {member.name}
                </div>
                <div className="text-xs text-slate-400">{member.branch}</div>
                <div className="text-xs text-purple-400 mt-1">{member.interest}</div>
              </motion.div>

              {/* Node circle */}
              <motion.div
                className={`w-full aspect-square rounded-lg bg-gradient-to-br ${member.color} flex items-center justify-center border-2 border-current relative overflow-hidden group-hover:glow-cyan`}
                whileHover={{
                  boxShadow: `0 0 30px rgba(${member.color.includes('cyan') ? '34, 211, 238' : member.color.includes('blue') ? '59, 130, 246' : member.color.includes('purple') ? '168, 85, 247' : '236, 72, 153'}, 0.8)`,
                }}
              >
                {/* Glow background on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Node identifier */}
                <div className="relative z-10 text-center">
                  <div className="text-xs font-bold text-slate-900 group-hover:text-white transition-colors">
                    {member.id.split('-')[1].padStart(2, '0')}
                  </div>
                </div>

                {/* Animated pulse ring */}
                <motion.div
                  className="absolute inset-0 rounded-lg border-2 border-current opacity-0"
                  animate={
                    hoveredNode === member.id
                      ? { scale: 1.5, opacity: 0 }
                      : {}
                  }
                  transition={{ duration: 0.6, repeat: Infinity }}
                />
              </motion.div>
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
            { label: 'Active Nodes', value: '24' },
            { label: 'Connected', value: '100%' },
            { label: 'Total Hash Power', value: '∞' },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -5 }}
              className="glass-morphism rounded-xl p-6 border border-slate-700/50 text-center"
            >
              <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                {stat.value}
              </div>
              <p className="text-slate-400">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </main>
  )
}
