const clock = document.querySelector('#clock');
const morning = document.querySelector('.morning');

function getClock() {
    const date = new Date();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    clock.innerText =`${hours}시 ${minutes}분 ${seconds}초`;

    if( hours >= 0 && hours <=12 ){
        morning.innerText="Good morning, ";
    } else if(hours >= 13 && hours <=18){
        morning.innerText="Good Afternoon, ";
    } else morning.innerText="Good Evening, ";
}

getClock();
setInterval(getClock, 1000);
