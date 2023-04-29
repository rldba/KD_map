const filterList = function (objectManager) {
    const filtersList = {
        'Офис банка (в т.ч. передвижной пункт)': true,
        'Удаленная точка банк. обслуживания': true,
        'Банкомат для операций с банк. картами, наличными и совершения безналичных платежей': true,
        'Устройство (банкомат) для операций по приему наличных': true,
        'Банковские услуги в отделениях Почты России': true,
        'Точка выдачи наличных в магазине': true,
        'Точка оплаты наличными': true,
        'Микрофинансовая организация': true,
        'Страховая организация': true,
        }

    const nameList = document.querySelector('.name_list')
    let triangleOpen = false
    const sidenavHeader = document.querySelector('.filter_container')
    const triangle = document.createElement('span')
    triangle.classList.add('triangle')
    nameList.append(triangle)

    //верстка перечня фильтров
    const nav = sidenavHeader.innerHTML = `
    <nav class='menu_header'>
    <ul class='menu__list'>
        <li class='menu__item'></li>
    </ul>
    </nav>`

    const triangleSwitch = () => {
        triangleOpen == true ? triangle.style.cssText = 'bottom: 5px; transform: rotate(180deg);' : triangle.style.cssText = 'transform: none'
    }
        
    const dropFilters = () => {
        if (triangleOpen == true) {
            for (let key in filtersList) {
    
                const menuItem = document.querySelector('.menu__item')
                const link = document.createElement('a')
                link.classList.add('menu__link')
                link.textContent = `${key}`
                menuItem.append(link)
    
                const icon = document.createElement('span')
                icon.classList.add('icon')
    
                key == 'Офис банка (в т.ч. передвижной пункт)' ? icon.style.cssText = 'border: 7px solid rgb(181 30 255);' : null
                key == 'Удаленная точка банк. обслуживания' ? icon.style.cssText = 'border: 7px solid rgb(89 89 89);' : null;
                key == 'Банкомат для операций с банк. картами, наличными и совершения безналичных платежей' ? icon.style.cssText = 'border: 7px solid rgb(17 175 40);' : null;
                key == 'Устройство (банкомат) для операций по приему наличных' ? icon.style.cssText = 'border: 7px solid rgb(82 221 81);' : null;
                key == 'Банковские услуги в отделениях Почты России' ? icon.style.cssText = 'border: 7px solid rgb(16 121 198);' : null;
                key == 'Точка выдачи наличных в магазине' ? icon.style.cssText = 'border: 7px solid rgb(238 67 68);' : null;
                key == 'Точка оплаты наличными' ? icon.style.cssText = 'border: 7px solid rgb(255 210 30);' : null;
                key == 'Микрофинансовая организация' ? icon.style.cssText = 'border: 7px solid rgb(244 109 206);' : null;
                key == 'Страховая организация' ? icon.style.cssText = 'border: 7px solid rgb(231 118 39);' : null;
    
                link.append(icon) // отрисовка списка фильтров по ключу объекта filtersList
    
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
            let remove = document.querySelectorAll('.menu__link')
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
}

export default filterList