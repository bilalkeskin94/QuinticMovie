<template>
	<div>
		<SearchInput
			:items="characters"
			placeholder="Search for a character..."
			route="character"
		/>
		<div v-if="store.totalPages > 1">
			<button @click="prevPage" :disabled="store.page === 1">Previous</button>
			<span>Page {{ store.page }} of {{ store.totalPages }}</span>
			<button @click="nextPage" :disabled="store.page === store.totalPages">
				Next
			</button>
		</div>
	</div>
</template>

<script setup>
import { defineStore } from 'pinia';
import SearchInput from '../components/SearchInput.vue';

const useCharactersStore = defineStore({
	id: 'characters',
	state: () => ({
		characters: [],
		page: 1,
		totalPages: 0,
	}),
	actions: {
		async fetchCharacters() {
			const response = await fetch(
				`https://the-one-api.dev/v2/character/?page=${this.page}&limit=20`,
				{
					headers: { Authorization: 'Bearer DvNgbIM8w17cH1R7ww0C' },
				}
			);
			const data = await response.json();
			this.characters = data.docs;
			this.totalPages = Math.ceil(data.total / 20);
		},
		nextPage() {
			if (this.page < this.totalPages) {
				this.page++;
				this.fetchCharacters();
			}
		},
		prevPage() {
			if (this.page > 1) {
				this.page--;
				this.fetchCharacters();
			}
		},
	},
});

const store = useCharactersStore();
useAsyncData(store.fetchCharacters);

const characters = computed(() => store.characters);
const nextPage = store.nextPage;
const prevPage = store.prevPage;
</script>
