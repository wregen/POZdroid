Ext.define('POZdroid.controller.Parkomats', {
    extend: 'Ext.app.Controller',
    config: {
        stores: [
            'Parkomats'
        ],
        refs: {
            tabMap: 'pozMap',
            tabList: 'pozList',
            main: 'pozMain',
            closeBtn: 'pozMain button[iconCls=delete]'
        },
        control: {
            tabMap: {
                maprender: 'onMapRender'
            },
            tabList: {
                itemtap: 'onItemTap'
            },
            closeBtn: {
                tap: 'onTapClose'
            }
        }
    },
    launch: function(app) {
        this.getTabList().on('painted', this.loadParkomats, this, {delay: 300, single: true});
    },
    onItemTap: function(view, idx, target, rec) {
        var me = this,
                tabMap = me.getTabMap(),
                map = tabMap.getMap();
        // we need wait till map is painted
        tabMap.on('painted', function() {
            me.setMarker(rec);
        }, me, {single: true});
        me.getMain().setActiveItem(1);
    },
    onTapClose: function() {
        navigator.app.exitApp();
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
