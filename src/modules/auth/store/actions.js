// export const myAction = async ({commit}) => {

import AuthApi from "@/api/AuthApi";

// }


export const createUser = async ({ commit }, user) => {
  const { name, email, password } = user;

  try {
    const { data } = await AuthApi.post(":signUp", {
      email,
      password,
      returnSecureToken: true,
    });
    console.log(data);

    return { ok: true };
  } catch (error) {
    return { ok: false, message: "..." };
  }
};