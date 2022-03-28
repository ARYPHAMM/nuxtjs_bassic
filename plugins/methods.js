export default {
  setValidate(data,item) {
    this.resetErrors();
    return new Promise((resolve, reject) => {
      let valid = true;
      for (const key in data) {
        if (item[key] == "") {
          this.$data['errors'][key] = data[key];
          valid = false;
        }
      }
      if (valid == true){
        resolve(valid);
      }
      else
       reject(valid);
    });
  },
  resetErrors() {
    for (var k in this.errors) {
      this.errors[k] = "";
    }
  },
  capitalize(s) {
    return s[0].toUpperCase() + s.slice(1);
  },
  getAlert(name, mess, status = "warning") {
    this.$swal(this.$t(name), this.$t(mess), status);
  },
  getHost(item) {
    return window.location.origin + item;
  },
  limitContent(string = "", limit = 0) {
    if (string.split().length > limit) return string.slice(0, limit) + "...";
    return string;
  },
  getErrors(error) {
    if (error.response != undefined) {
      if (error.response.data.errors != null) {
        if (Object.keys(error.response.data.errors).length == 0) {
          Object.keys(this.errors).forEach((i) => (this.errors[i] = ""));
          this.$swal("Thông báo", message + " thất bại", "warning");
        } else {
          this.$swal(
            "Thông báo",
            "Vui lòng kiểm tra lại thông tin! " +
              (error.response.data.msg != undefined
                ? error.response.data.msg
                : ""),
            "warning"
          );
          for (var k in this.errors) {
            if (error.response.data.errors[k] != null)
              this.errors[k] = error.response.data.errors[k][0];
            else this.errors[k] = "";
          }
        }
      } else {
        this.$swal(
          "Thông báo",
          error.response.data.msg != undefined ? error.response.data.msg : "",
          "warning"
        );
      }
    }
  },
  getLimitName(name) {
    if(name == undefined)
      return "";
    if (name == "") return name;
    var str = name;
    let acronym = str
      .split(/\s/)
      .reduce((response, word) => (response += word.slice(0, 1)), "");
    return acronym.split("").length > 2
      ? acronym.split("")[acronym.length - 2] +
          acronym.split("")[acronym.length - 1]
      : acronym;
  },
  handleSave(
    data,
    path,
    message,
    method = "post",
    content_type = "application/json"
  ) {
    let app = this;
    return new Promise((resolve, reject) => {
      this.$axios({
        method: method,
        url: `${path}`,
        data: data,
        headers: {
          "Content-Type": content_type,
          Authorization: `Bearer ${this.$store.state.auth.token}`,
        },
      })
        .then(function (response) {
          app.$swal(
            app.$t("notification"),
            app.$t(message) + ", " + app.$t("success"),
            "success"
          );
          app.resetErrors();
          resolve(response);
        })
        .catch(function (error) {
          if (error.response != undefined) {
            if (error.response.data.errors != null) {
              if (Object.keys(error.response.data.errors).length == 0) {
                Object.keys(app.errors).forEach((i) => (app.errors[i] = ""));
                app.$swal(
                  app.$t("notification"),
                  app.$t(message) + ", " + app.$t("fail"),
                  "warning"
                );
              } else {
                app.$swal(
                  app.$t("notification"),
                  app.$t("please_check") +
                    " " +
                    (error.response.data.msg != undefined
                      ? error.response.data.msg
                      : ""),
                  "warning"
                );
                for (var k in app.errors) {
                  if (error.response.data.errors[k] != null)
                    app.errors[k] = error.response.data.errors[k][0];
                  else app.errors[k] = "";
                }
              }
            } else {
              app.$swal(
                app.$t("notification"),
                app.$t("please_check") +
                  " " +
                  (error.response.data.msg != undefined
                    ? error.response.data.msg
                    : ""),
                "warning"
              );
              reject(error);
            }
          }
        });
    });
  },
  async uploadMediasFile(
    ref,
    id_data,
    id_url,
    category = "images",
    type = "staff"
  ) {
    let app = this;
    let formData = new FormData();
    for (var i = 0; i < this.$refs[ref].files.length; i++) {
      let file = this.$refs[ref].files[i];
      this.$store.commit("options/setLoading", true);
      
      if(category == "auto") // up for banner
      {
          category = "images"
         if(!file.type.match('image.*'))
         {
          category = "videos"
         }
   
      }
    

      if (category == "videos") formData.append("files", file);
      else formData.append("files[]", file);

      formData.append("type", type);


      await this.$axios({
        method: "post",
        url: `/uploads/${category}`,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${this.$store.state.auth.token}`,
        },
      })
        .then(function (response) {
          let data =
            category == "videos" ? response.data.data : response.data.data[0];
          app.$data[id_data].push(data);
          if (category != "videos")
            app.$data[id_url].push({
              mediaType: "image",
              src: URL.createObjectURL(file),
            });
          else {
            app.$data[id_url].push({
              mediaType: "iframe",
              autoplay: true,
              src: URL.createObjectURL(file),
            });
          }
          app.$store.commit("options/setLoading", false);
        })
        .catch(function (error) {
          app.$swal(
            "Thông báo",
            error.response.data.msg != undefined ? error.response.data.msg : "",
            "warning"
          );
          app.$store.commit("options/setLoading", false);
        });
    }
  },
  async removeMediasFile(index, id_data, id_url, api = false) {
    if (api != false) {
      try {
        let location = index - this.$data[id_data].length;
        await this.$axios({
          method: "post",
          url: `${api}`,
          data: { ids: [this.medias_obj[location].id] },
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.$store.state.auth.token}`,
          },
        });
      } catch (error) {
        // console.log(1);
      }
    }
    if (this.$data[id_data].length <= 1) this.$data[id_data] = [];
    if (this.$data[id_url].length <= 1) this.$data[id_url] = [];
    if (
      this.$data[id_data].length == this.$data[id_url].length &&
      this.$data[id_data].length > 1 &&
      this.$data[id_url].length > 1
    ) {
      this.$data[id_data].splice(index, 1);
      this.$data[id_url].splice(index, 1);
    }
    if (
      this.$data[id_data].length != this.$data[id_url].length &&
      this.id != ""
    ) {
      this.$data[id_data].splice(index - this.$data[id_data].length - 1, 1);
      this.$data[id_url].splice(index, 1);
    }
  },
  async loadDetail(path) {
    let app = this;
    return new Promise((resolve, reject) => {
      const res = app.$axios
        .get(path, {
          headers: { Authorization: `Bearer ${app.$store.state.auth.token}` },
        })
        .then((response) => resolve(response.data.data))
        .catch((error) => {
          if (
            error.response.data.status != 404 &&
            error.response.data.status != 403
          )
            setTimeout(() => {
              app.loadDetail(path);
            }, 11000);
          else {
            if (error.response.data.msg != "")
              app.$swal(
                "Thông báo",
                error.response.data.msg != undefined
                  ? error.response.data.msg
                  : "",
                "warning"
              );
            reject(error);
          }
        });
    });
  },
  search(input_id, list_id, class_P, class_chil) {
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById(input_id);
    filter = input.value.toUpperCase();
    ul = document.getElementById(list_id);
    li = ul.getElementsByClassName(class_P);
    for (i = 0; i < li.length; i++) {
      a = li[i].getElementsByClassName(class_chil)[0];
      txtValue = a.textContent || a.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        li[i].style.display = "";
      } else {
        li[i].style.display = "none";
      }
    }
  },
  async removeItemNoNoti(path, method = "get") {
    const response = await this.$axios({
      method: method,
      url: path,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${this.$store.state.auth.token}`,
      },
    });
  },
  async removeItemFromPath(path, method = "get") {
    console.log(this.$t("are_you_sure_delete"));
    let app = this;
    this.$swal({
      text: this.$t("are_you_sure_delete"),
      type: "warning",
      confirmButtonText: this.$t("agree"),
      showCancelButton: true,
      cancelButtonText: this.$t("cancel"),
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await this.$axios({
            method: method,
            url: path,
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${this.$store.state.auth.token}`,
            },
          });
          this.$swal(this.$t("notification"), response.data.data, "success");
        } catch (error) {
          this.$swal(
            this.$t("notification"),
            error.response.data.msg,
            "warning"
          );
        }
      }
    });
  },
  handleSaveNoNoti(
    data,
    path,
    method = "post",
    content_type = "application/json"
  ) {
    let app = this;
    return new Promise((resolve, reject) => {
      this.$axios({
        method: method,
        url: `${path}`,
        data: data,
        headers: {
          "Content-Type": content_type,
          Authorization: `Bearer ${this.$store.state.auth.token}`,
        },
      });
    });
  },
};
