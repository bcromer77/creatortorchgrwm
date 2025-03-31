import TryBeautyMatchButton from "@/components/try-beauty-match-button"
import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-black font-sans">
      {/* Navigation */}
      <nav className="py-6 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold">CreatorTorch</div>
          <div className="flex gap-8">
            <Link href="/pricing" className="text-gray-600 hover:text-black transition-colors">
              Pricing
            </Link>
            <Link href="/beautymatch" className="text-gray-600 hover:text-black transition-colors">
              BeautyMatch✨
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 text-center max-w-3xl mx-auto px-4">
        <div className="relative inline-block mb-6">
          <h1 className="text-5xl font-bold relative z-10">CreatorTorch</h1>
          <div className="absolute -bottom-2 left-0 right-0 h-3 bg-gradient-to-r from-indigo-100 via-violet-200 to-purple-100 rounded-full opacity-70 z-0"></div>
        </div>
        <p className="text-xl mb-8">
          We don’t peddle popularity contests. We don’t count likes. We unearth creators who <em>speak</em> your brand’s
          truth—matching them to you with surgical precision, straight from the heart of YouTube.
        </p>

        <TryBeautyMatchButton />
      </section>

      <footer className="py-8 text-center">
        <div className="h-1 w-16 bg-gradient-to-r from-indigo-400 to-violet-400 rounded-full mx-auto mb-4"></div>
        <p className="text-gray-600">© 2025 CreatorTorch. hello@creatortorch.com</p>
      </footer>
    </div>
  )
}
