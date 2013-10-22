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
                text: POZdroid.Config.str('guides'),
                iconCls: 'home',
                activateItem: 'pozGuides',
                activateAction: function (item, btn) {
                    item.reset();
                }
            }, {
                text: POZdroid.Config.str('parkomats'),
                iconCls: 'maps',
                activateItem: 'pozMap',
                activateConfig: {
                    markersUrl: POZdroid.Config.url('parkomats'),
                    markerIconUrl: POZdroid.Config.icon('parkomat')
                },
                activateAction: function(item, btn) {
                    item.clearMap();
                    item.fireEvent('bounds_changed', item);
                }
            }, {
                text: POZdroid.Config.str('ticketMachines'),
                iconCls: 'maps',
                activateItem: 'pozMap',
                activateConfig: {
                    markersUrl: POZdroid.Config.url('ticketMachines'),
                    markerIconUrl: POZdroid.Config.icon('ticketMachine')
                },
                activateAction: function(item, btn) {
                    item.clearMap();
                    item.fireEvent('bounds_changed', item);
                }
            }, {
                text: POZdroid.Config.str('about'),
                iconCls: 'settings',
                activateItem: 'pozAbout'
            }],
        width: '30%'
    }
});
