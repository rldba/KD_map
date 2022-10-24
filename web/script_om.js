ymaps.ready(init);

function init () {
    var myMap = new ymaps.Map('kd-map', {
            center: [57.371976468912315,61.395945886505494],
            zoom: 13
        }, {
            searchControlProvider: 'yandex#search'
        }),
        objectManager = new ymaps.ObjectManager({
            // Чтобы метки начали кластеризоваться, выставляем опцию.
            clusterize: true,
            // ObjectManager принимает те же опции, что и кластеризатор.
            gridSize: 100,
            clusterDisableClickZoom: false
        });

    // Чтобы задать опции одиночным объектам и кластерам,
    // обратимся к дочерним коллекциям ObjectManager.
    objectManager.objects.options.set('preset', 'islands#greenDotIcon');
    objectManager.clusters.options.set('preset', 'islands#greenClusterIcons');
    myMap.controls.remove('trafficControl'); // удаляем контроль трафика
    myMap.controls.remove('rulerControl'); // удаляем контрол правил
    myMap.geoObjects.add(objectManager);
    // objectManager.setFilter('properties.hintContent == "Банк ГПБ (АО)"');

    $.ajax({
        url: "rezh.json"
    }).done(function(data) {
        objectManager.add(data);
    });
}