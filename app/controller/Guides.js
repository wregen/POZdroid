Ext.define('POZdroid.controller.Guides', {
    extend: 'Ext.app.Controller',
    requires: [
        'POZdroid.model.Detail'
    ],
    config: {
        stores: [
            'Guides',
            'Pois'
        ],
        refs: {
            backBtn: 'pozMain #pozToolbar button[itemId=pozGuidesBack]',
            guides: 'pozGuides',
            guidesMain: 'pozGuidesMain',
            guidesDetails: 'pozGuidesDetails',
            guidesPois: 'pozGuidesPois',
            guidesPoi: 'pozGuidesPoi',
            guidesMap: 'pozGuidesMap',
            activatePoisBtn: 'pozGuidesDetails button[itemId=activateGuidesPois]',
            activateMapBtn: 'pozGuidesDetails button[itemId=activateGuidesMap]',
            activatePoiMapBtn: 'pozGuidesPoi button[itemId=activatePoiMap]'
        },
        control: {
            'pozGuides > container': {
                activate: 'setBackVisibility'
            },
            'guidesMain': {
                activate: 'pozGuidesLoad',
                itemtap: 'pozGuidesItemTap'
            },
            'pozMain #pozToolbar button[itemId=pozGuidesBack]': {
                tap: 'onBackBtnTap'
            },
            'pozGuidesDetails button[itemId=activateGuidesPois]': {
                tap: 'activatePois'
            },
            'pozGuidesDetails button[itemId=activateGuidesMap]': {
                tap: 'activateMap'
            },
            'pozGuidesPois': {
                itemtap: 'pozGuidesPoisItemTap'
            },
            'pozGuidesPoi button[itemId=activatePoiMap]': {
                tap: 'activatePoiMap'
            },
            'pozGuidesMap': {
                poitap: 'pozGuidesPoisItemTap'
            }
        }
    },
    pozGuidesLoad: function(i) {
        i.load();
    },
    setBackVisibility: function(item) {
        var me = this,
                backBtn = me.getBackBtn();
        if (item.getXTypes().indexOf('pozGuidesMain') !== -1) {
            backBtn.hide();
            POZdroid.app.setTitle(POZdroid.Config.str.pl.guides);
        } else {
            backBtn.show();
        }
    },
    onBackBtnTap: function(btn) {
        var me = this,
                guides = me.getGuides();
        guides.onBackButtonTap();
    },
    pozGuidesItemTap: function(list, index, target, record, e, eOpts) {
        var me = this,
                guides = me.getGuides(),
                prId = record.get('guide'),
                guidesDetails = guides.push({
                    xtype: 'pozGuidesDetails',
                    prId: prId
                });
        guidesDetails.load();
    },
    activatePois: function(btn) {
        var me = this,
                guides = me.getGuides(),
                guidesDetails = me.getGuidesDetails(),
                prId = guidesDetails.getPrId(),
                store = Ext.getStore('Pois');
        store.removeAll();
        store.loadPois(prId);
        guides.push({
            xtype: 'pozGuidesPois'
        });
    },
    activateMap: function() {
        var me = this,
                guides = me.getGuides(),
                guidesDetails = me.getGuidesDetails(),
                prId = guidesDetails.getPrId(),
                gm = (window.google || {}).maps,
                geoCoder = new gm.Geocoder(),
                searchPhrase = guidesDetails.getRecord().get('title'),
                guidesMap;

        geoCoder.geocode({address: 'poznan, poland, ' + searchPhrase}, function(r, s) {
            if (s === 'OK') {
                guidesMap = guides.push({
                    xtype: 'pozGuidesMap',
                    prId: prId,
                    bounds: r[0].geometry.bounds || r[0].geometry.viewport,
                    center: r[0].geometry.location
                });
                guidesMap.load();
            } else {
                POZdroid.app.toast(searchPhrase + ' cannot be found.', '#ff9922', 5000);
            }
        });

    },
    activatePoiMap: function() {
        var me = this,
                guides = me.getGuides(),
                record = me.getGuidesPoi().getRecord(),
                gm = (window.google || {}).maps,
                center = new gm.LatLng(record.get('lat'), record.get('lon')),
                guidesMap = guides.push({
                    xtype: 'pozGuidesMap',
                    record: record,
                    center: center
                });
        guidesMap.load();
    },
    pozGuidesPoisItemTap: function(list, index, target, record, e, eOpts) {
        var me = this,
                guides = me.getGuides();
        guides.push({
            xtype: 'pozGuidesPoi',
            record: record
        });
    }
});
