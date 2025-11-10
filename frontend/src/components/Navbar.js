import {Link} from 'react-router-dom'
import {useLogout} from '../hooks/useLogout'
import {useAuthContext} from '../hooks/useAuthContext'

const Navbar=()=>{
    const {user}=useAuthContext()
    const {logout} = useLogout()

    const handleClick = ()=>{
        logout()
        
    }

    return(
        <>
        <header>
            <div className="container">

                  <Link to="/" ><h1>Workout Buddy</h1> </Link>
                  
            <div>
                                <nav >
{ user? (
                <div>
                    <span>{user.email}</span>
                    <button onClick={handleClick}>
                        Logout
                    </button>
                </div>) : (
                    <>

                    <Link to="/login">Login</Link>

              
                    <Link to="/signup">SignUp</Link>
                    </>
                )}
                </nav>
            </div>
            </div>

          
            
        </header>
        </>
    )
}
export default Navbar
