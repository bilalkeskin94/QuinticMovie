<template>
	<div>
		<button @click="generateRandomQuote">Generate</button>
		<div>{{ randomQuote.dialog }}</div>
	</div>
</template>

<script setup>
import { ref, computed } from 'vue';

const runtimeConfig = useRuntimeConfig();
const { baseURL, apiSecret } = runtimeConfig.public;

const useQuotesStore = defineStore({
	id: 'quotes',
	state: () => ({
		quotes: [],
	}),
	actions: {
		async fetchQuotes() {
			const response = await fetch(`${baseURL}/quote`, {
				headers: { Authorization: `Bearer ${apiSecret}` },
			});
			const data = await response.json();
			this.quotes = data.docs;
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

const quoteStore = useQuotesStore();
const bookStore = useBooksStore();

useAsyncData(quoteStore.fetchQuotes);
useAsyncData(bookStore.fetchBooks);

const quotes = computed(() => quoteStore.quotes);
const books = computed(() => bookStore.books);
const randomQuote = ref('');

const generateRandomQuote = () => {
	const randomIndex = Math.floor(Math.random() * quotes.value.length);
	randomQuote.value = quotes.value[randomIndex];
};

const bookName = computed(() => {
	if (!randomQuote.value) return '';
	const book = books.value.find((b) => b._id === randomQuote.value.book);
	return book ? book.name : 'Unknown Book';
});
</script>
