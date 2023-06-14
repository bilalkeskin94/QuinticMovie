<template>
	<div>
		<SearchInput
			:items="characters"
			placeholder="Search for a character..."
			route="character"
		/>

		<div v-for="character in filteredCharacters" :key="character._id">
			{{ character.name }}
		</div>
	</div>
</template>

<script setup>
import useCharactersStore from '@/store/character';

const runtimeConfig = useRuntimeConfig();
const { baseURL, apiSecret } = runtimeConfig.public;

const characterStore = useCharactersStore();

onMounted(async () => {
	await characterStore.fetchCharacters(baseURL, apiSecret);
});

const characters = computed(() => characterStore.characters);
</script>
