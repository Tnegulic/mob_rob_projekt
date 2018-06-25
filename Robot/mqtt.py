import paho.mqtt.client as mqtt
import os
import subprocess
import signal
import time
import urllib2

turnOn = False
pro = 0


def internet_on():
    try:
        urllib2.urlopen('http://test.mosquitto.org', timeout=1)
        return False
    except urllib2.URLError as err: 
        return True

def on_connect(client, userdata, flags, rc):
    print("Connected with result code "+str(rc))

    client.subscribe("puspus/camera")

def on_message(client, userdata, msg):
    global turnOn
    global pro
    if msg.payload == "200" and not turnOn:
	 pro = subprocess.Popen("python3 ~/stream8.py", stdout=subprocess.PIPE, 
                       shell=True, preexec_fn=os.setsid)
	 print(msg.payload)
	 turnOn = True
    elif msg.payload == "400" and turnOn:
	os.killpg(os.getpgid(pro.pid), signal.SIGTERM)
	print(msg.payload)
	turnOn = False

while(internet_on()):
	time.sleep(1)

client = mqtt.Client()
client.on_connect = on_connect
client.on_message = on_message
client.connect("test.mosquitto.org", 1883)

client.loop_forever()
