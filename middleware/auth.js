export default async ({ app, store, redirect, route }) => {
  if (store.state.auth.token != "")
    await store
      .dispatch("auth/fetchUser")
      .then(() => {
        if (route.meta[0].layout == "customer")
          // đã đăng nhập
          app.router.push(app.localePath("index-diary"));
      })
      .catch(() => {
        app.router.push(app.localePath("/"));
        store.dispatch("auth/logout");
      });
  else {
    if (route.meta[0].layout != "customer")
      app.router.push(app.localePath("/"));
  }
};
