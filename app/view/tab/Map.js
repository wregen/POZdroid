Ext.define('POZdroid.view.tab.Map', {
    extend: 'Ext.Map',
    id: 'tabMap',
    xtype: 'tabMap',
    config: {
        mapOptions: {
            zoom: 16,
            draggable: true,
            overviewMapControl: true,
            visualRefresh: true
        },
        title: 'Mapa',
        iconCls: 'maps',
        styleHtmlContent: true,
        //scrollable: true,
        items: {
            docked: 'top',
            xtype: 'titlebar',
            title: 'Mapa parkomatów'
        }
    }
});
