import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from "@reduxjs/toolkit";

import type { BookingState, BoardCode } from '../../data/data.types'


const initialState: BookingState = {
citizenship: null,
startDate: null,
days: 1,
destination: null,
boardType: 'FB',
daily: []
}


const ensureDaily = (state: BookingState) => {
state.daily = Array.from({ length: state.days }, (_, i) =>
state.daily[i] ?? { dayIndex: i, hotelId: null, lunchId: null, dinnerId: null }
)
}


const slice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    setConfig: (state, action: PayloadAction<Partial<BookingState>>) => {
      Object.assign(state, action.payload)
      if (action.payload.days) ensureDaily(state)
    },
    setDays: (state, action: PayloadAction<number>) => {
      state.days = Math.max(1, action.payload)
      ensureDaily(state)
    },
    setDestination: (state, action: PayloadAction<BookingState['destination']>) => {
      state.destination = action.payload
    },
    setBoardType: (state, action: PayloadAction<BoardCode>) => {
      state.boardType = action.payload
      if (action.payload === 'NB') {
        state.daily.forEach(d => { d.lunchId = null; d.dinnerId = null })
      }
    },
    setDailyHotel: (state, action: PayloadAction<{ dayIndex: number; hotelId: number | null }>) => {
      const d = state.daily[action.payload.dayIndex]
      if (d) d.hotelId = action.payload.hotelId
    },
    setDailyMeal: (state, action: PayloadAction<{ dayIndex: number; mealType: 'lunch' | 'dinner'; mealId: number | null }>) => {
      const d = state.daily[action.payload.dayIndex]
      if (!d) return
      if (state.boardType === 'NB') return

      if (state.boardType === 'HB') {
        if (action.payload.mealType === 'lunch') { d.lunchId = action.payload.mealId; d.dinnerId = null }
        if (action.payload.mealType === 'dinner') { d.dinnerId = action.payload.mealId; d.lunchId = null }
      }

      if (state.boardType === 'FB') {
        if (action.payload.mealType === 'lunch') d.lunchId = action.payload.mealId
        if (action.payload.mealType === 'dinner') d.dinnerId = action.payload.mealId
      }
    },

    resetBooking: (state) => {
      state.citizenship = null
      state.startDate = null
      state.days = 1
      state.destination = null
      state.boardType = 'FB'
      state.daily = []
    }
  }
})

export const { setConfig, setDays, setDestination, setBoardType, setDailyHotel, setDailyMeal, resetBooking } = slice.actions
export default slice.reducer
