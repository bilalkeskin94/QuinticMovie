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
import useBooksStore from '@/store/book';

const characterStore = useCharactersStore();
const bookStore = useBooksStore();

const selectedBookId = ref('');

onMounted(async () => {
	await characterStore.fetchCharacters();
	await bookStore.fetchBooks();
});

const characters = computed(() => characterStore.characters);

const filteredCharacters = computed(() => {
	if (selectedBookId.value) {
		return (
			characters.value?.filter(
				(character) => character.book === selectedBookId.value
			) ?? []
		);
	} else {
		return [];
	}
});
</script>
