Ext.define('POZdroid.store.Parkomats', {
    extend: 'Ext.data.Store',
    requires: [
        'Ext.data.proxy.LocalStorage',
        'Ext.data.JsonP',
        'POZdroid.model.Parkomat',
        'POZdroid.config.Config'
    ],
    config: {
        proxy: {
            type: 'memory',
            reader: {
                type: 'json'
            }
        },
        model: 'POZdroid.model.Parkomat',
        sorters: {
            property: 'ulica',
            direction: 'ASC'
        },
        grouper: {
            groupFn: function(record) {
                return record.get('ulica');
            }
//        },
//        listeners: {
//            load: function(store, opts) {
//            }
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
            me.setData(obj.features);
        }
    },
    getRemoteData: function() {
        var me = this,
                keyName = this.config.storeId,
                keyTsName = keyName + 'Ts',
                ls = window.localStorage;
        s = new Date();
        Ext.Ajax.request({
            url: POZdroid.config.Config.urls.parkomaty,
            success: function(resp, opts) {
                ls.setItem(keyName, resp.responseText);
                me.loadFromLocalStorage();
            }
        });
    }
});