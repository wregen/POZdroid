Ext.define('POZdroid.view.guides.Details', {
    extend: 'Ext.Container',
    xtype: 'pozGuidesDetails',
    requires: [
        'POZdroid.Config'
    ],
    config: {
        styleHtmlContent: true,
        cls: 'guides-details',
        tpl: [
            '<img src="', POZdroid.Config.urls.guidesPrefix, '{imgUrl}" width="100%" />',
            '{desc}'
        ],
        scrollable: 'vertical',
        prId: null,
        title: POZdroid.Config.str.pl.guides,
        listeners: {
            painted: 'load'
        },
        items: {
            docked: 'bottom',
            xtype: 'toolbar',
            ui: 'plain',
            items: [{
                    xtype: 'spacer'
                }, {
                    itemId: 'activateGuidesPois',
                    text: 'Obiekty w okolicy'
                }, {
                    itemId: 'activateGuidesMap',
                    text: 'Mapa okolicy'
                }, {
                    xtype: 'spacer'
                }]
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
            scope: me,
            success: me.prodessSuccess,
            failure: me.processError
        });
    },
    prodessSuccess: function(r) {
        var me = this,
                text = r.responseText,
                res;
        if (Ext.isEmpty(text)) {
            me.processError({});
        } else {
            res = POZdroid.app.parseGuides(text, true);
            rec = Ext.create('POZdroid.model.Detail', res);
            me.setRecord(rec);
            me.setMasked(false);
            POZdroid.app.setTitle(rec.get('title'));
        }
    },
    processError: function() {
        var me = this;
        me.setMasked(false);
        POZdroid.app.toast('An error has occured. Please try again.', '#ff2200');
        me.getParent().onBackButtonTap();
    }

});
