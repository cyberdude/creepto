<template>
  <div>
    <div class="row">
      <div class="column medium-12 large-12">
        <h1>Alerts</h1>
      </div>
    </div>

    <div class="row">
      <div class="column large-12">
        <ul>
          <li v-for="alert in alerts" class="row">
            <div class="column medium-4 large-4">{{alert.price}}</div>
            <div class="column medium-4 large-4">{{alert.direction}}</div>
            <div class="column medium-4 large-4">
              <select v-model="alert.alerted" v-on:change="changeAlert(alert)">
                <option>true</option>
                <option>false</option>
              </select>
            </div>
            <!-- <div class="column medium-3 large-3"><button>Save</button></div>  -->
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'main',
  data () {
    return {
      alerts: []
    }
  },
  methods: {
    changeAlert: function (_alert) {
      this.$http.patch('/alerts/' + _alert.id, {alerted: _alert.alerted}).then(response => {
        console.log(response)
        // this.alerts = response.data
      }, response => {
        // error callback
        console.error(response)
      })
    },
    getAlerts: function () {
      this.$http.get('/alerts').then(response => {
        this.alerts = response.data
      }, response => {
        // error callback
        console.error(response)
      })
    }
  },
  mounted: function () {
    this.getAlerts()
  }
}
</script>

<style lang="scss" scoped>

h1 {
  text-align: center;
  margin-top: 30px;
}

ul {
  li {
    list-style-type: none;
  }
}

</style>
