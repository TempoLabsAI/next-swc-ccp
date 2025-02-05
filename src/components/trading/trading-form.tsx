'use client'

import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function TradingForm() {
  const [limitPrice, setLimitPrice] = useState('')
  const [amount, setAmount] = useState('')
  const [total, setTotal] = useState('0.00')

  const handleAmountChange = (value: string) => {
    setAmount(value)
    if (limitPrice && value) {
      const totalValue = parseFloat(limitPrice) * parseFloat(value)
      setTotal(totalValue.toFixed(2))
    }
  }

  const handleLimitPriceChange = (value: string) => {
    setLimitPrice(value)
    if (amount && value) {
      const totalValue = parseFloat(value) * parseFloat(amount)
      setTotal(totalValue.toFixed(2))
    }
  }

  return (
    <div className="w-full bg-background p-6 rounded-xl border dark:border-zinc-900 shadow-sm">
      <Tabs defaultValue="limit" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="market" className="text-sm">Market</TabsTrigger>
          <TabsTrigger value="limit" className="text-sm">Limit</TabsTrigger>
        </TabsList>
        <TabsContent value="market" className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block text-muted-foreground">
              Amount (BTC)
            </label>
            <Input
              type="number"
              placeholder="0.00"
              className="bg-muted/50"
              step="0.0001"
              min="0"
            />
          </div>
          <div className="grid grid-cols-4 gap-2 my-3">
            {['25%', '50%', '75%', '100%'].map((percent) => (
              <Button
                key={percent}
                variant="outline"
                size="sm"
                className="w-full text-xs hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                {percent}
              </Button>
            ))}
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block text-muted-foreground">
              Total (USD)
            </label>
            <Input
              type="number"
              placeholder="0.00"
              className="bg-muted/50"
              readOnly
              value="0.00"
            />
          </div>
          <Button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white">
            Buy BTC
          </Button>
        </TabsContent>
        <TabsContent value="limit" className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block text-muted-foreground">
              Limit Price (USD)
            </label>
            <Input
              type="number"
              placeholder="0.00"
              className="bg-muted/50"
              value={limitPrice}
              onChange={(e) => handleLimitPriceChange(e.target.value)}
              step="0.01"
              min="0"
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block text-muted-foreground">
              Amount (BTC)
            </label>
            <Input
              type="number"
              placeholder="0.00"
              className="bg-muted/50"
              value={amount}
              onChange={(e) => handleAmountChange(e.target.value)}
              step="0.0001"
              min="0"
            />
          </div>
          <div className="grid grid-cols-4 gap-2 my-3">
            {['25%', '50%', '75%', '100%'].map((percent) => (
              <Button
                key={percent}
                variant="outline"
                size="sm"
                className="w-full text-xs hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                {percent}
              </Button>
            ))}
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block text-muted-foreground">
              Total (USD)
            </label>
            <Input
              type="number"
              placeholder="0.00"
              className="bg-muted/50"
              readOnly
              value={total}
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white">
              Buy BTC
            </Button>
            <Button className="w-full bg-red-500 hover:bg-red-600 text-white">
              Sell BTC
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
