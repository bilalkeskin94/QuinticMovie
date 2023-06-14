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
import useItemsStore from '@/store/items';

const runtimeConfig = useRuntimeConfig();
const { apiSecret } = runtimeConfig.public;

const props = defineProps({
	routeName: { type: String, required: true },
	apiUrl: { type: String, required: true },
});

const store = useItemsStore();

onMounted(async () => {
	await store.fetchItems(props.apiUrl, apiSecret);
});

const items = computed(() => store.items);
</script>
