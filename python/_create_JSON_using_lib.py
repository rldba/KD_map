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
    a1_geometry: dict = {"type": "Point", "coordinates": [r['LAT'],r['LON']]}
    a1_properties: dict = {"balloonContentHeader": r['TYPE'], "balloonContentBody": r['NAME'],
                           "balloonContentFooter": r['ADRESS'], "clusterCaption": "Описание кластерной метки",
                           "hintContent": r['NAME'], "typeObject": r['TYPE']}
    a1_dict: dict = {"type": "Feature", "id":i}
    a1_dict["geometry"] = a1_geometry
    a1_dict["properties"] = a1_properties
    a_dict["features"].append(a1_dict)

# print(json.dumps(a_dict, ensure_ascii=False, indent=1))

#записываем готовый (заполненный) словарь в json файл применяя стандартный метод json.dump
with open ('rezh.json', 'w', encoding='utf8') as f:
    json.dump(a_dict, f, ensure_ascii=False, indent=1)

