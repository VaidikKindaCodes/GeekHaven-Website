'use client'

import React, { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { AnimatedBackground } from './animated-background'

// --- Utility: Scramble Text ---
function ScrambleText({ text, delay = 0 }: { text: string; delay?: number }) {
  const [output, setOutput] = useState('')
  const glyphs = '0123456789ABCDEF!@#$%^&*()_+?><'

  useEffect(() => {
    let iteration = 0
    let interval: NodeJS.Timeout
    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        setOutput(text.split('').map((l, i) => i < iteration ? l : glyphs[Math.floor(Math.random() * glyphs.length)]).join(''))
        if (iteration >= text.length) clearInterval(interval)
        iteration += 1/3
      }, 30)
    }, delay * 1000)
    return () => { clearTimeout(timeout); clearInterval(interval); }
  }, [text, delay])
  return <span className="font-mono">{output || text.replace(/./g, '_')}</span>
}

// --- Types ---
interface Node {
  id: string; label: string; color: string; x: number; y: number; isNav?: boolean; 
  connections: string[]; subText?: string; stats?: string[];
}

const NODES: Node[] = [
  { id: 'about', label: 'PR0T0C0L_INF0', color: '#22d3ee', x: 50, y: 15, isNav: true, connections: ['node-1', 'node-2'], subText: 'Core Architecture', stats: ['v2.4.0 Stable', 'Encryption: AES-256'] },
  { id: 'coordinators', label: 'AUTH_GATEWAY', color: '#818cf8', x: 15, y: 50, isNav: true, connections: ['node-1', 'node-3', 'projects'], subText: 'Network Guardians', stats: ['Active Nodes: 124', 'Latency: 12ms'] },
  { id: 'members', label: 'PEER_INDEX', color: '#c084fc', x: 85, y: 50, isNav: true, connections: ['node-2', 'node-4'], subText: 'Decentralized Registry', stats: ['Verified: 8.2k', 'Reputation: AAA'] },
  { id: 'projects', label: 'DECENTRAL_APPS', color: '#fb7185', x: 50, y: 85, isNav: true, connections: ['node-3', 'node-4', 'node-5'], subText: 'Smart Contracts', stats: ['Deployed: 42', 'Gas Price: 12 gwei'] },
  { id: 'node-1', label: '', color: '#22d3ee', x: 30, y: 35, connections: ['node-5'] },
  { id: 'node-2', label: '', color: '#c084fc', x: 70, y: 35, connections: ['node-5'] },
  { id: 'node-3', label: '', color: '#818cf8', x: 25, y: 70, connections: [] },
  { id: 'node-4', label: '', color: '#fb7185', x: 75, y: 70, connections: [] },
  { id: 'node-5', label: '', color: '#ffffff', x: 50, y: 50, connections: [] },
]

const ROUTES: Record<string, string> = {
  about: '/blockchain/about', coordinators: '/blockchain/coordinators', members: '/blockchain/members', projects: '/blockchain/projects',
}

export function BlockchainGraph() {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)
  const [dims, setDims] = useState({ w: 0, h: 0 })
  const router = useRouter()

  useEffect(() => {
    const d = () => setDims({ w: window.innerWidth, h: window.innerHeight })
    d(); window.addEventListener('resize', d); return () => window.removeEventListener('resize', d)
  }, [])

  const activeNodeData = useMemo(() => NODES.find(n => n.id === hoveredNode), [hoveredNode])

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#020617] cursor-crosshair font-mono">
      <AnimatedBackground />

      {/* 1. SONAR RIPPLE EFFECT */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {[1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className="absolute border border-cyan-500/20 rounded-full"
            initial={{ width: 0, height: 0, opacity: 0.5 }}
            animate={{ width: '150vmax', height: '150vmax', opacity: 0 }}
            transition={{ duration: 8, repeat: Infinity, delay: i * 2, ease: "linear" }}
          />
        ))}
      </div>

      {/* 2. TOP HUD STATS */}
      <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-start z-50 pointer-events-none">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-cyan-400 text-xs">
            <span className="w-2 h-2 bg-cyan-500 animate-pulse rounded-full" />
            <ScrambleText text="SYSTEM_LIVE" />
          </div>
          <p className="text-[10px] text-white/30 uppercase tracking-[0.2em]">Hashrate: 452.1 TH/s</p>
        </div>
        <div className="text-right space-y-1">
          <p className="text-cyan-400 text-xs">0x{Math.random().toString(16).slice(2, 10).toUpperCase()}</p>
          <p className="text-[10px] text-white/30 uppercase tracking-[0.2em]">Block: #8,421,092</p>
        </div>
      </div>

      {/* 3. CORNER HUD BRACKETS */}
      <div className="absolute inset-8 pointer-events-none border-x border-white/5 z-40">
        <div className="absolute top-0 left-0 w-8 h-[1px] bg-white/20" />
        <div className="absolute top-0 right-0 w-8 h-[1px] bg-white/20" />
        <div className="absolute bottom-0 left-0 w-8 h-[1px] bg-white/20" />
        <div className="absolute bottom-0 right-0 w-8 h-[1px] bg-white/20" />
      </div>

      {/* SVG Connections */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
        <defs>
          <filter id="neon-glow"><feGaussianBlur stdDeviation="2.5" result="blur" /><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        </defs>
        {NODES.map(node => node.connections.map(tid => {
          const target = NODES.find(n => n.id === tid); if (!target) return null;
          const active = hoveredNode === node.id || hoveredNode === target.id;
          const s = { x: (node.x/100)*dims.w, y: (node.y/100)*dims.h };
          const e = { x: (target.x/100)*dims.w, y: (target.y/100)*dims.h };
          return (
            <g key={`${node.id}-${tid}`}>
              <motion.line x1={s.x} y1={s.y} x2={e.x} y2={e.y} stroke={active ? node.color : '#1e293b'} strokeWidth={active ? 2 : 1} />
              {active && (
                <motion.circle r="3" fill={node.color} filter="url(#neon-glow)" style={{ offsetPath: `path('M ${s.x} ${s.y} L ${e.x} ${e.y}')` }} animate={{ offsetDistance: "100%" }} transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }} />
              )}
            </g>
          )
        }))}
      </svg>

      {/* Nodes Container */}
      <div className="relative z-20 w-full h-full">
        {NODES.map((node) => (
          <motion.div
            key={node.id}
            className="absolute -translate-x-1/2 -translate-y-1/2 group"
            style={{ left: `${node.x}%`, top: `${node.y}%` }}
            onMouseEnter={() => setHoveredNode(node.id)}
            onMouseLeave={() => setHoveredNode(null)}
            onClick={() => node.isNav && router.push(ROUTES[node.id])}
          >
            <div className={`relative flex items-center justify-center ${node.isNav ? 'w-24 h-24' : 'w-6 h-6'}`}>
              <div 
                className="absolute inset-0 opacity-20 group-hover:opacity-100 transition-all duration-500 scale-110 group-hover:scale-125"
                style={{ backgroundColor: node.color, clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)' }}
              />
              <div 
                className={`z-10 rounded-full border-2 transition-all duration-300 ${node.isNav ? 'w-10 h-10 border-white/50' : 'w-2 h-2 border-white/20'}`}
                style={{ backgroundColor: hoveredNode === node.id ? node.color : 'transparent', boxShadow: hoveredNode === node.id ? `0 0 15px ${node.color}` : 'none' }}
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* 4. DYNAMIC HOVER CARD */}
      <AnimatePresence>
        {activeNodeData?.isNav && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="absolute left-12 bottom-12 w-72 z-50 pointer-events-none"
          >
            <div className="relative p-4 bg-slate-950/80 backdrop-blur-xl border-l-4 border-cyan-500" style={{ borderLeftColor: activeNodeData.color }}>
              <div className="text-[10px] text-white/40 mb-1 flex justify-between">
                <span>SECTOR_{activeNodeData.id.toUpperCase()}</span>
                <span>ID: {Math.floor(Math.random()*999)}</span>
              </div>
              <h3 className="text-xl font-black text-white mb-1 tracking-tighter">
                <ScrambleText text={activeNodeData.label} />
              </h3>
              <p className="text-xs text-cyan-400 mb-4 opacity-70 italic">{activeNodeData.subText}</p>
              
              <div className="space-y-2 border-t border-white/10 pt-4">
                {activeNodeData.stats?.map((s, i) => (
                  <div key={i} className="flex justify-between text-[10px]">
                    <span className="text-white/40">{s.split(':')[0]}:</span>
                    <span className="text-white font-bold">{s.split(':')[1]}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Center Hero Title */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none text-center z-30">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-8">
          <h1 className="text-6xl md:text-8xl font-black text-white tracking-[-0.05em]">
            <ScrambleText text="BLOCKCHAIN" delay={0.2} />
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
              <ScrambleText text="WING" delay={0.8} />
            </span>
          </h1>
          <div className="h-1 w-full bg-white/5 mt-4 overflow-hidden">
            <motion.div 
              className="h-full bg-cyan-500"
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
          </div>
        </motion.div>
      </div>

      {/* Bottom Terminal Logs */}
      <div className="absolute bottom-6 right-6 font-mono text-[9px] text-cyan-500/40 text-right space-y-1 pointer-events-none hidden md:block">
        <p className="text-white/20">SYSTEM_LOG_v4.0.2</p>
        <p>{`> UPLINK_ESTABLISHED: 0x${Math.random().toString(16).slice(2,8)}`}</p>
        <p>{`> DECRYPTING_NODE_MESH... DONE`}</p>
        <p className="animate-pulse">{`> LISTENING_FOR_PACKETS...`}</p>
      </div>
    </div>
  )
}