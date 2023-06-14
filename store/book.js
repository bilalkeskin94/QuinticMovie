const useBooksStore = defineStore({
	id: 'books',
	state: () => ({
		books: [],
	}),
	actions: {
		async fetchBooks(apiUrl, apiSecret) {
			const response = await fetch(apiUrl, {
				headers: { Authorization: `Bearer ${apiSecret}` },
			});
			const data = await response.json();
			this.books = data.docs;
		},
	},
});

export default useBooksStore;
