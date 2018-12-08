import React from 'react'
import './ContactMsg.css'


let msgAlert = {
    display: 'block',
    position: 'absolute',
    right: '-10px',
    top: '-30px',
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



const ContactMsg = props => (
    <div className="contactMsg__message_container">
    <p style={props.isRead ?  noMsgAlert : msgAlert}>1</p>
        <p>
            <span className="msg_label">From:</span>  
            <span className="msg_text">{props.name}</span>
        </p>

        <p>
            <span className="msg_label">Email:</span>
            <span className="msg_text">{props.email}</span>
        </p>

        <p>
            <span className="msg_label">Subject:</span>
            <span className="msg_text">{props.subject}</span>
        </p>

        <p>
            <span className="msg_label">Message:</span>
            <span className="msg_text">{props.body}</span>
        </p>

        <span className="contactMsg__action_button contactMsg__read_button" onClick={(e) => props.toggleMessageRead(e, props.id)}>read</span>
        {/* <span className="contactMsg__action_button contactMsg__read_button" onClick={() => props.isRead = false}>toggle read</span> */}
        <span className="contactMsg__action_button contactMsg__reply_button" >reply</span>
        <span onClick={(e) => props.deleteMessage(e, props.id)}className="contactMsg__action_button contactMsg__delete_button">delete</span>

    </div>
)

export default ContactMsg