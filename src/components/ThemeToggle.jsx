import { useContext } from 'react'
import { ThemeContext } from '../ThemeContext'

export default function ThemeToggle() {
  const { dark, setDark } = useContext(ThemeContext)

  return (
    <div
      onClick={() => setDark(!dark)}
      className="fixed top-24 right-4 md:top-6 md:right-6 cursor-pointer text-2xl hover:scale-110 transition-transform z-[100] w-12 h-12 rounded-full bg-[#2E7D32]/80 backdrop-blur-sm flex items-center justify-center shadow-lg border border-green-500/30"
      title={dark ? "Switch to Light Mode" : "Switch to Dark Mode"}
    >
      {dark ? '☀️' : '🌙'}
    </div>
  )
}
