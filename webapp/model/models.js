sap.ui.define([
	"sap/ui/model/json/JSONModel",
	"sap/ui/Device",
	"sap/ui/core/MessageType"
], function (JSONModel, Device, MessageType) {
	"use strict";

	return {

		createDeviceModel: function () {
			var oModel = new JSONModel(Device);
			oModel.setDefaultBindingMode("OneWay");
			return oModel;
		},

		viewModelData: {
			state: {
				busy: false
			},
			// Fields used in currently open item popover or in the create item dialog.
			// Note: each field will be given additional properties:
			// 'value', 'valueState' and 'valueStateText' by the _resetFields method. 
			// In the case of the Item Popover, controls are bound directly to the oODataModel
			// and the 'value' is not used.
			fields: {
				material: {
					label: "Part Number",
					initialValue: "",
					required: item => !item.description,
					canSearch: true,
					canSort: true,
					initialSortPosition: 0
				},
				description: {
					label: "Part Description",
					initialValue: "",
					required: item => !item.material,
					canSearch: true,
					canSort: true
				},
				type: {
					label: "Order type",
					initialValue: "",
					required: false,
					noValueState: true,
					canSort: true
				},
				objectkey: {
					label: "Order id",
					initialValue: "",
					canSearch: true,
					required: item => item.type !== "",
					canSort: true
				},
				line: {
					label: "Item id",
					initialValue: "",
					canSort: true
				},
				quantity: {
					initialValue: null,
					label: "Quantity required",
					required: item => !item.unlimitedQuantity,
					canSort: true
				},
				unlimitedQuantity: {
					initialValue: false,
					label: "Unlimited",
					required: false
				},
				quantityIssued: {
					initialValue: "0",
					label: "Quantity issued"
				},
				uom: {
					initialValue: "EA",
					label: "Unit of measure",
					required: true
				},
				dueDate: {
					label: "Due date",
					initialValue: null,
					required: false,
					canSort: true
				},
				deliverTo: {
					label: "Deliver to",
					initialValue: "",
					required: false,
					canSort: true
				},
				comments: {
					label: "Comments",
					initialValue: "",
					required: false
				},
				enteredByName: {
					label: "Contact",
					initialValue: "",
					canSearch: true,
					canSort: true
				},
				supplierName: {
					label: "Supplier",
					initialValue: "",
					canSearch: true,
					canSort: false
				}
			},
			itemPopover: {
				hasError: false // Can't get formatter to refire on change to value state in fields so using this redundant prop
			},
			create: {
				message: {
					type: MessageType.None,
					text: ""
				}
			},
			selectedCount: 0,
			referenceTypes: [{
				id: "",
				description: ""
			}, {
				id: "P",
				description: "Purchase Order"
			}, {
				id: "S",
				description: "Sales Order"
			}, {
				id: "D",
				description: "Production Order"
			}],
			search: {
				value: "",
				fields: [] // populated in _initSearchFields()
			},
			sort: {
				fields: [], // populated in _initSortFields()
				activeFieldCount: 0 // populated in _updateSortActiveFieldCount()
			}
		}
	};
});