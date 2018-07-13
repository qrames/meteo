console.log('>>>script.js');

$(document).ready(function() {
    var mymap = L.map('map').setView([46.1369317, -2.4341677], 6);

    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
        maxZoom: 18,
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
            '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
            'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        id: 'mapbox.streets'
    }).addTo(mymap);
    $.get({
        url: 'https://public.opendatasoft.com/api/records/1.0/search/?dataset=contours-simplifies-des-departements-francais-2015&rows=150&facet=code_dept',
        dataType: 'json',
        success: function(data) {
            for (var commune of data['records']) {

                //console.log(commune['fields']['geo_shape']);
                // console.log(commune);
                var polygon = L.geoJSON(commune['fields']['geo_shape']).addTo(mymap);
                $.get({
                    url: 'http://api.openweathermap.org/data/2.5/weather?q='+commune['fields']['nom_chf'] + ',fr&APPID=fb9e60e86f1a9afc0eea0ede160442c7',

                    dataType: 'json',

                    success: function(meteo) {
                        // var marker = L.marker([ commune['fields']['geo_point_2d']['0'], commune['fields']['geo_point_2d']['1'] ]).addTo(mymap).bindPopup(commune['fields']['nom_dept'] + '<br />' + commune['fields']['nom_chf']  + '<br />' + meteo).openPopup();
                        var Tc =  meteo['main']['temp'] - 273.15;
                        var htmlPopup = meteo['name'] + '<br /><img alt="' + meteo['weather']['0']['description'] + '" src="http://openweathermap.org/img/w/' + meteo['weather']['0']['icon'] + '.png">' + Tc;

                        var marker = L.marker([ meteo['coord']['lat'],  meteo['coord']['lon'] ]).addTo(mymap).bindPopup(htmlPopup).openPopup();
                    }

                })
                // polygon.bindPopup(commune['fields']['nom_dept'] + '<br />' + commune['fields']['nom_chf']  + '<br />' + 'meteo');
            }
        }

    });

});
