export default {
  name     : "auth",
  component: () =>
    import(
      /* webpackChunkName: "AuthLayout" */ "@/modules/auth/layouts/AuthLayout.vue"
    ),
  children: [
    {
      path     : "",
      name     : "login",
      component: () =>
        import(
          /* webpackChunkName: "LoginView" */ "@/modules/auth/view/LoginView.vue"
        ),
    },
    {
      path     : "/register",
      name     : "register",
      component: () =>
        import(
          /* webpackChunkName: "RegisterView" */ "@/modules/auth/view/RegisterView.vue"
        ),
    },
  ],
};
