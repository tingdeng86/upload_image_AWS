
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { currentUser, userToken } from '../userAuth'
import { useDispatch } from 'react-redux';
import { createUser } from '../features/user/userSlice';

const PageHome = () => {
    const navigate = useNavigate();
    const [images, setImages] = useState([])
    const [file, setFile] = useState("")
    const [description, setDescription] = useState("")
    // const [user, setUser] = useState(null)
    const [title, setTitle] = useState("")
    const dispatch = useDispatch()

    useEffect(() => {
        const user = currentUser()
        if (!user) {
            navigate("/login");
        } else {
            dispatch(createUser(user.username));
        }
        console.log(user)

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
            const images = imagesResult.data
            console.log(images)
            setImages(images)
        }
        getSunnyDay()

    }, [])

    const submitImage = async event => {
        event.preventDefault()
        const token = await userToken()
        const urlRestult = await axios.get(" https://7qmr8tyali.execute-api.ca-central-1.amazonaws.com/dev/signedurl",
            {
                headers: {
                    Authorization: token
                }
            })
        const url = urlRestult.data.url
        await axios.put(url, file, { headers: { "Content-Type": file.type } })
        console.log(url)
        const imageUrl = url.split("?")[0]
        const imageNames = imageUrl.split('\/')
        const imageName = imageNames[imageNames.length - 1]
        const result = await axios.post("https://7qmr8tyali.execute-api.ca-central-1.amazonaws.com/dev/images",{
            imageName,
            description},
            {
                headers: {
                    Authorization: token
                }
            }
       )
       console.log(result)
        setImages([result.data, ...images])
        setFile("")
    }

    const deleteImage = async imageUrl => {
        console.log(imageUrl)
        // const imageNames = imageUrl.split('\/')
        const imageName = imageUrl.image_name
        const token = await userToken()
        console.log(imageName)
        const deleteUrl = ` https://7qmr8tyali.execute-api.ca-central-1.amazonaws.com/dev/images/${imageName}`
        const urlRestult = await axios.delete(deleteUrl,
            {
                headers: {
                    Authorization: token
                }
            }
        )
        if (!urlRestult.data.errorMessage) {
            const newImages = images.filter(item => item != imageUrl)
            setImages(newImages)
        }
        console.log(deleteUrl)
        console.log(urlRestult)

    }

    return (
        <main>
            <section>
                <h1>{title}</h1>
                <form onSubmit={submitImage} className="form-group selected-image">
                    <input className="custom-file-input" onChange={e => setFile(e.target.files[0])} type="file" accept="image/*" ></input>
                    <input className='description' type="text"  placeholder='description' onChange={e => setDescription(e.target.value)}/>
                    <button type="submit" className="btn btn-outline-dark" disabled={!file}>Submit</button>
                </form>
                {
                    images.map(image => (
                        <div key={image.id} className="image-container" >
                            <img src={"https://week-4-aws.s3.ca-central-1.amazonaws.com/"+image.image_name} alt="" />
                            <button type="submit" className="btn btn-secondary" onClick={() => deleteImage(image)}>Delete</button>
                            <h2>{image.description}</h2>
                        </div>
                    ))
                }
            </section>
        </main>
    );
};

export default PageHome;