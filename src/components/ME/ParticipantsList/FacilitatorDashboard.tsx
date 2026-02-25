import { Facilitator } from '@/types/facilitator';
import { Users, Award, TrendingUp } from 'lucide-react';

interface FacilitatorDashboardProps {
  facilitator: Facilitator | null;
  stats?: {
    totalParticipants: number;
    activeParticipants: number;
    completedParticipants: number;
    averageScore: number;
  };
  isLoading?: boolean;
}

export default function FacilitatorDashboard({ facilitator, stats, isLoading }: FacilitatorDashboardProps) {
  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6 animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-24 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  if (!facilitator) {
    return null;
  }

  const statCards = [
    {
      label: 'Total Participants',
      value: stats?.totalParticipants || facilitator.participantsCount,
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      label: 'Active',
      value: stats?.activeParticipants || 0,
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      label: 'Completed',
      value: stats?.completedParticipants || 0,
      icon: Award,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
    },
    {
      label: 'Avg Score',
      value: stats?.averageScore ? `${stats.averageScore.toFixed(1)}%` : 'N/A',
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          {facilitator.name}&apos;s Dashboard
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          {facilitator.region} • {facilitator.isActive ? 'Active' : 'Inactive'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.label} className={`${card.bgColor} rounded-lg p-4`}>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">
                    {card.label}
                  </p>
                  <p className={`text-2xl font-bold ${card.color}`}>
                    {card.value}
                  </p>
                </div>
                <Icon size={24} className={card.color} />
              </div>
            </div>
          );
        })}
      </div>

      {(facilitator.cohorts?.length || 0) > 0 && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            Assigned Cohorts
          </h3>
          <div className="flex flex-wrap gap-2">
            {facilitator.cohorts?.map((cohort) => (
              <span
                key={cohort.id}
                className="px-3 py-1 bg-sky-100 text-sky-700 rounded-full text-sm font-medium"
              >
                {cohort.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {(facilitator.courses?.length || 0) > 0 && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            Teaching Courses
          </h3>
          <div className="flex flex-wrap gap-2">
            {facilitator.courses?.map((course) => (
              <span
                key={course.id}
                className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium"
              >
                {course.name}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
