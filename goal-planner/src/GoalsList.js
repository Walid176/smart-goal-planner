import React from "react";
import GoalCard from "./GoalCard";
function GoalsList({ goals, handleDeleteGoal }) {
  return (
    <div>
      {goals.map(goal => (
        <GoalCard key={goal.id} goal={goal} handleDeleteGoal={handleDeleteGoal} />
      ))}
    </div>
  );
}
export default GoalsList;