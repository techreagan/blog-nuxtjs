import Vue from 'vue'
import { required, min, numeric, length } from 'vee-validate/dist/rules'
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode
} from 'vee-validate'

setInteractionMode('eager')

extend('required', {
  ...required,
  message: 'Enter {_field_}'
})

extend('min', {
  ...min,
  message: '{_field_} may not be less than {length} characters'
})

extend('length', {
  ...length,
  message: '{_field_} must be have at least {length} numbers'
})

extend('numeric', {
  ...numeric,
  message: '{_field_} must be numeric'
})

Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)
