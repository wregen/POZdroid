Ext.define('POZdroid.view.About', {
    extend: 'Ext.Container',
    xtype: 'pozAbout',
    config: {
        scrollable: 'vertical',
        styleHtmlContent: true,
        html: POZdroid.Config.str('appInfoText')
    }
});
