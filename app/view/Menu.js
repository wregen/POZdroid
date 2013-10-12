Ext.define('POZdroid.view.Menu', {
    extend: 'Ext.Menu',
    requires: [
        'POZdroid.ux.MenuButton',
        'POZdroid.config.Config'
    ],
    xtype: 'pozMenu',
    config: {
        scrollable: 'vertical',
        defaults: {
            xtype: 'menubutton',
            ui: 'plain'
        },
        items: [{
                text: 'Home',
                iconCls: 'home',
                activateItem: 'pozWelcome'
            }, {
                text: 'Parkomats',
                iconCls: 'maps',
                activateItem: 'pozMap',
                activateConfig: {
                    markersUrl: POZdroid.config.Config.urls.parkomaty,
                    markerIconUrl: POZdroid.config.Config.icons.parkomat
                },
                activateAction: function(map, btn) {
                    map.clearMap();
                    POZdroid.app.setTitle(btn.getText());
                    map.fireEvent('bounds_changed', map);
                }
            }, {
                text: 'Biletomats',
                iconCls: 'maps',
                activateItem: 'pozMap',
                activateConfig: {
                    markersUrl: POZdroid.config.Config.urls.biletomaty,
                    markerIconUrl: POZdroid.config.Config.icons.biletomat
                },
                activateAction: function(map, btn) {
                    map.clearMap();
                    POZdroid.app.setTitle(btn.getText());
                    map.fireEvent('bounds_changed', map);
                }
            }, {
                text: 'Settings',
                iconCls: 'settings',
                activateItem: 'pozSettings'
            }],
        width: '30%'
    }
});
