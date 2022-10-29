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

    //objectManager.objects.options.set('preset', 'islands#greenDotIcon');
    //objectManager.clusters.options.set('preset', 'islands#greenClusterIcons');

    myMap.controls.remove('trafficControl'); // удаляем контроль трафика
    myMap.controls.remove('rulerControl'); // удаляем контрол правил
    //myMap.controls.remove('searchControl'); // удаляем поисковый контрол
    myMap.geoObjects.add(objectManager);
    // objectManager.setFilter('properties.hintContent == "Банк ГПБ (АО)"');

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
            }
        });
    myMap.controls.add(listBoxControl);

    // Добавим отслеживание изменения признака, выбран ли пункт списка.
    listBoxControl.events.add(['select', 'deselect'], function (e) {
        var listBoxItem = e.get('target');
        var filters = ymaps.util.extend({}, listBoxControl.state.get('filters'));
        filters[listBoxItem.data.get('content')] = listBoxItem.isSelected();
        //alert(filters[0])
        listBoxControl.state.set('filters', filters);
    });

    // создается монитор отслеживающий изменения в listBox
    var filterMonitor = new ymaps.Monitor(listBoxControl.state);
    filterMonitor.add('filters', function (filters) {
        // Применим фильтр.
        objectManager.setFilter(getFilterFunction(filters));
    });

    function getFilterFunction(categories) {
        return function (obj) {
            var content = obj.properties.typeObject;
            return categories[content]
        }
    }

    $.ajax({
        url: "rezh.json"
    }).done(function(data) {
        objectManager.add(data);
    });
}