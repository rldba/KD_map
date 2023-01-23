ymaps.ready(init);

function init () {
    var myMap = new ymaps.Map('kd-map', {
            center: [54.435152, 56.959736],
            zoom: 7
        }, {
            searchControlProvider: 'yandex#search'
        }),

        objectManager = new ymaps.ObjectManager({
            // Чтобы метки начали кластеризоваться, выставляем опцию.
            clusterize: true,
            // ObjectManager принимает те же опции, что и кластеризатор.
            gridSize: 100,
            clusterDisableClickZoom: true,
            clusterHideIconOnBalloonOpen: false,
            // Макет метки кластера pieChart.
            clusterIconLayout: "default#pieChart",
        });
    
    // myMap.behaviors.enable('routeEditor')
    // myMap.behaviors.enable('ruler') Поведения карты (до лучших времен)

    myMap.controls.remove('trafficControl'); // удаляем контроль трафика
    myMap.controls.remove('rulerControl'); // удаляем контрол правил
    myMap.controls.remove('searchControl'); // удаляем поисковый контрол
    myMap.controls.remove('geolocationControl');
    myMap.controls.remove('zoomControl')
    myMap.controls.remove('fullscreenControl')
    myMap.controls.remove('listbox')
    myMap.geoObjects.add(objectManager);

    let zoomControl = new ymaps.control.ZoomControl({
        options: {
            size: "small",
            position: {
                right: 25,
                bottom: 250
            }
        }
    });
    myMap.controls.add(zoomControl); // кнопки зумма

    let regions = [{
        id: 1,
        name: 'Уральское ГУ',
        oblast: [
            {
                id: 343,
                name: 'Уральское главное управление',
                locate: '56.838011, 60.597474',
            },
            {
                id: 3472,
                name: 'Отделение-НБ Республика Башкортостан',
                locate: '54.735152, 55.958736',
            },
        ]
        // oblast: [
        //     'Уральское главное управление',
        //     'Отделение-НБ Республика Башкортостан',
        // ]
    },
    {
        id: 2,
        name: 'Центральное'
    }
]

    const filtersList = {
        'Офис банка (в т.ч. передвижной пункт)': true,
        'Удаленная точка банк. обслуживания': true,
        'Банкомат для операций с банк. картами, наличными и совершения безналичных платежей': true,
        'Банкомат для операций с наличными': true,
        'Банковские услуги в отделениях Почты России': true,
        'Точка выдачи наличных в магазине': true,
        'Точка оплаты наличными': true,
        'Микрофинансовая организация': true,
        'Страховая организация': true,
    }

    const menuBtn = document.querySelector('.menu__btn')
    const sidenav = document.querySelector('.sidenav')
    let triangleOpen = false
    let menuOpen = false;
    const nameList = document.querySelector('.name_list')
    const sidenavHeader = document.querySelector('.filter_container') // переменные

    menuBtn.innerHTML = `
    <span class='border1'></span>
    <span class='border2'></span>
    <span class='border3'></span> 
    ` // верстка линий кнопки меню

    const menuSwitch = () => {
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
    } // функция со сценарием изменения значения menuOpen

    menuBtn.addEventListener('click', (e) => {
        if (menuOpen == false) {
            menuOpen = true
        }
        else {
            menuOpen = false
        }
        menuSwitch()
        objectManager.objects.balloon.close();
    }) // изменение переменной menuOpen вследствии клика по кнопке меню

    const triangle = document.createElement('span')
    triangle.classList.add('triangle')
    nameList.append(triangle)

    const triangleSwitch = () => {
        triangleOpen == true ? triangle.style.cssText = 'bottom: 5px; transform: rotate(180deg);' : triangle.style.cssText = 'transform: none'
    }

    const dropFilters = () => {
        if (triangleOpen == true) {
            for (let key in filtersList) {
                // перебор объекта filtersList
        
                let nav = document.createElement('nav')
                nav.classList.add('menu_header')
                sidenavHeader.append(nav)
        
                let list = document.createElement('ul')
                list.classList.add('menu__list')
                nav.append(list)
        
                let listItem = document.createElement('li')
                listItem.classList.add('menu__item')
                list.append(listItem)
        
                let link = document.createElement('a')
                link.classList.add('menu__link')
                link.textContent = `${key}`
                listItem.append(link)

                let icon = document.createElement('span')
                icon.classList.add('icon')
                key == 'Офис банка (в т.ч. передвижной пункт)' ? icon.style.cssText = 'border: 7px solid rgb(11 70 119);' : null
                key == 'Удаленная точка банк. обслуживания' ? icon.style.cssText = 'border: 7px solid rgb(89 89 89);' : null;
                key == 'Банкомат для операций с банк. картами, наличными и совершения безналичных платежей' ? icon.style.cssText = 'border: 7px solid rgb(17 175 40);' : null;
                key == 'Банкомат для операций с наличными' ? icon.style.cssText = 'border: 7px solid rgb(82 221 81);' : null;
                key == 'Банковские услуги в отделениях Почты России' ? icon.style.cssText = 'border: 7px solid rgb(16 121 198);' : null;
                key == 'Точка выдачи наличных в магазине' ? icon.style.cssText = 'border: 7px solid rgb(238 67 68);' : null;
                key == 'Точка оплаты наличными' ? icon.style.cssText = 'border: 7px solid rgb(151 162 36);' : null;
                key == 'Микрофинансовая организация' ? icon.style.cssText = 'border: 7px solid rgb(244 109 206);' : null;
                key == 'Страховая организация' ? icon.style.cssText = 'border: 7px solid rgb(231 118 39);' : null;

                link.append(icon)
                // отрисовка списка фильтров по ключу объекта filtersList
        
                filtersList[key] == true ? link.classList.add('active') : link.classList.remove('active') // активность кнопки в зависимости от состояния фильтра
        
                link.addEventListener('click', (e) => {
                    filtersList[key] == true ? filtersList[key] = false : filtersList[key] = true // условия для значений
                    filtersList[key] == true ? link.classList.add('active') : link.classList.remove('active')
        
                    // добавление объекта с ключами и новыми значениями в OM
                    objectManager.setFilter(getFilterFunction(filtersList));
        
                    // функция, которая добавляет в свойство filter содержимое объекта filtersList
                    function getFilterFunction(categories) {
                        return function (obj) {
                            let content = obj.properties.typeObject;
                            return categories[content] 
                        }
                    }
                })
            }
        }
        else {
            let remove = document.querySelectorAll('.menu_header')
            remove.forEach((item) => {
                item.remove()
            })
        }
    }

    nameList.addEventListener('click', (e) => {
        triangleOpen == false ? triangleOpen = true : triangleOpen = false
        triangleSwitch()
        dropFilters()
    })

    regions.forEach((item) => {
        const menu = document.querySelector('.menu__body_list')

        let list = document.createElement('li')
        list.classList.add('title_region_menu')
        menu.append(list)

        console.log(item.name);

        let listLink = document.createElement('a')
        listLink.classList.add('menu_regions_title')
        listLink.textContent = `${item.name}`
        list.append(listLink)

        let container = document.createElement('ul')
        container.classList.add('dropdown-container')
        list.append(container)
        
        for (let i = 0; i < item.oblast.length; i++) {
            let list = document.createElement('li')
            list.classList.add('dropdown-list')
            container.append(list)

            let link = document.createElement('a')
            link.classList.add('dropdown-link')
            link.textContent = `${item.oblast[i]}`
            list.append(link)
        }
    }) // рендеринг содержимого массива regions

    const dropdown = document.querySelectorAll('.menu_regions_title')
    const dropdownLink = document.querySelectorAll('.dropdown-container')
    const drop = document.querySelectorAll('.dropdown-link') // переменные отрисованные js'ом

    drop.forEach((item) => {
        item.addEventListener('click', (e) => {
            if (item.textContent == 'Отделение-НБ Республика Башкортостан') {
                myMap.setCenter([
                    54.735152, 55.958736], 10, {
                        checkZoomRange: true,
                        duration: 200
                    })
            } else {
                myMap.setCenter([
                    56.838011, 60.597474], 10, {
                        checkZoomRange: true,
                        duration: 200
                    })                
            }
            menuOpen = false
            menuSwitch()
        })
    }) // клик по списку с областями регионов

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

    myMap.events.add('click', (e) => {
        myMap.balloon.close()
    }); // закрытие баллуннов по клику по карте

    $.ajax({
        url: "full_80.json"
    }).done(function(data) {
        objectManager.add(data);
    }); // сгенерированный из xls посредством Пайтона в json в objectManager

    const p2 = Promise.resolve(3)
    console.log(p2) // Promise <resolved>: 3

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i
    .test(navigator.userAgent)) {
        objectManager.options.set({balloonPanelMaxMapArea:'Infinity'})
        myMap.options.set({balloonPanelMaxMapArea:'Infinity'})

        if (window.outerWidth < 380) {
            let name = document.querySelector('.name-project')
            name.innerHTML = `Карта доступности <br>финансовых услуг</br>`
            name.style.cssText = 'padding: 14px 5px 0 0;'
        }

    }
}