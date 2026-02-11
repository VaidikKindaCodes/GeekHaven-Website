'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export function AnimatedBackground() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return <div className="absolute inset-0 bg-[#020617]" />

  return (
    <div className="absolute inset-0 overflow-hidden bg-[#020617] pointer-events-none">
      {/* 1. 3D Perspective Grid */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          perspective: '1000px',
          transformStyle: 'preserve-3d',
        }}
      >
        <motion.div 
          className="absolute inset-0"
          initial={{ rotateX: 60, y: '-10%' }}
          animate={{ 
            y: ['-10%', '-15%', '-10%'],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          style={{
            backgroundImage: `
              linear-gradient(to right, #1e293b 1px, transparent 1px),
              linear-gradient(to bottom, #1e293b 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
            maskImage: 'radial-gradient(ellipse at center, black, transparent 80%)',
          }}
        />
      </div>

      {/* 2. Binary Data Streams */}
      <div className="absolute inset-0 opacity-[0.08] flex justify-around">
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={i}
            className="text-[10px] text-cyan-400 font-mono break-all w-4 leading-none"
            initial={{ y: -1000 }}
            animate={{ y: 1000 }}
            transition={{
              duration: 15 + Math.random() * 25,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * -20 // Start at different positions
            }}
          >
            {Array.from({ length: 100 }).map(() => (Math.random() > 0.5 ? '1' : '0')).join('')}
          </motion.div>
        ))}
      </div>

      {/* 3. Glowing Nebula Orbs */}
      <motion.div
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.15, 0.25, 0.15],
          x: [0, 50, 0],
          y: [0, 30, 0]
        }}
        transition={{ duration: 15, repeat: Infinity }}
        className="absolute -top-1/4 -left-1/4 w-[800px] h-[800px] bg-cyan-500/20 blur-[120px] rounded-full"
      />
      <motion.div
        animate={{ 
          scale: [1.2, 1, 1.2],
          opacity: [0.1, 0.2, 0.1],
          x: [0, -40, 0],
          y: [0, -60, 0]
        }}
        transition={{ duration: 20, repeat: Infinity }}
        className="absolute -bottom-1/4 -right-1/4 w-[600px] h-[600px] bg-purple-600/10 blur-[120px] rounded-full"
      />

      {/* 4. Scanning Line */}
      <motion.div 
        className="absolute inset-0 w-full h-[2px] bg-cyan-500/10 z-10"
        animate={{ y: ['0vh', '100vh'] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />

      {/* 5. Noise and Vignette */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(2,6,23,0.9)_100%)]" />
    </div>
  )
}