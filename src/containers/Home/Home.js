import React, {Component} from 'react'
import './Home.css'

class Home extends Component {
  render() {
    return (

      <div className="homepage__container">
            <h3>What is this place?</h3>
            <p>Here you will find articles from a wide range of topics but mostly focusing on Javascript front and back end development.</p>
            <h3>How can I write an article for your website?</h3>
            <p>You can write me a message using the <a href="/contact">contact</a> form with details and I will get back to you as soon as I can.</p>
            <h3>I am looking for some help on my project, can you help?</h3>
            <p>I would love to help you with your project!  I help for free but tips are appreciated because tips are what keep this website online.</p>
            <h3>Can you make a website for me?</h3>
            <p>Absolutely! Just send me a message <a href="/contact">here</a> and I will get in touch to see how we can get started. </p>
      
            {/* <i class="material-icons" style="font-size:36px">note_add</i> */}
            <i className="material-icons">note_add</i>
            <i className="material-icons">question_answer</i>
            <i className="material-icons">supervisor_account</i>
            <i className="material-icons">watch_later</i>
            <i className="material-icons">assignment</i>
            <i className="material-icons">description</i>
            <i className="material-icons">feedback</i>
            <i className="material-icons">lock</i>
            <i className="material-icons">list</i> 
      
      </div>

      // <h1 style={{fontFamily: 'Montserrat', fontWeight: '400'}}>"The only stupid questions are the questions that are not followed up with some research."</h1>
      
    )
  }
}


export default Home