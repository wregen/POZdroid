Ext.define('POZdroid.config.Config', {
    singleton: true,
    config: {
//        /* DATABASE SETTINGS */
//        dbName: 'fbgmag',
//        dbDescription: 'Footballguys Magazine',
//        dbVersion: '1.00',
//        dbSize: 5 * 1024 * 1024,
//        /* AJAX SETTINGS */
//        useAjaxRedirect: true,
//        relativeAjaxRedirect: '../redirect.php'
    },
    parkomatsPainted: [],
    urls: {
        parkomaty: 'http://www.poznan.pl/featureserver/featureserver.cgi/parkomaty_wgs/all.json?bbox=',
        gmap: 'http://maps.googleapis.com/maps/api/js?sensor=true&callback=preInitialize',
        markercluster: './resources/js/markerclusterer_compiled.js'
    },
    icons: {
        parkomat: './resources/images/parkomat-48.png'
    },
    gmap: {
        defaultcenter: [52.40723, 16.93701]//[52.408306, 16.933596]
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