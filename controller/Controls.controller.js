/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2017 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

/*global history */
sap.ui.define([
		"jekunauto/ui/erp/controller/BaseController",
		"sap/ui/Device"
	], function (BaseController, Device) {
		"use strict";

		return BaseController.extend("jekunauto.ui.erp.controller.Controls", {
            
			/**
			 * Called when the controller is instantiated.
			 * @public
			 */
			onInit: function () {
				BaseController.prototype.onInit.call(this);

				// manually call the handler once at startup as device API won't do this for us
				this._onOrientationChange({
					landscape: Device.orientation.landscape
				});
			},

			/**
			 * Called before the view is rendered.
			 * @public
			 */
			onBeforeRendering: function() {
				this._deregisterOrientationChange();
			},

			/**
			 * Called after the view is rendered.
			 * @public
			 */
			onAfterRendering: function() {
				this._registerOrientationChange();
			},

			/**
			 * Called when the controller is destroyed.
			 * @public
			 */
			onExit: function() {
				this._deregisterOrientationChange();
			},

			/**
			 * Filter for controls in the master search field when the title of a control section was pressed
 			 */
			onPress: function(oEvent) {
				var sFilter = oEvent.oSource.getFilter();
				var oSearchField = this.getOwnerComponent().byId("controlsMaster").byId("searchField");
				oSearchField.setValue(sFilter);
				oSearchField.fireLiveChange({
					newValue: sFilter
				});
				// tablet or small screen devices: show master page
				setTimeout(function () {
					this.getSplitApp().showMaster();
				}.bind(this), 0);
				// phone: navigate to master list
				if (Device.system.phone) {
					this.getRouter().navTo("controlsMaster", {});
				}
			}
		});
	}
);