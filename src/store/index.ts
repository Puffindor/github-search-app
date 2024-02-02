import { InjectionKey } from "vue";
import { createStore, Store } from "vuex";

export interface State {
 repositoreis: any;
 perPage: number;
 page: number;
 searchInput: string;
 cahce: Map<object, object[]>;
}

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
 state: {
  repositoreis: [],
  searchInput: "",
  perPage: 32,
  page: 10,
  cahce: new Map(),
 },
 getters: {
  getCahce(state) {
   return state.cahce;
  },

  getsearchInput(state) {
   return state.searchInput;
  },

  getRepositories(state) {
   return state.repositoreis;
  },

  getPagesInfo(state) {
   return {
    perPage: state.perPage,
    page: state.page,
    pagesTotal: Math.floor(state.repositoreis.total_count / state.perPage),
   };
  },
 },
 actions: {
  setPerPage(context, payload) {
   context.commit("setPerPage", payload.perPage);
   if (payload.search) {
    store.dispatch("searchRepositories");
   }
  },

  setSearchInput(context, payload) {
   context.commit("setSearchInput", payload.search);
   if (payload.setPageDefault) {
    context.commit("setPageDefault");
   }
   store.dispatch("searchRepositories");
  },

  switchPage(context, payload) {
   context.commit("switchPage", payload);
   store.dispatch("searchRepositories");
  },

  setPage(context, payload) {
   context.commit("setPage", payload);
  },

  async searchRepositories(context) {
   if (store.state.cahce.size > 0) {
    for (const [key, value] of store.getters.getCahce) {
     if (
      key.page == store.state.page &&
      key.searchInput === store.state.searchInput &&
      key.perPage === store.state.perPage
     ) {
      context.commit("searchRepositories", value);
      console.log("got from cache");
      return;
     }
    }
   }

   const response = await fetch(
    `https://api.github.com/search/repositories?q=${store.state.searchInput}&per_page=${store.state.perPage}&page=${store.state.page}`,
    {
     headers: {
      Accept: "application/vnd.github+json",
     },
    }
   );
   if (response.ok) {
    const result = await response.json();
    context.commit("searchRepositories", result);
    context.commit("setCache", [
     {
      page: store.state.page,
      searchInput: store.state.searchInput,
      perPage: store.state.perPage,
     },
     store.state.repositoreis,
    ]);
   } else {
    if (response.status === 403) {
     alert("Max API rate exceeded, wait a few seconds");
     return;
    }
    alert(`Ошибка ${response.status}`);
   }
  },
 },
 mutations: {
  setPage(state, payload) {
   state.page = Number(payload);
   console.log(payload);
  },

  setCache(state, payload) {
   state.cahce.set(payload[0], payload[1]);
  },

  setSearchInput(state, payload) {
   state.searchInput = payload;
  },

  setPerPage(state, payload) {
   state.perPage = Number(payload);
  },

  setPageDefault(state) {
   state.page = 1;
  },

  switchPage(state, payload: number) {
   if (payload === 1) {
    state.page += 1;
   } else {
    if (state.page > 1) {
     state.page -= 1;
    }
   }
  },

  searchRepositories(state, payload) {
   state.repositoreis = payload;
  },
 },
});
