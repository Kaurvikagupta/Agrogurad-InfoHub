import { useContext } from 'react'
import { ThemeContext } from '../ThemeContext'
import { translations } from '../translations'
import ImageWithFallback from './ImageWithFallback'

export function GovernmentPost({ post, language = 'en', onSave }) {
  const { dark } = useContext(ThemeContext)
  const t = translations[language]

  return (
    <div className={`${dark ? 'bg-blue-950 border-blue-900' : 'bg-blue-50 border-blue-200'} border-l-4 border-blue-600 rounded-lg p-6 mb-4 shadow-md`}>
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{post.ministry}</span>
          <div>
            <h3 className={`font-bold text-lg ${dark ? 'text-white' : 'text-black'}`}>
              {post.title}
            </h3>
            <div className="flex gap-2 mt-1">
              <span className="bg-blue-600 text-white text-xs px-3 py-1 rounded-full font-bold">
                {t.officialBadge || '🏛️ Official Government'}
              </span>
              <span className={`text-xs font-semibold ${dark ? 'text-blue-300' : 'text-blue-700'}`}>
                {post.time}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <p className={`mb-4 leading-relaxed ${dark ? 'text-gray-300' : 'text-gray-700'}`}>
        {post.content}
      </p>

      {/* Details */}
      {post.details && (
        <ul className={`list-disc list-inside mb-4 space-y-2 ${dark ? 'text-gray-400' : 'text-gray-600'}`}>
          {post.details.map((detail, idx) => (
            <li key={idx}>{detail}</li>
          ))}
        </ul>
      )}

      {/* Action Buttons */}
      <div className="flex gap-3 flex-wrap">
        {post.pdfLink && (
          <a
            href="#"
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            📄 {t.downloadPDF || 'Download PDF'}
          </a>
        )}
        {post.applyLink && (
          <a
            href="#"
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            ✅ {t.applyNow || 'Apply Now'}
          </a>
        )}
        <button
          onClick={() => onSave && onSave(post.id)}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${dark
            ? 'bg-zinc-800 hover:bg-zinc-700 text-gray-300'
            : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
            } ${post.saved ? 'text-green-600' : ''}`}>
          {post.saved ? '✅ Saved' : `🔖 ${t.save || 'Save'}`}
        </button>
      </div>

      {/* Stats */}
      <div className={`mt-4 pt-4 border-t flex gap-6 text-sm ${dark ? 'border-blue-900 text-blue-300' : 'border-blue-200 text-blue-700'}`}>
        <span>👥 {post.shares} Shares</span>
        <span>💬 {post.comments} Comments</span>
      </div>
    </div>
  )
}

export function AIAdvisoryPost({ post, language = 'en', onLike, onSave }) {
  const { dark } = useContext(ThemeContext)
  const t = translations[language]

  return (
    <div className={`${dark ? 'bg-purple-950 border-purple-900' : 'bg-purple-50 border-purple-200'} border-l-4 border-purple-600 rounded-lg p-6 mb-4 shadow-md`}>
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <span className="text-3xl">{post.icon}</span>
        <div>
          <h3 className={`font-bold text-lg ${dark ? 'text-white' : 'text-black'}`}>
            {post.title}
          </h3>
          <span className="bg-purple-600 text-white text-xs px-3 py-1 rounded-full font-bold inline-block mt-1">
            {t.aiGenerated || '🤖 AI Generated'}
          </span>
        </div>
      </div>

      {/* Time & Location */}
      <div className={`mb-3 text-sm ${dark ? 'text-gray-400' : 'text-gray-600'}`}>
        <span className="mr-4">{post.time}</span>
        <span>📍 {post.location}</span>
      </div>

      {/* Content */}
      <p className={`mb-4 leading-relaxed ${dark ? 'text-gray-300' : 'text-gray-700'}`}>
        {post.content}
      </p>

      {/* Key Points */}
      {post.keyPoints && (
        <div className={`mb-4 p-3 rounded-lg ${dark ? 'bg-zinc-800' : 'bg-white'}`}>
          <p className="font-semibold mb-2">💡 {t.keyActions || 'Key Actions'}:</p>
          <ul className="space-y-1">
            {post.keyPoints.map((point, idx) => (
              <li key={idx} className={`text-sm ${dark ? 'text-gray-300' : 'text-gray-700'}`}>
                ✓ {point}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-3">
        <button
          onClick={() => onLike && onLike(post.id)}
          className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          👍 {t.helpful || 'Helpful'} {post.likes > 0 && `(${post.likes})`}
        </button>
        <button
          onClick={() => onSave && onSave(post.id)}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${dark
            ? 'bg-zinc-800 hover:bg-zinc-700 text-gray-300'
            : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
            } ${post.saved ? 'text-green-600' : ''}`}>
          {post.saved ? '✅ Saved' : `🔖 ${t.save || 'Save'}`}
        </button>
        <button className={`px-4 py-2 rounded-lg font-medium transition-colors ${dark
          ? 'bg-zinc-800 hover:bg-zinc-700 text-gray-300'
          : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
          }`}>
          📤 {t.share || 'Share'}
        </button>
      </div>
    </div>
  )
}

export function FarmerPost({ post, language = 'en', onLike, onSave, onImageClick }) {
  const { dark } = useContext(ThemeContext)
  const t = translations[language]

  return (
    <div className={`${dark ? 'bg-zinc-800 border-zinc-700' : 'bg-white border-gray-200'} border rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow`}>
      {/* User Header */}
      <div className={`${dark ? 'bg-zinc-700' : 'bg-gray-50'} p-6 flex items-center justify-between`}>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-green-600 flex items-center justify-center text-white text-3xl">
            👨‍🌾
          </div>
          <div>
            <h3 className={`text-lg font-bold ${dark ? 'text-white' : 'text-black'}`}>
              {post.author}
            </h3>
            <div className="flex gap-2 items-center mt-1">
              {post.location && (
                <span className={`text-xs ${dark ? 'text-gray-400' : 'text-gray-600'}`}>
                  📍 {post.location}
                </span>
              )}
              {post.verified && (
                <span className="bg-green-600 text-white text-xs px-3 py-1 rounded-full font-bold">
                  {t.verifiedFarmer || '⭐ Verified Farmer'}
                </span>
              )}
              <span className={`text-xs ${dark ? 'text-gray-400' : 'text-gray-600'}`}>
                {post.time}
              </span>
            </div>
          </div>
        </div>
        <button className={`p-2 rounded-lg ${dark ? 'hover:bg-zinc-600' : 'hover:bg-gray-100'}`}>
          ⋮
        </button>
      </div>

      {/* Featured Image */}
      {post.image && (
        <div className="w-full h-80 overflow-hidden bg-gray-100">
          <ImageWithFallback
            src={post.image}
            alt={post.title || 'Post image'}
            className="w-full h-full object-cover cursor-pointer hover:opacity-95 transition-opacity"
            fallback={'https://via.placeholder.com/1200x800?text=Image+Unavailable'}
            onClick={(imageUrl) => onImageClick && onImageClick(imageUrl)}
          />
        </div>
      )}

      {/* Content */}
      <div className="p-6">
        <p className={`leading-relaxed text-lg ${dark ? 'text-gray-300' : 'text-gray-700'}`}>
          {post.content}
        </p>

        {/* Engagement Stats */}
        <div className={`mt-6 pt-6 border-t ${dark ? 'border-zinc-700' : 'border-gray-200'} flex gap-8`}>
          <div className="flex items-center gap-2">
            <span className="text-2xl">👍</span>
            <div>
              <p className={`font-bold ${dark ? 'text-white' : 'text-black'}`}>
                {post.likes}
              </p>
              <p className={`text-xs ${dark ? 'text-gray-400' : 'text-gray-600'}`}>
                {t.helpful || 'Helpful'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">💬</span>
            <div>
              <p className={`font-bold ${dark ? 'text-white' : 'text-black'}`}>
                45
              </p>
              <p className={`text-xs ${dark ? 'text-gray-400' : 'text-gray-600'}`}>
                {t.comments || 'Comments'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">📤</span>
            <div>
              <p className={`font-bold ${dark ? 'text-white' : 'text-black'}`}>
                12
              </p>
              <p className={`text-xs ${dark ? 'text-gray-400' : 'text-gray-600'}`}>
                {t.share || 'Shares'}
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-6">
          <button
            onClick={() => onLike && onLike(post.id)}
            className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg font-medium transition-colors"
          >
            👍 {t.helpful || 'Helpful'}
          </button>
          <button
            onClick={() => onSave && onSave(post.id)}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-colors ${dark
              ? 'bg-zinc-700 hover:bg-zinc-600 text-gray-300'
              : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              } ${post.saved ? 'text-green-600 bg-green-50 dark:bg-zinc-800' : ''}`}>
            {post.saved ? '✅ Saved' : `🔖 ${t.save || 'Save'}`}
          </button>
          <button className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-colors ${dark
            ? 'bg-zinc-700 hover:bg-zinc-600 text-gray-300'
            : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}>
            📤 {t.share || 'Share'}
          </button>
        </div>
      </div>
    </div>
  )
}

export function MarketPost({ post, language = 'en' }) {
  const { dark } = useContext(ThemeContext)
  const t = translations[language]

  return (
    <div className={`${dark ? 'bg-yellow-950 border-yellow-900' : 'bg-yellow-50 border-yellow-200'} border-l-4 border-yellow-600 rounded-lg p-6 mb-4 shadow-md`}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className={`font-bold text-lg ${dark ? 'text-white' : 'text-black'}`}>
            {post.commodity}
          </h3>
          <p className={`text-sm ${dark ? 'text-gray-400' : 'text-gray-600'}`}>
            📍 {post.market}
          </p>
        </div>
        <div className="text-right">
          <div className={`text-3xl font-bold ${post.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
            ₹{post.price}
            <span className="text-lg ml-2">{post.trend === 'up' ? '↑' : '↓'}</span>
          </div>
          <p className={`text-sm ${dark ? 'text-gray-400' : 'text-gray-600'}`}>
            per {post.unit}
          </p>
        </div>
      </div>

      <div className={`grid grid-cols-2 gap-4 mb-4 p-3 rounded-lg ${dark ? 'bg-zinc-800' : 'bg-white'}`}>
        <div>
          <p className={`text-xs ${dark ? 'text-gray-400' : 'text-gray-600'}`}>{t.high || 'High'}</p>
          <p className={`font-bold text-lg ${dark ? 'text-white' : 'text-black'}`}>
            ₹{post.high}
          </p>
        </div>
        <div>
          <p className={`text-xs ${dark ? 'text-gray-400' : 'text-gray-600'}`}>{t.low || 'Low'}</p>
          <p className={`font-bold text-lg ${dark ? 'text-white' : 'text-black'}`}>
            ₹{post.low}
          </p>
        </div>
      </div>

      <div className={`text-xs ${dark ? 'text-gray-400' : 'text-gray-600'}`}>
        {t.updated || 'Updated'}: {post.time}
      </div>
    </div>
  )
}

export function DisasterAlert({ post, language = 'en' }) {
  const { dark } = useContext(ThemeContext)
  const t = translations[language]

  return (
    <div className="bg-red-600 border-l-4 border-red-800 rounded-lg p-6 mb-4 shadow-lg animate-pulse">
      <div className="flex items-start gap-3">
        <span className="text-3xl">🚨</span>
        <div className="flex-1">
          <h3 className="font-bold text-lg text-white">
            {post.title}
          </h3>
          <p className="text-red-100 mb-3 leading-relaxed">
            {post.content}
          </p>
          <div className="flex gap-3 flex-wrap">
            <span className="bg-red-800 text-white text-xs px-3 py-1 rounded-full font-bold">
              {t.urgentAlert || 'URGENT ALERT'}
            </span>
            <span className="bg-red-700 text-white text-xs px-3 py-1 rounded-full">
              {post.time}
            </span>
          </div>
          <p className="text-red-100 text-sm mt-3">
            <strong>{t.actionRequired || 'Action Required'}:</strong> {post.action}
          </p>
        </div>
      </div>
    </div>
  )
}
