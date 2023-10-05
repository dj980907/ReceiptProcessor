// for this assessment, I am going to use express
const express = require('express');
// import express from 'express';
// also a body-parser
const bodyParser = require('body-parser');
// and uuid
const uuid = require('uuid');

// create an app using express
const app = express();

// we will use 3000 for the port 
const port = 3000;

// this is run in local environment so I am going to use local host, which is 127.0.0.1
// const localHost = '127.0.0.1';

app.use(bodyParser.json());

const receiptDatabase = {};
const idGenerator = () => uuid.v4();

app.post('/receipts/process', (req, res) => {
  const receiptId = idGenerator();
  receiptDatabase[receiptId] = req.body;
  res.json({ id: receiptId });
});

app.get('/receipts/:id/points', (req, res) => {
  const receipt = receiptDatabase[req.params.id];
  if (!receipt) {
    return res.status(404).json({ error: 'Receipt not found' });
  }

  const points = calculatePoints(receipt);
  res.json({ points });
});

function calculatePoints(receipt) {
  let points = 0;

  // Rule 1: One point for every alphanumeric character in the retailer name.
  points += receipt.retailer.replace(/[^a-zA-Z0-9]/g, '').length;

  // Rule 2: 50 points if the total is a round dollar amount with no cents.
  const totalAmount = parseFloat(receipt.total);
  if (totalAmount === Math.floor(totalAmount)) {
    points += 50;
  }

  // Rule 3: 25 points if the total is a multiple of 0.25.
  if (totalAmount % 0.25 === 0) {
    points += 25;
  }

  // Rule 4: 5 points for every two items on the receipt.
  const numItems = receipt.items.length;
  points += Math.floor(numItems / 2) * 5;

  // Rule 5: If the trimmed length of the item description is a multiple of 3,
  // multiply the price by 0.2 and round up to the nearest integer. The result is the number of points earned.
  for (const item of receipt.items) {
    const descriptionLength = item.shortDescription.trim().length;
    if (descriptionLength % 3 === 0) {
      const itemPrice = parseFloat(item.price);
      const itemPoints = Math.ceil(itemPrice * 0.2);
      points += itemPoints;
    }
  }

  // Rule 6: 6 points if the day in the purchase date is odd.
  const purchaseDate = new Date(receipt.purchaseDate);
  if (purchaseDate.getDate() % 2 !== 0) {
    points += 6;
  }

  // Rule 7: 10 points if the time of purchase is after 2:00pm and before 4:00pm.
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

