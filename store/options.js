import qs from "qs";
import Vue from 'vue';
const state = {
  allCountries: [],
  allProvinces: [],
  allDistricts: [],
  allBanks: [],
  allBrands: [],
  allBannerSites: [],
  allDepartments: [],
  allTitles: [],
  loanStates:[],
  loanTypes:[],
  allStaffs:[],
  allCareers:[],
  loanProcedueStates:[],
  typeCustomers:[],
  permissionTypes:[],
  loading:false,
  moduleActive:'repayments',
};
const getters = {
  getModuleActive:(state) =>{
   return state.moduleActive;
  },
  getLoading:(state) =>{
   return state.loading;
  },
  getAllCountries: (state) => {
    return state.allCountries;
  },
  getAllBannerSites: (state) => {
    return state.allBannerSites;
  },
  getAllDepartments: (state) => {
    return state.allDepartments;
  },
  getAllProvinces: (state) => {
    return state.allProvinces;
  },
  getAllStaffs: (state) => {
    return state.allStaffs;
  },
  getAllCareers: (state) => {
    return state.allCareers;
  },
  getAllTitles: (state) => {
    return state.allTitles;
  },
  getAllDistricts: (state) => {
    return state.allDistricts;
  },
  getAllBanks: (state) => {
    return state.allBanks;
  },
  getAllBrands: (state) => {
    return state.allBrands;
  },
  getLoanProcedueStates:(state) =>{
    return state.loanProcedueStates;
  },
  getLoanStates:(state) =>{
    return state.loanStates;
  },
  getTypeCustomers:(state) =>{
    return state.typeCustomers;
  },
  getLoanTypes:(state) =>{
    return state.loanTypes;
  },
  getPermissionTypes:(state) =>{
    return state.permissionTypes;
  }
};
const actions = {

  async fetchAllBanksOfRegister({ commit,rootState }, data) {
    try {
      commit("setAllBanks", []);
      if(data.province_id != '' && data.country_id != '')
       {
        const response = await this.$axios
        .get(`/banks?${qs.stringify(data)}`,{
          headers: { Authorization: `Bearer ${rootState.auth.token}` },
        })
        .then((res) => res);
        commit("setAllBanks", response.data.data);
       }
      
    } catch (error) {
      console.log(error);
    }
  },
  async fetchTypeCustomers({commit,rootState}){
     try {
      const response = await this.$axios.get(`/loan-procedues/type-customer`,{
        headers: { Authorization: `Bearer ${rootState.auth.token}` },
      });
      commit('setTypeCustomers',response.data.data)
     } catch (error) {
       
     }  
  },
  async fetchAllBannerSites({commit,rootState}){
     try {
      const response = await this.$axios.get(`/sites`,{
        headers: { Authorization: `Bearer ${rootState.auth.token}` },
      });
      commit('setAllBannerSites',response.data.data)
     } catch (error) {
       
     }  
  },
  async fetchLoanStates({commit,rootState}){
     try {
      const response = await this.$axios.get(`/state/loan-application`,{
        headers: { Authorization: `Bearer ${rootState.auth.token}` },
      });
      // if(rootState.auth.user.type_staff == 0)
      //   response.data.data = response.data.data.filter((item) => item.value==='pending' || item.value === 'bank_accept' )
      commit('setLoanStates',response.data.data)
     } catch (error) {
       
     }  
  },
  async fetchPermissionTypes({commit,rootState}){
     try {
      let filter = {bank_id: rootState.auth.user.bank_id.id }
      const response = await this.$axios.get(
        `/report-permissions?${qs.stringify(filter)}`,
        {
          headers: { Authorization: `Bearer ${rootState.auth.token}` },
        }
      );
      const response1 = await this.$axios.get(`/type-reports`,{
        headers: { Authorization: `Bearer ${rootState.auth.token}` },
      });
      response1.data.data.map((currentValue) => {
        currentValue['count_user'] = response.data.data.filter((item) => item.type_report_id.id === currentValue.id);
      });

        
      commit('setPermissionTypes',response1.data.data)
     } catch (error) {
       
     }  
  },
  async fetchAllStaffs({commit,rootState}){
     try {
      const response = await this.$axios.get(`/manage-staffs/user_lists`,{
        headers: { Authorization: `Bearer ${rootState.auth.token}` },
      });
      // if(rootState.auth.user.type_staff == 0)
      //   response.data.data = response.data.data.filter((item) => item.value==='pending' || item.value === 'bank_accept' )
      commit('setAllStaffs',response.data.data)
     } catch (error) {
       
     }  
  },
  async fetchLoanProcedueStates({commit,rootState}){
     try {
      const response = await this.$axios.get(`/state/loan-procedues`,{
        headers: { Authorization: `Bearer ${rootState.auth.token}` },
      });
      // if(rootState.auth.user.type_staff == 0)
      //   response.data.data = response.data.data.filter((item) => item.value==='pending' || item.value === 'bank_accept' )
      commit('setLoanProcedueStates',response.data.data)
     } catch (error) {
       
     }  
  },
  async fetchAllCountries({ commit }) {
    try {
      const response = await this.$axios.get(`/list-country/`).then((res) => res);
      commit("setAllCountries", response.data.data);
    } catch (error) {
      console.log(error);
    }
  },
  async fetchAllCareers({ commit }) {
    try {
      const response = await this.$axios.get(`/careers/`).then((res) => res);
      commit("setAllCareers", response.data.data);
    } catch (error) {
      console.log(error);
    }
  },
  async fetchLoanTypes({ commit,rootState },filter=null) {
    try {
      const response = await this.$axios.get(`/loan-procedues/types?${qs.stringify(filter)}`,{
        headers: { Authorization: `Bearer ${rootState.auth.token}` },
      }).then((res) => res);
      commit("setLoanTypes", response.data.data);
    } catch (error) {
      console.log(error);
    }
  },
  async fetchAllDepartments({ commit,rootState }) {
    try {
      const response = await this.$axios.get(`/departments`,{
        headers: { Authorization: `Bearer ${rootState.auth.token}` },
      }).then((res) => res);
      commit("setAllDepartments", response.data.data);
    } catch (error) {
      console.log(error);
    }
  },
  async fetchAllProvinces({ commit }) {
    try {
      const response = await this.$axios
        .get(`/list-province/`)
        .then((res) => res);
      commit("setAllProvinces", response.data.data);
    } catch (error) {
      console.log(error);
    }
  },
  async fetchAllDistricts({ commit }, id) {
    try {
      if (id == "") {
        commit("setAllDistricts", []);
        return;
      }
      const response = await this.$axios
        .get(`/list-district?province_id=${id}`)
        .then((res) => res);
      commit("setAllDistricts", response.data.data);
    } catch (error) {
      console.log(error);
    }
  },
  async fetchAllBanks({ commit,rootState }, data) {
    try {
      commit("setAllBanks", []);
      const response = await this.$axios
        .get(`/banks?${qs.stringify(data)}`,{
          headers: { Authorization: `Bearer ${rootState.auth.token}` },
        })
        .then((res) => res);
      commit("setAllBanks", response.data.data);
    } catch (error) {
      console.log(error);
    }
  },
  async fetchAllBrands({ commit,rootState }, filter = null) {
    try {
      if (filter == "") {
        commit("setAllBrands", []);
        return;
      }
      const response = await this.$axios
        .get(`/brands?${qs.stringify(filter)}`,{
          headers: { Authorization: `Bearer ${rootState.auth.token}` },
        })
        .then((res) => res);
      commit("setAllBrands", response.data.data);
    } catch (error) {
      console.log(error);
    }
  },
  async fetchAllTitles({ commit }, id) {
    try {
      if (id == "") {
        commit("setAllTitles", []);
        return;
      }
      const response = await this.$axios
        .get(`/titles/${id}`)
        .then((res) => res);
      commit("setAllTitles", response.data.data);
    } catch (error) {
      console.log(error);
    }
  },

};
const mutations = {
  addBank: (state,item) => {
    state.allBanks.push(item);
  },
  addBrand: (state,item) => {
    state.allBrands.push(item);
  },
  setLoanTypes: (state,items) => {
   state.loanTypes = items;
  },
  setTypeCustomers: (state,items) => {
   state.typeCustomers = items;
  },
  setModuleActive: (state,module_name) => {
   state.moduleActive = module_name;
  },
  setLoanStates: (state,items) => {
   state.loanStates = items;
  },
  setPermissionTypes: (state,items) => {
   state.permissionTypes = items;
  },
  setLoanProcedueStates: (state,items) => {
   state.loanProcedueStates = items;
  },
  setAllCountries: (state, items) => {
    state.allCountries = items;
  },
  setAllProvinces: (state, items) => {
    state.allProvinces = items;
  },
  setAllBannerSites: (state, items) => {
    state.allBannerSites = items;
  },
  setAllDistricts: (state, items) => {
    state.allDistricts = items;
  },
  setAllBanks: (state, items) => {
    state.allBanks = items;
  },
  setAllBrands: (state, items) => {
    state.allBrands = items;
  },
  setAllTitles: (state, items) => {
    state.allTitles = items;
  },
  setAllCareers: (state, items) => {
    state.allCareers = items;
  },
  setAllStaffs: (state, items) => {
    state.allStaffs = items;
  },
  setAllDepartments: (state, items) => {
    state.allDepartments = items;
  },
  
  setLoading: (state,loading) =>
  {
    state.loading = loading;
  }
  
};
export default {
  state,
  getters,
  mutations,
  actions,
};
