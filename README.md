# Zendesk Coding Challenge

## Prerequisites
- nodeJS. If you don't have it head over to their [website](https://nodejs.org/) to get it

## Usage
To get this going, simply do the following...

Clone this repository:
```sh
$ git clone https://github.com/allanapplebee/zendesk_coding_challenge.git
```
then:
```sh 
$ cd zendesk_coding_challenge 
```
and finally:
```sh
$ npm install --save
$ npm run start
```

## Tests
To run tests
```sh
$ npm run test
```
A quick note on the tests. Testing is not my forte, so I have only included some very basic tests - checking some status codes and checking the API call returns the required data.

## Design Decisions
I initially considered building a React app, but decided that this was overkill for such a simple app - too much bloat and unnecessary complexity and functionality.  
So I ultimately decided to go with a simple express server to make the API requests, and EJS for dynamic templating in the browser. I appreciate using templating engines is a bit old-school these days, but given the above considerations it seemed like a sensible solution.

## Assumptions
I have assumed that ticket numbers will be positive integers
