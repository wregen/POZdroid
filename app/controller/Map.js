Ext.define('POZdroid.controller.Map', {
    extend: 'Ext.app.Controller',
    requires: [
        'Ext.Ajax'
    ],
    config: {
        refs: {
            map: 'pozMap',
            myLocationBtn: 'pozMain #pozToolbar *[itemId=pozMap]'
        },
        control: {
            'pozMap': {
                mapcleared: 'unpressMyLocation'
            },
            'pozMain #pozToolbar *[itemId=pozMap]': {
                tap: 'setTrackMyLocation'
            }
        }
    },
    unpressMyLocation: function() {
        var me = this,
                myLocationBtn = me.getMyLocationBtn();
        myLocationBtn.setPress(false);
    },
    setTrackMyLocation: function(btn) {
        var me = this,
                pozMap = me.getMap(),
                val = !btn.getIsPressed();
        pozMap.setTrackMyLocation(val);
    }
});
