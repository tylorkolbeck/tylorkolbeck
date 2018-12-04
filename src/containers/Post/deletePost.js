import axios from 'axios'

export const deletePostHandler = (postId, userId) => {
    if (userId) {
        const httpReqHeaders = {
            'Authorization': localStorage.getItem('Authorization'),
            'Content-Type': 'application/json'
        }
        const deleteUrl = 'http://localhost:3000/posts/' + postId
        const axiosConfigObject = {headers: httpReqHeaders}
        console.log(this)
        // axios.delete(deleteUrl, axiosConfigObject)

        // // axios.delete('/posts/' + postId) 
        // .then((res) => {
        //     console.log(res)
        //     res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE', 'PATCH' );
        // })
        // .catch(err => console.log(err))
        // console.log("POST ID: ", postId)
        // console.log("USER ID: ", userId)
    }

    

    
}