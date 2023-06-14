<template>
	<div>
		<button class="d-flex" @click="generateRandomQuote">Generate</button>
		<p class="d-flex">{{ randomQuote.dialog }}</p>
	</div>
</template>

<script setup>
import useQuotesStore from '@/store/quote';
import useBooksStore from '@/store/book';

const runtimeConfig = useRuntimeConfig();
const { baseURL, apiSecret } = runtimeConfig.public;

const quoteStore = useQuotesStore();
const bookStore = useBooksStore();

const randomQuote = ref('');

onMounted(async () => {
	await quoteStore.fetchQuotes(`${baseURL}/quote`, apiSecret);
	await bookStore.fetchBooks(`${baseURL}/book`, apiSecret);
});

const quotes = computed(() => quoteStore.quotes);
const books = computed(() => bookStore.books);

const generateRandomQuote = () => {
	const randomIndex = Math.floor(Math.random() * quotes.value.length);
	randomQuote.value = quotes.value[randomIndex];
};
</script>
