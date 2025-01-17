const axios = require('axios');

const config = (architectURL) => ({
  method: 'get',
  maxBodyLength: Infinity,
  url: `https://architects-register.org.uk${architectURL}`,
  headers: { }
});

const getIndividualArchitectHTML = async (architectURL) => {
    try {
        const response = await axios.request(config(architectURL))
        return (JSON.stringify(response.data))
    } catch (error) {
        console.error
    }
}

module.exports = getIndividualArchitectHTML;