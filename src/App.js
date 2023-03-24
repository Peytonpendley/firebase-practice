import React from 'react'
import './App.css';
import { auth, db } from "./firebase/init"
import { collection, addDoc, getDocs, doc, getDoc, query, where } from 'firebase/firestore'
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";

function App() {
  
  const [user, setUser] = React.useState({})
  
  const [loading, setLoading] = React.useState(true)

  function createPost() {
    //for example if you are on instagram and want to post your picture this will create the post
    const post = {
      first: "preston",
      last: "pendley",
    }
    //one way to do it
    // try {
    //   await addDoc(collection(db, 'posts'), post)
    // } catch (err) {
    //   console.log(err)
    // }

    //another way to do it
    // db.collection('posts')
    // .add(post)
    // .then((response) => {
    //   console.log(response.id)
    // })
    // .catch((err) => {
    //   console.log(err)
    // })

    //prolly the best way to do it
    addDoc(collection(db, "posts"), post)//this is adding it to the firestore and collection is a reference to where we want to add the data
  }

  async function getAllPosts() {
    //this is kind of like the home page of instagram where you see all the posts everyone
    const { docs } = await getDocs(collection(db, "posts"))
    const posts = docs.map(elem => ({ ...elem.data(), id: elem.id}))
    console.log(posts)
  }

  async function getPostById() {
    const hardcodedId = "Ir4TlzrgSAJJVkQrDKdx"
    const postRef = await doc(db, "posts", hardcodedId)
    const postSnap = await getDoc(postRef)
    const post = postSnap.data()
    console.log(post)
  }

  async function getPostByUid() {
    const postCollectionRef = await query(
      collection(db, "posts"),
      where("uid", "==", user.uid)
    )
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
    createUserWithEmailAndPassword(auth, 'email@email.com', 'test123 ')
      .then((user) => {
        console.log(user)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  function login(){
    signInWithEmailAndPassword(auth, 'email@email.com', 'test123', "yo yo yo")
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
      {loading ? 'loading..' : user.email}
      <button onClick={createPost}>Create Post</button>
      <button onClick={getAllPosts}>GetAllPosts</button>
      <button onClick={getPostById}>Get Post By Id</button>
    </div>
  );
}

export default App;
