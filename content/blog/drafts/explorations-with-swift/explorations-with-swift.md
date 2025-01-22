---
title: Explorations with Swift
draft: true
tags: "swift"
---

I am currently going through Apple's [Develop in Swift Tutorials](https://developer.apple.com/tutorials/develop-in-swift), so I thought I would share what I've made as I learn! This isn't my first experience with Swift or Xcode, as I have dabbled for a couple of hours over the past couple of years, but this is my first sustained effort at learning Swift, SwiftUI, and Xcode that I wanted to share!

## ChatPrototype

![Screenshot of ChatPrototype app on an iPhone with the following conversation: "¡Holisssss!" (in a center-aligned yellow bubble with shadow), "¿Qué onda linda?" (In a center-aligned cyan bubble with similar styling to previous bubble, the rest of the conversation follows this pattern), "Nada mucho, solo probando Xcode ;))", "¡Buena suerte!", "Gracias, ¡adiós!", "¡Hasta luego!](./ChatPrototypeScreenshot.png)

[GitHub](https://github.com/thatrobotdev/ChatPrototype)

### Concepts learned

- Using source control in an Xcode project.
- Basics of SwiftUI ([Views](https://developer.apple.com/documentation/swiftui/view), modifiers).

### Extensions added

The tutorial recommends additional ways to challenge yourself extending your app, so I added the following features:

- More messages!
- Changed the color scheme of the bubbles, added shadows with the [`.shadow` modifier](<https://developer.apple.com/documentation/swiftui/view/shadow(color:radius:x:y:)>), tinkered with the default spacing of the [`VStack`](https://developer.apple.com/documentation/swiftui/vstack).

## MyselfInSixWords

![Screenshot of MyselfInSixWords app on an iPhone. An icon of a hand waving appears above the text, "Hello, world! Here are six words that describe me:". Beneath the sentence are six words with colored backgrounds. Hacker (with a red background), Brother (with a blue background), Learner (with a green background), Curious (with a cyan background), Dreamer (with a dark blue background), and Optimist (with a yellow background).](./MyselfInSixWordsScreenshot.png)

[GitHub](https://github.com/thatrobotdev/MyselfInSixWords)

In an additional challenge, given the following prompt:

> "**Present yourself.** Start a new project called MyselfInSixWords. Use `Text` views to display six words that describe you. Give each word some padding and a different background color. For an extra challenge, try displaying the words horizontally and vertically by nesting `HStack` views inside the `VStack`."–[Wrap-up: Explore Xcode](https://developer.apple.com/tutorials/develop-in-swift/explore-xcode-conclusion)

Building this I learned how to utilize a custom [SF Symbols](https://developer.apple.com/sf-symbols/) image and I used [`.multilineTextAlignment`](<https://developer.apple.com/documentation/swiftui/view/multilinetextalignment(_:)>) for the first time.

## WeatherForecast

![Screenshot of the WeatherForecast app on an iPhone with a title that says "7-day Forecast". Underneath the title, a scrolling view with labeled dates (Mon, Tue, Wed, etc.) is shown with sun, rain, and snow icons. Text beneath each icon shows the high and low temperature for each day, with the high appearing in red when it is above 80 degrees. Below the scrolling view is a summary for the week with the average low, high, days of sun, and days of rain.](./WeatherForecastScreenshot.png)

[GitHub](https://github.com/thatrobotdev/WeatherForecast)

### Concepts learned

- I learned how to use a structure to make a custom view.
- I created instances using a structure's initializer.
- I customized each instance of a structure using properties.
- I used computed properties to change data based on a condition.

### Extensions added

- I added a computed property to make the high text red if the high temperature was above 80 degrees using the [`.foregroundStyle`](<https://developer.apple.com/documentation/swiftui/text/foregroundstyle(_:)>) modifier.
- I went back into the [ChatPrototype](#chatprototype) project to create a new view, `ChatBubble`, to apply what I learned by generalizing repeated code.
