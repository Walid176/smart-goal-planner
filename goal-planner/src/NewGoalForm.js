import React, { useState } from 'react';
import './App.css';


function NewGoalForm({ handleAddGoal }) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [deadline, setDeadline] = useState('');

  function handleSubmit(e) {
    e.preventDefault();

    const newGoal = {
      name: name,
      category: category,
      targetAmount: Number(amount),
      savedAmount: 0,
      deadline: deadline,
      createdAt: new Date().toLocaleDateString('en-CA') 
    };

    handleAddGoal(newGoal);

    
    setName('');
    setCategory('');
    setAmount('');
    setDeadline('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Goal name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Target Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />
      <input
        type="date"
        placeholder='Deadline Date'
        onChange={(e) => setDeadline(e.target.value)}
        required
      />
      <button type="submit">Add Goal</button>
    </form>
  );
}

export default NewGoalForm;
