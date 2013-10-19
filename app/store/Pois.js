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
        url: POZdroid.Config.urls.guidesPois,
        grouper: {
            groupFn: function(record) {
                return record.get('group');
            }
        },
        sorters: 'name'
    },
    loadPois: function(prId) {
        var me = this;
        POZdroid.app.doRequest(me.getUrl() + prId, function(o) {
            parsed = POZdroid.app.postParseGuides(POZdroid.app.parseGuides(o));
            me.setData(parsed);
        });
    }

});