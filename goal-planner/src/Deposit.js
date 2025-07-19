import React, { useState } from 'react';

function DepositForm({ goals, handleDeposit }) {
  const [selectedGoalId, setSelectedGoalId] = useState('');
  const [amount, setAmount] = useState('');

  function handleSubmit(e) {
    e.preventDefault();

    const depositAmount = Number(amount);
    if (!selectedGoalId || depositAmount <= 0) return;

    handleDeposit(selectedGoalId, depositAmount);
    setSelectedGoalId('');
    setAmount('');
  }

  return (
    <form onSubmit={handleSubmit} className="deposit-form">
      <select
        value={selectedGoalId}
        onChange={(e) => setSelectedGoalId(e.target.value)}
        required
      >
        <option value="">-- Select a Goal --</option>
        {goals.map((goal) => (
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
        required
        min="1"
      />

      <button type="submit">Submit</button>
    </form>
  );
}

export default DepositForm;
