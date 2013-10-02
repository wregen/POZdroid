Ext.define('Poznan.store.Parkomats', {
    extend: 'Ext.data.Store',
    requires: [
        'Ext.data.proxy.LocalStorage',
        'Ext.data.JsonP',
        'Poznan.ux.OfflineSyncStore',
        'Poznan.model.Parkomat',
        'Poznan.config.Config'
    ],
    config: {
        proxy: {
            type: 'memory',
            reader: {
                type: 'json'
            }
        },
        model: 'Poznan.model.Parkomat',
        sorters: {
            property: 'ulica',
            direction: 'ASC'
        },
        grouper: {
            groupFn: function(record) {
                return record.get('ulica');
            }
        },
        listeners: {
            beforeload: function() {
            }
        }
    },
    loadFromLocalStorage: function() {
        var me = this,
                keyName = this.config.storeId,
                keyTsName = keyName + 'Ts',
                ls = window.localStorage,
                json = ls.getItem(keyName),
                obj;
        if (json === null) {
            me.getRemoteData();
        } else {
            obj = Ext.decode(json);
            me.setData(obj);
        }
    },
    getRemoteData: function() {
        var me = this,
                keyName = this.config.storeId,
                keyTsName = keyName + 'Ts',
                ls = window.localStorage;

        Ext.data.JsonP.request({
            url: Poznan.config.Config.urls.parkomaty,
            callbackKey: 'callback',
            success: function(result) {
                var json = Ext.encode(result.features);
                ls.setItem(keyName, json);
                me.loadFromLocalStorage();
            }
        });
    }
});