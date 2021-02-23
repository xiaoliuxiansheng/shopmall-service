const router = require( 'koa-router' )()

const db = require( '../models/index' )
const users = require( './controllers/users.js' )
// console.log(db.Company)
router.prefix('/api')
router.post( '/register', users.userRegister )
router.post( '/userLogin', users.userLogin )
router.put('/user/name', users.updateName)
router.put('/user/password', users.updatePassword)
router.delete( '/delete/:id', users.deltitem )
router.get( '/select/:id', users.select )
router.put( '/update/:id', users.update )
router.post( '/findUsers', users.findUsers )
router.get( '/users', users.users )
router.get( '/bar', function (ctx, next) {
    ctx.body = 'this is a users/bar response'
} )

module.exports = router
