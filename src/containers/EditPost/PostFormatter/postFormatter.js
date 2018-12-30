const btns = {
    cursorLocation: 0,
    clickedBtnType: '',
    unl     : [`<U></U>`, 3],
    bold    : [`<b></b>`, 3],
    italic  : [`<I></I>`, 3],
    h1      : [`<h1></h1>`, 4],
    h2      : [`<h2></h2>`, 4],
    h3      : [`<h3></h3>`, 4],
    h4      : [`<h4></h4>`, 4],
    pre     : [`<pre></pre>`, 5],
    tab     : [`style='padding-left: 1rem'`, 27],
    p       : [`<p></p>`, 3],
    img     : [`<img src="" alt="" />`, 17],
    ul      : [`<ul>\n<li></li>\n</ul>`, 9],
    ol      : [`<ol>\n<li></li>\n</ol>`,9],
    li      : [`<li></li>`, 4],
    a       : [`<a href=''></a>`, 11],


    getCursorLocation(e) {
        this.cursorLocation = e.target.selectionEnd
    },

    setCursorLocation(e, txtArea, end) {
        // txtArea.value = txtArea.value
        if (txtArea !== null) {
            if (txtArea.createTextRange) {
                let range = txtArea.createTextRange()
                range.move('character', end + this[e.target.className][1])
                range.select()
                return true
            } else {
                if (txtArea.selectionStart || txtArea.selectionStart === 0) {
                    txtArea.focus()
                    txtArea.setSelectionRange(end + this[e.target.className][1], end + this[e.target.className][1])
                    return true
                } else {
                    txtArea.focus()
                    return false
                }
            }
        }
    },

    tabHandler(e, txtArea) {
        if (e.keyCode === 9) {
          e.preventDefault()    
          }
      },

    

    insertTag(e, txtArea) {
        this.clickedBtnType = e.target.className
        let start = txtArea.selectionStart
        let end = txtArea.selectionEnd
        let tag = this[e.target.className][0]

        txtArea.value = txtArea.value.substring(0, start) + tag + txtArea.value.substring(end) 

        // Set the caret position inbetween the newely entered tags
        this.setCursorLocation(e,txtArea, end)

        
    }

    
}
export default btns