Ext.define('POZdroid.view.guides.Pois', {
    extend: 'Ext.dataview.List',
    xtype: 'pozGuidesPois',
    requires: [
        'POZdroid.Config',
        'POZdroid.store.Pois',
        'Ext.LoadMask'
    ],
    config: {
        xtype: 'list',
        store: 'Pois',
        itemTpl: '{name}',
        masked: {
            xtype: 'loadmask',
            message: 'Ładowanie danych'
        },
        grouped: true
    }
});
