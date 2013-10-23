Ext.define('POZdroid.Config', {
    singleton: true,
    requires: [
        'Ext.Template'
    ],
    config: {
        icon: {
            parkomat: './resources/images/parkomat-24.png',
            ticketMachine: './resources/images/biletomat-24.png'
        },
        url: {
            parkomats: 'http://www.poznan.pl/featureserver/featureserver.cgi/parkomaty_wgs/all.json?bbox=',
            ticketMachines: 'http://www.poznan.pl/featureserver/featureserver.cgi/biletomaty_wgs/all.json?bbox=',
            streetImg: 'http://maps.googleapis.com/maps/api/streetview?key=AIzaSyDITpyopvp-GYLYqHybXfrJqYJFU9wkefc&size=285x230&fov=90&pitch=0&sensor=false&location=',
            guides: 'http://www.poznan.pl/mim/public/przewodnik/przewodnik_m.html?co=guides',
            guidesPrefix: 'http://www.poznan.pl/mim/public/',
            guidesDetails: 'http://www.poznan.pl/mim/public/przewodnik/przewodnik_m.html?co=guide&lang={lang}&pr_id=',
            guidesPois: 'http://www.poznan.pl/mim/public/przewodnik/przewodnik_m.html?co=cat&lang={lang}&pr_id=',
            guidesGalery: 'http://www.poznan.pl/mim/public/przewodnik/przewodnik_m.html?co=galeria&lang={lang}&object_id='
        },
        defaultLang: 'pl',
        str: {
            pl: {
                ok: 'OK',
                cancel: 'Anuluj',
                error: 'Błąd: ',
                question: 'Pytanie',
                parkomats: 'Mapa Parkomatów',
                ticketMachines: 'Mapa Biletomatów',
                guides: 'Przewodniki',
                about: 'O aplikacji',
                notFound: 'nie znaleziono.',
                loading: 'Ładowanie danych',
                connRequiredTitle: 'Wymagane połączenie z Internetem',
                connRequired: 'Do poprawnego działanie aplikacji niezbędne jest połączenie z Internetem. Wciśnij "OK", połącz się z Internetem; następnie uruchom aplikację ponownie.',
                doYouWantExit: 'Czy zamierzasz zamknąć aplikację?',
                updateTitle: 'Aktualizacja aplikacji',
                update: 'Czy chcesz teraz dokonać aktualizacji?',
                connError: 'Błąd połączenia.',
                outOfPoznan: 'Znajdujesz się poza obszarem Poznania.',
                timeout: 'Przekroczono limit czasu połączenia.',
                trackingOn: 'Włączono śledzenie pozycji.',
                trackingOff: 'Wyłączono śledzenie pozycji.',
                back: 'Wstecz',
                gallery: 'Galeria',
                showOnMap: 'Pokaż na mapie',
                objectsAround: 'Obiekty w okolicy',
                mapAround: 'Mapa okolicy',
                appInfoText: [
                    '<h3>O aplikacji</h3>',
                    '<p>',
                    '"Poznań po drodze" wykorzystuje dane udostępniane przez API serwisu miejskiego Poznania. ',
                    'Szczegóły na strone: <a href="#" onclick="window.open(\'http://egov.psnc.pl/node/29\', \'_system\')">http://egov.psnc.pl/node/29</a>',
                    '</p>',
                    '<p>',
                    '"Poznań po drodze" jest aplikacją Open Source dostępną na licencji GNU GENERAL PUBLIC LICENSE w wersji 3. ',
                    'Źródła znajdują się tutaj: <a href="#" onclick="window.open(\'https://github.com/wregen/POZdroid\',\'_system\')">https://github.com/wregen/POZdroid</a>.',
                    '</p>',
                    '<p>"Poznań po drodze" oparty jest na platformach:',
                    '<ul>',
                    '<li><a href="#" onclick="window.open(\'http://cordova.apache.org/\', \'_system\')">Apache Cordova</a></li>',
                    '<li><a href="#" onclick="window.open(\'http://www.sencha.com/products/touch/\', \'_system\')">Sencha Touch</a></li>',
                    '</ul>',
                    '</p>',
                    '<hr>',
                    '<p>Autorem aplikacji jest <a href="mailto:wregenhobby@gmain.com">Wojciech Regeńczuk</a>.</p>',
                    '<hr>',
                    '<p></p>'
                ].join('')
            },
            en: {
                ok: 'OK',
                cancel: 'Cancel',
                error: 'Error: ',
                question: 'Question',
                parkomats: 'Parkomats',
                ticketMachines: 'Ticket Machines',
                guides: 'Guides',
                about: 'About',
                notFound: 'not found.',
                loading: 'Loading...',
                connRequiredTitle: 'Internetem connection required',
                connRequired: 'The application requires Internet Connection. Tap "OK", connect to the Internet and start the application again.',
                doYouWantExit: 'Do you want to close the application?',
                updateTitle: 'Application update',
                update: 'Do you want to update the application now?',
                connError: 'Connection error.',
                outOfPoznan: 'You are out of the area of Poznan.',
                timeout: 'Timeout.',
                trackingOn: 'Position tracking ON.',
                trackingOff: 'Position tracking OFF',
                back: 'Back',
                gallery: 'Gallery',
                showOnMap: 'Show on map',
                objectsAround: 'Points of interest',
                mapAround: 'Map',
                appInfoText: '<h1>About</h1>'
            }
        },
        gmap: {
            defaultcenter: [52.40523, 16.93301],
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
    str: function(val) {
        var me = this,
                lang = me.getDefaultLang(),
                cnf = me.getStr();
        return cnf[lang][val];
    },
    getCnf: function(config, value) {
        var me = this,
                cnf = me.get(config);
        return cnf[value];

    },
    icon: function(val) {
        return this.getCnf('icon', val);
    },
    url: function(val) {
        var me = this,
                tpl = me.getCnf('url', val),
                lang = me.getDefaultLang(),
                tpl = new Ext.Template(tpl);
        return tpl.apply({lang: lang});
    },
    gmap: function(val) {
        return this.getCnf('gmap', val);
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