'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const translations = {
  pt: {
    help: "Ajuda",
    loginTitle: "Entrar no Laudos.AI",
    loginDescription: "Acesse a plataforma de laudos",
    email: "E-mail",
    password: "Senha",
    login: "Entrar",
    noAccount: "Não tem uma conta?",
    signUp: "Cadastre-se",
    forgotPassword: "Esqueceu a senha?",
    magicLink: "Entrar com Magic Link",
  },
  en: {
    help: "Help",
    loginTitle: "Login to Laudos.AI",
    loginDescription: "Access the medical report platform",
    email: "Email",
    password: "Password",
    login: "Log In",
    noAccount: "Don't have an account?",
    signUp: "Sign up",
    forgotPassword: "Forgot password?",
    magicLink: "Sign in with Magic Link",
  }
}

export function LaudosAiLogin() {
  const [lang, setLang] = useState('pt')
  const t = translations[lang]

  return (
    <div className="min-h-screen flex flex-col bg-black text-white font-sans relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Group%206-K4vGdcKlJqUrnyyguehwy4YeuZVTXR.png" 
          alt="" 
          className="w-full h-full object-cover opacity-30" 
          aria-hidden="true"
        />
      </div>
      
      <header className="relative w-full px-10 py-8 flex justify-between items-center z-10">
        <Link href="/" className="text-white flex items-center gap-3" prefetch={false}>
          <svg className="w-12 h-6" viewBox="0 0 40 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M0 0H5V16.0805H0V0ZM5 16.0805H13V19.7762H5V16.0805Z" fill="currentColor" />
          </svg>
        </Link>
        <nav className="space-x-6 flex items-center">
          <Button variant="ghost" className="text-white text-base font-medium hover:bg-white/10">
            {t.help}
          </Button>
          <Button 
            variant="ghost" 
            className="text-white text-base font-medium hover:bg-white/10"
            onClick={() => setLang(lang === 'pt' ? 'en' : 'pt')}
          >
            {lang === 'pt' ? 'EN' : 'PT'}
          </Button>
        </nav>
      </header>
      
      <main className="relative flex-grow flex flex-col items-center justify-center px-6 z-10">
        <div className="w-full max-w-lg space-y-10">
          <div className="text-center">
            <h1 className="text-5xl font-semibold tracking-tight mb-3">
              {t.loginTitle}
            </h1>
            <p className="text-gray-300 text-xl">
              {t.loginDescription}
            </p>
          </div>
          <form className="space-y-8">
            <div className="space-y-3">
              <Label htmlFor="email" className="sr-only">{t.email}</Label>
              <Input 
                id="email"
                type="email" 
                placeholder={t.email} 
                className="bg-gray-900/80 border-gray-700 text-white placeholder-gray-400 text-lg py-6"
                required 
              />
            </div>
            <div className="space-y-3">
              <Label htmlFor="password" className="sr-only">{t.password}</Label>
              <Input 
                id="password"
                type="password" 
                placeholder={t.password} 
                className="bg-gray-900/80 border-gray-700 text-white placeholder-gray-400 text-lg py-6"
                required 
              />
            </div>
            <div className="flex justify-between items-center">
              <Link href="/forgot-password" className="text-base text-cyan-400 hover:underline">
                {t.forgotPassword}
              </Link>
            </div>
            <Button 
              type="submit"
              className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 text-white hover:from-cyan-500 hover:to-blue-600 focus:ring-4 focus:ring-cyan-300 focus:ring-opacity-50 font-semibold py-4 px-6 rounded-lg transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl text-lg uppercase tracking-wider relative overflow-hidden group"
            >
              <span className="relative z-10">{t.login}</span>
              <span className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"></span>
            </Button>
          </form>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-700" />
            </div>
            <div className="relative flex justify-center text-sm uppercase">
              <span className="bg-black px-2 text-gray-400">Or</span>
            </div>
          </div>
          <Button 
            variant="outline" 
            className="w-full bg-gray-900 border-gray-700 text-white hover:bg-gray-800 py-6 text-xl"
          >
            {t.magicLink}
          </Button>
          <p className="text-base text-center text-gray-300">
            {t.noAccount}{' '}
            <Link href="/signup" className="text-cyan-400 hover:underline font-medium">
              {t.signUp}
            </Link>
          </p>
        </div>
      </main>
    </div>
  )
}