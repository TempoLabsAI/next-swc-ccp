'use client'

import { useState, useEffect } from 'react'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

const generateDummyData = () => {
  const labels = Array.from({ length: 30 }, (_, i) => `${i + 1}m`)
  const prices = Array.from({ length: 30 }, (_, i) => {
    const basePrice = 50000
    const randomChange = Math.random() * 2000 - 1000
    return basePrice + randomChange + (i * 100)
  })

  return {
    labels,
    datasets: [
      {
        label: 'BTC/USD',
        data: prices,
        fill: true,
        borderColor: '#8B5CF6',
        backgroundColor: 'rgba(139, 92, 246, 0.1)',
        tension: 0.4,
        borderWidth: 2,
        pointRadius: 0,
        pointHitRadius: 10,
      },
    ],
  }
}

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
    tooltip: {
      mode: 'index',
      intersect: false,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      titleFont: {
        size: 14,
        weight: 'bold',
      },
      bodyFont: {
        size: 13,
      },
      padding: 12,
      displayColors: false,
    },
  },
  interaction: {
    mode: 'index',
    intersect: false,
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
      ticks: {
        maxRotation: 0,
        color: 'rgba(156, 163, 175, 0.8)',
        font: {
          size: 11,
        },
      },
      border: {
        display: false,
      },
    },
    y: {
      grid: {
        color: 'rgba(156, 163, 175, 0.1)',
        drawBorder: false,
      },
      ticks: {
        color: 'rgba(156, 163, 175, 0.8)',
        font: {
          size: 11,
        },
        callback: (value: any) => `$${value.toLocaleString()}`,
      },
      border: {
        display: false,
      },
    },
  },
}

export function PriceChart() {
  const [data, setData] = useState<any>(null)
  const [currentPrice] = useState(49876.54)
  const [priceChange] = useState('+2.34%')
  const [selectedTimeframe, setSelectedTimeframe] = useState('1D')

  useEffect(() => {
    setData(generateDummyData())
  }, [])

  if (!data) {
    return (
      <div className="w-full bg-background p-6 rounded-xl border dark:border-zinc-900 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-lg font-semibold">BTC/USD</h3>
            <p className="text-2xl font-bold text-violet-500">${currentPrice.toLocaleString()}</p>
            <span className="text-sm text-emerald-500 font-medium">{priceChange}</span>
          </div>
          <div className="space-x-2">
            <button className="px-4 py-2 text-sm rounded-lg bg-secondary/50 hover:bg-secondary/70">1H</button>
            <button className="px-4 py-2 text-sm rounded-lg bg-violet-500 text-white">1D</button>
            <button className="px-4 py-2 text-sm rounded-lg bg-secondary/50 hover:bg-secondary/70">1W</button>
            <button className="px-4 py-2 text-sm rounded-lg bg-secondary/50 hover:bg-secondary/70">1M</button>
          </div>
        </div>
        <div className="flex justify-center items-center h-[400px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-violet-500"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full bg-background p-6 rounded-xl border dark:border-zinc-900 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg font-semibold">BTC/USD</h3>
          <p className="text-2xl font-bold text-violet-500">${currentPrice.toLocaleString()}</p>
          <span className="text-sm text-emerald-500 font-medium">{priceChange}</span>
        </div>
        <div className="space-x-2">
          {['1H', '1D', '1W', '1M'].map((timeframe) => (
            <button
              key={timeframe}
              onClick={() => setSelectedTimeframe(timeframe)}
              className={`px-4 py-2 text-sm rounded-lg transition-colors ${selectedTimeframe === timeframe
                  ? 'bg-violet-500 text-white'
                  : 'bg-secondary/50 hover:bg-secondary/70'
                }`}
            >
              {timeframe}
            </button>
          ))}
        </div>
      </div>
      <div className="h-[400px] w-full">
        <Line data={data} options={options as any} />
      </div>
    </div>
  )
}
