import axios from 'axios'

// Set up for axios
const instance = axios.create({
  // JSON Placeholder test database
  // baseURL: 'https://jsonplaceholder.typicode.com' 

  // Firebase database
  // baseURL: 'https://my-website-8af43.firebaseio.com',git 
  baseURL: 'http://localhost:3000'
  

})





export default instance