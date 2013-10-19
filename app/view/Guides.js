Ext.define('POZdroid.view.Guides', {
    extend: 'Ext.navigation.View',
    xtype: 'pozGuides',
    requires: [
        'POZdroid.Config',
        'POZdroid.store.Guides',
        'POZdroid.view.guides.Main',
        'POZdroid.view.guides.Details',
        'POZdroid.view.guides.Pois',
        'POZdroid.view.guides.Poi',
        'POZdroid.view.guides.Map',
        'Ext.dataview.List',
        'Ext.LoadMask'
    ],
    config: {
        /**
         * @event reset
         */
        navigationBar: false, //{hidden: true},
        items: [{
                xtype: 'pozGuidesMain'
            }]
    },
    reset: function () {
        this.callParent();
        this.fireEvent('reset', this);
    }
});
