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
        parkomaty: 'http://www.poznan.pl/featureserver/featureserver.cgi/parkomaty_wgs/all.json?bbox='
    },
    icons: {
        parkomat : './resources/images/parkomat-48.png'
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