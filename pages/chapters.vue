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
import useChaptersStore from '@/store/chapter';
import useBooksStore from '@/store/book';

const runtimeConfig = useRuntimeConfig();

const { baseURL, apiSecret } = runtimeConfig.public;

const chapterStore = useChaptersStore();
const bookStore = useBooksStore();

const selectedBookId = ref('');

onMounted(async () => {
	await chapterStore.fetchChapters(baseURL, apiSecret);
	await bookStore.fetchBooks(`${baseURL}/book`, apiSecret);
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
