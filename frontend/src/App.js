import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar/>
      <div className="pages"> 
        <Routes>
          {/* homw will be rendered at / */}
          <Route path="/" element={<Home/>}>
            
          </Route>
        </Routes>
      </div>

      </BrowserRouter>
      
    </div>
  );
}

export default App;
