Ext.define('POZdroid.view.guides.Details', {
    extend: 'Ext.Container',
    xtype: 'pozGuidesDetails',
    requires: [
        'POZdroid.Config'
    ],
    config: {
        styleHtmlContent: true,
        tpl: '<h3>{title}</h3>{desc}',
        scrollable: 'vertical',
        prId: null,
        listeners: {
            painted: 'load'
        }
    },
    load: function() {
        var me = this,
                prId = me.getPrId(),
                url;
        if (prId === null) {
            return;
        }
        url = POZdroid.Config.urls.guidesDetails + prId;
        me.setMasked({
            xtype: 'loadmask',
            indicator: true,
            message: 'Ładowanie danych....'
        });
        Ext.Ajax.request({
            url: url,
            success: function(r) {
                var text = r.responseText,
                        res = POZdroid.app.parseGuides(text, true);
                rec = Ext.create('POZdroid.model.Detail', res);
                me.setRecord(rec);
                me.setMasked(false);
            }
        });

    }

});
