const birthDate = document.querySelector('#birth-date');
const submit = document.querySelector('#submit');
const display = document.querySelector('#display'); 

// const isPalindrome = () => {
//   let dt = makeDate(birthDate.value);
//   let reversed = dt.split('').reverse().join('');
//   console.log(typeof(dt) + " " + reversed);
// }

// const makeDate = (dt) => {
//   let date= dt.split('-');
//   date = date.reverse();
//   date = date.join('');
//   return date;
// }

function reverseStr(str){
  let listOfChars = str.split('');
  let reversed = listOfChars.reverse();
  let reversedStr = reversed.join('');
  return reversedStr;
}

function isPalindrome(str){
  var reversedStr = reverseStr(str);
  return str === reversedStr;
}

function convertDateToStr(date){
  var dateStr = {day: '', month: '', year: ''};

  if(date.day<10){
    dateStr.day = '0' + date.day;
  }
  else{
    dateStr.day = date.day.toString();
  }

  if(date.month<10){
    dateStr.month = '0' + date.month;
  }
  else{
    dateStr.month = date.month.toString();
  }

  dateStr.year = date.year.toString();
  return dateStr;
}

function getDateAllFormats(date){
  let dateStr = convertDateToStr(date);

  let ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
  let mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
  let yyyymmdd = dateStr.year + dateStr.day + dateStr.month;
  let ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
  let mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
  let yymmdd = dateStr.year.slice(-2) + dateStr.day + dateStr.month;

  return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

function checkPalindrome(date){
  let listOfDates = getDateAllFormats(date);

  let flag = [];

  for(let i = 0; i<listOfDates.length; i++){
    let result = isPalindrome(listOfDates[i]);
    flag.push(result);
  }
  return flag;
}

function isLeapYear(year) {

  if (year % 400 === 0)
    return true;

  if (year % 100 === 0)
    return false;

  if (year % 4 === 0)
    return true;

  return false;
}

function getNextDate(date){
  let day = date.day + 1;
  let month = date.month;
  let year = date.year;

  let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if(month === 2){
    if(isLeapYear(year)){
      if(day>29){
        day = 1;
        month++;
      }
    }
    else{
      if(day>29){
        day = 1;
        month++;
      }
    }
  }
  else{
    if(day>daysInMonth[month-1]){
      day = 1;
      month++;
    }
  }
  if(month>12){
    month = 1;
    year++;
  }

  return{
    day:day,month:month, year: year}
}

function getNextPalindrome(date){
  let count = 0;
  let nextDate = getNextDate(date);

  while(true){
    count++;
    let isPalList = checkPalindrome(nextDate);
    for(let i = 0; i<isPalList.length; i++){
      if(isPalList[i]){
        return[count, nextDate]
      }
    }
    nextDate = getNextDate(nextDate);
  }
}

function showMessage(date){

  let dateStr = convertDateToStr(date)
  let list = checkPalindrome(date);
  let flag = false;
  for(let i = 0; i<list.length; i++){
    if(list[i]){
      flag = true;
      break;
    }
  }  

  if(!flag){
    let result = getNextPalindrome(date);
    let count = result[0];
    let nextDate = result[1];
    display.innerHTML = `The next palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year} after ${count} days.`
  }
  
  else{
    display.innerHTML = `Your Birthday is a Palindrome 🥳🎉`
  }
}

function userDate(){
  let dt = birthDate.value;
  dt = dt.split('-');

  let dd = Number(dt[2]);
  let mm = Number(dt[1]);
  let yyyy = Number(dt[0]);

  let date = {
    day: dd,
    month: mm,
    year: yyyy
  }
  showMessage(date);
}

submit.addEventListener('click', userDate);