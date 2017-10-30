const PROXY_CONFIG = [
  {
    context: [
      '/config',
      '/api'
    ],
    target: 'http://localhost:8000',
    secure: false
  }
]

module.exports = PROXY_CONFIG
