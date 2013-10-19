Ext.define('POZdroid.view.Toast', {
    extend: 'Ext.Panel',
    requires: [
    ],
    xtype: 'pozToast',
    config: {
            html: '',
            modal: false,
            centered: true,
            padding: 10,
            hidden: true,
            style: 'text-align:center',
            shadow: false
    }
});
