import React from 'react'
import './ControlPanel.css'

const ControlPanel = props => {
    return (
        <div className="ControlPanel__slideout">
            <div className="ControlPanel__slideout_inner">
                <div>
                    <a href="/edit-post">New |</a>
                    <a href="/contactMsgs">Messages | </a>
                    <a href="/contactMsgs">Admin </a>
                </div>
            </div>
        </div>
    )
}

export default ControlPanel