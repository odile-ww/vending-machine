# VendingMachine

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.0.1.

It uses [json-server](https://www.npmjs.com/package/json-server) to mock a fake products api.

## Installing & Running the project:

-   Clone the project locally.
-   Run `npm run api` to establish a connection to the api.
-   Run `ng serve --open`. This should automatically open `http://localhost:4200/` in a new tab.

## Project features:

-   Initial list of products is fetched from the API, but state is handled in the application, via a `VendingMachineService`.
-   Several Euro coins denominations can be used to purchase a product: `0.10, 0.20, 0.50, 1.00`. The app locale is set to `de-DE`.
-   A purchase can be made by selecting a coin denomiation available, then validating the purchase. Based on the available balance, a number of products will become available & can be selected by clicking the `Select` button.
-   A transaction can be cancelled before a product selection, via the `Clear` button.
-   Upon successful product selection, the machine will offer the selected product and change.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
