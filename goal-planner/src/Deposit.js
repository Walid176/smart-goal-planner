import React, { useState } from 'react';
import './App.css';

function DepositForm({ goals, handleDeposit }) {
  const [selectedGoalId, setSelectedGoalId] = useState('');
  const [amount, setAmount] = useState('');
   function handleSubmit(e) {
    e.preventDefault();
    const depositAmount = parseFloat(amount);
    const goal = goals.find(g => g.id === Number(selectedGoalId));

    if (!goal) return;
    if (isNaN(depositAmount) || depositAmount <= 0) return;

    const newSavedTotal = goal.savedAmount + depositAmount;
    if (newSavedTotal > goal.targetAmount) {
      alert("Deposit exceeds the target amount for this goal.");
      return;
    }
       handleDeposit(goal.id, depositAmount);
    setSelectedGoalId('');
    setAmount('');
  }

  return (
    <form onSubmit={handleSubmit} className="deposit-form">
      <h3>Add a Deposit</h3>
      <select
        value={selectedGoalId}
        onChange={(e) => setSelectedGoalId(e.target.value)}
        required
      >
         <option value="">-- Select a Goal --</option>
        {goals.map(goal => (
          <option key={goal.id} value={goal.id}>
            {goal.name}
          </option>
        ))}
      </select>
      <input
        type="number"
        placeholder="Deposit Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        min="1"
        required
      />
      <button type="submit" disabled={!selectedGoalId || !amount}>
        Submit
      </button>
    </form>
  );
}
export default DepositForm