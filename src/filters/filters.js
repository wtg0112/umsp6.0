import Vue from 'vue'
Vue.filter('empty', function (value) {
  if (!value || value == null || value == '' || value == '空') return '—'
  return value
})
