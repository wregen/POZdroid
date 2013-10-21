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
            '<h3>Galeria</h3>',
            '</tpl>',
            '<tpl for="gallery">',
            '<p>',
            '{name}',
            '<br />',
            '<img width="100%" src="',
            POZdroid.Config.urls.guidesPrefix,
            '{url}" />',
            '</p>',
            '</tpl>'
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
                    itemId: 'activatePoiMap',
                    text: 'Pokaż na mapie'
                }, {
                    xtype: 'spacer'
                }]
        }
    },
    load: function() {
        var me = this,
                poi = me.getRecord().get('poi'),
                url = POZdroid.Config.urls.guidesGalery + poi;
        if (poi === null) {
            return;
        }

//        me.setMasked({
//            xtype: 'loadmask',
//            indicator: true,
//            message: 'Ładowanie danych....'
//        });
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
//        me.setMasked(false);
    }

});
