import './index.css';
import L from 'leaflet';

// var url = 'https://apihub.kma.go.kr/api/xml?authKey=YGHzUcOxRdSh81HDsRXULg'; /*URL*/

// fetch(url)  // fetch를 통해 API 호출
//   .then(response => response.text())  // 응답을 텍스트로 변환
//   .then(xmlData => {
//     // XML 데이터를 파싱
//     const parser = new DOMParser();
//     const xmlDoc = parser.parseFromString(xmlData, 'text/xml');

//     // 파싱된 XML 데이터를 사용하여 필요한 작업을 수행
//     // 이 부분에서 xmlDoc를 사용하여 원하는 작업을 수행하면 됩니다.
//     console.log(xmlDoc);

//     // saveFilePath를 사용하여 데이터를 저장하거나 추가적인 처리를 수행할 수 있습니다.
//   })
//   .catch(error => {
//     console.error('API 호출 중 오류가 발생했습니다:', error);
//     // 오류 처리를 수행할 수 있습니다.
//   });

//Other code
// var xhr = new XMLHttpRequest();
// var url = 'http://apis.data.go.kr/1360000/FcstZoneInfoService/getFcstZoneCd'; /*URL*/
// var queryParams = '?' + encodeURIComponent('serviceKey') + '=' + '서비스키'; /*Service Key*/
// queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /**/
// queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('10'); /**/
// queryParams += '&' + encodeURIComponent('dataType') + '=' + encodeURIComponent('XML'); /**/
// queryParams += '&' + encodeURIComponent('regId') + '=' + encodeURIComponent('11A00101'); /**/
// xhr.open('GET', url + queryParams);
// xhr.onreadystatechange = function () {
//   if (this.readyState == 4) {
//     alert('Status: ' + this.status + 'nHeaders: ' + JSON.stringify(this.getAllResponseHeaders()) + 'nBody: ' + this.responseText);
//   }
// };


// var platformRLT = 'https://datamall2.mytransport.sg/ltaodataservice/$metadata';
// var accountKey = 'xyxqfXeQTrWv1ALr5kkEmA==';
// var queryParamsplatformRLT = '?' + encodeURIComponent('AccountKey') + '=' + 'xyxqfXeQTrWv1ALr5kkEmA=='; /*Service Key*/
// queryParamsplatformRLT += '&' + encodeURIComponent('TrainLine') + '=' + 'DTL';/*Special param */

// fetch(platformRLT, {
//   mode: 'cors',
//   method: 'GET',
//   headers: {
//     'AccountKey': accountKey,
//     'accept': 'application/json',
//     'TrainLine': 'DTL',
//   },
// })
//   .then(response => {
//     if (!response.ok) {
//       throw new Error('Network response was not ok ' + response.statusText);
//     }
//     return response.json();
//   })
//   .then(data => {
//     const dataDisplay = document.getElementById("sg");

//     data.forEach(station => {
//       const stationLabel = document.createElement("h3");
//       stationLabel.textContent = station.Station;
//       const crowdLevel = document.createElement("h3");
//       crowdLevel.textContent = "Crowd Level: " + station.CrowdLevel;
//       const timeInterval = document.createElement("h4");
//       timeInterval.textContent = station.StartTime + ' - ' + station.EndTime;

//       dataDisplay.appendChild(stationLabel);
//       dataDisplay.appendChild(crowdLevel);
//       dataDisplay.appendChild(timeInterval);
//     });
//   })
//   .catch(error => {
//     console.error('API call error:', error);
//   });

const weatherForecastURL = 'https://api-open.data.gov.sg/v2/real-time/api/twenty-four-hr-forecast';

document.addEventListener('DOMContentLoaded', function () {
  var map = L.map('map').setView([1.3329, 103.7436], 13);
  L.tileLayer('https://www.onemap.gov.sg/maps/tiles/Night/{z}/{x}/{y}.png', {
    detectRetina: true,
    maxZoom: 19,
    minZoom: 11,
    attribution: '<img src="https://www.onemap.gov.sg/web-assets/images/logo/om_logo.png" style="height:20px;width:20px;" />&nbsp;<a href="https://www.onemap.gov.sg/" target="_blank" rel="noopener noreferrer">OneMap</a>&nbsp;&copy;&nbsp;contributors&nbsp;&#124;&nbsp;<a href="https://www.sla.gov.sg/" target="_blank" rel="noopener noreferrer">Singapore Land Authority</a>'
  }).addTo(map);
});

fetch(weatherForecastURL, {
  method: 'GET',
  headers: {}
}).then(response => response.json())
  .then(data => {
    const dataDisplay = document.getElementById("sg");
    const dateDisplay = document.createElement("h4");
    const highTemp = document.getElementById("highTemp");
    const lowTemp = document.getElementById("lowTemp");
    const highHum = document.getElementById("highHum");
    const lowHum = document.getElementById("lowHum");
    const highWind = document.getElementById("highWind");
    const lowWind = document.getElementById("lowWind");
    const windDirectionDisplay = document.getElementById("windDirection");
    const forecast = document.getElementById("forecastDay");
    const forecastNight = document.getElementById("forecastNight");
    const records = data.data.records[0];

    dateDisplay.innerHTML = records.updatedTimestamp;
    forecast.innerHTML = records.general.forecast.text;
    forecastNight.innerHTML = records.periods[1].regions.west.text;
    highTemp.innerHTML = records.general.temperature.high + "ºC";
    lowTemp.innerHTML = records.general.temperature.low + "ºC";
    highHum.innerHTML = records.general.relativeHumidity.high + "%";
    lowHum.innerHTML = records.general.relativeHumidity.low + "%";
    highWind.innerHTML = records.general.wind.speed.high + "m/s";
    lowWind.innerHTML = records.general.wind.speed.low + "m/s";
    windDirectionDisplay.innerHTML = "Wind in " + records.general.wind.direction;
    dataDisplay.innerHTML = null;
    dataDisplay.appendChild(dateDisplay);
    console.log(data);
  })


function App() {
  return (
    <>
      <div id="sg" style={{ top: 0, position: 'absolute' }}>Date</div>
      <div id="valuesDisplay" style={{ bottom: 0, position: 'absolute' }}>
        <table style={{ flex: 1 }}>
          <tr>
            <th></th>
            <th>Highest</th>
            <th>Lowest</th>
          </tr>
          <tr>
            <th>Temperature</th>
            <td id="highTemp"></td>
            <td id="lowTemp"></td>
          </tr>
          <tr>
            <th>Relative Humidity</th>
            <td id="highHum"></td>
            <td id="lowHum"></td>
          </tr>
          <tr>
            <th id="windDirection">Wind in </th>
            <td id="highWind"></td>
            <td id="lowWind"></td>
          </tr>
        </table>
        <div style={{ flex: 2, alignSelf: 'center' }}>
          <h2 style={{ textAlign: 'center', fontSize: '1vw' }}>Forecast for today in the West</h2>
          <h1 id="forecastDay"></h1>
          <h1 id="forecastNight"></h1>
        </div>
      </div >
    </>

  )
}


export default App
