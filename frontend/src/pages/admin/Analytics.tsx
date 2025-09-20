import React from 'react';
import { 
  Users, 
  Calendar, 
  DollarSign, 
  TrendingUp,
  MessageSquare,
  Award
} from 'lucide-react';

const Analytics: React.FC = () => {
  const stats = [
    {
      name: 'Total Alumni',
      value: '1,247',
      change: '+12',
      changeType: 'increase',
      icon: Users,
    },
    {
      name: 'Active Events',
      value: '8',
      change: '+3',
      changeType: 'increase',
      icon: Calendar,
    },
    {
      name: 'Total Donations',
      value: '₹2,45,000',
      change: '+18%',
      changeType: 'increase',
      icon: DollarSign,
    },
    {
      name: 'Mentorship Requests',
      value: '156',
      change: '+24',
      changeType: 'increase',
      icon: MessageSquare,
    },
  ];

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 font-['Poppins'] mb-2">Analytics Dashboard</h1>
          <p className="text-gray-600 font-['Inter']">
            Track platform performance and alumni engagement metrics
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.name} className="bg-white rounded-lg shadow p-6 border border-gray-200">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Icon className="h-8 w-8 text-yellow-500" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">{item.name}</dt>
                      <dd>
                        <div className="text-lg font-medium text-gray-900">{item.value}</div>
                      </dd>
                    </dl>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex items-center text-sm">
                    <TrendingUp className="flex-shrink-0 h-4 w-4 text-green-500" />
                    <span className="ml-2 text-sm text-gray-600">
                      {item.change} from last month
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Charts Section */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Donations Chart */}
          <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Donations by Event</h3>
            <div className="h-64 flex items-center justify-center text-gray-500">
              <div className="text-center">
                <DollarSign className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                <p>Donations chart would be displayed here</p>
                <p className="text-sm">Integration with charting library needed</p>
              </div>
            </div>
          </div>

          {/* Engagement Chart */}
          <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Alumni Engagement Over Time</h3>
            <div className="h-64 flex items-center justify-center text-gray-500">
              <div className="text-center">
                <TrendingUp className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                <p>Engagement trends chart would be displayed here</p>
                <p className="text-sm">Integration with charting library needed</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <Award className="h-5 w-5 text-yellow-500" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">
                    <span className="font-medium">Rajesh Kumar</span> donated ₹5,000 to Tech Symposium 2025
                  </p>
                  <p className="text-xs text-gray-500">2 hours ago</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <MessageSquare className="h-5 w-5 text-blue-500" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">
                    New mentorship request from <span className="font-medium">Priya Sharma</span>
                  </p>
                  <p className="text-xs text-gray-500">4 hours ago</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <Users className="h-5 w-5 text-green-500" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">
                    <span className="font-medium">Amit Singh</span> joined as new alumni member
                  </p>
                  <p className="text-xs text-gray-500">6 hours ago</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <Calendar className="h-5 w-5 text-purple-500" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">
                    New event <span className="font-medium">Alumni Meet 2025</span> created
                  </p>
                  <p className="text-xs text-gray-500">1 day ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;