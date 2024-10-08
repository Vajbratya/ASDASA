'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Progress } from "@/components/ui/progress"
import { toast } from "@/components/ui/use-toast"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"

const translations = {
  pt: {
    help: "Ajuda",
    signupTitle: "Cadastre-se no Laudos.",
    signupTitleAI: "AI",
    signupDescription: "Crie sua conta na plataforma de laudos",
    name: "Nome completo",
    cellphone: "Celular",
    email: "E-mail",
    password: "Senha",
    confirmPassword: "Confirme a senha",
    crm: "CRM (Número de registro médico)",
    crmState: "Estado do CRM",
    subspecialty: "Subespecialidade Radiológica",
    subspecialties: {
      thoracicRadiology: "Radiologia Torácica",
      abdominalRadiology: "Radiologia Abdominal",
      neuroradiology: "Neurorradiologia",
      musculoskeletal: "Radiologia Musculoesquelética",
      breastImaging: "Imagem da Mama",
      pediatricRadiology: "Radiologia Pediátrica",
      interventionalRadiology: "Radiologia Intervencionista",
      cardiovascularRadiology: "Radiologia Cardiovascular",
      emergencyRadiology: "Radiologia de Emergência",
      nuclearMedicine: "Medicina Nuclear",
    },
    onboardingQuestions: {
      title: "Perguntas de integração",
      experience: "Quantos anos de experiência você tem em radiologia?",
      volumePerDay: "Qual é o volume médio de exames que você interpreta por dia?",
      aiExperience: "Você já usou ferramentas de IA em radiologia antes?",
      aiExperienceOptions: {
        never: "Nunca",
        occasionally: "Ocasionalmente",
        frequently: "Frequentemente",
        expert: "Sou um especialista",
      },
    },
    termsAndConditions: "Li e aceito os termos e condições",
    termsAndConditionsTitle: "Termos e Condições",
    termsAndConditionsDescription: "Por favor, leia atentamente os termos e condições antes de aceitar.",
    termsAndConditionsContent: [
      "1. Aceitação dos Termos",
      "Ao acessar e usar o Laudos.AI, você concorda em cumprir e ficar vinculado aos seguintes termos e condições de uso. Se você não concordar com qualquer parte destes termos, não poderá usar nossos serviços.",
      "2. Descrição do Serviço",
      "O Laudos.AI é uma plataforma de inteligência artificial projetada para auxiliar profissionais de radiologia na interpretação de imagens médicas. Nosso serviço não substitui o julgamento profissional de um médico qualificado.",
      "3. Uso Responsável",
      "Você concorda em usar o Laudos.AI de maneira responsável e ética, respeitando a privacidade dos pacientes e as regulamentações de saúde aplicáveis.",
      "4. Privacidade e Segurança de Dados",
      "Nós levamos a sério a proteção de dados. Todas as informações processadas pelo Laudos.AI são tratadas com o mais alto nível de segurança e confidencialidade, em conformidade com as leis de proteção de dados aplicáveis.",
      "5. Limitação de Responsabilidade",
      "O Laudos.AI é uma ferramenta de suporte à decisão. A responsabilidade final por qualquer diagnóstico ou decisão médica reside exclusivamente com o profissional de saúde qualificado.",
      "6. Atualizações dos Termos",
      "Reservamo-nos o direito de modificar estes termos a qualquer momento. As alterações entrarão em vigor imediatamente após a publicação no site. O uso continuado do Laudos.AI após tais modificações constituirá sua aceitação dos novos termos.",
      "7. Encerramento de Conta",
      "Reservamo-nos o direito de encerrar ou suspender sua conta a qualquer momento, por qualquer motivo, sem aviso prévio.",
      "8. Lei Aplicável",
      "Estes termos serão regidos e interpretados de acordo com as leis do Brasil, independentemente de conflitos de disposições legais.",
    ],
    close: "Fechar",
    accept: "Aceitar",
    signup: "Cadastrar",
    alreadyHaveAccount: "Já tem uma conta?",
    login: "Entrar",
    next: "Próximo",
    previous: "Anterior",
    steps: {
      personalInfo: "Informações Pessoais",
      professionalInfo: "Informações Profissionais",
      additionalInfo: "Informações Adicionais",
    },
  },
  en: {
    help: "Help",
    signupTitle: "Sign up for Laudos.",
    signupTitleAI: "AI",
    signupDescription: "Create your account on the medical report platform",
    name: "Full name",
    cellphone: "Cellphone",
    email: "Email",
    password: "Password",
    confirmPassword: "Confirm password",
    crm: "CRM (Medical license number)",
    crmState: "CRM State",
    subspecialty: "Radiological Subspecialty",
    subspecialties: {
      thoracicRadiology: "Thoracic Radiology",
      abdominalRadiology: "Abdominal Radiology",
      neuroradiology: "Neuroradiology",
      musculoskeletal: "Musculoskeletal Radiology",
      breastImaging: "Breast Imaging",
      pediatricRadiology: "Pediatric Radiology",
      interventionalRadiology: "Interventional Radiology",
      cardiovascularRadiology: "Cardiovascular Radiology",
      emergencyRadiology: "Emergency Radiology",
      nuclearMedicine: "Nuclear Medicine",
    },
    onboardingQuestions: {
      title: "Onboarding Questions",
      experience: "How many years of experience do you have in radiology?",
      volumePerDay: "What is the average volume of exams you interpret per day?",
      aiExperience: "Have you used AI tools in radiology before?",
      aiExperienceOptions: {
        never: "Never",
        occasionally: "Occasionally",
        frequently: "Frequently",
        expert: "I'm an expert",
      },
    },
    termsAndConditions: "I have read and accept the terms and conditions",
    termsAndConditionsTitle: "Terms and Conditions",
    termsAndConditionsDescription: "Please read the terms and conditions carefully before accepting.",
    termsAndConditionsContent: [
      "1. Acceptance of Terms",
      "By accessing and using Laudos.AI, you agree to comply with and be bound by the following terms and conditions of use. If you disagree with any part of these terms, you may not use our services.",
      "2. Service Description",
      "Laudos.AI is an artificial intelligence platform designed to assist radiology professionals in interpreting medical images. Our service does not replace the professional judgment of a qualified physician.",
      "3. Responsible Use",
      "You agree to use Laudos.AI in a responsible and ethical manner, respecting patient privacy and applicable health regulations.",
      "4. Privacy and Data Security",
      "We take data protection seriously. All information processed by Laudos.AI is treated with the highest level of security and confidentiality, in compliance with applicable data protection laws.",
      "5. Limitation of Liability",
      "Laudos.AI is a decision support tool. The ultimate responsibility for any diagnosis or medical decision lies solely with the qualified healthcare professional.",
      "6. Terms Updates",
      "We reserve the right to modify these terms at any time. Changes will take effect immediately upon posting on the website. Continued use of Laudos.AI after such modifications will constitute your acceptance of the new terms.",
      "7. Account Termination",
      "We reserve the right to terminate or suspend your account at any time, for any reason, without prior notice.",
      "8. Applicable Law",
      "These terms will be governed by and construed in accordance with the laws of Brazil, regardless of conflicts of legal provisions.",
    ],
    close: "Close",
    accept: "Accept",
    signup: "Sign Up",
    alreadyHaveAccount: "Already have an account?",
    login: "Log In",
    next: "Next",
    previous: "Previous",
    steps: {
      personalInfo: "Personal Information",
      professionalInfo: "Professional Information",
      additionalInfo: "Additional Information",
    },
  }
}

export function LaudosAiSignup() {
  const [lang, setLang] = useState('pt')
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: '',
    cellphone: '',
    email: '',
    password: '',
    confirmPassword: '',
    crm: '',
    crmState: '',
    subspecialty: '',
    experience: '',
    volumePerDay: '',
    aiExperience: '',
    termsAccepted: false,
  })
  const [termsModalOpen, setTermsModalOpen] = useState(false)

  const t = translations[lang]

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Here you would typically send the data to your backend
    console.log(formData)
    toast({
      title: "Account created.",
      description: "We've created your account for you.",
    })
  }

  const nextStep = () => setStep(prev => Math.min(prev + 1, 3))
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1))

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 to-black text-white font-sans relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Group%206-K4vGdcKlJqUrnyyguehwy4YeuZVTXR.png" 
          alt="" 
          className="w-full h-full object-cover opacity-20" 
          aria-hidden="true"
        />
      </div>
      
      <header className="relative w-full px-6 sm:px-10 py-6 flex justify-between items-center z-10">
        <Link href="/" className="text-white flex items-center gap-3" prefetch={false}>
          <svg className="w-10 h-5 sm:w-12 sm:h-6" viewBox="0 0 40 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M0 0H5V16.0805H0V0ZM5 16.0805H13V19.7762H5V16.0805Z" fill="currentColor" />
          </svg>
        </Link>
        <nav className="space-x-2 sm:space-x-6 flex items-center">
          <Button variant="ghost" className="text-white text-sm sm:text-base font-medium hover:bg-white/10 transition-colors duration-200">
            {t.help}
          </Button>
          <Button 
            variant="ghost" 
            className="text-white text-sm sm:text-base font-medium hover:bg-white/10 transition-colors duration-200"
            onClick={() => setLang(lang === 'pt' ? 'en' : 'pt')}
          >
            {lang === 'pt' ? 'EN' : 'PT'}
          </Button>
        </nav>
      </header>
      
      <main className="relative flex-grow flex flex-col items-center justify-center px-6 py-12 z-10">
        <div className="w-full max-w-2xl space-y-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-2">
              {t.signupTitle}<span className="text-teal-400">{t.signupTitleAI}</span>
            </h1>
            <p className="text-gray-400 text-lg sm:text-xl">
              {t.signupDescription}
            </p>
          </div>
          
          <div className="space-y-4">
            <Progress value={(step / 3) * 100} className="w-full" />
            <div className="flex justify-between text-sm text-gray-400">
              <span className={step >= 1 ? "text-teal-400" : ""}>{t.steps.personalInfo}</span>
              <span className={step >= 2 ? "text-teal-400" : ""}>{t.steps.professionalInfo}</span>
              <span className={step >= 3 ? "text-teal-400" : ""}>{t.steps.additionalInfo}</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {step === 1 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium text-gray-300">{t.name}</Label>
                  <Input 
                    id="name"
                    name="name"
                    type="text" 
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder={t.name} 
                    className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 text-base sm:text-lg py-3 focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all duration-200"
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cellphone" className="text-sm font-medium text-gray-300">{t.cellphone}</Label>
                  <Input 
                    id="cellphone"
                    name="cellphone"
                    type="tel" 
                    value={formData.cellphone}
                    onChange={handleInputChange}
                    placeholder={t.cellphone} 
                    className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 text-base sm:text-lg py-3 focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all duration-200"
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-gray-300">{t.email}</Label>
                  <Input 
                    id="email"
                    name="email"
                    type="email" 
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder={t.email} 
                    className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 text-base sm:text-lg py-3 focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all duration-200"
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium text-gray-300">{t.password}</Label>
                  <Input 
                    id="password"
                    name="password"
                    type="password" 
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder={t.password} 
                    className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 text-base sm:text-lg py-3 focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all duration-200"
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-300">{t.confirmPassword}</Label>
                  <Input 
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password" 
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder={t.confirmPassword} 
                    className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 text-base sm:text-lg py-3 focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all duration-200"
                    required 
                  />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="crm" className="text-sm font-medium text-gray-300">{t.crm}</Label>
                  <Input 
                    id="crm"
                    name="crm"
                    type="text" 
                    value={formData.crm}
                    onChange={handleInputChange}
                    placeholder={t.crm} 
                    className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 text-base sm:text-lg py-3 focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all duration-200"
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="crmState" className="text-sm font-medium text-gray-300">{t.crmState}</Label>
                  <Input 
                    id="crmState"
                    name="crmState"
                    type="text" 
                    value={formData.crmState}
                    onChange={handleInputChange}
                    placeholder={t.crmState} 
                    className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 text-base sm:text-lg py-3 focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all duration-200"
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subspecialty" className="text-sm font-medium text-gray-300">{t.subspecialty}</Label>
                  <Select onValueChange={(value) => handleSelectChange('subspecialty', value)}>
                    <SelectTrigger className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 text-base sm:text-lg py-3 focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all duration-200">
                      <SelectValue placeholder={t.subspecialty} />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(t.subspecialties).map(([key, value]) => (
                        <SelectItem key={key} value={key}>{value}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold">{t.onboardingQuestions.title}</h3>
                <div className="space-y-2">
                  <Label htmlFor="experience" className="text-sm font-medium text-gray-300">{t.onboardingQuestions.experience}</Label>
                  <Input 
                    id="experience"
                    name="experience"
                    type="number" 
                    min="0"
                    value={formData.experience}
                    onChange={handleInputChange}
                    className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 text-base sm:text-lg py-3 focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all duration-200"
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="volumePerDay" className="text-sm font-medium text-gray-300">{t.onboardingQuestions.volumePerDay}</Label>
                  <Input 
                    id="volumePerDay"
                    name="volumePerDay"
                    type="number" 
                    min="0"
                    value={formData.volumePerDay}
                    onChange={handleInputChange}
                    className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 text-base sm:text-lg py-3 focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all duration-200"
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-300">{t.onboardingQuestions.aiExperience}</Label>
                  <RadioGroup onValueChange={(value) => handleSelectChange('aiExperience', value)} className="space-y-2">
                    {Object.entries(t.onboardingQuestions.aiExperienceOptions).map(([key, value]) => (
                      <div key={key} className="flex items-center space-x-2 bg-gray-800/50 p-2 rounded-md">
                        <RadioGroupItem value={key} id={key} className="border-gray-400 text-teal-400" />
                        <Label htmlFor={key} className="text-sm font-medium text-gray-300">{value}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
                <div className="flex items-center space-x-2 bg-gray-800/50 p-3 rounded-md">
                  <Checkbox 
                    id="terms" 
                    name="termsAccepted"
                    checked={formData.termsAccepted}
                    onCheckedChange={(checked) => handleInputChange({target: {name: 'termsAccepted', type: 'checkbox', checked}})}
                    required 
                    className="border-gray-400 text-teal-400"
                  />
                  <Label htmlFor="terms" className="text-sm font-medium text-gray-300">
                    {t.termsAndConditions}{' '}
                    <Dialog open={termsModalOpen} onOpenChange={setTermsModalOpen}>
                      <DialogTrigger asChild>
                        <Button variant="link" className="text-teal-400 hover:text-teal-300 p-0 h-auto font-normal">
                          {t.termsAndConditionsTitle}
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[600px] bg-gray-900 text-white border-gray-700">
                        <DialogHeader>
                          <DialogTitle className="text-2xl font-bold">{t.termsAndConditionsTitle}</DialogTitle>
                          <DialogDescription className="text-gray-400">
                            {t.termsAndConditionsDescription}
                          </DialogDescription>
                        </DialogHeader>
                        <ScrollArea className="mt-4 h-[300px] rounded-md border border-gray-700 p-4">
                          <div className="text-sm text-gray-300 space-y-4">
                            {t.termsAndConditionsContent.map((paragraph, index) => (
                              <p key={index}>{paragraph}</p>
                            ))}
                          </div>
                        </ScrollArea>
                        <DialogFooter className="flex flex-col sm:flex-row gap-4 items-center justify-between mt-6">
                          <Button 
                            variant="outline" 
                            onClick={() => setTermsModalOpen(false)}
                            className="bg-gray-800 text-white border-gray-700 hover:bg-gray-700"
                          >
                            {t.close}
                          </Button>
                          <Button 
                            onClick={() => {
                              setFormData(prev => ({ ...prev, termsAccepted: true }));
                              setTermsModalOpen(false);
                            }}
                            className="bg-teal-500 text-white hover:bg-teal-600"
                          >
                            {t.accept}
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </Label>
                </div>
              </div>
            )}

            <div className="flex justify-between">
              {step > 1 && (
                <Button type="button" onClick={prevStep} variant="outline" className="bg-gray-800/50 border-gray-700 text-white hover:bg-gray-700/50">
                  {t.previous}
                </Button>
              )}
              {step < 3 ? (
                <Button type="button" onClick={nextStep} className="ml-auto bg-gradient-to-r from-teal-500 to-teal-600 text-white hover:from-teal-600 hover:to-teal-700">
                  {t.next}
                </Button>
              ) : (
                <Button type="submit" className="ml-auto bg-gradient-to-r from-teal-500 to-teal-600 text-white hover:from-teal-600 hover:to-teal-700">
                  {t.signup}
                </Button>
              )}
            </div>
          </form>
          
          <p className="text-sm text-center text-gray-400">
            {t.alreadyHaveAccount}{' '}
            <Link href="/login" className="text-teal-400 hover:text-teal-300 font-medium transition-colors duration-200">
              {t.login}
            </Link>
          </p>
        </div>
      </main>
    </div>
  )
}