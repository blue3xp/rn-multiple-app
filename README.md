# rn-multiple-app
when you want to use the same codebase to build the different app and each app has own logic, this demo demonstrate how to do it

# Getting Started

## How to start

navigate App folder

1 Change .env file to switch different app, when use hk config, all xxx.hk.tsx will replace the original file such as xxx.tsx

2 Run command in package.json, `yarn copy` will merge code automatically.when you are developing feature, you can run `yarn copyApp:watch` and `copySDK:watch` at seperate terminal.

3 Run `yarn start` and build the app.

4 when you change .env config, and the code will change it automatically.
