"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, BookOpen, ArrowRight, Loader2, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

export default function SignupPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const [password, setPassword] = useState("")

  const passwordRequirements = [
    { label: "At least 8 characters", met: password.length >= 8 },
    { label: "Contains a number", met: /\d/.test(password) },
    { label: "Contains uppercase", met: /[A-Z]/.test(password) },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsLoading(false)
    router.push("/")
  }

  return (
    <div className="flex min-h-screen">
      {/* Left Side - Navy Gradient with Floating Elements */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-[#0A1931] via-[#142747] to-[#1E3A5F]">
        {/* Abstract floating shapes */}
        <div className="absolute inset-0">
          <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-white/30" />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#grid)" />
          </svg>
          
          <div className="absolute top-1/4 left-1/4 w-32 h-40 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 transform rotate-12 animate-[float_6s_ease-in-out_infinite]" />
          <div className="absolute top-1/3 right-1/4 w-24 h-32 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 transform -rotate-6 animate-[float_8s_ease-in-out_infinite_1s]" />
          <div className="absolute bottom-1/4 left-1/3 w-28 h-36 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 transform rotate-3 animate-[float_7s_ease-in-out_infinite_0.5s]" />
          
          <div className="absolute top-1/2 left-1/2 w-64 h-64 rounded-full bg-[#4A7FA7]/20 blur-3xl transform -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-1/3 right-1/3 w-48 h-48 rounded-full bg-[#6FA36F]/10 blur-3xl" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center items-center w-full p-12 text-white">
          <div className="flex items-center gap-3 mb-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 backdrop-blur-sm">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold">LibraryHub</span>
          </div>
          
          <h1 className="text-4xl font-bold text-center mb-4 text-balance">
            Start Your <br />
            <span className="text-[#6FA36F]">Reading Journey</span>
          </h1>
          
          <p className="text-white/60 text-center max-w-md text-lg">
            Join thousands of readers who have discovered their next favorite book through LibraryHub.
          </p>

          {/* Features */}
          <div className="mt-12 space-y-4">
            {[
              "Access to 10,000+ digital books",
              "Personalized recommendations",
              "Reading progress tracking",
              "Community discussions",
            ].map((feature, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#6FA36F]/20">
                  <Check className="h-4 w-4 text-[#6FA36F]" />
                </div>
                <span className="text-white/80">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side - White Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md space-y-8">
          {/* Mobile Logo */}
          <div className="flex items-center gap-3 lg:hidden mb-8">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
              <BookOpen className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">LibraryHub</span>
          </div>

          <div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground">Create an account</h2>
            <p className="mt-2 text-muted-foreground">
              Start your free trial today
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="firstName" className="text-sm font-medium text-foreground">
                    First name
                  </label>
                  <Input
                    id="firstName"
                    type="text"
                    placeholder="John"
                    required
                    onFocus={() => setFocusedField("firstName")}
                    onBlur={() => setFocusedField(null)}
                    className={cn(
                      "h-12 rounded-xl border-border bg-card transition-all duration-200",
                      focusedField === "firstName" && "ring-2 ring-accent/20 border-accent"
                    )}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="lastName" className="text-sm font-medium text-foreground">
                    Last name
                  </label>
                  <Input
                    id="lastName"
                    type="text"
                    placeholder="Doe"
                    required
                    onFocus={() => setFocusedField("lastName")}
                    onBlur={() => setFocusedField(null)}
                    className={cn(
                      "h-12 rounded-xl border-border bg-card transition-all duration-200",
                      focusedField === "lastName" && "ring-2 ring-accent/20 border-accent"
                    )}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-foreground">
                  Email address
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  className={cn(
                    "h-12 rounded-xl border-border bg-card transition-all duration-200",
                    focusedField === "email" && "ring-2 ring-accent/20 border-accent"
                  )}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-foreground">
                  Password
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setFocusedField("password")}
                    onBlur={() => setFocusedField(null)}
                    className={cn(
                      "h-12 rounded-xl border-border bg-card pr-12 transition-all duration-200",
                      focusedField === "password" && "ring-2 ring-accent/20 border-accent"
                    )}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                
                {/* Password requirements */}
                {password && (
                  <div className="mt-3 space-y-2">
                    {passwordRequirements.map((req, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <div className={cn(
                          "flex h-4 w-4 items-center justify-center rounded-full transition-colors",
                          req.met ? "bg-success text-success-foreground" : "bg-muted"
                        )}>
                          {req.met && <Check className="h-3 w-3" />}
                        </div>
                        <span className={req.met ? "text-success" : "text-muted-foreground"}>
                          {req.label}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 rounded-xl bg-primary text-primary-foreground font-semibold transition-all duration-200 hover:shadow-lg active:scale-[0.98]"
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  Create account
                  <ArrowRight className="ml-2 h-5 w-5" />
                </>
              )}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-accent hover:underline">
              Sign in
            </Link>
          </p>

          <p className="text-center text-xs text-muted-foreground">
            By creating an account, you agree to our{" "}
            <Link href="#" className="underline hover:text-foreground">Terms of Service</Link>
            {" "}and{" "}
            <Link href="#" className="underline hover:text-foreground">Privacy Policy</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
