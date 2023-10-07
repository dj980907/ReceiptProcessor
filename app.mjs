// for this assessment, I am going to use express
import express from 'express';
// also a body-parser
import bodyParser from 'body-parser';
// and uuid for generating the id for the receipt
import { v4 as uuidv4 } from 'uuid';

// create an app using express
const app = express();

// we will use 3000 for the port 
const port = 3000;

// using body parse as a middleware
app.use(bodyParser.json());

// generating the id for the each individual receipts
const idGenerator = () => uuidv4();

// this is the local data base object for the receipts that we are getting in
const receiptDatabase = {};

// post request that has the path of receipts/process and take in JSON as a body
app.post('/receipts/process', (req, res) => {

    // first we create an id for the receipt using id generator
    const receiptId = idGenerator();

    // add the receipt as a value and the id generated as it key
    // to the local data base object
    receiptDatabase[receiptId] = req.body;

    // response object will have the id 
    res.json({ id: receiptId });
});

// get request that has the path receipts/:id/points
// here, the path is dynamic so that it can handle all of them 
app.get('/receipts/:id/points', (req, res) => {

    // get the receipt that we have stored in the local data base object

    const receipt = receiptDatabase[req.params.id];
    if (!receipt) {
        return res.status(404).json({ error: 'Receipt not found' });
    }

    // call the method to calculate the point and store it in a const variable points
    const points = calculatePoints(receipt);
    res.json({ points });
});


// function that will be called to calculate the receipt points
function calculatePoints(receipt) {

    // declare the points to be 0 to start with
    let points = 0;

    // One point for every alphanumeric character in the retailer name is added to the total points
    points += receipt.retailer.replace(/[^a-zA-Z0-9]/g, '').length;

    // 50 points are added to the total points if the total is a round dollar amount with no cents.
    const totalAmount = parseFloat(receipt.total);
    if (totalAmount === Math.floor(totalAmount)) {
        points += 50;
    }

    // 25 points are added to total points if the total is a multiple of 0.25.
    if (totalAmount % 0.25 === 0) {
        points += 25;
    }

    // 5 points for every two items on the receipt are added to the total points
    const numItems = receipt.items.length;
    points += Math.floor(numItems / 2) * 5;

    // If the trimmed length of the item description is a multiple of 3,
    // multiply the price by 0.2 and round up to the nearest integer.
    // The result is the number of points earned.
    for (const item of receipt.items) {
        const descriptionLength = item.shortDescription.trim().length;
        if (descriptionLength % 3 === 0) {
            const itemPrice = parseFloat(item.price);
            const itemPoints = Math.ceil(itemPrice * 0.2);
            points += itemPoints;
        }
    }

    // 6 points are added to the total points if the day in the purchase date is odd.
    const split = receipt.purchaseDate.split("-");

    if (split[2] % 2 !== 0) {
        points += 6;
    }

    // 10 points are added to the total points if the time of purchase is after 2:00pm and before 4:00pm.
    const purchaseTime = receipt.purchaseTime.split(':');
    const hour = parseInt(purchaseTime[0]);
    if (hour >= 14 && hour < 16) {
        points += 10;
    }

    return points;
}

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

