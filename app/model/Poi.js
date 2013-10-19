Ext.define('POZdroid.model.Poi', {
    extend: 'Ext.data.Model',
    config: {
        idProperty: 'poi',
        fields: [
            {name: 'poi', type: 'int'},
            {name: 'address', type: 'auto'},
            {name: 'desc', type: 'auto'},
            {name: 'email', type: 'auto'},
            {name: 'group', type: 'auto'},
            {name: 'lat', type: 'auto'},
            {name: 'lon', type: 'auto'},
            {name: 'name', type: 'auto'},
            {name: 'gallery', type: 'auto'}
        ]
    }
});
