# ⚡ CHALLENGE PROJECT: COMPLETE INTERACTIVE APP WITH EVENTS

## 🎯 TÓM TẮT NHANH (2 phút đọc)

### **Challenge Requirements:**
- ✅ **Complete Interactive App** với multiple features
- ✅ **Complex Event Handling** patterns
- ✅ **State Management** across components
- ✅ **User Experience** tối ưu
- ✅ **No External Libraries** (pure React)

**App Concept: Task Management Dashboard**

---

## 🔥 CHALLENGE IMPLEMENTATION

### **1. App Overview & Features:**

```jsx
// Main App Component
function TaskManager() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all'); // 'all', 'active', 'completed'
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('created'); // 'created', 'priority', 'dueDate'
  const [viewMode, setViewMode] = useState('list'); // 'list', 'grid', 'calendar'
  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Load tasks from localStorage on mount
  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Event handlers
  const addTask = (taskData) => {
    const newTask = {
      id: Date.now(),
      ...taskData,
      createdAt: new Date(),
      completed: false
    };
    setTasks(prev => [...prev, newTask]);
  };

  const updateTask = (taskId, updates) => {
    setTasks(prev => prev.map(task =>
      task.id === taskId ? { ...task, ...updates } : task
    ));
  };

  const deleteTask = (taskId) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
  };

  const toggleTask = (taskId) => {
    setTasks(prev => prev.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  // Filtered and sorted tasks
  const filteredTasks = useMemo(() => {
    let filtered = tasks;

    // Filter by status
    if (filter === 'active') {
      filtered = filtered.filter(task => !task.completed);
    } else if (filter === 'completed') {
      filtered = filtered.filter(task => task.completed);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'priority':
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        case 'dueDate':
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return new Date(a.dueDate) - new Date(b.dueDate);
        case 'created':
        default:
          return new Date(b.createdAt) - new Date(a.createdAt);
      }
    });

    return filtered;
  }, [tasks, filter, searchTerm, sortBy]);

  // Statistics
  const stats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter(task => task.completed).length;
    const active = total - completed;
    const overdue = tasks.filter(task =>
      task.dueDate && new Date(task.dueDate) < new Date() && !task.completed
    ).length;

    return { total, completed, active, overdue };
  }, [tasks]);

  return (
    <div className="task-manager">
      <Header
        stats={stats}
        onAddTask={() => setIsModalOpen(true)}
      />

      <Controls
        filter={filter}
        onFilterChange={setFilter}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        sortBy={sortBy}
        onSortChange={setSortBy}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />

      <TaskList
        tasks={filteredTasks}
        viewMode={viewMode}
        onToggleTask={toggleTask}
        onEditTask={(task) => {
          setSelectedTask(task);
          setIsModalOpen(true);
        }}
        onDeleteTask={deleteTask}
      />

      {isModalOpen && (
        <TaskModal
          task={selectedTask}
          onSave={(taskData) => {
            if (selectedTask) {
              updateTask(selectedTask.id, taskData);
            } else {
              addTask(taskData);
            }
            setIsModalOpen(false);
            setSelectedTask(null);
          }}
          onCancel={() => {
            setIsModalOpen(false);
            setSelectedTask(null);
          }}
        />
      )}
    </div>
  );
}
```

### **2. Header Component:**

```jsx
function Header({ stats, onAddTask }) {
  return (
    <header className="app-header">
      <div className="header-content">
        <div className="header-left">
          <h1>Task Manager</h1>
          <div className="stats">
            <span className="stat-item">
              Total: <strong>{stats.total}</strong>
            </span>
            <span className="stat-item">
              Active: <strong>{stats.active}</strong>
            </span>
            <span className="stat-item">
              Completed: <strong>{stats.completed}</strong>
            </span>
            {stats.overdue > 0 && (
              <span className="stat-item overdue">
                Overdue: <strong>{stats.overdue}</strong>
              </span>
            )}
          </div>
        </div>

        <div className="header-right">
          <button
            className="btn-primary"
            onClick={onAddTask}
          >
            + Add Task
          </button>
        </div>
      </div>
    </header>
  );
}
```

### **3. Controls Component:**

```jsx
function Controls({
  filter,
  onFilterChange,
  searchTerm,
  onSearchChange,
  sortBy,
  onSortChange,
  viewMode,
  onViewModeChange
}) {
  return (
    <div className="controls">
      {/* Search */}
      <div className="search-box">
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        <span className="search-icon">🔍</span>
      </div>

      {/* Filters */}
      <div className="filter-group">
        <label>Filter:</label>
        <select value={filter} onChange={(e) => onFilterChange(e.target.value)}>
          <option value="all">All Tasks</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      {/* Sort */}
      <div className="filter-group">
        <label>Sort by:</label>
        <select value={sortBy} onChange={(e) => onSortChange(e.target.value)}>
          <option value="created">Created Date</option>
          <option value="priority">Priority</option>
          <option value="dueDate">Due Date</option>
        </select>
      </div>

      {/* View Mode */}
      <div className="view-modes">
        <button
          className={viewMode === 'list' ? 'active' : ''}
          onClick={() => onViewModeChange('list')}
        >
          📋 List
        </button>
        <button
          className={viewMode === 'grid' ? 'active' : ''}
          onClick={() => onViewModeChange('grid')}
        >
          ⊞ Grid
        </button>
        <button
          className={viewMode === 'calendar' ? 'active' : ''}
          onClick={() => onViewModeChange('calendar')}
        >
          📅 Calendar
        </button>
      </div>
    </div>
  );
}
```

### **4. TaskList Component:**

```jsx
function TaskList({ tasks, viewMode, onToggleTask, onEditTask, onDeleteTask }) {
  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">📝</div>
        <h3>No tasks found</h3>
        <p>Create your first task to get started!</p>
      </div>
    );
  }

  if (viewMode === 'grid') {
    return (
      <div className="task-grid">
        {tasks.map(task => (
          <TaskCard
            key={task.id}
            task={task}
            onToggle={() => onToggleTask(task.id)}
            onEdit={() => onEditTask(task)}
            onDelete={() => onDeleteTask(task.id)}
          />
        ))}
      </div>
    );
  }

  if (viewMode === 'calendar') {
    return <CalendarView tasks={tasks} />;
  }

  // Default list view
  return (
    <div className="task-list">
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={() => onToggleTask(task.id)}
          onEdit={() => onEditTask(task)}
          onDelete={() => onDeleteTask(task.id)}
        />
      ))}
    </div>
  );
}
```

### **5. TaskItem Component:**

```jsx
function TaskItem({ task, onToggle, onEdit, onDelete }) {
  const [showActions, setShowActions] = useState(false);

  const isOverdue = task.dueDate &&
    new Date(task.dueDate) < new Date() &&
    !task.completed;

  const priorityColors = {
    high: '#dc3545',
    medium: '#ffc107',
    low: '#28a745'
  };

  return (
    <div
      className={`task-item ${task.completed ? 'completed' : ''} ${isOverdue ? 'overdue' : ''}`}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <div className="task-content">
        <div className="task-main">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={onToggle}
            className="task-checkbox"
          />

          <div className="task-details">
            <h4 className={task.completed ? 'completed-text' : ''}>
              {task.title}
            </h4>
            {task.description && (
              <p className="task-description">{task.description}</p>
            )}

            <div className="task-meta">
              <span
                className="priority-badge"
                style={{ backgroundColor: priorityColors[task.priority] }}
              >
                {task.priority.toUpperCase()}
              </span>

              {task.dueDate && (
                <span className={`due-date ${isOverdue ? 'overdue' : ''}`}>
                  📅 {new Date(task.dueDate).toLocaleDateString()}
                </span>
              )}

              <span className="created-date">
                Created: {new Date(task.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>

        {showActions && (
          <div className="task-actions">
            <button onClick={onEdit} className="btn-edit">
              ✏️ Edit
            </button>
            <button onClick={onDelete} className="btn-delete">
              🗑️ Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
```

### **6. TaskModal Component:**

```jsx
function TaskModal({ task, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    title: task?.title || '',
    description: task?.description || '',
    priority: task?.priority || 'medium',
    dueDate: task?.dueDate ? task.dueDate.split('T')[0] : ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    onSave(formData);
  };

  const handleChange = (field) => (e) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onCancel();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onCancel]);

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{task ? 'Edit Task' : 'Add New Task'}</h2>
          <button onClick={onCancel} className="modal-close">
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="task-form">
          <div className="form-group">
            <label>Title *</label>
            <input
              type="text"
              value={formData.title}
              onChange={handleChange('title')}
              placeholder="Enter task title..."
              required
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              value={formData.description}
              onChange={handleChange('description')}
              placeholder="Enter task description..."
              rows={3}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Priority</label>
              <select
                value={formData.priority}
                onChange={handleChange('priority')}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div className="form-group">
              <label>Due Date</label>
              <input
                type="date"
                value={formData.dueDate}
                onChange={handleChange('dueDate')}
              />
            </div>
          </div>

          <div className="modal-actions">
            <button type="button" onClick={onCancel} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              {task ? 'Update Task' : 'Add Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
```

### **7. Additional Components (CalendarView, TaskCard):**

```jsx
function CalendarView({ tasks }) {
  // Simplified calendar implementation
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  // Group tasks by date
  const tasksByDate = useMemo(() => {
    const grouped = {};
    tasks.forEach(task => {
      if (task.dueDate) {
        const dateKey = new Date(task.dueDate).toDateString();
        if (!grouped[dateKey]) grouped[dateKey] = [];
        grouped[dateKey].push(task);
      }
    });
    return grouped;
  }, [tasks]);

  return (
    <div className="calendar-view">
      <h3>{today.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</h3>
      <div className="calendar-grid">
        {/* Calendar implementation would go here */}
        <div className="calendar-placeholder">
          <p>Calendar view implementation</p>
          <p>Tasks grouped by due date: {Object.keys(tasksByDate).length} dates</p>
        </div>
      </div>
    </div>
  );
}

function TaskCard({ task, onToggle, onEdit, onDelete }) {
  return (
    <div className={`task-card ${task.completed ? 'completed' : ''}`}>
      <div className="card-header">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={onToggle}
        />
        <span className={`priority-dot priority-${task.priority}`}></span>
      </div>

      <div className="card-content">
        <h4>{task.title}</h4>
        {task.description && <p>{task.description}</p>}
      </div>

      <div className="card-actions">
        <button onClick={onEdit}>Edit</button>
        <button onClick={onDelete}>Delete</button>
      </div>
    </div>
  );
}
```

---

## 🔥 STYLING (CSS-in-JS approach)

```jsx
// Add this style block to the main component
<style jsx>{`
  .task-manager {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }

  .app-header {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 24px;
    border-radius: 12px;
    margin-bottom: 24px;
  }

  .header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .stats {
    display: flex;
    gap: 20px;
    margin-top: 8px;
  }

  .stat-item {
    font-size: 14px;
  }

  .stat-item.overdue {
    color: #ff6b6b;
  }

  .btn-primary {
    background: #28a745;
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: 6px;
    cursor: pointer;
    font-weight: 600;
  }

  .controls {
    display: flex;
    gap: 16px;
    margin-bottom: 24px;
    align-items: center;
    flex-wrap: wrap;
  }

  .search-box {
    position: relative;
    flex: 1;
    min-width: 200px;
  }

  .search-box input {
    width: 100%;
    padding: 12px 40px 12px 16px;
    border: 1px solid #ddd;
    border-radius: 6px;
    font-size: 16px;
  }

  .search-icon {
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: #666;
  }

  .filter-group {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .filter-group select {
    padding: 8px 12px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }

  .view-modes {
    display: flex;
    gap: 8px;
  }

  .view-modes button {
    padding: 8px 16px;
    border: 1px solid #ddd;
    background: white;
    border-radius: 4px;
    cursor: pointer;
  }

  .view-modes button.active {
    background: #007bff;
    color: white;
    border-color: #007bff;
  }

  .task-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .task-item {
    background: white;
    border: 1px solid #e9ecef;
    border-radius: 8px;
    padding: 16px;
    transition: all 0.2s;
  }

  .task-item:hover {
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    border-color: #007bff;
  }

  .task-item.completed {
    opacity: 0.6;
  }

  .task-item.overdue {
    border-color: #dc3545;
    background: #fff5f5;
  }

  .task-content {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }

  .task-checkbox {
    margin-right: 12px;
    transform: scale(1.2);
  }

  .task-details {
    flex: 1;
  }

  .task-details h4 {
    margin: 0 0 8px 0;
    font-size: 18px;
  }

  .completed-text {
    text-decoration: line-through;
    color: #6c757d;
  }

  .task-description {
    margin: 0 0 12px 0;
    color: #6c757d;
  }

  .task-meta {
    display: flex;
    gap: 16px;
    font-size: 14px;
    color: #6c757d;
  }

  .priority-badge {
    color: white;
    padding: 2px 8px;
    border-radius: 12px;
    font-size: 12px;
    font-weight: 600;
  }

  .due-date.overdue {
    color: #dc3545;
    font-weight: 600;
  }

  .task-actions {
    display: flex;
    gap: 8px;
  }

  .btn-edit, .btn-delete {
    padding: 6px 12px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
  }

  .btn-edit {
    background: #ffc107;
    color: #212529;
  }

  .btn-delete {
    background: #dc3545;
    color: white;
  }

  .empty-state {
    text-align: center;
    padding: 60px 20px;
    color: #6c757d;
  }

  .empty-icon {
    font-size: 64px;
    margin-bottom: 16px;
  }

  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }

  .modal-content {
    background: white;
    border-radius: 12px;
    padding: 0;
    max-width: 500px;
    width: 90%;
    max-height: 90vh;
    overflow-y: auto;
  }

  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 24px;
    border-bottom: 1px solid #e9ecef;
  }

  .modal-close {
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    color: #6c757d;
  }

  .task-form {
    padding: 24px;
  }

  .form-group {
    margin-bottom: 16px;
  }

  .form-group label {
    display: block;
    margin-bottom: 4px;
    font-weight: 600;
    color: #495057;
  }

  .form-group input,
  .form-group select,
  .form-group textarea {
    width: 100%;
    padding: 8px 12px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 16px;
  }

  .form-row {
    display: flex;
    gap: 16px;
  }

  .form-row .form-group {
    flex: 1;
  }

  .modal-actions {
    display: flex;
    gap: 12px;
    justify-content: flex-end;
    margin-top: 24px;
  }

  .btn-secondary {
    background: #6c757d;
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: 6px;
    cursor: pointer;
  }

  @media (max-width: 768px) {
    .header-content {
      flex-direction: column;
      gap: 16px;
      text-align: center;
    }

    .controls {
      flex-direction: column;
      align-items: stretch;
    }

    .task-content {
      flex-direction: column;
      gap: 12px;
    }

    .modal-actions {
      flex-direction: column;
    }

    .form-row {
      flex-direction: column;
    }
  }
`}</style>
```

---

## 📊 CHALLENGE FEATURES IMPLEMENTED

| Feature | Implementation | Events Used | State Management |
|---------|----------------|-------------|------------------|
| **Task CRUD** | Add, edit, delete tasks | onClick, onSubmit | useState array |
| **Filtering** | Status, search, sort | onChange | useMemo filtering |
| **Multiple Views** | List, grid, calendar | onClick | viewMode state |
| **Modal Forms** | Add/edit task modal | onSubmit, onKeyDown | Modal state |
| **Local Storage** | Persist tasks | useEffect | localStorage API |
| **Statistics** | Task counts, overdue | - | useMemo calculations |
| **Responsive** | Mobile-friendly | - | CSS media queries |
| **Keyboard Support** | Escape to close modal | onKeyDown | Global event listeners |

---

## ✅ CHALLENGE COMPLETION CHECKLIST

- [ ] Complete task management system (CRUD operations)
- [ ] Multiple view modes (list, grid, calendar placeholder)
- [ ] Advanced filtering and sorting
- [ ] Search functionality
- [ ] Modal-based forms with validation
- [ ] Local storage persistence
- [ ] Statistics dashboard
- [ ] Responsive design
- [ ] Keyboard shortcuts and accessibility
- [ ] Error handling and edge cases
- [ ] Clean, maintainable code structure
- [ ] Performance optimizations (useMemo, useCallback)

---

## 🎯 ADVANCED EXTENSIONS

**Phase 2 Enhancements:**
1. **Drag & Drop** reordering
2. **Categories/Tags** system
3. **Subtasks** functionality
4. **Time tracking** per task
5. **File attachments**
6. **Email notifications** for due dates
7. **Data export/import**
8. **Offline support** with Service Workers

**Phase 3: Real-time Features:**
1. **WebSocket integration** for live updates
2. **User authentication**
3. **Team collaboration** features
4. **Real-time notifications**
5. **Audit logs** for task changes

**Code này tạo nên một complete task management application với:**
- Complex event handling across multiple components
- Advanced state management patterns
- User experience optimizations
- Production-ready code quality
- Scalable architecture for future enhancements