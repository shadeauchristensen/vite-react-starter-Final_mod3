import React from 'react'
import { Routes, Route } from 'react-router-dom'
import ScheduleList from './components/ScheduleList'
import ScheduleDetail from './components/ScheduleDetail'
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<ScheduleList /> } />
      <Route path="/schedules/:id" element={<ScheduleDetail /> } />
    </Routes>
  )
}

export default App