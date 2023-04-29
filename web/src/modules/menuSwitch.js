const menuSwitch = function (objectManager, menuOpen, sidenav) {
    const border1 = document.querySelector('.border1')
    const border2 = document.querySelector('.border2')
    const border3 = document.querySelector('.border3')
    if (menuOpen == true) {
        border1.style.cssText = 'top: 13px; transform: rotate(-45deg);'
        border2.style.cssText = 'transform: rotate(45deg);'
        border3.style.cssText = 'top: 13px; transform: rotate(45deg);'
        sidenav.style.cssText = 'visibility: visible; top: 0; left: 0;'
    }
    else {
        border1.style.cssText = 'top: 4px; transform: none;'
        border2.style.cssText = 'transform: none;'
        border3.style.cssText = 'top: 22px; transform: none;'
        sidenav.style.cssText = 'visibility: hidden; top: -100%;'
    }

    objectManager.objects.balloon.close();
} // функция со сценарием изменения значения menuOpen

export default menuSwitch