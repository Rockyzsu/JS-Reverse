 module.exports = {
  apps : [{
    name: 'hexin-v',
    script: 'npm',

    // Options reference: https://pm2.keymetrics.io/docs/usage/application-declaration/
    args: 'start',
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }],
};
