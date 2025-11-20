import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import type { RootState } from '../store'
import { hotels as HOTELS, meals as MEALS } from '../data/data'


export default function Summary() {
    const booking = useSelector((s: RootState) => s.booking)


    const breakdown = useMemo(() => {
        let dayDetails: { label: string; hotelName: string | null; hotelPrice: number; mealPrices: number[]; total: number }[] = []
        const start = booking.startDate ? new Date(booking.startDate) : null
        booking.daily.forEach((d, i) => {
            const label = start ? new Date(start.getTime() + i * 86400000).toISOString().slice(0, 10) : `Day ${i + 1}`
            const hotel = booking.destination && d.hotelId ? (HOTELS[booking.destination].find(h => h.id === d.hotelId) ?? null) : null
            const lunch = booking.destination && d.lunchId ? (MEALS[booking.destination].lunch.find(m => m.id === d.lunchId) ?? null) : null
            const dinner = booking.destination && d.dinnerId ? (MEALS[booking.destination].dinner.find(m => m.id === d.dinnerId) ?? null) : null
            const mealPrices = [lunch?.price ?? 0, dinner?.price ?? 0].filter(Boolean) as number[]
            const hotelPrice = hotel?.price ?? 0
            const total = hotelPrice + mealPrices.reduce((a, b) => a + b, 0)
            dayDetails.push({ label, hotelName: hotel?.name ?? null, hotelPrice, mealPrices, total })
        })
        const grand = dayDetails.reduce((s, d) => s + d.total, 0)
        return { dayDetails, grand }
    }, [booking])


    return (
       <div className="p-4 bg-white rounded-lg shadow-md">
  <h2 className="text-xl font-semibold mb-4 text-gray-800">Summary & Price</h2>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    <div className="p-4 border border-gray-300 rounded-lg bg-gray-50">
      <h3 className="font-semibold text-gray-700 mb-2">Configuration</h3>
      <p className="text-gray-600">Citizenship: {booking.citizenship ?? '-'}</p>
      <p className="text-gray-600">
        Dates: {booking.startDate ?? '-'} • {booking.days} day(s)
      </p>
      <p className="text-gray-600">Destination: {booking.destination ?? '-'}</p>
      <p className="text-gray-600">Board: {booking.boardType}</p>
    </div>

    <div className="p-4 border border-gray-300 rounded-lg md:col-span-2 bg-gray-50">
      <h3 className="font-semibold text-gray-700 mb-2">Daily Selections</h3>
      <ul className="divide-y divide-gray-200">
        {breakdown.dayDetails.map((d, i) => (
          <li key={i} className="py-3 last:border-b-0">
            <div className="text-sm text-gray-500 mb-1">{d.label}</div>
            <div className="text-gray-700">Hotel: {d.hotelName ?? '—'} (${d.hotelPrice})</div>
            <div className="text-gray-700">
              Meals:{' '}
              {d.mealPrices.length
                ? d.mealPrices.map((p, j) => `$${p}${j < d.mealPrices.length - 1 ? ', ' : ''}`)
                : '—'}
            </div>
            <div className="font-medium text-gray-800 mt-1">Day total: ${d.total}</div>
          </li>
        ))}
        <li className="pt-4 font-semibold text-lg text-gray-800">Grand total: ${breakdown.grand}</li>
      </ul>
    </div>
  </div>
</div>

    )
}