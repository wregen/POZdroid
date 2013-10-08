Ext.define('POZdroid.view.Map', {
    extend: 'POZdroid.ux.Map',
    requires: [
    ],
    xtype: 'pozMap',
    config: {
        appConfig: POZdroid.config.Config,
        useCurrentLocation: false,
        mapOptions: {
            zoom: 18,
            maxZoom: 20,
            minZoom: 10,
            draggable: true,
            visualRefresh: true,
            overviewMapControl: true
        },
        mapListeners: {
            dragend: function(pozMap) {
                pozMap.onDragEnd();
            },
            bounds_changed: function(pozMap) {
                pozMap.onBoundsChanged();
            }
        },
        listeners: {
            painted: 'onPainted',
            maprender: function(pozMap, map, e) {
                var gm = (window.google || {}).maps;
                Ext.defer(function() {
                    var geo = pozMap.getGeo(),
                            position = new gm.LatLng(geo._latitude, geo._longitude);
                    new gm.Marker({
                        position: position,
                        map: map,
                        animation: gm.Animation.BOUNCE,
                        title: 'Your current position',
                        flat: true
                    });
                }, 1000);
            }
        }
    },
    onDragEnd: function() {
        this.fireEvent('dragend', this);
    },
    onBoundsChanged: function() {
        this.fireEvent('bounds_changed', this);
    }
});
