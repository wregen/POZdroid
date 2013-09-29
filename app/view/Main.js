Ext.define('Poznan.view.Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'main',
    requires: [
        'Ext.TitleBar',
        'Ext.Video',
        'Poznan.view.tab.ParkomatList',
        'Poznan.view.tab.Map'
    ],
    config: {
        scroll: false,
        autoMaximize: true,
        tabBarPosition: 'bottom',
        activeItem: 0,
        items: [{
                xtype: 'tabList'
            }, {
                xtype: 'tabMap'
            }]
    }
});
