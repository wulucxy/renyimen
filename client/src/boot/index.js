import { Promise } from 'bluebird'
Promise.config({ warnings: false, longStackTraces: true })
window.Promise = Promise
