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
            },
            'pozMain > toolbar > *[action=mylocation]': {
                tap: 'trackMyLocation'
            }
        }
    },
    launch: function() {
        var me = this;
    }
//    deactivateMap: function() {
//        var me = this,
//                pozMap = me.getMap(),
//                btn = me.getTrackMyLocationBtn();
//        btn.setPress(false);
//        pozMap.updateUseCurrentLocation(false);
//    }
});
