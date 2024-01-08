<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div
    class="entry-container mb-3 pointer p-2"
    @click="$router.push({ name: 'entry', params: { id: entry.id } })"
  >
    <div class="entry-title d-flex">
      <span class="text-success fs-5 fw-bold">{{day}}</span>
      <span class="mx-1 fs-5">{{month}}</span>
      <span class="mx-1 fw-light">{{year}}</span>
    </div>
    <div class="entry-description">
      {{shortTxt}}
    </div>
  </div>
</template>

<script>
import getDayMonthYear from '../helpers/dayMonthYear.js';

export default {
  props: {
    entry: {
      type    : Object,
      required: true,
    }
  },
  computed: {
    shortTxt(){
      return (this.entry.texto.length > 130) ? this.entry.texto.substring(0, 130) + '...' : this.entry.texto
    },
    day(){
      const { day } = getDayMonthYear(this.entry.date);
      return day;
    },
    month(){
      const { month } = getDayMonthYear(this.entry.date);
      return month;
    },
    year(){
      const { year } = getDayMonthYear(this.entry.date);
      return year;
    }
  },
};
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
