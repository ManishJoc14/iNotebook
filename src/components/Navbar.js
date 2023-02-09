//import react arrowfunction and export using rafce
import React, { useRef } from 'react'
import { Link, useLocation, useNavigation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    let navigate = useNavigate();
    let location = useLocation();
    const refCloseHamB = useRef(null);
    const closeHamB=(e)=>{
        refCloseHamB.current.click();
        if(e.target.innerText==='LogOut'){
            localStorage.removeItem('token');
            navigate('/login')
        }
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">iNotebook</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span ref={refCloseHamB} className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item"onClick={closeHamB}>
                            <Link className={`nav-link ${location.pathname==="/"?"active":""}`} aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item"onClick={closeHamB}>
                                <Link className={`nav-link ${location.pathname==="/about"?"active":""}`} to="/about">About</Link>
                            </li>

                        </ul>
                      {!localStorage.getItem('token')?<form className="d-flex" role="search">
                            <Link to='/login' onClick={closeHamB} className="btn btn-primary mx-1">LogIn</Link>
                            <Link to='/signup' onClick={closeHamB} className="btn btn-primary mx-1">SignUp</Link>
                        </form>: <a onClick={closeHamB} className="btn btn-primary mx-1">LogOut</a> }
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar