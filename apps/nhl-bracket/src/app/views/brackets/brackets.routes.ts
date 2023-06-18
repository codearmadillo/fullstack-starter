import {Route} from "@angular/router";
import ListComponent from "./list/list.component";
import DetailComponent from "./detail/detail.component";

export default [
  {
    path: '',
    component: ListComponent
  },
  {
    path: ':id',
    component: DetailComponent
  }
] as Route[];
