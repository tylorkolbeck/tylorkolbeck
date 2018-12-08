

export function dateConversion(ISODate) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const dateArray = []
    const date = new Date(ISODate);
    
    dateArray.push(date.getDate())
    dateArray.push(months[date.getMonth()])
    dateArray.push(date.getFullYear())
    

    //  + '-' + (date.getMonth()+1) + '-' + date.getDate();
    return dateArray
  }

