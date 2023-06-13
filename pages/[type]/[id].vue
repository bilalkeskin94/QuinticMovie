<template>
	<div>
		<h1>{{ item.name }}</h1>
		{{ item }}
	</div>
</template>

<script setup>
import { defineStore } from 'pinia';
import { useRoute } from 'vue-router';

const useItemStore = defineStore({
	id: 'item',
	state: () => ({
		item: {},
	}),
	actions: {
		async fetchItem(type, id) {
			const response = await fetch(`https://the-one-api.dev/v2/${type}/${id}`, {
				headers: { Authorization: 'Bearer DvNgbIM8w17cH1R7ww0C' },
			});
			const data = await response.json();
			this.item = data.docs[0];
		},
	},
});

const route = useRoute();
const store = useItemStore();
useAsyncData(() => store.fetchItem(route.params.type, route.params.id));

const item = computed(() => store.item);
</script>
