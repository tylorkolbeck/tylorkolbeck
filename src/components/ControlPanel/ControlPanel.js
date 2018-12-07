import React from 'react'
import './ControlPanel.css'

const ControlPanel = props => {
    return (
        <div className="slideout">
            <div className="slideout_inner">
                <div>
                    <a href="/new-post">New</a>
                    <a href="/contactMsgs">Messages</a>
                </div>
            </div>
        </div>
    )
}

export default ControlPanel