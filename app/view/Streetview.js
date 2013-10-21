Ext.define('POZdroid.view.Streetview', {
    extend: 'Ext.Panel',
    requires: [
    ],
    xtype: 'pozStreetview',
    config: {
        modal: true,
        centered: true,
        padding: 2,
        hidden: true,
        shadow: false,
        layout: 'vbox',
        items: [{
                docked: 'bottom',
                xtype: 'toolbar',
                items: [{
                        xtype: 'button',
                        iconCls: 'arrow_left',
                        handler: function() {
                            POZdroid.app.heading -= 20;
                            if (POZdroid.app.heading < 0) {
                                POZdroid.app.heading = 360;
                            }
                            POZdroid.app.streetViewShowImg();
                        }
                    }, {
                        xtype: 'button',
                        iconCls: 'arrow_right',
                        handler: function() {
                            POZdroid.app.heading += 20;
                            if (POZdroid.app.heading > 360) {
                                POZdroid.app.heading = 0;
                            }
                            POZdroid.app.streetViewShowImg();
                        }
                    }, {
                        xtype: 'spacer'
                    }, {
                        xtype: 'button',
                        iconCls: 'delete',
                        ui: 'decline',
                        align: 'left',
                        handler: function() {
                            Ext.Viewport.getComponent('streetView').hide();
                        }
                    }]
            }, {
                itemId: 'photo',
                width: 285,
                height: 230,
                padding: 0,
                xtype: 'panel'
            }]
    }
});
