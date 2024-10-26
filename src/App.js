import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import axios from 'axios';


function App() {

  const [user, setUser] = useState(null);//to store the data from the server
  const [username, setusername] = useState(" ");//to store the data from the input field
  const [password, setpassword] = useState(" ");//to store the data from the input field
  const [email, setemail] = useState(" ");//to store the data from the input field

  function getuser() {//function to get the data from the server
    axios.get("http://localhost:8080/users")//get data from the server
      .then(function (response) {
        setUser(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });

  }
  function hadleUserName(event) {//function to store the data from the input field
    setusername(event.target.value);
  }
  function hadlePassword(event) {//function to store the data from the input field
    setpassword(event.target.value);
  }
  function handleEmail(event) {//function to store the data from the input field
    setemail(event.target.value);
  }
  function createUser(event) {
    event.preventDefault();

      const data = {//data to be sent to the server
        username: username,
        password: password,
        email: email
      }
      axios.post("http://localhost:8080/users", data)//send data to the server
        .then(function (response) {//if the data is sent successfully
          getuser();
          console.log(response);
        })
        .catch(function (error) {//if the data is not sent successfully
          console.log(error);
        });
    }

  
  return (
    <div className="App">
      <button type="button" onClick={getuser}>getuser</button>
      {user && user.map((row) => (
        <div key={row.id}>
          {row.username}-{row.email}
        </div>
      ))}
      <h2>create User</h2>
      
      
      <form onSubmit={createUser}>
        <div>
          <label>user name</label>
          <input type='text' name='username' onChange={hadleUserName} required />
        </div>
        <div>
          <label>password</label>
          <input type='text' name='password' onChange={hadlePassword} required />
        </div>
        <div>
          <label>email</label>
          <input type='text' name='email' onChange={handleEmail} required />
        </div>
        <button type='submit'>create user</button>
      </form>
    </div>
  )
}

export default App;
