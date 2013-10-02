Ext.define('POZdroid.view.tab.ParkomatList', {
    extend: 'Ext.dataview.List',
    xtype: 'tabList',
    config: {
        title: 'Start',
        iconCls: 'home',
        styleHtmlContent: true,
        scrollable: true,
        itemTpl: '{ulica}',
        store: 'Parkomats',
        grouped: true,
        indexBar: true,
        items: {
            docked: 'top',
            xtype: 'titlebar',
            title: 'Wybierz parkomat'
        }
    }
});
