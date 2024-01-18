import store from "@/store";

const isAuthenticatedGuard = async (to, from, next) => {
  const { ok } = await store.dispatch("auth/checkMyAuth");

  console.log({ to, from, next });
  console.log();

  switch (ok) {
    case true:
      next();
      break;

    case false:
      next({ name: "login" });
      break;

    default:
      break;
  }
};

export default isAuthenticatedGuard;