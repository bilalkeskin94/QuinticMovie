<template>
	<div>
		<div v-for="quote in quotes" :key="quotes._id">
			{{ quote }}
		</div>
	</div>
</template>

<script setup>
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

const store = useQuotesStore();
useAsyncData(store.fetchQuotes);

const quotes = computed(() => store.quotes);
</script>
