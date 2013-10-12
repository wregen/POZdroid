Ext.define('POZdroid.view.Main', {
    extend: 'Ext.Container',
    xtype: 'pozMain',
    requires: [
        'Ext.TitleBar',
        'POZdroid.view.Welcome',
        'POZdroid.view.Settings',
        'POZdroid.view.Map',
        'POZdroid.ux.ToggleButton'
    ],
    config: {
        fullscreen: true,
        layout: "card",
        scroll: false,
        activeItem: 0,
        items: [{
                itemId: 'pozToolbar',
                docked: 'top',
                xtype: 'toolbar',
                title: 'POZdroid',
                items: [{
                        itemId: 'menu',
                        iconCls: 'list',
                        ui: 'plain',
                        align: 'left',
                        action: 'menu'
                    }, {
                        xtype: 'spacer'
                    }, {
                        xtype: 'togglebtn',
                        itemId: 'pozMap',
                        iconCls: 'maps',
                        ui: 'plain',
                        align: 'right',
                        action: 'mylocation',
                        hidden: true
                    }]
            }, {
                xtype: 'pozWelcome'
            }, {
                xtype: 'pozMap'
            }, {
                xtype: 'pozSettings'
            }]
    }
});
