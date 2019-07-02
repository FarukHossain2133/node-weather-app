
function weather(location){
    const p1 = document.querySelector('.p1');
    const p2 = document.querySelector('.p2');
    
    p1.innerHTML = 'Loading...';
    p2.innerHTML = 'Loading...';
    fetch(`/weather?address=${location}`) 
    .then(response => {
       
        response.json().then((data) => {
            if(data.error){
               p1.innerHTML = 'Something went wrong';
               p2.innerHTML = 'Something went wrong';
            }else {
              p1.innerHTML = data.place
              p2.innerHTML = data.data
            }
           
        })
    }).catch(error => {
       console.log(error)
    })
}


    const weatherForm = document.querySelector('form');
    const search = document.querySelector('input');
    weatherForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const location = search.value.trim();
        if(typeof location === 'string'){
             weather(location);
        }else {
            console.log('please search valid location')
        }
    })
