import { useState } from 'react'

interface SearchBarProps {
  onSearch: (city: string) => void
  onGetCurrentLocation: () => void
  isLoading: boolean
}

function SearchBar({ onSearch, onGetCurrentLocation, isLoading }: SearchBarProps) {
  const [input, setInput] = useState<string>('')
  // 都市名で検索する関数・コンポーネントの責務の分離
  const handleSearch = () => {
    if (input.trim() === '') return
    onSearch(input.trim())
    setInput('')
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSearch()
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="都市名を入力（例：Tokyo）"
          disabled={isLoading}
          className="flex-1 px-4 py-3 rounded-xl border border-white/30 bg-white/20 text-white placeholder-white/50 outline-none focus:border-white/60 focus:ring-2 focus:ring-white/20 transition-all disabled:opacity-50"
        />
        <button
          onClick={handleSearch}
          disabled={isLoading}
          className="px-5 py-3 bg-white/20 text-white rounded-xl font-medium hover:bg-white/30 transition-colors cursor-pointer disabled:opacity-50"
        >
          {isLoading ? '取得中...' : '検索'}
        </button>
      </div>
      <button
        onClick={onGetCurrentLocation}
        disabled={isLoading}
        className="w-full py-3 bg-white/10 text-white/80 rounded-xl text-sm hover:bg-white/20 transition-colors cursor-pointer disabled:opacity-50"
      >
        📍 現在地の天気を取得
      </button>
    </div>
  )
}

export default SearchBar