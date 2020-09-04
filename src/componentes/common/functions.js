const axios = require("axios")

module.exports.setToken = token => {
  if (token) {
    // Apply authorization token to every request if logged in
    axios.defaults.headers.common["Authorization"] = token
  } else {
    // Delete auth header
    delete axios.defaults.headers.common["Authorization"]
  }
}

module.exports.setUser = user => {
  if(user){
    axios.defaults.headers.common["User"] = user
  } else {
    delete axios.defaults.headers.common["User"]
  }
}

module.exports.dateFormatter = date => {
  //Función para formatear fecha a un string mm/dd/yyyy
  const dateObject = new Date(date)
  const month = (dateObject.getMonth() + 1) < 10 ? '0'+(dateObject.getMonth() + 1) : dateObject.getMonth() + 1
  const day = dateObject.getDate() < 10 ? '0' + dateObject.getDate() : dateObject.getDate()
  let complete =
    month +
    '/' +
    day +
    '/' +
    dateObject.getFullYear()
  return complete
}

//List of years
module.exports.añosList = () => {
  const dateObject = new Date()
  const añoActual = dateObject.getFullYear()
  const años = []
  for(var i = Number(añoActual); i > 2000; i--){
    años.push({
      label: i,
      value: i
    })
  }
  return años
}

//Months
module.exports.monthsList = () => {
  return [
    {
      label: 'January',
      value: '01'
    },
    {
      label: 'February',
      value: '02'
    },
    {
      label: 'March',
      value: '03'
    },
    {
      label: 'April',
      value: '04'
    },
    {
      label: 'May',
      value: '05'
    },
    {
      label: 'June',
      value: '06'
    },
    {
      label: 'July',
      value: '07'
    },
    {
      label: 'August',
      value: '08'
    },
    {
      label: 'September',
      value: '09'
    },
    {
      label: 'October',
      value: '10'
    },
    {
      label: 'November',
      value: '11'
    },
    {
      label: 'December',
      value: '12'
    },
  ]
}