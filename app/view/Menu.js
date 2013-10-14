Ext.define('POZdroid.view.Menu', {
    extend: 'Ext.Menu',
    requires: [
        'POZdroid.ux.MenuButton',
        'POZdroid.Config'
    ],
    xtype: 'pozMenu',
    config: {
        scrollable: 'vertical',
        defaults: {
            xtype: 'menubutton',
            ui: 'plain'
        },
        items: [{
                text: POZdroid.Config.str.pl.news,
                iconCls: 'home',
                activateItem: 'pozNews'
            }, {
                text: POZdroid.Config.str.pl.parkomats,
                iconCls: 'maps',
                activateItem: 'pozMap',
                activateConfig: {
                    markersUrl: POZdroid.Config.urls.parkomaty,
                    markerIconUrl: POZdroid.Config.icons.parkomat
                },
                activateAction: function(item, btn) {
                    item.clearMap();
                    item.fireEvent('bounds_changed', item);
                }
            }, {
                text: POZdroid.Config.str.pl.ticketMachines,
                iconCls: 'maps',
                activateItem: 'pozMap',
                activateConfig: {
                    markersUrl: POZdroid.Config.urls.biletomaty,
                    markerIconUrl: POZdroid.Config.icons.biletomat
                },
                activateAction: function(item, btn) {
                    item.clearMap();
                    item.fireEvent('bounds_changed', item);
                }
            }, {
                text: POZdroid.Config.str.pl.about,
                iconCls: 'settings',
                activateItem: 'pozAbout'
            }],
        width: '30%'
    }
});
