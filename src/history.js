import createHistory from 'history/createBrowserHistory'

export default createHistory({
  
    basename: ''

    // basename: process.env.NODE_ENV === 'dev' ? '' : '/someothershit'
})