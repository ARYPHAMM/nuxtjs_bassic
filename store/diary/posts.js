import qs from "qs";
const state = {
  items: [],
  pagination: {
    page: 1,
    lastPage: 0,
    last_page: 0,
    perPage: 0,
    total: 0,
  },
};
const getters = {
  getItems: (state) => {
    return state.items;
  },
  getPagination: (state) => {
    return state.pagination;
  },
};
const actions = {
  async fetchItems({ commit, rootState }, page = 1) {
    try {
      const response = await this.$axios.get(
        `/posts?${qs.stringify({ page: page })}`,
        {
          headers: { Authorization: `Bearer ${rootState.auth.token}` },
        }
      );

      commit("setItems", response.data.data);
    } catch (error) {
      console.log(error);
    }
  },
  async setLike({ commit, rootState }, id) {
    try {
      const response = await this.$axios.get(
        `/posts/${id}/like`,
        {
          headers: { Authorization: `Bearer ${rootState.auth.token}` },
        }
      );
      commit("setLike", {id:id,user:rootState.auth.user});
    } catch (error) {
      console.log(error);
    }
  },
  async unLike({ commit, rootState }, id) {
    try {
      const response = await this.$axios.get(
        `/posts/${id}/unlike`,
        {
          headers: { Authorization: `Bearer ${rootState.auth.token}` },
        }
      );
      commit("unLike", {id:id,user_id:rootState.auth.user.root_id});
    } catch (error) {
      console.log(error);
    }
  },
  async removeItem({ commit, rootState }, id) {
    this.$swal({
      text: this.$i18n.t("are_you_sure_delete"),
      type: "warning",
      confirmButtonText:this.$i18n.t("agree"),
      showCancelButton: true,
      cancelButtonText: this.$i18n.t("cancel"),
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await this.$axios.delete(`/posts/${id}`, {
            headers: { Authorization: `Bearer ${rootState.auth.token}` },
          });
          commit("removeItem", id);
          this.$swal(
            this.$i18n.t("notification"),
            response.data.data,
            "success"
          );
        } catch (error) {
          this.$swal(
            this.$i18n.t("notification"),
            error.response.data.msg,
            "warning"
          );
        }
      }
    });
  },
  async hideItem({ commit, rootState }, user_id) {
    this.$swal({
      text: this.$i18n.t("are_you_sure"),
      type: "warning",
      confirmButtonText:this.$i18n.t("agree"),
      showCancelButton: true,
      cancelButtonText: this.$i18n.t("cancel"),
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await this.$axios.get(`/posts/unfollow/${user_id}`, {
            headers: { Authorization: `Bearer ${rootState.auth.token}` },
          });
          commit("hideItem", user_id);
          this.$swal("", response.data.data, "success");
        } catch (error) {
          this.$swal("", error.response.data.msg, "warning");
        }
      }
    });
  },
  async blockUser({ commit, rootState }, user_id) {
    this.$swal({
      text: this.$i18n.t("are_you_sure"),
      type: "warning",
      confirmButtonText:this.$i18n.t("agree"),
      showCancelButton: true,
      cancelButtonText: this.$i18n.t("cancel"),
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await this.$axios.get(`/block/${user_id}/posts/`, {
            headers: { Authorization: `Bearer ${rootState.auth.token}` },
          });
          this.$swal("", response.data.data, "success");
        } catch (error) {
          this.$swal("", error.response.data.msg, "warning");
        }
      }
    });
  },
  async reportItem({ commit, rootState }, id) {
    this.$swal({
      text: this.$i18n.t("are_you_sure"),
      type: "warning",
      confirmButtonText:this.$i18n.t("agree"),
      showCancelButton: true,
      cancelButtonText: this.$i18n.t("cancel"),
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await this.$axios.get(`/posts/${id}/report`, {
            headers: { Authorization: `Bearer ${rootState.auth.token}` },
          });
          this.$swal("", response.data.data, "success");
        } catch (error) {
          this.$swal("", error.response.data.msg, "warning");
        }
      }
    });
  },
};
const mutations = {
  setComment: (state, item) => {
    state.items.map((currentValue) => {
      if (currentValue.id == item.post_id) {
        delete item.post_id;
        currentValue.comments.unshift(item);
      }
    });
  },
  removeItem(state, id) {
    state.items = state.items.filter((item) => item.id !== id);
  },
  setLike(state, data) {
    state.items.map((item) => {
      if(item.id == data.id)
      {
        data.user.id = data.user.root_id;
        item.likers.push(data.user);
      }
    });
  },
  unLike(state, data) {
    state.items.map((item) => {
      if(item.id == data.id)
      {
        item.likers.filter((item1) => item1.id !== data.user_id);
      }
    });
  },
  hideItem(state, user_id) {
    state.items = state.items.filter((item) => item.user_id.id !== user_id);
  },
  setItems: (state, items) => {
    items.data.map((currentValue) => {
      currentValue.comments = currentValue.comments.filter(
        (item) => item.user_id !== null
      );
    });
    state.items = state.items.concat(items.data);
    // state.items = [...new Set(state.items)];
    state.pagination.perPage = items.perPage;
    state.pagination.total =
      items.data.length <= 0 ? 0 : state.pagination.perPage + items.perPage;
    state.pagination.lastPage = items.last_page;
    state.pagination = {
      ...state.pagination,
      page: items.current_page,
    };
  },
};
export default {
  state,
  getters,
  mutations,
  actions,
};
