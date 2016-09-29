// TO DO:
// if we want... sell button

$(document).ready(function () {
var total = 100;
var fruitArray = [];
var moneyCheck = '';
$('#totalCash').text(total);

function Fruit(fruit) {
	this.fruit = fruit;
	this.marketPrice = 2.00;
	this.averagePurPrice = 0;
	this.amountBought = 0;
	this.purchases = [];
	this.total = 0;
};

// calculates the total purchase amount of each fruit
Fruit.prototype.purchaseTotal = function () {
	var totalAmt = 0;
	for (var i = 0; i < this.purchases.length; i++){
		totalAmt += this.purchases[i];
	}
	this.total = totalAmt;
}

// takes from the total purchases to calculate the average purchase price
Fruit.prototype.averagePurchase = function() {
	this.purchaseTotal();
	console.log('this total from averagePurchase:', this.total);
	this.averagePurPrice = (this.total / this.purchases.length);
	console.log(this.averagePurPrice);
	$('.app' + this.fruit).text(this.averagePurPrice.toFixed(2));
}

// generates a random market price
Fruit.prototype.calcMarketPrice = function(){
	var amount = randomNumber(1,50);
	amount *= 0.01;
	var addOrSub = randomNumber(0,1);
	if(addOrSub === 0){
		this.marketPrice -= amount;
	} else {
		this.marketPrice += amount;
	}
	if(this.marketPrice <= 0.5){
		this.marketPrice = 0.5;
	} else if (this.marketPrice >= 9.99){
		this.marketPrice = 9.99;
	}
	//this adds randomly generated market price to the DOM
	var thisMarketPrice = (this.marketPrice);
	var thisFruit = this.fruit;
	$('.price' + this.fruit).text(thisMarketPrice.toFixed(2));
}


function totalSpent(array, newPurchase) {
	var calcTotal = total - newPurchase;
		// if the potential purchase causes the total to be < 0, the purchase can't be made
		if(calcTotal < 0){
			moneyCheck = false;
			alert('Purchase not possible.');
		}
		else {
			// the new purchase is calculated to the total and displayed on the DOM
			total = calcTotal;
			console.log(total);
			moneyCheck = true;
			$('#totalCash').text(total.toFixed(2));
		}
}

//listens for a mouse click on a buy button
$('.buy').on('click', function (event) {
	var selectedFruit = $(event.target).attr('class').split(' ')[1];
	selectedFruit = selectedFruit.toLowerCase();
	switch (selectedFruit) {

		case 'apple':
			// calculates the total amount of money available after buying the apple
			totalSpent(fruitArray, apple.marketPrice);
			if (moneyCheck === true){
				//pushes the cost of the apple purchased to the purchases array
				apple.purchases.push(apple.marketPrice);
				//calculates the average purchase price of the apple
				apple.averagePurchase();
				apple.amountBought ++;
			}
			break;

		case 'orange':
			totalSpent(fruitArray, orange.marketPrice);
			if (moneyCheck === true){
				orange.purchases.push(orange.marketPrice);
				orange.averagePurchase();
				orange.amountBought++;
			}
				break;

		case 'banana':
			totalSpent(fruitArray, banana.marketPrice);
			if (moneyCheck === true){
				banana.purchases.push(banana.marketPrice);
				banana.averagePurchase();
				banana.amountBought++;
			}
			break;

		case 'grape':
			totalSpent(fruitArray, grape.marketPrice);
			if (moneyCheck === true){
				grape.purchases.push(grape.marketPrice);
				grape.averagePurchase();
				grape.amountBought++;
			}
			break;
	}
})

// sell fruit
$('.sell').on('click', function (event) {
	var selectedFruit = $(event.target).attr('class').split(' ')[1];
	selectedFruit = selectedFruit.toLowerCase();
	switch (selectedFruit) {

		case 'apple':
			// calculates the total amount of money available after buying the apple
			if (apple.amountBought === 0) {
				alert('Buy something before you sell!')
			} else {
					apple.amountBought--;
					total += apple.marketPrice;
					$('#totalCash').text(total.toFixed(2));
				}
			break;

		case 'orange':
		// calculates the total amount of money available after buying the apple
			if (orange.amountBought === 0) {
				alert('Buy something before you sell!')
			} else {
					orange.amountBought--;
					total += orange.marketPrice;
					$('#totalCash').text(total.toFixed(2));
				}
			break;

			case 'banana':
				// calculates the total amount of money available after buying the apple
				if (banana.amountBought === 0) {
					alert('Buy something before you sell!')
				} else {
						banana.amountBought--;
						total += banana.marketPrice;
						$('#totalCash').text(total.toFixed(2));
					}
				break;

			case 'grape':
			// calculates the total amount of money available after buying the apple
				if (grape.amountBought === 0) {
					alert('Buy something before you sell!')
				} else {
						grape.amountBought--;
						total += grape.marketPrice;
						$('#totalCash').text(total.toFixed(2));
					}
				break;

			}

})
//calls the intervalFifteen function every 15 seconds
function resetValues() {
	window.setTimeout(intervalFifteen, 15000);
}

//recalculates the market price
function intervalFifteen() {
	for(var i = 0; i < fruitArray.length; i++){
		fruitArray[i].calcMarketPrice();
	}
	resetValues();
}

//generates a random number
function randomNumber(min, max) {
	return Math.floor(Math.random() * (1 + max - min) + min);
}

// basic page set up
var apple = new Fruit('Apple');
var orange = new Fruit('Orange');
var banana = new Fruit('Banana');
var grape = new Fruit('Grape');

fruitArray.push(apple, orange, banana, grape);

for(var i = 0; i < fruitArray.length; i++){
	$('.price' + fruitArray[i].fruit).text(fruitArray[i].marketPrice);
	$('.app' + fruitArray[i].fruit).text(fruitArray[i].averagePurPrice);
}

resetValues();
})
