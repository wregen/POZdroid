Ext.define('POZdroid.view.guides.Poi', {
    extend: 'Ext.Container',
    xtype: 'pozGuidesPoi',
    requires: [
        'POZdroid.Config'
    ],
    config: {
        styleHtmlContent: true,
        cls: 'guides-details',
        tpl: [
            '<h3>{name}</h3>',
            '{desc}',
            '<address>{address}</address>',
            '<tpl if="gallery != \'\'">',
            '<h3>',
            POZdroid.Config.str('gallery'),
            '</h3>',
            '</tpl>',
            '<tpl for="gallery">',
            '<p>',
            '{name}',
            '<br />',
            '<img width="100%" src="',
            POZdroid.Config.url('guidesPrefix'),
            '{url}" />',
            '</p>',
            '</tpl>'
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
                    itemId: 'activatePoiMap',
                    text: POZdroid.Config.str('showOnMap')
                }, {
                    xtype: 'spacer'
                }]
        }
    },
    load: function() {
        var me = this,
                poi = me.getRecord().get('poi'),
                url = POZdroid.Config.url('guidesGalery') + poi;
        if (poi === null) {
            return;
        }
        Ext.Ajax.request({
            url: url,
            scope: me,
            success: me.prodessSuccess
        });
    },
    prodessSuccess: function(r) {
        var me = this,
                text = r.responseText,
                res = POZdroid.app.parseGuides(text, false);
        res.shift();
        me.getRecord().set('gallery', res);
    }

});
