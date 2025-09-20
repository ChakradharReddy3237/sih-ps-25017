import React, { useState } from 'react';
import { Plus, Calendar, Clock, Target, Users, Edit, Trash2 } from 'lucide-react';

const EventManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'upcoming' | 'ongoing' | 'past'>('all');

  const tabs = [
    { id: 'all' as const, label: 'All Events' },
    { id: 'upcoming' as const, label: 'Upcoming' },
    { id: 'ongoing' as const, label: 'Ongoing' },
    { id: 'past' as const, label: 'Past' },
  ];

  // Sample events data
  const events = [
    {
      id: '1',
      title: 'Annual Tech Symposium 2025',
      description: 'Technology showcase and networking event',
      start_time: '2025-03-15T09:00:00',
      end_time: '2025-03-15T18:00:00',
      status: 'Upcoming' as const,
      funding_goal: 100000,
      current_funding: 45000,
      donors_count: 25,
      banner_image_url: '',
    },
    {
      id: '2',
      title: 'Alumni Meet 2025',
      description: 'Annual alumni gathering and reunion',
      start_time: '2025-04-20T10:00:00',
      end_time: '2025-04-20T20:00:00',
      status: 'Upcoming' as const,
      funding_goal: 150000,
      current_funding: 80000,
      donors_count: 42,
      banner_image_url: '',
    },
    {
      id: '3',
      title: 'Tech Conference 2024',
      description: 'Completed technology conference',
      start_time: '2024-10-15T09:00:00',
      end_time: '2024-10-15T17:00:00',
      status: 'Past' as const,
      funding_goal: 80000,
      current_funding: 85000,
      donors_count: 38,
      banner_image_url: '',
    },
  ];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'Upcoming':
        return 'bg-blue-100 text-blue-800';
      case 'Ongoing':
        return 'bg-green-100 text-green-800';
      case 'Past':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 font-['Poppins'] mb-2">Event Management</h1>
              <p className="text-gray-600 font-['Inter']">
                Create, manage, and track institutional events and their funding
              </p>
            </div>
            <button className="flex items-center space-x-2 bg-yellow-500 text-white px-6 py-3 rounded-lg hover:bg-yellow-600 transition-colors font-medium">
              <Plus className="h-5 w-5" />
              <span>Create Event</span>
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-yellow-500 text-yellow-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Events Grid */}
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {events.map((event) => (
            <div key={event.id} className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                <div className="text-center text-white">
                  <Calendar className="h-12 w-12 mx-auto mb-2" />
                  <p className="text-sm">Event Banner</p>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{event.title}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(event.status)}`}>
                    {event.status}
                  </span>
                </div>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {event.description}
                </p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>{formatDate(event.start_time)} • {formatTime(event.start_time)} - {formatTime(event.end_time)}</span>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600">
                    <Target className="h-4 w-4 mr-2" />
                    <span>Goal: ₹{event.funding_goal.toLocaleString('en-IN')}</span>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="h-4 w-4 mr-2" />
                    <span>{event.donors_count} contributors</span>
                  </div>
                </div>

                {/* Funding Progress */}
                <div className="mb-4">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-gray-600">Funding Progress</span>
                    <span className="font-medium text-gray-900">
                      ₹{event.current_funding.toLocaleString('en-IN')} / ₹{event.funding_goal.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-yellow-500 h-2 rounded-full" 
                      style={{ width: `${Math.min((event.current_funding / event.funding_goal) * 100, 100)}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {Math.round((event.current_funding / event.funding_goal) * 100)}% funded
                  </p>
                </div>

                {/* Actions */}
                <div className="flex space-x-2">
                  <button className="flex-1 flex items-center justify-center space-x-2 bg-blue-500 text-white py-2 px-3 rounded-lg hover:bg-blue-600 transition-colors text-sm">
                    <Edit className="h-4 w-4" />
                    <span>Edit</span>
                  </button>
                  <button className="px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {events.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No events found</h3>
            <p className="text-gray-500 mb-4">Create your first event to get started.</p>
            <button className="bg-yellow-500 text-white px-6 py-2 rounded-lg hover:bg-yellow-600 transition-colors">
              Create Event
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventManagement;