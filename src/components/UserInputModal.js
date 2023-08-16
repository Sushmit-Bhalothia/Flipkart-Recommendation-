import React, { useState } from 'react';
import Modal from 'react-modal';

const UserInputModal = ({ isOpen, onClose, onSubmit }) => {
  const [age, setAge] = useState('');
  const [gender, setGender] = useState(''); // Updated state for gender

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleSubmit = () => {
    onSubmit(age, gender);
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose}>
      <h2>Enter Your Information</h2>
      <input
        type="text"
        placeholder="Age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />
      <label>
        Gender:
        <select value={gender} onChange={handleGenderChange}>
          <option value="">Select</option>
          <option value="M">Male</option>
          <option value="F">Female</option>
        </select>
      </label>
      <button onClick={handleSubmit}>Submit</button>
    </Modal>
  );
};

export default UserInputModal;
