import React from 'react'
import btns from '../../containers/EditPost/PostFormatter/postFormatter'
import '../../containers/EditPost/PostFormatter/postFormatter.css'
import ReactHtmlParser from 'react-html-parser'
import './PostForm.css'

const postForm = props => {
    let _txtArea = React.createRef()
    let uploadedThumbNails = []
    // if (props.selectedFiles) {
    //     uploadedThumbNails = props.selectedFiles.map((img) => {
    //         return <div key={img.name}><img src={img.location} alt={img.location}  style={{width: '100px'}} onClick={props.deleteImageHandler}/><textarea style={{height: '50px', fontSize: '.5rem', border: '0px'}} value={img.location} readOnly></textarea></div>
    //     })
    // }
    
    if (!props.loading && props.postImages.length > 0) {
        uploadedThumbNails.push(
            props.postImages.map((url) => {
                return <div key={url} style={{borderBottom: '1px solid #ccc', margin: '5px'}}><img src={url} alt={url} style={{width: '100px'}} onClick={props.deleteImageHandler}></img><br></br><textarea style={{height: '50px', fontSize: '.5rem', border: '0px'}} value={url} readOnly></textarea></div>
            })
        )
        console.log(uploadedThumbNails)
        // props.postImages.map()
        console.log(props.postImages)
    }
    return (
        
        <div className='NewPost'>
            <div className="newpost_form_container">
                <label>Public?</label>
                <input type="checkbox" name="isPublic" checked={props.isPublic} onChange={props.togglePublic}></input>
                <br></br>
                <label style={{marginTop: '30px'}}>Title</label>
            
                <input type='text' name="title" value={props.title} onChange={event => props.updateStateHandler(event)} />
                
                <label style={{marginTop: '30px'}}>Author</label>
                <input type='text' name='author' value={props.author} onChange={event => props.updateStateHandler(event)} />
            
                <label>Tags</label>
                <input type='text' name="tags" value={props.tags} onChange={event => props.updateStateHandler(event)} />
                
                <label>Notes(Not seen by the public)</label>
                {/* <input type='text' name="category" value={undefined} onChange={event => props.updateStateHandler(event)} />  */}
                <textarea name="category" value={props.category} onChange={event => props.updateStateHandler(event)} />

                <label>Description</label>
                <textarea name="description" value={props.description} onChange={event => props.updateStateHandler(event)} />

                <div className="NewPost__textArea_formatter">
                    <div className="NewPost__textarea_buttons" style={{
                        display: 'flex', 
                        flexDirection: 'row', 
                        alignItems: 'flex-start',
                        flexWrap: 'wrap' }}>

                    <span onClick={(e)=> btns.insertTag(e, _txtArea.current)}><b className="bold"> B </b></span>
                    <span onClick={(e)=> btns.insertTag(e, _txtArea.current)}><i className="italic"> I </i></span>
                    <span className="unl" onClick={(e)=> btns.insertTag(e, _txtArea.current)}> U </span>
                    <span onClick={(e)=> btns.insertTag(e, _txtArea.current)} className="tab">tab</span>
                    <span style={{background: 'none', border: 'none', width: '10px'}}>  </span>
                                      
                    <span onClick={(e)=> btns.insertTag(e, _txtArea.current)} className="h1">H1</span>
                    <span onClick={(e)=> btns.insertTag(e, _txtArea.current)} className="h2">H2</span>
                    <span onClick={(e)=> btns.insertTag(e, _txtArea.current)} className="h3">H3</span>
                    <span onClick={(e)=> btns.insertTag(e, _txtArea.current)} className="h4">H4</span>
                    <span style={{background: 'none', border: 'none', width: '10px'}}>  </span>

                    <span onClick={(e)=> btns.insertTag(e, _txtArea.current)} className="p">p</span>
                    <span onClick={(e)=> btns.insertTag(e, _txtArea.current)} className="a">a</span>
                    <span onClick={(e)=> btns.insertTag(e, _txtArea.current)} className="img">img</span>
                    <span onClick={(e)=> btns.insertTag(e, _txtArea.current)} className="ul">ul</span>
                    <span onClick={(e)=> btns.insertTag(e, _txtArea.current)} className="ol">ol</span>
                    <span onClick={(e)=> btns.insertTag(e, _txtArea.current)} className="li">li</span>
                    <span onClick={(e)=> btns.insertTag(e, _txtArea.current)} className="pre">&lt; &gt;</span>

                    {/* <span>{props.cursorLocation}</span> */}

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

                <hr></hr>

                <h1>Live Preview</h1>
                <div className="newpost__live_preview_container">
                    {ReactHtmlParser(props.bodyText)}
                </div>

                <hr></hr>
                

                {/* <div className="PostForm__image_upload_controls">
                    <div className="PostForm__upload_hider">
                        <input type="file" onChange={props.fileChangedHandler}/></div>
                    </div>
                    <div>
                </div> */}
                <h1>Images</h1> 
                <div style={{
                    border: '1px solid grey', 
                    width: '100%', 
                    minHeight: '200px', 
                    padding: '16px', 
                    boxSizing: 'border-box', 
                    display: 'flex', 
                    flexDirection: 'row', 
                    alignItems: 'flex-start',
                    flexWrap: 'wrap'}}>
                    
                        {uploadedThumbNails}
                </div>
                
                <div className="upload-btn-wrapper">
                    <button className="btn">Upload image</button>
                    <input type="file" onChange={props.fileChangedHandler}/>
                </div>
            
            {/*         
                <div style={{border: '1px solid grey', display: 'inline-block', height: '50px', padding: '5px'}}>
                    <span>Public?</span>
                    <label className="newpost__ispublic_container">
                        <input type="checkbox" name="isPublic" checked={props.isPublic} onChange={props.togglePublic}></input>
                        <span className="newpost__ispublic_checkmark"></span>
                    </label>
                    
                </div> 
            */}

            <hr></hr>
                 
                <button className="submit-button" onClick={props.postDataHandler}>Post</button>
            </div>
            
        </div>
    
    )
}

export default postForm

