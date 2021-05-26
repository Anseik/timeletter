import React, {useEffect} from 'react'

import './Clock.scss';

function Clock() {
    function initAnalogClock(elem){

        // Getting all handle elments
        var hourHand = document.querySelector( elem +' .hour');
        var minuteHand = document.querySelector( elem +' .min');
        var secondHand = document.querySelector( elem +' .sec');
    
        function runClock(){
            // Getting current time
            var currentTime = new Date(); 
            // console.log(currentTime)
            // Getting hour handle degree based on decimal hour value calculated 
            // from current hour and curent minutes
            var hoursDegree = (currentTime.getHours()+ currentTime.getMinutes()/60) * 30 ; // 360/12
           
            //Getting minute handle degree  
            var minutesDegree = currentTime.getMinutes() * (-6); // 360/60
            //Getting second handle degree  
            var secondsDegree = currentTime.getSeconds() * (-6); // 360/60
        
            // Addint rotate attributes to handles
            hourHand.style.transform = "rotate("+hoursDegree+"deg)";
            minuteHand.style.transform = "rotate("+minutesDegree+"deg)";
            secondHand.style.transform = "rotate("+secondsDegree+"deg)";
        }
    
        // Starting runClock function
        runClock();
    
        // Removing animate class from handles after animation is finished
        setTimeout(function(){                 
            hourHand.classList.remove("animate");
            minuteHand.classList.remove("animate");
            secondHand.classList.remove("animate");
        }, 600); 
    
        // Setting clock interval for every second
        setInterval(runClock, 1000);
    
    
    }
    
    // Start clock function
    useEffect(()=>{
        initAnalogClock(".clock.white");
    },[])
    // initAnalogClock(".clock.dark");


    return (
        <div class="clock white">
        <div class="dot"></div>
        <div class="sec animate"></div>
        <div class="min animate"></div>
        <div class="hour animate"></div>
      </div>
    )
}

export default Clock
