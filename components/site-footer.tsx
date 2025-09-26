import Link from "next/link"
import { Play, Facebook, Twitter, Instagram, Youtube } from "lucide-react"
import Image from 'next/image'

export function SiteFooter() {
  return (
    <footer className="bg-black border-t border-gray-800 py-12">
      <div className="container">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="space-y-4">
           <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/logo.png"
              alt="Streamflix Logo"
              width={40} // adjust as needed
              height={40}
              className="h-8 w-8"
            />
            {/* Optional text if you still want it beside the image */}
            <span className="text-2xl font-bold text-red-400">StreamFlix</span>
          </Link>
            <p className="text-gray-400 text-sm">
              The ultimate streaming experience with thousands of movies, shows, and originals.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-red-400">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-red-400">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-red-400">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-red-400">
                <Youtube className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-gray-400 hover:text-white">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/press" className="text-gray-400 hover:text-white">
                  Press
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-400 hover:text-white">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/help" className="text-gray-400 hover:text-white">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-400 hover:text-white">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-400 hover:text-white">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Features</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/devices" className="text-gray-400 hover:text-white">
                  Supported Devices
                </Link>
              </li>
              <li>
                <Link href="/downloads" className="text-gray-400 hover:text-white">
                  Download App
                </Link>
              </li>
              <li>
                <Link href="/gift-cards" className="text-gray-400 hover:text-white">
                  Gift Cards
                </Link>
              </li>
              <li>
                <Link href="/originals" className="text-gray-400 hover:text-white">
                  StreamFlix Originals
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">&copy; {new Date().getFullYear()} StreamFlix. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
