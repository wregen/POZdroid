Ext.define('POZdroid.view.Map', {
    extend: 'POZdroid.ux.Map',
    requires: [
    ],
    xtype: 'pozMap',
    config: {
        /**
         * @event mapcleared
         */
        defaultCenter: POZdroid.Config.gmap.defaultcenter,
        gmapUrl: POZdroid.Config.urls.gmap,
        markerClusterUrl: POZdroid.Config.urls.markercluster,
        maxBounds: POZdroid.Config.gmap.maxbounds,
        markersUrl: null,
        markerIconUrl: null,
        useCurrentLocation: false,
        mapOptions: {
            zoom: 16,
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
        },
        mapListeners: {
            bounds_changed: function(mapObj) {
                mapObj.onBoundsChanged();
            }
        },
        listeners: {
            geoupdated: 'processMyLocationUpdate',
            geoerror: 'processMyLocationError',
            activate: 'onActivateMap',
            deactivate: 'onDeactivateMap',
            afterpainted: 'onAfterPainted'
        },
        markers: [],
        markerIds: [],
        markerCluster: {clearMarkers: Ext.emptyFn},
        myLocationMarker: null

    },
    // As I do not know how to buffer mapListeners I am firing bounds_changed on this
    // and adding buffered listener to the constructor
    onBoundsChanged: function() {
        this.fireEvent('bounds_changed', this);
    },
    constructor: function() {
        var me = this;
        me.callParent(arguments);
        me.on('bounds_changed', me.showCustomMarkers, me, {buffer: 800});
    },
    clearMap: function() {
        var me = this,
                markers = me.getMarkers(),
                markersLength = markers.length,
                i;
        me.setTrackMyLocation(false, false);
        for (i = 0; i < markersLength; i++) {
            if (markers[i].setMap) {
                markers[i].setMap(null);
            }
        }
        me.setMarkerIds([]);
        me.setMarkers([]);
        me.getMarkerCluster().clearMarkers();
        me.fireEvent('mapcleared', this);
    },
    onAfterPainted: function() {
        var me = this;
        me.setMarkerCluster(new MarkerClusterer(me.getMap(), me.getMarkers()));
    },
    onDeactivateMap: function() {
        this.clearMap();
    },
    onActivateMap: function() {
        var me = this;
    },
    showCustomMarkers: function() {
        var me = this,
                map = me.getMap(),
                bounds = map.getBounds(),
                url = me.getMarkersUrl(),
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
                            i;
                    for (i = 0; i < l; i++) {
                        var id = json.features[i].id;
                        if (Ext.Array.indexOf(me.getMarkerIds(), id) === -1) {
                            marker = me.placeCustomMarker(json.features[i]);
                            me.getMarkerIds().push(id);
                            if (Ext.Array.indexOf(me.getMarkers(), marker) === -1) {
                                me.getMarkers().push(marker);
                            }
                        }
                    }
                    me.getMarkerCluster().clearMarkers();
                    me.getMarkerCluster().addMarkers(me.getMarkers());
                }
            });
        }
    },
    placeCustomMarker: function(o) {
        var me = this,
                map = me.getMap(),
                gm = (window.google || {}).maps,
                p = o.geometry.coordinates[0],
                desc,
                m = new gm.Marker({
            position: new gm.LatLng(p[1], p[0]),
            map: map,
            clickable: true,
            animation: gm.Animation.DROP,
            icon: {
                url: me.getMarkerIconUrl()
            },
            flat: true
        });
        if (o.properties.ulica !== undefined) {
            desc = {h1:o.properties.ulica, p: ''};
        } else {
            desc = {h1:o.properties.opis, p: o.properties.opis_long};
        }
        gm.event.addListener(m, 'click',function (m){
            var mb = m.latLng.mb,
                lb = m.latLng.lb,
                params = lb + '%20' + mb;
                POZdroid.app.streetView(params, desc);
        });
        return m;
    },
    setTrackMyLocation: function(track, showMgs) {
        var me = this,
                msg = track ? 'Location tracking is ON' : 'Location tracking is OFF',
                myLocationMarker = me.getMyLocationMarker();
        me.updateUseCurrentLocation(track);
        if (showMgs !== false) {
            POZdroid.app.toast(msg);
        }
        if (!track && myLocationMarker && myLocationMarker.setMap) {
            myLocationMarker.setMap(null);
        }
    },
    processMyLocationUpdate: function(mapObj, geo) {
        var me = this,
                gm = (window.google || {}).maps,
                latLng = new gm.LatLng(geo.getLatitude(), geo.getLongitude());
        if (me.isInPozen(geo)) {
            me.setMapCenter(latLng);
            me.placeMyLocationMarker(latLng);
        } else {
            POZdroid.app.toast('Your location is outside of Poznan.', '#ff9922', 5000);
        }
    },
    processMyLocationError: function(mapObj, geo, bTimeout, bPermissionDenied, bLocationUnavailable, message) {
        if (bTimeout) {
            message = 'Timeout occurred.';
        }
        POZdroid.app.toast('Error: ' + message, '#ff2222');
    },
    placeMyLocationMarker: function(latLng) {
        var me = this,
                gm = (window.google || {}).maps,
                myLocationMarker = me.getMyLocationMarker();
        if (myLocationMarker && myLocationMarker.setMap) {
            myLocationMarker.setMap(null);
        }
        me.setMyLocationMarker(new gm.Marker({
            position: latLng,
            map: me.getMap(),
            animation: gm.Animation.BOUNCE,
            flat: true
        }));
    },
    isInPozen: function(geo) {
        var mb = this.getMaxBounds(),
                lat = geo.getLatitude(),
                lon = geo.getLongitude();
        if (lat < mb.latitude.min || lat > mb.latitude.max) {
            return false;
        }
        if (lon < mb.longitude.min || lon > mb.longitude.max) {
            return false;
        }
        return true;
    }
});
