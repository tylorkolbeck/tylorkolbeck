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

// instance.defaults.headers.common['Authorization'] = 'AIzaSyDujaaPXAWWkkPVl773HB6mUHEZFd7a8no'
// instance.defaults.headers.get['Accepts'] = 'application/json'
// instance.defaults.headers.common['authDomain'] = 'my-website-8af43.firebaseapp.com'
// instance.defaults.headers.common['databaseURL'] = 'https://my-website-8af43.firebaseio.com'
// instance.defaults.headers.common['projectId'] = 'my-website-8af43'
// instance.defaults.headers.common['storageBucket'] = 'my-website-8af43.appspot.com'
// instance.defaults.headers.common['messagingSenderId'] = '308390776707'



export default instance