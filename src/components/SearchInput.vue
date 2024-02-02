<template>
 <div
  class="bg-primary rounded-xl p-4 w-fit h-fit mb-3 font-Roboto font-medium"
 >
  <input
   placeholder="Search"
   class="outline-none bg-secondary rounded-xl pl-2 p-1 font-Roboto color-secondary w-fit"
   v-model="searchInput"
   v-debounce:300ms="setSearch"
  />
 </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { useStore } from "vuex";
import { key } from "../store/index";
import { useRouter } from "vue-router";
export default defineComponent({
 setup() {
  const store = useStore(key);
  const searchInput = ref("");
  const route = useRouter();

  onMounted(() => {
   searchInput.value = String(route.currentRoute.value.query.q);
   store.dispatch("setPerPage", {
    perPage: route.currentRoute.value.query.perPage,
    serach: false,
   });
   store.dispatch("setPage", route.currentRoute.value.query.page);
   store.dispatch("setSearchInput", {
    search: route.currentRoute.value.query.q,
    setPageDefault: false,
   });
  });

  function setSearch() {
   if (searchInput.value.length > 0) {
    store.dispatch("setSearchInput", {
     search: searchInput.value,
     setPageDefault: true,
    });
   }
  }
  return {
   setSearch,
   searchInput,
  };
 },
});
</script>
