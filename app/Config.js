Ext.define('POZdroid.Config', {
    singleton: true,
    config: {
        gmap: {
            defaultcenter: [52.40723, 16.93701],
            maxbounds: {
                latitude: {
                    min: 52.36280586320742,
                    max: 52.4415651807066
                },
                longitude: {
                    min: 16.85032100463866,
                    max: 16.98765010620116
                }
            }

        }
    },
    urls: {
        parkomaty: 'http://www.poznan.pl/featureserver/featureserver.cgi/parkomaty_wgs/all.json?bbox=',
        biletomaty: 'http://www.poznan.pl/featureserver/featureserver.cgi/biletomaty_wgs/all.json?bbox=',
        gmap: 'http://maps.googleapis.com/maps/api/js?sensor=true&key=AIzaSyDITpyopvp-GYLYqHybXfrJqYJFU9wkefc',
        markercluster: './resources/js/markerclusterer_compiled.js',
        streetImg: 'http://maps.googleapis.com/maps/api/streetview?key=AIzaSyDITpyopvp-GYLYqHybXfrJqYJFU9wkefc&size=285x230&fov=90&pitch=0&sensor=false&location=',
        guidesPrefix: 'http://www.poznan.pl/mim/public/',
        guides: 'http://www.poznan.pl/mim/public/przewodnik/przewodnik_m.html?co=guides',
        guidesDetails: 'http://www.poznan.pl/mim/public/przewodnik/przewodnik_m.html?co=guide&lang=pl&pr_id=',
        guidesPois: 'http://www.poznan.pl/mim/public/przewodnik/przewodnik_m.html?co=cat&lang=pl&pr_id=',
        guidesGalery: 'http://www.poznan.pl/mim/public/przewodnik/przewodnik_m.html?co=galeria&lang=pl&object_id=',
        guidesMedia: 'http://www.poznan.pl/mim/public/przewodnik/przewodnik_m.html?co=media&object_id=44126&lang=pl'
    },
    icons: {
        parkomat: './resources/images/parkomat-24.png',
        biletomat: './resources/images/biletomat-24.png'
    },
    gmap: {
        defaultcenter: [52.40723, 16.93701],
        maxbounds: {
            latitude: {
                min: 52.36280586320742,
                max: 52.4415651807066
            },
            longitude: {
                min: 16.85032100463866,
                max: 16.98765010620116
            }
        }

    },
    str: {
        pl: {
            parkomats: 'Mapa Parkomatów',
            ticketMachines: 'Mapa Biletomatów',
            guides: 'Przewodnik',
            about: 'O aplikacji'
        }
    },
    constructor: function(config) {
        this.initConfig(config);
        return this;
    },
    isWebApp: function() {
        if (document.URL.indexOf('http') !== -1) {
            return true;
        }
        return false;
    }

});