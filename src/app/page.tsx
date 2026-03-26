'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'
import { 
  Globe, 
  Users, 
  Building2, 
  Mail, 
  MapPin, 
  ExternalLink, 
  Cpu, 
  Rocket, 
  Target,
  GraduationCap,
  Handshake,
  Zap,
  Award,
  Network,
  MessageCircle,
  User,
  Sparkles,
  PartyPopper,
  Mic,
  UsersRound,
  BookOpen,
  DollarSign,
  TrendingUp,
  PieChart,
  BarChart3,
  CircleDollarSign,
  Cog,
  Settings,
  ArrowRight
} from 'lucide-react'
import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'

// Glitch Text Component
function GlitchText({ text }: { text: string }) {
  return (
    <span className="relative inline-block">
      <span className="relative z-10">{text}</span>
      <span className="absolute top-0 left-0 -ml-0.5 text-cyan-500 opacity-70 animate-glitch-1" aria-hidden="true">{text}</span>
      <span className="absolute top-0 left-0 ml-0.5 text-orange-500 opacity-70 animate-glitch-2" aria-hidden="true">{text}</span>
    </span>
  )
}

// Scanning Line Animation
function ScanningLine() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-scan" />
    </div>
  )
}

// Detail Item Component - Each item has its own hover state
function DetailItem({ 
  detail, 
  accentColor 
}: { 
  detail: { label: string; content: string }
  accentColor: string
}) {
  const [isHovered, setIsHovered] = useState(false)
  const [typedText, setTypedText] = useState('')
  const [hasTyped, setHasTyped] = useState(false)

  useEffect(() => {
    if (isHovered && !hasTyped) {
      const fullText = detail.content
      let index = 0
      setTypedText('')
      const interval = setInterval(() => {
        if (index < fullText.length) {
          setTypedText(fullText.slice(0, index + 1))
          index++
        } else {
          clearInterval(interval)
          setHasTyped(true)
        }
      }, 20)
      return () => clearInterval(interval)
    }
  }, [isHovered, detail.content, hasTyped])

  useEffect(() => {
    if (!isHovered) {
      setHasTyped(false)
      setTypedText('')
    }
  }, [isHovered])

  const colorMap: Record<string, { bg: string; border: string; text: string; glow: string }> = {
    'cyan-500': { 
      bg: 'from-cyan-50 to-slate-50', 
      border: 'border-cyan-200', 
      text: 'text-cyan-700',
      glow: 'shadow-cyan-100'
    },
    'orange-500': { 
      bg: 'from-orange-50 to-slate-50', 
      border: 'border-orange-200', 
      text: 'text-orange-700',
      glow: 'shadow-orange-100'
    },
    'emerald-500': { 
      bg: 'from-emerald-50 to-slate-50', 
      border: 'border-emerald-200', 
      text: 'text-emerald-700',
      glow: 'shadow-emerald-100'
    },
    'purple-500': { 
      bg: 'from-purple-50 to-slate-50', 
      border: 'border-purple-200', 
      text: 'text-purple-700',
      glow: 'shadow-purple-100'
    }
  }

  const colors = colorMap[accentColor] || colorMap['cyan-500']

  return (
    <div 
      className={`
        p-3 rounded-lg transition-colors duration-200 cursor-pointer relative overflow-hidden border
        ${isHovered 
          ? `bg-gradient-to-r ${colors.bg} ${colors.border}` 
          : 'bg-slate-50 hover:bg-slate-100 border-transparent'}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated glow line on left */}
      <div 
        className={`
          absolute left-0 top-0 bottom-0 w-1 transition-all duration-300
          ${isHovered ? 'opacity-100' : 'opacity-0'}
          ${accentColor === 'cyan-500' ? 'bg-cyan-400' : 
            accentColor === 'orange-500' ? 'bg-orange-400' : 
            accentColor === 'emerald-500' ? 'bg-emerald-400' : 'bg-purple-400'}
        `}
      />
      
      <div className="flex items-center gap-2 mb-1">
        <Badge 
          variant="outline" 
          className={`text-xs font-mono transition-all duration-300 ${
            isHovered ? colors.text + ' ' + colors.border : ''
          }`}
        >
          {detail.label}
        </Badge>
        <span className={`text-xs opacity-60 transition-opacity duration-300 ${isHovered ? 'opacity-60' : 'opacity-0'}`}>
          ●
        </span>
      </div>
      <p className={`text-sm transition-all duration-300 ${isHovered ? colors.text : 'text-slate-600'}`}>
        {isHovered && typedText ? typedText : detail.content}
      </p>
    </div>
  )
}

// Terminal Card Component
function TerminalCard({ 
  terminal, 
  title, 
  details, 
  icon: Icon,
  accentColor,
  layout = 'default',
  images = []
}: { 
  terminal: string
  title: string
  details: { label: string; content: string }[]
  icon: React.ElementType
  accentColor: string
  layout?: 'default' | 'horizontal'
  images?: string[]
}) {
  const [isActive, setIsActive] = useState(false)

  const colorMap: Record<string, { indicator: string; icon: string; header: string }> = {
    'cyan-500': { indicator: 'bg-cyan-400', icon: 'text-cyan-500', header: 'text-cyan-600' },
    'orange-500': { indicator: 'bg-orange-400', icon: 'text-orange-500', header: 'text-orange-600' },
    'emerald-500': { indicator: 'bg-emerald-400', icon: 'text-emerald-500', header: 'text-emerald-600' },
    'purple-500': { indicator: 'bg-purple-400', icon: 'text-purple-500', header: 'text-purple-600' }
  }

  const colors = colorMap[accentColor] || colorMap['cyan-500']

  return (
    <Card 
      className={`
        relative overflow-hidden cursor-pointer transition-all duration-300 
        ${isActive ? 'shadow-2xl border-slate-300' : 'shadow-lg hover:shadow-xl border-slate-200'}
        bg-gradient-to-br from-slate-50 to-white border-2
      `}
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
    >
      {/* Terminal Header */}
      <div className={`px-4 py-2 flex items-center gap-2 border-b ${isActive ? 'bg-gradient-to-r from-slate-100 to-slate-50' : 'bg-slate-50'}`}>
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-400" />
          <div className="w-3 h-3 rounded-full bg-yellow-400" />
          <div className="w-3 h-3 rounded-full bg-green-400" />
        </div>
        <span className={`font-mono text-sm font-semibold transition-colors duration-300 ${isActive ? colors.header : 'text-slate-500'}`}>
          {terminal}
        </span>
      </div>

      {/* Active indicator */}
      <div className={`absolute top-0 right-0 w-2 h-full ${colors.indicator} transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-0'}`} />

      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Icon className={`w-5 h-5 transition-colors duration-300 ${isActive ? colors.icon + ' animate-pulse' : 'text-slate-400'}`} />
          <span className="text-slate-700">{title}</span>
        </CardTitle>
      </CardHeader>

      <CardContent className={layout === 'horizontal' ? 'p-0' : 'space-y-3'}>
        {layout === 'horizontal' ? (
          // Horizontal layout for Terminal D
          <div className="flex">
            {/* Left side: Images */}
            <div className="flex flex-col gap-3 p-4 border-r border-dashed border-slate-200 min-w-[100px]">
              {[0, 1, 2].map((i) => (
                <div 
                  key={i}
                  className={`
                    w-20 h-20 rounded-lg overflow-hidden transition-all duration-300
                    ${images[i] 
                      ? 'border-2 border-slate-200' 
                      : `border-2 border-dashed ${isActive ? 'border-purple-300 bg-purple-50/50' : 'border-slate-200 bg-slate-50'} flex items-center justify-center`}
                  `}
                >
                  {images[i] ? (
                    <Image 
                      src={images[i]} 
                      alt={`${terminal} image ${i + 1}`}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                      unoptimized
                    />
                  ) : (
                    <span className={`text-xs font-mono ${isActive ? 'text-purple-400' : 'text-slate-300'}`}>
                      IMG_{i + 1}
                    </span>
                  )}
                </div>
              ))}
            </div>
            {/* Right side: Details */}
            <div className="flex-1 p-4 space-y-3 min-h-[280px]">
              {details.map((detail, index) => (
                <DetailItem key={index} detail={detail} accentColor="purple-500" />
              ))}
            </div>
          </div>
        ) : (
          // Default layout for Terminals A, B, C
          <>
            {details.map((detail, index) => (
              <DetailItem key={index} detail={detail} accentColor={accentColor} />
            ))}

            {/* Image slots */}
            <div className="grid grid-cols-3 gap-2 mt-4">
              {[0, 1, 2].map((i) => (
                <div 
                  key={i}
                  className={`
                    aspect-square rounded-lg overflow-hidden transition-all duration-300
                    ${images[i] 
                      ? 'border-2 border-slate-200' 
                      : `border-2 border-dashed ${isActive ? (accentColor === 'purple-500' ? 'border-purple-300 bg-purple-50/50' : accentColor === 'orange-500' ? 'border-orange-300 bg-orange-50/50' : accentColor === 'emerald-500' ? 'border-emerald-300 bg-emerald-50/50' : 'border-cyan-300 bg-cyan-50/50') : 'border-slate-200 bg-slate-50'} flex items-center justify-center`}
                  `}
                >
                  {images[i] ? (
                    <Image 
                      src={images[i]} 
                      alt={`${terminal} image ${i + 1}`}
                      width={120}
                      height={120}
                      className="w-full h-full object-cover"
                      unoptimized
                    />
                  ) : (
                    <span className={`text-xs font-mono ${isActive ? (accentColor === 'purple-500' ? 'text-purple-400' : accentColor === 'orange-500' ? 'text-orange-400' : accentColor === 'emerald-500' ? 'text-emerald-400' : 'text-cyan-400') : 'text-slate-300'}`}>
                      IMG_{i + 1}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}

// Sustainability Card Component with enhanced animations
function SustainabilityCard({ 
  title, 
  description, 
  icon: Icon, 
  colorScheme,
  delay = 0
}: { 
  title: string
  description: string
  icon: React.ElementType
  colorScheme: 'cyan' | 'orange' | 'emerald'
  delay?: number
}) {
  const [isHovered, setIsHovered] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay)
    return () => clearTimeout(timer)
  }, [delay])

  const colorClasses = {
    cyan: {
      border: 'border-l-cyan-400',
      iconBg: 'bg-gradient-to-br from-cyan-100 to-teal-100',
      iconColor: 'text-cyan-600',
      glowColor: 'from-cyan-400/30 to-teal-400/30',
      shimmerColor: 'via-cyan-200'
    },
    orange: {
      border: 'border-l-orange-400',
      iconBg: 'bg-gradient-to-br from-orange-100 to-amber-100',
      iconColor: 'text-orange-600',
      glowColor: 'from-orange-400/30 to-amber-400/30',
      shimmerColor: 'via-orange-200'
    },
    emerald: {
      border: 'border-l-emerald-400',
      iconBg: 'bg-gradient-to-br from-emerald-100 to-teal-100',
      iconColor: 'text-emerald-600',
      glowColor: 'from-emerald-400/30 to-teal-400/30',
      shimmerColor: 'via-emerald-200'
    }
  }

  const colors = colorClasses[colorScheme]

  return (
    <div 
      className={`
        transition-all duration-700 ease-out
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
      `}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <Card 
        className={`
          relative overflow-hidden border-l-4 ${colors.border}
          transition-all duration-500 ease-out
          ${isHovered ? 'shadow-2xl scale-[1.02]' : 'shadow-lg'}
        `}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Animated glow effect */}
        <div 
          className={`
            absolute inset-0 bg-gradient-to-r ${colors.glowColor}
            transition-opacity duration-500
            ${isHovered ? 'opacity-100' : 'opacity-0'}
          `}
        />

        {/* Shimmer effect */}
        {isHovered && (
          <div className="absolute inset-0 overflow-hidden">
            <div 
              className={`
                absolute inset-0 bg-gradient-to-r from-transparent ${colors.shimmerColor} to-transparent
                animate-shimmer
              `}
              style={{ 
                transform: 'translateX(-100%)',
                animation: 'shimmer 1.5s ease-in-out infinite'
              }}
            />
          </div>
        )}

        {/* Pulsing border effect */}
        {isHovered && (
          <div className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b ${colors.glowColor} animate-pulse`} />
        )}

        <CardContent className="relative p-4">
          <div className="flex items-start gap-3">
            <div 
              className={`
                w-10 h-10 rounded-lg ${colors.iconBg} 
                flex items-center justify-center flex-shrink-0
                transition-all duration-500 ease-out
                ${isHovered ? 'scale-110 rotate-6 shadow-lg' : 'scale-100 rotate-0'}
              `}
            >
              <Icon 
                className={`
                  w-5 h-5 ${colors.iconColor}
                  transition-all duration-500
                  ${isHovered ? 'scale-110' : 'scale-100'}
                `} 
              />
            </div>
            <div className="flex-1">
              <h3 
                className={`
                  text-base font-bold text-slate-800 mb-1
                  transition-all duration-300
                  ${isHovered ? 'translate-x-1' : 'translate-x-0'}
                `}
              >
                {title}
              </h3>
              <p 
                className={`
                  text-sm text-slate-600 transition-all duration-300
                  ${isHovered ? 'translate-x-1 text-slate-700' : 'translate-x-0'}
                `}
              >
                {description}
              </p>
            </div>
          </div>

          {/* Animated particles */}
          {isHovered && (
            <div className="absolute top-2 right-2">
              <Sparkles className={`w-4 h-4 ${colors.iconColor} animate-pulse`} />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

// Positive Cycle Engine Component with Framer Motion
function PositiveCycleEngine() {
  const [isHovered, setIsHovered] = useState(false)
  const [activeNode, setActiveNode] = useState<number | null>(null)
  
  const nodes = [
    { label: 'Funding', icon: DollarSign, color: 'from-emerald-400 to-teal-500', description: 'Financial resources enable team growth' },
    { label: 'Results', icon: TrendingUp, color: 'from-cyan-400 to-blue-500', description: 'Achievements attract new opportunities' },
    { label: 'New Members', icon: Users, color: 'from-orange-400 to-amber-500', description: 'Talent drives continued success' },
  ]

  return (
    <div 
      className="relative w-full h-full min-h-[550px] flex items-center justify-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div 
        className="relative"
        initial={{ width: 320, height: 320 }}
        animate={{ 
          width: isHovered ? 400 : 320, 
          height: isHovered ? 400 : 320 
        }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
      {/* Background glow */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(34, 211, 238, 0.1) 0%, transparent 70%)',
        }}
        animate={isHovered ? {
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5]
        } : {}}
        transition={{ duration: 2, repeat: Infinity }}
      />
      
      {/* Central circle with glow */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div 
          className="relative w-44 h-44 rounded-full bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center shadow-2xl"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: isHovered ? 1.1 : 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          whileHover={{ scale: 1.15 }}
        >
          {/* Inner rotating gradient */}
          <motion.div
            className="absolute inset-2 rounded-full bg-gradient-to-br from-slate-700 to-slate-800"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
          
          {/* Pulsing rings inside */}
          <motion.div
            className="absolute inset-4 rounded-full border border-cyan-400/30"
            animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          
          <div className="relative z-10 text-center px-4">
            <motion.div
              animate={isHovered ? { rotate: [0, 10, -10, 0] } : {}}
              transition={{ duration: 0.5 }}
            >
              <Zap className="w-10 h-10 text-cyan-400 mx-auto mb-2" />
            </motion.div>
            <span className="text-white text-xs font-bold tracking-wider">THE POSITIVE</span>
            <span className="block text-cyan-400 text-sm font-bold tracking-wider">CYCLE ENGINE</span>
          </div>
        </motion.div>
      </div>

      {/* Circular flow path */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400">
        <defs>
          <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.2" />
            <stop offset="50%" stopColor="#22d3ee" stopOpacity="1" />
            <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.2" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Outer ring path */}
        <circle 
          cx="200" cy="200" r="150" 
          fill="none" 
          stroke="url(#flowGradient)" 
          strokeWidth="2"
          strokeDasharray="8 4"
          className="animate-spin"
          style={{ transformOrigin: 'center', animationDuration: '30s' }}
        />
        
        {/* Glowing trace */}
        <motion.circle 
          cx="200" cy="200" r="150" 
          fill="none" 
          stroke="#22d3ee" 
          strokeWidth={isHovered ? 4 : 3}
          strokeDasharray="50 900"
          strokeLinecap="round"
          filter="url(#glow)"
          animate={{ strokeDashoffset: [-950, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Particle dots - more particles when hovered */}
        {(isHovered ? [0, 60, 120, 180, 240, 300] : [0, 120, 240]).map((angle, i) => (
          <motion.circle
            key={i}
            r={isHovered ? 5 : 4}
            fill="#22d3ee"
            filter="url(#glow)"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0, 1, 0],
              cx: [200 + 150 * Math.cos((angle * Math.PI) / 180), 200 + 150 * Math.cos(((angle + 60) * Math.PI) / 180)],
              cy: [200 + 150 * Math.sin((angle * Math.PI) / 180), 200 + 150 * Math.sin(((angle + 60) * Math.PI) / 180)]
            }}
            transition={{ 
              duration: isHovered ? 2 : 4, 
              repeat: Infinity, 
              ease: "linear",
              delay: i * 0.3
            }}
          />
        ))}
      </svg>

      {/* Node circles */}
      {nodes.map((node, index) => {
        const angle = (index * 120 - 90) * (Math.PI / 180)
        const x = 50 + 35 + 30 * Math.cos(angle)
        const y = 50 + 35 + 30 * Math.sin(angle)
        const Icon = node.icon
        const isActive = activeNode === index
        
        return (
          <motion.div
            key={node.label}
            className="absolute"
            style={{
              left: `${x}%`,
              top: `${y}%`,
              transform: 'translate(-50%, -50%)'
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3 + index * 0.2, duration: 0.5 }}
          >
            <motion.div 
              className={`w-24 h-24 rounded-full bg-gradient-to-br ${node.color} flex items-center justify-center shadow-lg cursor-pointer relative`}
              whileHover={{ scale: 1.2 }}
              animate={{ 
                boxShadow: isActive 
                  ? ['0 0 30px rgba(34, 211, 238, 0.6)', '0 0 50px rgba(34, 211, 238, 0.8)', '0 0 30px rgba(34, 211, 238, 0.6)']
                  : ['0 0 20px rgba(34, 211, 238, 0.3)', '0 0 40px rgba(34, 211, 238, 0.5)', '0 0 20px rgba(34, 211, 238, 0.3)']
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
              onHoverStart={() => setActiveNode(index)}
              onHoverEnd={() => setActiveNode(null)}
            >
              <Icon className="w-10 h-10 text-white" />
              
              {/* Active indicator ring */}
              {isActive && (
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-white/50"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              )}
            </motion.div>
            
            {/* Label */}
            <motion.span 
              className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-sm font-semibold text-slate-600 whitespace-nowrap"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 + index * 0.2 }}
            >
              {node.label}
            </motion.span>
            
            {/* Description tooltip on hover */}
            <motion.div
              className="absolute -top-16 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 10 }}
              transition={{ duration: 0.2 }}
            >
              {node.description}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 bg-slate-800 rotate-45" />
            </motion.div>
          </motion.div>
        )
      })}

      {/* Animated arrows between nodes */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 400">
        {nodes.map((_, index) => {
          const startAngle = (index * 120 - 90) * (Math.PI / 180)
          const endAngle = (((index + 1) % 3) * 120 - 90) * (Math.PI / 180)
          const midAngle = (startAngle + endAngle) / 2
          
          return (
            <motion.path
              key={index}
              d={`M ${200 + 100 * Math.cos(startAngle)} ${200 + 100 * Math.sin(startAngle)} 
                  Q ${200 + 130 * Math.cos(midAngle)} ${200 + 130 * Math.sin(midAngle)}
                  ${200 + 100 * Math.cos(endAngle)} ${200 + 100 * Math.sin(endAngle)}`}
              fill="none"
              stroke={isHovered ? "#22d3ee" : "#94a3b8"}
              strokeWidth={isHovered ? 2.5 : 1.5}
              strokeDasharray="4 4"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 1 + index * 0.3, duration: 0.8 }}
            />
          )
        })}
      </svg>
      </motion.div>
    </div>
  )
}

// Donut Chart Component
function DonutChart({ 
  data, 
  title, 
  total 
}: { 
  data: { name: string; value: number; color: string }[]
  title: string
  total: number
}) {
  return (
    <Card className="bg-white/80 backdrop-blur-sm border-slate-200 shadow-lg">
      <CardContent className="p-6">
        <h4 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
          <PieChart className="w-5 h-5 text-cyan-500" />
          {title}
        </h4>
        <div className="flex items-center gap-6">
          <div className="relative w-36 h-36">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsPieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={65}
                  paddingAngle={2}
                  dataKey="value"
                  stroke="none"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: number) => [`¥${value.toLocaleString()}`, '']}
                  contentStyle={{ 
                    backgroundColor: 'rgba(255,255,255,0.95)', 
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'
                  }}
                />
              </RechartsPieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <span className="text-xs text-slate-500">Total</span>
                <span className="block text-sm font-bold text-slate-800">¥{total.toLocaleString()}</span>
              </div>
            </div>
          </div>
          <div className="flex-1 space-y-2">
            {data.map((item, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-slate-600">{item.name}</span>
                </div>
                <span className="font-medium text-slate-800">¥{item.value.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Progress Bar Component for Funding Usage
function FundingUsageChart({ data }: { data: { name: string; value: number; color: string }[] }) {
  const maxValue = Math.max(...data.map(d => d.value))
  
  return (
    <Card className="bg-white/80 backdrop-blur-sm border-slate-200 shadow-lg">
      <CardContent className="p-6">
        <h4 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-cyan-500" />
          Funding Usage
        </h4>
        <div className="space-y-4">
          {data.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-600">{item.name}</span>
                <span className="font-medium text-slate-800">¥{item.value.toLocaleString()}</span>
              </div>
              <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: item.color }}
                  initial={{ width: 0 }}
                  animate={{ width: `${(item.value / maxValue) * 100}%` }}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.8, ease: "easeOut" }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

// Team Member Card Component - Square Design
function TeamMemberCard({ name, index, role, isCaptain, colorTheme = 'default', photo }: { name: string; index: number; role: string; isCaptain: boolean; colorTheme?: 'default' | 'purple' | 'yellow'; photo?: string }) {
  const [isHovered, setIsHovered] = useState(false)

  // Color schemes
  const colorSchemes = {
    default: {
      glow: 'bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 blur-md',
      card: 'bg-white border-slate-100 shadow-md',
      badge: 'bg-gradient-to-r from-cyan-400 to-teal-500',
      photoBorder: 'border-slate-200 bg-gradient-to-br from-slate-50 to-slate-100',
      nameHover: 'text-cyan-600',
      roleColor: 'text-slate-400',
      hoverRing: 'ring-cyan-200',
      scanLine: 'via-cyan-400'
    },
    purple: {
      glow: 'bg-gradient-to-r from-purple-400 via-violet-400 to-indigo-400 blur-md',
      card: 'bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200 shadow-md shadow-purple-100',
      badge: 'bg-gradient-to-r from-purple-400 to-violet-500',
      photoBorder: 'border-purple-300 bg-gradient-to-br from-purple-100 to-violet-100',
      nameHover: 'text-purple-600',
      roleColor: 'text-purple-400',
      hoverRing: 'ring-purple-200',
      scanLine: 'via-purple-400'
    },
    yellow: {
      glow: 'bg-gradient-to-r from-yellow-300 via-amber-300 to-orange-300 blur-md',
      card: 'bg-gradient-to-br from-yellow-50 to-amber-50 border-yellow-200 shadow-md shadow-yellow-100',
      badge: 'bg-gradient-to-r from-yellow-400 to-amber-400',
      photoBorder: 'border-yellow-300 bg-gradient-to-br from-yellow-100 to-amber-100',
      nameHover: 'text-amber-600',
      roleColor: 'text-amber-500',
      hoverRing: 'ring-yellow-200',
      scanLine: 'via-amber-400'
    },
    captain: {
      glow: 'bg-gradient-to-r from-amber-400 via-orange-400 to-red-400 blur-md',
      card: 'bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200 shadow-lg shadow-amber-100',
      badge: 'bg-gradient-to-r from-amber-400 to-orange-500',
      photoBorder: 'border-amber-300 bg-gradient-to-br from-amber-100 to-orange-100',
      nameHover: 'text-orange-600',
      roleColor: 'text-amber-500 font-medium',
      hoverRing: 'ring-amber-200',
      scanLine: 'via-amber-400'
    }
  }

  const colors = isCaptain ? colorSchemes.captain : colorSchemes[colorTheme]

  return (
    <div
      className={`
        relative group cursor-pointer transition-all duration-300 w-full
        ${isHovered ? 'scale-105 z-10' : 'scale-100'}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Glow effect */}
      <div 
        className={`
          absolute -inset-1 rounded-xl opacity-0 transition-opacity duration-300
          ${isHovered ? 'opacity-100' : ''}
          ${colors.glow}
        `}
      />

      <div className={`
        relative aspect-square w-full rounded-lg border-2 overflow-hidden
        flex flex-col items-center justify-center p-4
        transition-all duration-300
        ${colors.card}
      `}>
        {/* Digital ID badge - Top Right */}
        <div className={`
          absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center
          text-sm font-mono font-bold text-white
          ${colors.badge}
        `}>
          {String(index).padStart(2, '0')}
        </div>

        {/* Photo Placeholder - Square */}
        <div className={`
          w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-300
          ${isHovered ? `ring-2 ${colors.hoverRing} ring-offset-2 scale-105` : ''}
          ${colors.photoBorder}
          flex items-center justify-center flex-shrink-0
        `}>
          <Image 
            src={photo || "/avatar-placeholder.png"} 
            alt={name}
            width={80}
            height={80}
            className={`w-full h-full object-cover ${photo ? '' : 'opacity-70'}`}
            unoptimized
          />
        </div>

        {/* Name */}
        <p className={`
          font-semibold text-sm mt-3 text-center transition-colors duration-300
          ${isHovered ? colors.nameHover : 'text-slate-700'}
        `}>
          {name}
        </p>
        
        {/* Role */}
        {!isCaptain && (
          <p className={`
            text-xs mt-1 text-center transition-colors duration-300 leading-tight
            ${colors.roleColor}
          `}>
            {role}
          </p>
        )}
        
        {isCaptain && (
          <Badge className="mt-1.5 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-[10px] px-2 py-0.5">
            CAPTAIN
          </Badge>
        )}

        {/* Scan line effect on hover */}
        {isHovered && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className={`absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent ${colors.scanLine} to-transparent animate-scan-vertical`} />
          </div>
        )}
      </div>
    </div>
  )
}

// Main Page Component
export default function Home() {
  const [scrollY, setScrollY] = useState(0)
  const [logoHovered, setLogoHovered] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const teamMembers = [
    { name: 'Fan Haoyu', role: 'Website Developer', isCaptain: false, colorTheme: 'purple' as const, photo: '/member-01.png' },
    { name: 'Jiang Shan', role: 'Driver', isCaptain: false, photo: '/member-02.png' },
    { name: 'Zhang Yisen', role: 'Engineering Leader', isCaptain: false, photo: '/member-03.png' },
    { name: 'Max Shi', role: 'Captain', isCaptain: true, photo: '/member-04.png' },
    { name: 'Jin Yinuo', role: 'Vice-Captain', isCaptain: false, colorTheme: 'yellow' as const, photo: '/member-05.png' },
    { name: 'Wu Yueyang', role: 'Vice-Captain', isCaptain: false, colorTheme: 'yellow' as const, photo: '/member-06.png' },
    { name: 'Huang Xingning', role: 'Intelligencer', isCaptain: false, photo: '/member-07.png' },
    { name: 'Bian Zheyu', role: 'Player', isCaptain: false, photo: '/member-08.png' },
    { name: 'Hu Gaoxuan', role: 'Programmer', isCaptain: false, photo: '/member-09.png' },
    { name: 'Zhou Xingyu', role: 'Programmer', isCaptain: false, photo: '/member-10.png' },
    { name: 'Yang Jiahe', role: 'Driver', isCaptain: false, photo: '/member-11.png' },
    { name: 'Xu Chuqiao', role: 'Coach', isCaptain: false, photo: '/member-12.png' },
    { name: 'Zou Chucheng', role: 'Programmer', isCaptain: false, photo: '/member-13.png' },
    { name: 'Xia Xikai', role: 'Human Player', isCaptain: false, photo: '/member-14.png' },
    { name: 'Jiang Siyu', role: 'Player', isCaptain: false, photo: '/member-15.png' },
    { name: 'Wu Hao', role: 'Programmer', isCaptain: false, photo: '/member-16.png' },
    { name: 'Cui Tianchang', role: 'Programmer', isCaptain: false, photo: '/member-17.png' },
    { name: 'Xujia', role: 'Engineering', isCaptain: false, photo: '/member-18.png' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-cyan-50">
      {/* Mission Control Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-16">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Grid pattern */}
          <div 
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgb(6, 182, 212) 1px, transparent 1px),
                linear-gradient(to bottom, rgb(6, 182, 212) 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px'
            }}
          />
          
          {/* Floating orbs */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-200 rounded-full blur-3xl opacity-20 animate-float" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-200 rounded-full blur-3xl opacity-20 animate-float-delayed" />
        </div>

        <ScanningLine />

        {/* Content */}
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          {/* Team Logo - Updated with hover scale effect */}
          <div className="mb-8 pt-6 mt-2 inline-flex items-center justify-center">
            <div 
              className="relative cursor-pointer transition-transform duration-700 ease-out hover:scale-[2.25] origin-center"
              onMouseEnter={() => setLogoHovered(true)}
              onMouseLeave={() => setLogoHovered(false)}
            >
              <div className={`
                w-28 h-28 rounded-full overflow-hidden shadow-2xl shadow-cyan-200/50
                transition-all duration-500 ease-out
                ${logoHovered ? 'shadow-cyan-300/70 ring-4 ring-cyan-200/50' : ''}
              `}>
                <Image 
                  src="/team-logo.png" 
                  alt="TEAM 6353 Logo" 
                  width={224}
                  height={224}
                  className="w-full h-full object-cover"
                  priority
                  unoptimized
                />
              </div>
              {/* Animated ring on hover */}
              <div 
                className={`
                  absolute -inset-4 rounded-full border-2 border-cyan-300/80 
                  transition-all duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)]
                  ${logoHovered ? 'opacity-100 scale-[1.15]' : 'opacity-0 scale-50'}
                `}
              />
              {/* Second animated ring */}
              <div 
                className={`
                  absolute -inset-8 rounded-full border border-cyan-200/60 
                  transition-all duration-[1200ms] ease-[cubic-bezier(0.4,0,0.2,1)]
                  ${logoHovered ? 'opacity-100 scale-[1.08]' : 'opacity-0 scale-50'}
                `}
              />
              {/* Third animated ring */}
              <div 
                className={`
                  absolute -inset-12 rounded-full border border-cyan-100/40 
                  transition-all duration-[1500ms] ease-[cubic-bezier(0.4,0,0.2,1)]
                  ${logoHovered ? 'opacity-100 scale-[1.02]' : 'opacity-0 scale-50'}
                `}
              />
              {/* Ping effect when not hovered */}
              {!logoHovered && (
                <div className="absolute -inset-2 rounded-full border-2 border-cyan-300 animate-ping opacity-20" />
              )}
            </div>
          </div>

          {/* Main Title with Glitch Effect */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight">
            <GlitchText text="EFZ Robotics-6353" />
            <span className="block mt-2 text-3xl md:text-4xl lg:text-5xl font-light text-slate-500">
              <GlitchText text="——REBUILT——" />
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-cyan-600 font-medium mb-4 tracking-wide">
            A Decade of Engineering Heritage (2016-2026) | EFZ Shanghai
          </p>

          {/* Description */}
          <p className="text-xl md:text-2xl text-slate-600 mb-12 max-w-2xl mx-auto">
            "We redefine the boundary between simplicity and power."
          </p>

          {/* Team Photo */}
          <div className="relative max-w-3xl mx-auto">
            <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl shadow-cyan-200/30 border-2 border-cyan-200">
              <Image 
                src="/hero-team-photo.jpg" 
                alt="TEAM 6353 Group Photo" 
                fill
                className="object-cover"
                priority
                unoptimized
              />
            </div>
            
            {/* Decorative corners */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-cyan-400 rounded-tl-lg" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-cyan-400 rounded-tr-lg" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-cyan-400 rounded-bl-lg" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-cyan-400 rounded-br-lg" />
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
            <div className="w-8 h-12 rounded-full border-2 border-cyan-300 flex items-start justify-center p-2">
              <div className="w-1.5 h-3 bg-cyan-400 rounded-full animate-scroll-down" />
            </div>
          </div>
        </div>
      </section>

      {/* 360° Connectivity Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-gradient-to-r from-cyan-500 to-teal-500 text-white px-4 py-1">
              INTERACTIVE DASHBOARD
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
              360° CONNECTIVITY
            </h2>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto">
              Explore our global network through three strategic terminals. Hover over each terminal to reveal detailed information.
            </p>
          </div>

          {/* Terminal Dashboard */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <TerminalCard
              terminal="TERMINAL A"
              title="Campus Integration"
              icon={GraduationCap}
              accentColor="cyan-500"
              images={['/terminal-a-1.png', '/terminal-a-2.png', '/terminal-a-3.jpg']}
              details={[
                { label: 'MENTORING', content: 'Mentoring Qiu Chengtong Class (Top STEM students) - guiding the next generation of engineers' },
                { label: 'EVENTS', content: 'Campus Open Days - Showcasing innovation to prospective students and families' },
                { label: 'SOCIAL', content: 'Annual Robot Carnival + Collaborative events with Team 6907 (Fudan International)' },
              ]}
            />

            <TerminalCard
              terminal="TERMINAL B"
              title="Global Connectivity"
              icon={Globe}
              accentColor="orange-500"
              images={['/terminal-b-1.jpg', '/terminal-b-2.jpg', '/terminal-b-3.jpg']}
              details={[
                { label: 'MENTORSHIP', content: 'Cross-border mentorship for Team 11429 (Australia) - sharing expertise across continents' },
                { label: 'EXCHANGE', content: 'Collaborative exchange with American Team 2718 (hosted by them)' },
                { label: 'NETWORK', content: 'Hosting Teams 11352 (Chengdu) and 6399 (Jinan) — welcoming fellow Chinese teams for hands-on collaboration and cultural exchange.' },
              ]}
            />

            <TerminalCard
              terminal="TERMINAL C"
              title="Social Outreach"
              icon={Handshake}
              accentColor="emerald-500"
              images={['/terminal-c-1.jpg', '/terminal-c-2.jpg', '/terminal-c-3.jpg']}
              details={[
                { label: 'EDUCATION', content: 'STEM enlightenment for Zhangjiang Kindergarten - inspiring young minds' },
                { label: 'INDUSTRY', content: 'Industry visits to Fourier Intelligence - Connecting classroom to real-world applications' },
                { label: 'CONTENT', content: 'Consistent updates on our official WeChat account — one post every two days. Our approach gains wide recognition and is adopted by other teams as a benchmark.' },
              ]}
            />
          </div>

          {/* 10th Anniversary Terminal - Full Width */}
          <div className="mt-6">
            <TerminalCard
              terminal="TERMINAL D"
              title="10th Anniversary Celebration"
              icon={PartyPopper}
              accentColor="purple-500"
              layout="horizontal"
              images={['/terminal-d-1.png', '/terminal-d-2.png', '/terminal-d-3.png']}
              details={[
                { label: 'EXPERT INSIGHT', content: 'Google engineer joins us on-site, sharing cutting-edge technology insights and industry perspectives — a rare opportunity for face-to-face dialogue that sparks innovation.' },
                { label: 'ALUMNI DIALOG', content: 'A UC Berkeley alumna engages the team with thought-provoking questions, bringing an international perspective and fostering deep conversations that open new horizons.' },
                { label: 'LEGACY STORY', content: 'Former team captain from SJTU reflects on the team\'s ten-year journey — from humble beginnings to moments of triumph — passing on the spirit of perseverance and tradition through firsthand stories.' },
              ]}
            />
          </div>
        </div>
      </section>

      {/* Operational & Financial Dashboards Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-slate-50 via-white to-cyan-50 overflow-hidden relative">
        {/* Subtle robot base blueprint background */}
        <div className="absolute bottom-0 left-0 right-0 h-64 opacity-[0.03] pointer-events-none">
          <svg viewBox="0 0 1200 300" className="w-full h-full" preserveAspectRatio="xMidYMax slice">
            {/* Robot base outline */}
            <ellipse cx="600" cy="250" rx="400" ry="40" fill="none" stroke="currentColor" strokeWidth="2"/>
            <rect x="350" y="150" width="500" height="100" rx="20" fill="none" stroke="currentColor" strokeWidth="2"/>
            <circle cx="450" cy="200" r="30" fill="none" stroke="currentColor" strokeWidth="2"/>
            <circle cx="600" cy="200" r="30" fill="none" stroke="currentColor" strokeWidth="2"/>
            <circle cx="750" cy="200" r="30" fill="none" stroke="currentColor" strokeWidth="2"/>
            <rect x="400" y="80" width="400" height="70" rx="10" fill="none" stroke="currentColor" strokeWidth="2"/>
            <line x1="500" y1="80" x2="500" y2="150" stroke="currentColor" strokeWidth="1"/>
            <line x1="600" y1="80" x2="600" y2="150" stroke="currentColor" strokeWidth="1"/>
            <line x1="700" y1="80" x2="700" y2="150" stroke="currentColor" strokeWidth="1"/>
            <circle cx="450" cy="115" r="15" fill="none" stroke="currentColor" strokeWidth="1"/>
            <circle cx="600" cy="115" r="15" fill="none" stroke="currentColor" strokeWidth="1"/>
            <circle cx="750" cy="115" r="15" fill="none" stroke="currentColor" strokeWidth="1"/>
            {/* Wheels */}
            <circle cx="300" cy="250" r="50" fill="none" stroke="currentColor" strokeWidth="3"/>
            <circle cx="900" cy="250" r="50" fill="none" stroke="currentColor" strokeWidth="3"/>
            <circle cx="300" cy="250" r="20" fill="none" stroke="currentColor" strokeWidth="1"/>
            <circle cx="900" cy="250" r="20" fill="none" stroke="currentColor" strokeWidth="1"/>
          </svg>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 py-1">
              SUSTAINABILITY
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
              Operational & Financial Dashboards
            </h2>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto">
              Transparent operations driving sustainable growth and continuous improvement
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            {/* Left Column - Strategic Info Cards + Funding Usage */}
            <div className="space-y-4">
              {/* Strategic Partnership */}
              <SustainabilityCard
                title="Strategic Partnership"
                description="Long-term collaboration with Zhangjiang Group and HAAS, establishing a robust foundation for technological advancement and resource sharing."
                icon={Handshake}
                colorScheme="cyan"
                delay={0}
              />

              {/* Institutional Support */}
              <SustainabilityCard
                title="Institutional Support"
                description="Deeply rooted in EFZ (No.2 High School of East China Normal University) and ECNU (East China Normal University), benefiting from world-class educational resources."
                icon={Building2}
                colorScheme="orange"
                delay={150}
              />

              {/* Funding Usage Chart - Integrated */}
              <Card className="bg-white/80 backdrop-blur-sm border-slate-200 shadow-lg flex-1">
                <CardContent className="p-5">
                  <h4 className="text-base font-bold text-slate-800 mb-3 flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-cyan-500" />
                    Funding Usage
                  </h4>
                  <div className="space-y-2.5">
                    {[
                      { name: 'Hardware & Materials', percent: 42.8, color: '#2563eb' },
                      { name: 'Software & Materials', percent: 23.5, color: '#3b82f6' },
                      { name: 'Mentoring Fees', percent: 12.0, color: '#60a5fa' },
                      { name: '3D Printing & Consumables', percent: 10.8, color: '#93c5fd' },
                      { name: 'Registration Fees', percent: 8.5, color: '#bfdbfe' },
                      { name: 'Promo & Souvenirs', percent: 2.2, color: '#dbeafe' },
                    ].map((item, index) => (
                      <motion.div 
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-slate-600">{item.name}</span>
                          <span className="font-medium text-slate-800">{item.percent}%</span>
                        </div>
                        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full rounded-full"
                            style={{ backgroundColor: item.color }}
                            initial={{ width: 0 }}
                            animate={{ width: `${item.percent}%` }}
                            transition={{ delay: 0.5 + index * 0.1, duration: 0.8, ease: "easeOut" }}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Positive Cycle Engine (Taller) */}
            <div className="flex items-center justify-center min-h-[600px]">
              <PositiveCycleEngine />
            </div>
          </div>
        </div>
      </section>

      {/* The Architects Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-1">
              THE CREW
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
              THE ARCHITECTS
            </h2>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto">
              Meet the brilliant minds behind Team 6353. Hover over each member to see their digital ID.
            </p>
          </div>

          {/* Team Grid - Updated layout */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 justify-items-center">
            {teamMembers.map((member, index) => (
              <TeamMemberCard 
                key={member.name}
                name={member.name}
                index={index + 1}
                role={member.role}
                isCaptain={member.isCaptain}
                colorTheme={member.colorTheme}
                photo={member.photo}
              />
            ))}
            {/* Empty placeholders to center the last row (18 members, 6 columns = 3 full rows, no placeholder needed) */}
          </div>
        </div>
      </section>

      {/* Information Footer */}
      <footer className="bg-gradient-to-br from-slate-800 to-slate-900 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-white/10 text-white border border-white/20 px-4 py-1">
              INFORMATION
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Get in Touch
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Contact */}
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-cyan-400" />
                  </div>
                  <h3 className="font-semibold text-lg text-cyan-400">Contact</h3>
                </div>
                <a href="mailto:fanhaoyu@hsefz.cn" className="text-cyan-300 hover:text-cyan-200 transition-colors">
                  fanhaoyu@hsefz.cn
                </a>
              </CardContent>
            </Card>

            {/* WeChat */}
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 text-emerald-400" />
                  </div>
                  <h3 className="font-semibold text-lg text-white">WeChat</h3>
                </div>
                <div className="w-24 h-24 rounded-lg overflow-hidden border-2 border-white/20">
                  <Image 
                    src="/wechat-qr.jpg" 
                    alt="WeChat QR Code"
                    width={96}
                    height={96}
                    className="w-full h-full object-cover"
                    unoptimized
                  />
                </div>
              </CardContent>
            </Card>

            {/* Location */}
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-orange-400" />
                  </div>
                  <h3 className="font-semibold text-lg text-white">Location</h3>
                </div>
                <p className="text-white/70">Shanghai, China</p>
                <p className="text-white/50 text-sm mt-2">No.2 High School of East China Normal University</p>
              </CardContent>
            </Card>

            {/* School Website */}
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                    <ExternalLink className="w-5 h-5 text-purple-400" />
                  </div>
                  <h3 className="font-semibold text-lg text-purple-400">School Website</h3>
                </div>
                <a 
                  href="https://www.hsefz.cn/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-300 hover:text-purple-200 transition-colors flex items-center gap-1"
                >
                  www.hsefz.cn
                  <ExternalLink className="w-3 h-3" />
                </a>
              </CardContent>
            </Card>
          </div>

          {/* Copyright */}
          <div className="mt-12 pt-8 border-t border-white/10 text-center">
            <p className="text-white/40 text-sm">
              © 2016-2026 Team 6353. All rights reserved. | EFZ Robotics
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
