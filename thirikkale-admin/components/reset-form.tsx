"use client"
import React from "react"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type Step = "email" | "otp" | "password"

export function ResetForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [step, setStep] = React.useState<Step>("email")
  const [email, setEmail] = React.useState("")
  const [otp, setOtp] = React.useState("")
  const [newPassword, setNewPassword] = React.useState("")
  const [confirmPassword, setConfirmPassword] = React.useState("")
  const [error, setError] = React.useState<string | null>(null)
  const [loading, setLoading] = React.useState(false)
  const [success, setSuccess] = React.useState(false)
  const [redirectCountdown, setRedirectCountdown] = React.useState(5)
  const router = useRouter()

  // Simulate API calls for demonstration
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    // Simulate API call to send OTP
    setTimeout(() => {
      setLoading(false)
      setStep("otp")
    }, 1000)
  }

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    // Simulate OTP verification
    setTimeout(() => {
      if (otp === "123456") {
        setLoading(false)
        setStep("password")
      } else {
        setLoading(false)
        setError("Invalid OTP. Please try again.")
      }
    }, 1000)
  }

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    // Simulate password reset
    setTimeout(() => {
      if (newPassword !== confirmPassword) {
        setLoading(false)
        setError("Passwords do not match.")
        return
      }
      setLoading(false)
      setSuccess(true)
      setRedirectCountdown(5)
    }, 1000)
  }

  // Redirect to dashboard after 5 seconds if password reset is successful
  React.useEffect(() => {
    if (success) {
      if (redirectCountdown === 0) {
        router.push("/dashboard")
        return
      }
      const timer = setTimeout(() => {
        setRedirectCountdown((c) => c - 1)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [success, redirectCountdown, router])

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">
            {step === "email" && "Reset your password"}
            {step === "otp" && "Enter OTP"}
            {step === "password" && "Set New Password"}
          </CardTitle>
          <CardDescription>
            {step === "email" && "Enter your email to receive a reset code."}
            {step === "otp" && `A 6-digit code was sent to ${email}.`}
            {step === "password" && "Enter your new password below."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {success ? (
            <div className="flex flex-col items-center gap-4">
              <div className="text-center text-green-600 font-semibold">
                Your password has been reset successfully!
              </div>
              <div className="text-sm text-muted-foreground">
                Redirecting to dashboard in{" "}
                {redirectCountdown} second{redirectCountdown !== 1 ? "s" : ""}...
              </div>
              <Button
                className="w-full bg-blue-400 hover:bg-blue-300"
                onClick={() => router.push("/dashboard")}
              >
                Go to Dashboard now
              </Button>
            </div>
          ) : (
            <>
              {error && (
                <div className="mb-4 text-red-500 text-sm text-center">{error}</div>
              )}
              {step === "email" && (
                <form onSubmit={handleEmailSubmit}>
                  <div className="grid gap-6">
                    <div className="grid gap-3">
                      <Label htmlFor="reset-email">Email</Label>
                      <Input
                        id="reset-email"
                        type="email"
                        placeholder="m@example.com"
                        required
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        disabled={loading}
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-blue-400 hover:bg-blue-300"
                      disabled={loading}
                    >
                      {loading ? "Sending..." : "Send OTP"}
                    </Button>
                  </div>
                </form>
              )}
              {step === "otp" && (
                <form onSubmit={handleOtpSubmit}>
                  <div className="grid gap-6">
                    <div className="grid gap-3">
                      <Label htmlFor="otp">OTP</Label>
                      <Input
                        id="otp"
                        type="text"
                        placeholder="Enter 6-digit code"
                        required
                        value={otp}
                        onChange={e => setOtp(e.target.value)}
                        disabled={loading}
                        maxLength={6}
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-blue-400 hover:bg-blue-300"
                      disabled={loading}
                    >
                      {loading ? "Verifying..." : "Verify OTP"}
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      className="w-full"
                      onClick={() => setStep("email")}
                      disabled={loading}
                    >
                      Change Email
                    </Button>
                  </div>
                </form>
              )}
              {step === "password" && (
                <form onSubmit={handlePasswordSubmit}>
                  <div className="grid gap-6">
                    <div className="grid gap-3">
                      <Label htmlFor="new-password">New Password</Label>
                      <Input
                        id="new-password"
                        type="password"
                        placeholder="Enter new password"
                        required
                        value={newPassword}
                        onChange={e => setNewPassword(e.target.value)}
                        disabled={loading}
                      />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="confirm-password">Confirm Password</Label>
                      <Input
                        id="confirm-password"
                        type="password"
                        placeholder="Confirm new password"
                        required
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                        disabled={loading}
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-blue-400 hover:bg-blue-300"
                      disabled={loading}
                    >
                      {loading ? "Resetting..." : "Reset Password"}
                    </Button>
                  </div>
                </form>
              )}
            </>
          )}
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  )
}
