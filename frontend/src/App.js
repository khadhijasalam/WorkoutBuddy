
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar/>
      <div className="pages"> 
        <Routes>
          {/* home will be rendered at / */}
          <Route path="/" element={<Home/>}>
            
          </Route>
        
      
          <Route path="/login" element={<Login/>}>
            
          </Route>
                
          <Route path="/signup" element={<SignUp/>}>
            
          </Route>
        </Routes>
      </div>

      </BrowserRouter>
      
    </div>
  );
}

export default App;
