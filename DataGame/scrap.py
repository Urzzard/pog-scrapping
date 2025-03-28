import requests
import re
from bs4 import BeautifulSoup
from django.shortcuts import render, redirect
from django.http import HttpResponse
from selenium import webdriver
import time
from decimal import Decimal, InvalidOperation
from .models import SteamGdata, EpicGdata
from django.db.models import F


#VALIDAR LA IMAGEN EXISTENTE

def is_valid_img(url):
    try:
        response = requests.head(url)
        if response.status_code ==200:
            return True
    except requests.RequestException:
        return False
    return False


def scrap_steam(request):
    url = 'https://store.steampowered.com/search/?specials=1&category1=998&ndl=1'
    driver = webdriver.Chrome()
    driver.get(url)

    all_db_games = set(SteamGdata.objects.values_list('name', flat=True))
    found_games = set()

    for _ in range(45):
        driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
        time.sleep(1.6)

    soup = BeautifulSoup(driver.page_source, 'html.parser')
    item = soup.find_all('a', class_='search_result_row ds_collapse_flag')

    #print(f"items encontrados: {len(item)}")
    for games in item:
        game_id = games.get('data-ds-appid')
        name = games.find('span', class_='title').text
        found_games.add(name)
        if games.find('div', class_='discount_block search_discount_block'):
            nprice_str = games.find('div', class_='discount_original_price')
            oprice_str = games.find('div', class_='discount_final_price').text
        img_tag = games.find('img')
        img_resource = img_tag.get('src')
        better_img = img_resource.replace('capsule_sm_120', 'header')
        link = games.get('href')

        if not is_valid_img(better_img):
            print(f"Imagen no valida para {name}, saltando...")
            continue

        """RECORDAR QUE SIEMPRE SE GUARDAN ALGUNOS ENLACES DE IMAGENES RARAS POR ENDE HAY QUE BORRAR MUCHOS CARACTERES EN ALGUNAS OCASIONES

            COMO ESTE QUE BORRAR TODO ESTO "2c4c735432b648ff55c0a39d381d43e5981e5501/capsule_sm_120" Y REEMPLAZAR POR "header"
            https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/582660/2c4c735432b648ff55c0a39d381d43e5981e5501/capsule_sm_120_alt_assets_25.jpg?t=1725555879

            PARA QUE QUEDE ASI
            https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/582660/header_alt_assets_25.jpg?t=1725555879
        
        """

        """AQUI ESTA EL TEMA DE LA CONDICIONAL PARA PODER OBTENER BIEN LOS PRECIOS"""


        if nprice_str:
            nprice_text = nprice_str.text.replace(',', '')
            nprice = Decimal(nprice_text[4:])
            oprice_text = oprice_str.replace(',','')
            oprice = Decimal(oprice_text[4:])
        else:
            nprice = Decimal('0.00')
            oprice = Decimal('0.00')

    
        """ print(f"{game_id} - Nombre: {name} - Precio normal: {nprice}. Precio en Dscto: {oprice}")
        print(f"Img: {better_img}") """

        SteamGdata.objects.update_or_create(
            id_game = game_id,
            defaults={
                'name': name,
                'nprice': nprice,
                'oprice': oprice,
                'img': better_img,
                'link': link
            }
        )
    
    driver.quit()

    missing_games = all_db_games - found_games

    SteamGdata.objects.filter(name__in=missing_games).update(oprice=F('nprice'))

    return HttpResponse("SCRAPING COMPLETO - DATOS IMPRESOS EN CONSOLA")


def scrap_epic(request):
    url = 'https://store.epicgames.com/es-ES/browse?sortBy=relevancy&sortDir=DESC&priceTier=tierDiscouted&category=Game&count=525&start=0'

    driver = webdriver.Chrome()
    driver.get(url)

    all_db_games = set(EpicGdata.objects.values_list('name', flat=True))
    found_games = set()

    total_height = driver.execute_script("return document.body.scrollHeight")

    max_scroll = 50
    scroll_pause = 0.5
    step_height = total_height/max_scroll

    time.sleep(5)
    for _ in range(max_scroll):
        
        driver.execute_script(f"window.scrollBy(0, {step_height});")
        time.sleep(scroll_pause)


    soup = BeautifulSoup(driver.page_source, 'html.parser')
    item = soup.find_all('li', class_='css-lrwy1y')

    print(f"items encontrados: {len(item)}")
    for games in item:
        if games.find('div', class_='css-8uhtka'):
            name = games.find('div', class_='css-8uhtka').text
        elif games.find('div', class_='css-rgqwpc'):
            name = games.find('div', class_='css-rgqwpc').text
    
        found_games.add(name)
        if games.find('div', class_='css-o1hbmr'):
            nprice_str = games.find('div', class_='css-4jky3p').text
            oprice_str = games.find('span', class_='eds_1ypbntd0 eds_1ypbntdc eds_1ypbntdk css-12s1vua').text
        
        if games.find('img', class_='css-1ae5wog'):
            img_tag = games.find('img', class_='css-1ae5wog')
            img_resource = img_tag.get('data-image')

        elif games.find('img', class_='css-uwwqev'):
            img_tag = games.find('img', class_='css-uwwqev')
            img_resource = img_tag.get('data-image')

        get_link = games.find('a', class_='css-g3jcms')
        link = "https://store.epicgames.com"+get_link.get('href')


        nprice_clean = re.search(r"[\d,.]+", nprice_str)
        oprice_clean = re.search(r"[\d,.]+", oprice_str)

        if nprice_clean and oprice_clean:
            try:
                nprice = Decimal(nprice_clean.group().replace(",","."))
                oprice = Decimal(oprice_clean.group().replace(",","."))
            except InvalidOperation:
                nprice = Decimal('0.00')
                oprice = Decimal('0.00')
        else:
            nprice = Decimal('0.00')
            oprice = Decimal('0.00')

    
        print(f"Nombre: {name} - Precio normal: {nprice}. Precio en Dscto: {oprice}")
        print(f"Img: {img_resource}")
        print(f"Link: {link}")

        EpicGdata.objects.update_or_create(
            name=name,
            defaults={
                'name': name,
                'nprice': nprice,
                'oprice': oprice,
                'img': img_resource,
                'link': link
            }
        )

    driver.quit()

    missing_games = all_db_games - found_games
    EpicGdata.objects.filter(name__in=missing_games).update(oprice=F('nprice'))

    return HttpResponse("SCRAPING DE EPIC COMPLETO - DATOS IMPRESOS EN CONSOLA")