import { useContext } from 'react'
import { ThemeContext } from '../ThemeContext'

export default function MobileHeader({ language, setLanguage }) {
    const { dark } = useContext(ThemeContext)

    return (
        <div className={`fixed top-0 left-0 right-0 z-50 md:hidden px-4 py-4 shadow-lg transition-colors bg-gradient-to-r from-green-600 to-yellow-500`}>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <span className="text-2xl">🌾</span>
                    <h1 className="font-bold text-xl text-zinc-900">
                        AgroGuard
                    </h1>
                </div>

                <div className="flex items-center gap-4">
                    <button className="text-orange-300 text-2xl">🔔</button>
                    <button className="text-purple-700 text-2xl">👤</button>
                </div>
            </div>
        </div>
    )
}
