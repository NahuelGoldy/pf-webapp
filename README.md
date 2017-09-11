# Dónde estaciono? - WEB

### How to start
**Note** that this seed project requires  **node >=v6.9.0 and npm >=3**.

In order to start the project use:
```bash
$ git clone https://github.com/NahuelGoldy/pf-webapp.git
$ cd pf-webapp
# install the project's dependencies
$ npm install
# install CLI dependencies
$ npm install -g @angular/cli
# run the project (access it on localhost:4200)
$ ng serve
```

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive/pipe/service/class/module`.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

### How to setup Protractor

```bash
$ npm install -g protractor
$ webdriver-manager update
$ webdriver-manager start
```

En el IDE:
Run -> Edit config
⦁	+ Protractor -> configuration file = ...\WebstormProjects\pf-webapp\protractor.conf.js
⦁	+ Node.js -> 
    - JavaScript file = ~\AppData\Roaming\npm\node_modules\protractor\built\cli.js
    - Application parameters = protractor.conf.js

### How to deploy to Github Pages

```bash
$ ng build --prod --base-href https://nahuelgoldy.github.io/pf-webapp/ --aot=false
$ ngh
```

### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
