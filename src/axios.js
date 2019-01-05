import axios from 'axios'
import https from 'https'

// Set up for axios
// axios.defaults.baseURL = 'http://localhost:3000'  // For local development testing
axios.defaults.baseURL = 'http://54.148.26.236:3000' // For deployed state



const instance = axios.create({
  // baseURL: 'http://localhost:3000',  //  For local development testing
  baseURL: 'https://54.148.26.236:3000', //  For deployed state
  
  httpsAgent: new https.Agent({  
    rejectUnauthorized: false
  })
})





export default instance