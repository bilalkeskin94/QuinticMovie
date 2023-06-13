<template>
	<div>
		<SearchInput
			:items="items"
			:placeholder="`Search for a ${routeName}...`"
			:route="routeName"
		/>
	</div>
</template>

<script setup>
import { onMounted } from 'vue';
import { defineStore } from 'pinia';

const runtimeConfig = useRuntimeConfig();
const { apiSecret } = runtimeConfig.public;

const props = defineProps({
	routeName: { type: String, required: true },
	apiUrl: { type: String, required: true },
});

const useItemsStore = defineStore({
	id: 'items',
	state: () => ({
		items: [],
	}),
	actions: {
		async fetchItems() {
			const response = await fetch(props.apiUrl, {
				headers: { Authorization: `Bearer ${apiSecret}` },
			});
			const data = await response.json();
			this.items = data.docs;
		},
	},
});

const store = useItemsStore();

onMounted(async () => {
	await store.fetchItems();
});

const items = computed(() => store.items);
</script>
