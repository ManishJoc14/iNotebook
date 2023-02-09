import React from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {
  let navigate = useNavigate();

    const handleSubmit = async (e)=>{
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        if(password===confirmPassword){
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: 'POST',
            headers :{
              'Content-Type': 'application/json'
            },
            body:JSON.stringify({name,email,password})
          });
        const json = await response.json();
        console.log(json);
        if(json.success){
            props.showAlert(`Account Created Successfully: Welcome ${json.name} to your iNotebook`,'success')
            localStorage.setItem('token',json.authToken);
            navigate('/');

        }else{
            props.showAlert(json.errors,'danger')
        }
      }else{
        props.showAlert("Password didn't match","danger")
      }

    }
  return (
    <>
    <h2 className='mb-4'>Create an account to use iNotebook</h2>
    <form onSubmit={handleSubmit} autoComplete="on">
      <div className="mb-3">
      <label htmlFor="name" className="form-label">Name</label>
      <input required type="text" minLength={3} className="form-control" id="name"/>
    </div>
    <div className="mb-3">
      <label htmlFor="email" className="form-label">Email address</label>
      <input required type="email" className="form-control" id="email" aria-describedby="emailHelp"/>
      <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
    </div>
    <div className="mb-3">
      <label htmlFor="password" className="form-label">Password</label>
      <input required type="password"minLength={5} className="form-control" id="password"/>
    </div>
    <div className="mb-3">
      <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
      <input required type="password"minLength={5} className="form-control" id="confirmPassword"/>
    </div>
    <button type="submit" className="btn btn-primary">Submit</button>
  </form>
  </>
  )
}

export default Signup