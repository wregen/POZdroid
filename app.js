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
        'Ext.device.Splashscreen',
        'Ext.device.Connection',
        'Ext.device.Notification'
    ],
    views: [
        'Main'
    ],
    stores: [
//        'Parkomats'
    ],
    controllers: [
//        'Parkomats',
        'Menu',
        'Map'
    ],
    isIconPrecomposed: true,
    launch: function() {
        var me = this;
        // Require to allow CORS requests
        Ext.Ajax.setUseDefaultXhrHeader(false);
        if (!me.isConnected()) {
            me.showMsgAndClose();
        }
//        if (navigator.splashscreen) {
//            navigator.splashscreen.show();
//            setTimeout(function() {
//                navigator.splashscreen.hide();
//            }, 2000);
//        }
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
        Ext.Viewport.on('resize', Ext.bind(me.setMenuWidth, me, [menu], false));
    },
    showMsgAndClose: function() {
        Ext.device.Notification.alert({
            message: 'The app requires active internet connetion. Click OK, start network and run the app again. Thank you!',
            title: 'Internet Connection Required',
            callback: function() {
                navigator.app.exitApp();
            },
            buttonName: 'OK'
        });
        Ext.device.Notification.vibrate();
    },
    setMenuWidth: function(menu) {
        var o = Ext.Viewport.getOrientation();
        if (o === 'landscape') {
            menu.setWidth('30%');
        } else {
            menu.setWidth('70%');
        }
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
