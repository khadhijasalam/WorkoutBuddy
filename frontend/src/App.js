
import {BrowserRouter,Routes,Route,Navigate} from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import { useAuthContext } from './hooks/useAuthContext'

function App() {
  const {user}=useAuthContext()
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar/>
      <div className="pages"> 
        <Routes>
          {/* home will be rendered at / */}
          <Route path="/" element={user?<Home/>:<Navigate to="/login"/>}>
            
          </Route>
        
      
          <Route path="/login" element={(!user)?<Login/>:<Navigate to="/"/>}>
            
          </Route>
                
          <Route path="/signup" element={(!user)?<SignUp/>:<Navigate to="/"/>}>
            
          </Route>
        </Routes>
      </div>

      </BrowserRouter>
      
    </div>
  );
}

export default App;
