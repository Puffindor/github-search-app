<template>
 <div
  v-if="pagesInfo.pagesTotal > 1"
  class="flex w-full font-Roboto font-medium"
 >
  <div class="w-fit bg-primary rounded-xl mt-3 flex flex-col items-center p-2">
   <div class="flex justify-center">
    <img
     src="../assets/arrow.svg"
     class="rotate-180 mr-5 cursor-pointer"
     @click="switchPage(2)"
    />
    <p class="inline">{{ pagesInfo.page }} из {{ pagesInfo.pagesTotal }}</p>
    <img
     src="../assets/arrow.svg"
     class="ml-5 cursor-pointer"
     @click="switchPage(1)"
    />
   </div>
   <p class="inline">
    <select
     class="bg-secondary outline-none"
     v-model="perPageInput"
     @change="setPerPage"
    >
     <option>8</option>
     <option>16</option>
     <option>32</option>
    </select>
    На странице
   </p>
  </div>
 </div>
</template>

<script lang="ts">
import { debounce } from "vue-debounce";
import { defineComponent, ref, watchEffect, computed } from "vue";
import { useStore } from "vuex";
import { key } from "../store/index";

export default defineComponent({
 setup() {
  const store = useStore(key);
  const perPageInput = ref(16);
  const pagesInfo = computed(function () {
   return store.getters.getPagesInfo;
  });

  watchEffect(() => {
   perPageInput.value = store.getters.getPagesInfo.perPage;
  });

  function setPerPage() {
   store.dispatch("setPerPage", { perPage: perPageInput.value, search: true });
  }
  const switchPage = debounce((direction: number) => {
   store.dispatch("switchPage", direction);
  }, 300);

  return {
   perPageInput,
   switchPage,
   pagesInfo,
   setPerPage,
  };
 },
});
</script>
