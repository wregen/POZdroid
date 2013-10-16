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
                xtype: 'toolbar',
                title: POZdroid.Config.str.pl.news,
                items: [{
                        itemId: 'menu',
                        iconCls: 'list',
                        ui: 'plain',
                        align: 'left'
                    }, {
                        xtype: 'spacer'
                    }, {
                        xtype: 'togglebtn',
                        itemId: 'pozMap',
                        iconCls: 'maps',
                        ui: 'plain',
                        align: 'right',
                        hidden: true
                    }, {
                        xtype: 'button',
                        itemId: 'pozGuidesBack',
                        text: 'Back',
                        ui: 'back',
                        align: 'right',
                        hidden: true
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
