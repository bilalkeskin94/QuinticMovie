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
			<button @click="store.prevPage" :disabled="store.page === 1">
				Previous
			</button>
			<span>Page {{ store.page }} of {{ store.totalPages }}</span>
			<button
				@click="store.nextPage"
				:disabled="store.page === store.totalPages"
			>
				Next
			</button>
		</div>
	</div>
</template>

<script setup>
const runtimeConfig = useRuntimeConfig();
import useCharactersStore from '@/store/character';

const { baseURL, apiSecret } = runtimeConfig.public;

const store = useCharactersStore();
const characters = computed(() => store.characters);

onMounted(async () => {
	await store.fetchCharacters(baseURL, apiSecret);
});
</script>
