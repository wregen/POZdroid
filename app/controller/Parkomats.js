Ext.define('Poznan.controller.Parkomats', {
    extend: 'Ext.app.Controller',
    config: {
        stores: [
            'Parkomats'
        ],
        refs: {
            tabMap: 'tabMap',
            tabList: 'tabList',
            main: 'main'
        },
        control: {
            tabMap: {
                maprender: 'onMapRender'
            },
            tabList: {
                itemtap: 'onItemTap'
            }
        }
    },
    launch: function(app) {
        this.getTabList().on('painted', this.loadParkomats, this, {delay:300, single: true});
    },
    onItemTap: function(view, idx, target, rec) {
        var me = this;
        me.getMain().setActiveItem(1);
        me.setMarker(rec);
    },
    onMapRender: function() {
    },
    loadParkomats: function() {
        //set up refs to the two stores
        Ext.getStore('Parkomats').loadFromLocalStorage();
    },
    setMarker: function(rec) {
        var me = this,
                tabMap = me.getTabMap(),
                map = tabMap.getMap(),
                gm = (window.google || {}).maps,
                g = rec.get('geometry'),
                u = rec.get('ulica'),
                p = {
            latitude: g.coordinates[1],
            longitude: g.coordinates[0]
        };
        if (map !== null) {
            tabMap.setMapCenter(p);
            new gm.Marker({
                position: new gm.LatLng(p.latitude, p.longitude),
                map: map,
                animation: gm.Animation.DROP,
                title: u,
                icon: {
                    url: './resources/images/parkomat-48.png',
                    scaledSize: new gm.Size(24, 75)
                },
                flat: true
            });
        } else {
            Ext.Function.defer(me.setMarker, 300, me, [rec]);
        }
    }

});
