import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
    const [nik, setNik] = useState("");
    const [nama, setName] = useState("");
    const [username, setUsername] = useState("");
    const [telp, setTelp] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPass] = useState("");
    const [errorMsg, setErrorMsg] = useState({});

    const navigate = useNavigate();


    async function register() {
      
        const payload = {nama, username, nik, telp, password, confirmPassword };
        const res = await fetch("http://localhost:5000/masyarakat", {
          method: "POST",
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const data = await res.json();
        console.log(res.status)
        if(res.status == 200){
          return navigate("/", {replace: true})
        }
        if(res.status == 406){
          setErrorMsg(data)
        }
      }

  return (
    <>
      <div id="loginContainer">
        <p style={{fontWeight: 'bold', fontSize: '26px'}}>Create An Account</p>
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
            NIK
          </label>
          <input
            className="loginInput"
            type="text"
            onChange={(e) => setNik(e.target.value)}
          ></input>
          <label id="inputLabel" htmlFor="">
            Name
          </label>
          <input
            className="loginInput"
            type="text"
            onChange={(e) => setName(e.target.value)}
          ></input>
          <label id="inputLabel" htmlFor="">
            No Telp
          </label>
          <input
            className="loginInput"
            type="number"
            onChange={(e) => setTelp(e.target.value)}
          ></input>
          <label id="inputLabel" htmlFor="">
            Password
          </label>
          <input
            className="loginInput"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <label id="inputLabel" htmlFor="">
            Confirm Password
          </label>
          <input
            className="loginInput"
            type="password"
            onChange={(e) => setConfirmPass(e.target.value)}
          ></input>
          <p style={{color: "red", margin: 0}}>{errorMsg.msg}</p> 
          <button
            className="loginInput"
            id="loginButton"
            onClick={() => register()}
          >
            Register
          </button>
          <a href="/">Have an account? Login</a>
        </div>
      </div>
    </>
  );
}

export default Register;
