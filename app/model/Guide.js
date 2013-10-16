Ext.define('POZdroid.model.Guide', {
    extend: 'Ext.data.Model',
    config: {
        idProperty: 'guide',
        fields: [
            {name: 'guide', type: 'int'},
            {name: 'pl', type: 'auto'},
            {name: 'en', type: 'auto'},
            {name: 'de', type: 'auto'}
        ]
    }
});
