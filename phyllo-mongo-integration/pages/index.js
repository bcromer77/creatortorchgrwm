import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Script from 'next/script';
import Link from 'next/link';

export default function Home({ initialUserId, initialSdkToken }) {
  const [creatorData, setCreatorData] = useState({ 
    channel: '', 
    email: '', 
    country: '', 
    platforms: [], 
    contentPreferences: '', 
    audienceGoals: '' 
  });
  const [brandData, setBrandData] = useState({ email: '', budget: '', creators: '', locations: '', genre: '' });
  const [creatorSubmitted, setCreatorSubmitted] = useState(false);
  const [brandSubmitted, setBrandSubmitted] = useState(false);
  const [matches, setMatches] = useState([]);
  const [sdkReady, setSdkReady] = useState(false);

  useEffect(() => {
    if (window.PhylloConnect && creatorSubmitted) {
      const config = {
        clientDisplayName: 'CreatorTorch',
        environment: 'staging',
        userId: creatorData.userId || initialUserId,
        token: creatorData.sdkToken || initialSdkToken
      };
      const phylloConnect = window.PhylloConnect.initialize(config);
      phylloConnect.on('accountConnected', (accountId, workplatformId, userId) => {
        fetchMatchesFromAccount(accountId, workplatformId);
      });
      phylloConnect.on('exit', (reason, userId) => console.log(`Exit: ${reason}, ${userId}`));
      phylloConnect.open();
    }
  }, [creatorSubmitted, initialUserId, initialSdkToken]);

  const handleCreatorSignup = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/oauth/start', { 
      method: 'POST', 
      body: JSON.stringify({ email: creatorData.email }) 
    });
    const { userId, sdkToken } = await res.json();
    setCreatorData({ ...creatorData, userId, sdkToken });
    setCreatorSubmitted(true);
  };

  const handleBrandSignup = async (e) => {
    e.preventDefault();
    const brief = { ...brandData };
    await fetch('/api/signup', { 
      method: 'POST', 
      body: JSON.stringify({ ...brief, role: 'brand' }) 
    });
    const matchedCreators = await fetchMatches(brief);
    setMatches(matchedCreators);
    setBrandSubmitted(true);
    setBrandData({ email: '', budget: '', creators: '', locations: '', genre: '' });
  };

  const fetchMatchesFromAccount = async (accountId, platformId) => {
    const res = await fetch('/api/creators', { 
      method: 'POST', 
      body: JSON.stringify({ accountId, platformId }) 
    });
    const data = await res.json();
    setMatches(data);
  };

  const fetchMatches = async (brief) => {
    const res = await fetch('/api/creators', { 
      method: 'POST', 
      body: JSON.stringify(brief) 
    });
    return await res.json();
  };

  return (
    <div className="min-h-screen bg-cream-100 text-black font-sans flex flex-col items-center">
      <Head>
        <title>CreatorTorch | Join the Beauty Revolution</title>
        <meta name="description" content="Link your platforms and inspire the beauty world." />
      </Head>
      <Script src="https://cdn.getphyllo.com/connect/v2/phyllo-connect.js" onLoad={() => setSdkReady(true)} />

      <section className="text-center py-10">
        <motion.h1 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          className="text-6xl font-bold text-black mb-4"
        >
          CreatorTorch
        </motion.h1>
        <p className="text-2xl text-gray-700 max-w-xl mx-auto">
          Join a movement where every beauty creator shines. Together, we’ll redefine beauty for millions.
        </p>
      </section>

      <section className="flex flex-col md:flex-row gap-8 w-full max-w-4xl px-4">
        <div className="flex-1 text-center">
          <h2 className="text-3xl font-bold text-black mb-2">Welcome, Beauty Visionary!</h2>
          <p className="text-lg text-gray-700 mb-4">
            Let’s share your magic with the world. Your GRWM videos can inspire millions—join us to find brands who adore your authenticity.
          </p>
          <form onSubmit={handleCreatorSignup} className="flex flex-col gap-3">
            <input 
              type="text" 
              value={creatorData.channel} 
              onChange={(e) => setCreatorData({ ...creatorData, channel: e.target.value })} 
              placeholder="Your stage name—where your beauty shines" 
              className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-pink-300" 
              required 
            />
            <input 
              type="email" 
              value={creatorData.email} 
              onChange={(e) => setCreatorData({ ...creatorData, email: e.target.value })} 
              placeholder="Where we’ll send your brand love letters" 
              className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-pink-300" 
              required 
            />
            <input 
              type="text" 
              value={creatorData.country} 
              onChange={(e) => setCreatorData({ ...creatorData, country: e.target.value })} 
              placeholder="Where your beauty story unfolds" 
              className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-pink-300" 
              required 
            />
            <input 
              type="text" 
              value={creatorData.contentPreferences} 
              onChange={(e) => setCreatorData({ ...creatorData, contentPreferences: e.target.value })} 
              placeholder="What beauty topics light you up? (e.g., Clean Makeup, GRWM)" 
              className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-pink-300" 
              required 
            />
            <input 
              type="text" 
              value={creatorData.audienceGoals} 
              onChange={(e) => setCreatorData({ ...creatorData, audienceGoals: e.target.value })} 
              placeholder="Who do you want to inspire? (e.g., 18-24 females)" 
              className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-pink-300" 
              required 
            />
            <motion.button 
              whileHover={{ scale: 1.05 }} 
              className="bg-pink-600 text-white px-6 py-3 rounded-lg mt-2"
              disabled={!sdkReady}
            >
              Let’s Amplify Your Voice
            </motion.button>
          </form>
          {creatorSubmitted && (
            <p className="mt-2 text-pink-600">
              You’re in! Let’s make beauty magic together.{' '}
              <Link href="/creator/dashboard" className="underline">Go to Your Dashboard</Link>
            </p>
          )}
        </div>

        <div className="flex-1 text-center">
          <h2 className="text-3xl font-bold text-black mb-2">Brands</h2>
          <p className="text-lg text-gray-700 mb-4">
            $300/month. Find beauty creators who inspire your audience.
          </p>
          <form onSubmit={handleBrandSignup} className="flex flex-col gap-3">
            <input 
              type="email" 
              value={brandData.email} 
              onChange={(e) => setBrandData({ ...brandData, email: e.target.value })} 
              placeholder="Your email" 
              className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-pink-300" 
              required 
            />
            <input 
              type="number" 
              value={brandData.budget} 
              onChange={(e) => setBrandData({ ...brandData, budget: e.target.value })} 
              placeholder="Budget (e.g., 5000)" 
              className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-pink-300" 
              required 
            />
            <input 
              type="number" 
              value={brandData.creators} 
              onChange={(e) => setBrandData({ ...brandData, creators: e.target.value })} 
              placeholder="Creators (e.g., 5)" 
              className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-pink-300" 
              required 
            />
            <input 
              type="text" 
              value={brandData.locations} 
              onChange={(e) => setBrandData({ ...brandData, locations: e.target.value })} 
              placeholder="Locations (e.g., USA)" 
              className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-pink-300" 
              required 
            />
            <input 
              type="text" 
              value={brandData.genre} 
              onChange={(e) => setBrandData({ ...brandData, genre: e.target.value })} 
              placeholder="Genre (e.g., Clean Makeup)" 
              className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-pink-300" 
              required 
            />
            <motion.button 
              whileHover={{ scale: 1.05 }} 
              className="bg-black text-white px-6 py-3 rounded-lg mt-2"
            >
              Find Your Beauty Muses
            </motion.button>
          </form>
          {brandSubmitted && <p className="mt-2 text-black">Matches below.</p>}
        </div>
      </section>

      {matches.length > 0 && (
        <section className="mt-10 w-full max-w-4xl px-4">
          <h3 className="text-2xl font-bold text-center mb-4">Your GRWM Matches</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {matches.map((creator, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow"
              >
                <img 
                  src={creator.thumbnail || 'https://placehold.co/300x200'} 
                  alt={creator.channel} 
                  className="w-full h-32 object-cover rounded-md mb-2"
                />
                <h4 className="text-lg font-semibold">{creator.channel}</h4>
                <p className="text-sm truncate text-gray-700">{creator.content}</p>
                <p className="text-xs text-gray-600 mt-1">
                  {creator.country} | Sentiment: {creator.sentiment} | MCP Score: {creator.score}
                </p>
                {creator.mentions.length > 0 && (
                  <p className="text-xs text-gray-600 mt-1">
                    Product Mentions: {creator.mentions.map(m => `${m.keyword} at ${m.timestamp} (${m.sentiment})`).join(', ')}
                  </p>
                )}
                {creator.liveStreams.length > 0 && (
                  <p className="text-xs text-gray-600 mt-1">
                    Live Streams: {creator.liveStreams.map(ls => `${ls.platform} at ${ls.timestamp}`).join(', ')}
                  </p>
                )}
              </motion.div>
            ))}
          </div>
        </section>
      )}

      <footer className="mt-10 text-sm text-gray-600 py-4">
        <p>© 2025 CreatorTorch. hello@creatortorch.com</p>
      </footer>
    </div>
  );
}

export async function getServerSideProps() {
  return {
    props: {
      initialUserId: process.env.PHYLLO_TEST_USER_ID || 'YOUR_USER_ID',
      initialSdkToken: process.env.PHYLLO_TEST_SDK_TOKEN || 'YOUR_SDK_TOKEN'
    }
  };
}
