import React, { Component } from 'react'
import axios from 'axios'
import './ContactMsgs.css'


import ContactMsg from '../../components/ContactMsg/ContactMsg'


class ContactMsgs extends Component {
    state = {
        userId: 'testId',
        messagesLoaded: false,
        messages: [],
        numOfNotifications: 0
    }

    deleteMessage(e, postId) {
        axios({
            method: 'delete',
            url: 'https://api.thedailyfunc.com/msg/' + postId,
            headers: {
                'Authorization': localStorage.getItem('Authorization')
            }
        })
            .then(res => {
                let numOfNotifications = 0
                let newState = this.state.messages.filter((msg) =>  msg._id !== postId)
                newState.forEach(msg => !msg.wasRead ? numOfNotifications++ : numOfNotifications )
                this.setState({messages: newState, numOfNotifications: numOfNotifications})
            })
    }

    toggleMessageRead(e, postId) {
        let numOfNotifications = 0
        let newState = this.state.messages
        let messageToToggle = newState.findIndex(msg => msg._id === postId)
        newState[messageToToggle].wasRead = !newState[messageToToggle].wasRead
        newState.forEach(msg => !msg.wasRead ? numOfNotifications++ : numOfNotifications )
        let readBool = newState[messageToToggle].wasRead
        this.setState({messages: newState, numOfNotifications: numOfNotifications})

        axios({
            method: 'patch',
            url: 'https://api.thedailyfunc.com/msg/' + postId,
            data: [{propName: "wasRead", value: readBool}], 
         
            headers: {
              'Authorization': localStorage.getItem('Authorization'),
              'Content-Type': 'application/json'
            },
          })
            .then(res => {
                this.setState({submitted: true}) 
            })
            .catch(err => {
                console.log(err)
            })
    }

    componentDidMount() {
        axios({
            method: 'get',
            url: 'https://api.thedailyfunc.com/msg',
            headers: {
                'Authorization': localStorage.getItem('Authorization'),
                'Content-Type': 'multipart/form-data',
                'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW' 
            },
        })
        .then(res => {
            let numOfNotifications = 0;
            res.data.contactMsg.forEach(msg => !msg.wasRead ? numOfNotifications++ : numOfNotifications )


            let messages = res.data.contactMsg//new
            // let messages = res.data.contactMsg.map(msg => {
            //     return (
            //         <ContactMsg 
            //             key={msg._id} 
            //             id={msg._id}
            //             name={msg.name}
            //             email={msg.email}
            //             subject={msg.subject}
            //             body={msg.body}
            //             isRead={msg.wasRead}
            //             deleteMessage={this.deleteMessage.bind(this)}
            //             toggleMessageRead={this.toggleMessageRead.bind(this)}/>
            //     )
            // })
            this.setState({messages: messages, numOfNotifications: numOfNotifications})
        })

        .catch(err => console.log(err))
    }


    render() {
        let msgAlert = {
            position: 'absolute',
            top: '-10px',
            left: '-15px',
            height: '20px',
            width: '20px',
            padding: '5px',
            borderRadius: '20px',
            textAlign: 'center',
            fontFamily: '\'Montserrat\', sans-serif',
            color: 'white',
            // border: '2px solid white',
            background: '-webkit-linear-gradient(top, #FF6969 0%,#ff0000 100%)',
            boxShadow: '0 1px 2px rgba(0,0,0,.5), 0 1px 4px rgba(0,0,0,.4), 0 0 1px rgba(0,0,0,.7) inset, 0 10px 0px rgba(255,255,255,.11) inset', 
            WebkitBackgroundClip: 'padding-box'
        }
        
        let noMsgAlert = {
            display: 'none',
        }
            
        return (
            <div className="contactMsgs_title">
                <div className="contactMsgs__header_notification" >
                    <span style={this.state.numOfNotifications > 0 ? msgAlert : noMsgAlert}>
                        {this.state.numOfNotifications}
                    </span>
                    <h1>Messages</h1>
                    
                </div>
                
                {this.state.messages.map(msg => 
                    <ContactMsg 
                    key={msg._id} 
                    id={msg._id}
                    date={msg.dateSent}
                    name={msg.name}
                    email={msg.email}
                    subject={msg.subject}
                    body={msg.body}
                    isRead={msg.wasRead}
                    deleteMessage={this.deleteMessage.bind(this)}
                    toggleMessageRead={this.toggleMessageRead.bind(this)}/>
                )}
            </div>
        )
    }
}


export default ContactMsgs