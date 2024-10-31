<template>
  <div class="shadow-title-container">
    <h2 class="shadow-title" aria-hidden="true">{{ text }}</h2>
    <h2 class="main-title">{{ text }}</h2>
  </div>
</template>

<script>
export default {
  name: 'ShadowTitle',
  props: {
    text: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
.shadow-title-container {
  position: relative;
  text-align: center;
  margin-bottom: 1rem;
}

.shadow-title {
  position: absolute;
  top: 0.1em;
  left: 0.1em;
  color: rgba(50, 50, 50, 0.5);
  z-index: 3;
  font-size: 3rem;
  font-weight: bold;
}

.main-title {
  position: relative;
  color: #FFFFFF;
  z-index: 2;
  font-size: 3rem;
  font-weight: bold;
}
</style>