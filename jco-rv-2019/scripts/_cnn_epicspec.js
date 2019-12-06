/*A global object needs to be created for the property (e.g., CNN, CNNI).* This is the edition portion of the registry file in all caps.*/
function setEpicSpec(win, brandingValue, registryFile) {
	
	var edition = registryFile.split('_')[0].toUpperCase();
	
	if (brandingValue !== '') {
	
		win[edition] = win[edition] || {};
		win[edition].adTargets = win[edition].adTargets || {
			adfeature: brandingValue
		};
		win[edition].adTargets.adfeature = brandingValue;
		
	}
	
};