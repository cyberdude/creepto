<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'creepto'
  }
</script>

<style lang="scss">

$mediumOverwrite: 760px;

$breakpoints: (
  small: 0,
  medium: $mediumOverwrite,
  large: 1024px,
  xlarge: 1200px,
  xxlarge: 1440px,
);

@import '~foundation-sites/scss/foundation';
@include foundation-everything(false);

</style>
