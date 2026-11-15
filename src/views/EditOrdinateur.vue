<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { trouverParId, ajouter, modifier } from '../store'

const route = useRoute()
const router = useRouter()

// Mode selon la route : presence du parametre :id
const modeModification = computed(() => !!route.params.id)

const vide = { modele: '', processeur: '', memoire: '', disque: '', carteGraphique: '', photo: '' }
const form = ref({ ...vide })
const erreurs = ref([])

if (modeModification.value) {
  const existant = trouverParId(route.params.id)
  if (existant) form.value = { ...existant }
  else router.replace('/ordinateurs')
}

const imageSrc = computed(() => {
  const p = form.value.photo
  if (!p) return '/placeholder.svg'
  if (p.startsWith('http') || p.startsWith('data:') || p.startsWith('/')) return p
  return '/images/' + p
})

function imageErreur(e) {
  e.target.src = '/placeholder.svg'
}

// "Choisir une image" : lit le fichier et le stocke en base64
function choisirImage(e) {
  const fichier = e.target.files[0]
  if (!fichier) return
  const lecteur = new FileReader()
  lecteur.onload = () => (form.value.photo = lecteur.result)
  lecteur.readAsDataURL(fichier)
}

function valider() {
  erreurs.value = []
  if (!form.value.modele.trim()) erreurs.value.push('Le modèle est obligatoire.')
  if (!form.value.processeur.trim()) erreurs.value.push('Le processeur est obligatoire.')
  if (!(Number(form.value.memoire) > 0)) erreurs.value.push('La mémoire doit être strictement positive.')
  if (!(Number(form.value.disque) > 0)) erreurs.value.push('Le disque doit être strictement positif.')
  return erreurs.value.length === 0
}

function enregistrer() {
  if (!valider()) return
  const ordi = {
    ...form.value,
    memoire: Number(form.value.memoire),
    disque: Number(form.value.disque)
  }
  if (modeModification.value) modifier(route.params.id, ordi)
  else ajouter(ordi)
  router.push('/ordinateurs')
}

function annuler() {
  router.push('/ordinateurs')
}
</script>

<template>
  <form class="formulaire" @submit.prevent="enregistrer">
    <h2>{{ modeModification ? 'Modifier un ordinateur' : 'Ajouter un ordinateur' }}</h2>

    <div class="apercu">
      <img :src="imageSrc" alt="Aperçu" @error="imageErreur" />
      <input type="file" accept="image/*" @change="choisirImage" style="margin-top: 10px; width: 100%" />
      <small>(ou indiquer un nom de fichier)</small>
    </div>

    <div>
      <div v-if="erreurs.length" class="erreurs">
        <ul><li v-for="e in erreurs" :key="e">{{ e }}</li></ul>
      </div>

      <div class="champ">
        <label>Modèle *</label>
        <input v-model="form.modele" />
      </div>
      <div class="champ">
        <label>Processeur *</label>
        <input v-model="form.processeur" />
      </div>
      <div class="deux">
        <div class="champ">
          <label>Mémoire (Go) *</label>
          <input v-model="form.memoire" type="number" />
        </div>
        <div class="champ">
          <label>Disque (Go) *</label>
          <input v-model="form.disque" type="number" />
        </div>
      </div>
      <div class="champ">
        <label>Carte graphique</label>
        <input v-model="form.carteGraphique" />
      </div>
      <div class="champ">
        <label>Photo (nom ou chemin)</label>
        <input v-model="form.photo" placeholder="dell.jpg" />
      </div>

      <div class="boutons">
        <button type="button" class="btn btn-gris" @click="annuler">Annuler</button>
        <button type="submit" class="btn btn-bleu">Enregistrer</button>
      </div>
    </div>
  </form>
</template>
