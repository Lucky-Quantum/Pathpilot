"use client";

import React from "react";
import { Button } from "./ui/button";
import {
  PenBox,
  LayoutDashboard,
  FileText,
  GraduationCap,
  ChevronDown,
  StarsIcon,
  Sun,
  Moon,
} from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import PathPilotLogo from "./pathpilot-logo";

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="w-9 h-9 flex items-center justify-center rounded-lg border border-border hover:bg-muted transition-colors relative"
      aria-label="Toggle theme"
    >
      <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 absolute" />
      <Moon className="h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 absolute" />
    </button>
  );
}

export default function Header() {
  return (
    <header className="fixed top-0 w-full border-b bg-background/80 backdrop-blur-md z-50 supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/">
          <PathPilotLogo />
        </Link>

         {/* Action Buttons */}
         <div className="flex items-center space-x-2 md:space-x-4">
           <SignedIn>
             <Link href="/dashboard">
               <Button
                 variant="outline"
                 className="hidden md:inline-flex items-center gap-2"
               >
                 <LayoutDashboard className="h-4 w-4" />
                 Industry Insights
               </Button>
               <Button variant="ghost" className="md:hidden w-10 h-10 p-0">
                 <LayoutDashboard className="h-4 w-4" />
               </Button>
             </Link>

             {/* Growth Tools Dropdown */}
             <DropdownMenu>
               <DropdownMenuTrigger asChild>
                 <Button className="flex items-center gap-2">
                   <StarsIcon className="h-4 w-4" />
                   <span className="hidden md:block">Growth Tools</span>
                   <ChevronDown className="h-4 w-4" />
                 </Button>
               </DropdownMenuTrigger>
               <DropdownMenuContent align="end" className="w-48">
                 <DropdownMenuItem asChild>
                   <Link href="/resume" className="flex items-center gap-2">
                     <FileText className="h-4 w-4" />
                     Build Resume
                   </Link>
                 </DropdownMenuItem>
                 <DropdownMenuItem asChild>
                   <Link href="/ai-cover-letter" className="flex items-center gap-2">
                     <PenBox className="h-4 w-4" />
                     Cover Letter
                   </Link>
                 </DropdownMenuItem>
                 <DropdownMenuItem asChild>
                   <Link href="/interview" className="flex items-center gap-2">
                     <GraduationCap className="h-4 w-4" />
                     Interview Prep
                   </Link>
                 </DropdownMenuItem>
               </DropdownMenuContent>
             </DropdownMenu>
             
             {/* About Us Link */}
             <Link href="/aboutus">
               <Button variant="ghost" className="hidden md:inline-flex items-center gap-2">
                 <i className="fa-solid fa-circle-info"></i>
                 About Us
               </Button>
             </Link>
           </SignedIn>

           <SignedOut>
             <Link href="/behind-the-build">
               <Button variant="ghost" className="hidden md:inline-flex">
                 Behind The Build
               </Button>
             </Link>
             
             <SignInButton>
               <Button variant="outline">Sign In</Button>
             </SignInButton>
           </SignedOut>

           <ThemeToggle />
         </div>
      </nav>
    </header>
  );
}