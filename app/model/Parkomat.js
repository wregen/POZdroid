Ext.define('Poznan.model.Parkomat', {
    extend: 'Ext.data.Model',
    config: {
        idProperty: 'id',
        fields: [
            {name: 'id', type: 'int'},
            {name: 'geometry', type: 'auto'},
            {name: 'ulica', type: 'auto', mapping: 'properties.ulica'}
        ]
    }
});
