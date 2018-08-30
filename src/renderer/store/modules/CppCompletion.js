const doc = {
    types: [{
        name: 'uint64_t'
    }, {
        name: 'int64_t'
    }],
    apis: [{
        name: 'current_receiver',
        returnType: 'uint64_t',
        belong: '<graphenelib/action.h>',
        description: {
            'zh-CN': '返回当前合约账号的id',
            'en-US': 'return current contract account ID'
        }
    }, {
        name: 'get_action_asset_id',
        returnType: 'uint64_t',
        belong: '<graphenelib/action.h>',
        description: {
            'zh-CN': '返回本次调用向合约发送的资产id'
        }
    }, {
        name: 'get_action_asset_amount',
        returnType: 'uint64_t',
        belong: '<graphenelib/action.h>',
        description: '返回本次调用向合约发送的资产数量'
    }, {
        name: 'withdraw_asset',
        returnType: 'void',
        belong: '<graphenelib/asset.h>',
        fields: [{
            name: 'from',
            type: 'uint64_t',
            description: {
                'zh-CN': '从哪个账号转账，一般是_self',
                'en-US': 'transfer from which account, normally _self'
            }
        }, {
            name: 'to',
            type: 'uint64_t',
            description: {
                'zh-CN': '转账到哪个外部账户，必须只传账号的instance_id，比如外部账户是1.2.33，那么传33即可'
            }
        }, {
            name: 'asset_id',
            type: 'uint64_t',
            description: {
                'zh-CN': '指定转账的资产id，必须只传资产id的instance_id, 比如资产id是1.3.0， 那么传0即可'
            }
        }, {
            name: 'amount',
            type: 'int64_t',
            description: {
                'zh-CN': '转账金额，这个数字包含了资产的精度，比如想转1个GXC，那么应该写100000'
            }
        }],
        description: '将当前合约的资产转移到外部账户'
    }]
}

const state = {
    lastSha: '',
    completions: []
}

const mutations = {
    UPDATE_COMPLETIONS(state, completions) {
        state.completions = completions
    }
}

function filterJson(json) {
    const types = json.types.map((type) => {
        return {
            value: type.name,
            meta: 'keyword'
        }
    })

    const apis = json.apis.map((api) => {
        return {
            fields: [],
            ...api,
            value: api.name,
            meta: 'gxc_api',
            score: 9999999
        }
    })

    return [...types, ...apis]
}

const actions = {
    updateCompletions({commit}) {
        // fetch api json
        // filter
        commit('UPDATE_COMPLETIONS', filterJson(doc))
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
