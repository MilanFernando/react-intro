import { useEffect, useState } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

function User() {
    const [user, setUser] = useState(null); // To store the data from the server
    const [username, setUsername] = useState(""); // To store the data from the input field
    const [password, setPassword] = useState(""); // To store the data from the input field
    const [email, setEmail] = useState(""); // To store the data from the input field
    const [edit, setEdit] = useState(null);


    function getUser() { // Function to get the data from the server
        axios.get("http://localhost:8080/users") // Get data from the server
            .then(function (response) {
                setUser(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    useEffect(() => {
        axios.get("http://localhost:8080/users") // Get data from the server
        .then(function (response) {
            setUser(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
    })

    function handleUserName(event) { // Function to store the data from the input field
        setUsername(event.target.value);
    }

    function handlePassword(event) { // Function to store the data from the input field
        setPassword(event.target.value);
    }

    function handleEmail(event) { // Function to store the data from the input field
        setEmail(event.target.value);
    }

    function createUser(event) {
        event.preventDefault(); // To prevent the page from refreshing

        const data = { // Data to be sent to the server
            username: username,
            password: password,
            email: email,
        };

        axios.post("http://localhost:8080/users", data) // Send data to the server
            .then(function (response) { // If the data is sent successfully
                getUser();
                console.log(response);
            })
            .catch(function (error) { // If the data is not sent successfully
                console.log(error);
            });
    }

    function updateUser(event) { // Corrected typo from "uodateUser" to "updateUser"
        event.preventDefault(); // To prevent the page from refreshing

        const data = {
            username: username,
            password: password,
            email: email,
        };

        axios.put("http://localhost:8080/users/" + edit, data) // Send data to the server
            .then(function (response) { // If the data is sent successfully
                getUser();
                setEdit(null);
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <div className="App">
            <button type="button" onClick={getUser}>Get User</button>
            {user && user.map((row) => ( // To display the data from the server
                <div key={row.id}>
                    {row.username} - {row.email}

                    <button type="button" onClick={() => {
                        setEdit(row.id);
                        setUsername(row.username);
                        setEmail(row.email);
                    }

                    }>Edit</button>

                    <button type="button" onClick={() => {// To delete the data from the server.
                        axios.delete("http://localhost:8080/users/" + row.id)
                            .then(function () {
                                getUser();
                            })
                            .catch(function (error) {
                                console.log(error);
                            });
                    }}>Delete</button>
                    
                </div>
            ))}
            {!edit &&
                <div>
                    <h2>Create User</h2>

                    <form onSubmit={createUser}>
                        <div>
                            <label>Username</label>
                            <input type='text' name='username' onChange={handleUserName} required />
                        </div>
                        <div>
                            <label>Password</label>
                            <input type='text' name='password' onChange={handlePassword} required />
                        </div>
                        <div>
                            <label>Email</label>
                            <input type='text' name='email' onChange={handleEmail} required />
                        </div>
                        <button type='submit'>Create User</button>
                    </form>
                </div>}
            {edit && (
                <div>
                    <h2>Edit User</h2>

                    <form onSubmit={updateUser}>
                        <div>
                            <label>Username</label>
                            <input type='text' name='username' onChange={handleUserName} value={username} required />
                        </div>
                        <div>
                            <label>Password</label>
                            <input type='text' name='password' onChange={handlePassword} required />
                        </div>
                        <div>
                            <label>Email</label>
                            <input type='text' name='email' onChange={handleEmail} value={email} required />
                        </div>
                        <button type='submit'>Update User</button>
                        <button type='button' onClick={() => setEdit(null)}>Cancel</button>
                    </form>
                </div>
            )}
            <Link to ="/">Home</Link>
        </div>
    );

}


export default User; // To export the User component