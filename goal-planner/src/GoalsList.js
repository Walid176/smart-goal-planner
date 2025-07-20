import React from "react";
import GoalCard from "./GoalCard";
function GoalsList({ goals, handleDeleteGoal, handleUpdateGoal }) {
  return (
    <div>
      {goals.map(goal => (
        <GoalCard key={goal.id} goal={goal} handleDeleteGoal={handleDeleteGoal} handleUpdateGoal={handleUpdateGoal} />
      ))}
    </div>
  );
}
export default GoalsList;
