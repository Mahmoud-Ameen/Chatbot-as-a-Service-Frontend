import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import ChatPage from "./Pages/ChatPage/ChatPage";

const App:React.FC = () => {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/chat" Component={ChatPage} />
      </Routes>
    </Router>
    </>
  )
}

export default App