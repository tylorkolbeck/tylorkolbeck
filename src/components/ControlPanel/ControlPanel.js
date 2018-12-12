import React from 'react'
import './ControlPanel.css'

const ControlPanel = props => {
    return (
        <div className="ControlPanel__slideout">
            <div className="ControlPanel__slideout_inner">
                <div>
                    <a href="/edit-post"> <i className="material-icons">note_add</i></a>
                    <a href="/contactMsgs"><i className="material-icons">question_answer</i> </a>
                    <a href="/contactMsgs"><i className="material-icons">lock</i></a>
                </div>
            </div>
        </div>
    )
}

export default ControlPanel