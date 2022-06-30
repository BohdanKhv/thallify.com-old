import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Callback, Home } from './pages/'
import AuthGate from './gates/AuthGate';


const App = () => {

  return (
    <div class="bg-gradient-to-r from-cyan-500 to-blue-500 min-h-screen text-white mx-auto p-4">
      <Router>
        <Routes>
          <Route path='/' element={<AuthGate><Home/></AuthGate>} />
          <Route path='/callback' element={<Callback/>} />
        </Routes>
      </Router>
    </div>
  );

}

export default App;