Ext.define('POZdroid.view.About', {
    extend: 'Ext.Container',
    xtype: 'pozAbout',
    config: {
        styleHtmlContent: true,
        html: POZdroid.Config.str('appInfoText')
    }
});
