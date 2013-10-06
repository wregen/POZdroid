Ext.define('POZdroid.controller.Menu', {
    extend: 'Ext.app.Controller',
    config: {
        refs: {
            main: 'pozMain',
            menu: 'pozMenu',
            welcome: 'pozWelcome',
            map: 'pozMap',
            list: 'pozList'
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
                itemName = btn.getMenu();
        me.toggleMenu();
        main.setActiveItem(itemName);
        me.showAdditionalBtns(itemName);
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
