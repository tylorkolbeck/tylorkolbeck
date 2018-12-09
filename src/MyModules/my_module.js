

export function dateConversion(ISODate, format) {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const dateArray = []
  const date = new Date(ISODate);
  
  let dateObj = {
    y:  date.getFullYear(),
    m: months[date.getMonth()],
    d:   date.getDate()
  }

  if (format) {
    format = format.split(',')
    format.forEach((l) => {
      dateArray.push(dateObj[l])
    })
    return dateArray
  } else {
    for (let i in dateObj) {
      dateArray.push(dateObj[i])
    }
    return dateArray
  }
}

  export function tabHandler(e) {
    if (e.keyCode === 9) {
      e.preventDefault()
      let boxV = e.target.value
      let start = e.target.selectionStart
      let end = e.target.selectionEnd
      e.target.value = boxV.substring(0, start) + "\t" + boxV.substring(end) + "&ensp;" 
      start = end = start+1
      }
  }
