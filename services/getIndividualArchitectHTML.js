const axios = require('axios');
const fs = require('fs')

const config = (architectURL) => ({
  method: 'get',
  maxBodyLength: Infinity,
  url: `https://architects-register.org.uk${architectURL}`,
  headers: { }
});

const getIndividualArchitectHTML = async (architectURL) => {
    try {
        const response = await axios.request(config(architectURL))
        return (response.data)
    } catch (error) {
        console.error
    }
}

getIndividualArchitectHTML("/Architect/097834E?filterId=Architect")

module.exports = getIndividualArchitectHTML;