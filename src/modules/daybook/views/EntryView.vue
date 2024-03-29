<template>
  <template v-if="entry">
    <div class="entry-title d-flex justify-content-between p-2">
      <div>
        <span class="text-success fs-3 fw-bold">{{day}}</span>
        <span class="mx-1 fs-3">{{month}}</span>
        <span class="mx-2 fs-4 fw-light">{{year}}</span>
      </div>
    
      <div>
        <input
          type="file" 
          ref="imageSelector"
          @change="onselectedImage" 
          v-show="false"
          accept="image/jpeg, image/png"
        >

        <button v-if="entry.id" @click="onDeleteEntry" class="btn btn-danger mx-2">
          Borrar
          <i class="fa fa-trash-alt"></i>
        </button>
    
        <button @click="onSelectImage" class="btn btn-primary">
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
    v-if="entry.picture && !localImage"
    :src="entry.picture"
    alt="entry-picture"
    class="img-thumbnail"
  />

  <img
    v-if="localImage"
    :src="localImage"
    alt="entry-picture"
    class="img-thumbnail"
  />
</template>

<script>
import { defineAsyncComponent } from "vue";
import { mapGetters, mapActions } from "vuex";

import Swal from 'sweetalert2'

import getDayMonthYear from '../helpers/dayMonthYear.js';
import uploadImage from "../helpers/uploadImage";

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
      entry     : null,
      localImage: null,
      file      : null,
    }
  },
  methods: {
    ...mapActions('journal', ['updateEntry','createEntry', 'deleteEntry']),
    loadEntry(){
      this.localImage = null;
      this.file       = null;
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
      new Swal({
        title            : 'Espere por favor',
        allowOutsideClick: false,
      })
      Swal.showLoading();

      const picture = await uploadImage(this.file);

      this.entry.picture = picture;

      if (this.entry.id) {
        console.log('Guardando entrada');
        await this.updateEntry(this.entry);
      } else {
        //TODO: Crear una nueva entrada
        const id = await this.createEntry(this.entry);

        console.log(id);

        this.$router.push({name: 'entry', params: {id}});

        Swal.fire('Guardando', 'Entrada registrada con exito', 'success')
      }
    },
    async onDeleteEntry(){
        const { isConfirmed } = await Swal.fire({
        title            : 'Esta seguro?',
        text             : 'Una vez borrado, no se podra recuperar',
        showDenyButton   : true,
        confirmButtonText: 'Si, estoy seguro',
        })

        if (isConfirmed) {
          new Swal({
            title            : 'Espere por favor',
            allowOutsideClick: false,
          });

          Swal.showLoading();

          await this.deleteEntry(this.entry.id);
          this.$router.push({name: 'no-entry'});
          Swal.fire('Eliminado', '', 'success')
        }

        // console.log({result});
    },
    onselectedImage({target}){
      const file = target.files[0];
      console.log(file);

      if (!file) {
        this.localImage = null;
        this.file       = null;
        return
      }

      this.file = file;

      const rf = new FileReader();
      rf.onload = () => this.localImage = rf.result;
      rf.readAsDataURL(file);

    },
    onSelectImage(){
      // console.log(this.$refs);
      this.$refs.imageSelector.click();
      document.querySelector('input').click();
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
    id(value, oldValue) {
        this.loadEntry()
        if(value !== oldValue) {
            this.localImage = null
        }
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
