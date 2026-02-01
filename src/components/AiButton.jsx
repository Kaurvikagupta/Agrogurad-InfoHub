import { useState, useContext } from 'react'
import { ThemeContext } from '../ThemeContext'
import { translations } from '../translations'

const AI_RESPONSES = {
  'irrigation': '💧 Maintain soil moisture 60-70% based on your crop. Water early morning to reduce disease. Use drip for 25-30% water savings.',
  'pest': '🐛 Neem oil spray or Bt-cotton variety recommended. Apply early morning. Repeat every 7-10 days. Contact state agriculture for subsidized options.',
  'fertilizer': '🌱 Nitrogen at tillering, Phosphorus at planting, Potassium during flowering. Get free soil testing via Soil Health Card scheme.',
  'disease': '🦠 Fungal diseases? Spray copper fungicide 0.5%. Remove infected leaves. Ensure field drainage. Monitor daily.',
  'weather': '☁️ Check IMD forecast for your region. Delay sprays if rain expected. Prepare for waterlogging in low-lying areas.',
  'msp': '💰 Current MSP varies by state. Wheat: ₹2,150-2,380/qtl | Rice: ₹1,880-5,200/qtl | Register with NAFED for procurement.',
  'scheme': '📋 PMFBY Insurance (2% premium) | KCC (4% interest) | Soil Health Card (free) | All available pan-India. Contact nearest bank/KVK.',
  'harvest': '🌾 Harvest when grain moisture 14-15%. Cut 5-7cm above ground. Use combine harvester for efficiency.',
  'organic': '🍃 Organic certification subsidy available. 3-year transition support. Access premium markets at 30-50% higher prices.',
  'cotton': '🌾 Cotton pests: Pink bollworm, Thrips. Use Bt-cotton varieties. Install pheromone traps. Monitor weekly.',
  'rice': '🍚 Transplant 40 days after nursery sowing. 5-7cm water level optimal. Potassium critical before flowering.',
  'wheat': '🌾 Sow Oct-Nov for best yield. Nitrogen split: 50% at sowing, 50% at tillering. Harvest April-May.',
  'sugarcane': '🌾 First irrigation 40-45 days after planting. Total 15-18 irrigations per season. Drip irrigation saves 25-30% water.',
  'msme': '🏪 Government subsidies for farm machinery. Contact nearest ATMA or agriculture department for details.',
  'helpline': '📞 National Agriculture Helpline: 1800-180-1551 | State helplines available 24/7 | Ask local KVK for free consultations.',
  'default': '🤖 Welcome to AgroGuard AI! Ask about irrigation, pests, fertilizers, diseases, weather, MSP, schemes, harvest, organic farming, cotton, rice, wheat, sugarcane, or government helplines.'
}

export default function AiButton({ language = 'en' }) {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const { dark } = useContext(ThemeContext)
  const t = translations[language]

  const handleAsk = () => {
    if (!input.trim()) return

    const userMsg = { type: 'user', text: input }
    setMessages([...messages, userMsg])

    // Find matching response
    const query = input.toLowerCase()
    const responses = translations[language]
    let response = responses.aiDefault
    
    const responseMap = {
      'irrigation': 'irrigationResponse',
      'pest': 'pestResponse',
      'fertilizer': 'fertilizerResponse',
      'disease': 'diseaseResponse',
      'weather': 'weatherResponse',
      'msp': 'mspResponse',
      'scheme': 'schemeResponse',
      'harvest': 'harvestResponse',
      'organic': 'organicResponse',
      'cotton': 'cottonResponse',
      'rice': 'riceResponse',
      'wheat': 'wheatResponse',
      'sugarcane': 'sugarcaneResponse',
      'msme': 'msmeResponse',
      'helpline': 'helplineResponse'
    }
    
    Object.keys(responseMap).forEach(key => {
      if (query.includes(key)) {
        response = responses[responseMap[key]]
      }
    })

    setTimeout(() => {
      setMessages(prev => [...prev, { type: 'ai', text: response }])
    }, 500)

    setInput('')
  }

  return (
    <>
      {/* Floating Button */}
      <div
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 bg-green-600 hover:bg-green-700 text-white w-16 h-16 rounded-full flex items-center justify-center text-4xl cursor-pointer shadow-2xl transition-transform hover:scale-110 z-30"
        title="Open AI Assistant"
      >
        🌾
      </div>

      {/* Chat Box */}
      {open && (
        <div className={`fixed bottom-28 right-6 w-96 ${dark ? 'bg-zinc-900 text-white' : 'bg-white text-black'} rounded-2xl shadow-2xl p-4 border ${dark ? 'border-zinc-700' : 'border-gray-300'} z-40 max-h-96 flex flex-col`}>
          {/* Header */}
          <div className="flex justify-between items-center mb-3 pb-3 border-b border-green-600">
            <div>
              <h3 className="font-bold text-lg">🤖 {t.aiAssistant || 'Agro AI Assistant'}</h3>
              <p className={`text-xs ${dark ? 'text-gray-400' : 'text-gray-600'}`}>
                {t.aiSubtitle || 'Powered by AgroGuard'}
              </p>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-xl hover:bg-red-600 p-1 rounded"
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div className={`flex-1 overflow-y-auto mb-3 space-y-3 ${dark ? 'bg-zinc-800' : 'bg-gray-50'} p-3 rounded-lg`}>
            {messages.length === 0 ? (
              <p className={`text-center text-sm ${dark ? 'text-gray-400' : 'text-gray-600'}`}>
                {t.aiWelcome || 'Start chatting to get farming advice! 👇'}
              </p>
            ) : (
              messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                      msg.type === 'user'
                        ? 'bg-green-600 text-white rounded-br-none'
                        : dark ? 'bg-zinc-700 text-white rounded-bl-none' : 'bg-gray-200 text-black rounded-bl-none'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Input */}
          <div className="flex gap-2">
            <input
              type="text"
              placeholder={t.aiPlaceholder || "Ask about crops..."}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAsk()}
              className={`flex-1 p-2 rounded-lg border ${
                dark
                  ? 'bg-zinc-800 text-white border-zinc-600'
                  : 'bg-gray-100 text-black border-gray-300'
              } focus:outline-none focus:ring-2 focus:ring-green-600`}
            />
            <button
              onClick={handleAsk}
              className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg font-medium transition-colors"
            >
              📤
            </button>
          </div>
        </div>
      )}
    </>
  )
}
