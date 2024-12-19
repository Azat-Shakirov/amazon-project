import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

function isWeekend() {
  const today = dayjs();
  const daysafter = today.subtract(2, 'days');
  if (daysafter.format('dddd') === 'Saturday' || daysafter.format('dddd') === 'Sunday') {
    console.log('Today is weekend');
  } else {
    console.log('Today is not weekend');
  };
}
export default isWeekend;