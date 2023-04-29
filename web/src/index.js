import menu from "./modules/menu.js";

ymaps.ready(init);

function init () {
    // var geolocation = ymaps.geolocation
    var myMap = new ymaps.Map('kd-map', {
            center: [54.721094, 55.941875],
            zoom: 12
        }, {
            searchControlProvider: 'yandex#search'
        })

        var objectManager = new ymaps.ObjectManager({
            // Чтобы метки начали кластеризоваться, выставляем опцию.
            clusterize: true,
            // ObjectManager принимает те же опции, что и кластеризатор.
            gridSize: 100,
            clusterDisableClickZoom: true,
            clusterHideIconOnBalloonOpen: false,
            // Макет метки кластера pieChart.
            clusterIconLayout: "default#pieChart",
            clusterBalloonContentLayout: "cluster#balloonCarousel"
        });

        // console.log(objectManager.objects.properties);

        menu(objectManager, myMap)
    
    // myMap.behaviors.enable('routeEditor')
    // myMap.behaviors.enable('ruler') Поведения карты (до лучших времен)

    myMap.controls.remove('trafficControl'); // удаляем контроль трафика
    myMap.controls.remove('rulerControl'); // удаляем контрол правил
    myMap.controls.remove('searchControl'); // удаляем поисковый контрол
    myMap.controls.remove('geolocationControl');
    myMap.controls.remove('zoomControl')
    myMap.controls.remove('fullscreenControl')
    myMap.controls.remove('listBox')
    myMap.geoObjects.add(objectManager);

    let searchControl = new ymaps.control.SearchControl({
        options: {
            size: 'large',
            position: {
                top: 70,
                right: 10,
            }
        },
    })
    myMap.controls.add(searchControl);

    let geolocatorControl = new ymaps.control.GeolocationControl({
        options: {
            position: {
                right: 25,
                bottom: 350
            }
        }
    })
    myMap.controls.add(geolocatorControl)

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

    myMap.events.add('click', (e) => {
        myMap.balloon.close()
    }); // закрытие баллуннов по клику по карте

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