import axios from 'axios'
import https from 'https'

// Set up for axios
const instance = axios.create({
  baseURL: 'http://localhost:3000',
  httpsAgent: new https.Agent({  
    rejectUnauthorized: false
  })
  

})





export default instance