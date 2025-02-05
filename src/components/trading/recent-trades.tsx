'use client'

import { useState, useEffect } from 'react'

interface Trade {
  id: string
  price: number
  amount: number
  total: string
  type: 'buy' | 'sell'
  time: string
  isNew?: boolean
}

export function RecentTrades() {
  const [trades, setTrades] = useState<Trade[]>([])

  const generateDummyTrade = (basePrice: number): Trade => {
    const type = Math.random() > 0.5 ? 'buy' : 'sell'
    const priceChange = (Math.random() * 100 - 50)
    const price = basePrice + priceChange
    const amount = parseFloat((Math.random() * 2 + 0.1).toFixed(4))
    const total = (price * amount).toFixed(2)
    const time = new Date().toLocaleTimeString()
    
    return {
      id: Math.random().toString(36).substring(7),
      price,
      amount,
      total,
      type,
      time,
      isNew: true
    }
  }

  useEffect(() => {
    // Generate initial trades
    const basePrice = 49876.54
    const initialTrades = Array.from({ length: 20 }, () => generateDummyTrade(basePrice))
    setTrades(initialTrades)

    // Add new trades periodically
    const interval = setInterval(() => {
      setTrades(prevTrades => {
        const newTrade = generateDummyTrade(basePrice)
        const updatedTrades = [newTrade, ...prevTrades.slice(0, 19)]
        
        // Remove isNew flag from previous trades
        setTimeout(() => {
          setTrades(trades => 
            trades.map(trade => 
              trade.id === newTrade.id ? { ...trade, isNew: false } : trade
            )
          )
        }, 1000)

        return updatedTrades
      })
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="w-full bg-background p-6 rounded-xl border dark:border-zinc-900 shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Recent Trades</h3>
      
      <div className="grid grid-cols-4 gap-4 text-xs font-medium text-muted-foreground mb-2">
        <div>Price (USD)</div>
        <div className="text-right">Amount (BTC)</div>
        <div className="text-right">Total (USD)</div>
        <div className="text-right">Time</div>
      </div>

      <div className="space-y-[4px]">
        {trades.map((trade) => (
          <div
            key={trade.id}
            className={`grid p-2 grid-cols-4 rounded gap-4 text-xs transition-colors duration-500 ${
              trade.isNew ? (trade.type === 'buy' ? 'bg-emerald-500/10' : 'bg-red-500/10') : ''
            }`}
          >
            <div className={`font-medium ${
              trade.type === 'buy' ? 'text-emerald-500' : 'text-red-500'
            }`}>
              ${trade.price.toFixed(2)}
            </div>
            <div className="text-right">{trade.amount}</div>
            <div className="text-right">${trade.total}</div>
            <div className="text-right text-muted-foreground">{trade.time}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
