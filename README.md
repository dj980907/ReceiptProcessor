# Receipt Processor Challenge Documentation

My name is Dongjoo Lee. I am a senior studying Computer Science and Economics at NYU. <br>
Please follow the step by step guideline to run this API.

## Step 1. Preparation
Ensure that `node` and `npm` are installed. <br>
You should be able to open up your terminal or DOS Shell and run `node -v` and `npm -v`. Both commands should output a version number. <br>

If they are not installed, <a href="https://nodejs.org/en/download/package-manager" target="">here</a> is the link to install `Node.js` with Package Manager.<br>

Now, you should be able to run `node -v` and `npm -v` after installing `Node.js`.<br>

Next, you should install `express`. To do this, write this in your terminal:
```
npm install express
```

Finally, you should install `uuid`. To do this, write this in your terminal:
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
Then, you will see a message in your cconsole (terminal):
```
Server is running on port 3000
```
Now you can test `POST` and `GET` requests. 

## Sample Outputs

### Example 1
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
### Example 1 Output
```
hi
```

## Summary of API Specification
### Endpoint: Process Receipts

<ul>
    <li> Path: <code>/receipts/process</code>
    <li> Method: <code>POST</code>
    <li> Payload: Receipt JSON
    <li> Response: JSON containing an id for the receipt.
</ul>

Description:

Takes in a JSON receipt (see example in the example directory) and returns a JSON object with an ID generated by your code.

The ID returned is the ID that should be passed into /receipts/{id}/points to get the number of points the receipt was awarded.


### Endpoint: Get Points

<ul>
    <li> Path: <code>/receipts/{id}/points</code>
    <li> Method: <code>GET</code>
    <li> Response: A JSON object containing the number of points awarded.
</ul>

Description:

A simple Getter endpoint that looks up the receipt by the ID and returns an object specifying the points awarded.