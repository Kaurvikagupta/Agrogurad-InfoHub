import { useContext } from 'react'
import { ThemeContext } from '../ThemeContext'

export default function ThemeToggle() {
  const { dark, setDark } = useContext(ThemeContext)

  return (
    <div
      onClick={() => setDark(!dark)}
      className="fixed top-6 right-6 cursor-pointer text-2xl hover:scale-110 transition-transform z-40 p-2 rounded-full dark:bg-zinc-800 bg-gray-200"
      title={dark ? "Switch to Light Mode" : "Switch to Dark Mode"}
    >
      {dark ? '☀️' : '🌙'}
    </div>
  )
}
