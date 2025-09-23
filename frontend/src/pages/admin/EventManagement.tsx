import React, { useState, useEffect, useMemo } from 'react';
import { Plus, Calendar, Clock, Target, Users, Edit, Trash2, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import CreateEventModal from './CreateEventModal';
import { Link, useNavigate } from 'react-router-dom';
import EditEventModal from './EditEventModal';

type EventType = {
  id: string;
  title: string;
  description: string;
  start_time: string;
  end_time: string;
  status: 'Upcoming' | 'Ongoing' | 'Past';
  funding_goal: number;
  current_funding: number;
  donors_count: number;
  banner_image_url: string;
};

interface EditEventModalProps {
  event: EventType;
  onClose: () => void;
  onSave: (updatedEvent: EventType) => void;
}

const EventManagement: React.FC = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null);
  
  // Search and filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [eventsPerPage] = useState(6); // Show 6 events per page
  const [isLoading, setIsLoading] = useState(false);

  const [activeTab, setActiveTab] = useState<'all' | 'upcoming' | 'ongoing' | 'past'>('all');
  
  // Sample events data
const [events, setEvents] = useState<EventType[]>([
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
  ]);
  
  // Get event counts for each tab - optimized with useMemo
  const eventCounts = useMemo(() => {
    return {
      all: events.length,
      upcoming: events.filter(e => e.status === 'Upcoming').length,
      ongoing: events.filter(e => e.status === 'Ongoing').length,
      past: events.filter(e => e.status === 'Past').length,
    };
  }, [events]);

  const tabs = [
    { id: 'all' as const, label: 'All Events', count: eventCounts.all },
    { id: 'upcoming' as const, label: 'Upcoming', count: eventCounts.upcoming },
    { id: 'ongoing' as const, label: 'Ongoing', count: eventCounts.ongoing },
    { id: 'past' as const, label: 'Past', count: eventCounts.past },
  ];

  // NOTE: In a real app, you would fetch this data
  // useEffect(() => {
  //   fetch('/api/events')
  //     .then(res => res.json())
  //     .then(data => setEvents(data));
  // }, []);

  const handleOpenEditModal = (event: EventType) => {
    setSelectedEvent(event);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedEvent(null);
  };

  const handleUpdateEvent = (updatedEvent: EventType) => {
    // This function will be called from the EditEventModal on successful save
    setEvents(currentEvents =>
      currentEvents.map(event =>
        event.id === updatedEvent.id ? updatedEvent : event
      )
    );
    handleCloseEditModal(); // Close the modal after update
  };

  // Bonus: Handler for Delete button
  const handleDeleteEvent = async (eventId: string) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
        try {
            const response = await fetch(`/api/event/${eventId}`, { method: 'DELETE' });
            if (!response.ok) throw new Error('Failed to delete.');
            
            setEvents(currentEvents => currentEvents.filter(event => event.id !== eventId));
            alert('Event deleted successfully!');
        } catch (error) {
            console.error("Delete failed:", error);
            alert('Could not delete the event.');
        }
    }
  };


  const handleCreateEvent = (newEventData: { title: string; description: string; dateFrom: string; dateTo: string; timeFrom: string; timeTo: string; goal: number }) => {
    const newEvent = {
      id: (events.length + 1).toString(), // Simple ID generation
      title: newEventData.title,
      description: newEventData.description,
      start_time: `${newEventData.dateFrom}T${newEventData.timeFrom}`,
      end_time: `${newEventData.dateTo}T${newEventData.timeTo}`,
      status: 'Upcoming' as const,
      funding_goal: newEventData.goal,
      current_funding: 0,
      donors_count: 0,
      banner_image_url: '',
    };
    setEvents(prevEvents => [newEvent, ...prevEvents]);
    setIsModalOpen(false); // Close modal after creation
  };

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

  // Filter events based on active tab and search term - using useMemo for optimization
  const filteredEvents = useMemo(() => {
    let filtered = events;

    // Apply tab filter only if not 'all' - this avoids unnecessary filtering
    if (activeTab !== 'all') {
      filtered = events.filter(event => event.status.toLowerCase() === activeTab);
    }

    // Apply search filter if search term exists
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(event =>
        event.title.toLowerCase().includes(searchLower) ||
        event.description.toLowerCase().includes(searchLower)
      );
    }

    return filtered;
  }, [events, activeTab, searchTerm]);

  // Pagination logic
  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);
  const startIndex = (currentPage - 1) * eventsPerPage;
  const endIndex = startIndex + eventsPerPage;
  const currentEvents = filteredEvents.slice(startIndex, endIndex);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, searchTerm]);

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
            <button 
              onClick={() => setIsModalOpen(true)}
              className="flex items-center space-x-2 bg-yellow-500 text-white px-6 py-3 rounded-lg hover:bg-yellow-600 transition-colors font-medium">
              <Plus className="h-5 w-5" />
              <span>Create Event</span>
            </button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
            />
          </div>
          <div className="text-sm text-gray-600">
            Showing {currentEvents.length} of {filteredEvents.length} events
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors flex items-center space-x-2 ${
                  activeTab === tab.id
                    ? 'border-yellow-500 text-yellow-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span>{tab.label}</span>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  activeTab === tab.id
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </nav>
        </div>

        {/* Events Grid */}
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6 min-h-[400px]">
          {currentEvents.length > 0 ? (
            currentEvents.map((event) => (
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
              {/* Actions -- This is the part that changes */}
                <div className="flex space-x-2 mt-auto pt-4"> {/* mt-auto pushes actions to the bottom */}
                  <button 
                    // <-- 4. CHANGE THE ONCLICK HANDLER
                    onClick={() => handleOpenEditModal(event)}
                    className="flex-1 flex items-center justify-center space-x-2 bg-blue-500 text-white py-2 px-3 rounded-lg hover:bg-blue-600 transition-colors text-sm"
                  >
                    <Edit className="h-4 w-4" />
                    <span>Edit</span>
                  </button>
                  <button 
                    onClick={() => handleDeleteEvent(event.id)}
                    className="px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-12 text-gray-500">
              <Calendar className="h-12 w-12 mb-4" />
              <h3 className="text-lg font-medium mb-2">No events found</h3>
              <p className="text-sm">
                {searchTerm ? 'Try adjusting your search terms' : 'Create your first event to get started'}
              </p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-8 flex items-center justify-center space-x-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            
            <div className="flex space-x-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    currentPage === page
                      ? 'bg-yellow-500 text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
            
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>

      {/* Create Modal */}
      <CreateEventModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreateEvent}
      />

      {/* <-- 5. RENDER THE EDIT MODAL CONDITIONALLY */}
      {isEditModalOpen && selectedEvent && (
        <EditEventModal
          event={selectedEvent}
          onClose={handleCloseEditModal}
          onSave={handleUpdateEvent}
        />
      )}
    </div>
  );
};


export default EventManagement;