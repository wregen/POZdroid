Ext.define('POZdroid.store.Pois', {
    extend: 'Ext.data.Store',
    requires: [
        'POZdroid.model.Poi'
    ],
    config: {
        proxy: {
            type: 'memory'
        },
        model: 'POZdroid.model.Poi',
        url: POZdroid.Config.urls.guidesPois
    },
    loadPois: function() {
        var me = this;
        POZdroid.app.doRequest(me.getUrl(), function(o) {
            parsed = POZdroid.app.postParseGuides(me.parseGuides(o));
            me.setData(parsed);
        });
    }

});