const { groupBy, mean } = require("lodash")
const { inputLogic, userLogic } = require("../logic")
const openAi = require("../services/openAi")

module.exports = {
    getMostSearchedCities: async (loggedUserId) => {
        const relatedUser = await userLogic.findOne({ id: loggedUserId })
        if (!relatedUser) {
            let error = new Error('USER_NOT_FOUND')
            error.status = 404

            throw error
        }

        const { rows } = await inputLogic.findAndCountAll({ UserId: loggedUserId }, { limit: 30, order: [['createdAt', 'DESC']] })

        const mostInputsByLocation = groupBy(rows, 'location')
        let openAiPrices = {}
        let result = []

        for (const city of Object.keys(mostInputsByLocation)) {
            const priceInCityNow = await openAi.getDataFromOpenAi(`
            Can you give me the average price for accommodations in ${city} for one night?
            `)
            let matches = priceInCityNow[0].message.content.match(/\d+/g);
            openAiPrices[city] = matches && matches.length > 0 ? mean(matches.filter(it => Number(it) > 30 && Number(it) < 400).map(it => Number(it))) : 0
        }

        Object.keys(mostInputsByLocation).forEach(key => {
            const entries = mostInputsByLocation[key]
            const meanPrice = mean(entries.map(el => Number(el.price)))
            const currentPrice = openAiPrices[key] || meanPrice
            result = result.concat({
                city: key,
                currentPrice: currentPrice ? currentPrice.toFixed(2) : meanPrice.toFixed(2),
                meanPrice: meanPrice.toFixed(2),
                statistic: currentPrice > meanPrice ? 'high' : 'low'
            })
        })

        return {
            data: result
        }
    },
    getAccommodationsForMostSearchedCities: async (loggedUserId) => {
        const relatedUser = await userLogic.findOne({ id: loggedUserId })
        if (!relatedUser) {
            let error = new Error('USER_NOT_FOUND')
            error.status = 404

            throw error
        }

        const { rows } = await inputLogic.findAndCountAll({ UserId: loggedUserId }, { limit: 30, order: [['createdAt', 'DESC']] })

        const mostInputsByLocation = groupBy(rows, 'location')
        let openAiAccommodations = {}

        for (const city of Object.keys(mostInputsByLocation)) {
            const accommodationsInCity = await openAi.getDataFromOpenAi(`
                Can you give me one accommodation in ${city}? In the format 
                Name:
                Link:
                Price:
                Short Description:
                ?
            `)
            const rows = accommodationsInCity[0].message.content.split('\n')
            openAiAccommodations[city] = {
                name: rows[0] ? rows[0].split('Name:')[1] : 'Name',
                link: rows[1] ? rows[1].split('Link:')[1] : 'Link',
                price: rows[2] ? rows[2].split('Price:')[1] : 'Price',
                description: rows[3] ? rows[3].split('Short Description:')[1] : 'Description',
            }
        }

        return {
            data: openAiAccommodations
        }

    }
}