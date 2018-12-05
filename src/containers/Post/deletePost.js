import axios from 'axios'

export const deletePostHandler = (postId, userId, stateHandler) => {
    if (userId) {
        const httpReqHeaders = {
            'Authorization': localStorage.getItem('Authorization'),
            'Content-Type': 'application/json'
        }
        const deleteUrl = 'http://localhost:3000/posts/' + postId
        const axiosConfigObject = {headers: httpReqHeaders}
        // stateHandler()
        axios.delete(deleteUrl, axiosConfigObject)
        // axios.delete('/posts/' + postId) 
        .then((res) => {
            console.log(res)
            res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE', 'PATCH' );
        })
        .then(stateHandler()) // Visually remove the item from the screen
        .catch(err => console.log(err))
        console.log("POST ID: ", postId)
        console.log("USER ID: ", userId)
    }

    

    
}