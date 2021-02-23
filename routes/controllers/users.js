/**
 * @name: website.js
 * @author: LIULIU
 * @date: 2020-08-04 10:19
 * @description：website.js
 * @update: 2020-08-04 10:19
 */
const db = require('../../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
/**
 *  新增
 *
 */
 exports.addlist = async (ctx, next) => {
    const {name, url, alexa, country} = ctx.request.body;
    let res = await db.website.findOrCreate({
        where: {
            name
        },
        defaults: {
            name,
            alexa,
            country,
            url
        }
    });
    if (!res[1]) {
        ctx.body = {
            errcode: -1,
            msg: '新增失败，模块名称重复！'
        };
    } else {
        ctx.body = {
            errcode: 0,
            msg: '新增成功！'
        };
    }
}
 /**
 *删除
 */
exports.deltitem = async (ctx,next) => {
    const { id } = ctx.params;
    let res = await db.website.destroy({
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
    let res = await db.website.findOne({
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

exports.users = async (ctx, next) => {
    let res = await db.website.findAndCountAll({
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

exports.findUsers = async (ctx, next) => {
    console.log(ctx.request.body)
    let res = await db.website.findAll({
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
    let res = await db.website.update({name, url, alexa, country},{where:{id}})
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
