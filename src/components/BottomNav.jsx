import { useContext } from 'react'
import { ThemeContext } from '../ThemeContext'
import { translations } from '../translations'

export default function BottomNav({ activeTab, setActiveTab, language }) {
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
        <div className={`fixed bottom-0 left-0 right-0 z-40 border-t md:hidden ${dark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'
            }`}>
            <div className="flex justify-around items-center p-2">
                {tabs.slice(0, 5).map(tab => ( // Showing only first 5 to fit simpler, or modify styling to scroll
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${activeTab === tab.id
                                ? 'text-green-600'
                                : dark
                                    ? 'text-gray-400 hover:text-gray-300'
                                    : 'text-gray-600 hover:text-gray-800'
                            }`}
                    >
                        <span className="text-xl">{tab.icon}</span>
                        <span className="text-[10px] font-medium">{tab.label}</span>
                    </button>
                ))}
            </div>
        </div>
    )
}
