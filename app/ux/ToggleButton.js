Ext.define('POZdroid.ux.ToggleButton', {
    extend: "Ext.Button",
    xtype: 'togglebtn',
    config: {
        isPressed: false
    },
    initialize: function() {
        this.callParent(arguments);
        this.on("tap", this.onButtonPress, this);
        this.updateView();
    },
    onButtonPress: function() {
        this.setIsPressed(!this.getIsPressed());
        this.updateView();
    },
    setPress: function(pressed) {
        this.setIsPressed(pressed);
        this.updateView();
    },
    updateView: function() {
        if (this.getIsPressed()) {
            this.addCls(this.getPressedCls());
            this.setStyle('color:#ff0000');
        } else {
            this.removeCls(this.getPressedCls());
            this.setStyle('color:');
        }

    }

});