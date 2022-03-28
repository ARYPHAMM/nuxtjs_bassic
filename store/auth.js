import qs from "qs";
const state= {
  user: {},
  token: window.localStorage.getItem("token")
}
const getters = {
  getUser: (state)=>{
    return state.user
  },
  getToken: (state)=>{
    return state.token
  }
}
const actions = {
  async login({ commit },data) {
    const response = await this.$axios({
      method: "post",
      url: `/login`,
      data: data,
      headers: {
        "Content-Type":"application/json",
      },
    })
    commit('setToken',response.data.data.token);
    commit('setUser',response.data.data.user);
  },
  async register({commit},data)
  {
    const response = await this.$axios({
      method: "post",
      url: `/staffs`,
      data: data,
      headers: {
        "Content-Type":"application/json",
      },
    })
  },
  async fetchUser({ commit, state }) {
      //eslint-disable-next-line no-unused-vars
      const response = await this.$axios.get("/auth/me", {
          headers: {
              Accept: "application/json",
              Authorization: `Bearer ${state.token}`
          }
      });
      commit("setUser", response.data.data.user);
  },
  async logout({ commit, state }) {
      //eslint-disable-next-line no-unused-vars
      commit("setUser", {});
      const response = await this.$axios.get("/auth/logout", {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${state.token}`
        }
      });
      commit("setToken", "");
     
  },
}
const mutations = {
  setToken: (state, token) => {
    localStorage.setItem('token', token);
    state.token = token;
  },
  setUser: (state,user) => {
      state.user = user;
  }
}
export default{
  state,
  getters,
  mutations,
  actions
}