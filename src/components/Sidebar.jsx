import { useState, useContext } from 'react'
import { ThemeContext } from '../ThemeContext'
import { translations } from '../translations'

const REGIONS = [
  '� Global',
  '🇺🇸 United States',
  '🇧🇷 Brazil',
  '🇦🇺 Australia',
  '🇮🇳 India',
  '🇩🇪 Germany',
  '🇫🇷 France',
  '🇮🇹 Italy',
  '🇨🇦 Canada',
  '🇲🇽 Mexico',
  '🇦🇷 Argentina',
  '🇪🇬 Egypt',
  '🇰🇪 Kenya',
  '🇿🇦 South Africa',
  '🇳🇬 Nigeria',
  '🇻🇳 Vietnam',
  '🇹🇭 Thailand',
  '🇵🇭 Philippines',
  '🇮🇩 Indonesia',
  '🇨🇳 China',
  '🇯🇵 Japan',
  '🇰🇷 South Korea',
  '🇳🇿 New Zealand',
  '🇺🇦 Ukraine',
  '🇵🇱 Poland',
  '🇷🇺 Russia',
  '🇨🇭 Switzerland',
  '🇳🇱 Netherlands',
  '🇸🇪 Sweden',
  '🇳🇴 Norway',
]

const LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'Hindi (हिंदी)' },
  { code: 'mr', name: 'Marathi (मराठी)' },
  { code: 'kn', name: 'Kannada (ಕನ್ನಡ)' },
  { code: 'te', name: 'Telugu (తెలుగు)' },
  { code: 'ta', name: 'Tamil (தமிழ்)' },
]

export default function Sidebar({ activeTab, setActiveTab, language, setLanguage, region, setRegion }) {
  const [collapsed, setCollapsed] = useState(false)
  const { dark } = useContext(ThemeContext)
  const t = translations[language]

  const tabs = [
    { id: 'feed', label: t.feed || 'Feed', icon: '📰' },
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'analytics', label: 'Analytics', icon: '📈' },
    { id: 'complaints', label: 'Complaints', icon: '⚠️' },
    { id: 'community', label: 'Community', icon: '👥' },
    { id: 'profile', label: 'Profile', icon: '👤' },
  ]

  return (
    <div
      className={`${collapsed ? 'w-20' : 'w-64'} transition-all duration-300 ${dark ? 'bg-zinc-900 border-r border-zinc-800' : 'bg-white border-r border-gray-200'
        } p-4 hidden md:flex flex-col h-screen sticky top-0 overflow-y-auto`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        {!collapsed && (
          <div>
            <h1 className={`text-2xl font-bold ${dark ? 'text-green-500' : 'text-green-600'}`}>
              🌾 AgroGuard
            </h1>
            <p className={`text-xs ${dark ? 'text-gray-400' : 'text-gray-600'}`}>
              Information Hub
            </p>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={`p-2 rounded-lg transition-colors ${dark ? 'hover:bg-zinc-800' : 'hover:bg-gray-100'
            }`}
        >
          {collapsed ? '→' : '←'}
        </button>
      </div>

      {/* Location Filter */}
      {!collapsed && (
        <div className="mb-6 pb-6 border-b border-gray-700">
          <label className={`text-xs font-bold uppercase ${dark ? 'text-gray-400' : 'text-gray-600'}`}>
            {t.yourRegion || '📍 Your Region'}
          </label>
          <select
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className={`w-full mt-2 p-2 rounded text-sm ${dark
              ? 'bg-zinc-800 text-white border border-zinc-700'
              : 'bg-gray-100 text-black border border-gray-300'
              } focus:outline-none focus:ring-2 focus:ring-green-600`}
          >
            {REGIONS.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="flex-1 space-y-2 mb-6">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`w-full p-3 rounded-lg transition-colors text-left flex items-center gap-3 ${activeTab === tab.id
              ? 'bg-green-600 text-white'
              : dark
                ? 'hover:bg-zinc-800 text-gray-300'
                : 'hover:bg-gray-100 text-gray-700'
              }`}
          >
            <span className="text-xl">{tab.icon}</span>
            {!collapsed && <span className="font-medium">{tab.label}</span>}
          </button>
        ))}
      </div>

      {/* Language Selector */}
      {!collapsed && (
        <div className="pb-6 border-t border-gray-700 pt-6">
          <label className={`text-xs font-bold uppercase ${dark ? 'text-gray-400' : 'text-gray-600'}`}>
            {t.language || '🌐 Language'}
          </label>
          <div className="flex gap-2 mt-2 flex-wrap">
            {LANGUAGES.map(lang => (
              <button
                key={lang.code}
                onClick={() => setLanguage(lang.code)}
                className={`flex-1 py-2 px-2 rounded text-sm font-medium transition-colors ${language === lang.code
                  ? 'bg-green-600 text-white'
                  : dark
                    ? 'bg-zinc-800 text-gray-300 hover:bg-zinc-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                {lang.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Footer */}
      {!collapsed && (
        <div className={`text-xs text-center py-4 border-t ${dark ? 'border-zinc-800 text-gray-500' : 'border-gray-200 text-gray-600'}`}>
          <p>{t.digitalPublicInfra || '🌱 Digital Public Infrastructure'}</p>
          <p>{t.forAgriculture || 'for Agriculture'}</p>
        </div>
      )}
    </div>
  )
}
