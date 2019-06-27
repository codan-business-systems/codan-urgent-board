sap.ui.define([
	"sap/ui/core/ValueState"
	], function (ValueState) {
	"use strict";
	return {
		navToGRButtonVisible(bItemHasError, bNavToGRAllowed, bItemComplete) {
			return bItemHasError === false
				&& bNavToGRAllowed === true
				&& bItemComplete !== true;
		},

		inputQuantityEnabled(bUnlimitedQuantity, bUpdateAllowed) {
			return !bUnlimitedQuantity && bUpdateAllowed;
		},

		createButtonVisible(bCreateAllowed, nItemsSelected) {
			return bCreateAllowed === true
				&& nItemsSelected === 0;
		},

		userFilterOrSortOptionVisible(bSearchAllowed, nItemsSelected) {
			return bSearchAllowed === true
				&& nItemsSelected === 0;
		},
		combinedQuantityText(nQuantityRequired, nQuantityIssued, bUnlimitedQuantity) {
			if (!!nQuantityIssued && Number(nQuantityIssued) > 0) {
				return `${nQuantityIssued} / ${
					bUnlimitedQuantity ? "∞" : nQuantityRequired
				}`;
			} else {
				return bUnlimitedQuantity ? "∞" : nQuantityRequired;
			}			
		},
		deliverToAndNotesText(sDeliverTo, sNotes) {
			const truncNotesToLen = 40;
			var aValues = [];
			if (sDeliverTo) {
				aValues.push(sDeliverTo);
			}
			if (sNotes) {
				if (aValues.length) {
					aValues.push(" / ");
				}
				aValues.push(sNotes.substr(0, truncNotesToLen));
				if (sNotes.length > truncNotesToLen) {
					aValues.push("...");
				}
			}
			return aValues.join("");
		},
		orderText(sObjectKey, sLine) {
			let sText = "";
			if (sObjectKey) {
				sText = sObjectKey;
				if (sLine) {
					const nLine = Number(sLine);
					if (nLine) {
						sText = `${sText}/${Number(sLine)}`;
					}
				}
			}
			return sText;
		},
		
		typeIconSrc(sType) {
			let sSrc;
			switch (sType) {
				case "P":
					// Purchase Order
					sSrc = "sap-icon://shelf";
					break;
				case "S":
					// Sales Order
					sSrc = "sap-icon://sales-order-item";
					break;
				case "D":
					// Production Order
					sSrc = "sap-icon://factory";
					break;
				default:
					sSrc = "sap-icon://question-mark";
			}
			return sSrc;
		},
		modifyActiveSortColumnVisible(nActiveFieldCount) {
			// Using formatter for this because complex expression binding
			// doesn't seem to be updating dynamically
			if (nActiveFieldCount) {
				return true;
			} else {
				return false;
			}
		},
		modifyActiveSortFieldButtonVisible(sSortAscending, sSortDescending) {
			// Using formatter for this because complex expression binding
			// doesn't seem to be updating dynamically
			if (sSortAscending || sSortDescending) {
				return true;
			} else {
				return false;
			}
		},
		//'quantity', 'quantityIssued', 'unlimitedQuantity', 'updateQuantity'
		validateUpdateQuantity(orderQuantity, quantityIssued, unlimitedQuantity, updateQuantity) {
			var result = ValueState.None;
			
			if (unlimitedQuantity) {
				return result;
			}
			
			var total = Number(quantityIssued) + Number(updateQuantity);
			if (Number(total) > Number(orderQuantity)) {
				result = ValueState.Error;
			}
			
			return result;
		},
		
		/**
		 * Adapt color of I'm Here icon rather than set visibility so as to
		 * preserve column sizing / overflow button alignment
		 */
		imHereIconColor(bImHere) {
			return bImHere
				? 'green'
				: "#F5F5F5"; // Gray so light it's almost invisible
		}
	};
});
