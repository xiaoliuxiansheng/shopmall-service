/**
 * @name: auth
 * @author: LIULIU
 * @date: 2021-02-23 13:55
 * @description：auth
 * @update: 2021-02-23 13:55
 */
const jwt = require( 'jsonwebtoken' );
const db = require( '../../models' );
const Sequelize = require( 'sequelize' );
const Op = Sequelize.Op;
/**
 * 生成token
 * */

exports.getToken = async (msg) => {

    let res = await handleGenerateToken( msg );

    return res
}

const handleGenerateToken = (msg) => {
    const token = jwt.sign( {
        //token的创建日期
        time: Date.now(),
        //token的过期时间
        timeout: Date.now() + 60000,
        phone: msg.phone,
        id: msg.id
    }, 'token' )
    return token
}

/**
 * 验证token
 * */

exports.checkToken = async (ctx, next) => {
    let url = ctx.url.split( '?' )[0]
    // 如果是登陆页面和注册页面就不需要验证token了
    if ( url.includes( 'register' ) || url.includes( 'userLogin' ) ) {
        await next()
    } else {
        // 否则获取到token
        let token = ctx.header['authorization'] || ctx.request.headers["authorization"]
        if ( token ) {
            // 如果有token的话就开始解析
            token = token.replace( "Bearer ", "" );
            const tokenItem = jwt.verify( token, 'token' )
            let res = await db.users.findOne( {
                where: {
                    id: tokenItem.id,
                }
            } )
            // 判断用户是否存在
            if ( !res ) {
                ctx.body = {
                    status: -1,
                    message: '该用户不存在！'
                }
                return
            }
            // 将token的创建的时间和过期时间结构出来
            const { time, timeout } = tokenItem
            // 拿到当前的时间
            let data = new Date().getTime();
            // 判断一下如果当前时间减去token创建时间小于或者等于token过期时间，说明还没有过期，否则过期
            if ( data - time <= timeout ) {
                // token没有过期
                await next()
            } else {
                ctx.body = {
                    status: 405,
                    message: 'token 已过期，请重新登陆'
                }
            }
        }
    }
}
