/**
 * @name: users.js
 * @author: LIULIU
 * @date: 2021-02-23 13:55
 * @description：users.js
 * @update: 2021-02-23 13:55
 */
const db = require('../../models');
const { getToken } = require('./auth');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
/**
 *  新增
 *
 */
 exports.userRegister = async (ctx, next) => {
    const {name, phone, password} = ctx.request.body;
    if ( !(name && phone && password)) {
        ctx.body = {
            errcode: -1,
            msg: '请完善注册信息！'
        };
        return
    }
    const [user, created] = await db.users.findOrCreate({
        where:{phone},
        default:{name, phone, password}
    });
    if (!created) {
        ctx.body = {
            errcode: -1,
            msg: '该手机已被注册！'
        };
    } else {
        const token = await getToken({id:user.id,phone})
        ctx.body = {
            errcode: 0,
            msg: '注册成功！'
        };
    }
}

/**
 * 登录
 * */
exports.userLogin = async (ctx, next) => {
    const { phone, password } = ctx.request.body;
    let res = await db.users.findOne({
        where:{
            phone,
            password
        }
    })
    if (res === null ) {
        ctx.body = {
            errcode:-1,
            msg:'账号或者密码错误！'
        }
    } else {
        const token = await getToken({id:res.id,phone})
        ctx.body = {
            errcode: 0,
            msg: '登录成功！',
            token,
            data: res
        };
    }
}

/**
 * 修改用户名
 * */

exports.updateName = async (ctx, next) => {
    const { id, name } = ctx.request.body;
    if ( !(name && id )) {
        ctx.body = {
            errcode: -1,
            msg: '缺少必要信息！'
        };
        return
    }
    let res = await db.users.update({ name }, {
        where: {
            id
        }
    });
    if ( res === 0 ) {
        ctx.body = {
            errcode:-1,
            msg:'修改失败！'
        }
    } else {
        ctx.body = {
            errcode:0,
            msg:'修改成功！'
        }
    }
}

/**
 * 修改密码
 * */

exports.updatePassword = async (ctx, next) => {
    const { id, oldpwd, newpwd } = ctx.request.body;
    if ( !(id && oldpwd && newpwd)) {
        ctx.body = {
            errcode: -1,
            msg: '缺少必要信息！'
        };
        return
    }
    let res = await db.users.update({ password: newpwd }, {
        where: {
            id,
            password:oldpwd
        }
    });
    if ( res === 0 ) {
        ctx.body = {
            errcode:-1,
            msg:'修改失败！'
        }
    } else {
        ctx.body = {
            errcode:0,
            msg:'修改成功！'
        }
    }
}

/**
 * 获取用户列表
 * */

exports.userList = async (ctx, next) => {
    let res = await db.users.findAndCountAll({
        offset: (Number(ctx.query.page) - 1) * Number(ctx.query.size),
        limit: Number(ctx.query.size)
    })
    if (res === null) {
        ctx.body = {
            errcode:-1,
            msg:'该数据不存在！'
        }
    } else {
        ctx.body = {
            errcode:0,
            msg:'查找成功！',
            data:res
        }
    }
}

 /**
 *删除
 */
exports.deltitem = async (ctx,next) => {
    const { id } = ctx.params;
    let res = await db.users.destroy({
        where:{
            id
        }
    })
    if (res === 0) {
        ctx.body = {
            errcode:-1,
            msg:'删除失败！'
        }
    } else {
        ctx.body = {
            errcode:0,
            msg:'删除成功！'
        }
    }
}

/**
 *查询
 * */

exports.select = async (ctx, next) => {
    const { id } = ctx.params;
    let res = await db.users.findOne({
        where:{
            id
        }
    })
    if (res === null) {
        ctx.body = {
            errcode:-1,
            msg:'该数据不存在！'
        }
    } else {
        ctx.body = {
            errcode:0,
            msg:'查找成功！',
            data:res
        }
    }
}

exports.findUsers = async (ctx, next) => {
    console.log(ctx.request.body)
    let res = await db.users.findAll({
        where: {
            name:{
                [Op.substring]: `${ctx.request.body.name}`
            }
        }
    })
    if (res === null) {
        ctx.body = {
            errcode:-1,
            msg:'该数据不存在！'
        }
    } else {
        ctx.body = {
            errcode:0,
            msg:'查找成功！',
            data:res
        }
    }
}
/**
 *
 * 修改
 */

exports.update = async (ctx, next) => {
    const {id} = ctx.params;
    const {name, url, alexa, country} = ctx.request.body;
    let res = await db.users.update({name, url, alexa, country},{where:{id}})
    console.log(res)
    if (res[0] !== 1) {
        ctx.body = {
            errcode:-1,
            msg:'更新失败！'
        }
    } else {
        ctx.body = {
            errcode:0,
            msg:'更新成功！'
        }
    }
}
