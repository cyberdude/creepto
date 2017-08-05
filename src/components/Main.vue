<template>
  <div>
    <ul>
      <li v-for="alert in alerts">
        {{alert.direction}} {{alert.price}} | alerted: {{alert.alerted}}
      </li>
    </ul>
  </div>
</template>

<script>
// import $ from 'jquery'

export default {
  name: 'main',
  data () {
    return {
      alerts: []
    }
  },
  methods: {
    getAlerts: function () {
      this.$http.get('http://localhost:8081/alerts').then(response => {
        this.alerts = response.body
      }, response => {
        // error callback
      })
    }
  },
  mounted: function () {
    this.getAlerts()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
