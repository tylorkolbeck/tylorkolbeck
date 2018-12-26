import React from 'react'
import btns from '../../MyModules/PostFormatter/postFormatter'
import ReactHtmlParser from 'react-html-parser'

const postForm = props => {
    let _txtArea = React.createRef()
    return (
        
        <div className='NewPost'>
            <div className="newpost_form_container">
        
                <label style={{marginTop: '30px'}}>Title</label>
            
                <input type='text' name="title" value={props.title} onChange={event => props.updateStateHandler(event)} />
                
                <label style={{marginTop: '30px'}}>Author</label>
                <input type='text' name='author' value={props.author} onChange={event => props.updateStateHandler(event)} />
            
                <label>Tags</label>
                <input type='text' name="tags" value={props.tags} onChange={event => props.updateStateHandler(event)} />
                
                <label>Category</label>
                <input type='text' name="category" value={undefined} onChange={event => props.updateStateHandler(event)} />
                

                <label>Description</label>
                <textarea name="description" value={props.description} onChange={event => props.updateStateHandler(event)} />

                <div className="NewPost__textArea_formatter">
                    <div className="NewPost__textarea_buttons">
                    <span onClick={(e)=> btns.insertTag(e, _txtArea.current)}><b className="bold">Bold </b></span>
                    <span onClick={(e)=> btns.insertTag(e, _txtArea.current)}><i className="italic">italic</i></span>
                    <span className="unl" onClick={(e)=> btns.insertTag(e, _txtArea.current)}>Underline</span>

                    <span onClick={(e)=> btns.insertTag(e, _txtArea.current)} className="p">p</span>
                    <span onClick={(e)=> btns.insertTag(e, _txtArea.current)} className="tab">tab</span>

                    <span onClick={(e)=> btns.insertTag(e, _txtArea.current)} className="h1">h1</span>
                    <span onClick={(e)=> btns.insertTag(e, _txtArea.current)} className="h2">h2</span>
                    <span onClick={(e)=> btns.insertTag(e, _txtArea.current)} className="h3">h3</span>
                    <span onClick={(e)=> btns.insertTag(e, _txtArea.current)} className="h4">h4</span>
                    <span onClick={(e)=> btns.insertTag(e, _txtArea.current)} className="pre">&lt; &gt;</span>

                    <span>{props.cursorLocation}</span>

                    </div>
                    
                    <textarea 
                        style={{height: '800px'}} 
                        name="bodyText" 
                        value={props.bodyText} 
                        onKeyDown={(e) => btns.tabHandler(e, _txtArea.current)}
                        onChange={(e) => props.updateStateHandler(e)}
                        onFocus={(e) => props.updateStateHandler(e)}
                        ref={_txtArea}
                        // ref={(txtArea) => {_txtArea = txtArea }}>
                        >
                    </textarea>

                </div>

                <div className="newpost__live_preview_container">
                    {ReactHtmlParser(props.bodyText)}
                </div>

                <label>Images</label>
                <input type="file" onChange={event => props.updateStateHandler(event)}/> 
                <input type="file" readOnly/> 
                <input type="file" readOnly/> 
        
                <div>
                Is Public?
                <label className="newpost__ispublic_container">
                    <input type="checkbox" name="isPublic" checked={props.isPublic} onChange={props.togglePublic}></input>
                    <span className="newpost__ispublic_checkmark"></span>
                    </label>
                </div>
            
                <button onClick={props.postDataHandler}>Update Post</button> 
            </div>
        </div>
    
    )
}

export default postForm

