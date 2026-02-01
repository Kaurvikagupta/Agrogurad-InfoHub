import { useState, useContext } from 'react'
import { ThemeContext } from '../ThemeContext'
import { translations } from '../translations'

export default function Dashboard({ activeTab, language, onImageClick }) {
  const { dark } = useContext(ThemeContext)
  const [timePeriod, setTimePeriod] = useState('month')
  const [complaintType, setComplaintType] = useState('pest')
  const [communityTab, setCommunityTab] = useState('all')
  const [isPostModalOpen, setIsPostModalOpen] = useState(false)
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
    <div className={`flex-1 overflow-y-auto ${dark ? 'bg-zinc-950' : 'bg-gray-50'} p-8 pt-28 md:pt-8`}>
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
        <div className="grid grid-cols-4 gap-4 mb-8">
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
        <div className="grid grid-cols-2 gap-8">
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
        <div className="grid grid-cols-2 gap-8 mt-8">
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
    <div className={`flex-1 overflow-y-auto ${dark ? 'bg-zinc-950' : 'bg-gray-50'} p-8`}>
      <div className="max-w-7xl">
        <h2 className={`text-3xl font-bold mb-8 ${dark ? 'text-white' : 'text-black'}`}>
          📊 Crop Analytics
        </h2>

        {/* Analytics Cards */}
        <div className="grid grid-cols-3 gap-6">
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
    <div className={`flex-1 overflow-y-auto ${dark ? 'bg-zinc-950' : 'bg-gray-50'} p-8`}>
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

  const renderCommunity = () => (
    <div className={`flex-1 overflow-y-auto ${dark ? 'bg-zinc-950' : 'bg-gray-50'} p-8`}>
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

  const renderProfile = () => (
    <div className={`flex-1 overflow-y-auto ${dark ? 'bg-zinc-950' : 'bg-gray-50'} p-8`}>
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
      default:
        return renderDashboard()
    }
  }

  return renderContent()
}
