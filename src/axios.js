import axios from 'axios'

// Set up for axios
const instance = axios.create({
  // JSON Placeholder test database
  // baseURL: 'https://jsonplaceholder.typicode.com' 

  // Firebase database
  // baseURL: 'https://my-website-8af43.firebaseio.com',
  baseURL: 'http://localhost:3000'
  // Authorization: 'AIzaSyDujaaPXAWWkkPVl773HB6mUHEZFd7a8no'

})





export default instance