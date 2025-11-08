import { useState } from 'react'
import ListProfiles from './components/ListProfiles'
import AddProfileForm from './components/AddProfileForm'
import './App.css'

function App() {
  const [showAddForm, setShowAddForm] = useState(false)
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  const handleAddSuccess = () => {
    // Refresh the list after adding a new profile
    setRefreshTrigger(prev => prev + 1)
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Quản lý hồ sơ công việc</h1>
        <button
          onClick={() => setShowAddForm(true)}
          className="add-profile-btn"
        >
          Thêm hồ sơ
        </button>
      </header>

      <main className="app-main">
        <ListProfiles key={refreshTrigger} />
      </main>

      {showAddForm && (
        <AddProfileForm
          onClose={() => setShowAddForm(false)}
          onSuccess={handleAddSuccess}
        />
      )}
    </div>
  )
}

export default App
