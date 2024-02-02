<template>
 <ul
  v-if="repos && repos.length > 0"
  class="bg-back xl:p-8 rounded-xl grid xl:grid-cols-4 gap-8 overflow-y-scroll scroll-m-1 border-4 border-transparent lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 sm:p-4"
 >
  <li v-for="item in repos" :key="item.id">
   <list-item :item="item" />
  </li>
 </ul>
 <p class="flex justify-center" v-else>Ничего не найдено</p>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ListItem from "./ListItem.vue";
import { computed } from "vue";
export default defineComponent({
 components: { ListItem },
 props: ["list"],
 setup(props) {
  const repos = computed(function () {
   return props.list.items;
  });
  return { repos: repos };
 },
});
</script>

<style lang="scss" scoped>
::-webkit-scrollbar {
 width: 5px;
}
::-webkit-scrollbar-track {
 background: #f1f1f1;

 border-radius: 10px;
}
::-webkit-scrollbar-thumb {
 background: #888;
 border-radius: 10px;
}
::-webkit-scrollbar-thumb:hover {
 background: #555;
}
</style>
