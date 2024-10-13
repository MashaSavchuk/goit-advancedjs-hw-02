## goit-advancedjs-hw-02

Vanilla App Template

Цей проект було створено за допомогою Vite. Для знайомства та налаштування
додаткових можливостей звернись до документації.

## Завдання 1. Таймер зворотного відліку

Виконуй це завдання у файлах `02-timer.html` і `02-timer.js`. Напиши скрипт
таймера, який здійснює зворотний відлік до певної дати. Такий таймер може
використовуватися у блогах та інтернет-магазинах, сторінках реєстрації подій,
під час технічного обслуговування тощо. Подивися демо-відео роботи таймера.

https://user-images.githubusercontent.com/17479434/127672390-2a51efe1-06fb-41dd-86dd-8542393d3043.mp4

### Елементи інтефрейсу

HTML містить готову розмітку таймера, поля вибору кінцевої дати і кнопку, по
кліку на яку, таймер повинен запускатися.

### Бібліотека `flatpickr`

Використовуй бібліотеку [flatpickr](https://flatpickr.js.org/) для того, щоб
дозволити користувачеві кросбраузерно вибрати кінцеву дату і час в одному
елементі інтерфейсу. Для того щоб підключити CSS код бібліотеки в проект,
необхідно додати ще один імпорт, крім того, що описаний в документації.

```js
// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';
```

Бібліотека очікує, що її ініціалізують на елементі `input[type="text"]`, тому ми
додали до HTML документу поле `input#datetime-picker`.

```html
<input type="text" id="datetime-picker" />
```

Другим аргументом функції `flatpickr(selector, options)` можна передати
необов'язковий об'єкт параметрів. Ми підготували для тебе об'єкт, який потрібен
для виконання завдання. Розберися, за що відповідає кожна властивість в
[документації «Options»](https://flatpickr.js.org/options/), і використовуй його
у своєму коді.

```js
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
  },
};
```

### Вибір дати

Метод `onClose()` з об'єкта параметрів викликається щоразу під час закриття
елемента інтерфейсу, який створює `flatpickr`. Саме у ньому варто обробляти
дату, обрану користувачем. Параметр `selectedDates` - це масив обраних дат, тому
ми беремо перший елемент.

- Якщо користувач вибрав дату в минулому, покажи `window.alert()` з текстом
  `"Please choose a date in the future"`.
- Якщо користувач вибрав валідну дату (в майбутньому), кнопка «Start» стає
  активною.
- Кнопка «Start» повинна бути неактивною доти, доки користувач не вибрав дату в
  майбутньому.
- Натисканням на кнопку «Start» починається відлік часу до обраної дати з
  моменту натискання.

### Відлік часу

Натисканням на кнопку «Start» скрипт повинен обчислювати раз на секунду, скільки
часу залишилось до вказаної дати, і оновлювати інтерфейс таймера, показуючи
чотири цифри: дні, години, хвилини і секунди у форматі `xx:xx:xx:xx`.

- Кількість днів може складатися з більше, ніж двох цифр.
- Таймер повинен зупинятися, коли дійшов до кінцевої дати, тобто `00:00:00:00`.

> 💡 Не будемо ускладнювати. Якщо таймер запущений, для того щоб вибрати нову
> дату і перезапустити його - необхідно перезавантажити сторінку.

Для підрахунку значень використовуй готову функцію `convertMs`, де `ms` -
різниця між кінцевою і поточною датою в мілісекундах.

```js
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
```

### Форматування часу

Функція `convertMs()` повертає об'єкт з розрахованим часом, що залишився до
кінцевої дати. Зверни увагу, що вона не форматує результат. Тобто, якщо
залишилося 4 хвилини або будь-якої іншої складової часу, то функція поверне `4`,
а не `04`. В інтерфейсі таймера необхідно додавати `0`, якщо в числі менше двох
символів. Напиши функцію `addLeadingZero(value)`, яка використовує метод
`padStart()` і перед рендерингом інтефрейсу форматує значення.

### Бібліотека повідомлень

> ⚠️ Наступний функціонал не обов'язковий для здавання завдання, але буде
> хорошою додатковою практикою.

Для відображення повідомлень користувачеві, замість `window.alert()`,
використовуй бібліотеку [notiflix](https://github.com/notiflix/Notiflix#readme).

## Завдання 2. Генератор промісів

Виконуй це завдання у файлах `03-promises.html` і `03-promises.js`. Подивися
демо-відео роботи генератора промісів.

https://user-images.githubusercontent.com/17479434/127932183-42232f26-4db2-4614-86bc-6bec54b1d6a4.mp4

HTML містить розмітку форми, в поля якої користувач буде вводити першу затримку
в мілісекундах, крок збільшення затримки для кожного промісу після першого і
кількість промісів, яку необхідно створити.

```html
<form class="form">
  <label>
    First delay (ms)
    <input type="number" name="delay" required />
  </label>
  <label>
    Delay step (ms)
    <input type="number" name="step" required />
  </label>
  <label>
    Amount
    <input type="number" name="amount" required />
  </label>
  <button type="submit">Create promises</button>
</form>
```

Напиши скрипт, який на момент сабміту форми викликає функцію
`createPromise(position, delay)` стільки разів, скільки ввели в поле `amount`.
Під час кожного виклику передай їй номер промісу (`position`), що створюється, і
затримку, враховуючи першу затримку (`delay`), введену користувачем, і крок
(`step`).

```js
function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    // Fulfill
  } else {
    // Reject
  }
}
```

Доповни код функції `createPromise` таким чином, щоб вона повертала **один
проміс**, який виконується або відхиляється через `delay` часу. Значенням
промісу повинен бути об'єкт, в якому будуть властивості `position` і `delay` зі
значеннями однойменних параметрів. Використовуй початковий код функції для
вибору того, що потрібно зробити з промісом - виконати або відхилити.

```js
createPromise(2, 1500)
  .then(({ position, delay }) => {
    console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    console.log(`❌ Rejected promise ${position} in ${delay}ms`);
  });
```

### Бібліотека повідомлень

> ⚠️ Наступний функціонал не обов'язковий для здавання завдання, але буде
> хорошою додатковою практикою.

Для відображення повідомлень користувачеві, замість `console.log()`,
використовуй бібліотеку [iziToast](https://izitoast.marcelodolza.com/).

![Screencaption](./assets/1.png) ![Screencaption](./assets/2.png)
![Screencaption](./assets/3.png) ![Screencaption](./assets/4.png)
