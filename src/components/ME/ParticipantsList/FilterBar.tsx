import { Search, Filter, Plus, Briefcase } from 'lucide-react';
import { Participant } from '@/types/participant';
import { Cohort } from '@/types/cohort';

function cohortLabel(c: Cohort): string {
  if (c.courseName || c.facilitatorName) {
    const parts = [c.courseName, c.facilitatorName].filter(Boolean);
    return `${c.name} (${parts.join(' • ')})`;
  }
  return c.name;
}

interface FilterBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  statusFilter: string;
  onStatusChange: (value: string) => void;
  employmentFilter: string;
  onEmploymentChange: (value: string) => void;
  genderFilter?: string;
  onGenderChange?: (value: string) => void;
  selectedCohort?: string;
  onCohortChange?: (value: string) => void;
  cohorts?: Cohort[];
  participants?: Participant[];
  onAddCohort?: () => void;
  onUpdateEmployment?: () => void;
  type: 'all' | 'cohorts' | 'employment';
}

export default function FilterBar({
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusChange,
  employmentFilter,
  onEmploymentChange,
  genderFilter,
  onGenderChange,
  selectedCohort,
  onCohortChange,
  cohorts,
  participants,
  onAddCohort,
  onUpdateEmployment,
  type
}: FilterBarProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search participants..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
          />
        </div>
        
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-gray-400" />
          
          {type === 'cohorts' && selectedCohort !== undefined && onCohortChange && cohorts && participants && (
            <select
              value={selectedCohort}
              onChange={(e) => onCohortChange(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            >
              <option value="all">All Cohorts</option>
              {cohorts.map(cohort => (
                <option key={cohort.id} value={cohort.name}>
                  {cohortLabel(cohort)} ({participants.filter(p => p.cohort === cohort.name).length} participants)
                </option>
              ))}
            </select>
          )}
          
          {type === 'employment' && (
            <select
              value={employmentFilter}
              onChange={(e) => onEmploymentChange(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            >
              <option value="all">All Employment</option>
              <option value="Employed">Employed</option>
              <option value="Self-Employed">Self-Employed</option>
              <option value="Unemployed">Unemployed</option>
              <option value="Student">Student</option>
            </select>
          )}
          
          {type === 'all' && (
            <>
              <select
                value={employmentFilter}
                onChange={(e) => onEmploymentChange(e.target.value)}
                className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
              >
                <option value="all">All Employment</option>
                <option value="Employed">Employed</option>
                <option value="Self-Employed">Self-Employed</option>
                <option value="Unemployed">Unemployed</option>
                <option value="Student">Student</option>
              </select>
              
              {selectedCohort !== undefined && onCohortChange && cohorts && (
                <select
                  value={selectedCohort}
                  onChange={(e) => onCohortChange(e.target.value)}
                  className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                >
                  <option value="all">All Cohorts</option>
                  {cohorts.map(cohort => (
                    <option key={cohort.id} value={cohort.name}>
                      {cohortLabel(cohort)}
                    </option>
                  ))}
                </select>
              )}
            </>
          )}
          
          <select
            value={statusFilter}
            onChange={(e) => onStatusChange(e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="Completed">Completed</option>
            <option value="In Progress">In Progress</option>
            <option value="Not Started">Not Started</option>
          </select>
          
          {genderFilter !== undefined && onGenderChange && (
            <select
              value={genderFilter}
              onChange={(e) => onGenderChange(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            >
              <option value="all">All Genders</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          )}
          
          {onAddCohort && (
            <button
              onClick={onAddCohort}
              className="flex items-center gap-2 px-4 py-2 bg-[#0B609D] text-white rounded-lg hover:bg-[#094d7a] transition"
            >
              <Plus size={16} />
              Add Cohort
            </button>
          )}
          
          {onUpdateEmployment && (
            <button
              onClick={onUpdateEmployment}
              className="flex items-center gap-2 px-4 py-2 bg-[#0B609D] text-white rounded-lg hover:bg-[#094d7a] transition"
            >
              <Briefcase size={16} />
              Update Employment
            </button>
          )}
        </div>
      </div>
    </div>
  );
}