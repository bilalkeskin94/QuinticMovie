<template>
	<div>
		<select v-model="selectedBookId">
			<option value="">Select a book</option>
			<option v-for="book in books" :value="book._id" :key="book._id">
				{{ book.name }}
			</option>
		</select>

		<div v-for="chapter in filteredChapters" :key="chapter._id">
			{{ chapter.chapterName }}
		</div>
	</div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
const runtimeConfig = useRuntimeConfig();

const { baseURL, apiSecret } = runtimeConfig.public;

const useChaptersStore = defineStore({
	id: 'chapters',
	state: () => ({
		chapters: [],
	}),
	actions: {
		async fetchChapters() {
			const response = await fetch(`${baseURL}/chapter`, {
				headers: { Authorization: `Bearer ${apiSecret}` },
			});
			const data = await response.json();
			this.chapters = data.docs;
		},
	},
});

const useBooksStore = defineStore({
	id: 'books',
	state: () => ({
		books: [],
	}),
	actions: {
		async fetchBooks() {
			const response = await fetch(`${baseURL}/book`, {
				headers: { Authorization: `Bearer ${apiSecret}` },
			});
			const data = await response.json();
			this.books = data.docs;
		},
	},
});

const chapterStore = useChaptersStore();
const bookStore = useBooksStore();

const selectedBookId = ref('');

onMounted(async () => {
	await chapterStore.fetchChapters();
	await bookStore.fetchBooks();
});

const books = computed(() => bookStore.books);
const chapters = computed(() => chapterStore.chapters);

const filteredChapters = computed(() => {
	if (selectedBookId.value) {
		return chapters.value.filter(
			(chapter) => chapter.book === selectedBookId.value
		);
	} else {
		return [];
	}
});
</script>
