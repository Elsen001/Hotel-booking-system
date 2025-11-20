import InitialForm from './components/InitialForm'
import DailyTable from './components/DailyTable'
import Summary from './components/Summary'


export default function App() {
    return (
        <div className="min-h-screen bg-slate-50 p-6">
            <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow p-6">
                <h1 className="text-2xl font-semibold mb-4">Hotel Booking Demo</h1>
                <InitialForm />
                <div className="mt-6">
                    <DailyTable />
                </div>
                <div className="mt-6">
                    <Summary />
                </div>
            </div>
        </div>
    )
}