echo "
1: dev
2: stg
3: prod
"
read -p "Which Envionment 1-5 ?" choice
case "$choice" in 
    1 ) npm install;;
    2 ) npm run build;;
    3 ) node node-modules/webpack/bin/webpack.js -p;;
    esac
