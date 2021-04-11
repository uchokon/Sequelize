/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */

function addData(data, macro) {
  tempArray = [];
  for (let i = 0; i < data.length; i++) {
    tempArray.push({
      x: i,
      y: data[i][macro],
      label: data[i].meal_name
    });
  }
  return tempArray;
}
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}

async function windowActions() {
  const meals = await fetch('/api/meals').then((blob) => blob.json());
  const mealMacrosReq = await fetch('/api/mealMacros');
  const mealMacros = await mealMacrosReq.json();
  const mealArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const selected = mealArray.map((element) => {
    const random = getRandomInt(0, mealMacros.data.length - 1);
    return mealMacros.data[random];
  });

  const dataPointsCal = [];
  dataPointsCal.push(addData(selected, (macro = 'calories')));

  const dataPointsCho = [];
  dataPointsCho.push(addData(selected, (macro = 'cholesterol')));

  const dataPointsSod = [];
  dataPointsSod.push(addData(selected, (macro = 'sodium')));

  const dataPointsPro = [];
  dataPointsPro.push(addData(selected, (macro = 'protein')));

  const dataPointsFat = [];
  dataPointsFat.push(addData(selected, (macro = 'fat')));

  const dataPointsCar = [];
  dataPointsCar.push(addData(selected, (macro = 'carbs')));

  const dataPointsSer = [];
  dataPointsSer.push(addData(selected, (macro = 'serving_size')));

  const chart = new CanvasJS.Chart('chartContent', {
    animationEnabled: true,
    data: [
      {
        type: 'stackedBar',
        name: 'Calories',
        showInLegend: 'true',
        dataPoints: dataPointsCal[0]
      },
      {
        type: 'stackedBar',
        name: 'Serving Size',
        showInLegend: 'true',
        dataPoints: dataPointsSer[0]
      },
      {
        type: 'stackedBar',
        name: 'Fat',
        showInLegend: 'true',
        dataPoints: dataPointsFat[0]
      },
      {
        type: 'stackedBar',
        name: 'Carbs',
        showInLegend: 'true',
        dataPoints: dataPointsCar[0]
      },
      {
        type: 'stackedBar',
        name: 'Cholesterol',
        showInLegend: 'true',
        dataPoints: dataPointsCho[0]
      },
      {
        type: 'stackedBar',
        name: 'Sodium',
        showInLegend: 'true',
        dataPoints: dataPointsSod[0]
      },
      {
        type: 'stackedBar',
        name: 'Protein',
        showInLegend: 'true',
        dataPoints: dataPointsPro[0]
      }
    ]
  });

  chart.render();

  async function dinerTable() {
    const diningHalls = await fetch('/api/dining');
    const dHjson = await diningHalls.json();
    const resTable = document.querySelector('.tableContent');
    console.log(resTable);
    console.log(dHjson);

    dHjson.data.forEach((item) => {
      console.log(item);
      const appendItem = document.createElement('tr');
      appendItem.innerHTML = `<td>${item.hall_id}</td><td>${item.hall_name}</td><td>${item.hall_address}</td>`;
      resTable.append(appendItem);
    });
  }

  dinerTable();
}
window.onload = windowActions;