# Documentation
## To run the script install modules bellow:
1. npm install -f node-sass@4.14.1
1. npm install angular
1. npm install e2e
1. npm install
1. npm audit fix
1. sudo apt install php7.4

# Problem with times
Navigate to the "bus-schedule-cache-system" folder and input `sudo rm -r cache/ && mkdir cache`

# Potential problem with UL data
The bus data we get from UL is one hour from departure. When displaying busses that departure later than one hour there is a problem, we don't have the data at the time.

An example is a bus that departure in one hour and 20 min, we get the data one hour before departure, then there are 20 minutes (1 hour 20 minutes — 1 hour) where nothing will be displayed.
