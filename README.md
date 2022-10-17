# internship-project

This repository contains three projects, one of them is created with node/express and other two are created by nest/typescript.

## Secret App
This app is built with node/express, it simulates a simple signup/login app, that you have a personal dashboard for yourself and just you can access it. It stores its data in a mongodb database and also uses a separate test database for the testing.


At first you go to the root route `/`, then you have two options, either login or signup.

![secrets home page](.assets/secrets-home-page.png)


### Sign Up
After you click the signup button, you are redirected to this page:

![secrets sign up page](.assets/secrets-signup.png)

After that you fill the form, and then sign up. If your sign up was successfull, you are redirected to the secrets page, otherwise you will get an error.

In the secret page, you see your information, and the logout button, note that if you close the tab, you will be stay signed in, until you close the browser or click the log out button.

![secrets secret page](.assets/secrets-secret-page.png)

### Login
If you want to login, you click the login button, and you are redirected to login page:

![secrets login page](.assets/secrets-login-page.png)

Then you can enter your username and password, and if they were correct, access to your dashboard.

### Secrets
Note that when you try to access the secrets page, or your dashboard, without being logged in, you are redirected to the login page first. And also when you hit the logout button, you are redirected to the home page.

### Users API
There is also rest api for the users, they are as follows:

| Method   | URL                                      | Description                              |
| -------- | ---------------------------------------- | ---------------------------------------- |
| `GET`    | `/api`                                   | Gets a simple `{'hi':'there'}` respone   |
| `POST`   | `/api/users`                             | Creates a new user with the properties specified in the body |
| `GET`    | `/api/users/:id`                         | Gets a specific user with that id        |
| `PUT`    | `/api/users/:id`                         | Changes the properties of user with that id |
| `Delete` | `/api/users/:id`                         | Deletes the user with that id            |


### Tests
There is also test for each route, written with the `mocha` test frame work, and using package `request` for sending requests. 