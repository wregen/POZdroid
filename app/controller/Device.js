Ext.define('POZdroid.controller.Device', {
    extend: 'Ext.app.Controller',
    requires: [
    ],
    config: {
        refs: {
            backBtn: 'pozMain #pozToolbar button[itemId=pozGuidesBack]',
            menuBtn: 'pozMain #pozToolbar button[itemId=menu]',
            pozMain: 'pozMain',
            pozGuides: 'pozGuides'
        },
        backPressedCount: 0
    },
    isActive: function(name) {
        var me = this,
                pozMainItem = me.getPozMain().getActiveItem().getXTypes(),
                pozGuidesItem = me.getPozGuides().getActiveItem().getXTypes();
        if (pozMainItem.indexOf('pozGuides') !== -1) {
            return (pozGuidesItem.indexOf(name) !== -1);
        } else {
            return (pozMainItem.indexOf(name) !== -1);
        }
    },
    launch: function() {
        var me = this;
        document.addEventListener('backbutton', function() {
            if (!Ext.Viewport.getMenus().right.isHidden()) {
                me.getMenuBtn().fireEvent('tap');
                me.setBackPressedCount(0);
            } else {
                if (!me.getBackBtn().isHidden()) {
                    me.getBackBtn().fireEvent('tap');
                    me.setBackPressedCount(0);
                } else {
                    me.setBackPressedCount(me.getBackPressedCount() + 1);
                }
            }
            if (me.getBackPressedCount() > 1) {
                me.setBackPressedCount(0);
                POZdroid.app.showCloseWarning();
            }
        }, false);

        document.addEventListener('menubutton', function() {
            me.getMenuBtn().fireEvent('tap');
        }, false);

    }
});
