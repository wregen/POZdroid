Ext.define('POZdroid.controller.Map', {
    extend: 'Ext.app.Controller',
    requires: [
        'Ext.Ajax'
    ],
    config: {
        refs: {
            map: 'pozMap',
            trackMyLocationBtn: 'pozMain > toolbar > *[action=mylocation]'
        },
        control: {
            'pozMap': {
                afterpainted: 'onPainted',
                geoupdated: 'processMyLocation',
                geoerror: 'processLocationError',
                deactivate: 'deactivateMap'
            },
            'pozMain > toolbar > *[action=mylocation]': {
                tap: 'trackMyLocation'
            }
        }
    },
    launch: function() {
        var me = this,
                pozMap = me.getMap();
        me.markers = [];
        me.markerCluster = {};
        me.myLocationMarker = null;
        pozMap.on('bounds_changed', me.showParkomats, me, {buffer: 500});
    },
    deactivateMap: function() {
        var me = this,
                pozMap = me.getMap(),
                btn = me.getTrackMyLocationBtn();
        btn.setPress(false);
        pozMap.updateUseCurrentLocation(false);
    },
    onPainted: function() {
        var me = this,
                pozMap = me.getMap(),
                map = pozMap.getMap();
        me.markerCluster = new MarkerClusterer(map, me.markers);
        me.showParkomatsIfRendered(pozMap);
    },
    trackMyLocation: function() {
        var me = this,
                pozMap = me.getMap(),
                btn = me.getTrackMyLocationBtn(),
                pressed = !btn.getIsPressed();
        pozMap.updateUseCurrentLocation(pressed);
        me.showOverlay(pressed);
        if (!pressed && me.myLocationMarker && me.myLocationMarker.setMap) {
            me.myLocationMarker.setMap(null);
        }
    },
    showOverlay: function(tracking) {
        var html = tracking ?
                'Location tracking is ON' : 'Location tracking is OFF';
        POZdroid.app.toast(html);
    },
    isInPozen: function(geo) {
        var mb = POZdroid.config.Config.gmap.maxbounds,
                lat = geo.getLatitude(),
                lon = geo.getLongitude();
        if (lat < mb.latitude.min || lat > mb.latitude.max) {
            return false;
        }
        if (lon < mb.longitude.min || lon > mb.longitude.max) {
            return false;
        }
        return true;
    },
    processMyLocation: function(pozMap, geo) {
        var me = this,
                gm = (window.google || {}).maps,
                latLng = new gm.LatLng(geo.getLatitude(), geo.getLongitude());
        if (me.isInPozen(geo)) {
            pozMap.setMapCenter(latLng);
            this.placeMyLocationMarker(latLng);
        } else {
            POZdroid.app.toast('Your location is not Poznan. <br />There is no way to display parkomats.', '#ff9922', 5000);
        }
    },
    processLocationError: function(pozMap, geo, bTimeout, bPermissionDenied, bLocationUnavailable, message) {
        if (bTimeout) {
            message = 'Timeout occurred.';
        }
        POZdroid.app.toast('Error: ' + message, '#ff2222');
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
                            marker = me.placeParkomatMarker(json.features[i]);
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
    placeParkomatMarker: function(o) {
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
        return m;
    },
    placeMyLocationMarker: function(latLng) {
        var me = this,
                map = me.getMap().getMap(),
                gm = (window.google || {}).maps;
        if (me.myLocationMarker && me.myLocationMarker.setMap) {
            me.myLocationMarker.setMap(null);
        }
        me.myLocationMarker = new gm.Marker({
            position: latLng,
            map: map,
            animation: gm.Animation.BOUNCE,
            flat: true
        });
    }
});
