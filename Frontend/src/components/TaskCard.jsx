import React, { useState } from 'react';

function TaskCard({ task, theme, onToggleComplete, onEditTask, onDeleteTask }) {
  const { _id, title, description, completed } = task;
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(title);
  const [editDesc, setEditDesc] = useState(description || '');

  const handleSave = () => {
    onEditTask(_id, editTitle, editDesc);
    setIsEditing(false);
  };

  return (
    <div 
      style={{
        border: completed ? '2px solid #22c55e' : `1px solid ${theme.border}`,
        backgroundColor: completed ? (theme.text === '#ffffff' ? '#14532d' : '#dcfce7') : theme.bg,
        color: theme.text,
        borderRadius: '16px',
        padding: '16px',
        margin: '12px 0',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        transition: 'all 0.25s ease'
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1, marginRight: '16px' }}>
        {isEditing ? (
          <>
            <input 
              type="text" 
              value={editTitle} 
              onChange={(e) => setEditTitle(e.target.value)}
              style={{ padding: '8px', borderRadius: '8px', border: '1px solid #3b82f6', background: theme.cardBg, color: theme.text }}
            />
            <input 
              type="text" 
              value={editDesc} 
              onChange={(e) => setEditDesc(e.target.value)}
              style={{ padding: '8px', borderRadius: '8px', border: '1px solid #3b82f6', background: theme.cardBg, color: theme.text, fontSize: '0.9rem' }}
            />
          </>
        ) : (
          <>
            <h3 style={{ 
              margin: 0, 
              fontSize: '1.1rem', 
              fontWeight: '600',
              textDecoration: completed ? 'line-through' : 'none',
              color: completed ? (theme.text === '#ffffff' ? '#bbf7d0' : '#166534') : theme.text
            }}>
              {title}
            </h3>
            {description && (
              <p style={{ 
                margin: 0, 
                fontSize: '0.9rem', 
                color: completed ? (theme.text === '#ffffff' ? '#a7f3d0' : '#16a34a') : theme.subText 
              }}>
                {description}
              </p>
            )}
          </>
        )}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        {isEditing ? (
          <button onClick={handleSave} style={{ background: '#22c55e', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>
            Save
          </button>
        ) : (
          !completed && (
            <button 
              onClick={() => setIsEditing(true)} 
              style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '1.1rem' }}
              title="Edit"
            >
              ✏️
            </button>
          )
        )}

        {/* --- FIXED: Added the visible Trash Icon here --- */}
        <button 
          onClick={() => {
            if(window.confirm("Are you sure you want to delete this task?")) {
              onDeleteTask(_id);
            }
          }} 
          style={{ 
            background: 'transparent', 
            border: 'none', 
            cursor: 'pointer', 
            fontSize: '1.2rem',
            padding: '5px'
          }}
          title="Delete Permanently"
        >
          🗑️
        </button>

        <button
          onClick={() => onToggleComplete(_id, completed)}
          style={{
            width: '26px',
            height: '26px',
            borderRadius: '50%',
            border: completed ? '2px solid #22c55e' : `2px solid ${theme.subText}`,
            backgroundColor: completed ? '#22c55e' : 'transparent',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 0
          }}
        >
          {completed && <span style={{ color: '#ffffff', fontSize: '12px', fontWeight: 'bold' }}>✓</span>}
        </button>
      </div>
    </div>
  );
}

export default TaskCard;