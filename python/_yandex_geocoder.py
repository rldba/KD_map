# пакетное преобразование адресов в географические координаты
import os
from yandex_geocoder import Client
from decimal import Decimal
import pandas as pd

file_name = "~/PycharmProjects/KD_map/python/DataSets/rezh.xlsx"

pd.set_option('display.max_columns', None)

yandex_geo_api_key = os.environ.get("YandexGeoApiKey")

df_rezh = pd.read_excel(file_name)
df_rezh['LAT'] = 0.0
df_rezh['LON'] = 0.0
df_rezh['ADRESS_NORM'] = " "

client = Client(yandex_geo_api_key)

for i, r in df_rezh.iterrows():
    result = client.coordinates(str(r['ADRESS']))
    if len(result) > 0:
            df_rezh.loc[i,'LON'], df_rezh.loc[i,'LAT'] = result
    lon, lat = result
    adress = client.address(Decimal(lon), Decimal(lat))
    if len(adress) > 0:
        df_rezh.loc[i, 'ADRESS_NORM'] = adress

df_rezh.to_excel("~/PycharmProjects/KD_map/python/DataSets/rezh_geo.xlsx")
print(df_rezh)
