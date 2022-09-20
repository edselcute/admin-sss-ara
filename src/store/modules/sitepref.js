import $api from '../../api'
const state = {
    data: {
        list: [],
        links: [],
        current_page: 0,
        last_page: 0,
        per_page: 0,
        total: 0
    },
    users: []
}

const actions = {
    update({ rootGetters }, pl) {
        return new Promise(function(resolve) {
            $api.post('/site-pref/update', pl, {
                    headers: { 'Authorization': rootGetters['auth/token_bearer'] }
                })
                .then(function(res) {
                    resolve(res)
                })
                .catch(function(err) {
                    if (err.response.status == 401) {
                        dispatch('auth/logoutUser', {}, { root: true }).then(() => {
                            window.location.reload()
                        })
                    }
                })
        })
    },
}

const mutations = {
        setData(state, d) {
            state.data.list = d.data
            state.data.links = d.links
            state.data.current_page = d.current_page
            state.data.last_page = d.last_page
            state.data.per_page = d.per_page
            state.data.total = d.total
        },
        setusers(state, d) {
            state.users = d
        },
    }
    //array1.find(element => element > 10)
const getters = {

}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters,
}