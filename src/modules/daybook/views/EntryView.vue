<template>
  <template v-if="entry">
    <div class="entry-title d-flex justify-content-between p-2">
      <div>
        <span class="text-success fs-3 fw-bold">{{day}}</span>
        <span class="mx-1 fs-3">{{month}}</span>
        <span class="mx-2 fs-4 fw-light">{{year}}</span>
      </div>
    
      <div>
        <button v-if="entry.id" @click="onDeleteEntry" class="btn btn-danger mx-2">
          Borrar
          <i class="fa fa-trash-alt"></i>
        </button>
    
        <button class="btn btn-primary">
          Subir Foto
          <i class="fa fa-upload"></i>
        </button>
      </div>
    </div>
    
    <hr />
    
    <div class="d-flex flex-column px-3 h-75">
      <textarea v-model="entry.texto" placeholder="Que sucedio hoy?"></textarea>
    </div>
  </template>

  <Fab icon="fa-save" @on:click="saveEntry" />
  <img
    src="http://www.diario26.com/media/image/2018/09/21/399543.jpg"
    alt="entry-picture"
    class="img-thumbnail"
  />
</template>

<script>
import { defineAsyncComponent } from "vue";
import { mapGetters, mapActions } from "vuex";

import getDayMonthYear from '../helpers/dayMonthYear.js';

export default {
  props: {
    id: {
      type    : String,
      required: true,
    }
  },
  components: {
    Fab: defineAsyncComponent(() => import("../components/Fab.vue")),
  },
  data() {
    return {
      entry: null
    }
  },
  methods: {
    ...mapActions('journal', ['updateEntry','createEntry', 'deleteEntry']),
    loadEntry(){
      let entry;

      if (this.id === 'new') {
        entry = {
          text: '',
          date: new Date().getTime()
        }
      } else {
         entry = this.getEntryById(this.id);
        if (!entry) return this.$router.push({name: 'no-entry'});
      }


      this.entry = entry;

      console.log(entry);
    },
    async saveEntry(){
      if (this.entry.id) {
        console.log('Guardando entrada');
        await this.updateEntry(this.entry);
      } else {
        //TODO: Crear una nueva entrada
        const id = await this.createEntry(this.entry);

        console.log(id);

        this.$router.push({name: 'entry', params: {id}});
      }
    },
    async onDeleteEntry(){
        await this.deleteEntry(this.entry.id);
        this.$router.push({name: 'no-entry'});
    }
  },
  computed: {
    ...mapGetters('journal',['getEntryById']),
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
  created() {
    // console.log(this.$route.params.id);
    // console.log(this.id);
    this.loadEntry();
  },
  watch: {
    id(){
      this.loadEntry();
    }
  }
};
</script>

<style lang="scss" scoped>
textarea{
  border   : none;
  font-size: 20px;
  height   : 100%;

  &:focus{
    outline: none;
  }
}

img{
  bottom    : 150px;
  box-shadow: 0px 5px 10px rgba($color: #000000, $alpha: 0.2);
  position  : fixed;
  right     : 20px;
  width     : 200px;
}
</style>
