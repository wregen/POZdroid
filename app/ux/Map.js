/**
 * Wraps a Google Map in an Ext.Component using the [Google Maps API](http://code.google.com/apis/maps/documentation/v3/introduction.html).
 */
Ext.define('POZdroid.ux.Map', {
    extend: 'Ext.Container',
    xtype: 'map',
    requires: ['Ext.util.Geolocation'],
    isMap: true,
    config: {
        /**
         * @event maprender
         * @event centerchange
         * @event typechange
         * @event zoomchange
         */

        baseCls: Ext.baseCSSPrefix + 'map',
        useCurrentLocation: false,
        map: null,
        geo: null,
        mapOptions: {},
        mapListeners: null
    },
    createScript: function(url, fn) {
        var script = document.createElement('script');
        script.setAttribute("src", url);
        script.setAttribute("async", true);
        script.setAttribute("type", "text/javascript");
        Ext.getHead().appendChild(script);
        script.onload = fn;
    },
    constructor: function() {
        var me = this;
        me.callParent(arguments);
        me.appConfig = POZdroid.config.Config;
        preInitialize = Ext.bind(me.preInitialize, me);
    },
    initialize: function() {
        this.callParent();
        this.initMap();

        this.on({
            painted: 'onPainted',
            scope: this
        });
        this.innerElement.on('touchstart', 'onTouchStart', this);
    },
    preInitialize: function() {
        var me = this,
                p = me.appConfig.gmap.defaultcenter;
        me.setMapCenter(new google.maps.LatLng(p[0], p[1]));
        me.createScript(me.appConfig.urls.markercluster, function() {
            me.doResize();
        });
    },
    onPainted: function() {
        var me = this;
        me.createScript(me.appConfig.urls.gmap);
    },
    doResize: function() {
        var gm = (window.google || {}).maps,
                map = this.getMap();

        if (gm && map) {
            gm.event.trigger(map, "resize");
        }
        this.fireEvent('afterpainted', this);
    },
    initMap: function() {
        var map = this.getMap();
        if (!map) {
            var gm = (window.google || {}).maps;
            if (!gm)
                return null;

            var element = this.mapContainer,
                    mapOptions = this.getMapOptions(),
                    event = gm.event,
                    me = this;

            //Remove the API Required div
            if (element.dom.firstChild) {
                Ext.fly(element.dom.firstChild).destroy();
            }

            if (Ext.os.is.iPad) {
                Ext.merge({
                    navigationControlOptions: {
                        style: gm.NavigationControlStyle.ZOOM_PAN
                    }
                }, mapOptions);
            }

            mapOptions.mapTypeId = mapOptions.mapTypeId || gm.MapTypeId.ROADMAP;
            mapOptions.center = mapOptions.center || new gm.LatLng(37.381592, -122.135672); // Palo Alto

            if (mapOptions.center && mapOptions.center.latitude && !Ext.isFunction(mapOptions.center.lat)) {
                mapOptions.center = new gm.LatLng(mapOptions.center.latitude, mapOptions.center.longitude);
            }

            mapOptions.zoom = mapOptions.zoom || 12;

            map = new gm.Map(element.dom, mapOptions);
            this.setMap(map);

            event.addListener(map, 'zoom_changed', Ext.bind(me.onZoomChange, me));
            event.addListener(map, 'maptypeid_changed', Ext.bind(me.onTypeChange, me));
            event.addListener(map, 'center_changed', Ext.bind(me.onCenterChange, me));
            event.addListenerOnce(map, 'tilesloaded', Ext.bind(me.onTilesLoaded, me));
            this.addMapListeners();
        }
        return this.getMap();
    },
    // added for backwards compatibility for touch < 2.3
    renderMap: function() {
        this.initMap();
    },
    getElementConfig: function() {
        return {
            reference: 'element',
            className: 'x-container',
            children: [{
                    reference: 'innerElement',
                    className: 'x-inner',
                    children: [{
                            reference: 'mapContainer',
                            className: Ext.baseCSSPrefix + 'map-container'
                        }]
                }]
        };
    },
    onTouchStart: function(e) {
        e.makeUnpreventable();
    },
    applyMapOptions: function(options) {
        return Ext.merge({}, this.options, options);
    },
    updateMapOptions: function(newOptions) {
        var gm = (window.google || {}).maps,
                map = this.getMap();

        if (gm && map) {
            map.setOptions(newOptions);
        }
    },
    doMapCenter: function() {
        this.setMapCenter(this.getMapOptions().center);
    },
    getMapOptions: function() {
        return Ext.merge({}, this.options || this.getInitialConfig('mapOptions'));
    },
    updateUseCurrentLocation: function(useCurrentLocation) {
        this.setGeo(useCurrentLocation);
        if (!useCurrentLocation) {
            this.setMapCenter();
        }
    },
    applyGeo: function(config) {
        return Ext.factory(config, Ext.util.Geolocation, this.getGeo());
    },
    updateGeo: function(newGeo, oldGeo) {
        var events = {
            locationupdate: 'onGeoUpdate',
            locationerror: 'onGeoError',
            scope: this
        };

        if (oldGeo) {
            oldGeo.un(events);
        }

        if (newGeo) {
            newGeo.on(events);
            newGeo.updateLocation();
        }
    },
    // @private
    onTilesLoaded: function() {
        this.fireEvent('maprender', this, this.getMap());
    },
    // @private
    addMapListeners: function() {
        var gm = (window.google || {}).maps,
                map = this.getMap(),
                mapListeners = this.getMapListeners();


        if (gm) {
            var event = gm.event,
                    me = this,
                    listener, scope, fn, callbackFn, handle;
            if (Ext.isSimpleObject(mapListeners)) {
                for (var eventType in mapListeners) {
                    listener = mapListeners[eventType];
                    if (Ext.isSimpleObject(listener)) {
                        scope = listener.scope;
                        fn = listener.fn;
                    } else if (Ext.isFunction(listener)) {
                        scope = null;
                        fn = listener;
                    }

                    if (fn) {
                        callbackFn = function() {
                            this.fn.apply(this.scope, [me]);
                            if (this.handle) {
                                event.removeListener(this.handle);
                                delete this.handle;
                                delete this.fn;
                                delete this.scope;
                            }
                        };
                        handle = event.addListener(map, eventType, Ext.bind(callbackFn, callbackFn));
                        callbackFn.fn = fn;
                        callbackFn.scope = scope;
                        if (listener.single === true)
                            callbackFn.handle = handle;
                    }
                }
            }
        }
    },
    // @private
    onGeoUpdate: function(geo) {
        if (geo) {
            this.setMapCenter(new google.maps.LatLng(geo.getLatitude(), geo.getLongitude()));
        }
    },
    // @private
    onGeoError: Ext.emptyFn,
    /**
     * Moves the map center to the designated coordinates hash of the form:
     *
     *     { latitude: 37.381592, longitude: -122.135672 }
     *
     * or a google.maps.LatLng object representing to the target location.
     *
     * @param {Object/google.maps.LatLng} coordinates Object representing the desired Latitude and
     * longitude upon which to center the map.
     */
    setMapCenter: function(coordinates) {
        var me = this,
                map = me.getMap(),
                mapOptions = me.getMapOptions(),
                gm = (window.google || {}).maps;
        if (gm) {
            if (!coordinates) {
                if (map && map.getCenter) {
                    coordinates = map.getCenter();
                }
                else if (mapOptions.hasOwnProperty('center')) {
                    coordinates = mapOptions.center;
                }
                else {
                    coordinates = new gm.LatLng(37.381592, -122.135672); // Palo Alto
                }
            }

            if (coordinates && !(coordinates instanceof gm.LatLng) && 'longitude' in coordinates) {
                coordinates = new gm.LatLng(coordinates.latitude, coordinates.longitude);
            }

            if (!map) {
                mapOptions.center = mapOptions.center || coordinates;
                me.renderMap();
                map = me.getMap();
            }

            if (map && coordinates instanceof gm.LatLng) {
                map.panTo(coordinates);
            }
            else {
                this.options = Ext.apply(this.getMapOptions(), {
                    center: coordinates
                });
            }
        }
    },
    // @private
    onZoomChange: function() {
        var mapOptions = this.getMapOptions(),
                map = this.getMap(),
                zoom;

        zoom = (map && map.getZoom) ? map.getZoom() : mapOptions.zoom || 10;

        this.options = Ext.apply(mapOptions, {
            zoom: zoom
        });

        this.fireEvent('zoomchange', this, map, zoom);
    },
    // @private
    onTypeChange: function() {
        var mapOptions = this.getMapOptions(),
                map = this.getMap(),
                mapTypeId;

        mapTypeId = (map && map.getMapTypeId) ? map.getMapTypeId() : mapOptions.mapTypeId;

        this.options = Ext.apply(mapOptions, {
            mapTypeId: mapTypeId
        });

        this.fireEvent('typechange', this, map, mapTypeId);
    },
    // @private
    onCenterChange: function() {
        var mapOptions = this.getMapOptions(),
                map = this.getMap(),
                center;

        center = (map && map.getCenter) ? map.getCenter() : mapOptions.center;

        this.options = Ext.apply(mapOptions, {
            center: center
        });

        this.fireEvent('centerchange', this, map, center);

    },
    // @private
    destroy: function() {
        Ext.destroy(this.getGeo());
        var map = this.getMap();

        if (map && (window.google || {}).maps) {
            google.maps.event.clearInstanceListeners(map);
        }

        this.callParent();
    }
});
