// Создай плагин настраиваемого таймера, который ведет обратный отсчет до предварительно определенной даты. Такой плагин может использоваться в блогах и интернет-магазинах, страницах регистрации событий, во время технического обслуживания и т. д.

// preview

// Плагин ожидает следующую HTML-разметку и показывает четыре цифры: дни, часы, минуты и секунды в формате XX:XX:XX:XX. Количество дней может состоять из более чем двух цифр.

// Плагин это класс CountdownTimer, экземпляр которого создает новый таймер с настройками.

class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.targetDate = new Date(targetDate);
    this.days = document.querySelector(`${selector} .value[data-value="days"]`);
    this.hours = document.querySelector(
      `${selector} .value[data-value="hours"]`
    );
    this.minutes = document.querySelector(
      `${selector} .value[data-value="mins"]`
    );
    this.seconds = document.querySelector(
      `${selector} .value[data-value="secs"]`
    );
  }

  showTime() {
    setInterval(() => this.onTime(), 1000);
  }
  double(value) {
    return value < 10 ? `0${value}` : value;
  }

  onTime() {
    let currentTime = new Date();

    let time = currentTime - this.targetDate;

    this.days.textContent = this.double(
      Math.floor(time / (1000 * 60 * 60 * 24))
    );
    this.hours.textContent = 24 -this.double(
      Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    );
    this.minutes.textContent = 60 -this.double(
      Math.floor((time % (1000 * 60 * 60)) / (1000 * 60))
    );
    this.seconds.textContent = 60 - this.double(
      Math.floor((time % (1000 * 60)) / 1000)
    );
  }
}

let timer = new CountdownTimer({
  selector: "#timer-1",
  targetDate: new Date("Jul 17, 2019"),
});

let startTime = document.querySelector("#timer");

startTime.addEventListener("click", startTimer);

function startTimer() {
  startTime.disabled = true;
  timer.showTime();
}
