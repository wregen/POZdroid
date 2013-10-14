Ext.define('POZdroid.view.Guides', {
    extend: 'Ext.Container',
    xtype: 'pozGuides',
    requires: [
        'POZdroid.Config'
    ],
    config: {
        layout: 'hbox',
        title: 'Welcome view',
        items: [
            {
                xtype: 'container',
                flex: 1,
                style: 'background-color: #5E99CC;'
            },
            {
                xtype: 'container',
                styleHtmlContent: true,
                flex: 4,
                html: '<div id="content">' +
                        '<div id="siteNotice">' +
                        '</div>' +
                        '<h1 id="firstHeading" class="firstHeading">Przewodniki</h1>' +
                        '</div>',
                style: 'background-color: #759E60;'
            }
        ]
    },
    getGuides: function() {
        var me = this;
        Ext.Ajax.request({
            url: POZdroid.Config.urls.guidesTmp2,
            scope: me,
            success: function(r) {
                var o = r.responseText;
                parsed = me.parseGuides(o);
                prsed2 = me.postParseGuides(parsed);
                console.log(prsed2);
            }
        });
    },
    postParseGuides: function(p) {
        var out = [],
                pl = p.length,
                i,
                si = 0;
        for (i = 0; i < pl; i++) {
            if (p[i].subclass !== undefined) {
                si = i;
                p[si].pois = [];
            } else {
                p[si].pois.push(p[i]);
            }
            out.push(p[si]);
        }
        return out;
    },
    parseGuides: function(p) {
        var a = p.split('\n'), al = a.length, i,
                b = [], bl = 0, j,
                c = {}, cl = 0, k,
                d, out = [];
        for (i = 0; i < al - 1; i++) {
            b.push(a[i].split('0x1234'));
        }
        bl = b.length;
        for (j = 0; j < bl; j++) {
            c = {};
            cl = b[j].length;
            for (k = 0; k < cl - 1; k++) {
                d = b[j][k].split(':');
                c[d[0]] = d[1];
            }
            out.push(c);
        }
        return out;

    }
});
