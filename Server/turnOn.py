#!/usr/bin/env python

import paho.mqtt.publish as publish

publish.single("puspus/camera", "200", hostname="test.mosquitto.org")
print("Done")
