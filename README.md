# RocketCloud_Stream_Deck

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

<br />
<p align="center">
  <a href="https://github.com/PecceG2/RocketCloud_Stream_Deck">
    <img src="https://pecceg2.github.io/RocketCloud_Stream_Deck/logo.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">RocketCloud Stream Deck</h3>

  <p align="center">
    RocketCloud Stream Deck is a server based on NodeJS HTTP server, that allows you to execute commands, software and more on your pc from your phone mobile, raspberry pi, arduino, esp8266, or any http client device.
    <br />
    <a href="https://github.com/PecceG2/"><strong>View all my projects »</strong></a>
    <br />
    <br />
    <a href="https://github.com/PecceG2/RocketCloud_Stream_Deck/issues">Report Bug</a>
    ·
    <a href="https://github.com/PecceG2/RocketCloud_Stream_Deck/blob/master/LICENSE.md">View License</a>
    ·
    <a href="https://github.com/PecceG2/RocketCloud_Stream_Deck/issues">Request Feature</a>
  </p>
</p>

## Screenshots ##
![Screenshot](https://pecceg2.github.io/RocketCloud_Stream_Deck/screenshot_01.jpg)
![Screenshot](https://pecceg2.github.io/RocketCloud_Stream_Deck/screenshot_02.jpg)

<!-- GETTING STARTED -->
## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

Before continuing it is necessary have Node JS server installed. You can download NodeJS from <a href="https://nodejs.org/">here.</a>

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/PecceG2/RocketCloud_Stream_Deck.git
   ```
2. If you need use DiscordBOT, change your BOT TOKEN on `config.json`
   ```JS
		"BOT_TOKEN": "YOUR_BOT_TOKEN"
   ```
3. Start server with NPM
   ```sh
   npm start
   ```


<!-- USAGE EXAMPLES -->
## Usage

If you don't change 'WEBSERVER_PORT', the default port for webserver is 9991.
Open browser on your phone or pc and go to `http://localhost:9991/`

To change from Stream Deck panel to PC Status panel, press on "P" icon on center of screen.

If you need change deck options, check `index.js` file on line _77_ and edit images on `\public\img folder`.



## License
>You can check out the full license [here](https://github.com/PecceG2/RocketCloud_Stream_Deck/blob/master/LICENSE.md)

This project is licensed under the terms of the **MIT** license.

[contributors-shield]: https://img.shields.io/github/contributors/PecceG2/RocketCloud_Stream_Deck.svg?style=flat-square
[contributors-url]: https://github.com/PecceG2/RocketCloud_Stream_Deck/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/PecceG2/RocketCloud_Stream_Deck.svg?style=flat-square
[forks-url]: https://github.com/PecceG2/RocketCloud_Stream_Deck/network/members
[stars-shield]: https://img.shields.io/github/stars/PecceG2/RocketCloud_Stream_Deck.svg?style=flat-square
[stars-url]: https://github.com/PecceG2/RocketCloud_Stream_Deck/stargazers
[issues-shield]: https://img.shields.io/github/issues/PecceG2/RocketCloud_Stream_Deck.svg?style=flat-square
[issues-url]: https://github.com/PecceG2/RocketCloud_Stream_Deck/issues
[license-shield]: https://img.shields.io/github/license/PecceG2/RocketCloud_Stream_Deck.svg?style=flat-square
[license-url]: https://github.com/PecceG2/RocketCloud_Stream_Deck/blob/master/LICENSE.md