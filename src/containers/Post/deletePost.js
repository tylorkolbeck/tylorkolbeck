import axios from 'axios'

export const deletePostHandler = (postId, userId, stateHandler) => {
    if (userId) {
        const httpReqHeaders = {
            'Authorization': localStorage.getItem('Authorization'),
            'Content-Type': 'application/json'
        }
        const deleteUrl = process.env.REACT_APP_ROOT_URL + 'posts/' + postId
        const axiosConfigObject = {headers: httpReqHeaders}
        axios.delete(deleteUrl, axiosConfigObject)
        .then((res) => {
            console.log(res)
            stateHandler()
        })
        // Visually remove the item from the screen
        .catch(err => console.log(err))

    }

    

    
}