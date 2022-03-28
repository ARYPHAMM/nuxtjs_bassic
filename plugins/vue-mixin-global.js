import Vue from "vue";
import variables from "./variables";
import errors from "./errors";
import methods from "./methods";
import computed from "./computed";
var mixin = {
  data: function () {
    return { ...variables, errors: errors };
  },
  computed: computed,
  methods: methods,

};
Vue.mixin(mixin);
