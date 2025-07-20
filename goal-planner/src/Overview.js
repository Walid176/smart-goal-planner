import React from "react";
import './App.css';
function Overview({goals}){
const totalGoals = goals.length
const totalSaved = goals.reduce((sum, goal) => sum + goal.savedAmount, 0);
const completedGoals = goals.filter(goal => goal.savedAmount >= goal.targetAmount).length;
const today = new Date();
const goalsWithDeadline = goals.filter(goal => goal.deadline);
const upComingGoals = goalsWithDeadline.filter(goal => {
  const deadline = new Date (goal.deadline);
  const daysLeft = (deadline - today) / (1000*60*60*24);
  return daysLeft <= 30 && daysLeft >= 0 && goal.savedAmount < goal.targetAmount;
}).length;
const overdueGoals = goalsWithDeadline.filter(goal => {
  const deadline = new Date(goal.deadline);
  return deadline < today && goal.savedAmount < goal.targetAmount;
}).length;
return (
  <div className="overview">
<h2>Overview</h2>
<p><strong>Total Gaols:</strong>{totalGoals}</p>
<p><strong>Total Amount Saved:</strong>{totalSaved}</p>
<p><strong>Completed Gols:</strong>{completedGoals}</p>
<p><strong>Goals Nearing Deadline:</strong>{upComingGoals}</p>
<p><strong>Overdue Goals:</strong>{overdueGoals}</p>
  </div>
)
}
export default Overview;