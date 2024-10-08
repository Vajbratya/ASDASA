'use client'

import React, { useState, useEffect, useRef } from "react"
import { motion, useAnimationControls, Variants, AnimatePresence } from "framer-motion"
import Link from 'next/link'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { CheckCircle, MessageCircle, Clock, ArrowRight, Menu, X, Brain, FileText, TrendingUp, Stethoscope, Bot, ChevronRight, Calendar, User, AlertCircle } from "lucide-react"
import { useInView } from "react-intersection-observer"

const LampContainer = ({ children }: { children: React.ReactNode }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <div ref={ref} className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-gray-950 to-gray-900 w-full rounded-md">
      <div className="relative flex w-full flex-1 scale-y-125 items-start justify-center isolate z-0 ">
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={inView ? { opacity: 1, height: "30rem" } : {}}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute bottom-1/3 left-1/2 transform -translate-x-1/2 w-1/3 bg-gradient-to-t from-teal-500 to-teal-300 blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0, width: 0 }}
          animate={inView ? { opacity: 1, width: "50rem" } : {}}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
          className="absolute top-1/4 h-32 bg-gradient-to-r from-teal-400 to-teal-300 blur-3xl"
        />
      </div>
      <div className="relative z-10 w-full flex-grow flex items-center justify-center">
        {children}
      </div>
    </div>
  )
}

const typewriterVariants: Variants = {
  hidden: { opacity: 0 },
  visible: (i: number) => ({
    opacity: 1,
    transition: { delay: i * 0.05 },
  }),
}

const TypewriterText = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  const controls = useAnimationControls()
  const letters = Array.from(text)

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      controls.start("visible")
    }, delay)
    return () => clearTimeout(timeout)
  }, [controls, delay])

  return (
    <span className="inline-block">
      {letters.map((letter, i) => (
        <motion.span
          key={i}
          custom={i}
          variants={typewriterVariants}
          initial="hidden"
          animate={controls}
          className="inline-block"
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </span>
  )
}

const ParticleEffect = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles: { x: number; y: number; size: number; speedX: number; speedY: number; color: string }[] = []
    const particleCount = 200

    const colors = ['#14B8A6', '#2DD4BF', '#5EEAD4', '#99F6E4']

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        speedX: Math.random() * 2 - 1,
        speedY: Math.random() * 2 - 1,
        color: colors[Math.floor(Math.random() * colors.length)]
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle) => {
        ctx.fillStyle = particle.color
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()

        particle.x += particle.speedX
        particle.y += particle.speedY

        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1

        const centerX = canvas.width / 2
        const centerY = canvas.height / 2
        particle.speedX += (centerX - particle.x) * 0.00001
        particle.speedY += (centerY - particle.y) * 0.00001
      })

      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 z-0" />
}

const LampDemo = () => {
  return (
    <LampContainer>
      <ParticleEffect />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 1,
          ease: "easeOut",
        }}
        className="relative z-10"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.2, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="absolute inset-0 bg-gradient-to-b from-teal-500 to-transparent blur-3xl"
        />
        <motion.h1
          className="relative text-white py-4 text-center text-5xl font-bold tracking-tight md:text-8xl"
        >
          <TypewriterText text="Plantão puxado?" delay={500} />
          <br />
          <TypewriterText text="Nós" delay={1500} />
          <motion.span
            initial={{ opacity: 0, color: "rgb(255 255 255)" }}
            animate={{ opacity: 1, color: "rgb(20 184 166)" }}
            transition={{ duration: 0.5, delay: 2.5 }}
            className="inline-block"
          >
            nunca dormimos.
          </motion.span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 4 }}
          className="mt-6 text-xl text-gray-300 text-center max-w-2xl mx-auto"
        >
          Revolucione seus laudos radiológicos com a potência da Inteligência Artificial. Precisão, rapidez e disponibilidade 24/7.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 4.5 }}
          className="mt-10 flex justify-center gap-4"
        >
          <Button size="lg" className="text-lg py-6 px-8 bg-teal-600 hover:bg-teal-700 text-white">
            Comece Agora
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button size="lg" variant="outline" className="text-lg py-6 px-8 border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white">
            Saiba Mais
          </Button>
        </motion.div>
      </motion.div>
    </LampContainer>
  )
}

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <motion.a
    href={href}
    className="text-gray-300 hover:text-teal-400 transition-colors text-lg"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    {children}
  </motion.a>
)

const MobileMenu = ({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: (isOpen: boolean) => void }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0, x: "100%" }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: "100%" }}
        transition={{ duration: 0.3 }}
        className="fixed inset-y-0 right-0 w-64 bg-gray-900 shadow-lg z-50 p-4"
      >
        <button onClick={() => setIsOpen(false)} className="absolute top-4 right-4" aria-label="Close menu">
          <X className="h-8 w-8 text-gray-300" />
        </button>
        <nav className="flex flex-col space-y-6 mt-16">
          <NavLink href="#recursos">Recursos</NavLink>
          <NavLink href="#depoimentos">Depoimentos</NavLink>
          <NavLink href="#planos">Planos</NavLink>
          <NavLink href="#faq">FAQ</NavLink>
          <Button className="mt-4 text-lg py-6 bg-teal-600 hover:bg-teal-700 text-white">Começar Agora</Button>
        </nav>
      </motion.div>
    )}
  </AnimatePresence>
)

const ReportCard = ({ children }: { children: React.ReactNode }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="bg-gray-800 rounded-lg shadow-lg p-6 mb-6"
  >
    {children}
  </motion.div>
)

const ReportSection = ({ title, children }: { title: string, children: React.ReactNode }) => (
  <div className="mb-4">
    <h4 className="text-lg font-semibold text-teal-400 mb-2">{title}</h4>
    {children}
  </div>
)

const ReportList = ({ items }: { items: string[] }) => (
  <ul className="list-disc list-inside text-gray-300 mb-4">
    {items.map((item, index) => (
      <li key={index}>{item}</li>
    ))}
  </ul>
)

const FeatureSection = ({ title, description, icon, children }: { title: string, description: string, icon: React.ReactNode, children: React.ReactNode }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="flex flex-col md:flex-row items-center justify-between py-16"
    >
      <div className="md:w-1/2 mb-8 md:mb-0">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-teal-400 mb-4"
        >
          {icon}
        </motion.div>
        <motion.h3
          initial={{ y: 20, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-3xl font-bold mb-4 text-white"
        >
          {title}
        </motion.h3>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-gray-300 text-lg"
        >
          {description}
        </motion.p>
      </div>
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : {}}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="md:w-1/2"
      >
        {children}
      </motion.div>
    </motion.div>
  )
}

const TestimonialCard = ({ name, role, testimonial }: { name: string, role: string, testimonial: string }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-gray-800 p-6 rounded-lg shadow-lg"
    >
      <p  className="text-gray-300 mb-4">{testimonial}</p>
      <div className="flex items-center">
        <div className="rounded-full bg-teal-500 w-12 h-12 flex items-center justify-center mr-4">
          <span className="text-white font-bold text-lg">{name[0]}</span>
        </div>
        <div>
          <h4 className="text-white font-semibold">{name}</h4>
          <p className="text-gray-400">{role}</p>
        </div>
      </div>
    </motion.div>
  )
}

const PricingCard = ({ plan, price, features }: { plan: string, price: string, features: string[] }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col h-full"
    >
      <h3 className="text-2xl font-bold text-white mb-4">{plan}</h3>
      <p className="text-4xl font-bold text-teal-400 mb-6">{price}</p>
      <ul className="text-gray-300 mb-8 flex-grow">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center mb-2">
            <CheckCircle className="text-teal-400 mr-2" />
            {feature}
          </li>
        ))}
      </ul>
      <Button className="w-full bg-teal-500 hover:bg-teal-600 text-white">Escolher Plano</Button>
    </motion.div>
  )
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([])
  const [inputValue, setInputValue] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim()) return

    setMessages([...messages, { text: inputValue, isUser: true }])
    setInputValue("")

    setTimeout(() => {
      setMessages(prev => [...prev, { text: "Obrigado por sua mensagem. Um de nossos especialistas em radiologia entrará em contato em breve.", isUser: false }])
    }, 1000)
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="bg-gray-800 rounded-lg shadow-xl p-4 mb-4 w-80"
          >
            <div className="h-64 overflow-y-auto mb-4">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`mb-2 ${message.isUser ? 'text-right' : 'text-left'}`}
                >
                  <span className={`inline-block p-2 rounded-lg ${message.isUser ? 
                    'bg-teal-600 text-white' : 'bg-gray-700 text-gray-200'}`}>
                    {message.text}
                  </span>
                </motion.div>
              ))}
            </div>
            <form onSubmit={handleSubmit} className="flex">
              <Input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Digite sua mensagem..."
                className="flex-grow mr-2 bg-gray-700 text-white"
              />
              <Button type="submit" className="bg-teal-600 hover:bg-teal-700 text-white">Enviar</Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="rounded-full w-12 h-12 flex items-center justify-center bg-teal-600 hover:bg-teal-700 text-white"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label={isOpen ? "Fechar chat" : "Abrir chat"}
      >
        <MessageCircle />
      </motion.button>
    </div>
  )
}

const LHeroFooter = () => {
  const footerRef = useRef<HTMLElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const controls = useAnimationControls()

  const tagline = "Transformando laudos radiológicos com inteligência artificial"

  useEffect(() => {
    const footer = footerRef.current
    const canvas = canvasRef.current
    if (!footer || !canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const pixelSize = 2
    const spacing = 8
    const totalSize = pixelSize + spacing

    let animationFrame: number | null = null
    const animationDuration = 500

    const getTealColor = (brightness: number) => {
      const r = Math.floor(0 + brightness * 32)
      const g = Math.floor(128 + brightness * 127)
      const b = Math.floor(128 + brightness * 127)
      return `rgb(${r}, ${g}, ${b})`
    }

    const drawPixel = (x: number, y: number, alpha: number) => {
      const brightness = Math.random() * 0.5 + 0.5
      ctx.fillStyle = getTealColor(brightness)
      ctx.globalAlpha = alpha
      ctx.fillRect(x * totalSize, y * totalSize, pixelSize, pixelSize)
      ctx.globalAlpha = 1
    }

    const getPixelOrder = (columns: number, rows: number) => {
      const order = []
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < columns; x++) {
          if (Math.random() < 0.8) {
            order.push({ x, y, random: Math.random() })
          }
        }
      }
      return order.sort((a, b) => a.random - b.random)
    }

    const easeOutQuad = (t: number) => 1 - (1 - t) * (1 - t)

    const animatePixels = (timestamp: number, pixelOrder: Array<{x: number, y: number, random: number}>) => {
      if (!startTime) startTime = timestamp
      const elapsed = timestamp - startTime
      const progress = Math.min(1, elapsed / animationDuration)
      const easedProgress = easeOutQuad(progress)

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const pixelsToShow = Math.floor(easedProgress * pixelOrder.length)
      
      for (let i = 0; i < pixelsToShow; i++) {
        const { x, y } = pixelOrder[i]
        const alpha = Math.min(1, (pixelsToShow - i) / (pixelOrder.length * 0.1))
        drawPixel(x, y, alpha)
      }

      if (progress < 1) {
        animationFrame = requestAnimationFrame((timestamp) => animatePixels(timestamp, pixelOrder))
      }
    }

    let startTime: number

    const startAnimation = (pixelOrder: Array<{x: number, y: number, random: number}>) => {
      if (animationFrame) cancelAnimationFrame(animationFrame)
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      startTime = 0
      animationFrame = requestAnimationFrame((timestamp) => animatePixels(timestamp, pixelOrder))
    }

    const stopAnimation = () => {
      if (animationFrame) cancelAnimationFrame(animationFrame)
      ctx.clearRect(0, 0, canvas.width, canvas.height)
    }

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1
      canvas.width = footer.offsetWidth * dpr
      canvas.height = footer.offsetHeight * dpr
      ctx.scale(dpr, dpr)
      canvas.style.width = `${footer.offsetWidth}px`
      canvas.style.height = `${footer.offsetHeight}px`

      const columns = Math.ceil(canvas.width / totalSize)
      const rows = Math.ceil(canvas.height / totalSize)
      const pixelOrder = getPixelOrder(columns, rows)

      if (isHovered) {
        startAnimation(pixelOrder)
      }
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    if (isHovered) {
      const columns = Math.ceil(canvas.width / totalSize)
      const rows = Math.ceil(canvas.height / totalSize)
      const pixelOrder = getPixelOrder(columns, rows)
      startAnimation(pixelOrder)
      controls.start({ opacity: 1, transition: { duration: 0.5 } })
        .then(() => {
          controls.start(i => ({
            opacity: 1,
            transition: { delay: i * 0.04 }
          }))
        })
    } else {
      stopAnimation()
      controls.start({ opacity: 0, transition: { duration: 0.5 } })
    }

    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame)
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [isHovered, controls])

  return (
    <footer 
      ref={footerRef}
      className="relative bg-gradient-to-b from-gray-900 to-black text-white overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full"
      />
      <div className="relative z-10 container mx-auto px-4 py-16">
        <div className="flex flex-col items-center justify-center space-y-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            className="w-20 h-20"
          >
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/68747470733a2f2f66696c65732e7374726970652e636f6d2f6c696e6b732f4d44423859574e6a644638785544464951575248626e5a706147567a556d786c66475a7358327870646d56665545353162584e4c616b4e7a62305a7865556c52596e5a43555468314e6-TOzwOLoYjfNOBXsRDwwuL7bXeCvZI9.png"
              alt="L Logo"
              width={80}
              height={80}
            />
          </motion.div>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            className="text-xl text-center max-w-2xl"
          >
            {tagline.split('').map((char, index) => (
              <motion.span 
                key={index} 
                custom={index} 
                className="inline-block"
                style={{ marginRight: char === ' ' ? '0.25em' : '0' }}
              >
                {char}
              </motion.span>
            ))}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl mt-12"
          >
            <FeatureCard
              icon={<Brain className="w-8 h-8 text-teal-400" />}
              title="IA Avançada"
              description="Algoritmos de ponta para análise precisa de exames radiológicos"
            />
            <FeatureCard
              icon={<FileText className="w-8 h-8 text-teal-400" />}
              title="Laudos Detalhados"
              description="Relatórios radiológicos completos e personalizados para cada paciente"
            />
            <FeatureCard
              icon={<Bot className="w-8 h-8 text-teal-400" />}
              title="Suporte 24/7"
              description="Assistência técnica e radiológica disponível a qualquer momento"
            />
          </motion.div>
          <motion.nav 
            className="flex flex-wrap justify-center space-x-6 mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            <FooterNavLink href="/sobre">Sobre</FooterNavLink>
            <FooterNavLink href="/servicos">Serviços</FooterNavLink>
            <FooterNavLink href="/contato">Contato</FooterNavLink>
            <FooterNavLink href="/blog">Blog</FooterNavLink>
            <FooterNavLink href="/carreira">Carreira</FooterNavLink>
          </motion.nav>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            className="mt-12 text-sm text-gray-400"
          >
            © {new Date().getFullYear()} L. Todos os direitos reservados.
          </motion.div>
        </div>
      </div>
    </footer>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <motion.div 
      className="bg-gray-800 bg-opacity-50 p-6 rounded-lg"
      whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
    >
      {icon}
      <h3 className="text-xl font-semibold mt-4 mb-2 text-teal-400">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </motion.div>
  )
}

function FooterNavLink({ href, children }: { href: string, children: React.ReactNode }) {
  return (
    <Link href={href} className="relative group">
      <span className="text-gray-300 hover:text-teal-400 transition-colors">
        {children}
      </span>
      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-teal-400 transition-all group-hover:w-full"></span>
    </Link>
  )
}

export function RadiologyReportingLandingPageComponent() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 transition-colors duration-300">
      <header className="fixed top-0 left-0 right-0 z-40 bg-gray-900 bg-opacity-80 backdrop-blur-sm">
        <nav className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/68747470733a2f2f66696c65732e7374726970652e636f6d2f6c696e6b732f4d44423859574e6a644638785544464951575248626e5a706147567a556d786c66475a7358327870646d56665545353162584e4c616b4e7a62305a7865556c52596e5a43555468314e6-TOzwOLoYjfNOBXsRDwwuL7bXeCvZI9.png"
                alt="L Logo"
                width={40}
                height={40}
                className="mr-2"
              />
            </Link>
            <div className="hidden md:flex space-x-8">
              <NavLink href="#recursos">Recursos</NavLink>
              <NavLink href="#depoimentos">Depoimentos</NavLink>
              <NavLink href="#planos">Planos</NavLink>
              <NavLink href="#faq">FAQ</NavLink>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <Button className="text-lg py-6 px-8 bg-teal-600 hover:bg-teal-700 text-white">Começar Agora</Button>
            </div>
            <button className="md:hidden" onClick={() => setIsMenuOpen(true)} aria-label="Open menu">
              <Menu className="h-8 w-8 text-gray-300" />
            </button>
          </div>
        </nav>
      </header>

      <MobileMenu isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />

      <main>
        <section id="hero">
          <LampDemo />
        </section>

        <section id="recursos" className="py-32 bg-gray-800">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-center mb-16 text-teal-400">Recursos Inovadores</h2>
            
            <FeatureSection
              title="Processamento Avançado de Laudos Radiológicos"
              description="Nossa tecnologia de ponta utiliza algoritmos avançados de aprendizado profundo para processar e analisar laudos radiológicos com precisão incomparável."
              icon={<Brain className="w-16 h-16" />}
            >
              <ReportCard>
                <div className="flex items-center mb-4">
                  <FileText className="text-teal-400 mr-2" />
                  <h3 className="text-xl font-bold text-white">Laudo de Raio-X de Tórax</h3>
                </div>
                <ReportSection title="Informações do Paciente">
                  <div className="grid grid-cols-2 gap-4 text-gray-300">
                    <div className="flex items-center">
                      <User className="mr-2" />
                      <span>João Silva, 45 anos</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="mr-2" />
                      <span>Data do exame: 15/06/2023</span>
                    </div>
                  </div>
                </ReportSection>
                <ReportSection title="Indicação Clínica">
                  <p className="text-gray-300">Tosse persistente há 3 semanas</p>
                </ReportSection>
                <ReportSection title="Achados">
                  <ReportList items={[
                    "Opacidade nodular de aproximadamente 1,5 cm no lobo superior direito",
                    "Ausência de derrame pleural",
                    "Silhueta cardíaca dentro dos limites normais",
                    "Estruturas ósseas sem alterações significativas"
                  ]} />
                </ReportSection>
                <ReportSection title="Impressão">
                  <div className="flex items-start">
                    <AlertCircle className="text-yellow-500 mr-2 mt-1 flex-shrink-0" />
                    <p className="text-gray-300">Achados sugestivos de lesão pulmonar. Recomenda-se investigação adicional com tomografia computadorizada de tórax.</p>
                  </div>
                </ReportSection>
              </ReportCard>
            </FeatureSection>

            <FeatureSection
              title="Geração de Laudos Radiológicos Automatizada"
              description="Transforme dados complexos de exames radiológicos em relatórios claros e concisos, economizando tempo e melhorando a comunicação com os pacientes."
              icon={<FileText className="w-16 h-16" />}
            >
              <ReportCard>
                <div className="flex items-center mb-4">
                  <FileText className="text-teal-400 mr-2" />
                  <h3 className="text-xl font-bold text-white">Laudo de Ressonância Magnética de Crânio</h3>
                </div>
                <ReportSection title="Informações do Paciente">
                  <div className="grid grid-cols-2 gap-4 text-gray-300">
                    <div className="flex items-center">
                      <User className="mr-2" />
                      <span>Maria Oliveira, 35 anos</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="mr-2" />
                      <span>Data do exame: 20/06/2023</span>
                    </div>
                  </div>
                </ReportSection>
                <ReportSection title="Indicação Clínica">
                  <p className="text-gray-300">Cefaleia crônica</p>
                </ReportSection>
                <ReportSection title="Técnica">
                  <p className="text-gray-300">Imagens multiplanares ponderadas em T1, T2, FLAIR e sequências de difusão.</p>
                </ReportSection>
                <ReportSection title="Achados">
                  <ReportList items={[
                    "Parênquima cerebral com morfologia e sinal preservados",
                    "Sistema ventricular de dimensões normais",
                    "Ausência de lesões expansivas intra ou extra-axiais",
                    "Estruturas da fossa posterior sem anormalidades",
                    "Seios paranasais e mastoides adequadamente pneumatizados"
                  ]} />
                </ReportSection>
                <ReportSection title="Conclusão">
                  <div className="flex items-start">
                    <CheckCircle className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                    <p className="text-gray-300">Exame dentro dos limites da normalidade.</p>
                  </div>
                </ReportSection>
                <ReportSection title="Recomendações">
                  <p className="text-gray-300">Acompanhamento clínico. Considerar repetir o exame em 12 meses se os sintomas persistirem.</p>
                </ReportSection>
              </ReportCard>
            </FeatureSection>

            <FeatureSection
              title="Análise Preditiva em Radiologia"
              description="Utilize o poder da IA para analisar tendências em exames radiológicos, identificar fatores de risco e fornecer recomendações personalizadas para cada paciente."
              icon={<TrendingUp className="w-16 h-16" />}
            >
              <ReportCard>
                <div className="flex items-center mb-4">
                  <FileText className="text-teal-400 mr-2" />
                  <h3 className="text-xl font-bold text-white">Relatório de Análise Preditiva</h3>
                </div>
                <ReportSection title="Informações do Paciente">
                  <div className="grid grid-cols-2 gap-4 text-gray-300">
                    <div className="flex items-center">
                      <User className="mr-2" />
                      <span>Carlos Santos, 55 anos</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="mr-2" />
                      <span>Data da análise: 25/06/2023</span>
                    </div>
                  </div>
                </ReportSection>
                <ReportSection title="Histórico Relevante">
                  <p className="text-gray-300">Fumante por 30 anos, histórico familiar de câncer de pulmão</p>
                </ReportSection>
                <ReportSection title="Exame Recente">
                  <p className="text-gray-300">Tomografia Computadorizada de Tórax (01/06/2023)</p>
                </ReportSection>
                <ReportSection title="Achado Principal">
                  <p className="text-gray-300">Nódulo pulmonar de 8mm no lobo inferior esquerdo</p>
                </ReportSection>
                <ReportSection title="Análise Preditiva">
                  <div className="bg-gray-700 p-4 rounded-lg mb-4">
                    <p className="text-white font-semibold mb-2">Risco de câncer de pulmão: <span className="text-red-400">Elevado</span></p>
                    <p className="text-white">Probabilidade estimada: <span className="text-yellow-400">28%</span></p>
                  </div>
                </ReportSection>
                <ReportSection title="Recomendações">
                  <ReportList items={[
                    "Acompanhamento com TC de baixa dose a cada 6 meses",
                    "Consulta com pneumologista para avaliação detalhada",
                    "Participação em programa de cessação do tabagismo",
                    "Considerar biópsia se houver crescimento do nódulo"
                  ]} />
                </ReportSection>
                <ReportSection title="Observação">
                  <p className="text-gray-300 italic">Esta análise é baseada em dados estatísticos e deve ser interpretada em conjunto com a avaliação clínica completa.</p>
                </ReportSection>
              </ReportCard>
            </FeatureSection>
          </div>
        </section>

        <section id="depoimentos" className="py-32 bg-gray-900">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-center mb-16 text-teal-400">O que nossos usuários dizem</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <TestimonialCard
                name="Dr. Lucas Silva"
                role="Radiologista"
                testimonial="Esta ferramenta revolucionou minha prática. A precisão e velocidade na análise de exames radiológicos são incomparáveis."
              />
              <TestimonialCard
                name="Dra. Ana Beatriz"
                role="Neurorradiologista"
                testimonial="O suporte 24/7 é um diferencial incrível. Sempre que preciso, tenho ajuda imediata e precisa para interpretar resultados complexos."
              />
              <TestimonialCard
                name="Dr. Carlos Mendes"
                role="Radiologista Torácico"
                testimonial="A geração automática de laudos economiza horas do meu dia, permitindo que eu me concentre mais nos casos complexos e no atendimento aos pacientes."
              />
            </div>
          </div>
        </section>

        <section id="planos" className="py-32 bg-gray-800">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-center mb-16 text-teal-400">Planos Flexíveis</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <PricingCard
                plan="Básico"
                price="R$199/mês"
                features={[
                  "Análise de até 100 exames/mês",
                  "Geração de laudos básicos",
                  "Suporte por email"
                ]}
              />
              <PricingCard
                plan="Profissional"
                price="R$499/mês"
                features={[
                  "Análise ilimitada de exames",
                  "Laudos detalhados e personalizados",
                  "Suporte 24/7 por chat e telefone",
                  "Integração com sistemas PACS"
                ]}
              />
              <PricingCard
                plan="Enterprise"
                price="Personalizado"
                features={[
                  "Soluções personalizadas",
                  "API dedicada",
                  "Treinamento e consultoria",
                  "Gerente de conta exclusivo"
                ]}
              />
            </div>
          </div>
        </section>

        <section id="faq" className="py-32 bg-gray-900">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-center mb-16 text-teal-400">Perguntas Frequentes</h2>
            <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
              {[
                {
                  question: "Como nossa ferramenta garante a precisão dos laudos radiológicos?",
                  answer: "Nossa IA é treinada com milhões de exames radiológicos e constantemente atualizada. Além disso, todos os laudos passam por uma revisão final de radiologistas experientes para garantir a máxima precisão."
                },
                {
                  question: "A plataforma é compatível com os sistemas PACS existentes?",
                  answer: "Sim, oferecemos integrações personalizadas com os principais sistemas PACS e RIS. Nossa equipe técnica trabalha para garantir uma transição suave e eficiente."
                },
                {
                  question: "Como vocês garantem a segurança e privacidade dos dados dos pacientes?",
                  answer: "Utilizamos criptografia de ponta a ponta, servidores seguros e conformidade com HIPAA e GDPR. Além disso, realizamos auditorias de segurança regulares para manter os mais altos padrões de proteção de dados."
                },
                {
                  question: "Qual é o tempo médio de treinamento para começar a usar a plataforma?",
                  answer: "A maioria dos radiologistas se familiariza com nossa plataforma em apenas 2-3 horas de treinamento. Oferecemos tutoriais interativos, webinars ao vivo e suporte personalizado para garantir uma adoção rápida e eficaz."
                }
              ].map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-teal-400 hover:text-teal-300">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-300">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        <section className="py-32 bg-gradient-to-b from-gray-900 to-teal-900">
          <div className="container mx-auto px-6 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl font-bold mb-8 text-white"
            >
              Transforme sua prática radiológica com IA
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-12 text-2xl text-gray-100"
            >
              Junte-se aos milhares de radiologistas que já estão revolucionando seus laudos
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex justify-center mb-12"
            >
              <Stethoscope className="w-24 h-24 text-teal-400" />
            </motion.div>
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="max-w-2xl mx-auto flex gap-4"
            >
              <Input type="email" placeholder="Seu e-mail" className="bg-gray-700 text-white text-lg py-6 border-gray-600" />
              <Button type="submit" className="bg-teal-600 hover:bg-teal-700 text-white text-lg py-6 px-8">
                Começar Agora
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.form>
          </div>
        </section>
      </main>

      <LHeroFooter />

      <Chatbot />
    </div>
  )
}