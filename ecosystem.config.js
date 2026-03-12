module.exports = {
  apps: [{
    name: "ask-gamblers",
    script: "node",
    args: ".next/standalone/server.js",
    instances: 1,
    exec_mode: "fork",
    autorestart: true,
    watch: false,
    max_memory_restart: "1G",
    cwd: "/home/1553018.cloudwaysapps.com/dzdatjcdrp/public_html",
    env_production: {
      NODE_ENV: "production",
      PORT: 3334
    }
  }]
};
