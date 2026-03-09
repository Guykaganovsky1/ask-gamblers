module.exports = {
  apps: [{
    name: "ask-gamblers",
    script: "npx",
    args: "next start -p 3334 -H 0.0.0.0",
    instances: 1,
    exec_mode: "fork",
    autorestart: true,
    watch: false,
    max_memory_restart: "1G",
    cwd: "/home/master/applications/dzdatjcdrp/public_html",
    env_production: {
      NODE_ENV: "production"
    }
  }]
};
