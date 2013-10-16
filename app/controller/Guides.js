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
            backBtn: 'pozMain > toolbar > button[itemId=pozGuidesBack]',
            guides: 'pozGuides',
            guidesMain: 'pozGuidesMain',
            guidesDetails: 'pozGuidesDetails',
            guidesPois: 'pozGuidesPois'
        },
        control: {
            'pozGuides > container': {
                activate: 'setBackVisibility'
            },
            'guidesMain': {
                activate: 'pozGuidesLoad',
                itemtap: 'pozGuidesItemTap'
            },
            'pozMain > toolbar > button[itemId=pozGuidesBack]': {
                tap: 'onBackBtnTap'
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
    }
});
