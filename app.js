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
        'POZdroid.Config',
        'Ext.Menu',
        'Ext.MessageBox',
        'POZdroid.view.Menu',
        'Ext.device.Splashscreen',
        'Ext.device.Connection',
        'Ext.device.Notification'
    ],
    views: [
        'Main'
    ],
    stores: [
        
    ],
    controllers: [
        'Menu',
        'Map'
    ],
    isIconPrecomposed: true,
    launch: function() {
        var me = this;
        me.heading = 0;
        me.imgUrl = null;
        me.ingDesc = null;
        // Require to allow CORS requests
        Ext.Ajax.setUseDefaultXhrHeader(false);
        if (!me.isConnected()) {
            me.showMsgAndClose();
        }

        Ext.device.Splashscreen.show();
        setTimeout(function() {
            Ext.device.Splashscreen.hide();
        }, 2000);

        // Initialize the main view
        var main = Ext.create('POZdroid.view.Main', {
            itemId: 'pozMain'
        }),
        menu = Ext.create('POZdroid.view.Menu');
        Ext.Viewport.add(main);
        Ext.Viewport.setMenu(menu, {
            side: 'left',
            reveal: true
        });
        Ext.Viewport.add(Ext.create('Ext.Panel', {
            itemId: 'toast',
            html: '',
            modal: false,
            centered: true,
            padding: 10,
            hidden: true,
            style: 'text-align:center',
            shadow: false
        }));

        Ext.Viewport.add(Ext.create('Ext.Panel', {
            itemId: 'streetView',
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
        }));

        me.setMenuWidth(menu);
        Ext.Viewport.on('resize', Ext.bind(me.setMenuWidth, me, [menu], false));
    },
    streetView: function(url, desc) {
        var me = this,
                o = Ext.Viewport.getComponent('streetView');
        me.imgUrl = POZdroid.Config.urls.streetImg + url;
        me.imgDesc = desc;
        me.streetViewShowImg();
        o.show();
    },
    streetViewShowImg: function() {
        var me = this,
                o = Ext.Viewport.getComponent('streetView'),
                photo = o.getComponent('photo'),
                html = ['<div><div class="photo-desc"><h1>',
            me.imgDesc.h1,
            '</h1>',
            me.imgDesc.p,
            '</div><img src="',
            me.imgUrl,
            '&heading=',
            me.heading,
            '" /></div>'].join('');
        photo.setHtml(html);
    },
    toast: function(html, color, time) {
        o = Ext.Viewport.getComponent('toast');
        if (color !== undefined) {
            o.setStyle('color:' + color);
        } else {
            o.setStyle('color:#000000');
        }
        if (time === undefined) {
            time = 1500;
        }
        o.on('show', function(p) {
            p.hide();
        }, o, {delay: time, single: true});
        o.setHtml(html);
        o.show();
    },
    setTitle: function(title) {
        o = Ext.Viewport.getComponent('pozMain').getComponent('pozToolbar');
        o.setTitle(title);
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
    },
    puwgToWgs: function(x, y) {
        var me = this,
                c2 = 0.003356551485597, //w21
                c4 = 0.000006571873148459, //w22
                c6 = 0.00000001764656426454, //w23
                c8 = 0.00000000005400482188, //w24
                b2 = -0.00083773216816410000, //w30
                b4 = -0.00000005905869626083, //w31
                b6 = -0.00000000016734889050, //w32
                b8 = -0.00000000000021677378, //w33
                mo = 0.9993, //j9
                ro = 6367449.14577, //j18
                Xgk = (x + 5300000) / mo, //w36
                Ygk = (y - 500000) / mo, //w37
                u = Xgk / ro, //w34
                v = Ygk / ro, //w35
                alpha = u + (b2 * Math.sin(2 * u) * me.cosh(2 * v) + b4 * Math.sin(4 * u) * me.cosh(4 * v) + b6 * Math.sin(6 * u) * me.cosh(6 * v) + b8 * Math.sin(8 * u) * me.cosh(8 * v)), //w28
                betta = v + (b2 * Math.cos(2 * u) * me.sinh(2 * v) + b4 * Math.cos(4 * u) * me.sinh(4 * v) + b6 * Math.cos(6 * u) * me.sinh(6 * v) + (b8 * Math.cos(8 * u) * me.sinh(8 * v))), //w29
                w = 2 * Math.atan(Math.exp(betta)) - Math.PI / 2, //w27 
                deltaLambda = Math.atan((Math.tan(w)) / Math.cos(alpha)), //w26
                fi = Math.asin(Math.cos(w) * Math.sin(alpha)), //w25
                radiany = fi + c2 * Math.sin(2 * fi) + c4 * Math.sin(4 * fi) + c6 * Math.sin(6 * fi) + c8 * Math.sin(8 * fi), //w14
                lat = me.rad2deg(radiany),
                lon = 19 + me.rad2deg(deltaLambda);
        return [lat, lon];
    },
    cosh: function(arg) {
        return (Math.exp(arg) + Math.exp(-arg)) / 2;
    },
    sinh: function(arg) {
        return (Math.exp(arg) - Math.exp(-arg)) / 2;
    },
    rad2deg: function(angle) {
        return angle * 57.29577951308232; // angle / Math.PI * 180
    }
});
