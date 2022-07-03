# Open-Source JavaScript Network Monitoring Tool
Network Monitoring Tool to monitor network connected devices and components, and trace packets monitor performance of devices implement SNMP protocol, us Graphical UI.
How to run our tool?
	You have to download the project from github "https://github.com/ramymonazaa/Monitor-Tool.git”
 
By Git clone this URL from your terminal.

	Open your Visual Studio Code app (if you haven’t download it)
	From file select “Open Folder” and then the choose the project folder.  

	In file network_active_connected_devices change the ip of getLocalDeviceList in line 22 to your ip 

	You can git your IP by open cmd write ipconfig

	In file TracePackets also change Cap.findDevice in line 22 to your IP but replace the last part with 1, like that 192.168.43.93192.168.43.1

	Download node js node-v16.13.0-x64 or any higher versions https://nodejs.org/en/download/

	Install it.

	In VS code from terminal choose new terminal.

	Use command node --inspect start.js

	Open Firefox browser and take the link copy past in it.
