#Massively Multiplayer Online Pokemon Card Game on NodeJS/WebSockets/CouchDB

Web applications have evolved by utilizing push technologies. If you're building anything where users need to interact with other users to create a competitive environment, this queue system is just for you. The importance of queue'ing systems is to help users find other players to play with. Here's some basic code to get you set up, the rest is up to your imagination.

![NodeJS MMO Pokemon Architecture](http://bueza.com/temp/mmo-cards-architecture.png) 

[Video Demonstration](http://youtu.be/Kcsjb1Isweo?hd=1)

[My Blog Post](http://jbueza.blogspot.com/2010/09/nodejs-hack-session-mmo-pokemon-with.html)

Hopefully, this proof of concept will inspire other developers who want to shape the open Web into a more engaging experience (easy to build real-time web applications) on top of a broad subset of consumer technologies (iPad, iPhone, Droids, Nokias, Samsung Galaxy, Chrome, Safari, Firefox, IE, etc).

## Examples of Queueing Systems (Competitive and Non-Competitive)

* World of Warcraft Battleground/Arena queues (finds opponants based on match-making rating)
* Starcraft 2 game finder (finds players within certain leagues to fight against)
* Warcraft 3 game finder (finds players within certain ratings based off of ELO rating system)
* ChatRoulette 
* Chess Riot 
* [Scrabb.ly](http://www.scrabb.ly) -- MMO Scrabble. So, freaking, awesome and inspiring.

## Technologies Used

### Backend

* [NodeJS](http://www.nodejs.org)
* WebSockets (iPad, iPhone, Chrome, Safari)
* Fallbacks for non-webkit browsers
  * Adobe Flash Socket
  * ActiveX HTMLFile (IE)
  * XHR with multipart encoding
  * XHR with long-polling
  * JSONP polling (for cross-domain)

###Frontend

* SASS with SCSS, [OOCSS](http://wiki.github.com/stubbornella/oocss/)
* [HTML5 Boilerplate](http://www.html5boilerplate.com) -- Paul, you a crazy ninja.
* CSS3 for drop shadows, transparencies, rounded corners, and animations!
* [Blast Mojo Framework](http://www.blastmojo.com) -- Javascript MVC

## NodeJS Packages

* npm install express
* npm install ejs  (possibly swapping this out for YUI as a more comfortable templating engine)
* npm install socket.io (must be a fixed version of it of 0.5.3 from github, not npm -- pst me for help with this)


## Data 

### Importing Achievements
<code>
  $ cd data
  $ node import.achievement.js
</code>

### Importing Users
<code>
  $ cd data
  $ node import.user.js
</code>

## MIT License

Copyright (c) 2010 Jaime Bueza

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.