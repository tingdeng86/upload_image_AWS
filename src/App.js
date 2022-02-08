
import './App.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { signUp, confirmUser, login, currentUser, signOut, userToken } from './userAuth'

function App() {
  const [title, setTitle] = useState("")
  const [images, setImages] = useState([])
  const [file, setFile] = useState()
  const [page, setPage] = useState("signup")
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [verification, setVerification] = useState("")
  const [user, setUser] = useState(null)

  useEffect(() => {
    const user = currentUser()
    if (user) {
      setPage("home")
    } else {
      setPage("login")
    }
    setUser(user)
    async function getSunnyDay() {
      const result = await axios.get("https://7qmr8tyali.execute-api.ca-central-1.amazonaws.com/dev/days")
      // console.log(result)
      const message = result.data.message

      setTitle(message)
      const token = await userToken()
      console.log(token)
      const imagesResult = await axios.get("https://7qmr8tyali.execute-api.ca-central-1.amazonaws.com/dev/images",
        {
          headers: {
            Authorization: token
          }
        })
      const images = imagesResult.data.images
      setImages(images)
    }

    getSunnyDay()

  }, [])

  const submit = async event => {
    event.preventDefault()
    const token = await userToken()
    const urlRestult = await axios.get(" https://7qmr8tyali.execute-api.ca-central-1.amazonaws.com/dev/signedurl",
    {
      headers: {
        Authorization: token
      }
    })
    const url = urlRestult.data.url
    // console.log(url)
    // console.log(file)
    await axios.put(url, file, { headers: { "Content-Type": file.type } })
    const imageUrl = url.split("?")[0]
    setImages([imageUrl, ...images ])
  }

  const submitSignup = async event => {
    event.preventDefault()
    const result = await signUp(username, password, email)
    console.log(email)
    setPage("confirmEmail")
  }

  const submitConfirmEmail = async event => {
    event.preventDefault()
    const result = await confirmUser(username, verification)
    console.log("confirm")
    console.log(result)
    if (result == "SUCCESS") {
      setPage("login")
    }
  }

  const submitLogin = async event => {
    event.preventDefault()
    const result = await login(username, password)
    setPage("home")
    console.log(result)
  }

  const deleteImage = async imageUrl => {
    const imageNames = imageUrl.split('\/')
    const imageName = imageNames[imageNames.length -1]
    const token = await userToken()
    console.log(imageName)

    const deleteUrl=` https://7qmr8tyali.execute-api.ca-central-1.amazonaws.com/dev/images/${imageName}`
    const urlRestult = await axios.delete(deleteUrl,
    {
      headers: {
        Authorization: token
      }
    }
    )
    if(!urlRestult.data.errorMessage ){
      const newImages = images.filter(item=>item!=imageUrl)
      setImages(newImages)
    }
   
    console.log(deleteUrl)
    console.log(urlRestult)

  }

  return (
    <div className="App">
      <h1>{title}</h1>
      {page == "signup" &&
        (<form className='form' onSubmit={submitSignup}>
          <label htmlFor="username">Username</label>
          <input onChange={e => setUsername(e.target.value)} type="text" className="form-control" id="username" placeholder="Username"></input>
          <label htmlFor="exampleInputEmail1">Email </label>
          <input onChange={e => setEmail(e.target.value)} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"></input>
          <label htmlFor="exampleInputPassword1">Password</label>
          <input onChange={e => setPassword(e.target.value)} type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"></input>
          <button type="submit" className="btn btn-primary">Signup</button>
        </form>)}
      {page == "confirmEmail" &&
        (<form className='form' onSubmit={submitConfirmEmail}>
          <label htmlFor="username">Username</label>
          <input onChange={e => setUsername(e.target.value)} type="text" className="form-control" id="username" placeholder="Username"></input>
          <label >Verification Code </label>
          <input onChange={e => setVerification(e.target.value)} type="text" className="form-control" placeholder="Verification Code"></input>
          <button type="submit" className="btn btn-primary">Confirm</button>
        </form>)}

      {page == "login" &&
        (<form className='form' onSubmit={submitLogin}>
          <label htmlFor="username">Username</label>
          <input onChange={e => setUsername(e.target.value)} type="text" className="form-control" id="username" placeholder="Username"></input>
          <label htmlFor="exampleInputEmail1">Email </label>
          <label htmlFor="exampleInputPassword1">Password</label>
          <input onChange={e => setPassword(e.target.value)} type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"></input>
          <button type="submit" className="btn btn-primary">Login</button>
          <button type="submit" className="btn btn-primary signup" onClick={()=>setPage("signup")}>Signup</button>
        </form>)}

      {page == "home" &&
        <div>
          <button onClick={() => { signOut(); setPage("login") }}>Sign Out</button>
          <form onSubmit={submit}>
            <input onChange={e => setFile(e.target.files[0])} type="file" accept="image/*" ></input>
            <button type="submit" className="btn btn-outline-dark">Submit</button>
          </form>
          {
            images.map(image => (
              <div key={image} >
              <img src={image} alt="" />
              <button type="submit" className="btn btn-outline-dark" onClick={()=>deleteImage(image)}>Delete</button>
              </div>
            ))
          }
        </div>}
    </div>
  );
}

export default App;
