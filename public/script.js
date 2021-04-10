/* eslint-disable no-console */
async function diningTable() {
  const diningHalls = await fetch('/api/dining');
  const dHjson = await diningHalls.json();
  const resTable = document.querySelector('.tableConten');
  console.log(resTable);
  console.log(dHjson);

  dHjson.data.forEach((item) => {
    console.log(item);
    const appendItem = document.createElement('tr');
    appendItem.innerHTML = `<td>${item.hall_id}</td><td>${item.hall_name}</td><td>${item.hall_address}</td>`;
    resTable.append(appendItem);
  });
}
window.onload = diningTable;