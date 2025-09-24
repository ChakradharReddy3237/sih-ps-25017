import React, { useState } from 'react';
import { X, Calendar, Plus } from 'lucide-react';

interface AddToEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  alumniName: string;
  onAddToEvent: (eventId: string, role: string) => void;
}

const AddToEventModal: React.FC<AddToEventModalProps> = ({
  isOpen,
  onClose,
  alumniName,
  onAddToEvent
}) => {
  const [selectedEvent, setSelectedEvent] = useState('');
  const [selectedRole, setSelectedRole] = useState('participant');
  const [isAdding, setIsAdding] = useState(false);

  // Sample events - in real app, fetch from API
  const availableEvents = [
    { id: '1', name: 'Annual Tech Symposium 2025', date: '2025-03-15' },
    { id: '2', name: 'Alumni Meet 2025', date: '2025-04-20' },
    { id: '3', name: 'Career Guidance Workshop', date: '2025-05-10' },
    { id: '4', name: 'Industry Connect Summit', date: '2025-06-05' },
  ];

  const roles = [
    { value: 'participant', label: 'Participant' },
    { value: 'speaker', label: 'Speaker' },
    { value: 'mentor', label: 'Mentor' },
    { value: 'sponsor', label: 'Sponsor' },
    { value: 'organizer', label: 'Organizer' },
  ];

  if (!isOpen) return null;

  const handleAdd = async () => {
    if (!selectedEvent) {
      alert('Please select an event');
      return;
    }

    setIsAdding(true);
    try {
      await onAddToEvent(selectedEvent, selectedRole);
      setSelectedEvent('');
      setSelectedRole('participant');
      onClose();
    } catch (error) {
      console.error('Failed to add to event:', error);
      alert('Failed to add alumni to event. Please try again.');
    } finally {
      setIsAdding(false);
    }
  };

  const handleClose = () => {
    setSelectedEvent('');
    setSelectedRole('participant');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <Calendar className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Add to Event</h2>
              <p className="text-sm text-gray-600">Add {alumniName} to an event</p>
            </div>
          </div>
          <button 
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          {/* Event Selection */}
          <div>
            <label htmlFor="event" className="block text-sm font-medium text-gray-700 mb-2">
              Select Event
            </label>
            <select
              id="event"
              value={selectedEvent}
              onChange={(e) => setSelectedEvent(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="">Choose an event...</option>
              {availableEvents.map(event => (
                <option key={event.id} value={event.id}>
                  {event.name} - {event.date}
                </option>
              ))}
            </select>
          </div>

          {/* Role Selection */}
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
              Role in Event
            </label>
            <select
              id="role"
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              {roles.map(role => (
                <option key={role.value} value={role.value}>
                  {role.label}
                </option>
              ))}
            </select>
          </div>

          {/* Preview */}
          {selectedEvent && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="text-sm font-medium text-green-900 mb-2">Preview:</h4>
              <p className="text-sm text-green-700">
                {alumniName} will be added as a <strong>{roles.find(r => r.value === selectedRole)?.label}</strong> to{' '}
                <strong>{availableEvents.find(e => e.id === selectedEvent)?.name}</strong>
              </p>
            </div>
          )}
        </div>

        <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200">
          <button
            onClick={handleClose}
            disabled={isAdding}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleAdd}
            disabled={isAdding || !selectedEvent}
            className="flex items-center space-x-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            {isAdding ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Adding...</span>
              </>
            ) : (
              <>
                <Plus className="h-4 w-4" />
                <span>Add to Event</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddToEventModal;