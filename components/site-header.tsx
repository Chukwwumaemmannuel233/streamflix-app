"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Bell, Crown, LogOut, Menu, Search } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MainNav } from "@/components/main-nav";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
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
  const [isSignOutOpen, setIsSignOutOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const isLandingPage = pathname === "/" || pathname === "/landing";
  const isStudioLandingPage = pathname === "/studio";
  const isWaitlistPage = pathname === "/waitlist";
  const isAuthPage = pathname === "/sign-in" || pathname === "/sign-up";
  const isTermsPage = pathname === "/terms" || pathname === "/privacy";
  const isDashboardPage =
    pathname.startsWith("/home") ||
    pathname.startsWith("/user-dashboard") ||
    pathname.startsWith("/watch") ||
    pathname.startsWith("/movies") ||
    pathname.startsWith("/tv-shows") ||
    pathname.startsWith("/categories") ||
    pathname.startsWith("/my-list") ||
    pathname.startsWith("/new") ||
    pathname.startsWith("/profile") ||
    pathname.startsWith("/settings") ||
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

  const handleSignOut = () => {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem("streamflix-account");
    }

    setIsSignOutOpen(false);
    toast.success("Signed out", {
      description: "You have been safely signed out of StreamFlix.",
    });
    router.push("/");
  };

  if (isWaitlistPage) {
    return null;
  }

  // Viewer landing page
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
              className="hidden text-white hover:text-red-400 sm:inline-flex"
              asChild
            >
              <Link href="/studio">For Studios</Link>
            </Button>
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
          </div>
        </div>
      </header>
    );
  }

  // Studio landing page
  if (isStudioLandingPage) {
    return (
      <header className="absolute top-0 left-0 right-0 z-50 bg-transparent">
        <div className="container flex h-16 items-center justify-between px-4">
          <Link href="/studio" className="flex items-center space-x-2">
            <Image
              src="/logo.png"
              alt="Streamflix Studio Logo"
              width={32}
              height={32}
              className="h-8 w-8 sm:h-10 sm:w-10"
            />
            <span className="hidden sm:inline text-2xl font-bold text-white">
              StreamFlix Studio
            </span>
          </Link>

          <div className="flex items-center gap-2 sm:gap-4">
            <Button
              variant="ghost"
              size="sm"
              className="hidden text-white hover:text-red-300 sm:inline-flex"
              asChild
            >
              <Link href="/">Viewer Site</Link>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:text-red-300"
              asChild
            >
              <Link href="/studio/sign-in">Sign In</Link>
            </Button>
            <Button
              size="sm"
              className="bg-red-600 hover:bg-red-500 text-white"
              asChild
            >
              <Link href="/studio/sign-up">Join Studio</Link>
            </Button>
          </div>
        </div>
      </header>
    );
  }

  // Viewer header
  if (isAuthenticated) {
    return (
      <>
      <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-[#050505]/90 text-white shadow-[0_12px_40px_rgba(0,0,0,0.28)] backdrop-blur-xl">
        <div className="container flex h-14 items-center justify-between gap-4 px-4 sm:h-16">
          {/* Logo + Nav */}
          <div className="flex shrink-0 items-center gap-3 xl:gap-5">
           <Link href="/home" className="flex items-center space-x-2">
            <Image
              src="/logo.png"
              alt="Streamflix Logo"
              width={32}
              height={32}
              className="h-8 w-8 sm:h-10 sm:w-10"
            />
            <span className="hidden text-xl font-black text-white 2xl:inline">
              StreamFlix
            </span>
          </Link>

            {/* Desktop Nav */}
            <div className="hidden xl:flex">
              <MainNav />
            </div>
          </div>

          <div className="flex min-w-0 flex-1 items-center justify-end gap-2">
            {/* Search bar - now more prominent on mobile */}
            <form
              onSubmit={handleSearch}
              className="relative hidden flex-1 sm:block sm:max-w-[220px] md:max-w-[280px] xl:max-w-[320px] 2xl:max-w-[420px]"
            >
              <Search className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-zinc-500" />
              <Input
                type="search"
                placeholder="Search titles..."
                className="h-9 w-full rounded-full border-white/10 bg-white/[0.08] pl-9 pr-3 text-sm text-white placeholder:text-zinc-500 focus-visible:ring-red-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>

            <Button
              className="hidden h-9 flex-shrink-0 gap-2 rounded-full bg-red-600 px-4 text-white hover:bg-red-500 2xl:inline-flex"
              asChild
            >
              <Link href="/payment">
                <Crown className="h-4 w-4" />
                Upgrade
              </Link>
            </Button>

            {/* Icons - hidden on small screens to give search more space */}
            <Button variant="ghost" size="icon" className="hidden h-9 w-9 flex-shrink-0 text-zinc-300 hover:bg-white/10 hover:text-white md:flex" asChild>
              <Link href="/notifications">
                <Bell className="h-4 w-4" />
                <span className="sr-only">Notifications</span>
              </Link>
            </Button>

            {/* Avatar */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 flex-shrink-0 rounded-full border border-white/10 bg-white/[0.06] p-0 hover:bg-white/12">
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
                  <Link href="/my-list">My List</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/payment">Plans & Billing</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/settings">Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="md:hidden" asChild>
                  <Link href="/notifications">Notifications</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="md:hidden" />
                <DropdownMenuItem
                  className="text-red-500 focus:bg-red-500/10 focus:text-red-400"
                  onSelect={(event) => {
                    event.preventDefault();
                    setIsSignOutOpen(true);
                  }}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9 flex-shrink-0 text-zinc-300 hover:bg-white/10 hover:text-white xl:hidden">
                  <Menu className="h-4 w-4" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72 border-white/10 bg-[#08080b] text-white">
                <div className="flex flex-col space-y-5">
                  <Link href="/home" className="flex items-center gap-3">
                    <Image src="/logo.png" alt="StreamFlix" width={36} height={36} className="h-9 w-9 rounded-lg" />
                    <span className="text-lg font-black">StreamFlix</span>
                  </Link>
                  <MainNav isMobile />
                  <Button className="bg-red-600 font-bold hover:bg-red-500" asChild>
                    <Link href="/payment">
                      <Crown className="h-4 w-4" />
                      Upgrade plan
                    </Link>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
      <AlertDialog open={isSignOutOpen} onOpenChange={setIsSignOutOpen}>
        <AlertDialogContent className="border-white/10 bg-[#08080b] text-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Sign out of StreamFlix?</AlertDialogTitle>
            <AlertDialogDescription>
              You will return to the landing page. Your local demo trial can be recreated by signing in again.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-white/15 bg-transparent text-white hover:bg-white/10 hover:text-white">
              Stay signed in
            </AlertDialogCancel>
            <AlertDialogAction className="bg-red-600 text-white hover:bg-red-500" onClick={handleSignOut}>
              Sign out
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      </>
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
