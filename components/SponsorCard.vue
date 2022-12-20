<template>
  <img :src="getLogo" alt="Sponsor" />
</template>

<script setup>
const props = defineProps({
  data: {
    type: Object,
    default: () => {},
  },
});

const getLogo = computed(() => {
  return props.data.image ? loadAsset(props.data.image) : null;
})
</script>