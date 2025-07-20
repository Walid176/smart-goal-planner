import React, {useEffect, useState} from "react";
import Overview from "./Overview";
import NewGoalForm from "./NewGoalForm"
import DepositForm from "./Deposit"
import GoalsList from "./GoalsList"
function App(){
  const[goals, setGoals] = useState([]);
  useEffect(() => {
    fetch('http://localhost:3001/goals')
    .then(response => response.json())
    .then(data => {
      setGoals(data);
    })
    .catch(error => {
      console.error('Failed to fetch:', error)
    });
  },  []);
function handleAddGoal(newGoal) {
  fetch('http://localhost:3001/goals', {
    method: 'POST',
    headers: {'Content-Type': 'application/json' },
    body: JSON.stringify(newGoal),
  })
  .then(response => response.json())
  .then(addedGoal => {
    setGoals(prevGoals => [...prevGoals, addedGoal]);
  })
  .catch(error => {
    console.error('Failed to add a new goal', error)
  });
}
function handleDeleteGoal(goalId) {
fetch(`http://localhost:3001/goals/${goalId}`, {
  method: 'DELETE',
})
.then(() => {
  setGoals(prevGoals => prevGoals.filter(goal => goal.id !== goalId))
}) 
.catch(error => {
  console.error('Failed to delete goal:', error);
});
}
 function handleUpdateGoal(goalId, updatedGoal)  {
  fetch(`http://localhost:3001/goals/${goalId}`, {
    method: 'PATCH',
    headers: {'Content-Type' : 'application/json'},
     body: JSON.stringify(updatedGoal),

  })
  .then(response => response.json())
  .then(updated => {
    setGoals(prevGoals => 
      prevGoals.map(goal =>(goal.id === goalId ? updated : goal))
    );
  })
  .catch(error => {
    console.error('Failed to update goal:', error);
  });
 }
function handleDeposit(goalId, amount) {
  const goalToUpdate = goals.find(goal => goal.id === goalId);
  if (!goalToUpdate) return;
  const updatedAmount = goalToUpdate.savedAmount + amount;
  fetch(`http://localhost:3001/goals/${goalId}`, {
    method: 'PATCH',
    headers: {'Content-Type' : 'application/json'},
    body: JSON.stringify({savedAmount: updatedAmount}),
  })
  .then(response => response.json())
  .then(updatedGoal => {
    setGoals(prevGoals =>
      prevGoals.map(goal => (goal.id === goalId ? updatedGoal : goal))
    );
  })
  .catch(error => {
    console.error('Failed to add deposit:', error);
  });
}
return (
  <div className="App">
    <h1>My Goal PLanner</h1>
<div className="top-panel">
  <Overview goals={goals} />
  <NewGoalForm handleAddGoal={handleAddGoal} />
  <DepositForm goals={goals} handleDeposit={handleDeposit} />
  </div>
  <GoalsList goals={goals} handleDeleteGoal={handleDeleteGoal} handleUpdateGoal={handleUpdateGoal} />
  </div>
);
}
export default App
