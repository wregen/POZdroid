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
        itemTpl: '{' + POZdroid.Config.getDefaultLang() + '}',
        masked: {
            xtype: 'loadmask',
            message: POZdroid.Config.str('loading')
        }
    },
    load: function () {
        var me = this;
        me.getStore().loadGuides();
    }
});
