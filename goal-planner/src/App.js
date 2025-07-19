import React, { useEffect, useState } from 'react';
import NewGoalForm from './NewGoalForm';
import GoalsList from './GoalsList';
import DepositForm from './Deposit';
import Overview from './Overview';
function App() {
  const [goals, setGoals] = useState([]);

  
  useEffect(() => {
    fetch('http://localhost:3001/goals')
      .then(res => res.json())
      .then(data => setGoals(data))
      .catch(err => console.error('Failed to fetch goals:', err));
  }, []);

  
  function handleAddGoal(newGoal) {
    fetch('http://localhost:3001/goals', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newGoal),
    })
      .then(res => res.json())
      .then(addedGoal => setGoals(prev => [...prev, addedGoal]))
      .catch(err => console.error('Failed to add goal:', err));
  }

  function handleDeleteGoal(goalId) {
  fetch(`http://localhost:3001/goals/${goalId}`, {
    method: 'DELETE',
  })
    .then(() => {
      setGoals(prevGoals => prevGoals.filter(goal => goal.id !== goalId));
    })
    .catch(err => console.error('Failed to delete goal:', err));
}
function handleUpdateGoal(goalId, updatedGoal) {
  fetch(`http://localhost:3001/goals/${goalId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedGoal),
  })
    .then(res => res.json())
    .then(updated => {
      setGoals(prev =>
        prev.map(goal => (goal.id === goalId ? updated : goal))
      );
    })
    .catch(err => console.error('Failed to update goal:', err));
}
function handleDeposit(goalId, amount) {
  const goalToUpdate = goals.find(goal => goal.id === goalId);

  if (!goalToUpdate) return;

  const updatedAmount = goalToUpdate.savedAmount + amount;

  fetch(`http://localhost:3001/goals/${goalId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ savedAmount: updatedAmount }),
  })
    .then(res => res.json())
    .then(updatedGoal => {
      setGoals(prevGoals =>
        prevGoals.map(goal =>
          goal.id === goalId ? updatedGoal : goal
        )
      );
    })
    .catch(err => console.error('Deposit failed:', err));
}




  return (
    <div className="App">
      <h1>My Financial Goals</h1>
      <NewGoalForm handleAddGoal={handleAddGoal} />
    <GoalsList
  goals={goals}
  handleDeleteGoal={handleDeleteGoal}
  handleUpdateGoal={handleUpdateGoal}
/>
<DepositForm goals={goals} handleDeposit={handleDeposit} />
<Overview goals={goals} />

    </div>
  );
}

export default App;
