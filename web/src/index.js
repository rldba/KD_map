ymaps.ready(init);

function init () {
    var myMap = new ymaps.Map('kd-map', {
            center: [57.371976468912315,61.395945886505494],
            zoom: 10
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
            clusterIconLayout: "default#pieChart"
        });

    // Чтобы задать опции одиночным объектам и кластерам,
    // обратимся к дочерним коллекциям ObjectManager.

    myMap.controls.remove('trafficControl'); // удаляем контроль трафика
    myMap.controls.remove('rulerControl'); // удаляем контрол правил
    myMap.controls.remove('searchControl'); // удаляем поисковый контрол
    myMap.controls.remove('geolocationControl');
    myMap.controls.remove('zoomControl')
    myMap.geoObjects.add(objectManager);

    var zoomControl = new ymaps.control.ZoomControl({
        options: {
            size: "small",
            position: {
                right: 20,
                bottom: 250
            }
        }
    });
    myMap.controls.add(zoomControl); // кнопки зумма

    let regions = [{
        id: 1,
        name: 'Центральный',
        oblast: [
            'Белгородская область',
            'Брянская область',
            'Владимирская область',
            'Воронежская область',
            'Ивановская область',
            'Калужская область',
            'Костромская область',
            'Курская область',
            'Липецкая область',
            'Москва',
            'Московская область',
            'Орловская область',
            'Рязанская область',
            'Смоленская область',
            'Тамбовская область',
            'Тверская область',
            'Тульская область',
            'Ярославская область'
        ]
    },
    {
        id: 2,
        name: 'Северо-Западный',
        oblast: [
            'Архангельская область',
            'Вологодская область',
            'Калининградская область',
            'Республика Карелия',
            'Республика Коми',
            'Ленинградская область',
            'Мурманская область',
            'Ненецкий автономный округ',
            'Новгородская область',
            'Псковская область',
            'Санкт-Петербург'
        ]
    },
    {
        id: 3,
        name: 'Южный',
        oblast: [
            'Республика Адыгея',
            'Астраханская область',
            'Волгоградская область',
            'Республика Калмыкия',
            'Краснодарский край',
            'Ростовская область',
            'Республика Крым',
            'Севастополь'
        ]
    },
    {
        id: 4,
        name: 'Приволжский',
        oblast: [
            'Республика Башкортостан',
            'Кировская область',
            'Республика Марий Эл',
            'Республика Мордовия',
            'Нижегородская область',
            'Оренбургская область',
            'Пензенская область',
            'Пермский край',
            'Самарская область',
            'Саратовская область',
            'Республика Татарстан',
            'Удмуртская Республика',
            'Ульяновская область',
            'Чувашская Республика'
        ]
    },
    {
        id: 5,
        name: 'Уральский',
        oblast: [
            'Курганская область',
            'Свердловская область',
            'Тюменская область',
            'Ханты-Мансийский автономный округ',
            'Челябинская область',
            'Ямало-Ненецкий автономный округ'
        ]
    },
    {
        id: 6,
        name: 'Сибирский',
        oblast: [
            'Республика Алтай',
            'Алтайский край',
            'Иркутская область',
            'Кемеровская область',
            'Красноярский край',
            'Новосибирская область',
            'Омская область',
            'Томская область',
            'Республика Тыва',
            'Республика Хакасия'
        ]
    },
    {
        id: 7,
        name: 'Дальневосточный',
        oblast: [
            'Амурская область',
            'Республика Бурятия',
            'Еврейская автономная область',
            'Забайкальский край',
            'Камчатский край',
            'Магаданская область',
            'Приморский край',
            'Республика Саха',
            'Сахалинская область',
            'Хабаровский край',
            'Чукотский автономный округ'
        ]
    },
    {
        id: 8,
        name: 'Северо-Кавказский',
        oblast: [
            'Республика Дагестан',
            'Республика Ингушетия',
            'Кабардино-Балкарская Республика',
            'Карачаево-Черкесская Республика',
            'Республика Северная Осетия',
            'Ставропольский край',
            'Чеченская Республика'
        ]
    }]

    const filtersList = {
        'Офис банка (в т.ч. передвижной пункт)': true,
        'Удаленная точка банк. обслуживания': true,
        'Банкомат (с использованием банк. карт)': true,
        'Банкомат (без использования банк. карт)': true,
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

    const border1 = document.createElement('span')
    border1.classList.add('border1')
    const border2 = document.createElement('span')
    border2.classList.add('border2')
    const border3 = document.createElement('span')
    border3.classList.add('border3')
    menuBtn.append(border1, border2, border3) // отрисовка кнопки меню

    const menuSwitch = () => {
        if (menuOpen == true) {
            border1.style.cssText = 'top: 13px; transform: rotate(-45deg);'
            border2.style.cssText = 'transform: rotate(45deg);'
            border3.style.cssText = 'top: 13px; transform: rotate(45deg);'
            sidenav.style.cssText = 'visibility: visible; left: 0'
        }
        else {
            border1.style.cssText = 'top: 4px; transform: none;'
            border2.style.cssText = 'transform: none;'
            border3.style.cssText = 'top: 22px; transform: none;'
            sidenav.style.cssText = 'visibility: hidden; left: -100%'
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
    }) // изменение переменной menuOpen вследствии клика по кнопке меню

    let triangle = document.createElement('span')
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
                key == 'Офис банка (в т.ч. передвижной пункт)' ? icon.style.cssText = 'border: 7px solid rgb(238 67 68);' : console.log('g');
                key == 'Удаленная точка банк. обслуживания' ? icon.style.cssText = 'border: 7px solid rgb(238 67 68);' : console.log('g');
                key == 'Банкомат (с использованием банк. карт)' ? icon.style.cssText = 'border: 7px solid rgb(82 221 81);' : console.log('g');
                key == 'Банкомат (без использования банк. карт)' ? icon.style.cssText = 'border: 7px solid rgb(21 149 251);' : console.log('g');
                key == 'Банковские услуги в отделениях Почты России' ? icon.style.cssText = 'border: 7px solid rgb(21 149 251);' : console.log('g');
                key == 'Точка выдачи наличных в магазине' ? icon.style.cssText = 'border: 7px solid rgb(255 148 47);' : console.log('g');
                key == 'Точка оплаты наличными' ? icon.style.cssText = 'border: 7px solid rgb(11 70 119);' : console.log('g');
                key == 'Микрофинансовая организация' ? icon.style.cssText = 'border: 7px solid rgb(239 126 234);' : console.log('g');
                key == 'Страховая организация' ? icon.style.cssText = 'border: 7px solid rgb(21 149 251);' : console.log('g');

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

    $.ajax({
        url: "rezh.json"
    }).done(function(data) {
        objectManager.add(data);
    });
    // сгенерированный из xls посредством Пайтона в json в objectManager

    regions.forEach((item) => {
        const menu = document.querySelector('.menu__body_list')

        let list = document.createElement('li')
        list.classList.add('title_region_menu')
        menu.append(list)

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
            myMap.panTo([
                57.767265, 40.925358], {
                    delay: 1500
                }
            );
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

    console.log(objectManager.objects.balloon);

//     if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i
//     .test(navigator.userAgent)) {


//     alert("Вы используете мобильное устройство (телефон или планшет).")

// } else alert("Вы используете ПК.")

    // menuItems.forEach((item) => {
    //     item.addEventListener('click', (e) => {
    //         e.preventDefault()

    //         if (item.className === 'menu__link') {
    //             item.classList.add('active')
    //         }
    //         else {
    //             item.classList.remove('active')
    //         }
    //     })
    // })
}