## GitHub Search App

This React Native application allows you to search for GitHub repositories and save them to a local server as well as the ability to sort by the numbers of stars.

## Prerequisites

Before running the app, make sure you have the following:

Node.js and npm installed. You can download them from nodejs.org.

## Getting Started

Follow these steps to get the app up and running:

Clone the repository to your local machine:

```shell
git clone https://github.com/ramiro-nieto/GithubSearch.git
```

Change your working directory to the project folder:

```shell
cd GithubSearch
```

Install project dependencies:

```shell
npm install
```

Create a .env file in the project root and add your GitHub token:

```shell
GITHUB_TOKEN=your-github-token-here
```

Replace your-github-token-here with your GitHub Personal Access Token. You can create a token by following these instructions.

**_Please note that you can also remove the code below from the fetch call in the api.ts file. However, it's important to be aware that doing so may result in quickly exceeding the API rate limit._**

```
 {
    method: 'GET',
    headers: {
    Authorization: `token ${githubToken}`,
    },
}
```

Start the React Native development server:

```shell
npm start
```

Start Docker server:

```
npm run dev:server
```

Run the app:

```shell
npm run-ios
```

## ##Usage

Once the app is running, you can use it to search for GitHub repositories, view details, and save them to a local server. Explore the app's features and functionalities.

## Areas for Improvement

While the application fulfills its core requirements, there are several areas where it can be improved and extended:

### 1. Automated Testing

One significant area for improvement is the lack of automated tests. Adding unit and integration tests to your application can help ensure its reliability and maintainability.

### 2. UI and User Experience

Enhancing the application's user interface (UI) and user experience (UX) can make it more appealing and user-friendly.

### 3. Error Handling

Improving error handling can make the application more robust. Implementing proper error handling and providing clear error messages can assist users in understanding and recovering from errors.

### 4. State Management

For larger applications, adopting a state management library like Redux or using React's built-in Context API can help manage complex application states more efficiently.

### 5. Comprehensive Documentation

Expand on the documentation by providing more details on how various components and modules work.

### 6. Rate Limit Handling

The code currently includes a rate limit handling note, which warns against removing specific code from the API calls.

These are just a few ideas for potential future improvements.
