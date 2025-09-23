// src/components/EditEventModal.tsx

import React, { useState, useEffect } from 'react';

// Re-using the EventType from the main page. In a larger app,
// you might put this type definition in its own file (e.g., `types.ts`).
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

const EditEventModal: React.FC<EditEventModalProps> = ({ event, onClose, onSave }) => {
  // Initialize form state with the event data passed as a prop
  const [formData, setFormData] = useState<EventType>(event);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Extract date and time parts for form inputs
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [timeFrom, setTimeFrom] = useState('');
  const [timeTo, setTimeTo] = useState('');

  // This ensures the form resets if a different event is opened while modal is already visible (edge case)
  useEffect(() => {
    setFormData(event);
    
    // Extract date and time from ISO strings
    const startDate = new Date(event.start_time);
    const endDate = new Date(event.end_time);
    
    setDateFrom(startDate.toISOString().split('T')[0]);
    setDateTo(endDate.toISOString().split('T')[0]);
    setTimeFrom(startDate.toTimeString().slice(0, 5));
    setTimeTo(endDate.toTimeString().slice(0, 5));
  }, [event]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Validate that end date/time is after start date/time
    const startDateTime = new Date(`${dateFrom}T${timeFrom}`);
    const endDateTime = new Date(`${dateTo}T${timeTo}`);
    
    if (endDateTime <= startDateTime) {
      setError('End date and time must be after start date and time.');
      setIsLoading(false);
      return;
    }

    // Combine date and time to create ISO strings
    const startDateTimeISO = `${dateFrom}T${timeFrom}:00`;
    const endDateTimeISO = `${dateTo}T${timeTo}:00`;

    // Prepare updated event data
    const updatedEvent = {
      ...formData,
      start_time: startDateTimeISO,
      end_time: endDateTimeISO,
      funding_goal: Number(formData.funding_goal),
      current_funding: Number(formData.current_funding),
      donors_count: Number(formData.donors_count)
    };

    try {
      // For now, we'll just simulate a successful update
      // In a real app, you would make an API call here
      // const response = await fetch(`/api/event/${event.id}`, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(updatedEvent),
      // });

      // if (!response.ok) {
      //   throw new Error('Failed to update event. Please try again.');
      // }

      // const updatedEventFromServer = await response.json();
      
      // For now, just pass the updated data back
      onSave(updatedEvent);

    } catch (err: any) {
      setError(err.message || 'Failed to update event');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6">Edit Event</h2>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
              <input type="text" name="title" id="title" value={formData.title} onChange={handleChange} required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500 px-3 py-2" />
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
              <textarea name="description" id="description" value={formData.description} onChange={handleChange} rows={3}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500 px-3 py-2" />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="dateFrom" className="block text-sm font-medium text-gray-700">From Date</label>
                <input type="date" id="dateFrom" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500 px-3 py-2" />
              </div>
              <div>
                <label htmlFor="dateTo" className="block text-sm font-medium text-gray-700">To Date</label>
                <input type="date" id="dateTo" value={dateTo} onChange={(e) => setDateTo(e.target.value)} required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500 px-3 py-2" />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="timeFrom" className="block text-sm font-medium text-gray-700">From Time</label>
                <input type="time" id="timeFrom" value={timeFrom} onChange={(e) => setTimeFrom(e.target.value)} required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500 px-3 py-2" />
              </div>
              <div>
                <label htmlFor="timeTo" className="block text-sm font-medium text-gray-700">To Time</label>
                <input type="time" id="timeTo" value={timeTo} onChange={(e) => setTimeTo(e.target.value)} required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500 px-3 py-2" />
              </div>
            </div>
            
            <div>
              <label htmlFor="funding_goal" className="block text-sm font-medium text-gray-700">Funding Goal (₹)</label>
              <input type="number" name="funding_goal" id="funding_goal" value={formData.funding_goal} onChange={handleChange} required min="0"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500 px-3 py-2" />
            </div>
          </div>

          {error && <p className="text-red-500 text-sm mt-4">{error}</p>}

          <div className="mt-8 flex justify-end space-x-3">
            <button type="button" onClick={onClose} disabled={isLoading}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors">
              Cancel
            </button>
            <button type="submit" disabled={isLoading}
              className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors disabled:bg-yellow-300">
              {isLoading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditEventModal;