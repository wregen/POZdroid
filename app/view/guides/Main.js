Ext.define('POZdroid.view.guides.Main', {
    extend: 'Ext.dataview.List',
    xtype: 'pozGuidesMain',
    requires: [
        'POZdroid.Config',
        'POZdroid.store.Guides',
        'Ext.LoadMask'
    ],
    config: {
        xtype: 'list',
        store: 'Guides',
        itemTpl: '{pl}',
        masked: {
            xtype: 'loadmask',
            message: 'Ładowanie danych'
        }
    },
    load: function () {
        var me = this;
        me.getStore().loadGuides();
    }
});
