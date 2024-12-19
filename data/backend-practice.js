//HTTP = HyperText Transfer Protocol = a message from front to back-end
//URL = Uniform Resourse Locator = like an address for the internet
//XMLHttpRequest = built-in class of JS
//URL Path = stands after domain name and gives different responses.

//message to backend = request / message from backend = response = Request-Response Cycle
//Backend can respond with text, JSON, HTML, image
//Using the browser = making a GET request => we get the image instead of raw text, we get the HTML instead of code

//Status code (404) = starts with 4 or 5 = failed. If 4 => our problem, if 5 => backend's problem. Starts with 2 = succeeded
//API = Application Programming Interface = list of all the supported paths of the backend

const xhr = new XMLHttpRequest();

xhr.addEventListener('load', () => {
  console.log(xhr.response);
});

xhr.open('GET', 'https://supersimplebackend.dev/products'); //1.Type of request 2.URL we want to send to
xhr.send(); //asynchronous code