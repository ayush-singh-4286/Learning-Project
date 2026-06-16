import React, { useState, useEffect } from 'react';
// import axios from 'ajax';
import axios from 'axios';
import TaskCard from './components/TaskCard';

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(true);
  
  // Navigation State: 'home', 'all', 'active', or 'completed'
  const [currentView, setCurrentView] = useState('home');
  // Tracks if the mouse is hovering over the "Your Tasks" nav item
  const [isHovered, setIsHovered] = useState(false);

  const API_URL = "https://learning-project-backend-03x3.onrender.com/notes";

  // Modernized theme styles matching high-end UI/UX standards
  const theme = {
    bg: isDarkMode ? '#0a0a0a' : '#f4f4f5',
    cardBg: isDarkMode ? '#121212' : '#ffffff',
    text: isDarkMode ? '#ffffff' : '#09090b',
    subText: isDarkMode ? '#a1a1aa' : '#71717a',
    border: isDarkMode ? '#27272a' : '#e4e4e7',
    inputBg: isDarkMode ? '#1e1e1e' : '#f4f4f5', 
    accent: '#3b82f6',
    dropdownBg: isDarkMode ? '#1a1a1a' : '#ffffff'
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(API_URL);
      if (response.data && response.data.notes) {
        setTasks(response.data.notes);
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    try {
      await axios.post(API_URL, { title, description, completed: false });
      setTitle('');
      setDescription('');
      fetchTasks();
      setCurrentView('all'); // Automatically navigate to view tasks after creating
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const handleToggleComplete = async (id, currentStatus) => {
    try {
      await axios.patch(`${API_URL}/${id}`, { completed: !currentStatus });
      fetchTasks();
    } catch (error) {
      console.error("Error toggling status:", error);
    }
  };

  const handleEditTask = async (id, updatedTitle, updatedDescription) => {
    try {
      await axios.patch(`${API_URL}/${id}`, { title: updatedTitle, description: updatedDescription });
      fetchTasks();
    } catch (error) {
      console.error("Error updating text:", error);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchTasks(); // Reloads component state instantly after MongoDB operation
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  // Filter lists ready for display mapping
  const activeTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);

  return (
    <>
      <style>
        {`
          html, body {
            margin: 0;
            padding: 0;
            overflow-x: hidden;
            background-color: #0a0a0a; 
          }
          
          ::-webkit-scrollbar {
            width: 8px;
          }
          ::-webkit-scrollbar-track {
            background: #0a0a0a;
          }
          ::-webkit-scrollbar-thumb {
            background: ${isDarkMode ? '#27272a' : '#d4d4d8'};
            border-radius: 4px;
          }
        `}
      </style>

      <div style={{
       // ✅ FIXED LOGIC (Har mode par image load hogi)
    backgroundImage: `url('/bg.png')`,
        backgroundColor: theme.bg,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed', 
        minHeight: '100vh',
        width: '100vw',
        color: theme.text,
        fontFamily: 'system-ui, -apple-system, sans-serif',
        transition: 'all 0.3s ease',
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box'
      }}>
        
        {/* --- PREMIUM NAVIGATION BAR --- */}
        <nav style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '16px 40px',
          borderBottom: `1px solid ${theme.border}`,
          backgroundColor: isDarkMode ? 'rgba(18, 18, 18, 0.8)' : theme.cardBg, 
          backdropFilter: isDarkMode ? 'blur(12px)' : 'none',
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
          width: '100%',
          boxSizing: 'border-box',
          zIndex: 10
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', cursor: 'pointer' }} onClick={() => setCurrentView('home')}>
              <span style={{ fontWeight: '800', fontSize: '1.4rem', color: theme.accent, letterSpacing: '-0.5px' }}>
                Notesify
              </span>
              <span style={{ fontSize: '0.65rem', color: theme.subText, letterSpacing: '1px', textTransform: 'uppercase', marginTop: '-2px' }}>
                
              </span>
            </div>
            
            <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
              <button 
                onClick={() => setCurrentView('home')}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: currentView === 'home' ? theme.accent : theme.text,
                  fontWeight: currentView === 'home' ? '700' : '500',
                  fontSize: '1rem',
                  cursor: 'pointer'
                }}
              >
                Home
              </button>

              <div 
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                style={{ position: 'relative', display: 'inline-block' }}
              >
                <button 
                  onClick={() => setCurrentView('all')}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: currentView !== 'home' ? theme.accent : theme.text,
                    fontWeight: currentView !== 'home' ? '700' : '500',
                    fontSize: '1rem',
                    cursor: 'pointer',
                    paddingBottom: '8px'
                  }}
                >
                  Your Tasks ▾
                </button>

                {isHovered && (
                  <div style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    backgroundColor: theme.dropdownBg,
                    border: `1px solid ${theme.border}`,
                    borderRadius: '12px',
                    boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)',
                    padding: '8px 0',
                    zIndex: 100,
                    minWidth: '160px',
                    display: 'flex',
                    flexDirection: 'column'
                  }}>
                    <button 
                      onClick={() => { setCurrentView('all'); setIsHovered(false); }}
                      style={{ background: 'transparent', border: 'none', padding: '10px 16px', textAlign: 'left', color: theme.text, cursor: 'pointer', width: '100%', fontSize: '0.95rem' }}
                      onMouseEnter={(e) => e.target.style.background = theme.border}
                      onMouseLeave={(e) => e.target.style.background = 'transparent'}
                    >
                      📂 All Tasks ({tasks.length})
                    </button>
                    <button 
                      onClick={() => { setCurrentView('active'); setIsHovered(false); }}
                      style={{ background: 'transparent', border: 'none', padding: '10px 16px', textAlign: 'left', color: theme.text, cursor: 'pointer', width: '100%', fontSize: '0.95rem' }}
                      onMouseEnter={(e) => e.target.style.background = theme.border}
                      onMouseLeave={(e) => e.target.style.background = 'transparent'}
                    >
                      ⏳ Incompleted ({activeTasks.length})
                    </button>
                    <button 
                      onClick={() => { setCurrentView('completed'); setIsHovered(false); }}
                      style={{ background: 'transparent', border: 'none', padding: '10px 16px', textAlign: 'left', color: theme.text, cursor: 'pointer', width: '100%', fontSize: '0.95rem' }}
                      onMouseEnter={(e) => e.target.style.background = theme.border}
                      onMouseLeave={(e) => e.target.style.background = 'transparent'}
                    >
                      ✅ Completed ({completedTasks.length})
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <button 
            onClick={() => setIsDarkMode(!isDarkMode)}
            style={{
              padding: '8px 16px',
              borderRadius: '20px',
              border: `1px solid ${theme.border}`,
              backgroundColor: theme.bg,
              color: theme.text,
              cursor: 'pointer',
              fontWeight: '600'
            }}
          >
            {isDarkMode ? '☀️ Light' : '🌙 Dark'}
          </button>
        </nav>

        {/* --- WEB APPLICATION BODY CONTENT --- */}
        <div style={{ padding: '40px 20px', display: 'flex', justifyContent: 'center', flex: 1, zIndex: 1 }}>
          <div style={{
            width: '100%',
            maxWidth: '650px',
            border: `1px solid ${theme.border}`,
            borderRadius: '24px',
            padding: '32px',
            backgroundColor: isDarkMode ? 'rgba(18, 18, 18, 0.45)' : theme.cardBg, 
            backdropFilter: isDarkMode ? 'blur(16px)' : 'none', 
            boxShadow: '0 20px 40px -15px rgba(0,0,0,0.3)',
            alignSelf: 'flex-start'
          }}>
            
            {currentView === 'home' && (
              <div>
                <h1 style={{ fontSize: '1.8rem', fontWeight: '700', marginBottom: '8px', textAlign: 'center', color: theme.text }}>
                  Create a Note
                </h1>
                <p style={{ color: theme.subText, textAlign: 'center', marginBottom: '24px' }}>Fill out the panels below to add objects dynamically to MongoDB.</p>
                
                <form onSubmit={handleAddTask} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <input 
                    type="text" 
                    placeholder="Note Title..." 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    style={{ padding: '14px 18px', borderRadius: '14px', border: `1px solid ${theme.border}`, backgroundColor: theme.inputBg, color: theme.text, fontSize: '1rem', outline: 'none' }}
                  />
                  <textarea 
                    placeholder="Type out description specifications..." 
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows="4"
                    style={{ padding: '14px 18px', borderRadius: '14px', border: `1px solid ${theme.border}`, backgroundColor: theme.inputBg, color: theme.text, fontSize: '1rem', outline: 'none', resize: 'vertical' }}
                  />
                  <button type="submit" style={{ padding: '14px', borderRadius: '14px', border: 'none', backgroundColor: theme.accent, color: '#ffffff', fontSize: '1rem', fontWeight: '700', cursor: 'pointer', boxShadow: '0 4px 12px rgba(59,130,246,0.3)' }}>
                    🚀 Save Note to DB
                  </button>
                </form>
              </div>
            )}

            {currentView !== 'home' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <h2 style={{ fontSize: '1.6rem', fontWeight: '700' }}>
                    {currentView === 'all' && 'All Saved Tasks'}
                    {currentView === 'active' && '⏳ Incompleted Tasks'}
                    {currentView === 'completed' && '✅ Completed Tasks'}
                  </h2>
                  <button onClick={() => setCurrentView('home')} style={{ background: 'transparent', border: 'none', color: theme.accent, cursor: 'pointer', fontWeight: '600' }}>
                    + Add More
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  {(currentView === 'all' || currentView === 'active') && (
                    <div>
                      {currentView === 'all' && <h4 style={{ color: theme.subText, margin: '10px 0' }}>Incompleted List ({activeTasks.length})</h4>}
                      {activeTasks.length > 0 ? (
                        activeTasks.map((task) => (
                          <TaskCard key={task._id} task={task} theme={theme} onToggleComplete={handleToggleComplete} onEditTask={handleEditTask} onDeleteTask={handleDeleteTask} />
                        ))
                      ) : (
                        <p style={{ color: theme.subText, fontStyle: 'italic', padding: '10px 0' }}>No incomplete items.</p>
                      )}
                    </div>
                  )}

                  {currentView === 'all' && <hr style={{ border: '0', borderTop: `1px solid ${theme.border}`, margin: '24px 0' }} />}

                  {(currentView === 'all' || currentView === 'completed') && (
                    <div>
                      {currentView === 'all' && <h4 style={{ color: '#22c55e', margin: '10px 0' }}>Completed List ({completedTasks.length})</h4>}
                      {completedTasks.length > 0 ? (
                        completedTasks.map((task) => (
                          <TaskCard key={task._id} task={task} theme={theme} onToggleComplete={handleToggleComplete} onEditTask={handleEditTask} onDeleteTask={handleDeleteTask} />
                        ))
                      ) : (
                        <p style={{ color: theme.subText, fontStyle: 'italic', padding: '10px 0' }}>No completed items yet.</p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </>
  );
}

export default App;