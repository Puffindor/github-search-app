<template>
 <section class="p-8 h-screen flex flex-col">
  <router-view></router-view>
  <items-list :list="list" />
  <switch-page />
 </section>
</template>

<script lang="ts">
import { defineComponent, onUpdated } from "vue";
import { useStore } from "vuex";
import { key } from "./store";
import ItemsList from "./components/ItemsList.vue";
import { computed } from "vue";
import SwitchPage from "./components/SwitchPage.vue";
import { useRouter } from "vue-router";
export default defineComponent({
 components: { ItemsList, SwitchPage },
 setup() {
  const store = useStore(key);
  const router = useRouter();

  onUpdated(() => {
   router.push({
    path: "/",
    query: {
     q: store.getters.getsearchInput,
     page: store.getters.getPagesInfo.page,
     perPage: store.getters.getPagesInfo.perPage,
    },
   });
  });

  const list = computed(function () {
   return store.getters.getRepositories;
  });

  return { list };
 },
});
</script>

<style lang="scss">
* {
 padding: 0;
 margin: 0;
 box-sizing: border-box;
}
</style>
