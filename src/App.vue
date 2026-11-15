<template>
  <header class="entete">
    <div>
      <h1>Parc informatique</h1>
      <p>Gestion des ordinateurs</p>
    </div>
    <router-link v-if="$route.path === '/ordinateurs'" to="/ordinateurs/ajouter" class="btn btn-vert">
      + Ajouter un ordinateur
    </router-link>
    <router-link v-else to="/ordinateurs" class="btn btn-gris">← Retour à la liste</router-link>
  </header>
  <main class="contenu">
    <router-view />
  </main>
</template>
