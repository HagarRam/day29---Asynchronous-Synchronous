// import axios from 'axios';
//ex1
//A
let getData = new Promise((resolve, reject) => {
	setTimeout(() => {
		resolve('Hello, World');
	}, 2000);
});
// console.log(getData);

let processData = async () => {
	let dataFromFunction = await getData;
	console.log(dataFromFunction);
};
processData();

//B
let myFunction = (data) => {
	return new Promise((resolve, reject) => {
		if (typeof data === 'number') {
			if (data % 2 === 0) {
				setTimeout(() => resolve('even'), 2000);
			} else {
				setTimeout(() => resolve('odd'), 1000);
			}
		} else {
			reject(new Error('Data failed to arrive'));
		}
	});
};

let myFunctionData = async () => {
	let dataFromFunction1 = await myFunction(4);
	console.log(dataFromFunction1);
};
myFunctionData();
//ex2

//selectTag
let bottontwo = document.createElement('select');
bottontwo.type = 'submit';
bottontwo.innerHTML = 'Filter by Region';
bottontwo.className = 'bottonTwo';
let allTheBotton = document.createElement('div');
bottontwo.appendChild(allTheBotton);
let regionSearch = ['Africa', 'American', 'Asia', 'Europe', 'Oceania'];
let selectTitle = document.createElement('option');
selectTitle.innerHTML = 'Select';
bottontwo.appendChild(selectTitle);
for (let i = 0; i < regionSearch.length; i++) {
	let selectTag = document.createElement('option');
	selectTag.id = 'selectTag';
	selectTag.innerHTML = `${regionSearch[i]}`;
	bottontwo.appendChild(selectTag);
}
let selectTag1 = document.getElementsById('selectTag');
selectTag1.addEventListener('click', () => {
	let select = document.querySelector('.select');
	console.log(select);
	debugger;
	for (let i = 0; i < select.length; i++) {
		let search = select[i].children[1].textContent.toUpperCase();
		if (search.includes(selectTagInput.toUpperCase())) {
			boxes[i].style.display = '';
		} else {
			boxes[i].style.display = 'none';
		}
	}
});

// allTheBotton.className = 'allTheBotton';
// allTheBotton.id = 'allTheBotton';
// bottontwo.addEventListener('click', () => {
// 	let catagories = document.getElementsByClassName('allTheBotton')[0];
// 	if ((catagories.id = 'allTheBotton')) {
// 		catagories.id = 'afterClick';
// 	} else {
// 		catagories.id = 'allTheBotton';
// 	}
// });
//input - search
let input = document.createElement('input');
let bottonInput = document.createElement('botton');
input.type = 'text';
input.placeholder = 'Search for a country....';
bottonInput.type = 'submit';
bottonInput.innerHTML = 'submit';
input.className = 'input-box';
bottonInput.className = 'bottonInput';

let inputText = input.value;
input.addEventListener('input', () => {
	let boxes = document.getElementsByClassName('box');
	for (let i = 0; i < boxes.length; i++) {
		let search = boxes[i].children[1].textContent.toUpperCase();
		if (search.includes(input.value.toUpperCase())) {
			boxes[i].style.display = '';
		} else {
			boxes[i].style.display = 'none';
		}
	}
});

//countries - get a data
const getCountries = async () => {
	try {
		const countriesDataObj = await axios.get(
			'https://restcountries.com/v2/all'
		);
		const countries = countriesDataObj.data.map((country) => {
			return {
				flag: country.flag,
				name: country.name,
				population: country.population,
				region: country.region,
				capital: country.capital,
			};
		});
		return countries;
	} catch (err) {
		console.error(err);
	}
};
let allTheBox = document.createElement('div');
allTheBox.classList = 'allTheBoxes';
getCountries()
	.then((countries) => {
		countries.forEach((country) => {
			let allTheCountry = document.createElement('div');
			let flagPhoto = document.createElement('img');
			let nameCountry = document.createElement('div');
			let population = document.createElement('div');
			let region = document.createElement('div');
			let capital = document.createElement('div');

			allTheCountry.appendChild(flagPhoto);
			allTheCountry.appendChild(nameCountry);
			allTheBox.appendChild(allTheCountry);

			// console.log(allTheCountry);
			allTheCountry.className = 'box';
			flagPhoto.className = 'photo';
			nameCountry.className = 'nameCountry';
			population.className = 'population';
			region.className = 'region';
			capital.className = 'capital';

			flagPhoto.src = country.flag;
			nameCountry.innerHTML = country.name;

			for (const [key, value] of Object.entries(country)) {
				let key2 = document.createElement('div');
				if (key === 'population' || key === 'region' || key === 'capital') {
					let label = `<span>${key}</span>  :  ${value.toLocaleString()}`;
					key2.innerHTML = label;
				}
				allTheCountry.appendChild(key2);
			}
		});
	})
	.catch((err) => console.log(err));
document.body.appendChild(input);
document.body.appendChild(bottonInput);
document.body.appendChild(bottontwo);
document.body.appendChild(allTheBox);
