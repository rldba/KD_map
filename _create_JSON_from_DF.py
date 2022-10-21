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

file_name = "~/PycharmProjects/KD_map/DataSets/bk_geo_clear.xlsx"
df_bk = pd.read_excel(file_name)



with open('bk_.json', 'w') as f:
    f.write("{\n")
    f.write('"type": "FeatureCollection",\n')
    f.write('"features": [\n')
    for i, r in df_bk.iterrows(): #     r['FIAS'] df_bk.loc[i, 'LAT']
        str_KO = r["KO"].replace('"', "'")
        str_DESC = str(r["DESC"]).replace('"', "'")
        str_ADRESS = r["ADRESS"].replace('"', "'")
        f.write("{")
        f.write('"type": "Feature",')
        f.write(f'"id":{i},')
        f.write('"geometry": {"type": "Point", "coordinates": ['+str(r["LAT"])+', '+str(r["LON"])+']},')
        f.write('"properties": {' + f'"balloonContentHeader": "Банкомат {str_KO}", "balloonContentBody": "{str_DESC}", "balloonContentFooter": "{str_ADRESS}", "clusterCaption": "{str_KO}","hintContent": "{str_KO}'+'"}')
        if i+2 <= len(df_bk):
            f.write("},\n")
        else:
            f.write("}\n")
    f.write("]\n")
    f.write("}")

