const useQuotesStore = defineStore({
	id: 'quotes',
	state: () => ({
		quotes: [],
	}),
	actions: {
		async fetchQuotes(apiUrl, apiSecret) {
			const response = await fetch(apiUrl, {
				headers: { Authorization: `Bearer ${apiSecret}` },
			});
			const data = await response.json();
			this.quotes = data.docs;
		},
	},
});

export default useQuotesStore;