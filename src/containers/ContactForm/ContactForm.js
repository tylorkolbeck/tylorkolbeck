import React, { Component } from 'react'
import axios from 'axios'
import './ContactForm.css'
// import history from '../../history'
import FormErrors from '../../components/FormError/FormErrors'


class ContactForm extends Component {
    state = {
        submitted: false,
        name: localStorage.getItem('contactMsg-name') ? localStorage.getItem('contactMsg-name') : '',
        email: localStorage.getItem('contactMsg-email') ? localStorage.getItem('contactMsg-email') : '',
        subject: localStorage.getItem('contactMsg-subject') ? localStorage.getItem('contactMsg-subject') : '',
        message: localStorage.getItem('contactMsg-message') ? localStorage.getItem('contactMsg-message') : '',
        formErrors: {name: '', email: '', message: ''},
        nameValid: false,
        emailValid: false,
        messageValid: false,
        formValid: false,
    }

    handleUserInput (e) {
        const name = e.target.name
        const value = e.target.value
        this.setState({[name]: value}, () => 
            { this.validateField(name, value) }
        )
    }

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors
        let emailValid = this.state.emailValid
        let nameValid = this.state.nameValid
        let messageValid = this.state.messageValid

        switch(fieldName) {
            case 'email':
                emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)
                fieldValidationErrors.email = emailValid ? '' : 'is invalid.'
                break
            case 'message':
                messageValid = value.length >= 6
                fieldValidationErrors.message = messageValid ? '' : 'is too short.'
                break
            case 'name':
                nameValid = value.length > 1
                fieldValidationErrors.name = nameValid ? '' : 'is too short.'
                break
            default:
                break
        }
        this.setState({
            formErrors: fieldValidationErrors, 
            emailValid: emailValid,
            messageValid: messageValid,
            nameValid: nameValid
        }, this.validateForm)
    }

    validateForm() {
        this.setState({formValid: this.state.emailValid && this.state.messageValid && this.state.nameValid })
    }

    submitMessageHandler() {
        let data = {
            name: this.state.name,
            email: this.state.email,
            subject: this.state.subject,
            body: this.state.message
        }
        console.log(data)
          // The HTTP Request
        axios({
        method: 'post',
        url: 'https://api.thedailyfunc.com/msg',
        data: {...data}
        })
        .then(res => {
            const fieldNames = ['contactMsg-name', 'contactMsg-email', 'contactMsg-subject', 'contactMsg-message']
            this.setState({submitted: true}) 
            
            fieldNames.forEach((name) => {
                localStorage.removeItem(name)
            })
        })
        .catch(err => {
            console.log("[POST - ERROR] - ", err)
        })
    }


    updateStateHandler(event) {
        let fieldName = event.target.name
        console.log(fieldName)
        let fieldValue = event.target.value
        this.setState({[fieldName]: fieldValue})
        // localStorage.setItem(('contactMsg-' + fieldName), fieldValue)
        this.handleUserInput(event)
    }

    render() {
        let showFormHolder = null

            if (!this.state.submitted) {
            showFormHolder = 
                <div className="ContactForm__for_container">
                    <h2>Contact Form</h2>
                    <p>If you need to get a hold of me please fill in the form below and I will get back to you shortly.</p>
                    <p>If you are in need of a front or back end web develolper or you are interested in some collabrative work please let me know!</p>
                    <hr className="ContactForm__hr"></hr>
                    <label style={{fontWeight: '100'}}>Required <span className="ContactForm__required">* <FormErrors formErrors={this.state.formErrors} /></span></label>


                        
              
                    
                    <label>Name <span className="ContactForm__required">*</span></label>
                    
                    

                    <input type='text' name="name" value={this.state.name} onChange={event => this.updateStateHandler(event)} />
            
                    <label>Email <span className="ContactForm__required">*</span></label>
                    <input type='text' name="email" value={this.state.email} onChange={event => this.updateStateHandler(event)} />
            
                    <label>Subject</label>
                    <input type='text' name="subject" value={this.state.subject} onChange={event => this.updateStateHandler(event)} />
            
                    <label>Message <span className="ContactForm__required">*</span></label>
                    <textarea name="message" value={this.state.message} onChange={event => this.updateStateHandler(event)}></textarea>
            
            
                    <button type="submit" className="ContactForm__submit_button" onClick={this.submitMessageHandler.bind(this)} disabled={!this.state.formValid}>Submit</button>
                </div>
         } else {
            showFormHolder= 
                <div>
                    <h1 style={{textAlign: 'center'}}>
                        Your message Was Submitted! 
                    </h1>
                </div>
         }

        return(
            <div>
                {showFormHolder}
            </div>
            
        )
    }
}

       
    



export default ContactForm