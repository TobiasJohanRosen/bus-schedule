export const environment = {
  production: true,
  endpoints: {
    realtime: 'http://localhost/api/realtime.php',
    failover: 'http://localhost/api/failover.php'
  },
  transitLines: [6, 11, 770, 804],
  transitUrls: {
    11: 'https://www.ul.se/api/journey/search?changeTimeType=0&dateTime=&from=Uppsala+Business+Park+Norra+(Uppsala)&fromPointId=700527&fromPointType=0&maxWalkDistance=3000&priorityType=0&to=Uppsala+Centralstation+(Uppsala)&toPointId=700600&toPointType=0&trafficTypes=1,2,3,4,5,6,7,8,9,10,11&travelWhenType=2&via=&viaPointId=&walkSpeedType=0',
    804: 'https://www.ul.se/api/journey/search?changeTimeType=0&dateTime=&from=Uppsala+Business+Park+Norra+(Uppsala)&fromPointId=700527&fromPointType=0&maxWalkDistance=3000&priorityType=0&to=Uppsala+Samariterhemmet+(Uppsala)&toPointId=700259&toPointType=0&trafficTypes=1,2,3,4,5,6,7,8,9,10,11&travelWhenType=2&via=&viaPointId=&walkSpeedType=0',
    770: 'https://www.ul.se/api/journey/search?changeTimeType=0&dateTime=&from=Uppsala+Business+Park+Norra+(Uppsala)&fromPointId=700527&fromPointType=0&maxWalkDistance=3000&priorityType=0&to=Mejramsvägen+(Storvreta)&toPointId=700612&toPointType=0&trafficTypes=1,2,3,4,5,6,7,8,9,10,11&travelWhenType=2&via=&viaPointId=&walkSpeedType=0',
    6: 'https://www.ul.se/api/journey/search?changeTimeType=0&dateTime=&from=Södra+Slavstavägen+(Uppsala)&fromPointId=700441&fromPointType=0&maxWalkDistance=3000&priorityType=0&to=Uppsala+Centralstation+(Uppsala)&toPointId=700600&toPointType=0&trafficTypes=1,2,3,4,5,6,7,8,9,10,11&travelWhenType=2&via=&viaPointId=&walkSpeedType=0'
  }
};
