const dayjs = require('dayjs')
const utc = require('dayjs/plugin/utc')
const { Amodel } = require('../database')

dayjs.extend(utc)

module.exports = async () => {
    const sevenDaysBeforeNow = dayjs().utc().subtract(7, 'days')

    const query = await Amodel.deleteMany( { createdAt: { $lte: sevenDaysBeforeNow } } )

    console.log(query)
    
}