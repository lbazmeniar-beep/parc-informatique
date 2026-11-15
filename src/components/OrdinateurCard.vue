<script setup>
import { computed } from 'vue'

// Props : l'ordinateur a afficher
const props = defineProps({
  ordinateur: { type: Object, required: true }
})

// Events envoyes au parent
const emit = defineEmits(['modifier', 'supprimer'])

// Image : URL / data / nom de fichier (dossier public/images) sinon placeholder
const imageSrc = computed(() => {
  const p = props.ordinateur.photo
  if (!p) return '/placeholder.svg'
  if (p.startsWith('http') || p.startsWith('data:') || p.startsWith('/')) return p
  return '/images/' + p
})

function imageErreur(e) {
  e.target.src = '/placeholder.svg'
}
</script>

<template>
  <div class="carte">
    <img :src="imageSrc" :alt="ordinateur.modele" @error="imageErreur" />
    <h3>{{ ordinateur.modele }}</h3>
    <p>Processeur : {{ ordinateur.processeur }}</p>
    <p>Mémoire : {{ ordinateur.memoire }} Go</p>
    <p>Disque : {{ ordinateur.disque }} Go</p>
    <p>Carte graphique : {{ ordinateur.carteGraphique }}</p>
    <div class="actions">
      <button class="btn btn-bleu" @click="emit('modifier', ordinateur.id)">Modifier</button>
      <button class="btn btn-rouge" @click="emit('supprimer', ordinateur)">Supprimer</button>
    </div>
  </div>
</template>
