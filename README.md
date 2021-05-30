# ReMedy

ReMedy is a tool that'll remind you to take your medicines according to the schedule. Along with that, it'll also dispense the medicine(s) for you. It'll be beneficial for people that can't keep track of their medicines (mostly the elderly).

The NodeMCU constantly pings our web server for the slot and time to open it and when it's time, NodeMCU triggers the servomechanism according to the time and slots.

## Hardware Used
<ul>
  <li>NodeMCU</li>
  <li>Servo Motors x 2</li>
</ul>

## Installation
Installing Arduino IDE:
<ol>
  <li>Download the latest version of Arduino IDE for your Operating System from their website: https://www.arduino.cc/en/Main/Software</li>
  <li>Open the location where the zip file for Arduino was downloaded, and unzip this folder to your desired location</li>
  <li>Start the Arduino IDE from the unzipped folder</li>
</ol>
<br>
Setup for NodeMCU:
<ol>
  <li>Go to File>>Preferences and paste this url in additional Board Manager URLs: http://arduino.esp8266.com/stable/package_esp8266com_index.json</li>
  <li>Got to Tools>>Boards>>Board Manager</li>
  <li>Type "ESP8266" in the search box</li>
  <li>Select ESP8266 Community and click on install button</li>
  <li>Go to Tools>>Boards>>select NodeMCU</li>
  <li>Select proper Com port</li>
</ol>

Clone this repository, choose the proper boards, check with the COM Ports and feel free to upload the code.
