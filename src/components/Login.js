import React from 'react'
import { useNavigate } from 'react-router-dom';
const Login = (props) => {
  let navigate = useNavigate();

    const handleSubmit = async (e)=>{
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers :{
              'Content-Type': 'application/json'
            },
            body:JSON.stringify({email,password})
          });
        const json = await response.json();
        console.log(json);
        if(json.success){
            localStorage.setItem('token',json.authToken);
            props.showAlert(`login Successful: Welcome ${json.name} to your iNotebook `,'success')
            navigate('/');

        }else{
          props.showAlert(`login failed: ${json.error} `,'danger')
            // alert(json.error)
        }
    }
  return (
    <>
    <h2 className='mb-4'>LogIn to continue to iNotebook</h2>
    <form onSubmit={handleSubmit} autoComplete="on">
     <div className="mb-3">
      <label htmlFor="email" className="form-label"autoComplete='email'>Email address</label>
      <input required type="email" className="form-control" id="email" aria-describedby="emailHelp"/>
      <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
    </div>
    <div className="mb-3">
      <label htmlFor="password" className="form-label">Password</label>
      <input required type="password"min={5} className="form-control" id="password"/>
    </div>
    <button type="submit" className="btn btn-primary">Submit</button>
  </form>
  </>
  )
}

export default Login