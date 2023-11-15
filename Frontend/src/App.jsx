import { useEffect, useState } from "react";
import "./App.css";
import { useNavigate } from "react-router-dom";

function App() {
  
  const navigate = useNavigate();

  function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState({});

    async function login() {
      const payload = { username, password };
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json", },
        body: JSON.stringify(payload),
        credentials : 'include',
      });
      const data = await res.json();
      if (res.status == 200) {
        console.log(data.token);
        return navigate("/pengaduan");
      } if(res.status == 406){
        setErrorMsg(data)
      }
    }

    return (
      <>
        <p style={{ fontWeight: "bold", fontSize: "26px" }}>
          Login To Your Account
        </p>
        <div id="inputContainer">
          <label id="inputLabel" htmlFor="">
            Username
          </label>
          <input
            className="loginInput"
            type="text"
            onChange={(e) => setUsername(e.target.value)}
          ></input>
          <label id="inputLabel" htmlFor="">
            Password
          </label>
          <input
            className="loginInput"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          ></input>
            <p style={{color: "red", margin: 0}}>{errorMsg.msg}</p> 
          <button
            className="loginInput"
            id="loginButton"
            onClick={() => login()}
          >
            Login
          </button>
          <a href="/register">Don't have an account? Register</a>
        </div>
      </>
    );
  }
  return <div id="loginContainer"><Login /></div>;
}

export default App;
