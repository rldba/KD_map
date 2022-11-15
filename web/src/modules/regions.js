const regions = () => {
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

    const map = document.querySelector('.map')

    console.log(map);

    const menuItems = document.querySelectorAll('.menu__link')

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

    dropdown.forEach((item, id) => {
        item.addEventListener('click', (e) => {
            e.preventDefault()
            console.log('item');

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

export default regions

    // function renderList() {
    //     const html = regions ? regions.map(card).join('') : `<div>empty</div>`
    //     menu.innerHTML = html
    // }

    // function card(region) {
    //     return `
    //     <li class="title_region_menu">
    //         <a class="menu_regions_title" href="#">
    //             ${region.name}
    //         </a>
    //         <div class="dropdown-container">
    //             <a class="dropdown-link" href="#">${region.oblast}</a>
    //         </div>
    //     </li>
    //     `
    // }

    // renderList()