import React from 'react'
import './App.css';
import { auth, db } from "./firebase/init"
import { collection, addDoc } from 'firebase/firestore'
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";

function App() {
  
  const [user, setUser] = React.useState({})
  
  const [loading, setLoading] = React.useState(true)

  function createPost() {
    const post = {
      title: "land job",
      description: "finish fes",
    }
    addDoc(collection(db, "posts"), post)//this is adding it to the firestore and collection is a reference to where we want to add the data
  }

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
      
      <button onClick={createPost}>Create Post</button>
    </div>
  );
}

export default App;
