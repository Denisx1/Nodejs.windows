const { User } = require('../database')

module.exports = {
  getUsersWithCount: async (query = {}) => {
    const { limit = 20, page = 1, ...otherFilters } = query;
    const skip = (page - 1) * limit;

    let filterObject = {};

    if (otherFilters.search) {
      filterObject = {
        ...filterObject,
        $or: [
          { name: { $regex: otherFilters.search, $options: 'i' } },
          { email: { $regex: otherFilters.search, $options: 'i' } },
        ]
      }
    }

    if (otherFilters.ageGte) {
      filterObject = {
        ...filterObject,
        age: { $gte: +otherFilters.ageGte }
      }
    }

    if (otherFilters.ageLte) {
      filterObject = {
        ...filterObject,
        age: Object.assign(filterObject.age || {}, { $lte: +otherFilters.ageLte })
      }
    }

    const users = await User.find(filterObject).limit(limit).skip(skip);
    const count = await User.count(filterObject);

    return {
      page,
      perPage: limit,
      data: users,
      count
    }
  }
};