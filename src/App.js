import './App.css';
import { auth } from "./firebase/init"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

function App() {

  function register() {
    console.log("register")
    createUserWithEmailAndPassword(auth, 'email@a.com', 'test12')
      .then((user) => {
        console.log(user)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  function login(){

  }

  return (
    <div className="App">
      <button onClick={register}>Register</button>
    </div>
  );
}

export default App;
