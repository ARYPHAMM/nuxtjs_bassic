import qs from "qs";
const state = {
  items: [],
  filter: {
    state: "",
    type_customer: "",
  },
  pagination: {
    page: 1,
    lastPage: 0,
    last_page: 0,
    perPage: 0,
    total: 0,
    total_current: 0,
  },
  sortDate: "default",
  sortMoney: "default",
};
const getters = {
  getSortDate: (state) => {
    return state.sortDate;
  },
  getSortMoney: (state) => {
    return state.sortMoney;
  },
  getItems: (state) => {
    return state.items;
  },
  getPagination: (state) => {
    return state.pagination;
  },
  getFilter: (state) => {
    return { ...state.filter, page: state.pagination.page };
  },
};
const actions = {
  async fetchItems({ commit, rootState }, filter) {
    try {
      const response = await this.$axios.get(
        `/loan-procedues?${qs.stringify(filter)}`,
        {
          headers: { Authorization: `Bearer ${rootState.auth.token}` },
        }
      );
      commit("setItems", { ...response.data.data, filter: filter });
    } catch (error) {
      console.log(error);
    }
  },
};
const mutations = {
  setSortDate: (state, p) => {
    state.sortMoney = "default";
    state.sortDate =
      p === "default" ? "increase" : p === "increase" ? "decrease" : "increase";
    if (state.sortDate == "increase")
      state.items.sort(function (a, b) {
        return new Date(a.created_at) - new Date(b.created_at);
      });
    if (state.sortDate == "decrease")
      state.items.sort(function (a, b) {
        return new Date(b.created_at) - new Date(a.created_at);
      });
  },
  setSortMoney: (state, p) => {
    state.sortDate = "default";
    state.sortMoney =
      p === "default" ? "increase" : p === "increase" ? "decrease" : "increase";
    if (state.sortMoney == "increase")
      state.items.sort(function (a, b) {
        return (
          parseFloat(a.loan_procedue.amount) -
          parseFloat(b.loan_procedue.amount)
        );
      });
    if (state.sortMoney == "decrease")
      state.items.sort(function (a, b) {
        return (
          parseFloat(b.loan_procedue.amount) -
          parseFloat(a.loan_procedue.amount)
        );
      });
  },
  setItems: (state, items) => {
    state.sortMoney = "default";
    state.sortDate = "default";
    state.items = items.data;
    state.pagination.total_current = items.data.length;
    state.pagination.perPage = items.perPage;
    state.pagination.total = items.total;
    state.pagination.lastPage = items.lastPage;
    state.pagination.last_page = items.last_page;
    state.pagination = {
      ...state.pagination,
      page: items.current_page,
    };
    for (var k in state.filter) {
      state.filter[k] = items.filter[k];
    }
  },
};
export default {
  state,
  getters,
  mutations,
  actions,
};
