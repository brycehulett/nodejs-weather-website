console.log('Client side javascript is loaded')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()  // prevents broser from rendering the page

    const location = search.value

    fetch("/weather?address="+location).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                messageOne.textContent = data.error
                messageTwo.textContent = ''
            }else{
                messageOne.textContent = ''
                const town = new String(data.address)[0].toUpperCase() + new String(data.address).slice(1)
                let result = `It's ${data.temperature} degrees in ${town}` 
                result += ` with ${data.precipitation}% precipitation and wind at ${data.wind} mph.`
                messageTwo.textContent = result
            }
        })
    })
})