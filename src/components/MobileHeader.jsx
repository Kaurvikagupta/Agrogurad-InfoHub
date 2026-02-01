import { useContext } from 'react'
import { ThemeContext } from '../ThemeContext'

const LANGUAGES = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'हिंदी' },
    { code: 'mr', name: 'मराठी' },
    { code: 'kn', name: 'ಕನ್ನಡ' },
    { code: 'te', name: 'తెలుగు' },
    { code: 'ta', name: 'தமிழ்' },
]

export default function MobileHeader({ language, setLanguage }) {
    const { dark } = useContext(ThemeContext)

    return (
        <div className={`fixed top-0 left-0 right-0 z-50 md:hidden px-4 py-3 shadow-md transition-colors ${dark ? 'bg-zinc-900 border-b border-zinc-800' : 'bg-white border-b border-gray-200'
            }`}>
            <div className="flex flex-col gap-3">
                {/* Header Title */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="text-2xl">🌾</span>
                        <h1 className={`font-bold text-lg ${dark ? 'text-green-500' : 'text-green-600'}`}>
                            AgroGuard
                        </h1>
                    </div>
                </div>

                {/* Horizontal Language Selector */}
                <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
                    {LANGUAGES.map(lang => (
                        <button
                            key={lang.code}
                            onClick={() => setLanguage(lang.code)}
                            className={`whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-medium transition-colors border ${language === lang.code
                                    ? 'bg-green-600 text-white border-green-600'
                                    : dark
                                        ? 'bg-zinc-800 text-gray-300 border-zinc-700 hover:bg-zinc-700'
                                        : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200'
                                }`}
                        >
                            {lang.name}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}
