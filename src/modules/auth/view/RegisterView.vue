<!-- eslint-disable vue/valid-template-root -->
<template>
  <span class="login100-form-title p-b-41"> Ingresar </span>
  <form @submit.prevent="onSubmit" class="login100-form validate-form p-b-33 p-t-5">
    <div class="wrap-input100 validate-input" data-validate="Ingrese su nombre">
      <input v-model="useForm.name" class="input100" type="text" placeholder="Nombre" required />
      <span class="focus-input100" data-placeholder="&#xe82a;"></span>
    </div>

    <div class="wrap-input100 validate-input" data-validate="Ingrese su Correo">
      <input v-model="useForm.email" class="input100" type="email" placeholder="Correo" required />
      <span class="focus-input100" data-placeholder="&#xe818;"></span>
    </div>

    <div class="wrap-input100 validate-input" data-validate="Enter password">
      <input
        class="input100"
        type="password"
        placeholder="Contraseña"
        required
        v-model="useForm.password"
      />
      <span class="focus-input100" data-placeholder="&#xe80f;"></span>
    </div>

    <div class="container-login100-form-btn m-t-32">
      <button type="submit" class="login100-form-btn">Crear Cuenta</button>
    </div>

    <div class="container-login100-form-btn m-t-32">
      <router-link :to="{name: 'login'}">¿Ya tienes cuenta?</router-link>
    </div>
  </form>
</template>

<script>
import { ref } from 'vue';
import useAuth from '@/modules/auth/composables/useAuth'

export default {
  setup() {

    const { createUser } = useAuth();

    const useForm = ref({
      name: 'Fernando',
      email: 'fernando@gmail.com',
      password: '123456',
    });

    return {
      useForm,
      onSubmit: async () => {
        const { ok, message } = await createUser(useForm.value);
        console.log(ok, message);
      }
    }
  }

};
</script>

<style></style>
