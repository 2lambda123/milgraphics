// 
function canalize(feature){
  var direction, width;
  var points = feature.geometry.coordinates;
  var geometry = {"type": "MultiLineString"};
  var scale = ms.geometry.distanceBetween(points[0],points[1]);
  var pMid = ms.geometry.pointBetween(points[0],points[1], 0.5);
  var length = ms.geometry.distanceBetween(pMid,points[2]);
  var bearing = ms.geometry.bearingBetween(points[0],points[1]);
  
  geometry.coordinates = [];
  
  var geom = [points[0]];
  geom.push(ms.geometry.toDistanceBearing(points[0], length, bearing+90));
  geom.push(ms.geometry.toDistanceBearing(points[1], length, bearing+90));  
  geom.push(points[1]);
  geometry.coordinates.push(geom)
  
  geom = [];
  geom.push(ms.geometry.toDistanceBearing(points[0], scale*0.2, bearing+45));
  geom.push(ms.geometry.toDistanceBearing(points[0], scale*0.2, bearing+45+180));  
  geometry.coordinates.push(geom)
  
  geom = [];
  geom.push(ms.geometry.toDistanceBearing(points[1], scale*0.2, bearing-45));
  geom.push(ms.geometry.toDistanceBearing(points[1], scale*0.2, bearing-45+180));  
  geometry.coordinates.push(geom)  
  
  return {geometry:geometry};
}

module.exports = canalize;