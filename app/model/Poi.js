Ext.define('POZdroid.model.Poi', {
    extend: 'Ext.data.Model',
    config: {
        idProperty: 'subclass',
        fields: [
            {name: 'subclass', type: 'int'},
            {name: 'name', type: 'auto'},
            {name: 'icon_name', type: 'auto'},
            {name: 'icon_url', type: 'auto'}
        ]
    }
});
