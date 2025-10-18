"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Bell, Menu, Play, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MainNav } from "@/components/main-nav";
import { ThemeToggle } from "@/components/theme-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";

export function SiteHeader() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  const isLandingPage = pathname === "/";
  const isAuthPage = pathname === "/sign-in" || pathname === "/sign-up";
  const isTermsPage = pathname === "/terms" || pathname === "/privacy";
  const isDashboardPage =
    pathname.startsWith("/home") ||
    pathname.startsWith("/watch") ||
    pathname.startsWith("/movies") ||
    pathname.startsWith("/tv-shows") ||
    pathname.startsWith("/categories") ||
    pathname.startsWith("/my-list") ||
    pathname.startsWith("/new") ||
    pathname.startsWith("/profile") ||
    pathname.startsWith("/search") ||
    pathname.startsWith("/notifications");

  useEffect(() => {
    setIsAuthenticated(isDashboardPage);
  }, [isDashboardPage]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  // Landing page
  if (isLandingPage) {
    return (
      <header className="absolute top-0 left-0 right-0 z-50 bg-transparent">
        <div className="container flex h-16 items-center justify-between px-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/logo.png"
              alt="Streamflix Logo"
              width={32}
              height={32}
              className="h-8 w-8 sm:h-10 sm:w-10"
            />
            <span className="hidden sm:inline text-2xl font-bold text-red-400">
              StreamFlix
            </span>
          </Link>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:text-red-400"
              asChild
            >
              <Link href="/sign-in">Sign In</Link>
            </Button>
            <Button
              size="sm"
              className="bg-red-600 hover:bg-red-700 text-white"
              asChild
            >
              <Link href="/sign-up">Start Free Trial</Link>
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </header>
    );
  }

  // Dashboard header
  if (isAuthenticated) {
    return (
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 sm:h-16 items-center justify-between px-4 gap-2">
          {/* Logo + Nav */}
          <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
           <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/logo.png"
              alt="Streamflix Logo"
              width={32}
              height={32}
              className="h-8 w-8 sm:h-10 sm:w-10"
            />
            <span className="hidden sm:inline text-2xl font-bold text-red-400">
              StreamFlix
            </span>
          </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex">
              <MainNav />
            </div>
          </div>

          <div className="flex items-center gap-1 sm:gap-2 flex-1 justify-end min-w-0">
            {/* Search bar - now more prominent on mobile */}
            <form
              onSubmit={handleSearch}
              className="relative flex-1 max-w-[160px] sm:max-w-[220px] md:max-w-[280px] lg:max-w-[380px]"
            >
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
              <Input
                type="search"
                placeholder="Search..."
                className="rounded-full pl-8 pr-3 w-full h-9 text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>

            {/* Icons - hidden on small screens to give search more space */}
            <Button variant="ghost" size="icon" className="hidden md:flex h-9 w-9 flex-shrink-0" asChild>
              <Link href="/notifications">
                <Bell className="h-4 w-4" />
                <span className="sr-only">Notifications</span>
              </Link>
            </Button>

            {/* Avatar */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full flex-shrink-0">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">username</p>
                    <p className="text-xs leading-none text-muted-foreground">user@example.com</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/user-dashboard">Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/my-list">My List</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/settings">Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="md:hidden" asChild>
                  <Link href="/notifications">Notifications</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="md:hidden" />
                <DropdownMenuItem asChild>
                  <Link href="/">Sign out</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <ThemeToggle className="flex-shrink-0" />

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden h-9 w-9 flex-shrink-0">
                  <Menu className="h-4 w-4" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-64">
                <div className="flex flex-col space-y-4">
                  <MainNav isMobile />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
    )
  }

  // Auth pages
  if (isAuthPage) {
    return (
      <header className="sticky top-0 z-40 w-full bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/logo.png"
              alt="Streamflix Logo"
              width={32}
              height={32}
              className="h-8 w-8 sm:h-10 sm:w-10"
            />
            <span className="hidden sm:inline text-2xl font-bold text-red-400">
              StreamFlix
            </span>
          </Link>
          <ThemeToggle />
        </div>
      </header>
    );
  }

 if (isTermsPage) {
  // figure out which page the user is on
  const isOnTerms = pathname === "/terms";
  const otherPage = isOnTerms
    ? { href: "/privacy", label: "Privacy Policy" }
    : { href: "/terms", label: "Terms of Service" };

  return (
    <header className="sticky top-0 z-40 w-full bg-background/95 backdrop-blur">
      <div className="container mx-auto px-4 py-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <img src="/logo.png" alt="StreamFlix" className="w-10 h-10 rounded" />
          <span className="font-bold text-red-400 text-lg">StreamFlix</span>
        </Link>

        <nav className="flex items-center gap-4">
          {/* Show the opposite link based on current page */}
          <Link
            href={otherPage.href}
            className="text-sm text-gray-300 hover:text-white"
          >
            {otherPage.label}
          </Link>
          <Link
            href="/"
            className="text-sm bg-red-600 px-3 py-1 rounded text-white hover:bg-red-700"
          >
            Home
          </Link>
        </nav>
      </div>
    </header>
  );
}

}
