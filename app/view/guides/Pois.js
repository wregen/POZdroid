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
        prId: null,
        store: 'Pois',
        itemTpl: '{name}',
        masked: {
            xtype: 'loadmask',
            message: POZdroid.Config.str('loading')
        },
        grouped: true
    },
    load: function() {
        var me = this,
                store = me.getStore(),
                prId = me.getPrId();
        store.removeAll();
        store.loadPois(prId);

    }
});
