import React, {Component} from 'react'
import axios from '../../axios'
import './FullPost.css'
import ReactHtmlParser from 'react-html-parser'


class FullPost extends Component {
  state = {
    test: "TEST",
    loadedPost: null
  }

  componentDidMount() {
    console.log('sdsd',this.props.userId)
    if (this.props.match.params.id) {
      if (!this.state.loadedPost || (this.state.loadedPost && this.state.loadedPost.id !== this.props.id))
      axios.get('/posts/' + this.props.match.params.id) // This retrieves the object at that location
        .then(response => {
          let newData = {
            ...response.data
          }
          this.setState({loadedPost: newData})
          console.log(this.state.loadedPost)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }

  dateConversion = (ISODate) => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    const dateArray = []
    const date = new Date(ISODate);
    dateArray.push(date.getDate() + ' ')
    dateArray.push(months[date.getMonth()] + ' ')
    dateArray.push(date.getFullYear() + ' ')
    return dateArray
  }

  render() {
    let sync = <p style={{textAlign: 'center'}}>Loading</p>

    if (this.state.loadedPost) {
      let syncData = this.state.loadedPost.doc
      console.log("TEST" + syncData)

      const getFilters = () => { 
        const filterArray = []
        if (syncData.tags.length > 0) {
      
          syncData.tags.forEach((tag) => {
            filterArray.push(
                <span key={tag} className='fullpost__tag_block'> 
                {tag + ' '}
                </span>     
              )
          })
        }
         else if (syncData.tags.length === 0) {
          return null
        }
        
        return filterArray
      }
    
      sync = (
        <div className="FullPost">
          <div className="fullpost__header"style={{textAlign: 'center', width: '100%'}}>
            <h1 className="fullpost__title">{syncData.title}</h1>
            <h3><span className='fullpost__author'>{syncData.author}</span></h3>
          </div>
          
          <h3><span className="fullpost__date"><span className='bold'>Posted: </span>{this.dateConversion(syncData.createdAt)} </span ></h3>
          {/* <h3><span className='fullpost__date'><span className='bold'>Tags: </span> <span style={{fontSize: '1.3rem'}}>{getFilters()}</span></span></h3> */}
          
          <p className="fullpost__description">{syncData.description}</p>

          <p> Body - {ReactHtmlParser(syncData.bodyText)}</p>
        </div>
      )
    }
    return sync
  }
}

export default FullPost
