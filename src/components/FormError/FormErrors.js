import React from 'react'

const FormErrors = (props) => (
    <span className='formErrors'>
        {Object.keys(props.formErrors).map((fieldName, i) => {
            if(props.formErrors[fieldName].length > 0) {
                return (
                    <span key={i}> - {fieldName} {props.formErrors[fieldName]}</span>
                )
            } else {
                return ''
            }
        })}
    </span>
)

export default FormErrors


