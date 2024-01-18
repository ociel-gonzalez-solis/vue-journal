import AuthApi from "@/api/AuthApi";
// export const myAction = async ({commit}) => {

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
    const { idToken, refreshToken } = data;

    const resp = await AuthApi.post(":update", {
      displayName: name,
      idToken,
      refreshToken,
    });
    console.log(resp);

    delete user.password;
    commit('loginUser', { user, idToken, refreshToken });

    return { ok: true };
  } catch (error) {
    return { ok: false, message: error.response.data.error.message };
  }
};

export const signInUser = async ({ commit }, user) => {
  const { email, password } = user;

  try {
    const { data } = await AuthApi.post(":signInWithPassword", {
      email,
      password,
      returnSecureToken: true,
    });
    console.log(data);
    const {  displayName, idToken, refreshToken } = data;
    user.name = displayName;
    commit("loginUser", { user, idToken, refreshToken });

    return { ok: true };
  } catch (error) {
    return { ok: false, message: error.response.data.error.message };
  }
};

export const checkMyAuth = async ({ commit }) => {
  const idToken      = localStorage.getItem("idToken");
  const refreshToken = localStorage.getItem("refreshToken");

  if (!idToken) {
    commit("logOutUser");
    return { ok: false, message: 'NO hay token' };
  }

  try {
    const { data } = await AuthApi.post(":lookup", { idToken });
    console.log(data);
    const { displayName, email } = data.users[0];

    const user = {
      name: displayName,
      email
    }
    
    commit("loginUser", { user, idToken, refreshToken });

    return { ok: true };
  } catch (error) {
    commit("logOutUser");
    return { ok: false, message: error.response.data.error.message };
  }

};