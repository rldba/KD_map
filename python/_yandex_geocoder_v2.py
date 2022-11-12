# пакетное преобразование адресов в географические координаты и нормализованные адрес
import os
import requests
import pandas as pd

# функция отправляющая запрос к Яндекс геокодеру и возвращающая координаты с нормализованным адресом
# https://geocode-maps.yandex.ru/1.x/?apikey=Ваш_API_key&format=json&geocode=Уфа+Салавата+Юлаева+95
def fetch_coordinates(apikey, address):
    base_url = "https://geocode-maps.yandex.ru/1.x"
    response = requests.get(base_url, params={
        "geocode": address,
        "apikey": apikey,
        "format": "json",
    })
    response.raise_for_status()
    found_places = response.json()['response']['GeoObjectCollection']['featureMember']

    if not found_places:
        return None

    most_relevant = found_places[0]
    norm_name = most_relevant['GeoObject']['metaDataProperty']['GeocoderMetaData']['text']
    lon, lat = most_relevant['GeoObject']['Point']['pos'].split(" ")
    return lon, lat, norm_name

file_name = "~/PycharmProjects/KD_map/python/DataSets/rezh.xlsx"

pd.set_option('display.max_columns', None)

yandex_geo_api_key = os.environ.get("YandexGeoApiKey")

df_rezh = pd.read_excel(file_name)
# добавляем два столбца к DataFrame
df_rezh['LAT'] = 0.0
df_rezh['LON'] = 0.0
df_rezh['ADRESS_NORM'] = " "

# пример применения функции
# result = fetch_coordinates(yandex_geo_api_key, "Уфа театральная 3")
# if result:
#     lon, lat, norm_name = result
#     print(lon, lat, norm_name)
# else:
#     print("Невозможно определить координаты")

# в цикле проходим по всем записям DataFrame и определяем координаты с нормализованным адресом
for i, r in df_rezh.iterrows():
    result = fetch_coordinates(yandex_geo_api_key, str(r['ADRESS']))
    if result:
        df_rezh.loc[i,'LON'], df_rezh.loc[i,'LAT'], df_rezh.loc[i, 'ADRESS_NORM']  = result
        print (i, result)
    else:
        df_rezh.loc[i, 'ADRESS_NORM'] = "Невозможно определить координаты"
        print (i, "Невозможно определить координаты")

df_rezh.to_excel("~/PycharmProjects/KD_map/python/DataSets/rezh_geo.xlsx")

