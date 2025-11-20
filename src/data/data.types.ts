
export type Country = "Turkey" | "UAE" | "Italy";

export type BoardCode = "FB" | "HB" | "NB";

export interface Hotel {
  id: number;
  name: string;
  price: number;
}

export interface Meal {
  id: number;
  name: string;
  price: number;
}

export interface MealSet {
  lunch: Meal[];
  dinner: Meal[];
}

export interface DailySelection {
  hotelId: number | null;
  lunchId: number | null;
  dinnerId: number | null;
}

export interface BookingState {
  citizenship: string | null;

  startDate: string | null;
  days: number;

  destination: Country | null;
  boardType: BoardCode;

  daily: DailySelection[];
}
