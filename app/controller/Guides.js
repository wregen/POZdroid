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
            activatePoisBtn: 'pozGuidesDetails button[itemId=activateGuidesPois]',
            activateMapBtn: 'pozGuidesDetails button[itemId=activateGuidesMap]'
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
                prId = record.get('guide');
        guides.push({
            xtype: 'pozGuidesDetails',
            prId: prId
        });
    },
    activatePois: function(btn) {
        var me = this,
                guides = me.getGuides(),
                guidesDetails = me.getGuidesDetails(),
                prId = guidesDetails.getPrId(),
                store = Ext.getStore('Pois');
        
        store .removeAll();
        store.loadPois(prId);
        guides.push({
            xtype: 'pozGuidesPois'
        });
    },
    activateMap: function () {
        var me = this,
                guides = me.getGuides();
        guides.push({
            xtype: 'pozGuidesMap'
        });
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
