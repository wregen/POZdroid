Ext.define('Poznan.store.Parkomats', {
    extend: 'Ext.data.Store',
    requires: [
        'Poznan.model.Parkomat'
    ],
    config: {
        model: 'Poznan.model.Parkomat',
        sorters: {
            property: 'ulica',
            direction: 'ASC'
        },
        grouper: {
            groupFn: function(record) {
                return record.get('ulica');
            }
        },
        autoLoad: true
    }
});