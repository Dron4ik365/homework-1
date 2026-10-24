'use strict';

// ДЗ 1. Консольное меню
// Запуск: node homework-1.js

const readline = require('node:readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Задаёт вопрос пользователю и возвращает Promise с введённой строкой
function ask(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

// Задаёт вопрос и превращает ответ в число
async function askNumber(prompt) {
  const answer = await ask(prompt);
  return Number(answer);
}

// ============ Задача 1. Билетная касса ============

// Возвращает цену билета по категории (для неизвестной категории — 0)
function ticketPrice(category) {
  switch (category) {
    case 1:
      return 300;
    case 2:
      return 500;
    case 3:
      return 900;
    default:
      return 0;
  }
}

// Циклом while считает, сколько билетов по цене price можно купить
// на бюджет budget. Деление и округление не используются.
function maxTickets(budget, price) {
  let count = 0;
  let money = budget;
  while (money >= price) {
    money -= price;
    count += 1;
  }
  return count;
}

// Вызывает две функции выше и печатает чек
function printTicketResult(category, budget) {
  const price = ticketPrice(category);
  if (price === 0) {
    console.log('неизвестная категория');
    return;
  }
  const count = maxTickets(budget, price);
  console.log(
    `Категория ${category}, билет ${price} руб., бюджет ${budget} руб.: можно купить ${count} шт.`
  );
}

// ============ Задача 2. Доставка заказа ============

// Возвращает стоимость доставки
function deliveryPrice(distance, total) {
  if (total >= 3000) {
    return 0; // доставка бесплатна при заказе от 3000
  }
  if (distance <= 3) {
    return 0; // до 3 км включительно — бесплатно
  }
  if (distance <= 10) {
    return 200; // от 4 до 10 км включительно
  }
  return 200 + 25 * (distance - 10); // дальше: 200 + 25 за каждый км после 10-го
}

// Вызывает функцию выше и печатает одну строку по шаблону
function printDelivery(distance, total) {
  const price = deliveryPrice(distance, total);
  console.log(`Расстояние ${distance} км, заказ ${total} руб.: доставка ${price} руб.`);
}

// ============ Задача 3. Лестница ============

// Циклом for печатает номера ступеней от 1 до height
function printSteps(height) {
  let built = 0;
  for (let step = 1; step <= height; step += 1) {
    if (step === 4) {
      continue; // ступень 4 не строится
    }
    if (step > 10) {
      console.log('Дальше лестница не построена');
      break; // после ступени 10 строительство останавливается
    }
    console.log(`Ступень ${step}`);
    built += 1;
  }
  console.log(`Всего построено: ${built}`);
}

// ============ Меню ============

async function main() {
  console.log('Выберите задачу:');
  console.log('1 — билетная касса');
  console.log('2 — доставка заказа');
  console.log('3 — лестница');

  const choice = await ask('Ваш выбор: ');

  if (choice === '1') {
    const category = await askNumber('Категория билета: ');
    const budget = await askNumber('Бюджет: ');
    printTicketResult(category, budget);
  } else if (choice === '2') {
    const distance = await askNumber('Расстояние: ');
    const total = await askNumber('Сумма заказа: ');
    printDelivery(distance, total);
  } else if (choice === '3') {
    const height = await askNumber('Высота лестницы: ');
    printSteps(height);
  } else {
    console.log('такой задачи нет');
  }

  rl.close();
}

main();
