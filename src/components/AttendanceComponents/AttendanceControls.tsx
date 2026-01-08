import { ViewType } from '@/types/attendance';

interface AttendanceControlsProps {
  selectedDate: string;
  setSelectedDate: (date: string) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  view: ViewType;
  setView: (view: ViewType) => void;
  onMarkAllPresent: () => void;
}

export default function AttendanceControls({
  selectedDate,
  setSelectedDate,
  searchTerm,
  setSearchTerm,
  view,
  setView,
  onMarkAllPresent
}: AttendanceControlsProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-700">Date:</label>
            <input 
              type="date" 
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Search students..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="flex gap-2">
          {(['daily', 'weekly', 'monthly'] as const).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`px-4 py-2 text-sm font-medium capitalize rounded-lg transition ${
                view === v 
                  ? "bg-sky-600 text-white" 
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {v}
            </button>
          ))}
          <button
            onClick={onMarkAllPresent}
            className="px-4 py-2 text-sm bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition"
          >
            Mark All Present
          </button>
        </div>
      </div>
    </div>
  );
}