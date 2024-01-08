<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div
    class="entry-container mb-3 pointer p-2"
    @click="$router.push({ name: 'entry', params: { id: 10 } })"
  >
    <div class="entry-title d-flex">
      <span class="text-success fs-5 fw-bold">15</span>
      <span class="mx-1 fs-5">Enero</span>
      <span class="mx-1 fw-light">2024</span>
    </div>
    <div class="entry-description">
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. In ducimus
      aliquid velit eum repellendus earum, ipsum unde nobis saepe officia
      inventore facere, laboriosam perspiciatis, quos magnam repellat.
      Necessitatibus, sint quia?
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.entry-description {
  border-bottom: 1px solid #2e3c50;
  transition   : 0.2 all ease-in;

  &:hover {
    background-color: lighten($color: grey, $amount: 45);
  }
}
</style>
