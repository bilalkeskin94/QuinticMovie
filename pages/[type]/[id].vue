<template>
	<div>
		<h1>{{ item.name }}</h1>
		{{ item }}
	</div>
</template>

<script setup>
import useIdsStore from '@/store/ids';

const runtimeConfig = useRuntimeConfig();

const { baseURL, apiSecret } = runtimeConfig.public;

const route = useRoute();
const store = useIdsStore();
useAsyncData(() =>
	store.fetchItem(baseURL, apiSecret, route.params.type, route.params.id)
);

const item = computed(() => store.item);
</script>
