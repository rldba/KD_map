import regions from './modules/regions'
// import 

// regions()

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

    // Создадим 9 пунктов выпадающего списка.
    var listBoxItems = ['Офис банка (в т.ч. передвижной пункт)', 'Удаленная точка банк. обслуживания', 'Банкомат (с использованием банк. карт)', 'Банкомат (без использования банк. карт)', 'Банковские услуги в отделениях Почты России', 'Точка выдачи наличных в магазине', 'Точка оплаты наличными', 'Микрофинансовая организация', 'Страховая организация']
            .map(function (title) {
                return new ymaps.control.ListBoxItem({
                    data: {
                        content: title
                    },
                    state: {
                        selected: true
                    }
                })
            }),
        reducer = function (filters, filter) {
            filters[filter.data.get('content')] = filter.isSelected();
            return filters;
        },
                
        // Теперь создадим список, содержащий 9 пунктов.
        listBoxControl = new ymaps.control.ListBox({
            data: {
                content: 'Фильтр',
                title: 'Выберите требуемую категорию'
            },
            items: listBoxItems,
            state: {
                // Признак, развернут ли список.
                expanded: false,
                filters: listBoxItems.reduce(reducer, {})
            },
        });
        // console.log(listBoxItems);
    myMap.controls.add(listBoxControl);

    var zoomControl = new ymaps.control.ZoomControl({
        options: {
            size: "small",
            position: {
                right: 20,
                bottom: 250
            }
        }
    });
    myMap.controls.add(zoomControl);

    // Добавим отслеживание изменения признака, выбран ли пункт списка.
    listBoxControl.events.add(['select', 'deselect'], function (e) {
        var listBoxItem = e.get('target');
        var filters = ymaps.util.extend({}, listBoxControl.state.get('filters'));
        // console.log(filters);
        // console.log(listBoxControl.state.get('filters'));
        filters[listBoxItem.data.get('content')] = listBoxItem.isSelected();
        //alert(filters[0])
        console.log(filters);
        listBoxControl.state.set('filters', filters);
    });

    // создается монитор отслеживающий изменения в listBox
    var filterMonitor = new ymaps.Monitor(listBoxControl.state);
    filterMonitor.add('filters', function (filters) {
        // Применим фильтр.
        console.log(filters);
        objectManager.setFilter(getFilterFunction(filters));

    });

    function getFilterFunction(categories) {
        return function (obj) {
            var content = obj.properties.typeObject;
            return categories[content]
        }
    }

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

    const menuItems = document.querySelectorAll('.menu__link')
    const menuBtn = document.querySelector('.menu__btn')
    const sidenav = document.querySelector('.sidenav')
    let menuOpen = false; // переменные

    for (let key in filtersList) {
        // перебор объекта filtersList
        const sidenavHeader = document.querySelector('.sidenav__header')

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
        console.log(filtersList[key]);
        listItem.append(link)
        // отрисовка списка фильтров по ключу объекта filtersList

        link.addEventListener('click', (e) => {
            filtersList[key] == true ? filtersList[key] = false : filtersList[key] = true // условия для значений

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

    $.ajax({
        url: "rezh.json"
    }).done(function(data) {
        objectManager.add(data);
    });

    // отрисовка фильтров

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

    menuItems.forEach((item) => {
        item.addEventListener('click', (e) => {
            e.preventDefault()

            if (item.className === 'menu__link') {
                item.classList.add('active')
            }
            else {
                item.classList.remove('active')
            }
        })
    }) // активные кнопки в фильтре

}