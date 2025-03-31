import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Head from 'next/head';

export default function CreatorDashboard() {
  const [creatorData, setCreatorData] = useState(null);
  const [tips, setTips] = useState([]);
  const [combinations, setCombinations] = useState([]);

  useEffect(() => {
    const fetchCreatorData = async () => {
      const res = await fetch('/api/creators', {
        method: 'POST',
        body: JSON.stringify({ accountId: 'mock-account-id', platformId: 'mock-platform-id' })
      });
      const data = await res.json();
      setCreatorData(data[0]);
    };
    fetchCreatorData();

    setTips([
      'Post a GRWM video this week—your audience loves your authenticity!',
      'Go live on TikTok at 7:00 PM—your fans are most active then.',
      'Try a "White Jeans at Night Time" look—trending topics attract more views.'
    ]);
    setCombinations([
      'Pair a "White Jeans at Night Time" look with a clean makeup tutorial—perfect for evening vibes.',
      'Try a "Skincare Routine Before Bed" GRWM—your audience craves nighttime rituals.'
    ]);
  }, []);

  return (
    <div className="min-h-screen bg-cream-100 text-black font-sans flex flex-col items-center py-10">
      <Head>
        <title>CreatorTorch | Your Beauty Dashboard</title>
        <meta name="description" content="Amplify your beauty voice and inspire millions." />
      </Head>

      <section className="text-center mb-10">
        <motion.h1 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          className="text-5xl font-bold text-black mb-2"
        >
          Hello, Beauty Visionary!
        </motion.h1>
        <p className="text-xl text-gray-700 max-w-xl mx-auto">
          Let’s make magic together. Your GRWM videos can inspire millions—let’s find brands who adore your authenticity.
        </p>
      </section>

      <div className="w-full max-w-3xl px-4 space-y-8">
        <motion.section 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow"
        >
          <h2 className="text-2xl font-bold text-black mb-2">Your Beauty Impact Score</h2>
          <p className="text-3xl font-semibold text-pink-600">{creatorData?.score || 35}/100</p>
          <p className="text-gray-700 mt-2">
            Brands love you for your mentions (+10 for “Charlotte Tilbury”), engagement (+10 for positive sentiment), and audience fit (+15 for 18-24 females in the USA). The higher your score, the more brands will fall in love with your unique voice.
          </p>
        </motion.section>

        <motion.section 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow"
        >
          <h2 className="text-2xl font-bold text-black mb-2">Tips to Amplify Your Reach</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            {tips.map((tip, i) => (
              <li key={i}>{tip} <span className="text-pink-600 font-light">—let’s reach them together.</span></li>
            ))}
          </ul>
        </motion.section>

        <motion.section 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow"
        >
          <h2 className="text-2xl font-bold text-black mb-2">Why Brands Adore You</h2>
          <p className="text-gray-700">
            Your GRWM videos mention trending products like Charlotte Tilbury—brands adore your authenticity. Your audience (80% female, 18-24) is perfect for clean makeup campaigns. <span className="text-pink-600 font-light">Brands see you as a beauty muse—your story resonates.</span>
          </p>
        </motion.section>

        <motion.section 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow"
        >
          <h2 className="text-2xl font-bold text-black mb-2">Inspiring Content Ideas</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            {combinations.map((combo, i) => (
              <li key={i}>{combo} <span className="text-pink-600 font-light">—your creativity sets trends.</span></li>
            ))}
          </ul>
        </motion.section>

        <motion.section 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="bg-pink-50 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow text-center"
        >
          <h2 className="text-2xl font-bold text-black mb-2">Join the Beauty Revolution</h2>
          <p className="text-gray-700 mb-4">
            Invite your creator friends to join the movement—together, we’ll redefine beauty. This isn’t a competition—it’s a collaboration to make beauty shine brighter.
          </p>
          <motion.button 
            whileHover={{ scale: 1.05 }} 
            className="bg-pink-600 text-white px-6 py-2 rounded-full"
          >
            Invite Friends
          </motion.button>
        </motion.section>
      </div>

      <footer className="mt-10 text-sm text-gray-600 py-4">
        <p>© 2025 CreatorTorch. hello@creatortorch.com</p>
      </footer>
    </div>
  );
}
