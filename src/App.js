import React, { useState, useEffect } from 'react';
import UserInputModal from './components/UserInputModal';
import './App.css';
import HomePage from './components/HomePage';

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [storedId, setStoredId] = useState('');
  const [jsonData, setJsonData] = useState(null); // State to hold API response

  useEffect(() => {
    const id = localStorage.getItem('id');
    if (!id) {
      setIsModalOpen(true);
    } else {
      setStoredId(id);

      // API call to fetch JSON data, only if id is present
      const fetchData = async () => {
        try {
          const response = await fetch(`https://b474-2409-4051-2e97-8304-c85c-e246-e6c2-6a59.ngrok-free.app/api/recommended/?q=${id}`); // Replace API URL
          const data = await response.json();
          setJsonData(data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      fetchData(); // Call the fetchData function
    }
  }, []);

  const handleModalSubmit = async (age, gender) => {
    // Make API call
    const response = await fetch(`https://b474-2409-4051-2e97-8304-c85c-e246-e6c2-6a59.ngrok-free.app/api/create-user/?age=${age}&gender=${gender}`);
    const data = await response.json();

    // Store the ID in local storage
    localStorage.setItem('id', data.id);

    // Close the modal
    setIsModalOpen(false);
    setStoredId(data.id);
  };

  return (
    <div style={{ overflowX: 'hidden' }}>
      {/* Your app content */}
      {storedId ? (
        <HomePage RecommendedItems={jsonData} />
      ) : (
        <UserInputModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleModalSubmit}
        />
      )}
    </div>
  );
};

export default App;
