<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import OrdinateurCard from '../components/OrdinateurCard.vue'
import { ordinateurs, supprimer } from '../store'

const router = useRouter()

// Bonus : recherche + tri
const recherche = ref('')
const tri = ref('aucun')

const liste = computed(() => {
  const mot = recherche.value.toLowerCase()
  let resultat = ordinateurs.value.filter(
    (o) => o.modele.toLowerCase().includes(mot) || o.processeur.toLowerCase().includes(mot)
  )
  if (tri.value === 'croissant') resultat = [...resultat].sort((a, b) => a.memoire - b.memoire)
  if (tri.value === 'decroissant') resultat = [...resultat].sort((a, b) => b.memoire - a.memoire)
  return resultat
})

function allerModifier(id) {
  router.push('/ordinateurs/modifier/' + id)
}

function confirmerSuppression(ordi) {
  if (confirm('Voulez-vous vraiment supprimer "' + ordi.modele + '" ?')) {
    supprimer(ordi.id)
  }
}
</script>

<template>
  <div class="outils">
    <input v-model="recherche" placeholder="Rechercher par modèle ou processeur..." />
    <select v-model="tri">
      <option value="aucun">Sans tri</option>
      <option value="croissant">Mémoire : croissante</option>
      <option value="decroissant">Mémoire : décroissante</option>
    </select>
    <span class="compteur">{{ liste.length }} ordinateur(s)</span>
  </div>

  <div v-if="liste.length" class="grille">
    <OrdinateurCard
      v-for="o in liste"
      :key="o.id"
      :ordinateur="o"
      @modifier="allerModifier"
      @supprimer="confirmerSuppression"
    />
  </div>
  <p v-else class="vide">Aucun ordinateur trouvé.</p>
</template>
