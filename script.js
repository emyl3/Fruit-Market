// TO DO:
// we are not calculating the total of each fruit before we call averagePurchase()
// need to set up intervalFifteen running


$(document).ready(function () {
function randomNumber(min, max) {
	return Math.floor(Math.random() * (1 + max - min) + min);
}
var total = 100;
var fruitArray = [];
var moneyCheck = '';
$('#totalCash').text(total);

function Fruit(fruit) {
	this.fruit = fruit;
	this.marketPrice = 2.00;
	this.averagePurPrice = 0;
	this.purchases = [];
	this.total = 0;
};

Fruit.prototype.purchaseTotal = function () {
	for (var i = 0; i < this.purchases.length; i++){
		this.total += this.purchases[i];
	}
}

Fruit.prototype.averagePurchase = function() {
	//calculate this.total here
	this.averagePurPrice = this.total / this.purchases.length;
	console.log(this.averagePurPrice);
	$('.app' + this.fruit).text(this.averagePurPrice);
}

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
	var thisMarketPrice = this.marketPrice;
	var thisFruit = this.fruit;
	$('.price' + this.fruit).text(thisMarketPrice);
}

function totalSpent(array, newPurchase) {
	var calcTotal = total - newPurchase;
		if(calcTotal < 0){
			moneyCheck = false;
			alert('Purchase not possible.');
		}
		else {
			total = calcTotal;
			console.log(total);
			moneyCheck = true;
			$('#totalCash').text(total);
		}
}

$('.buy').on('click', function (event) {
	var selectedFruit = $(event.target).attr('class').split(' ')[1];
	selectedFruit = selectedFruit.toLowerCase();
	switch (selectedFruit) {

		case 'apple':
			totalSpent(fruitArray, apple.marketPrice);
			if (moneyCheck === true){
				apple.purchases.push(apple.marketPrice);
				apple.averagePurchase();
			}
			break;

		case 'orange':
			totalSpent(fruitArray, orange.marketPrice);
			if (moneyCheck === true){
				orange.purchases.push(orange.marketPrice);
			}
				break;

		case 'banana':
			totalSpent(fruitArray, banana.marketPrice);
			if (moneyCheck === true){
				banana.purchases.push(banana.marketPrice);
			}
			break;

		case 'grape':
			totalSpent(fruitArray, grape.marketPrice);
			if (moneyCheck === true){
				grape.purchases.push(grape.marketPrice);
			}
			break;
	}
})

function resetValues() {
	window.setTimeout(intervalFifteen, 2000);
}

function intervalFifteen() {
	for(var i = 0; i < fruitArray.length; i++){
		fruitArray[i].calcMarketPrice();
		fruitArray[i].averagePurchase();
	}
	totalSpent(fruitArray);
}

var apple = new Fruit('Apple');
var orange = new Fruit('Orange');
var banana = new Fruit('Banana');
var grape = new Fruit('Grape');

fruitArray.push(apple, orange, banana, grape);

for(var i = 0; i < fruitArray.length; i++){
	$('.price' + fruitArray[i].fruit).text(fruitArray[i].marketPrice);
	$('.app' + fruitArray[i].fruit).text(fruitArray[i].averagePurPrice);
}
})
