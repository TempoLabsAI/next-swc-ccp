'use client'

import { OrderBook } from "@/components/trading/order-book"
import { PriceChart } from "@/components/trading/price-chart"
import { RecentTrades } from "@/components/trading/recent-trades"
import { TradingForm } from "@/components/trading/trading-form"
import { Suspense } from 'react'

function LoadingComponent() {
  return (
    <div className="flex justify-center items-center min-h-[400px] dark:bg-[#1F1F1F] dark:border-[#2F2F2F] bg-background rounded-xl border shadow-sm">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-violet-500"></div>
    </div>
  )
}

export default function Dashboard() {
  return (
    <div className="grid grid-cols-12 gap-6">
      {/* Main Chart */}
      <div className="col-span-12 xl:col-span-8">
        <Suspense fallback={<LoadingComponent />}>
          <PriceChart />
        </Suspense>
      </div>

      {/* Trading Form */}
      <div className="col-span-12 xl:col-span-4">
        <Suspense fallback={<LoadingComponent />}>
          <TradingForm />
        </Suspense>
      </div>

      {/* Order Book */}
      <div className="col-span-12 lg:col-span-6 xl:col-span-4">
        <Suspense fallback={<LoadingComponent />}>
          <OrderBook />
        </Suspense>
      </div>

      {/* Recent Trades */}
      <div className="col-span-12 lg:col-span-6 xl:col-span-8">
        <Suspense fallback={<LoadingComponent />}>
          <RecentTrades />
        </Suspense>
      </div>
    </div>
  )
}
