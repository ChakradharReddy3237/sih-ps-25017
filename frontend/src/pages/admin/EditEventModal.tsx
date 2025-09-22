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

  // This ensures the form resets if a different event is opened while modal is already visible (edge case)
  useEffect(() => {
    setFormData(event);
  }, [event]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Prepare payload. Your backend expects numbers for funding, so we convert them.
    const payload = {
        ...formData,
        funding_goal: Number(formData.funding_goal),
        current_funding: Number(formData.current_funding), // You might not edit this, but it's good to ensure type correctness
        donors_count: Number(formData.donors_count)
    };

    try {
      const response = await fetch(`/api/event/${event.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Failed to update event. Please try again.');
      }

      const updatedEventFromServer = await response.json();
      onSave(updatedEventFromServer); // Pass the updated data back to the parent

    } catch (err: any) {
      setError(err.message);
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
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500" />
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
              <textarea name="description" id="description" value={formData.description} onChange={handleChange} rows={3}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500" />
            </div>
            <div>
              <label htmlFor="funding_goal" className="block text-sm font-medium text-gray-700">Funding Goal</label>
              <input type="number" name="funding_goal" id="funding_goal" value={formData.funding_goal} onChange={handleChange} required
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500" />
            </div>
            {/* Add more fields as needed (e.g., for date and time) */}
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