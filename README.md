# NewsApp - React Native Project

NewsApp is a mobile application built using React Native and TypeScript. It fetches the latest news from [The Guardian API](https://open-platform.theguardian.com/documentation/) and provides features such as different news categories, infinite scrolling, and a separate screen for viewing full news details. This project uses [React Query](https://react-query.tanstack.com/) for data fetching and storing, and [React Native FlashList](https://github.com/jacklam718/react-native-flash-list) for rendering lists.

Home Screen                | News Page Details
:-------------------------:|:-------------------------:
![](https://user-images.githubusercontent.com/26411546/229453782-a815db44-57a7-4cb6-8bf7-efdd4877e9f0.png)  |  ![](https://user-images.githubusercontent.com/26411546/229454056-66344a7a-7732-4445-b9cd-211d69639704.png)


## Built with
- React Native (0.71.5)
- React Native Animated API
- Typescript
- [React Navigation](https://reactnavigation.org/)
- [React Query](https://tanstack.com/query/latest/)
- [React Native FlashList](https://shopify.github.io/flash-list/)
- [The Guardian News API *(free account up to 500 requests per day)*](https://open-platform.theguardian.com/documentation/)
- [React Native MMKV (*local storage*)](https://github.com/mrousavy/react-native-mmkv)
- Love ❤️

## Installation

1. Clone the repository: `git clone https://github.com/your-username/newsapp.git`
2. Change directory to the project: `cd newsapp`
3. Install dependencies: `npm install`

## Configuration

- The API key is already included in the project, no additional configuration is needed.

## Running the App

To run the app on an Android emulator:

1. Start an Android emulator using Android Studio
2. Run the command: `npm run android`

To run the app on an iOS simulator:

1. Start an iOS simulator using Xcode
2. Run the command: `npm run ios`

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
