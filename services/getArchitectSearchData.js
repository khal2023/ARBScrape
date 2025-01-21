const axios = require('axios');

const getArchitectSearchDataByPage = async (searchTerm, pageNumber) => {
	try {
		const data = (searchTerm, pageNumber) => JSON.stringify({
			"filters": [
				{
				"IndexFilterId": "Architect",
				"Column": "RegistrationNumber",
				"Display": "Registration number",
				"AdditionalText": null,
				"AllowMultiple": null,
				"Type": "text",
				"WildcardStart": false,
				"WildcardEnd": false,
				"SoundsLike": false,
				"SoundsLikeEnabled": false,
				"SoundsLikeDefault": false,
				"SelectItems": null,
				"Value": null
				},
				{
				"IndexFilterId": "Architect",
				"Column": "ArchitectForename",
				"Display": "Forename",
				"AdditionalText": null,
				"AllowMultiple": null,
				"Type": "text",
				"WildcardStart": false,
				"WildcardEnd": false,
				"SoundsLike": false,
				"SoundsLikeEnabled": false,
				"SoundsLikeDefault": false,
				"SelectItems": null,
				"Value": null
				},
				{
				"IndexFilterId": "Architect",
				"Column": "ArchitectSurname",
				"Display": "Surname",
				"AdditionalText": null,
				"AllowMultiple": null,
				"Type": "text",
				"WildcardStart": false,
				"WildcardEnd": false,
				"SoundsLike": false,
				"SoundsLikeEnabled": false,
				"SoundsLikeDefault": false,
				"SelectItems": null,
				"Value": searchTerm
				},
				{
				"IndexFilterId": "Architect",
				"Column": "CompanyName",
				"Display": "Company name",
				"AdditionalText": null,
				"AllowMultiple": null,
				"Type": "text",
				"WildcardStart": false,
				"WildcardEnd": false,
				"SoundsLike": false,
				"SoundsLikeEnabled": false,
				"SoundsLikeDefault": false,
				"SelectItems": null,
				"Value": null
				},
				{
				"IndexFilterId": "Architect",
				"Column": "Address",
				"Display": "Address (contains)",
				"AdditionalText": null,
				"AllowMultiple": null,
				"Type": "text",
				"WildcardStart": true,
				"WildcardEnd": true,
				"SoundsLike": false,
				"SoundsLikeEnabled": false,
				"SoundsLikeDefault": false,
				"SelectItems": null,
				"Value": null
				},
				{
				"IndexFilterId": "Architect",
				"Column": "Country",
				"Display": "Country",
				"AdditionalText": null,
				"AllowMultiple": null,
				"Type": "select",
				"WildcardStart": true,
				"WildcardEnd": true,
				"SoundsLike": false,
				"SoundsLikeEnabled": false,
				"SoundsLikeDefault": false,
				"SelectItems": null,
				"Value": null
				},
				{
				"IndexFilterId": "Architect",
				"Column": "Website",
				"Display": "Website",
				"AdditionalText": null,
				"AllowMultiple": null,
				"Type": "text",
				"WildcardStart": false,
				"WildcardEnd": false,
				"SoundsLike": false,
				"SoundsLikeEnabled": false,
				"SoundsLikeDefault": false,
				"SelectItems": null,
				"Value": null
				},
				{
				"IndexFilterId": "Architect",
				"Column": "Email",
				"Display": "Email",
				"AdditionalText": null,
				"AllowMultiple": null,
				"Type": "text",
				"WildcardStart": true,
				"WildcardEnd": true,
				"SoundsLike": false,
				"SoundsLikeEnabled": false,
				"SoundsLikeDefault": false,
				"SelectItems": null,
				"Value": null
				},
				{
				"IndexFilterId": "Architect",
				"Column": "Geography",
				"Display": "Distance from UK postcode",
				"AdditionalText": null,
				"AllowMultiple": null,
				"Type": "radius",
				"WildcardStart": false,
				"WildcardEnd": false,
				"SoundsLike": false,
				"SoundsLikeEnabled": false,
				"SoundsLikeDefault": false,
				"SelectItems": null,
				"Value": null
				}
			],
			"sorting": "Architect Surname (a - z)",
			"bounds": null,
			"indexFilterId": "Architect",
			"page": pageNumber
			});
		
		const config = (searchTerm, pageNumber) => ({
			method: 'post',
			maxBodyLength: Infinity,
			url: 'https://architects-register.org.uk/registrant/list',
			headers: { 
				'Accept': 'application/json', 
				'Accept-Language': 'en-US,en;q=0.9', 
				'Connection': 'keep-alive', 
				'Content-Type': 'application/json', 
				'Origin': 'https://architects-register.org.uk', 
				'Referer': 'https://architects-register.org.uk', 
				'X-Requested-With': 'XMLHttpRequest'
			},
			data : data(searchTerm, pageNumber)
			});

		const response = await axios.request(config(searchTerm, pageNumber))
		return (response.data)
	} catch (error) {
		console.error(error)
	}
}

module.exports =  getArchitectSearchDataByPage;