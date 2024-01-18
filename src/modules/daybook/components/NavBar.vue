<template>
  <nav class="navbar bg-primary">
    <a href="#" class="navbar-brand text-white">
      <img
        src="@/assets/logo.png"
        alt="VUe Logo"
        height="24"
        class="d-inline-block align-text-top mx-2"
      />
      {{username}}
    </a>
    <div class="d-flex">
      <button class="btn btn-outline-info mx-2" @click="logout">
        {{}} <i class="fa fa-sign-out-alt"></i>
      </button>
    </div>
  </nav>
</template>

<script>
import useAuth from '@/modules/auth/composables/useAuth';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const router = useRouter();
    
    const {username, logout} = useAuth();

    return {
      username,
      logout: () => {
        router.push({name: 'login'});
        logout();
      }
    }
  }
};
</script>

<style></style>
