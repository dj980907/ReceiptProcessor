# Receipt Processor Documentation
My name is Dongjoo Lee. I am a senior studying Computer Science and Economics at New York University.<br>
This is a receipt processing API made with `Node.js`.<br>
## Summary of API Specification
### Endpoint: Process Receipts

<ul>
    <li> Path: <code>/receipts/process</code>
    <li> Method: <code>POST</code>
    <li> Payload: Receipt JSON
    <li> Response: JSON containing an id for the receipt.
</ul>

Description:

This API takes in a JSON receipt and returns a JSON object with an ID generated.

For example, if you want to test `POST` request, copy and paste the following JSON and put it in the request body.
```
{
  "retailer": "Target",
  "purchaseDate": "2022-01-01",
  "purchaseTime": "13:01",
  "items": [
    {
      "shortDescription": "Mountain Dew 12PK",
      "price": "6.49"
    },{
      "shortDescription": "Emils Cheese Pizza",
      "price": "12.25"
    },{
      "shortDescription": "Knorr Creamy Chicken",
      "price": "1.26"
    },{
      "shortDescription": "Doritos Nacho Cheese",
      "price": "3.35"
    },{
      "shortDescription": "   Klarbrunn 12-PK 12 FL OZ  ",
      "price": "12.00"
    }
  ],
  "total": "35.35"
}
```
Then, you should get the response of:
```
{ "id": "7fb1377b-b223-49d9-a31a-5a02701dd310" }
```

The ID returned is the ID that should be passed into /receipts/{id}/points to get the number of points the receipt was awarded.

### Endpoint: Get Points

<ul>
    <li> Path: <code>/receipts/{id}/points</code>
    <li> Method: <code>GET</code>
    <li> Response: A JSON object containing the number of points awarded.
</ul>

Description:

A simple Getter endpoint that looks up the receipt by the ID and returns an object specifying the points awarded.

For example, if you want to test `GET` request of the previous `POST` request, the path for the request will be:
```
http://localhost/3000/receipts/7fb1377b-b223-49d9-a31a-5a02701dd310/points
``` 

Then, you should get the response of:
```
{ "points": 28 }
```

`points` will be calculated based on the following set of rules:
<ul>
    <li>One point for every alphanumeric character in the retailer name.
    <li>50 points if the total is a round dollar amount with no cents.
    <li>25 points if the total is a multiple of 0.25.
    <li>5 points for every two items on the receipt.
    <li>If the trimmed length of the item description is a multiple of 3, multiply the price by 0.2 and round up to the nearest integer. The result is the number of points earned.
    <li>6 points if the day in the purchase date is odd.
    <li>10 points if the time of purchase is after 2:00pm and before 4:00pm.
</ul>

## Step 1. Preparation

In order to run this API, you need to install the following:
<ul>
    <li>node
    <li>npm
</ul>

Ensure that `node` and `npm` are installed. <br>

You should be able to open up your terminal or DOS Shell and run `node -v` and `npm -v`. Both commands should output a version number. <br>

If you don't see version number, then it means that you do not have node in your device.<br>

If they are not installed, <a href="https://nodejs.org/en/download/package-manager" target="">here</a> is the link to install `Node.js` with Package Manager.<br>

Now, you should be able to run `node -v` and `npm -v` and see the version number after installing `Node.js`.<br>

Next, you should install `express`.<br>
Express is a node.js web application framework that provides various features such as tcp/ip server.<br>
This API is built with express. In order to run this code, you need to install `express`.<br>
To do this, write this in your terminal:
```
npm install express
```

Finally, you should install `uuid`. 
I utilized `uuid` to generate unique ID for each receipt. <br>
To do this, write this in your terminal:
```
npm install uuid
```

## Step 2. Clone The Repository
On the repository's page, use the green "Clone or download" button on the right side of the screen to copy the HTTPS clone URL to clone this project. <br>
To use the commandline client (with GITHUB_REPOSITORY_URL being the url you copied from the green button):
```
 git clone GITHUB_REPOSITORY_URL
```

## Step 3. Run The Code!
To run the API, simply type this in the console (terminal):
```
node app.mjs
```
Then, you will see a message in your console (terminal):
```
Server is running on port 3000
```
Now you can test `POST` and `GET` requests. 


## Testing
I used Kong Insomnia to test the functionality of the API. Kong Insomnia is a collaborative open source API development platform<br>

### Testing Post Request
If I want to make a `POST` request, then I type in:
```
http://localhost:3000/receipts/process
```
and put the JSON of receipt such as:
```
{
  "retailer": "Target",
  "purchaseDate": "2022-01-01",
  "purchaseTime": "13:01",
  "items": [
    {
      "shortDescription": "Mountain Dew 12PK",
      "price": "6.49"
    },{
      "shortDescription": "Emils Cheese Pizza",
      "price": "12.25"
    },{
      "shortDescription": "Knorr Creamy Chicken",
      "price": "1.26"
    },{
      "shortDescription": "Doritos Nacho Cheese",
      "price": "3.35"
    },{
      "shortDescription": "   Klarbrunn 12-PK 12 FL OZ  ",
      "price": "12.00"
    }
  ],
  "total": "35.35"
}
```

Then, click the send button, I will get the id of the receipt.<br>

Here is the screenshot of the Kong Insomnia.<br>

<img width="979" alt="Screen Shot 2023-10-09 at 4 38 12 PM" src="https://github.com/dj980907/ReceiptProcessor/assets/108609222/56795e8f-9754-491e-80dc-6dbcf341f135">

### Testing Get Request
If I want to make a `Get` request, then I type in:
```
http://localhost:3000/receipts/eee33198-ff5f-48ae-937c-07d8b32431b3/points
```

Then, the points calculated by the code will be returned.<br>

Here is the screenshot of the Kong Insomnia.<br>
<img width="979" alt="Screen Shot 2023-10-09 at 4 40 33 PM" src="https://github.com/dj980907/ReceiptProcessor/assets/108609222/5f2bfcd5-61ea-4733-bc1e-17724e5d2aa1">

