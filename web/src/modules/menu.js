import filterList from "./filterList"
import regions from "./regions"

const menu = function(objectManager, myMap) {  
// переменные
        const menuBtn = document.querySelector('.menu__btn')
        const sidenav = document.querySelector('.sidenav')
        let menuOpen = false;

// верстка линий кнопки меню
        menuBtn.innerHTML = `
        <span class='border1'></span>
        <span class='border2'></span>
        <span class='border3'></span> 
        `

        filterList(objectManager)
        regions(objectManager, myMap, sidenav, menuOpen, menuBtn)
}

export default menu
