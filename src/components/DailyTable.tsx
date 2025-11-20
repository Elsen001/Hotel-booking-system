import { useSelector, useDispatch } from "react-redux";
import type { RootState } from '../store'
import { hotels, meals as MEALS } from "../data/data";
import { setDailyHotel, setDailyMeal } from "../store/slices/bookingSlice";
import type { Country } from "../data/data.types";

export default function DailyTable() {
  const booking = useSelector((s: RootState) => s.booking);
  const dispatch = useDispatch();

  const destination = booking.destination as Country | null;

  const hotelList = destination ? hotels[destination] : [];
  const mealSet = destination
    ? MEALS[destination]
    : { lunch: [], dinner: [] };

  const start = booking.startDate ? new Date(booking.startDate) : null;

  return (
  <div className="p-4 bg-white rounded shadow-md">
  <h2 className="text-xl font-semibold mb-4 text-gray-800">Daily Configuration</h2>

  <div className="overflow-x-auto">
    <table className="min-w-full border border-gray-300 rounded-lg divide-y divide-gray-200">
      <thead className="bg-gray-100">
        <tr className="text-left text-gray-700">
          <th className="p-3 text-sm font-medium border-b">Day</th>
          <th className="p-3 text-sm font-medium border-b">Hotel</th>
          <th className="p-3 text-sm font-medium border-b">Lunch</th>
          <th className="p-3 text-sm font-medium border-b">Dinner</th>
        </tr>
      </thead>

      <tbody className="bg-white divide-y divide-gray-200">
        {booking.daily.map((d, i) => {
          const dateLabel = start
            ? new Date(start.getTime() + i * 86400000).toISOString().slice(0, 10)
            : `Day ${i + 1}`;

          return (
            <tr key={i} className="hover:bg-gray-50 transition-colors">
              <td className="p-2 border text-gray-700 font-medium">{dateLabel}</td>

              <td className="p-2 border">
                <select
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={d.hotelId ?? ""}
                  onChange={(e) =>
                    dispatch(
                      setDailyHotel({
                        dayIndex: i,
                        hotelId: e.target.value ? Number(e.target.value) : null,
                      })
                    )
                  }
                >
                  <option value="">Choose hotel</option>
                  {hotelList.map((h) => (
                    <option key={h.id} value={h.id}>
                      {h.name} — ${h.price}
                    </option>
                  ))}
                </select>
              </td>

              <td className="p-2 border">
                <select
                  disabled={
                    booking.boardType === "NB" ||
                    (booking.boardType === "HB" && d.dinnerId !== null)
                  }
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-gray-100 disabled:cursor-not-allowed"
                  value={d.lunchId ?? ""}
                  onChange={(e) =>
                    dispatch(
                      setDailyMeal({
                        dayIndex: i,
                        mealType: "lunch",
                        mealId: e.target.value ? Number(e.target.value) : null,
                      })
                    )
                  }
                >
                  <option value="">--</option>
                  {mealSet.lunch.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name} — ${m.price}
                    </option>
                  ))}
                </select>
              </td>

              <td className="p-2 border">
                <select
                  disabled={
                    booking.boardType === "NB" ||
                    (booking.boardType === "HB" && d.lunchId !== null)
                  }
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-gray-100 disabled:cursor-not-allowed"
                  value={d.dinnerId ?? ""}
                  onChange={(e) =>
                    dispatch(
                      setDailyMeal({
                        dayIndex: i,
                        mealType: "dinner",
                        mealId: e.target.value ? Number(e.target.value) : null,
                      })
                    )
                  }
                >
                  <option value="">--</option>
                  {mealSet.dinner.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name} — ${m.price}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
</div>

  );
}
