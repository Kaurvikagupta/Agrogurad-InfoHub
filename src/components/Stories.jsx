import React from 'react';

const STORIES = [
  { id: 1, name: 'Your Story', icon: '📸', active: true },
  { id: 2, name: 'Ramesh K.', icon: '👨‍🌾', active: true },
  { id: 3, name: 'Priya S.', icon: '👩‍🌾', active: true },
  { id: 4, name: 'Ministry', icon: '🏛️', active: true },
  { id: 5, name: 'KVK', icon: '🏠', active: true },
  { id: 6, name: 'Arun S.', icon: '👨‍🌾', active: true },
];

export default function Stories({ dark }) {
  return (
    <div className={`p-4 ${dark ? 'bg-zinc-950' : 'bg-white'} border-b ${dark ? 'border-zinc-800' : 'border-gray-100'}`}>
      <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
        {STORIES.map((story) => (
          <div key={story.id} className="flex flex-col items-center gap-2 min-w-[70px]">
            <div className={`w-16 h-16 rounded-full p-1 border-2 ${story.active ? 'border-green-500' : 'border-gray-300'} flex items-center justify-center bg-zinc-800 text-3xl`}>
              <div className="w-full h-full rounded-full bg-zinc-700 flex items-center justify-center">
                {story.icon}
              </div>
            </div>
            <span className={`text-[10px] font-bold text-center truncate w-full ${dark ? 'text-white' : 'text-black'}`}>
              {story.name}
            </span>
          </div>
        ))}
      </div>
      
      {/* Scrollbar Indicator like in screenshot */}
      <div className="w-full h-1 bg-gray-200 dark:bg-zinc-800 rounded-full mt-2 relative">
          <div className="absolute left-0 top-0 h-full w-1/4 bg-gray-400 dark:bg-zinc-600 rounded-full"></div>
      </div>
    </div>
  );
}
