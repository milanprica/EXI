
function MacromoleculeWindow(args) {
	this.width = 900;
	this.height = 700;
	if (args != null) {
		if (args.actions != null) {
			this.actions = args.actions;
		}
	}

	this.macromoleculeTabs = new MacromoleculeTabs({
		width : this.width - 10,
		height : this.height - 50
	});

	var _this = this;
	
	this.macromoleculeTabs.onSave.attach(function(sender, macromolecule) {
		debugger
		_this.onSave.notify();
		_this.refresh(macromolecule);
	});
	
	this.macromoleculeTabs.onClose.attach(function(sender) {
		_this.panel.close();
	});

	/** Events **/
	this.onSave = new Event();
}


MacromoleculeWindow.prototype.refresh = function(macromolecule) {
	this.macromoleculeTabs.refresh(macromolecule);
	if (macromolecule != null){
		this.panel.setTitle(macromolecule.acronym);
	}
};


MacromoleculeWindow.prototype.draw = function(macromolecule) {
	var _this = this;
	this.panel = Ext.create('Ext.Window', {
		id : this.id,
		title : this.title,
		modal : true,
		items : this.macromoleculeTabs.getPanel(),
		width : this.width,
		height : this.height,
		buttonAlign : 'right',
		listeners : {
			scope : this,
			minimize : function() {
				this.panel.hide();
			},
			destroy : function() {
				delete this.panel;
			}
		}
	});
	this.panel.show();
	this.refresh(macromolecule);

};