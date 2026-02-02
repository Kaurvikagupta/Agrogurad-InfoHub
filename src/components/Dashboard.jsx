import { useState, useContext, useEffect } from 'react'
import { ThemeContext } from '../ThemeContext'
import { translations } from '../translations'

export default function Dashboard({ activeTab, language, onImageClick }) {
  const { dark } = useContext(ThemeContext)
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth < 768 : false)
  const [timePeriod, setTimePeriod] = useState('month')

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  const [complaintType, setComplaintType] = useState('pest')
  const [communityTab, setCommunityTab] = useState('all')
  const [isPostModalOpen, setIsPostModalOpen] = useState(false)
  const [isUploadOverlayOpen, setIsUploadOverlayOpen] = useState(false)
  const [newPost, setNewPost] = useState({
    title: '',
    description: '',
    tags: '',
    type: 'farmers' // Default to farmers
  })
  const t = translations[language]

  // Farm Dashboard Data
  const farmStats = [
    { id: 1, label: 'Active Crops', value: '3', icon: '🌾', color: 'from-green-600 to-green-700' },
    { id: 2, label: 'Health Score', value: '92%', icon: '❤️', color: 'from-yellow-600 to-yellow-700' },
    { id: 3, label: 'Yield Forecast', value: '45 tons', icon: '📊', color: 'from-orange-600 to-orange-700' },
    { id: 4, label: 'AgriPoints', value: '2,450', icon: '⭐', color: 'from-orange-500 to-orange-600' },
  ]

  const cropHealth = [
    { field: 'Wheat Field A', health: 92, status: 'Flowering', color: 'from-green-500 to-yellow-500' },
    { field: 'Rice Field B', health: 78, status: 'Vegetative', color: 'from-green-500 to-yellow-400' },
    { field: 'Corn Field C', health: 96, status: 'Grain Filling', color: 'from-green-500 to-yellow-600' },
  ]

  const yieldPredictions = [
    { crop: 'Wheat', yield: '45 tons/acre', color: 'text-green-500' },
    { crop: 'Rice', yield: '38 tons/acre', color: 'text-green-500' },
    { crop: 'Corn', yield: '52 tons/acre', color: 'text-green-500' },
  ]

  const analyticsData = [
    { label: 'Avg Yield', value: '45 tons/acre', icon: '📊', color: 'from-green-600 to-green-700' },
    { label: 'Health Score', value: '92%', icon: '❤️', color: 'from-yellow-600 to-yellow-700' },
    { label: 'Pest Risk', value: 'Low', icon: '🛡️', color: 'from-orange-600 to-orange-700' },
  ]

  const complaintTypes = ['Pest Issue', 'Disease Problem', 'Fertilizer Issue', 'Water Management', 'Equipment Issue', 'Market Related']

  const [communityPostsState, setCommunityPostsState] = useState([
    {
      id: 1,
      type: 'government',
      author: 'Ministry of Agriculture',
      verified: true,
      title: 'New Subsidy Scheme Alert!',
      description: 'The government has announced a new subsidy scheme for organic farming. Eligible farmers can get up to ₹50,000 per acre for converting to organic methods. Applications open from Nov 10, 2025.',
      time: '2 hours ago',
      image: '/assets/Gemini_Generated_Image_hst9gphst9gphst9 (1).png',
      tags: ['#OrganicFarming', '#Government', '#Subsidy'],
      likes: 124,
      comments: 45,
      shares: 12
    },
    {
      id: 2,
      type: 'government',
      author: 'Regional Farm Bureau',
      verified: true,
      title: 'Water Conservation Tips',
      description: 'Efficient irrigation techniques to reduce water usage by 30% while maintaining yield. New guidelines available for download.',
      time: '5 hours ago',
      image: '/assets/Gemini_Generated_Image_1zk8301zk8301zk8.png',
      tags: ['#WaterSmart', '#Advisory'],
      likes: 89,
      comments: 23,
      shares: 5
    },
    {
      id: 3,
      type: 'farmers',
      author: 'Ramesh Patel',
      verified: false,
      title: 'Success with Drip Irrigation',
      description: 'Just installed the new drip system subsidized by the PMKSY scheme. Seeing 40% water savings already! Highly recommend it for cotton farmers.',
      time: '1 day ago',
      image: '/assets/Gemini_Generated_Image_sofau5sofau5sofa.png',
      tags: ['#DripIrrigation', '#SuccessStory'],
      likes: 210,
      comments: 56,
      shares: 34
    },
    {
      id: 4,
      type: 'farmers',
      author: 'Sunita Sharma',
      verified: true,
      title: 'Best Pest Control for Wheat?',
      description: 'Seeing some early signs of yellow rust in my wheat field. Has anyone tried the new bio-fungicide suggested by the AI advisory? Need reviews.',
      time: '3 hours ago',
      image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800&h=400&fit=crop',
      tags: ['#Question', '#Wheat', '#PestControl'],
      likes: 45,
      comments: 12,
      shares: 2
    }
  ])

  const handleCommunityLike = (id) => {
    setCommunityPostsState(prev => prev.map(post => {
      if (post.id === id) {
        return { ...post, likes: (post.likes || 0) + 1 }
      }
      return post
    }))
  }

  const handleCreatePost = (e) => {
    e.preventDefault()
    const post = {
      id: communityPostsState.length + 1,
      type: newPost.type,
      author: 'You', // Placeholder for current user
      verified: true,
      title: newPost.title,
      description: newPost.description,
      time: 'Just now',
      image: 'https://images.unsplash.com/photo-1595814433015-e6f5ce69614e?w=800&h=400&fit=crop', // Default image or we could use random
      tags: newPost.tags.split(',').map(tag => tag.trim().startsWith('#') ? tag.trim() : '#' + tag.trim()),
      likes: 0,
      comments: 0,
      shares: 0
    }
    setCommunityPostsState([post, ...communityPostsState])
    setIsPostModalOpen(false)
    setNewPost({ title: '', description: '', tags: '', type: 'farmers' })
  }

  const renderDashboard = () => (
    <div className={`flex-1 ${dark ? 'bg-zinc-950' : 'bg-gray-50'} p-4 pt-20 pb-24 md:p-8 md:pt-8 md:pb-8`}>
      <div className="max-w-7xl">
        {/* Header with Time Period */}
        <div className="flex justify-between items-center mb-8">
          <h2 className={`text-3xl font-bold ${dark ? 'text-white' : 'text-black'}`}>
            🌾 Farm Dashboard
          </h2>
          <div className="flex gap-2">
            {['Week', 'Month', 'Year'].map(period => (
              <button
                key={period}
                onClick={() => setTimePeriod(period.toLowerCase())}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${timePeriod === period.toLowerCase()
                  ? 'bg-green-600 text-white'
                  : dark
                    ? 'bg-zinc-800 text-gray-300 hover:bg-zinc-700'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
              >
                {period}
              </button>
            ))}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {farmStats.map(stat => (
            <div
              key={stat.id}
              className={`bg-gradient-to-br ${stat.color} rounded-lg p-6 text-white shadow-lg hover:shadow-xl transition-shadow`}
            >
              <p className="text-sm opacity-90 mb-2">{stat.label}</p>
              <p className="text-3xl font-bold">{stat.value}</p>
              <p className="text-2xl mt-2">{stat.icon}</p>
            </div>
          ))}
        </div>

        {/* Crop Health and Yield Prediction */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Crop Health Overview */}
          <div className={`${dark ? 'bg-zinc-800' : 'bg-white'} rounded-lg p-6 shadow-lg`}>
            <h3 className={`text-xl font-bold mb-6 ${dark ? 'text-white' : 'text-black'}`}>
              🌱 Crop Health Overview
            </h3>
            <div className="space-y-4">
              {cropHealth.map((crop, idx) => (
                <div key={idx}>
                  <div className="flex justify-between mb-2">
                    <span className={`font-semibold ${dark ? 'text-white' : 'text-black'}`}>
                      {crop.field}
                    </span>
                    <span className={`text-sm ${dark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {crop.status}
                    </span>
                  </div>
                  <div className={`h-3 rounded-full bg-gradient-to-r ${crop.color}`}></div>
                  <div className={`text-sm mt-1 ${dark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {crop.health}% Health
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Yield Prediction */}
          <div className={`${dark ? 'bg-zinc-800' : 'bg-white'} rounded-lg p-6 shadow-lg`}>
            <h3 className={`text-xl font-bold mb-6 ${dark ? 'text-white' : 'text-black'}`}>
              📈 Yield Prediction
            </h3>
            <div className="space-y-4">
              {yieldPredictions.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center">
                  <span className={`font-semibold ${dark ? 'text-white' : 'text-black'}`}>
                    {item.crop}
                  </span>
                  <span className={`${item.color} font-bold text-lg`}>
                    {item.yield}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Alerts and AI Recommendations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          <div className={`${dark ? 'bg-zinc-800' : 'bg-white'} rounded-lg p-6 shadow-lg`}>
            <h3 className={`text-xl font-bold mb-4 ${dark ? 'text-white' : 'text-black'}`}>
              ⚠️ Recent Alerts
            </h3>
            <div className={`text-sm ${dark ? 'text-gray-400' : 'text-gray-600'}`}>
              ✓ Soil moisture optimal<br />
              ✓ No pest activity detected<br />
              ✓ Weather forecast favorable
            </div>
          </div>
          <div className={`${dark ? 'bg-zinc-800' : 'bg-white'} rounded-lg p-6 shadow-lg`}>
            <h3 className={`text-xl font-bold mb-4 ${dark ? 'text-white' : 'text-black'}`}>
              💡 AI Recommendations
            </h3>
            <div className={`text-sm ${dark ? 'text-gray-400' : 'text-gray-600'}`}>
              • Increase irrigation by 10%<br />
              • Schedule harvest in 5 days<br />
              • Apply potassium fertilizer
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderAnalytics = () => (
    <div className={`flex-1 ${dark ? 'bg-zinc-950' : 'bg-gray-50'} p-4 pt-20 pb-24 md:p-8 md:pt-8 md:pb-8`}>
      <div className="max-w-7xl">
        <h2 className={`text-3xl font-bold mb-8 ${dark ? 'text-white' : 'text-black'}`}>
          📊 Crop Analytics
        </h2>

        {/* Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {analyticsData.map((item, idx) => (
            <div
              key={idx}
              className={`bg-gradient-to-br ${item.color} rounded-lg p-8 text-white shadow-lg hover:shadow-xl transition-shadow`}
            >
              <p className="text-sm opacity-90 mb-2">{item.label}</p>
              <p className="text-3xl font-bold">{item.value}</p>
              <p className="text-4xl mt-4">{item.icon}</p>
            </div>
          ))}
        </div>

        {/* Yield Trends Chart */}
        <div className={`${dark ? 'bg-zinc-800' : 'bg-white'} rounded-lg p-8 shadow-lg mt-8`}>
          <h3 className={`text-xl font-bold mb-6 ${dark ? 'text-white' : 'text-black'}`}>
            Yield Trends (Last 6 Months)
          </h3>
          <div className={`h-72 w-full ${dark ? 'bg-zinc-900/50' : 'bg-gray-50'} rounded-lg p-4 relative`}>
            {/* Simple SVG Line Chart */}
            <svg className="w-full h-full" viewBox="0 0 600 200" preserveAspectRatio="none">
              {/* Grid Lines */}
              {[0, 25, 50, 75, 100].map((tick, i) => (
                <line
                  key={i}
                  x1="40"
                  y1={20 + i * 35}
                  x2="580"
                  y2={20 + i * 35}
                  stroke={dark ? "#3f3f46" : "#e5e7eb"}
                  strokeWidth="1"
                />
              ))}

              {/* Data Path */}
              <path
                d="M50 160 L140 120 L230 140 L320 80 L410 90 L500 50 L580 60"
                fill="none"
                stroke="#16a34a"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Data Points */}
              {[
                { x: 50, y: 160, val: 30 },
                { x: 140, y: 120, val: 45 },
                { x: 230, y: 140, val: 38 },
                { x: 320, y: 80, val: 55 },
                { x: 410, y: 90, val: 52 },
                { x: 500, y: 50, val: 62 },
                { x: 580, y: 60, val: 58 }
              ].map((point, i) => (
                <g key={i}>
                  <circle
                    cx={point.x}
                    cy={point.y}
                    r="5"
                    fill={dark ? "#18181b" : "#ffffff"}
                    stroke="#16a34a"
                    strokeWidth="2"
                  />
                  <text
                    x={point.x}
                    y={point.y - 10}
                    textAnchor="middle"
                    fontSize="10"
                    fill={dark ? "#a1a1aa" : "#4b5563"}
                  >
                    {point.val}t
                  </text>
                </g>
              ))}

              {/* Y-Axis Labels */}
              {[40, 50, 60].map((val, i) => (
                <text key={i} x="30" y={165 - i * 40} textAnchor="end" fontSize="10" fill={dark ? "#71717a" : "#9ca3af"}>{val}</text>
              ))}

              {/* X-Axis Labels */}
              {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'].map((month, i) => (
                <text
                  key={i}
                  x={50 + i * 88}
                  y="185"
                  textAnchor="middle"
                  fontSize="12"
                  fill={dark ? "#a1a1aa" : "#4b5563"}
                >
                  {month}
                </text>
              ))}
            </svg>
          </div>
        </div>
      </div>
    </div>
  )

  const renderComplaints = () => (
    <div className={`flex-1 ${dark ? 'bg-zinc-950' : 'bg-gray-50'} p-4 pt-20 pb-24 md:p-8 md:pt-8 md:pb-8`}>
      <div className="max-w-2xl">
        <h2 className={`text-3xl font-bold mb-8 ${dark ? 'text-white' : 'text-black'}`}>
          📝 File Complaint
        </h2>

        <div className={`${dark ? 'bg-zinc-800' : 'bg-white'} rounded-lg p-8 shadow-lg`}>
          <div className="mb-6">
            <label className={`block text-sm font-semibold mb-3 ${dark ? 'text-white' : 'text-black'}`}>
              Complaint Type
            </label>
            <select
              value={complaintType}
              onChange={(e) => setComplaintType(e.target.value)}
              className={`w-full p-3 rounded-lg border ${dark
                ? 'bg-zinc-700 text-white border-zinc-600'
                : 'bg-gray-50 text-black border-gray-300'
                } focus:outline-none focus:ring-2 focus:ring-green-600`}
            >
              {complaintTypes.map(type => (
                <option key={type} value={type.toLowerCase().replace(/\s+/g, '')}>{type}</option>
              ))}
            </select>
          </div>

          <div className="mb-6">
            <label className={`block text-sm font-semibold mb-3 ${dark ? 'text-white' : 'text-black'}`}>
              Description
            </label>
            <textarea
              rows="6"
              placeholder="Describe your issue in detail..."
              className={`w-full p-3 rounded-lg border ${dark
                ? 'bg-zinc-700 text-white border-zinc-600 placeholder-gray-500'
                : 'bg-gray-50 text-black border-gray-300 placeholder-gray-400'
                } focus:outline-none focus:ring-2 focus:ring-green-600`}
            ></textarea>
          </div>

          <button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition-colors">
            Submit Complaint
          </button>
        </div>
      </div>
    </div>
  )

  const renderMobileCommunity = () => (
    <div className={`flex-1 ${dark ? 'bg-black' : 'bg-gray-50'} pt-20 pb-40`}>
      {/* Mobile Filter Bar */}
      <div className="flex gap-3 overflow-x-auto no-scrollbar px-4 mb-8">
        {[
          { id: 'all', label: 'All', icon: '🌐' },
          { id: 'government', label: 'Government', icon: '🏛️' },
          { id: 'farmers', label: 'Farmers', icon: '👨‍🌾' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setCommunityTab(tab.id)}
            className={`px-6 py-3 rounded-full font-bold transition-all flex items-center gap-2 whitespace-nowrap text-lg ${communityTab === tab.id
              ? 'bg-[#2E7D32] text-white shadow-lg'
              : 'bg-zinc-800/80 text-zinc-300 hover:bg-zinc-700'
              }`}
          >
            <span className="text-xl">{tab.icon}</span> {tab.label}
          </button>
        ))}
      </div>

      {/* Community Posts */}
      <div className="space-y-6 px-4">
        {communityPostsState.filter(post => communityTab === 'all' || post.type === communityTab).map(post => (
          <div key={post.id} className={`${dark ? 'bg-[#121212]' : 'bg-white'} rounded-[2rem] p-6 shadow-2xl border ${dark ? 'border-zinc-800' : 'border-gray-100'}`}>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className={`w-14 h-14 rounded-full flex items-center justify-center text-3xl ${post.type === 'government' ? 'bg-zinc-800' : 'bg-green-800'}`}>
                  {post.type === 'government' ? '🏛️' : '👨‍🌾'}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className={`font-bold text-xl ${dark ? 'text-white' : 'text-black'}`}>
                      {post.author}
                    </p>
                    {post.verified && (
                      <div className="flex items-center gap-1">
                        <span className="text-blue-500 text-sm">✔️</span>
                        <span className="bg-blue-600/20 text-blue-400 text-[10px] px-2 py-0.5 rounded-md font-black uppercase tracking-wider">
                          Official
                        </span>
                      </div>
                    )}
                  </div>
                  <p className={`text-sm mt-0.5 ${dark ? 'text-zinc-500' : 'text-gray-500'}`}>
                    {post.time}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {post.title && (
                <h3 className={`text-xl font-bold ${dark ? 'text-zinc-100' : 'text-zinc-900'}`}>
                  {post.title}
                </h3>
              )}
              <p className={`text-lg leading-relaxed ${dark ? 'text-zinc-300' : 'text-zinc-700'}`}>
                {post.description}
              </p>

              {post.tags && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {post.tags.map(tag => (
                    <span key={tag} className="text-[#BD8A41] font-bold">
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {post.image && (
                <div className="mt-6 rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    src={post.image}
                    alt="Post content"
                    className="w-full h-auto object-cover max-h-[400px]"
                    onClick={() => onImageClick && onImageClick(post.image)}
                  />
                </div>
              )}
            </div>

            {/* Interaction Row for logic preservation */}
            <div className={`flex items-center gap-8 mt-8 pt-6 border-t ${dark ? 'border-zinc-800' : 'border-gray-100'}`}>
              <button
                onClick={() => handleCommunityLike(post.id)}
                className="flex items-center gap-2 text-zinc-400 font-bold"
              >
                <span>❤️</span> {post.likes}
              </button>
              <button className="flex items-center gap-2 text-zinc-400 font-bold">
                <span>💬</span> {post.comments}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Sticky Bottom Create Post Bar - Strictly Mobile */}
      <div className="fixed bottom-24 left-0 right-0 px-4 z-40">
        <button
          onClick={() => setIsPostModalOpen(true)}
          className="w-full bg-[#2E7D32] hover:bg-green-700 text-zinc-100 font-black py-4 rounded-xl flex items-center justify-center gap-2 shadow-[0_10px_30px_rgba(0,0,0,0.5)] text-lg"
        >
          ✍️ Create Post
        </button>
      </div>
    </div>
  )

  const renderCommunity = () => {
    if (isMobile) return renderMobileCommunity()

    return (
      <div className={`flex-1 ${dark ? 'bg-zinc-950' : 'bg-gray-50'} p-4 pt-20 pb-24 md:p-8 md:pt-8 md:pb-8`}>
        <div className="max-w-4xl">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className={`text-3xl font-bold ${dark ? 'text-white' : 'text-black'}`}>
                👥 Community
              </h2>
              <p className={`text-sm mt-1 ${dark ? 'text-gray-400' : 'text-gray-600'}`}>
                Connect with farmers and get updates from government agencies
              </p>
            </div>
            <button
              onClick={() => setIsPostModalOpen(true)}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              🌱 Create Post
            </button>
          </div>

          {/* Create Post Modal */}
          {isPostModalOpen && (
            <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
              <div className={`${dark ? 'bg-zinc-800' : 'bg-white'} rounded-lg p-8 max-w-lg w-full shadow-2xl`}>
                <h3 className={`text-2xl font-bold mb-6 ${dark ? 'text-white' : 'text-black'}`}>Create New Post</h3>
                <form onSubmit={handleCreatePost}>
                  <div className="mb-4">
                    <label className={`block text-sm font-semibold mb-2 ${dark ? 'text-gray-300' : 'text-gray-700'}`}>Type</label>
                    <select
                      value={newPost.type}
                      onChange={e => setNewPost({ ...newPost, type: e.target.value })}
                      className={`w-full p-3 rounded-lg border ${dark ? 'bg-zinc-700 border-zinc-600 text-white' : 'bg-gray-50 border-gray-300 text-black'} focus:ring-2 focus:ring-green-600 outline-none`}
                    >
                      <option value="farmers">Farmer Post</option>
                      <option value="government">Government Announcement</option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <label className={`block text-sm font-semibold mb-2 ${dark ? 'text-gray-300' : 'text-gray-700'}`}>Title</label>
                    <input
                      type="text"
                      required
                      value={newPost.title}
                      onChange={e => setNewPost({ ...newPost, title: e.target.value })}
                      className={`w-full p-3 rounded-lg border ${dark ? 'bg-zinc-700 border-zinc-600 text-white' : 'bg-gray-50 border-gray-300 text-black'} focus:ring-2 focus:ring-green-600 outline-none`}
                      placeholder="e.g., My Success Story"
                    />
                  </div>
                  <div className="mb-4">
                    <label className={`block text-sm font-semibold mb-2 ${dark ? 'text-gray-300' : 'text-gray-700'}`}>Description</label>
                    <textarea
                      required
                      rows="4"
                      value={newPost.description}
                      onChange={e => setNewPost({ ...newPost, description: e.target.value })}
                      className={`w-full p-3 rounded-lg border ${dark ? 'bg-zinc-700 border-zinc-600 text-white' : 'bg-gray-50 border-gray-300 text-black'} focus:ring-2 focus:ring-green-600 outline-none`}
                      placeholder="Share your thoughts..."
                    ></textarea>
                  </div>
                  <div className="mb-6">
                    <label className={`block text-sm font-semibold mb-2 ${dark ? 'text-gray-300' : 'text-gray-700'}`}>Tags (comma separated)</label>
                    <input
                      type="text"
                      value={newPost.tags}
                      onChange={e => setNewPost({ ...newPost, tags: e.target.value })}
                      className={`w-full p-3 rounded-lg border ${dark ? 'bg-zinc-700 border-zinc-600 text-white' : 'bg-gray-50 border-gray-300 text-black'} focus:ring-2 focus:ring-green-600 outline-none`}
                      placeholder="e.g., #Farming, #Tips"
                    />
                  </div>
                  <div className="flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setIsPostModalOpen(false)}
                      className={`px-4 py-2 rounded-lg font-medium ${dark ? 'bg-zinc-700 text-gray-300 hover:bg-zinc-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2 rounded-lg font-medium bg-green-600 text-white hover:bg-green-700"
                    >
                      Post
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Community Tabs */}
          <div className="flex gap-2 mb-6">
            {[
              { id: 'all', label: 'All Posts', icon: '🌐' },
              { id: 'government', label: 'Government', icon: '🏛️' },
              { id: 'farmers', label: 'Farmers', icon: '👨‍🌾' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setCommunityTab(tab.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${communityTab === tab.id
                  ? 'bg-green-600 text-white'
                  : dark
                    ? 'bg-zinc-800 text-gray-300 hover:bg-zinc-700'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>

          {/* Community Posts */}
          <div className="space-y-6 pb-24 md:pb-0">
            {communityPostsState.filter(post => communityTab === 'all' || post.type === communityTab).map(post => (
              <div key={post.id} className={`${dark ? 'bg-zinc-800' : 'bg-white'} rounded-lg p-6 shadow-lg`}>
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white text-lg ${post.type === 'government' ? 'bg-blue-600' : 'bg-green-600'}`}>
                    {post.type === 'government' ? '🏛️' : '👨‍🌾'}
                  </div>
                  <div>
                    <p className={`font-bold ${dark ? 'text-white' : 'text-black'}`}>
                      {post.author}
                    </p>
                    {post.verified && (
                      <span className="bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full font-bold inline-block">
                        Official
                      </span>
                    )}
                    <p className={`text-xs mt-1 ${dark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {post.time}
                    </p>
                  </div>
                </div>

                <h3 className={`text-lg font-bold mb-2 ${dark ? 'text-white' : 'text-black'}`}>
                  {post.title}
                </h3>
                <p className={`mb-4 leading-relaxed ${dark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {post.description}
                </p>

                {post.image && (
                  <img
                    src={post.image}
                    alt="Post"
                    className="w-full h-64 object-cover rounded-lg mb-4 cursor-pointer hover:opacity-95 transition-opacity"
                    onClick={() => onImageClick && onImageClick(post.image)}
                  />
                )}

                {post.tags && (
                  <p className={`text-sm ${dark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {post.tags.join(' ')}
                  </p>
                )}

                {/* Interaction Buttons */}
                <div className={`flex items-center gap-6 mt-4 pt-4 border-t ${dark ? 'border-zinc-700' : 'border-gray-100'}`}>
                  <button
                    onClick={() => handleCommunityLike(post.id)}
                    className={`flex items-center gap-2 text-sm font-medium ${dark ? 'text-gray-400 hover:text-green-500' : 'text-gray-600 hover:text-green-600'} transition-colors`}
                  >
                    <span>❤️</span> {post.likes} Likes
                  </button>
                  <button className={`flex items-center gap-2 text-sm font-medium ${dark ? 'text-gray-400 hover:text-blue-500' : 'text-gray-600 hover:text-blue-600'} transition-colors`}>
                    <span>💬</span> {post.comments} Comments
                  </button>
                  <button className={`flex items-center gap-2 text-sm font-medium ${dark ? 'text-gray-400 hover:text-purple-500' : 'text-gray-600 hover:text-purple-600'} transition-colors`}>
                    <span>↗️</span> {post.shares} Share
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  const renderProfile = () => (
    <div className={`flex-1 ${dark ? 'bg-zinc-950' : 'bg-gray-50'} p-4 pt-20 pb-24 md:p-8 md:pt-8 md:pb-8`}>
      <div className="max-w-5xl">
        <h2 className={`text-3xl font-bold mb-8 ${dark ? 'text-white' : 'text-black'}`}>
          My Profile
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* User Profile Card */}
          <div className={`${dark ? 'bg-zinc-900 border border-zinc-800' : 'bg-white border border-gray-200'} rounded-xl p-8 flex flex-col items-center justify-center shadow-lg md:col-span-1 min-h-[300px]`}>
            <div className="w-32 h-32 mb-4 relative">
              <div className="w-full h-full rounded-full bg-indigo-900/20 flex items-center justify-center overflow-hidden border-2 border-zinc-700">
                <span className="text-6xl">👨‍🌾</span>
              </div>
            </div>
            <h3 className={`text-xl font-bold mb-1 ${dark ? 'text-white' : 'text-black'}`}>
              Ramesh Kumar
            </h3>
            <p className={`text-sm font-medium ${dark ? 'text-gray-400' : 'text-gray-500'}`}>
              Verified Farmer • Premium
            </p>
          </div>

          {/* Farm Information Card */}
          <div className={`${dark ? 'bg-zinc-900 border border-zinc-800' : 'bg-white border border-gray-200'} rounded-xl p-8 shadow-lg md:col-span-2 min-h-[300px]`}>
            <h3 className={`text-lg font-bold mb-8 ${dark ? 'text-gray-200' : 'text-gray-800'}`}>
              Farm Information
            </h3>

            <div className="grid grid-cols-2 gap-y-10 gap-x-4">
              <div>
                <p className={`text-sm font-medium mb-1 ${dark ? 'text-gray-400' : 'text-gray-500'}`}>Farm Size</p>
                <p className={`text-2xl font-bold ${dark ? 'text-white' : 'text-black'}`}>12 Acres</p>
              </div>
              <div>
                <p className={`text-sm font-medium mb-1 ${dark ? 'text-gray-400' : 'text-gray-500'}`}>Experience</p>
                <p className={`text-2xl font-bold ${dark ? 'text-white' : 'text-black'}`}>8 Years</p>
              </div>
              <div>
                <p className={`text-sm font-medium mb-1 ${dark ? 'text-gray-400' : 'text-gray-500'}`}>AgriPoints</p>
                <p className={`text-2xl font-bold ${dark ? 'text-white' : 'text-black'}`}>2,450</p>
              </div>
              <div>
                <p className={`text-sm font-medium mb-1 ${dark ? 'text-gray-400' : 'text-gray-500'}`}>Civic Score</p>
                <p className={`text-2xl font-bold ${dark ? 'text-white' : 'text-black'}`}>820 <span className="text-green-500 text-base font-semibold">(Excellent)</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderUpload = () => (
    <div className={`flex-1 ${dark ? 'bg-black' : 'bg-gray-50'} p-4 pt-20 pb-24 md:pt-8 md:pb-8`}>
      {/* Top Button - matching screenshot Image 1 */}
      <div className="max-w-md mx-auto">
        <button
          onClick={() => setIsUploadOverlayOpen(true)}
          className="w-full bg-[#FF7F50] hover:bg-[#FF6347] text-zinc-900 font-bold py-4 rounded-xl flex items-center justify-center gap-2 mb-8 shadow-lg text-lg"
        >
          📸 Upload Crop Image
        </button>
      </div>

      {/* Overlay / Bottom Sheet - matching screenshot Image 2 */}
      {isUploadOverlayOpen && (
        <div className="fixed inset-0 z-[60] flex items-end justify-center">
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setIsUploadOverlayOpen(false)}
          ></div>
          <div className={`relative w-full ${dark ? 'bg-zinc-950' : 'bg-white'} rounded-t-[2.5rem] p-8 animate-in slide-in-from-bottom duration-300 border-t ${dark ? 'border-zinc-800' : 'border-gray-200'}`}>
            <div className="w-12 h-1.5 bg-zinc-800 rounded-full mx-auto mb-8 opacity-50"></div>

            <h3 className={`text-2xl font-bold mb-2 ${dark ? 'text-white' : 'text-black'}`}>Upload Crop Image</h3>
            <p className={`text-sm mb-10 ${dark ? 'text-gray-400' : 'text-gray-600'}`}>
              Position your crop clearly in the center for best AI analysis
            </p>

            <div className="space-y-6">
              <button className={`w-full p-8 border-2 border-dashed border-green-500/50 rounded-2xl flex flex-col items-center gap-4 transition-all hover:bg-green-500/5`}>
                <div className="w-16 h-12 flex items-center justify-center text-4xl opacity-80">
                  📷
                </div>
                <div className="text-center">
                  <p className={`font-bold text-xl ${dark ? 'text-white' : 'text-black'}`}>Upload from Gallery</p>
                  <p className={`text-sm mt-1 ${dark ? 'text-gray-500' : 'text-gray-400'}`}>Select existing photo</p>
                </div>
              </button>

              <button className={`w-full p-8 border-2 border-dashed border-orange-500/50 rounded-2xl flex flex-col items-center gap-4 transition-all hover:bg-orange-500/5`}>
                <div className="w-16 h-12 flex items-center justify-center text-4xl opacity-80">
                  📹
                </div>
                <div className="text-center">
                  <p className={`font-bold text-xl ${dark ? 'text-white' : 'text-black'}`}>AR Camera Guidance</p>
                  <p className={`text-sm mt-1 ${dark ? 'text-gray-500' : 'text-gray-400'}`}>Real-time positioning help</p>
                </div>
              </button>
            </div>

            <button
              onClick={() => setIsUploadOverlayOpen(false)}
              className={`w-full mt-10 py-5 rounded-2xl font-bold text-lg border transition-colors ${dark
                ? 'bg-zinc-900 border-zinc-800 text-gray-300 hover:bg-zinc-800'
                : 'bg-gray-100 border-gray-200 text-gray-600 hover:bg-gray-200'
                }`}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  )

  const renderPlaceholder = (title) => (
    <div className={`flex-1 ${dark ? 'bg-zinc-950' : 'bg-gray-50'} pt-20 md:pt-0 flex flex-col items-center justify-center`}>
      <h2 className={`text-3xl font-bold mb-4 ${dark ? 'text-white' : 'text-black'}`}>{title}</h2>
      <p className={`text-gray-500 text-lg`}>This section is coming soon...</p>
    </div>
  )

  const renderReports = () => (
    <div className={`flex-1 ${dark ? 'bg-black' : 'bg-gray-50'} p-4 pt-20 pb-24 md:pt-8 md:pb-8`}>
      <div className="max-w-md mx-auto">
        <h2 className={`text-2xl font-bold mb-6 ${dark ? 'text-white' : 'text-black'}`}>My Crops</h2>

        {/* Top Summary Stats */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          <div className="bg-[#1B431C] rounded-2xl p-4 flex flex-col items-center justify-center text-center shadow-lg">
            <span className="text-3xl font-bold text-white">3</span>
            <span className="text-[10px] text-zinc-300 font-medium mt-1">Active Crops</span>
          </div>
          <div className="bg-[#785C37] rounded-2xl p-4 flex flex-col items-center justify-center text-center shadow-lg">
            <span className="text-3xl font-bold text-white">12</span>
            <span className="text-[10px] text-zinc-300 font-medium mt-1">Acres Total</span>
          </div>
          <div className="bg-[#BD694B] rounded-2xl p-4 flex flex-col items-center justify-center text-center shadow-lg">
            <span className="text-3xl font-bold text-white">89%</span>
            <span className="text-[10px] text-zinc-300 font-medium mt-1">Avg Health</span>
          </div>
        </div>

        {/* Crop Cards */}
        <div className="space-y-6">
          {/* Wheat Field A */}
          <div className={`rounded-3xl overflow-hidden bg-zinc-900 shadow-xl border ${dark ? 'border-zinc-800' : 'border-gray-200'}`}>
            <div className="bg-gradient-to-r from-[#00A859] to-[#1B431C] p-6 flex justify-between items-start">
              <div className="flex items-center gap-4">
                <span className="text-3xl">🌾</span>
                <div>
                  <h3 className="text-white font-bold text-xl">Wheat Field A</h3>
                  <p className="text-zinc-300 text-sm">5 acres</p>
                </div>
              </div>
              <span className="bg-[#14532B] text-green-400 text-xs px-3 py-1 rounded-lg font-bold">Healthy</span>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-zinc-400 font-medium">Health Score</span>
                <span className="text-[#00C853] font-bold text-xl">92%</span>
              </div>
              <div className="w-full h-2 bg-zinc-800 rounded-full mb-8">
                <div className="h-full bg-[#00C853] rounded-full" style={{ width: '92%' }}></div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-400">Growth Stage</span>
                  <span className="text-white font-bold">Flowering</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-400">Days to Harvest</span>
                  <span className="text-white font-bold">25 days</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-400">Last Update</span>
                  <span className="text-white font-bold">2 hours ago</span>
                </div>
              </div>
            </div>
          </div>

          {/* Rice Field B */}
          <div className={`rounded-3xl overflow-hidden bg-zinc-900 shadow-xl border ${dark ? 'border-zinc-800' : 'border-gray-200'}`}>
            <div className="bg-gradient-to-r from-[#FBC02D] to-[#F57F17] p-6 flex justify-between items-start">
              <div className="flex items-center gap-4">
                <span className="text-3xl text-white">🍚</span>
                <div>
                  <h3 className="text-zinc-900 font-bold text-xl">Rice Field B</h3>
                  <p className="text-zinc-800 text-sm">3 acres</p>
                </div>
              </div>
              <span className="bg-[#7B3118] text-orange-400 text-xs px-3 py-1 rounded-lg font-bold">Alert</span>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-zinc-400 font-medium">Health Score</span>
                <span className="text-[#FBC02D] font-bold text-xl">78%</span>
              </div>
              <div className="w-full h-2 bg-zinc-800 rounded-full mb-8">
                <div className="h-full bg-gradient-to-r from-[#FBC02D] to-[#F57F17] rounded-full" style={{ width: '78%' }}></div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-400">Growth Stage</span>
                  <span className="text-white font-bold">Vegetative</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-400">Days to Harvest</span>
                  <span className="text-white font-bold">45 days</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-400">Last Update</span>
                  <span className="text-white font-bold">4 hours ago</span>
                </div>
              </div>
            </div>
          </div>

          {/* Corn Field C */}
          <div className={`rounded-3xl overflow-hidden bg-zinc-900 shadow-xl border ${dark ? 'border-zinc-800' : 'border-gray-200'}`}>
            <div className="bg-gradient-to-r from-[#E65100] to-[#FF9800] p-6 flex justify-between items-start">
              <div className="flex items-center gap-4">
                <span className="text-3xl">🌽</span>
                <div>
                  <h3 className="text-white font-bold text-xl">Corn Field C</h3>
                  <p className="text-zinc-200 text-sm">4 acres</p>
                </div>
              </div>
              <span className="bg-[#0D47A1] text-blue-300 text-xs px-3 py-1 rounded-lg font-bold">Excellent</span>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-zinc-400 font-medium">Health Score</span>
                <span className="text-[#FF9800] font-bold text-xl">96%</span>
              </div>
              <div className="w-full h-2 bg-zinc-800 rounded-full mb-8">
                <div className="h-full bg-gradient-to-r from-[#E65100] to-[#FFB74D] rounded-full" style={{ width: '96%' }}></div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-400">Growth Stage</span>
                  <span className="text-white font-bold">Grain Filling</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-400">Days to Harvest</span>
                  <span className="text-white font-bold">15 days</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-400">Last Update</span>
                  <span className="text-white font-bold">1 hour ago</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Add New Crop Button */}
        <button className="w-full mt-10 p-4 border-2 border-dashed border-green-600/50 rounded-2xl flex items-center justify-center gap-2 text-green-500 font-bold hover:bg-green-600/5 transition-all">
          <span className="text-xl">+</span> Add New Crop
        </button>
      </div>
    </div>
  )

  const renderWallet = () => (
    <div className={`flex-1 ${dark ? 'bg-black' : 'bg-gray-50'} p-4 pt-20 pb-24 md:pt-8 md:pb-8`}>
      <div className="max-w-md mx-auto">
        {/* Bonus Card - matching screenshot */}
        <div className={`bg-[#121212] border border-zinc-800 rounded-2xl p-6 flex justify-between items-center shadow-2xl`}>
          <span className="text-white font-medium text-lg">Crop Update Bonus</span>
          <span className="text-[#BD8A41] font-bold text-xl">+150</span>
        </div>

        {/* Additional Wallet Info - placeholders for future */}
        <div className="mt-12 space-y-4 opacity-50">
          <h3 className={`text-xl font-bold ${dark ? 'text-white' : 'text-black'}`}>Transactions</h3>
          {[1, 2].map(i => (
            <div key={i} className={`h-16 rounded-xl border ${dark ? 'border-zinc-800 bg-zinc-900/50' : 'bg-white border-gray-100'}`}></div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return renderDashboard()
      case 'analytics':
        return renderAnalytics()
      case 'complaints':
        return renderComplaints()
      case 'community':
        return renderCommunity()
      case 'profile':
        return renderProfile()
      case 'upload':
        // Only show custom upload on mobile
        return isMobile ? renderUpload() : renderDashboard()
      case 'reports':
        // Only show custom reports on mobile
        return isMobile ? renderReports() : renderDashboard()
      case 'wallet':
        // Only show custom wallet on mobile
        return isMobile ? renderWallet() : renderDashboard()
      default:
        return renderDashboard()
    }
  }

  return renderContent()
}
