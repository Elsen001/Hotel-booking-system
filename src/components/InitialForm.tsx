import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import type { RootState } from '../store'
import { countries, boardTypes } from '../data/data'
import { setConfig, setDays, setBoardType, setDestination, resetBooking } from '../store/slices/bookingSlice'

export default function InitialForm() {
  const dispatch = useDispatch()
  const booking = useSelector((s: RootState) => s.booking)
  const [toast, setToast] = useState("")

  useEffect(() => {
    if (!booking.daily.length) dispatch(setDays(booking.days))
  }, [])

  const today = new Date().toISOString().split("T")[0]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setToast("Booking submitted!")
    setTimeout(() => {
      setToast("")
      dispatch(resetBooking())
    }, 2000)
    console.log("Booking submitted:", booking)
  }

  return (
    <form
      className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 bg-white rounded-lg shadow-md"
      onSubmit={handleSubmit}
    >
      <label className="flex flex-col">
        <span className="font-medium text-gray-700 mb-1">Citizenship</span>
        <select
          className="mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={booking.citizenship ?? ""}
          onChange={(e) =>
            dispatch(setConfig({ citizenship: e.target.value || null }))
          }
        >
          <option value="">Choose</option>
          {countries.map((c) => (
            <option key={c.id} value={c.name}>
              {c.name}
            </option>
          ))}
        </select>
      </label>

      <label className="flex flex-col">
        <span className="font-medium text-gray-700 mb-1">Start Date</span>
        <input
          className="mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          type="date"
          value={booking.startDate ?? ""}
          min={today} 
          onChange={(e) =>
            dispatch(setConfig({ startDate: e.target.value || null }))
          }
        />
      </label>

      <label className="flex flex-col">
        <span className="font-medium text-gray-700 mb-1">Days</span>
        <input
          className="mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          type="number"
          min={1}
          value={booking.days}
          onChange={(e) => dispatch(setDays(Number(e.target.value || 1)))}
        />
      </label>

      <label className="flex flex-col">
        <span className="font-medium text-gray-700 mb-1">Destination</span>
        <select
          className="mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={booking.destination ?? ""}
          onChange={(e) =>
            dispatch(setDestination((e.target.value || null) as any))
          }
        >
          <option value="">Choose</option>
          {countries.map((c) => (
            <option key={c.id} value={c.name}>
              {c.name}
            </option>
          ))}
        </select>
      </label>

      <div className="flex flex-col md:col-span-2 mt-4 md:mt-0">
        <span className="font-medium text-gray-700 mb-2">Board Type</span>
        <div className="flex flex-wrap gap-4">
          {boardTypes.map((b) => (
            <label
              key={b.code}
              className="inline-flex items-center gap-2 cursor-pointer"
            >
              <input
                type="radio"
                name="board"
                className="w-4 h-4 text-blue-600 focus:ring-blue-400 border-gray-300 rounded"
                checked={booking.boardType === b.code}
                onChange={() => dispatch(setBoardType(b.code as any))}
              />
              <span className="text-gray-700">{b.name}</span>
            </label>
          ))}
        </div>
      </div>

      <button
        type="submit"
        className="mt-4 col-span-full bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 transition"
      >
        Submit Booking
      </button>

      {toast && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-md">
          {toast}
        </div>
      )}
    </form>
  )
}
