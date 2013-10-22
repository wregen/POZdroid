Ext.define('POZdroid.controller.Guides', {
    extend: 'Ext.app.Controller',
    config: {
        refs: {
            backBtn: 'pozMain #pozToolbar button[itemId=pozGuidesBack]',
            guides: 'pozGuides',
            guidesDetails: 'pozGuidesDetails',
            guidesPoi: 'pozGuidesPoi'
        },
        control: {
            'pozGuides > container': {
                activate: 'setBackVisibility'
            },
            'pozMain #pozToolbar button[itemId=pozGuidesBack]': {
                tap: 'onBackBtnTap'
            },
            'pozGuidesMain': {
                activate: 'load',
                itemtap: 'loadDetails'
            },
            'pozGuidesDetails button[itemId=activateGuidesPois]': {
                tap: 'loadPois'
            },
            'pozGuidesDetails button[itemId=activateGuidesMap]': {
                tap: 'loadPoisMap'
            },
            'pozGuidesPois': {
                itemtap: 'loadPoiDetails'
            },
            'pozGuidesPoi button[itemId=activatePoiMap]': {
                tap: 'loadPoiMap'
            },
            'pozGuidesMap': {
                poitap: 'loadPoiDetails'
            }
        }
    },
    setBackVisibility: function(item) {
        var me = this,
                backBtn = me.getBackBtn();
        if (item.getXTypes().indexOf('pozGuidesMain') !== -1) {
            backBtn.hide();
            POZdroid.app.setTitle(POZdroid.Config.str('guides'));
        } else {
            backBtn.show();
        }
    },
    /**
     * Wraps backButton tap of hidden NavigationBar
     */
    onBackBtnTap: function() {
        var me = this,
                guides = me.getGuides();
        guides.onBackButtonTap();
    },
    load: function(i) {
        i.load();
    },
    loadDetails: function(list, index, target, record, e, eOpts) {
        var me = this,
                guides = me.getGuides(),
                prId = record.get('guide'),
                guidesDetails = guides.push({
                    xtype: 'pozGuidesDetails',
                    prId: prId
                });
        guidesDetails.load();
    },
    loadPois: function() {
        var me = this,
                guides = me.getGuides(),
                guidesDetails = me.getGuidesDetails(),
                prId = guidesDetails.getPrId(),
                guidesPois = guides.push({
                    xtype: 'pozGuidesPois',
                    prId: prId
                });
        guidesPois.load();
    },
    loadPoisMap: function() {
        var me = this,
                guides = me.getGuides(),
                guidesDetails = me.getGuidesDetails(),
                prId = guidesDetails.getPrId(),
                gm = (window.google || {}).maps,
                geoCoder = new gm.Geocoder(),
                searchPhrase = guidesDetails.getRecord().get('title'),
                guidesMap;

        geoCoder.geocode({address: 'poland poznan ' + searchPhrase}, function(r, s) {
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
    loadPoiDetails: function(list, index, target, record, e, eOpts) {
        var me = this,
                guides = me.getGuides(),
                guidesPoi = guides.push({
                    xtype: 'pozGuidesPoi',
                    record: record
                });
        guidesPoi.load();
    },
    loadPoiMap: function() {
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
    }
});
