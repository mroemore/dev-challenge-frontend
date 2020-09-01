# dev-challenge-frontend

## How to Build
* Enter the `app/` directory in your console of choice.
* Run `npm install`
* Compile the CSS with `sass css/main.scss css/main.css`

## How to Run
* Make sure the API server is running
* Ensure that the address the API is running is `http://localhost:9001` if not, you will need to modify the `apiBaseURL` variable inside of `js/main.js` and `js/post.js`.
* I used `http-server` to test this application. It can be installed by running `npm install -g http-server` in your command line.
* Once `http-server` is installed, cd into the `app/` directory and run `http-server`. It will likely be hosted on `localhost:8080`.
* That's it!
