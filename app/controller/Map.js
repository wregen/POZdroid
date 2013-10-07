Ext.define('POZdroid.controller.Map', {
    extend: 'Ext.app.Controller',
    requires: [
        'Ext.Ajax'
    ],
    config: {
        refs: {
            map: 'pozMap'
        },
        control: {
            'pozMap': {
                afterpainted: 'onPainted'
            }
        }
    },
    launch: function() {
        var me = this;
        me.markers = [];
        me.markerCluster = {};
        me.getMap().on('bounds_changed', me.showParkomats, me, {buffer: 1000});
    },
    onPainted: function() {
        var me = this,
                map = me.getMap().getMap();
        me.markerCluster = new MarkerClusterer(map, me.markers);
        me.showParkomatsIfRendered(me.getMap());
    },
    showParkomatsIfRendered: function(pozMap) {
        var me = this;
        if (pozMap.isPainted()) {
            me.showParkomats(pozMap);
        } else {
            pozMap.on('painted', function() {
                me.showParkomats(pozMap);
            }, me, {single: true, delay: 100});
        }
    },
    showParkomats: function(pozMap) {
        var me = this,
                map = pozMap.getMap(),
                bounds = map.getBounds(),
                url = POZdroid.config.Config.urls.parkomaty,
                arr,
                params;
        if (bounds !== undefined) {
            arr = bounds.toUrlValue().split(',');
            params = [arr[1], arr[0], arr[3], arr[2]].join(',');
            Ext.Ajax.request({
                url: url + params,
                scope: me,
                success: function(result) {
                    var json = Ext.decode(result.responseText),
                            l = json.features.length,
                            paintedP = POZdroid.config.Config.parkomatsPainted,
                            i;
                    for (i = 0; i < l; i++) {
                        var id = json.features[i].id;
                        if (Ext.Array.indexOf(paintedP, id) === -1) {
                            marker = me.placeMarker(json.features[i]);
                            paintedP.push(id);
                            if (Ext.Array.indexOf(me.markers, marker) === -1) {
                                me.markers.push(marker);
                            }
                        }
                    }
                    me.markerCluster.clearMarkers();
                    me.markerCluster.addMarkers(me.markers);
                }
            });
        }

    },
    placeMarker: function(o) {
        var me = this,
                map = me.getMap().getMap(),
                gm = (window.google || {}).maps,
                p = o.geometry.coordinates[0],
                u = o.properties.ulica,
                m = new gm.Marker({
            position: new gm.LatLng(p[1], p[0]),
            map: map,
            animation: gm.Animation.DROP,
            title: u,
            icon: {
                url: POZdroid.config.Config.icons.parkomat,
                scaledSize: new gm.Size(24, 75)
            },
            flat: true
        });
        infowindow = new gm.InfoWindow({
            content: u
        });
        gm.event.addListener(m, 'click', function() {
            infowindow.open(map, m);
        });
        return m;
    }
});
