import { useState } from 'react'
import Sidebar from './components/Sidebar'
import Feed from './components/Feed'
import Dashboard from './components/Dashboard'
import ThemeToggle from './components/ThemeToggle'
import AiButton from './components/AiButton'
import ImageModal from './components/ImageModal'
import MobileHeader from './components/MobileHeader'
import BottomNav from './components/BottomNav'
import './index.css'

export default function App() {
  const [activeTab, setActiveTab] = useState('feed')
  const [language, setLanguage] = useState('en')
  const [region, setRegion] = useState(' Global')
  const [selectedImage, setSelectedImage] = useState(null)

  return (
    <div className="flex h-screen bg-zinc-100 dark:bg-[#050505] text-black dark:text-white overflow-hidden justify-center relative">
      {/* Sidebar - Strictly Desktop */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        language={language}
        setLanguage={setLanguage}
        region={region}
        setRegion={setRegion}
      />

      {/* Main Container with Mobile Outline Logic */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden items-center justify-center relative">
        <div className="w-full h-full max-w-[480px] md:max-w-none bg-white dark:bg-black relative flex flex-col overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.4)] md:shadow-none border-x border-zinc-800/50 md:border-none transition-all duration-300">

          {/* Mobile Header - Strictly Mobile */}
          <div className="md:hidden">
            <MobileHeader language={language} setLanguage={setLanguage} />
          </div>

          <main className="flex-1 overflow-y-auto relative no-scrollbar">
            {activeTab === 'feed' ? (
              <Feed activeTab={activeTab} language={language} region={region} onImageClick={setSelectedImage} />
            ) : (
              <Dashboard activeTab={activeTab} language={language} onImageClick={setSelectedImage} />
            )}
          </main>

          {/* Bottom Nav - Strictly Mobile */}
          <div className="md:hidden">
            <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} language={language} />
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <ThemeToggle />
      <AiButton language={language} />

      <ImageModal src={selectedImage} onClose={() => setSelectedImage(null)} />
    </div>
  )
}
