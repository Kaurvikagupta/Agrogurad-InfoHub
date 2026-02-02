import { useState, useContext } from 'react'
import { ThemeContext } from '../ThemeContext'
import { translations } from '../translations'
import { GovernmentPost, AIAdvisoryPost, FarmerPost, MarketPost, DisasterAlert } from './PostTypes'

const INITIAL_POSTS = [
  {
    id: 1,
    type: 'farmer',
    author: 'Ramesh Kumar',
    verified: true,
    location: 'Kerala, India',
    content: 'Achieved 45% higher yield this season using global best practices. AI-guided crop monitoring helped identify optimal harvest timing. Amazing results! 🌾',
    // primary: use the Gemini-generated image placed in public/assets
    image: ['/assets/Gemini_Generated_Image_wuxmdswuxmdswuxm.png', '/assets/ai-guided-harvest.jpg', '/assets/Gemini_Generated_Image_bue12bbue12bbue1.png', '/assets/rice-paddy.svg', 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=1200&h=800&fit=crop'],
    likes: 2340,
    time: '2 hours ago',
  },
  {
    id: 2,
    type: 'farmer',
    author: 'Sarah Mitchell',
    verified: true,
    location: 'Iowa, USA',
    content: 'Switched to precision agriculture technology. Reduced fertilizer use by 30% while maintaining corn yield. ROI in just one season! 🌽',
    image: ['/assets/Gemini_Generated_Image_hcm8xahcm8xahcm8.png', '/assets/precision-agri.svg', 'https://images.unsplash.com/photo-1574943605283-109b26c8cf5e?w=1200&h=800&fit=crop'],
    likes: 1856,
    time: '4 hours ago',
  },
  {
    id: 3,
    type: 'ai',
    icon: '🌾',
    title: 'Global Wheat Harvest Guidelines - 2026',
    location: 'USA, Canada, India, Ukraine, Russia',
    content: 'Optimal harvest window analysis for wheat across major producing regions. AI predictions show 15% yield improvement with precision timing.',
    keyPoints: [
      'Monitor grain moisture levels: 14-15%',
      'Use satellite imagery for field readiness',
      'Harvest timing varies by latitude',
      'Global market prices trending upward',
    ],
    shares: 3421,
    comments: 456,
    time: '6 hours ago',
  },
  {
    id: 4,
    type: 'market',
    commodity: 'Corn',
    market: 'CBOT - Chicago Futures',
    price: 4.85,
    trend: 'up',
    unit: 'USD/bushel',
    high: 4.95,
    low: 4.72,
    time: '30 minutes ago',
  },
  {
    id: 5,
    type: 'government',
    ministry: '🌍',
    title: 'UN-FAO Climate-Smart Agriculture Initiative 2026',
    content: 'Global program launched to support sustainable farming practices. Includes funding for technology adoption, training, and market linkages across 50+ countries.',
    details: [
      'Grants up to $50,000 per farmer cooperative',
      'Free training programs in 25 languages',
      'Carbon credit marketplace integration',
      'Technical support for 5 years'
    ],
    pdfLink: true,
    applyLink: true,
    shares: 5432,
    comments: 789,
    time: '8 hours ago',
  },
  {
    id: 6,
    type: 'farmer',
    author: 'Carlos Santos',
    verified: true,
    location: 'São Paulo, Brazil',
    content: 'Switched to regenerative agriculture. Soil health improved dramatically in just 2 seasons. Soybean yield increased 25% with lower input costs! 🌱',
    image: ['/assets/Gemini_Generated_Image_bue12bbue12bbue1.png', '/assets/regenerative-soil.svg', 'https://images.unsplash.com/photo-1560807707-fcc28719c529?w=1200&h=800&fit=crop'],
    likes: 1645,
    time: '5 hours ago',
  },
  {
    id: 7,
    type: 'market',
    commodity: 'Rice',
    market: 'Bangkok Futures Exchange',
    price: 285.50,
    trend: 'down',
    unit: 'USD/ton',
    high: 295,
    low: 280,
    time: '2 hours ago',
  },
  {
    id: 8,
    type: 'ai',
    icon: '🚜',
    title: 'Smart Irrigation Technology Breakthrough',
    location: 'Global - All Regions',
    content: 'New IoT sensors reduce water usage by 40% while improving crop yield. Affordable pricing makes adoption accessible for all farm sizes.',
    keyPoints: [
      'Soil moisture real-time monitoring',
      'Weather-integrated scheduling',
      '5-year payback period',
      'Works with existing equipment',
    ],
    shares: 2134,
    comments: 312,
    time: '10 hours ago',
  },
  {
    id: 9,
    type: 'farmer',
    author: 'Anna Wagner',
    verified: true,
    location: 'Baden-Württemberg, Germany',
    content: 'Implemented European organic certification. Now selling premium products at 3x the price. Sustainability pays! 🥬',
    image: ['/assets/Gemini_Generated_Image_notnnxnotnnxnotn.png', 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&h=800&fit=crop'],
    likes: 987,
    time: '7 hours ago',
  },
  {
    id: 10,
    type: 'government',
    ministry: '🌐',
    title: 'EU Common Agricultural Policy 2026 Updates',
    content: 'New subsidies for crop diversification and biodiversity initiatives. Support for young farmers entering the sector.',
    details: [
      'Direct payments increased by 5%',
      'Young farmer grants up to €30,000',
      'Biodiversity premium: €100/hectare',
      'Digital farm tools subsidy program'
    ],
    pdfLink: true,
    applyLink: true,
    shares: 3456,
    comments: 567,
    time: '12 hours ago',
  },
  {
    id: 11,
    type: 'farmer',
    author: 'Liu Chen',
    verified: true,
    location: 'Shandong, China',
    content: 'Used vertical farming techniques in greenhouses. 10x land productivity compared to traditional methods. Perfect for urban areas! 🏢',
    image: ['/assets/Gemini_Generated_Image_u9rkaqu9rkaqu9rk.png', 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=1200&h=800&fit=crop'],
    likes: 2876,
    time: '9 hours ago',
  },
  {
    id: 12,
    type: 'market',
    commodity: 'Soybean',
    market: 'CBOT - Chicago Futures',
    price: 10.25,
    trend: 'up',
    unit: 'USD/bushel',
    high: 10.50,
    low: 9.95,
    time: '1 hour ago',
  },
  {
    id: 13,
    type: 'ai',
    icon: '🐛',
    title: 'Pest Alert: Armyworm Invasion Expected',
    location: 'East Africa - Kenya, Tanzania, Ethiopia',
    content: 'Early warning system predicts major armyworm migration. Farmers advised to prepare integrated pest management strategies.',
    keyPoints: [
      'Monitor crops weekly',
      'Coordinate with regional authorities',
      'Pheromone traps available',
      'Biological control methods recommended',
    ],
    shares: 1876,
    comments: 234,
    time: '3 hours ago',
  },
  {
    id: 14,
    type: 'farmer',
    author: 'Ahmed Hassan',
    verified: true,
    location: 'Cairo, Egypt',
    content: 'Desert farming breakthrough! Using drip irrigation and shade nets, grew premium vegetables. Export quality achieved! 🥒',
    image: ['/assets/Gemini_Generated_Image_rujrwkrujrwkrujr.png', 'https://images.unsplash.com/photo-1599599810694-cb5d01ffd372?w=1200&h=800&fit=crop'],
    likes: 1543,
    time: '11 hours ago',
  },
]

const HEADER_MESSAGES = {
  en: 'Global Farmer Updates - Real-Time Agricultural News From Around the World',
  hi: 'वैश्विक किसान अपडेट - दुनिया भर से वास्तविक समय कृषि समाचार',
  mr: 'जागतिक शेतकरी अपडेट्स - जगभर रीयल-टाइम कृषी बातम्या',
}

import Stories from './Stories'

export default function Feed({ activeTab, language = 'en', region, onImageClick }) {
  const [posts, setPosts] = useState(INITIAL_POSTS)
  const [search, setSearch] = useState('')
  const [autoRefresh, setAutoRefresh] = useState(true)
  const { dark } = useContext(ThemeContext)
  const t = translations[language]

  // Filter posts by tab
  const filteredPosts = posts.filter(post => {
    if (activeTab === 'feed') return true
    return true
  }).filter(post => {
    if (!search) return true
    const searchLower = search.toLowerCase()
    return (
      post.title?.toLowerCase().includes(searchLower) ||
      post.content?.toLowerCase().includes(searchLower) ||
      post.author?.toLowerCase().includes(searchLower)
    )
  })

  // Handle Like
  const handleLike = (id) => {
    setPosts(prevPosts => prevPosts.map(post => {
      if (post.id === id) {
        return { ...post, likes: (post.likes || 0) + 1 }
      }
      return post
    }))
  }

  // Handle Save
  const handleSave = (id) => {
    setPosts(prevPosts => prevPosts.map(post => {
      if (post.id === id) {
        return { ...post, saved: !post.saved }
      }
      return post
    }))
  }

  const renderPost = (post, onImageClick) => {
    switch (post.type) {
      case 'government':
        return <GovernmentPost key={post.id} post={post} language={language} onSave={handleSave} />
      case 'ai':
        return <AIAdvisoryPost key={post.id} post={post} language={language} onLike={handleLike} onSave={handleSave} />
      case 'farmer':
        return <FarmerPost key={post.id} post={post} language={language} onLike={handleLike} onSave={handleSave} onImageClick={onImageClick} />
      case 'market':
        return <MarketPost key={post.id} post={post} language={language} />
      case 'disaster':
        return <DisasterAlert key={post.id} post={post} language={language} />
      default:
        return null
    }
  }

  return (
    <div className={`flex-1 overflow-y-auto ${dark ? 'bg-zinc-950' : 'bg-gray-50'} pt-20 md:pt-0`}>
      <div className="md:hidden">
        <Stories dark={dark} />
      </div>

      {/* Header - Desktop Only */}
      <div className={`sticky top-0 z-20 ${dark ? 'bg-zinc-900 border-b border-zinc-800' : 'bg-white border-b border-gray-200'} shadow-sm p-8 hidden md:block`}>
        <div className="max-w-5xl mx-auto">
          <h2 className={`text-4xl font-bold mb-4 ${dark ? 'text-white' : 'text-black'}`}>
            🌾 Global Farmer Updates
          </h2>
          <p className={`text-sm mb-6 ${dark ? 'text-gray-400' : 'text-gray-600'}`}>
            📍 {region}
          </p>

          {/* Search & Stats */}
          <div className="flex gap-4 items-center flex-wrap">
            <div className="flex-1 min-w-64">
              <input
                type="text"
                placeholder={t.search || "🔍 Search posts..."}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className={`w-full p-3 rounded-lg border ${dark
                  ? 'bg-zinc-800 text-white border-zinc-700'
                  : 'bg-gray-100 text-black border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-green-600`}
              />
            </div>

            {/* Auto-refresh Toggle */}
            <button
              onClick={() => setAutoRefresh(!autoRefresh)}
              className={`px-4 py-3 rounded-lg font-medium transition-colors ${autoRefresh
                ? 'bg-green-600 text-white hover:bg-green-700'
                : dark
                  ? 'bg-zinc-800 text-gray-300 hover:bg-zinc-700'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
            >
              {autoRefresh ? '🔄 ' + (t.liveButton || 'Live') : '⏸️ ' + (t.pausedButton || 'Paused')}
            </button>
          </div>
        </div>
      </div>

      {/* Posts Feed - Large Cards */}
      <div className="max-w-5xl mx-auto p-2 md:p-8 pb-24 md:pb-8">
        {filteredPosts.length > 0 ? (
          <div className="space-y-4 md:space-y-6">
            {filteredPosts.map(post => renderPost(post, onImageClick))}
          </div>
        ) : (
          <div className={`text-center py-12 ${dark ? 'text-gray-400' : 'text-gray-600'}`}>
            <p className="text-lg">📭 {t.noPostsFound || 'No posts found'}</p>
            <p className="text-sm mt-2">{t.tryAdjusting || 'Try adjusting your search or filters'}</p>
          </div>
        )}
      </div>
    </div>
  )
}
