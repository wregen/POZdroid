Ext.define('POZdroid.view.guides.Details', {
    extend: 'Ext.Container',
    xtype: 'pozGuidesDetails',
    requires: [
        'POZdroid.Config',
        'POZdroid.model.Detail'
    ],
    config: {
        styleHtmlContent: true,
        cls: 'guides-details',
        tpl: [
            '<img src="', POZdroid.Config.url('guidesPrefix'), '{imgUrl}" width="100%" />',
            '{desc}'
        ],
        scrollable: 'vertical',
        prId: null,
        title: POZdroid.Config.str('guides'),
        items: {
            docked: 'bottom',
            xtype: 'toolbar',
            ui: 'plain',
            items: [{
                    xtype: 'spacer'
                }, {
                    itemId: 'activateGuidesPois',
                    text: POZdroid.Config.str('objectsAround')
                }, {
                    itemId: 'activateGuidesMap',
                    text: POZdroid.Config.str('mapAround')
                }, {
                    xtype: 'spacer'
                }]
        },
        listeners: {
            element: 'element',
            delegate: 'a',
            tap: 'tapHandler'
        }
    },
    tapHandler: function(e, t) {
        e.stopEvent();
        e.preventDefault();
        e.stopPropagation();
        var href = t.href;
        t.href = "#";
        window.open(href, '_system');
    },
    load: function() {
        var me = this,
                prId = me.getPrId(),
                url;
        if (prId === null) {
            return;
        }
        url = POZdroid.Config.url('guidesDetails') + prId;
        me.setMasked({
            xtype: 'loadmask',
            indicator: true,
            message: POZdroid.Config.str('loading')
        });
        Ext.Ajax.request({
            url: url,
            scope: me,
            success: me.processSuccess,
            failure: me.processError
        });
    },
    processSuccess: function(r) {
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
        POZdroid.app.toast(POZdroid.Config.str('connError'), '#ff2200');
        me.getParent().onBackButtonTap();
    }

});
