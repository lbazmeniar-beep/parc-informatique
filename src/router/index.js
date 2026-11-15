import { createRouter, createWebHistory } from 'vue-router'
import ListeOrdinateurs from '../views/ListeOrdinateurs.vue'
import EditOrdinateur from '../views/EditOrdinateur.vue'

const routes = [
  { path: '/', redirect: '/ordinateurs' },
  { path: '/ordinateurs', component: ListeOrdinateurs },
  { path: '/ordinateurs/ajouter', component: EditOrdinateur },
  { path: '/ordinateurs/modifier/:id', component: EditOrdinateur }
]

export default createRouter({
  history: createWebHistory(),
  routes
})
