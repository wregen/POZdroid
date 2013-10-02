Ext.define('POZdroid.view.Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'main',
    requires: [
        'Ext.TitleBar',
        'Ext.Video',
        'POZdroid.view.tab.ParkomatList',
        'POZdroid.view.tab.Map'
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
