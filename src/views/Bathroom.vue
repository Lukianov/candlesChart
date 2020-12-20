<template>
  <h1>
    Bathroom
  </h1>
  <div>
    {{ lamp }}
  </div>
</template>

<script>
export default {
  name: "Bathroom",
  props: ['lamp'],
  methods: {
    nowYouSeeMee () {
      return 'boy'
    }
  }
}
</script>

<style scoped>

</style>