Ext.define('POZdroid.controller.Menu', {
    extend: 'Ext.app.Controller',
    config: {
        refs: {
            main: 'pozMain'
        },
        control: {
            'pozMain button[itemId=menu]': {
                tap: 'toggleMenu'
            },
            'pozMain > container': {
                activate: 'onPozMainItemActivate'
            },
            'pozMenu button': {
                tap: 'switchView'
            }
        }
    },
    toggleMenu: function() {
        Ext.Viewport.toggleMenu("right");
    },
    onPozMainItemActivate: function(item) {
        var me = this,
                xtypes = item.getXTypes().split('/'),
                xtype = xtypes[xtypes.length - 1];
        me.showExtraBtns(xtype);
    },
    switchView: function(btn) {
        var me = this,
                main = me.getMain(),
                activateItem = btn.getActivateItem(),
                activateConfig = btn.getActivateConfig(),
                activateAction = btn.getActivateAction(),
                item = main.query(activateItem)[0];
        me.toggleMenu();

        me.hideExtraBtns();
        me.showExtraBtns(activateItem);

        if (activateConfig) {
            for (var property in activateConfig) {
                item.set(property, activateConfig[property]);
            }
        }
        if (activateAction) {
            activateAction.call(item, item, btn);
        }
        POZdroid.app.setTitle(btn.getText());
        main.setActiveItem(item);
    },
    hideExtraBtns: function() {
        var btns = Ext.ComponentQuery.query('pozMain #pozToolbar button'),
                l = btns.length,
                i;
        for (i = 0; i < l; i++) {
            if (btns[i].getItemId() !== 'menu') {
                btns[i].hide();
            }
        }
    },
    showExtraBtns: function(activateItem) {
        var items = Ext.ComponentQuery.query('pozMain #pozToolbar #' + activateItem);
        if (items[0]) {
            items[0].show();
        }
    }
});
