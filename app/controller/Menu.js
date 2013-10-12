Ext.define('POZdroid.controller.Menu', {
    extend: 'Ext.app.Controller',
    config: {
        refs: {
            main: 'pozMain',
            menu: 'pozMenu',
            welcome: 'pozWelcome',
            map: 'pozMap'
        },
        control: {
            'pozMain > toolbar > button[action=menu]': {
                tap: 'toggleMenu'
            },
            'pozMenu button': {
                tap: 'switchView'
            }
        }
    },
    launch: function() {
        var me = this,
                main = me.getMain();
        me.showAdditionalBtns(main.getActiveItem().getItemId());
    },
    toggleMenu: function() {
        Ext.Viewport.toggleMenu("left");
    },
    switchView: function(btn) {
        var me = this,
                main = me.getMain(),
                activateItem = btn.getActivateItem(),
                activateConfig = btn.getActivateConfig(),
                activateAction = btn.getActivateAction(),
                item = main.query(activateItem)[0];
        me.toggleMenu();
        if (activateConfig) {
            for (var property in activateConfig) {
                item.set(property, activateConfig[property]);
            }
        }
        if (activateAction) {
            activateAction.call(item, item, btn);
        }
        main.setActiveItem(item);
//        me.showAdditionalBtns(itemName);
    },
    showAdditionalBtns: function(itemName) {
        var cq = Ext.ComponentQuery,
                btns = cq.query('pozMain toolbar button'),
                l = btns.length,
                i;
        for (i = 0; i < l; i++) {
            if (btns[i].getItemId() !== 'menu' && btns[i].getItemId() !== itemName) {
                btns[i].hide();
            } else {
                btns[i].show();
            }
        }

    }

});
