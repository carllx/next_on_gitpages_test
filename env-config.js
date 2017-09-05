const prod = process.env.NODE_ENV === 'production'

module.exports = {
  'process.env.BACKEND_URL': prod ? 'http://zhongart.it' : 'http://localhost:3000'
}
