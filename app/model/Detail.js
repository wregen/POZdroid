Ext.define('POZdroid.model.Detail', {
    extend: 'Ext.data.Model',
    config: {
        idProperty: 'g_info',
        fields: [
            {name: 'g_info', type: 'int'},
            {name: 'title', type: 'auto'},
            {name: 'desc', type: 'auto'},
            {name: 'imgUrl', type: 'auto'},
            {name: 'lang', type: 'auto'}
        ]
    }
});
