const {User} = require('../database')

module.exports = {
    getUsersWithCount: async (query = {}) => {
        try {
            console.log(User)
            const { limit = 20, page = 1, search } = query;
            const skip = (page - 1) * limit;

            let filterObject = {};

            if (search) {
                filterObject = {
                    name: search,

                    // email: { $regex: search, $options: 'i' }
                },
                    'name email'
            }
            console.log(search)
            console.log(filterObject)

            const users = await User.find({ name: search }, 'name email')
            const count = await User.count(filterObject);
            console.log(users)


            return {
                page,
                parPage: limit,
                data: users,
                // count
            }
        }catch(e){
            console.log(e)
        }
    }
}