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
    <div className="flex h-screen bg-white dark:bg-black text-black dark:text-white">
      <MobileHeader language={language} setLanguage={setLanguage} />
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        language={language}
        setLanguage={setLanguage}
        region={region}
        setRegion={setRegion}
      />
      {activeTab === 'feed' ? (
        <Feed activeTab={activeTab} language={language} region={region} onImageClick={setSelectedImage} />
      ) : (
        <Dashboard activeTab={activeTab} language={language} onImageClick={setSelectedImage} />
      )}
      <ThemeToggle />
      <AiButton language={language} />
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} language={language} />
      <ImageModal src={selectedImage} onClose={() => setSelectedImage(null)} />
    </div>
  )
}
