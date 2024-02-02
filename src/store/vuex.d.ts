import { Store } from "vuex";

declare module "@vue/runtime-core" {
 interface State {
  repositoreis: any;
  perPage: number;
  page: number;
  searchInput: string;
  cahce: Record<any, any>;
 }

 interface ComponentCustomProperties {
  $store: Store<State>;
 }
}
