<template>
	<div>
		<h1>{{ item.name }}</h1>
		{{ item }}
	</div>
</template>

<script setup>
import { defineStore } from 'pinia';
import { useRoute } from 'vue-router';
const runtimeConfig = useRuntimeConfig();

const { baseURL, apiSecret } = runtimeConfig.public;

const useItemStore = defineStore({
	id: 'item',
	state: () => ({
		item: {},
	}),
	actions: {
		async fetchItem(type, id) {
			const response = await fetch(`${baseURL}${type}/${id}`, {
				headers: { Authorization: `Bearer ${apiSecret}` },
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
