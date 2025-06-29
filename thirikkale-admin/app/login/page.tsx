"use client"
import { GalleryVerticalEnd } from "lucide-react"
import Image from "next/image"
import { LoginForm } from "@/components/login-form"

export default function LoginPage() {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-2">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          {/* <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
            <GalleryVerticalEnd className="size-4" />
          </div> */}
          <Image
            src="/ThirikkaleMain.svg"
            alt="App Logo"
            width={150}
            height={70}
            style={{ 
              width: 140, 
              height: "auto", 
              display: "flex",
              justifyContent: "center",
              alignItems: "center", 
            }}
            priority
            unoptimized
            className="self-center ml-2"
          />
        </a>
        <LoginForm />
      </div>
    </div>
  )
}
