# mob_rob_projekt
projekt iz izbornog kolegija mobilna robotika, turtlebot segway &amp; bike

## Upravljane robotom pomoću livestream kamere

Upravljanje robotom odvija se pomoću ROS bridge protokola. ROS bridghe pruža nam JSON API koji omogućuje korištenje funkcionalnosti ROS-a iz drugih programa. U ovome projektu koristiti ćemo rosbridge za otvaranje Websocketa na portu 8080 koji ćemo iskoristiti za komunikaciju koristeći Roslibjs knjižnice. Roslibjs je glavna JavaScript knjižnica za interakciju ROS-a putem Web preglednika, omogućuje funkcionalnosit poput objavljivanja i pretplaćivanja poruka, pokretanja servisa i ostalih nužnih funkcionalnosti

## Server side

Za udaljeno upravljanje robotom i snimanje kamerom potrebno je ispuniti nekoliko preduvjeta.

1. Instalirani server na vlastitom računalu (Apache,Nginx...)
2. Instalirani Python i  potrebni paketi (paho-mqtt, urllib2, picamera ....)
3. Na vlastito računalo instalirani ROS
4. Instalirani Rosbridge paketi
```bash
	sudo apt-get install ros-kinetic-rosbridge-server
```

## Postavljanje i korištenje


1. Na vlastiti server postavite sve skripte koje se nalaze u **Server** direktoriju.
2. U datoteci **Server/index.html** [ovdje](https://github.com/Tnegulic/mob_rob_projekt/blob/d31d4b147c177be9289adc4c5960097e644e68d6/Server/index.html#L105) promjenite IP adresu izvora u onu vašeg robota, koju možete pronaći pokretanjem **ifconfig** naredbe na robotu.
3. Sve Python skripte koje se nalaze u direktoriju **Robot** unutar ovog repozitorija potrebno je postaviti na sami robot i **pokrenuti isključivo mqtt skriptu**.

4. Pokrenite **roscore** na vlastito računalo, u novom terminalu pokrenite naredbu
```bash
       roslaunch rosbridge_server rosbridge_websocket.launch
```
i spojite se na robot.

5. U web browser upište **localhost/index.html**
6. Pritiskom na **tipku ON** uključuje se streaming (potrebno je pričekati nekoliko sekundi da se proces pokrene)
7. Upravljajte robotom putem zadanog sučelja

![Slika sučelja](https://raw.githubusercontent.com/Tnegulic/mob_rob_projekt/master/Sucelje/sucelje.png)
