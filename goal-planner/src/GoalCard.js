import React, {useState} from "react";

function GoalCard({goal, handleDeleteGoal, handleUpdateGoal}) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedName, setEditedName] = useState(goal.name)
  const [editedCategory, setEditedCategory] = useState(goal.category)
  const [editedTarget, setEditedTarget] = useState(goal.targetAmount)
  const [editedDeadline, setEditedDeadline] = useState(goal.deadline)

  const progress = (goal.savedAmount / goal.targetAmount)*100;
  const today = new Date();
  const deadlineDate = new Date(goal.deadline)
  const daysDiff = deadlineDate - today;
  const daysRemaining = Math.ceil(daysDiff / (1000*60*60*24));

  const isCompleted = goal.savedAmount >= goal.targetAmount;
  const isOverdue = daysRemaining <= 0 && !isCompleted;
  const isClose = daysRemaining <= 30 && daysRemaining >=0 && !isCompleted;

  function handleEditSubmit(e){
    e.preventDefault();
    const updated = {
      name: editedName,
      category: editedCategory,
      targetAmount: Number(editedTarget),
      deadline: editedDeadline,
    }
  handleUpdateGoal(goal.id, updated);
  setIsEditing(false)
  }
  return (
    <div className="goal-card">
      {isEditing ? (
        <form onSubmit={handleEditSubmit}>
          <input type="text" value={editedName} onChange={(e) => setEditedName(e.target.value)} required />
          <input type="text" value={editedCategory} onChange={(e) => setEditedCategory(e.target.value)} required />
          <input type="number" value={editedTarget} onChange={(e) => setEditedTarget(e.target.value)} required />
           <input type="date" value={editedDeadline} onChange={(e) => setEditedDeadline(e.target.value)} required />
           <button type="submit">Save</button>
           <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
        </form>
      ): (
        <>
        <h2>{goal.name}</h2>
          <p><strong>Category:</strong> {goal.category}</p>
          <p><strong>Target:</strong> ${goal.targetAmount}</p>
          <p><strong>Saved:</strong> ${goal.savedAmount}</p>
          <p><strong>Deadline:</strong> {goal.deadline}</p>
          {isCompleted && <p style={{ color: 'green' }}>✅ Goal Completed</p>}
          {isClose && <p style={{ color: 'orange' }}>⚠️ Deadline within {daysRemaining} days</p>}
          {isOverdue && <p style={{ color: 'red' }}>❌ Overdue</p>}
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }}></div>
          </div>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={() => handleDeleteGoal(goal.id)}>Delete</button>
        </>
      )}
    </div>
  );    
}
export default GoalCard
