Ext.define('POZdroid.view.Map', {
    extend: 'Ext.Map',
    requires: [
        'Ext.TitleBar'
    ],
    xtype: 'pozMap',
    config: {
        mapOptions: {
            zoom: 18,
            maxZoom: 20,
            minZoom: 12,
            draggable: true,
            center: new google.maps.LatLng(52.408306, 16.933596),
            visualRefresh: true,
            overviewMapControl: true,
//            mapTypeControl: false,
            mapTypeControlOptions: {
                style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
            }
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
