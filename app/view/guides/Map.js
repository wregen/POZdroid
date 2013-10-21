Ext.define('POZdroid.view.guides.Map', {
    extend: 'Ext.Map',
    xtype: 'pozGuidesMap',
    requires: [
        'POZdroid.Config'
    ],
    config: {
        /**
         * @event poitap
         */
        record: null,
        bounds: null,
        center: null,
        prId: null,
        store: 'Pois',
        useCurrentLocation: false,
        mapOptions: {
            zoom: 14,
            maxZoom: 20,
            minZoom: 10,
            draggable: true,
            visualRefresh: true,
            overviewMapControl: true,
            rotateControl: true,
            rotateControlOptions: {
                position: 1
            },
            streetViewControl: true
        }
    },
    load: function() {
        var me = this,
                record = me.getRecord(),
                center = me.getCenter(),
                bounds = me.getBounds(),
                map = me.getMap(),
                prId = me.getPrId();
        if (record !== null) {
            me.placePoiMarker(record);
        }
        if (center !== null) {
            Ext.defer(me.setMapCenter, 300, me, [center]);
//            me.setMapCenter(center);
        }
        if (bounds !== null) {
            Ext.defer(map.panToBounds, 300, map, [bounds]);
            Ext.defer(map.fitBounds, 500, map, [bounds]);
//            map.panToBounds(bounds);
//            map.fitBounds(bounds);
        }
        if (prId !== null) {
            me.loadData();
        }
    },
    loadData: function() {
        var me = this,
                store = Ext.getStore(me.getStore()),
                prId = me.getPrId();
        store.removeAll();
        store.loadPois(prId);
        store.on('load', me.onStoreLoad, me, {delay: 500});
    },
    onStoreLoad: function(store, records) {
        var me = this,
                miliSec = 0;
        Ext.each(records, function(record) {
            if (Ext.isNumeric(record.get('lat'))) {
                miliSec += 200;
                Ext.defer(me.placePoiMarker, miliSec, me, [record]);
            }
        });
    },
    placePoiMarker: function(record) {
        var me = this,
                gm = (window.google || {}).maps,
                position = new gm.LatLng(record.get('lat'), record.get('lon'));
        var m = new gm.Marker({
            position: position,
            map: me.getMap(),
            animation: gm.Animation.DROP,
            flat: true
        });
        gm.event.addListener(m, 'click', function(m) {
            me.fireEvent('poitap', me, null, null, record);
        });
        return m;

    }
});
