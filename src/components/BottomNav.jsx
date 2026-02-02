import { useContext } from 'react'
import { ThemeContext } from '../ThemeContext'
import { translations } from '../translations'

export default function BottomNav({ activeTab, setActiveTab, language }) {
    const { dark } = useContext(ThemeContext)
    const t = translations[language]

    const tabs = [
        { id: 'feed', label: 'Feed', icon: '📰' },
        { id: 'community', label: 'Community', icon: '👥' },
        { id: 'upload', label: 'Upload', icon: '📸' },
        { id: 'reports', label: 'Reports', icon: '📇' },
        { id: 'wallet', label: 'Wallet', icon: '💰' },
    ]

    return (
        <div className={`fixed bottom-0 left-0 right-0 z-40 border-t md:hidden ${dark ? 'bg-zinc-900 border-zinc-800' : 'bg-zinc-900 border-zinc-800 text-white'
            }`}>
            <div className="flex justify-around items-center p-3">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`relative flex-1 flex flex-col items-center gap-1 transition-colors ${activeTab === tab.id
                            ? 'text-green-500'
                            : 'text-gray-400 hover:text-gray-300'
                            }`}
                    >
                        {activeTab === tab.id && (
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-1 bg-green-500 rounded-full" />
                        )}
                        <span className="text-xl">{tab.icon}</span>
                        <span className="text-[10px] font-bold">{tab.label}</span>
                    </button>
                ))}
            </div>
        </div>
    )
}
