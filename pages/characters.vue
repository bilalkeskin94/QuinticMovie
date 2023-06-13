<template>
	<div>
		<SearchInput
			:items="characters"
			placeholder="Search for a character..."
			route="character"
		/>
		<select v-model="store.sortOrder" @change="store.sortCharacters">
			<option value="asc">Ascending</option>
			<option value="desc">Descending</option>
		</select>
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
const useCharactersStore = defineStore({
	id: 'characters',
	state: () => ({
		characters: [],
		page: 1,
		totalPages: 0,
		sortOrder: 'asc',
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
		sortCharacters() {
			this.characters.sort((a, b) => {
				const nameA = a.name.toUpperCase();
				const nameB = b.name.toUpperCase();
				if (this.sortOrder === 'asc') {
					if (nameA < nameB) return -1;
					if (nameA > nameB) return 1;
					return 0;
				} else {
					if (nameA > nameB) return -1;
					if (nameA < nameB) return 1;
					return 0;
				}
			});
		},
	},
});

const store = useCharactersStore();
useAsyncData(store.fetchCharacters);

const characters = computed(() => store.characters);
const nextPage = store.nextPage;
const prevPage = store.prevPage;
</script>
