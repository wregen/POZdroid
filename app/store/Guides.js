Ext.define('POZdroid.store.Guides', {
    extend: 'Ext.data.Store',
    requires: [
        'POZdroid.model.Guide'
    ],
    config: {
        proxy: {
            type: 'memory'
        },
        model: 'POZdroid.model.Guide',
        url: POZdroid.Config.urls.guides
    },
    loadGuides: function() {
        var me = this;
        POZdroid.app.doRequest(me.getUrl(), function(o) {
            parsed = POZdroid.app.parseGuides(o);
            me.setData(parsed);
        });
    }

});