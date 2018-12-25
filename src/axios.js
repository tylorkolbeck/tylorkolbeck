import axios from 'axios'
import https from 'https'

// Set up for axios
// axios.defaults.baseURL = 'http://localhost:3000'
axios.defaults.baseURL = 'https://54.184.193.9:3000'



const instance = axios.create({
  // baseURL: 'http://localhost:3000',
  baseURL: 'https://54.184.193.9:3000',
  httpsAgent: new https.Agent({  
    rejectUnauthorized: false
  })
})





export default instance