Ext.define('POZdroid.view.Menu', {
    extend: 'Ext.Menu',
    requires: [
        'POZdroid.ux.MenuButton'
    ],
    xtype: 'pozMenu',
    config: {
        scrollable: 'vertical',
        defaults: {
            xtype: 'menubutton',
            ui: 'plain'
        },
        items: [
            {
                text: 'Home',
                iconCls: 'home',
                menu: 'pozWelcome'
            },
            {
                text: 'Map',
                iconCls: 'maps',
                menu: 'pozMap'
            },
            {
                text: 'Settings',
                iconCls: 'settings',
                menu: 'pozSettings'
            }
        ],
        width: '30%'
    }
});
