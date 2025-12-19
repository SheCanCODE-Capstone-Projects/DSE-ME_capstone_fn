"use client"

export default function Footer() {
  return (
    <footer className="ml-28 border-t border-gray-300 px-4 md:px-8 py-4 md:py-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-xs md:text-sm text-gray-600 text-center md:text-left">© 2025 DSE & ME Platform. All rights reserved.</p>
        <div className="flex flex-wrap gap-4 md:gap-6 justify-center">
          <a href="#" className="text-xs md:text-sm text-gray-600 hover:text-gray-800">
            Privacy Policy
          </a>
          <a href="#" className="text-xs md:text-sm text-gray-600 hover:text-gray-800">
            Terms of Service
          </a>
          <a href="#" className="text-xs md:text-sm text-gray-600 hover:text-gray-800">
            Contact
          </a>
        </div>
      </div>
    </footer>
  )
}