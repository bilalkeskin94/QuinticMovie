<template>
	<div>
		<div v-for="quote in quotes" :key="quotes._id">
			{{ quote }}
		</div>
	</div>
</template>

<script setup>
import { defineStore } from 'pinia';

const useQuotesStore = defineStore({
	id: 'quotes',
	state: () => ({
		quotes: [],
	}),
	actions: {
		async fetchQuotes() {
			const response = await fetch('https://the-one-api.dev/v2/quote/', {
				headers: { Authorization: 'Bearer DvNgbIM8w17cH1R7ww0C' },
			});
			const data = await response.json();
			this.quotes = data.docs;
		},
	},
});

const store = useQuotesStore();
useAsyncData(store.fetchQuotes);

const quotes = computed(() => store.quotes);
</script>
