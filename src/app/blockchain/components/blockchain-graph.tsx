'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { AnimatedBackground } from './animated-background'

interface Node {
  id: string
  label: string
  color: string
  x: number
  y: number
  isNav?: boolean
}

const nodes: Node[] = [
  // Primary nav nodes
  {
    id: 'about',
    label: 'Genesis Block',
    color: 'from-cyan-400 to-cyan-600',
    x: 50,
    y: 20,
    isNav: true,
  },
  {
    id: 'coordinators',
    label: 'Validators',
    color: 'from-blue-400 to-blue-600',
    x: 15,
    y: 55,
    isNav: true,
  },
  {
    id: 'members',
    label: 'Nodes',
    color: 'from-purple-400 to-purple-600',
    x: 85,
    y: 55,
    isNav: true,
  },
  {
    id: 'projects',
    label: 'Protocols',
    color: 'from-pink-400 to-pink-600',
    x: 50,
    y: 80,
    isNav: true,
  },
  // Filler nodes
  {
    id: 'node-1',
    label: '',
    color: 'from-emerald-400 to-emerald-600',
    x: 30,
    y: 35,
  },
  {
    id: 'node-2',
    label: '',
    color: 'from-orange-400 to-orange-600',
    x: 70,
    y: 35,
  },
  {
    id: 'node-3',
    label: '',
    color: 'from-red-400 to-red-600',
    x: 25,
    y: 75,
  },
  {
    id: 'node-4',
    label: '',
    color: 'from-indigo-400 to-indigo-600',
    x: 75,
    y: 75,
  },
  {
    id: 'node-5',
    label: '',
    color: 'from-yellow-400 to-yellow-600',
    x: 40,
    y: 50,
  },
  {
    id: 'node-6',
    label: '',
    color: 'from-cyan-400 to-blue-500',
    x: 60,
    y: 50,
  },
  {
    id: 'node-7',
    label: '',
    color: 'from-pink-400 to-purple-500',
    x: 20,
    y: 20,
  },
  {
    id: 'node-8',
    label: '',
    color: 'from-green-400 to-teal-500',
    x: 80,
    y: 20,
  },
]

const sectionRoutes: Record<string, string> = {
  about: '/about',
  coordinators: '/coordinators',
  members: '/members',
  projects: '/projects',
}

export function BlockchainGraph() {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)
  const router = useRouter()

  const handleNodeClick = (nodeId: string) => {
    const route = sectionRoutes[nodeId]
    if (route) {
      router.push(route)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.5,
      },
    },
  }

  const nodeVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
      },
    },
  }

  return (
    <div className="relative w-full h-screen overflow-hidden flex items-center justify-center">
      <AnimatedBackground />
      {/* SVG canvas for connections */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ filter: 'drop-shadow(0 0 10px rgba(34, 211, 238, 0.2))' }}
      >
        {nodes.map((node) => {
          if (node.id === 'about') return null
          const startX = (nodes[0].x / 100) * window.innerWidth
          const startY = (nodes[0].y / 100) * window.innerHeight
          const endX = (node.x / 100) * window.innerWidth
          const endY = (node.y / 100) * window.innerHeight
          return (
            <motion.line
              key={`line-${node.id}`}
              x1={startX}
              y1={startY}
              x2={endX}
              y2={endY}
              stroke={hoveredNode === node.id ? '#22d3ee' : 'rgba(34, 211, 238, 0.2)'}
              strokeWidth={hoveredNode === node.id ? 3 : 1.5}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5 + Math.random() * 0.5, ease: 'easeInOut' }}
              style={{
                filter: hoveredNode === node.id ? 'drop-shadow(0 0 10px rgba(34, 211, 238, 0.6))' : 'none',
              }}
            />
          )
        })}
      </svg>

      {/* Nodes container */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative w-full h-full flex items-center justify-center"
      >
        {nodes.map((node) => (
          <motion.div
            key={node.id}
            variants={nodeVariants}
            style={{
              left: `${node.x}%`,
              top: `${node.y}%`,
              transform: 'translate(-50%, -50%)',
            }}
            onHoverStart={() => setHoveredNode(node.id)}
            onHoverEnd={() => setHoveredNode(null)}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleNodeClick(node.id)}
            className={`group cursor-pointer absolute ${node.isNav ? 'hover:cursor-pointer' : 'hover:cursor-default'}`}
          >
            {/* Glow effect background */}
            <motion.div
              className={`absolute inset-0 rounded-full bg-gradient-to-r ${node.color} blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-300`}
              style={{ width: '120px', height: '120px' }}
              animate={hoveredNode === node.id ? { scale: 1.5 } : { scale: 1 }}
            />

            {/* Node circle */}
            <motion.div
              className={`relative ${node.label ? 'w-24 h-24' : 'w-16 h-16'} rounded-full bg-gradient-to-br ${node.color} flex items-center justify-center border-2 border-current shadow-lg`}
              style={{
                boxShadow: hoveredNode === node.id ? `0 0 30px rgba(34, 211, 238, 0.8)` : 'none',
              }}
            >
              {node.label && (
                <div className="text-center">
                  <div className="text-xs font-bold text-slate-900 group-hover:text-white transition-colors text-balance leading-tight">
                    {node.label}
                  </div>
                </div>
              )}
            </motion.div>

            {/* Animated pulse */}
            {node.isNav && (
              <motion.div
                className={`absolute inset-0 rounded-full bg-gradient-to-r ${node.color} opacity-0`}
                animate={hoveredNode === node.id ? { scale: 1.3, opacity: 0 } : {}}
                transition={{ duration: 0.6, repeat: Infinity }}
              />
            )}
          </motion.div>
        ))}
      </motion.div>

      {/* Center title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-10 pointer-events-none"
      >
        <h1 className="text-6xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-3 text-balance font-mono tracking-tighter">
          BLOCKCHAIN WING
        </h1>
        <p className="text-cyan-400/70 text-lg font-mono">▬▬ Network Protocol Interface ▬▬</p>
      </motion.div>
    </div>
  )
}
