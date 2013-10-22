Ext.define('POZdroid.view.Main', {
    extend: 'Ext.Container',
    xtype: 'pozMain',
    requires: [
        'Ext.TitleBar',
        'POZdroid.view.Guides',
        'POZdroid.view.About',
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
//                ui: 'plain',
                xtype: 'titlebar',
                title: POZdroid.Config.str('guides'),
                items: [{
                        xtype: 'togglebtn',
                        itemId: 'pozMap',
                        iconCls: 'maps',
                        ui: 'plain',
                        align: 'left',
                        hidden: true
                    }, {
                        xtype: 'button',
                        itemId: 'pozGuidesBack',
                        text: POZdroid.Config.str('back'),
                        ui: 'back',
                        align: 'left',
                        hidden: true
                    }, {
                        xtype: 'spacer'
                    }, {
                        itemId: 'menu',
                        iconCls: 'list',
                        ui: 'plain',
                        align: 'right'
                    }]
            }, {
                xtype: 'pozGuides'
            }, {
                xtype: 'pozMap'
            }, {
                xtype: 'pozAbout'
            }]
    }
});
