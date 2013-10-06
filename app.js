/*
 This file is generated and updated by Sencha Cmd. You can edit this file as
 needed for your application, but these edits will have to be merged by
 Sencha Cmd when it performs code generation tasks such as generating new
 models, controllers or views and when running "sencha app upgrade".
 
 Ideally changes to this file would be limited and most work would be done
 in other places (such as Controllers). If Sencha Cmd cannot merge your
 changes and its generated code, it will produce a "merge conflict" that you
 will need to resolve manually.
 */

Ext.application({
    name: 'POZdroid',
    requires: [
        'Ext.Menu',
        'Ext.MessageBox',
        'POZdroid.view.Menu',
        'POZdroid.config.Config',
        'Ext.device.Splashscreen'
    ],
    views: [
        'Main'
    ],
    stores: [
        'Parkomats'
    ],
    controllers: [
//        'Parkomats',
        'Menu',
        'Map'
    ],
    isIconPrecomposed: true,
    preLaunch: function() {
        var me = this;
        if (this.isConnected()) {
            me.doLaunch();
        } else {
            Ext.device.Notification.show({
                title: 'Internet Connection Required',
                message: 'The application requires Internet access. Turn on Internet connection and go back to the application.',
                callback: function() {
                    me.launch();
                }
            });
        }
    },
    launch: function() {
        var me = this;
        // Require to allow CORS requests
        Ext.Ajax.setUseDefaultXhrHeader(false);

        if (navigator.splashscreen) {
            navigator.splashscreen.show();
            setTimeout(function() {
                navigator.splashscreen.hide();
            }, 5000);
        }
        // Initialize the main view
        var main = Ext.create('POZdroid.view.Main'),
                menu = Ext.create('POZdroid.view.Menu');
        Ext.Viewport.add(main);
        Ext.Viewport.setMenu(menu, {
            side: 'left',
            reveal: false,
            cover: true
        });
        me.setMenuWidth(menu);
    },
    setMenuWidth: function(menu) {
        var fn = function(v, o, w, h, e1, e2, menu) {
            if (o === 'landscape') {
                menu.setWidth('30%');
            } else {
                menu.setWidth('70%');
            }
        };
        fn(null, Ext.Viewport.getOrientation(), null, null, null, null, menu);
        Ext.Viewport.on('orientationchange', Ext.bind(fn, this, [menu], true));
        
    },
    isConnected: function() {
        var c = Ext.device.Connection.isOnline();
        return c;
    },
    onUpdated: function() {
        Ext.Msg.confirm(
                "Application Update",
                "This application has just successfully been updated to the latest version. Reload now?",
                function(buttonId) {
                    if (buttonId === 'yes') {
                        window.location.reload();
                    }
                }
        );
    }
});
