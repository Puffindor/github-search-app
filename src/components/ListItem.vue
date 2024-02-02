<template>
 <div
  class="flex bg-back rounded-xl flex-col xl:hover:scale-110 transition shadow-lg lg:hover:scale-105 md:hover:scale-105"
 >
  <div class="flex p-4">
   <div class="con flex justify-between w-full">
    <div>
     <div class="mb-3 font-medium font-Roboto">
      <a :href="repoUrl">{{ name }}</a>
     </div>

     <div class="mb-3 font-light font-Roboto">
      <a>{{ language }}</a>
     </div>

     <div class="flex font-normal font-Roboto">
      <img :src="avatar" class="h-8 w-8 rounded-full mr-2.5 items-center" />
      <a class="flex items-center" :href="authorUrl">{{ owner }}</a>
     </div>
    </div>

    <div class="flex items-start">
     <img src="../assets/Star.svg" class="mr-1 w-" />
     <p>{{ stars }}</p>
    </div>
   </div>
  </div>

  <div
   class="flex p-4 bg-secondary rounded-b-xl flex-col items-center font-Roboto"
  >
   <p v-if="description">Описание</p>
   <p v-if="description">{{ description }}</p>
   <p v-else>Нет описания</p>
  </div>
 </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";

export default defineComponent({
 props: ["item"],
 setup(props) {
  const repo = reactive(props.item);
  return {
   name: repo.name,
   owner: repo.owner.login,
   repoUrl: repo.html_url,
   authorUrl: repo.owner.html_url,
   avatar: repo.owner.avatar_url,
   description: repo.description,
   language: repo.language,
   stars: repo.stargazers_count,
  };
 },
});
</script>

<style lang="scss" scoped></style>
