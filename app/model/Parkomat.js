Ext.define('Poznan.model.Parkomat', {
    extend: 'Ext.data.Model',
    requires: [
        'Poznan.config.Config'
    ],
    config: {
        fields: [
            {name: 'id', type: 'int'},
            {name: 'geometry', type: 'auto'},
            {name: 'ulica', type: 'auto', mapping: 'properties.ulica'}
        ],
        proxy: {
            // This is the url we always query when searching for tweets
            type: 'jsonp',
            url: Poznan.config.Config.urls.parkomaty,
            reader: {
                type: 'json',
                rootProperty: 'features'
            }
        }
    }
});
