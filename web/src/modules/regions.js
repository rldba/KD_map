import jsonLoad from "./jsonLoad"
import menuSwitch from "./menuSwitch"

const regions = function (objectManager, myMap, sidenav, menuOpen, menuBtn) {
    jsonLoad(objectManager)

    let regions = [{
        id: 1,
        name: 'Уральское ГУ',
        oblast: [
            {
                id: 343,
                name: 'Уральское главное управление',
                locate: '56.838011,60.597474',
            },
            {
                id: 3472,
                name: 'Отделение-НБ Республика Башкортостан',
                locate: '54.735152,55.958736',
            },
            {
                id: 3522,
                name: 'Отделение Курган',
                locate: '55.441004, 65.341118',
            },
            {
                id: 71,
                name: 'Отделение Тюмень',
                locate: '57.152985, 65.541227',
            },
            {
                id: 75,
                name: 'Отделение Челябинск',
                locate: '55.159902, 61.402554',
            },
            {
                id: 57,
                name: 'Отделение Пермь',
                locate: '58.010455, 56.229443',
            },
            {
                id: 53,
                name: 'Отделение Оренбург',
                locate: '51.768205, 55.096964',
            },
        ]},
        ]
        
        menuBtn.addEventListener('click', (e) => {
            if (menuOpen == false) {
                menuOpen = true
            }
            else {
                menuOpen = false
            }
            menuSwitch(objectManager, menuOpen, sidenav)
        }) // изменение переменной menuOpen вследствии клика по кнопке меню

        regions.forEach((GU) => {
            const menu = document.querySelector('.menu__body_list')
        
            let list = document.createElement('li')
            list.classList.add('title_region_menu')
            menu.append(list)
        
            let listLink = document.createElement('a')
            listLink.classList.add('menu_regions_title')
            listLink.textContent = `${GU.name}`
            list.append(listLink)
        
            let container = document.createElement('ul')
            container.classList.add('dropdown-container')
            list.append(container)
        
            GU.oblast.forEach((TU) => {
                let dropList = document.createElement('li')
                dropList.classList.add('dropdown-list')
                container.append(dropList)
        
                let link = document.createElement('a')
                link.classList.add('dropdown-link')
                link.textContent = `${TU.name}`
                dropList.append(link)
        
                link.addEventListener('click', (e) => {
                    let separator = TU.locate.indexOf(',')
                    let latitude = parseFloat(TU.locate.slice(0, separator))
                    let longitude = parseFloat(TU.locate.slice(separator + 1))
        
                    myMap.setCenter([
                        latitude, longitude], 10, {
                            checkZoomRange: true,
                            duration: 200
                        })
        
                        setTimeout(jsonLoad, 450, objectManager, TU.locate)
                        menuOpen = false
                        menuSwitch(objectManager, menuOpen, sidenav)
                })
            }) // клик по списку с областями регионов
            }) // рендеринг содержимого массива regions
        
            const obl = regions.find(x => x.id == 1).oblast // поиск в массиве regions объекта по id (не используется)
        
            const dropdown = document.querySelectorAll('.menu_regions_title')
            const dropdownLink = document.querySelectorAll('.dropdown-container') // переменные отрисованные js'ом
        
            dropdown.forEach((item, id) => {
            item.addEventListener('click', (e) => {
                e.preventDefault()
        
                if (item.className === 'menu_regions_title') {
                    item.classList.add('active')
                }
                else {
                    item.classList.remove('active')
                }
                
                dropdownLink[id].classList.toggle('open')
            })
            }) // активные кнопки в меню выбора регионов
}

export default regions