# создание json файла данных из xlsx/БД (pandas dataframe) c использованием стандартной библиотеки json

# требуемый формат json данных для Yandex API ObjectManager
# {
#     "type": "FeatureCollection",
#     "features": [
#         {
#             "type": "Feature",
#             "id": 0,
#             "geometry": {"type": "Point", "coordinates": [55.831903, 37.411961]},
#             "properties": {"balloonContentHeader": "Заголовок балуна", "balloonContentBody": "Тело балуна", "balloonContentFooter": "Подвал балуна", "clusterCaption": "Описание кластерной метки", "hintContent": "Всплывающая подсказка"}
#          },
#         {
#             "type": "Feature",
#             "id": 1,
#             "geometry": {"type": "Point", "coordinates": [55.831903, 37.411961]},
#             "properties": {"balloonContentHeader": "Заголовок балуна", "balloonContentBody": "Тело балуна", "balloonContentFooter": "Подвал балуна", "clusterCaption": "Описание кластерной метки", "hintContent": "Всплывающая подсказка"}
#          },
#     ]
# }

import json
import pandas as pd

pd.set_option('display.max_columns', None)

#читаем данные из xlsx в pandas DataFrame
file_name = "~/PycharmProjects/KD_map/python/DataSets/rezh_geo.xlsx"
df_rezh = pd.read_excel(file_name)

print(df_rezh)

#созадем пустой словарь
a_dict: dict = {"type": "FeatureCollection","features":[]}

# в цикле проходим по всему DataFrame и заполняем список "features":[] соловаря данными по точкам предоставления услуг
for i, r in df_rezh.iterrows():  # r['FIAS'] df_bk.loc[i, 'LAT']
    if r['TYPE'] == "PKO":
        typeObject = "Офис банка (в т.ч. передвижной пункт)"
    elif r['TYPE'] == "UTO":
        typeObject = "Удаленная точка банк. обслуживания"
    elif r['TYPE'] == "BK":
        typeObject = "Банкомат (с использованием банк. карт)"
    elif r['TYPE'] == "BK_":
        typeObject ="Банкомат (без использования банк. карт)"
    elif r['TYPE'] == "RUSSIA_POST":
        typeObject = "Банковские услуги в отделениях Почты России"
    elif r['TYPE'] == "CASH_OUT":
        typeObject = "Точка выдачи наличных в магазине"
    elif r['TYPE'] == "PAY_POINT":
        typeObject = "Точка оплаты наличными"
    elif r['TYPE'] == "MFO":
        typeObject = "Микрофинансовая организация"
    elif r['TYPE'] == "INS":
        typeObject = "Страховая организация"
    else:
        typeObject = r['TYPE']
    a1_geometry: dict = {"type": "Point", "coordinates": [r['LAT'],r['LON']]}
    a1_properties: dict = {"balloonContentHeader": typeObject, "balloonContentBody": r['NAME'],
                           "balloonContentFooter": r['ADRESS'], "clusterCaption": typeObject,
                           "hintContent": r['NAME'], "typeObject": typeObject}
    a1_dict: dict = {"type": "Feature", "id":i}
    a1_dict["geometry"] = a1_geometry

    if r['TYPE'] == "MFO":
        a1_options: dict = {"preset": "islands#violetStretchyIcon", "hideIconOnBalloonOpen": False}
        a1_properties["iconContent"] = "МФО"
        a1_dict["options"] = a1_options
    elif r['TYPE'] == "PKO":
        a1_options: dict = {"preset": "islands#redIcon"}
        a1_properties["iconContent"] = "₽"
        a1_dict["options"] = a1_options
    elif r['TYPE'] == "UTO":
        a1_options: dict = {"preset": "islands#redDotIcon"}
        a1_dict["options"] = a1_options
    elif r['TYPE'] == "BK":
        a1_options: dict = {"preset": "islands#greenMoneyIcon"}
        a1_dict["options"] = a1_options
    elif r['TYPE'] == "BK_":
        a1_options: dict = {"preset": "islands#blueMoneyIcon"}
        a1_dict["options"] = a1_options
    elif r['TYPE'] == "RUSSIA_POST":
        a1_options: dict = {"preset": "islands#bluePostCircleIcon", "hideIconOnBalloonOpen": False}
        a1_dict["options"] = a1_options
    elif r['TYPE'] == "CASH_OUT":
        a1_options: dict = {"preset": "islands#orangeCircleDotIcon"}
        a1_dict["options"] = a1_options
    elif r['TYPE'] == "PAY_POINT":
        a1_options: dict = {"preset": "islands#nightDotIcon"}
        a1_dict["options"] = a1_options
    elif r['TYPE'] == "INS":
        a1_options: dict = {"preset": "islands#blueAttentionIcon"}
        a1_dict["options"] = a1_options

    a1_dict["properties"] = a1_properties
    a_dict["features"].append(a1_dict)

# print(json.dumps(a_dict, ensure_ascii=False, indent=1))

#записываем готовый (заполненный) словарь в json файл применяя стандартный метод json.dump
with open ('rezh.json', 'w', encoding='utf8') as f:
    json.dump(a_dict, f, ensure_ascii=False, indent=1)
