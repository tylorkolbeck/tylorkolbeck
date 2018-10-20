import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://my-website-8af43.firebaseio.com'
})

instance.defaults.headers.common['Authorization'] = 'AUTH TOKEN FROM AXIOS INSTANCE'

export default instance