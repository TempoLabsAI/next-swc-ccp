'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'

interface Order {
  price: number
  amount: number
  total: string
  depth?: number
  id: string
  flash?: 'buy' | 'sell'
}

export function OrderBook() {
  const [buyOrders, setBuyOrders] = useState<Order[]>([])
  const [sellOrders, setSellOrders] = useState<Order[]>([])
  const [spreadAmount, setSpreadAmount] = useState<string>('0.00')
  const [spreadPercentage, setSpreadPercentage] = useState<string>('0.00')
  const [grouping, setGrouping] = useState<number>(0.1)
  const [currentTime, setCurrentTime] = useState<string>('')

  const generateDummyOrders = (type: 'buy' | 'sell', basePrice: number): Order[] => {
    const orders = Array.from({ length: 12 }, (_, i) => {
      const priceChange = type === 'buy' ? -i * 50 : i * 50
      const price = basePrice + priceChange
      const amount = parseFloat((Math.random() * 2 + 0.1).toFixed(4))
      const total = (price * amount).toFixed(2)
      return { 
        price, 
        amount, 
        total,
        id: Math.random().toString(36).substring(7)
      }
    })

    // Calculate depth
    let runningTotal = 0
    const ordersWithDepth = orders.map(order => {
      runningTotal += parseFloat(order.total)
      return {
        ...order,
        depth: runningTotal
      }
    })

    return ordersWithDepth
  }

  const updateRandomOrder = (orders: Order[], type: 'buy' | 'sell'): Order[] => {
    const index = Math.floor(Math.random() * orders.length)
    const newAmount = parseFloat((Math.random() * 2 + 0.1).toFixed(4))
    const newTotal = (orders[index].price * newAmount).toFixed(2)
    
    return orders.map((order, i) => {
      if (i === index) {
        return {
          ...order,
          amount: newAmount,
          total: newTotal,
          flash: type,
          id: Math.random().toString(36).substring(7)
        }
      }
      return { ...order, flash: undefined }
    })
  }

  useEffect(() => {
    const basePrice = 49876.54
    const buyOrders = generateDummyOrders('buy', basePrice)
    const sellOrders = generateDummyOrders('sell', basePrice)
    setBuyOrders(buyOrders)
    setSellOrders(sellOrders)
    
    // Calculate spread
    const lowestSell = Math.min(...sellOrders.map(o => o.price))
    const highestBuy = Math.max(...buyOrders.map(o => o.price))
    const spread = lowestSell - highestBuy
    const spreadPct = (spread / basePrice) * 100
    setSpreadAmount(spread.toFixed(2))
    setSpreadPercentage(spreadPct.toFixed(2))

    // Update orders randomly
    const orderInterval = setInterval(() => {
      setBuyOrders(prev => updateRandomOrder(prev, 'buy'))
      setSellOrders(prev => updateRandomOrder(prev, 'sell'))
    }, 500)

    // Update time
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      }))
    }, 1000)

    return () => {
      clearInterval(orderInterval)
      clearInterval(timeInterval)
    }
  }, [])

  const maxDepth = Math.max(
    ...buyOrders.map(o => o.depth || 0),
    ...sellOrders.map(o => o.depth || 0)
  )

  return (
    <div className="w-full bg-background rounded-xl border dark:border-zinc-900 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-semibold">Order Book</h3>
          <div className="text-xs text-muted-foreground">
            Spread: <span className="text-foreground font-medium">${spreadAmount}</span> ({spreadPercentage}%)
          </div>
        </div>
        <div className="flex items-center gap-1">
          {[0.1, 1, 10].map((value) => (
            <Button
              key={value}
              size="sm"
              variant={grouping === value ? "secondary" : "ghost"}
              className="text-xs h-7 px-2"
              onClick={() => setGrouping(value)}
            >
              {value}
            </Button>
          ))}
        </div>
      </div>

      <div className="p-4">
        {/* Column Headers */}
        <div className="grid grid-cols-3 gap-4 text-[11px] font-medium text-muted-foreground mb-2 px-2">
          <div>Price (USD)</div>
          <div className="text-right">Size (BTC)</div>
          <div className="text-right">Total</div>
        </div>

        {/* Sell Orders - Reversed for correct display order */}
        <div className="space-y-[4px]">
          {[...sellOrders].reverse().map((order) => (
            <div
              key={order.id}
              className={`group grid grid-cols-3 rounded gap-4 text-[11px] p-2 relative hover:bg-muted/50 ${
                order.flash === 'sell' ? 'animate-flash-red' : ''
              }`}
            >
              <div className="absolute inset-0 opacity-[0.03] bg-red-500" 
                   style={{ width: `${((order.depth || 0) / maxDepth) * 100}%` }} />
              <div className="relative text-red-500 tabular-nums font-medium">
                ${order.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
              <div className="relative text-right tabular-nums">{order.amount.toFixed(4)}</div>
              <div className="relative text-right tabular-nums text-muted-foreground">
                ${parseFloat(order.total).toLocaleString()}
              </div>
            </div>
          ))}
        </div>

        {/* Current Price */}
        <div className="my-2 px-2">
          <div className="text-lg font-semibold text-violet-500 tabular-nums">
            $49,876.54
          </div>
          <div className="text-xs text-muted-foreground mt-2">
            {currentTime}
          </div>
        </div>

        {/* Buy Orders */}
        <div className="space-y-[4px]">
          {buyOrders.map((order) => (
            <div
              key={order.id}
              className={`group grid grid-cols-3 rounded gap-4 text-[11px] p-2 relative hover:bg-muted/50 ${
                order.flash === 'buy' ? 'animate-flash-green' : ''
              }`}
            >
              <div className="absolute inset-0 opacity-[0.03] bg-emerald-500" 
                   style={{ width: `${((order.depth || 0) / maxDepth) * 100}%` }} />
              <div className="relative text-emerald-500 tabular-nums font-medium">
                ${order.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
              <div className="relative text-right tabular-nums">{order.amount.toFixed(4)}</div>
              <div className="relative text-right tabular-nums text-muted-foreground">
                ${parseFloat(order.total).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
