import React, {Component} from 'react'
import './Home.css'
import Logo from '../../components/Logo/Logo'

class Home extends Component {
  render() {
    return (

      <div className="homepage__container">
        <div className="home__logo">
          <Logo className="home__logo"></Logo>
        </div>
        
            {/* <h3>What is this place?</h3>
            <p>Here you will find articles from a wide range of topics but mostly focusing on Javascript front and back end development.</p> */}
            <h1>About Me</h1>
            <p>
              I am a self taught freelance web developer specializing in React and NodeJS. I first started web development in 2008 after highschool when I did freelance work for small startups. 
              After a bit I could not keep up with the workload and fulltime work so my programming became a side hobby. About 3 years ago I decided to really make this my new career and have put in a lot 
              of time and effort to come up to speed with this very fast paced industry.
            </p>
            
            <p>  
              I just got my website up and going which is where I will host various articles
              pertaining to anything that has to do with web development and sometimes just programming in general.  My website is still in its early testing phases so if you see any issues please let me know so I can get them fixed. 
            </p>

            <h1>Lets Get Down To Business</h1>

            <h3>How can I write an article for your website?</h3>
            <p>I am always looking for articles to post so if you have something you can write me a message using the <a href="/contact">contact</a> form with details.</p>

            <h3>I am looking for some help on a project, can you help?</h3>
            <p>I would love to help you!  I am currently working on my porfolio so I am always looking for side projects.  Just send me a message with the details.</p>

            <h3>Can you make a website for me?</h3>
            <p>I can make a website for you depending on the requirements and my current workload.  Send me a message with some details and I will get in contact with you.<a href="/contact">here</a></p>
      
            {/* <i class="material-icons" style="font-size:36px">note_add</i> */}
            {/* <i className="material-icons">note_add</i>
            <i className="material-icons">question_answer</i>
            <i className="material-icons">supervisor_account</i>
            <i className="material-icons">watch_later</i>
            <i className="material-icons">assignment</i>
            <i className="material-icons">description</i>
            <i className="material-icons">feedback</i>
            <i className="material-icons">lock</i>
            <i className="material-icons">list</i> 
       */}
      </div>
      
    )
  }
}


export default Home