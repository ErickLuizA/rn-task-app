<h1 align="center"> whtodo </h1>

<p align="center">
  <a href="https://github.com/ErickLuizA/whtodo/graphs/commit-activity" alt="Maintenance">
    <img src="https://img.shields.io/badge/Maintained%3F-yes-1EAE72.svg" />
  </a>

  <a href="./LICENSE" alt="License: MIT">
    <img src="https://img.shields.io/badge/License-MIT-1EAE72.svg" />
  </a>

<br/>

<img alt="GitHub language count" src="https://img.shields.io/github/languages/count/ErickLuizA/whtodo?color=blue">

<img alt="GitHub repo size" src="https://img.shields.io/github/repo-size/ErickLuizA/whtodo">

<a href="https://github.com/ErickLuizA/whtodo/stargazers">
  <img alt="GitHub stars" src="https://img.shields.io/github/stars/ErickLuizA/whtodo?style=social">
</a>

<p align="center">
  <a href="#clipboard-description">Description</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#building_construction-technologies">Technologies</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#rocket-getting-started">Getting Started</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#memo-license">License</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
</p>


## :clipboard: Description

whtodo is a task noting app built with React Native and Firebase

## :building_construction: Technologies

- [Firebase](https://firebase.google.com)

- [Typescript](https://www.typescriptlang.org/)

- [React Native](https://reactnative.dev/)
  - [react-native-firebase](https://rnfirebase.io/)

## :rocket: Getting Started

## 1. Download the repository

```shell
 $ git clone https://github.com/ErickLuizA/whtodo.git
 
 or

 $ gh repo clone ErickLuizA/whtodo
```

## 2. Installation

```shell
# Go into the repository
$ cd whtodo

# Install dependencies
$ yarn install

# Signin to firebase using your google account and configure your project -> https://console.firebase.google.com/

# Put your google.services.json file in the android/app folder or/and the respective if you are building for IOS

# Put your web client id in a .env file
```

## 3. Execution

```shell
$ yarn android or yarn ios

# Be aware that this project was configured only for android, check rnfirebase.io if any problem with firebase config

# Firestore data structure -> Users Collection -> Doc with user id as id -> Tasks Collection -> task docs 

$ yarn start
```

## :information_source: TODO
  - Add notifications
  - Add customizable task editor
  - Implement tests
  - Implement offline mode

## :memo: License

This project is under the MIT license. See the file [LICENSE](LICENSE) for more details.

---

Build with 💙 By [Erick](https://www.linkedin.com/in/erick-luiz-47151a1a4/)
