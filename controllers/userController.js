const { s3Servise } = require('../services')
const { User, Amodel, Role } = require('../database')
const ApiError = require('../errors/error')
const fs = require('fs')
const path = require('path')


module.exports = {
    getAllUser: async (req, res, next) => {
        try {
            const { limit = 2, page = 1 } = req.query
            const skip = (page - 1) * limit

            const users = await User.find().skip(skip)
            const count = await User.count({})

            res.json({
                page,
                parPage: limit,
                data: users,
                count
            })
        } catch (e) {
            next(e)
        }
    },

    getLoginUser: async (req, res, next) => {
        try {
            const { limit = 4, page = 1 } = req.query
            const skip = (page - 1) * limit
            const users = await Amodel.find().skip(skip)
            const count = await Amodel.count({})

            res.json({
                page,
                parPage: limit,
                data: users,
                count
            })
        } catch (e) {
            next(e)
        }
    },

    getUserById: async (req, res, next) => {
        try {
            const { userIndex } = req.params
            const user = await User.findById(userIndex)

            if (!user) {
                next(new ApiError(`User with ${userIndex} is not found`, 404))
                return
            }

            res.json(user)

        } catch (e) {
            next(e)
        }
    },

    deleteUserById: async (req, res, next) => {
        try {
            const { userIndex } = req.params
            const userDelete = await User.deleteOne({ _id: userIndex })

            res.json({
                _id: userIndex,
                userDelete,
            })

        } catch (e) {
            next(e)
        }
    },

    updateUserRols: async (req, res, next) => {
        try {
            const { userIndex } = req.params
            const adminRole = new Role({ value: "ADMIN" })
            const userUpdate = await User.updateOne(
                { _id: userIndex },
                { role: adminRole.value }
            )
            res.json(userUpdate)

        } catch (e) {
            next(e)
        }
    },

    downgrade: async (req, res, next) => {
        try {
            const { userIndex } = req.params
            const userRole = new Role()
            const downRole = await User.updateOne(
                { _id: userIndex },
                { role: userRole.value }
            )
            res.json(downRole)
        } catch (e) {
            next(e)
        }
    },

    uploadUserPhoto: async (req, res, next) => {
        try {
            const avatar = req.files.avatar
            const user = req.user

            const stringPromise = await s3Servise.uploadFile(avatar, 'user', user._id)

            res.json(stringPromise)
        } catch (e) {
            next(e)
        }
    },

    getStaticPage: async (req, res) => {
        try {
            res.render('index')
        } catch (e) {
            console.error(e)
        }
    }
}



// res.render()
// await fs.readFile(path.join(appRoot + '/static/index.html'), function (err,data) {
//     if (err) {
//       res.writeHead(404);
//       res.end(JSON.stringify(err));
//       return;
//     }
//     res.writeHead(200);
//     res.end(data)
//   });
