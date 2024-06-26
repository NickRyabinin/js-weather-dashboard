/**
 * location.js отправляет запрос к сервису геокодирования https://nominatim.openstreetmap.org/
 * Полученный ответ в виде объекта, содержащего широту, долготу и название локации передаётся в weather.js
 */
import { showMessage } from "./view.js";

function getCoordinates(location) {
  return new Promise((resolve, reject) => {
    const geocodingApiUrl = 'https://nominatim.openstreetmap.org/search';
    const requestUrl = geocodingApiUrl + '?' + 'q=' + encodeURIComponent(location) + '&format=json';
    const request = new XMLHttpRequest();
    request.open('GET', requestUrl, true);
    request.onload = function() {
      handleResponse(request, resolve, reject);
    };
    request.onerror = function() {
      reject('Не могу подключиться к сервису геокодирования');
    };
    request.send();
  });
}

function handleResponse(request, resolve, reject) {
  if (request.status === 200) {
    const data = JSON.parse(request.responseText);
    if (Object.keys(data).length === 0) {
      reject('Местоположение не может быть определено');
      return;
    }
    showMessage('');
    const locationData = {
      locationLat: data[0].lat,
      locationLon: data[0].lon,
      locationName: data[0].display_name
    };
    resolve(locationData);
  } else {
    reject('Что-то пошло не так ...');
  }
}

export { getCoordinates };