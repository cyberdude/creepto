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
            <div class="column medium-4 large-3">{{alert.price}}</div>
            <div class="column medium-4 large-3">{{alert.direction}}</div>
            
            <div class="column medium-4 large-3">
              <select v-model="alert.alerted" v-on:change="changeAlert(alert)">
                <option>true</option>
                <option>false</option>
              </select>
            </div>
            <div class="column medium-4 large-3">
              <a v-on:click="removeAlert(alert)">Remove</a>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <div class="row" id="create_panel">
      <div class="column medium-4 large-4">
        <input type="number" v-model="newAlert.price">
      </div>
      
      <div class="column medium-4 large-4">

        <select v-model="newAlert.direction">
          <option><</option>
          <option>></option>
        </select>

      </div>
        
        <div class="column medium-4 large-4">
          <a v-on:click="createAlert()">Create Alert</a>
        </div>

      </div>
  </div>
</template>

<script>

export default {
  name: 'main',
  data () {
    return {
      alerts: [],
      newAlert: {
        alerted: false,
        email: 'arnaldo.capo@gmail.com'
      }
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
    createAlert: function () {
      this.$http.post('/alerts', this.newAlert).then(response => {
        console.log(response)
        this.getAlerts()
      })
    },
    removeAlert: function (alert) {
      this.$http.delete('/alerts/' + alert.id)
        .then(response => {
          this.getAlerts()
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
#create_panel {
  margin-top: 30px;
  background: #ececec;
  padding: 2em;
  border-radius: 3px;
}

</style>
