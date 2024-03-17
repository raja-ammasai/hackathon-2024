Folder structure 
----------------
    config          - It contains Webpack configs and entry javascript file 
    build            - This is output folder used for Server-side code bundle 
    src             - Root Folder
        App         - Main App folder
        Components  - It contains UI Components used for create Widgets
    node_modules    - It contains installed NPM packages and node dependency 
    .babelrc        - It contains babel root config 
    package.json    - It contains package info along with running script and dependency details
    postcss.config  -  It contains config for postCss
    yarn.lock       - this is locks file and it contains details for installed npm packages 


Developmet build setup
-----------------------
nodejs version >=10.16.0 
yarn version >= 1.16 
react version >= 16.8.6 


Run comment :
-------------
1. yarn install 
2. yarn dev 



TODO:
------
1. Code optimization and performance [in-progress]
2. Production ready code [Done]
3. deployment using docker [Done]
4. deploy in s3 / heroku / amplify --> using this docker push as contianer we can achieve [done]




