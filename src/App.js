import React, { useState, useEffect } from 'react';
import UserInputModal from './components/UserInputModal';
import './App.css'
import HomePage from './components/HomePage';


const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [storedId, setStoredId] = useState('');

  useEffect(() => {
    const id = localStorage.getItem('id');
    if (!id) {
      setIsModalOpen(true);
    } else {
      setStoredId(id);
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
        <HomePage/>
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
