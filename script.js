let center = [54.72120528974177,55.9409651862885];

function init() {
    let map = new ymaps.Map('kd-map', {
        center: center,
        zoom: 18
    });

    let placemark_vtb = new ymaps.Placemark(center, {
        hasHint: true,
        hintContent: 'Банкомат ВТБ',
        balloonContentHeader: 'Банкомат ВТБ',
        balloonContentBody: 'в зашлюзовой зоне на территории Отделения-НБ Республика Башкортостан',
        // balloonContentFooter: 'Подвал',
    }, {
        iconLayout: 'default#image',
        iconImageHref: 'img/vtb_web_logo.png',
        iconImageSize: [25, 38],
        iconImageOffset: [-22, -44]
    });
    let placemark_alfa = new ymaps.Placemark(center, {
        hasHint: true,
        hintContent: 'Банкомат Альфа-банка',
        balloonContentHeader: 'Банкомат Альфа-банка',
        balloonContentBody: 'в зашлюзовой зоне на территории Отделения-НБ Республика Башкортостан',

    }, {
        iconLayout: 'default#image',
        iconImageHref: 'img/alfabank_web_logo.png',
        iconImageSize: [25, 38],
        iconImageOffset: [5, -44]
    });

    // map.controls.remove('geolocationControl'); // удаляем геолокацию
    map.controls.remove('searchControl'); // удаляем поиск
    map.controls.remove('trafficControl'); // удаляем контроль трафика
    map.controls.remove('typeSelector'); // удаляем тип
    // map.controls.remove('fullscreenControl'); // удаляем кнопку перехода в полноэкранный режим
    // map.controls.remove('zoomControl'); // удаляем контрол зуммирования
    map.controls.remove('rulerControl'); // удаляем контрол правил
    // map.behaviors.disable(['scrollZoom']); // отключаем скролл карты (опционально)

    map.geoObjects.add(placemark_vtb);
    map.geoObjects.add(placemark_alfa);

}

ymaps.ready(init);
