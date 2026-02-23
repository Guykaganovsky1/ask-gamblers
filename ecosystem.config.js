module.exports = {
  apps: [{
    name: "casino-raz",
    script: "node_modules/next/dist/bin/next",
    args: "start -p 3000 -H 0.0.0.0",
    instances: "max",
    exec_mode: "cluster",
    autorestart: true,
    watch: false,
    max_memory_restart: "1G",
    env_production: {
      NODE_ENV: "production",
      PORT: 3000
    }
  }]
};
