const router = require( 'koa-router' )()

const db = require( '../models/index' )
const website = require( './controllers/website.js' )
// console.log(db.Company)
// router.prefix('/users')
router.post( '/add', website.addlist )
router.delete( '/delete/:id', website.deltitem )
router.get( '/select/:id', website.select )
router.put( '/update/:id', website.update )
router.post( '/findUsers', website.findUsers )
router.get( '/users', website.users )
router.get( '/bar', function (ctx, next) {
    ctx.body = 'this is a users/bar response'
} )

module.exports = router
