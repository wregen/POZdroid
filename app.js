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
        'POZdroid.view.Main',
        'POZdroid.view.Menu',
        'POZdroid.view.Streetview',
        'POZdroid.view.Toast',
        'Ext.device.Splashscreen',
        'Ext.device.Connection',
        'Ext.device.Notification',
        'Ext.device.Globalization'
    ],
    views: [
    ],
    stores: [
        'Guides',
        'Pois'
    ],
    controllers: [
        'Menu',
        'Map',
        'Guides',
        'Device'
    ],
    isIconPrecomposed: true,
    launch: function() {
        var me = this;
        if (!me.isConnected()) {
            me.showConnectionError();
            return false;
        }

        me.heading = 0;
        me.imgUrl = null;
        me.ingDesc = null;
        // Require to allow CORS requests
        Ext.Ajax.setUseDefaultXhrHeader(false);

        var main = Ext.create('POZdroid.view.Main', {
            itemId: 'pozMain'
        }),
        toast = Ext.create('POZdroid.view.Toast', {
            itemId: 'toast'
        }),
        streetView = Ext.create('POZdroid.view.Streetview', {
            itemId: 'streetView'
        }),
        menu = Ext.create('POZdroid.view.Menu');


        Ext.Viewport.add([main, toast, streetView]);
        Ext.Viewport.setMenu(menu, {
            side: 'right',
            reveal: true
        });

        me.setMenuWidth(menu);
        Ext.Viewport.on('resize', Ext.bind(me.setMenuWidth, me, [menu], false));
        Ext.Viewport.on('painted', Ext.device.Splashscreen.hide);
    },
    streetView: function(params, desc) {
        var me = this,
                o = Ext.Viewport.getComponent('streetView');
        me.imgUrl = POZdroid.Config.url('streetImg') + params;
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
        var main = Ext.Viewport.getComponent('pozMain'),
                toolbar;
        if (main !== undefined) {
            toolbar = main.getComponent('pozToolbar');
            toolbar.setTitle(title);
        }
    },
    exitApp: function() {
        navigator.app.exitApp();
    },
    showConnectionError: function() {
        var me = this;
        navigator.notification.vibrate(500);
        Ext.Msg.show({
            title: POZdroid.Config.str('connRequiredTitle'),
            message: POZdroid.Config.str('connRequired'),
            fn: function() {
                me.exitApp();
            },
            buttons: [
                {text: POZdroid.Config.str('ok'), itemId: 'ok', ui: 'confirm'}
            ]
        });
    },
    showCloseWarning: function() {
        var me = this;
        Ext.Msg.show({
            title: POZdroid.Config.str('question'),
            message: POZdroid.Config.str('doYouWantExit'),
            fn: function(btnId) {
                if (btnId === POZdroid.Config.str('ok')) {
                    me.exitApp();
                }
            },
            buttons: [
                {text: POZdroid.Config.str('cancel'), itemId: 'cancel', ui: 'decline'},
                {text: POZdroid.Config.str('ok'), itemId: 'ok', ui: 'confirm'}
            ]
        });
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
        Ext.Msg.show({
            title: POZdroid.Config.str('updateTitle'),
            message: POZdroid.Config.str('update'),
            fn: function(btnId) {
                if (btnId === POZdroid.Config.str('ok')) {
                    window.location.reload();
                }
            },
            buttons: [
                {text: POZdroid.Config.str('cancel'), itemId: 'cancel', ui: 'decline'},
                {text: POZdroid.Config.str('ok'), itemId: 'ok', ui: 'confirm'}
            ]
        });
    },
    doRequest: function(url, cb) {
        var me = this;
        Ext.Ajax.request({
            url: url,
            scope: me,
            success: function(r) {
                var o = r.responseText;
                cb(o);
            },
            failure: function() {
                POZdroid.app.toast(POZdroid.Config.str('connError'), '#ff2200', 4000);
            }
        });
    },
    postParseGuides: function(p) {
        var out = [],
                pl = p.length,
                i,
                group;
        for (i = 0; i < pl; i++) {
            if (p[i].subclass !== undefined) {
                group = p[i].name;
            } else {
                p[i].group = group;
                out.push(p[i]);
            }
        }
        return out;
    },
    parseGuides: function(p, isSingle) {
        var a = p.split('\n'), al = a.length, i,
                b = [], bl = 0, j,
                c = {}, cl = 0, k,
                d0, d1, out;
        for (i = 0; i < al - 1; i++) {
            b.push(a[i].split('0x1234'));
        }
        bl = b.length;
        out = [];
        for (j = 0; j < bl; j++) {
            c = {};
            cl = b[j].length;
            for (k = 0; k < cl - 1; k++) {
                d0 = b[j][k].split(':', 1)[0];
                d1 = b[j][k].substring(b[j][k].indexOf(':') + 1);
                c[d0] = d1;
            }
            out.push(c);
        }
        if (isSingle === true) {
            return out[0];
        }
        return out;
    }
});
