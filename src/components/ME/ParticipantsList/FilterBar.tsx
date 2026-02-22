import { Search, Filter } from "lucide-react";

interface FilterBarProps {
  filters: {
    search: string;
    cohortId: string;
    batchId: string;
    status: string;
  };
  onFilterChange: (filters: any) => void;
  cohorts: any[];
  batches: any[];
}

export default function FilterBar({ filters, onFilterChange, cohorts, batches }: FilterBarProps) {
  const updateFilter = (key: string, value: string) => {
    onFilterChange({ ...filters, [key]: value });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mx-8">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search by name, email, or student ID..."
            value={filters.search}
            onChange={(e) => updateFilter("search", e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter size={20} className="text-gray-400" />
          <select
            value={filters.batchId}
            onChange={(e) => updateFilter("batchId", e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-sky-500"
          >
            <option value="">All Batches</option>
            {batches.map((b: any) => (
              <option key={b.id} value={b.id}>{b.name}</option>
            ))}
          </select>
        </div>

        <select
          value={filters.cohortId}
          onChange={(e) => updateFilter("cohortId", e.target.value)}
          className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-sky-500"
        >
          <option value="">All Tracks</option>
          {cohorts.map((c: any) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>

        <select
          value={filters.status}
          onChange={(e) => updateFilter("status", e.target.value)}
          className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-sky-500"
        >
          <option value="">All Status</option>
          <option value="ENROLLED">Enrolled</option>
          <option value="ACTIVE">Active</option>
          <option value="COMPLETED">Completed</option>
          <option value="DROPPED">Dropped</option>
        </select>
      </div>
    </div>
  );
}
