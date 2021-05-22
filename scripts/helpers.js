function formatDate(date) {
    let d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [day, month, year].join('/');
}

// checks if one day has passed. 
function hasOneDayPassed(){
  // get today's date. eg: "7/37/2007"
  const date = new Date().toLocaleDateString();

  // if there's a date in localstorage and it's equal to the above: 
  // inferring a day has yet to pass since both dates are equal.
  if(localStorage.diaDeAcesso == date) 
      return false;

  // this portion of logic occurs when a day has passed
  localStorage.diaDeAcesso = date;
  return true;
}

/* 
// some function which should run once a day
function runOncePerDay(){
  if(!hasOneDayPassed() ) return false;

  // your code below
  //
}
 */