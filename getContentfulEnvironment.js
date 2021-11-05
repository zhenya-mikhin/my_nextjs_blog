const contentfulManagement = require("contentful-management")

module.exports = function() {
	const contentfulClient = contentfulManagement.createClient({
		accessToken: 'CFPAT-RaEmuE9NAVe7bLSMBaF8WR90SiKCmAFs_gXV75Ef6eg'
	})

	return contentfulClient
		.getSpace('br1v15i42mgx')
		.then(space => space.getEnvironment('master'))
}