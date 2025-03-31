"use client"

import Link from "next/link"
import TryBeautyMatchButton from "../components/try-beauty-match-button"

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-black font-sans">
      {/* Navigation */}
      <nav className="py-6 px-4">
        <div className="max-w-7xl mx-auto flex justify-between 
items-center">
          <div className="text-2xl font-bold">CreatorTorch</div>
          <div className="flex gap-8">
            <Link href="/pricing" className="text-gray-600 
hover:text-black transition duration-200">
              Pricing
            </Link>
            <Link href="/beautymatch" className="text-gray-600 
hover:text-black transition duration-200">
              BeautyMatch✨
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="text-center py-20">
        <h1 className="text-5xl font-extrabold mb-6">Find Creators Who 
Actually Care</h1>
        <p className="text-lg text-gray-700 mb-8">CreatorTorch is the 
first matchmaking platform powered by real-time video sentiment & audience 
loyalty signals.</p>
        <TryBeautyMatchButton />
      </section>
    </div>
  )
}

