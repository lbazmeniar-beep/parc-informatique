import { ref, watch } from 'vue'

const CLE = 'parc_ordinateurs'

const exemples = [
  { id: 1, modele: 'Dell Latitude 5540', processeur: 'Intel Core i5', memoire: 16, disque: 512, carteGraphique: 'Intel Iris Xe', photo: '' },
  { id: 2, modele: 'HP ProBook 450 G10', processeur: 'Intel Core i7', memoire: 32, disque: 1000, carteGraphique: 'NVIDIA GeForce MX', photo: '' },
  { id: 3, modele: 'Lenovo ThinkPad E14', processeur: 'AMD Ryzen 5', memoire: 16, disque: 512, carteGraphique: 'Radeon Graphics', photo: '' },
  { id: 4, modele: 'ASUS TUF Gaming F15', processeur: 'Intel Core i7', memoire: 32, disque: 1000, carteGraphique: 'NVIDIA GeForce RTX', photo: '' },
  { id: 5, modele: 'Acer Aspire 5', processeur: 'Intel Core i5', memoire: 8, disque: 256, carteGraphique: 'Intel UHD Graphics', photo: '' }
]

// Premiere utilisation : on enregistre les exemples. Sinon on restaure.
function charger() {
  const saved = localStorage.getItem(CLE)
  if (saved) return JSON.parse(saved)
  localStorage.setItem(CLE, JSON.stringify(exemples))
  return exemples
}

export const ordinateurs = ref(charger())

// Sauvegarde automatique a chaque changement
watch(
  ordinateurs,
  (val) => localStorage.setItem(CLE, JSON.stringify(val)),
  { deep: true }
)

export function trouverParId(id) {
  return ordinateurs.value.find((o) => o.id === Number(id))
}

export function ajouter(ordi) {
  const nouveauId = ordinateurs.value.length
    ? Math.max(...ordinateurs.value.map((o) => o.id)) + 1
    : 1
  ordinateurs.value.push({ ...ordi, id: nouveauId })
}

export function modifier(id, ordi) {
  const index = ordinateurs.value.findIndex((o) => o.id === Number(id))
  if (index !== -1) ordinateurs.value[index] = { ...ordi, id: Number(id) }
}

export function supprimer(id) {
  ordinateurs.value = ordinateurs.value.filter((o) => o.id !== id)
}
