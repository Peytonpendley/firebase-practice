import React from 'react'
import './App.css';
import { auth } from "./firebase/init"
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";

function App() {
  
  const [user, setUser] = React.useState({})
  
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setLoading(false)
      console.log(user)
      if (user) {
        setUser(user)
      }
    })
  }, [])

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
    signInWithEmailAndPassword(auth, 'email@email.com', 'test123')
      .then(({ user }) => {
        console.log(user)//you can also just pass data as a prop and then just do data.user
        setUser(user)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  function logout(){
    signOut(auth)
    setUser({})//this is setting the user back to an empty object because in login we set it to the user
  }

  return (
    <div className="App">
      <button onClick={register}>Register</button>
      <button onClick={login}>Login</button>
      <button onClick={logout}>Logout</button>
      {loading ? 'loading...' : user.email}
    </div>
  );
}

export default App;
