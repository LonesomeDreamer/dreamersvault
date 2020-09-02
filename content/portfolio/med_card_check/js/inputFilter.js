let insuranceType = document.querySelectorAll(".insuranceType");
let insuranceID = document.querySelector('input#insuranceID');
let insuranceCompanyWrapper = document.querySelector('div#insuranceCompanyWrapper');
let servicesWrapper = document.querySelector('div#servicesWrapper');
let insuranceServices = document.querySelector('div#services');
let submitButton = document.querySelector('button#submitButton');
let wrapper = document.querySelector("#medCardWrapper");
let infoTable = document.querySelector("#infoTable");

let obj = new Promise((resolve) => {
  fetch('./js/data.json').then(res => res.json()).then(data => {
    resolve(data);
  });
});

const createInfoTable = async () => {
  obj.then(data => {
    let table = document.createElement("table");
    table.id = "infoTable";

    let tr = document.createElement("tr");

    let th = document.createElement("th");
    th.textContent = "ID";
    tr.append(th);

    th = th.cloneNode(true);
    th.textContent = "Тип";
    tr.append(th);

    th = th.cloneNode(true);
    th.textContent = "Компания";
    tr.append(th);

    let td = document.createElement("td");

    table.append(tr);

    for (let i = 0; i < data.insurances.length; i++) {
      tr = tr.cloneNode(false);
      td = td.cloneNode(true);
      td.textContent = data.insurances[i].insuranceID;
      tr.append(td);
      td = td.cloneNode(true);
      td.textContent = data.insurances[i].insuranceType;
      tr.append(td);
      td = td.cloneNode(true);
      td.textContent = data.insurances[i].insuranceCompany;
      tr.append(td);
      table.append(tr);
    }
    wrapper.append(table);
  });
}

const createServicesTable = async () => {
  obj.then(data => {
    let table = document.createElement("table");
    table.id = "servicesListTable";

    let tr = document.createElement("tr");

    let th = document.createElement("th");
    th.textContent = "Вид полиса";
    tr.append(th);

    th = th.cloneNode(true);
    th.textContent = "Услуга";
    tr.append(th);

    let td = document.createElement("td");

    table.append(tr);

    tr = tr.cloneNode(false);
    td = td.cloneNode(false);
    td.textContent = "ОМС и ДМС";
    td.rowSpan = `${data.services[0].servicesIncluded.length}`;
    tr.append(td);

    for (let i = 0; i < data.services[0].servicesIncluded.length; i++) {
      td = td.cloneNode(false);
      td.rowSpan = 1;
      td.textContent = data.services[0].servicesIncluded[i];
      tr.append(td);
      table.append(tr);
      tr = tr.cloneNode(false);
    }

    tr = tr.cloneNode(false);
    td = td.cloneNode(false);
    td.textContent = "Только ДМС";
    td.rowSpan = `${data.services[1].servicesExcluded.length}`;
    tr.append(td);

    for (let i = 0; i < data.services[1].servicesExcluded.length; i++) {
      td = td.cloneNode(false);
      td.rowSpan = 1;
      td.textContent = data.services[1].servicesExcluded[i];
      tr.append(td);
      table.append(tr);
      tr = tr.cloneNode(false);
    }

    wrapper.append(table);
  });
}

createInfoTable();
createServicesTable();

function isAllowedinsuranceIDInputKey(event) {
  if ((event.key == "Backspace") || (event.key == "Delete") || (event.ctrlKey && (event.code == "KeyC" || event.code == "KeyV" || event.code == "KeyZ")) || (event.key == "Shift") || (event.key == "Alt") || (event.key == "Escape") || (event.key == "Tab") || (event.key == "ArrowLeft") || (event.key == "ArrowUp") || (event.key == "ArrowRight") || (event.key == "ArrowDown")) {
    return true;
  }
  let res = event.key.match(/[\d\t\-\ ]/);
  if (res) {
    return true;
  } else {
    return false;
  }
}

function changeInsuranceType(target, isActive) {
  if (isActive) {
    target.style.backgroundColor = "#ED462F";
    target.style.border = "1px solid #ED462F";
    target.style.color = "#FFFFFF";
  } else {
    target.style.backgroundColor = "#FFFFFF";
    target.style.border = "1px solid rgba(0, 0, 0, 0.13)";
    target.style.color = "#626262";
  }
}

const getInsuranceCompanyNames = async (companyNamesArray) => {
  return new Promise(resolve => {
    obj.then(data => {
      for (let i of data.insurances) {
        let isPresent = false;
        for (let j = 0; j < companyNamesArray.length; j++) {
          if (companyNamesArray[j].insuranceCompany == i.insuranceCompany) {
            isPresent = true;
            break;
          }
        }
        if (!isPresent) {
          companyNamesArray.push({insuranceCompany: i.insuranceCompany, logoURL: i.logoURL});
        }
      }
        resolve(companyNamesArray);
    });
  });
}

async function showInsuranceCompaniesList() {
  let activeMarkArray = [];
  Array.from(document.querySelectorAll(".insuranceCompanyName")).forEach(element => {
    activeMarkArray.push(element.isActive);
  });
  hideInsuranceCompaniesList();
  let text = document.querySelector("#insuranceCompanyWrapper input").value;
  let companyNamesArray = [];
  let array = await getInsuranceCompanyNames(companyNamesArray);
  insuranceCompanyWrapper.style.zIndex = 100;
  insuranceCompanyWrapper.style.height = (parseInt(window.getComputedStyle(insuranceCompanyWrapper).height) + (array.length * 54)) + "px";
  insuranceCompanyWrapper.style.border = "1px solid #66D1C6";
  insuranceCompanyWrapper.style.borderRadius = "15px";
  for (let i = 0; i < array.length; i++) {
    let div = document.createElement("div");
    let p = document.createElement("p");
    let img = document.createElement("img");
    div.append(p, img);
    div.className = "insuranceCompanyName";
    insuranceCompanyWrapper.append(div);
    document.querySelectorAll(".insuranceCompanyName > p")[i].textContent = array[i].insuranceCompany;
    document.querySelectorAll(".insuranceCompanyName > p")[i].id = "var" + i;
    document.querySelectorAll(".insuranceCompanyName > img")[i].src = array[i].logoURL;
    document.querySelectorAll(".insuranceCompanyName > img")[i].id = "img" + i;
  }
  for (let i = 0; i < array.length; i++) {
    document.querySelectorAll(".insuranceCompanyName")[i].isActive = activeMarkArray[i];
    if (document.querySelectorAll(".insuranceCompanyName")[i].isActive) {
      highlightElement(document.querySelectorAll(".insuranceCompanyName")[i]);
    } else {
      neutralizeElement(document.querySelectorAll(".insuranceCompanyName")[i]);
    }
  }
  document.querySelector("#insuranceCompanyWrapper input").focus();
  return new Promise((resolve) => {
    resolve(1)
  });
}

hideInsuranceCompaniesList = function() {
  let wrapper = document.querySelector("#insuranceCompanyWrapper");
  while (document.querySelector("#insuranceCompanyWrapper > div")) {
    wrapper.removeChild(document.querySelector("#insuranceCompanyWrapper > div"))
  };
  insuranceCompanyWrapper.style.height = "35px";
}

function setInsuranceCompany(node) {
  let companyName = insuranceCompanyWrapper.querySelector("input");
  companyName.value = node.insuranceCompany;
  companyName.style.textIndent = "48px";
  if (!document.querySelector("#insuranceCompanyWrapper > img")) {
    let image = document.createElement("img");
    companyName.before(image);
    image.src = node.logoURL;
    image.id = "activeInsuranceCompany";
  } else {
    document.querySelector("#insuranceCompanyWrapper > img").src = node.logoURL;
  }
}

function resetInsuranceCompanyInputProperties() {
  if (document.querySelector("#insuranceCompanyWrapper > img")) {
    insuranceCompanyWrapper.removeChild(document.querySelector("#insuranceCompanyWrapper > img"));
  }
  let companyName = insuranceCompanyWrapper.querySelector("input");
  companyName.style.textIndent = "18px";
}

function getInsuranceCompanyByInsuranceID(array, key) {
  for (let i = 0; i < array.length; i++) {
    if (!(array[i].insuranceID.startsWith(insuranceID.value, 0) || insuranceID.value.length == 0)) {
      array.splice(i, 1);
      i--;
    }
  }
  if (array.length == 1) {
    setInsuranceCompany(array[0]);
  } else {
    resetInsuranceCompanyInputProperties();
  }
}

async function getInsurances(companyNamesArray) {
  return new Promise(resolve => {
    obj.then(data => {
      for (let i of data.insurances) {
        companyNamesArray.push({insuranceID: i.insuranceID, insuranceCompany: i.insuranceCompany, logoURL: i.logoURL});
      }
      resolve(companyNamesArray);
    });
  });
}

function predictInsuranceIDInput(event) {
  if (insuranceID.value[0] == '1') {
    changeInsuranceType(insuranceType[0], false);
    changeInsuranceType(insuranceType[1], true);
  } else if (insuranceID.value[0] == '9') {
    changeInsuranceType(insuranceType[0], true);
    changeInsuranceType(insuranceType[1], false);
  }
}

function autofillParameters(event) {
  let companyNamesArray = [];
  getInsurances(companyNamesArray)
  .then((array) => {
    getInsuranceCompanyByInsuranceID(array, event.key);
  });
}

function checkCompanyName(event) {
  if (event.key != "Enter") {
    if (event.target.id == "insuranceCompany") {
      let companyNamesArray = [];
      let arr = getInsuranceCompanyNames(companyNamesArray);
      arr.then((array) => {
        showInsuranceCompaniesList().then((res) => {
          let isValidName = false;
          for (let i = 0; i < array.length; i++) {
            if (event.target.value == array[i].insuranceCompany) {
              isValidName = true;
              setInsuranceCompany(array[i]);
              break;
            }
          }
          if (!isValidName) {
            resetInsuranceCompanyInputProperties();
          }
        });
      });
    }
  }
}

function chooseInsuranceCompany(target) {
  let currDiv;
  if (target.tagName != "DIV")
    currDiv = target.parentNode;
  else
    currDiv = target;
  let company = currDiv.querySelector("p").textContent;
  let logo = currDiv.querySelector("img").src;
  setInsuranceCompany({insuranceCompany: company, logoURL: logo});
  hideInsuranceCompaniesList();
}

function highlightElement(target) {
  if ((target.tagName == "IMG" && target.id != "activeInsuranceCompany") || target.tagName == "P") {
    target.parentNode.style.backgroundColor = "#66D1C6";
  } else if (target.className == "insuranceCompanyName" || target.className == "insuranceServiceName") {
    target.isActive = true;
    target.style.backgroundColor = "#66D1C6";
  }
}

function neutralizeElement(target) {
  if (target.tagName == "IMG" || target.tagName == "P") {
    target.parentNode.isActive = false;
    target.parentNode.style.backgroundColor = "white";
  } else if (target.className == "insuranceCompanyName" || target.className == "insuranceServiceName") {
    target.isActive = false;
    target.style.backgroundColor = "white";
  }
}

function cycleThroughList(event, listSelector) {
  let isAnyActive = false;
  let list = document.querySelectorAll(listSelector);
  if (list.length > 0) {
    Array.from(list).forEach((element) => {
      if (element.isActive) {
        isAnyActive = true;
      }
    });
    if (!isAnyActive) {
      if (event.key == "ArrowDown") {
        highlightElement(list[0]);
        for (let i = 1; i < list.length; i++) {
          neutralizeElement(list[i]);
        }
      } else if (event.key == "ArrowUp") {
        highlightElement(list[list.length - 1]);
        for (let i = 0; i < list.length - 1; i++) {
          neutralizeElement(list[i]);
        }
      }
    } else {
      for (let i = 0; i < list.length; i++) {
        if (list[i].isActive && event.key == "ArrowDown") {
          if ((i + 1) == list.length) {
            highlightElement(list[0]);
          } else {
            highlightElement(list[i + 1]);
          }
          neutralizeElement(list[i]);
          Array.from(list).forEach((element) => {});
          break;
        } else if (list[i].isActive && event.key == "ArrowUp") {
          if ((i - 1) < 0) {
            highlightElement(list[list.length - 1]);
          } else {
            highlightElement(list[i - 1]);
          }
          neutralizeElement(list[i]);
          break;
        } else if (list[i].isActive && event.key == "Enter") {
          if (listSelector == ".insuranceCompanyName") {
            chooseInsuranceCompany(list[i]);
            hideInsuranceCompaniesList();
          } else {
            chooseInsuranceService(list[i]);
            hideServicesList();
          }
          break;
        }
      }
    }
  } else if (event.key == "Enter" && (document.querySelector("input#services").value.length > 0)) {
    setInsuranceService(document.querySelector("input#services").value);
  }
}

async function getInsuranceServicesNames(servicesNamesArray) {
  return new Promise(resolve => {
    obj.then(data => {
      for (let i of data.services[0].servicesIncluded) {
        servicesNamesArray.push({servicesIncluded: true, service: i});
      }
      for (let i of data.services[1].servicesExcluded) {
        servicesNamesArray.push({servicesIncluded: false, service: i});
      }
      resolve(servicesNamesArray);
    });
  });
}

function hideServicesList() {
  let wrapper = document.querySelector("#servicesWrapper");
  while (document.querySelector("#servicesWrapper > div")) {
    wrapper.removeChild(document.querySelector("#servicesWrapper > div"))
  };
  servicesWrapper.style.height = "35px";
}

function applyServiceSearchFilters(array) {
  let val = servicesWrapper.querySelector("input").value;
  for (let i = 0; i < array.length; i++) {
    if (!(array[i].service.toLowerCase().includes(val.toLowerCase())) || val.length == 0) {
      array.splice(i, 1);
      i--;
    }
  }
  if (array.length > 5) {
    array.splice(5);
  }
};

async function showServicesList() {
  let activeMarkArray = [];
  Array.from(document.querySelectorAll(".insuranceServiceName")).forEach(element => {
    activeMarkArray.push(element.isActive);
  });
  hideServicesList();
  let text = document.querySelector("#servicesWrapper input").value;
  let servicesNamesArray = [];
  let array = await getInsuranceServicesNames(servicesNamesArray);
  applyServiceSearchFilters(array);
  servicesWrapper.style.zIndex = 100;
  servicesWrapper.style.height = (parseInt(window.getComputedStyle(servicesWrapper).height) + (array.length * 54)) + "px";
  servicesWrapper.style.border = "1px solid #66D1C6";
  servicesWrapper.style.borderRadius = "15px";
  for (let i = 0; i < array.length; i++) {
    let div = document.createElement("div");
    let p = document.createElement("p");
    div.append(p);
    div.className = "insuranceServiceName";
    servicesWrapper.append(div);
    document.querySelectorAll(".insuranceServiceName > p")[i].textContent = array[i].service;
    document.querySelectorAll(".insuranceServiceName > p")[i].id = "service" + i;
  }
  for (let i = 0; i < array.length; i++) {
    document.querySelectorAll(".insuranceServiceName")[i].isActive = activeMarkArray[i];
    if (document.querySelectorAll(".insuranceServiceName")[i].isActive) {
      highlightElement(document.querySelectorAll(".insuranceServiceName")[i]);
    } else {
      neutralizeElement(document.querySelectorAll(".insuranceServiceName")[i]);
    }
  }
  document.querySelector("#servicesWrapper input").value = text;
  document.querySelector("#servicesWrapper input").focus();
  return new Promise((resolve) => {
    resolve(1)
  });
}

function checkServices(event) {
  if (event.key != "Enter") {
    if (event.target.tagName == "INPUT") {
      let servicesNamesArray = [];
      let arr = getInsuranceServicesNames(servicesNamesArray);
      arr.then((array) => {
        showServicesList().then((res) => {
          return;
        });
      });
    }
  }
}

function setInsuranceService(service) {
  let tableServices = document.querySelectorAll("td.service");
  let tableCheckImage = document.querySelectorAll(".check > img");
  if (tableServices[9].innerText) {} else {
    for (let i = 0; i < tableServices.length; i++) {
      if (tableServices[i].innerText == service) {
        break;
      }
      if (!tableServices[i].innerText) {
        tableServices[i].innerText = service;
        let cross = document.createElement("img");
        cross.src = "./images/cancel_button.png";
        cross.className = "cross";
        tableServices[i].append(cross);

        function crossHandler() {
          while (tableServices[i].firstChild) {
            tableServices[i].removeChild(tableServices[i].firstChild);
          };
          for (let j = i; j < 9; j++) {
            if (tableServices[j + 1].innerText.length > 0) {
              tableCheckImage[j].src = tableCheckImage[j + 1].src;
            } else {
              tableCheckImage[j].style.visibility = "hidden";
            }
            tableServices[j].innerText = tableServices[j + 1].innerText;
            if (tableServices[j + 1].querySelector(".cross")) {
              cross = document.createElement("img");
              cross.src = "./images/cancel_button.png";
              cross.className = "cross";
              tableServices[j].append(cross);
              cross.addEventListener("click", crossHandler);
            }
          }
          tableCheckImage[9].style.visibility = "hidden";
          while (tableServices[9].firstChild) {
            tableServices[9].removeChild(tableServices[9].firstChild);
          };
        }
        cross.addEventListener("click", crossHandler);
        break;
      }
    }
  }
}

function chooseInsuranceService(target) {
  let currDiv;
  if (target.tagName != "DIV")
    currDiv = target.parentNode;
  else
    currDiv = target;
  let service = currDiv.querySelector("p").textContent;
  setInsuranceService(service);
  hideServicesList();
}

function setButtonToNewForm() {
  submitButton.purpose = "newForm";
  submitButton.style.backgroundColor = "#66D1C6";
  submitButton.style.borderColor = "#66D1C6";
  submitButton.innerText = "Новый запрос";
  submitButton.style.color = "#FFFFFF";
}

async function outputAdditionalInfo(obj) {
  let medCardWindow = document.querySelector('#medCardWindow');
  let expirationDate = document.createElement('div');
  expirationDate.id = "expirationDate";
  expirationDate.textContent = "Дата окончания " + obj.expirationDate + " г.";
  medCardWindow.append(expirationDate);
  let phoneNumber = document.createElement('div');
  phoneNumber.id = "phoneNumber";
  phoneNumber.textContent = "Телефон " + obj.phone;
  medCardWindow.append(phoneNumber);
  let tableService = document.querySelectorAll(".service");
  let tableCheckImage = document.querySelectorAll(".check > img");
  let servicesNamesArray = [];
  let array = await getInsuranceServicesNames(servicesNamesArray);
  for (let i = 0; i < tableService.length; i++) {
    for (let j = 0; j < array.length; j++) {
      if (tableService[i].innerText == array[j].service) {
        if (obj.insuranceType == "ОМС" && !array[j].servicesIncluded) {
          tableCheckImage[i].src = "./images/exclude_mark.png";
        } else {
          tableCheckImage[i].src = "./images/include_mark.png";
        }
        tableCheckImage[i].style.visibility = "visible";
        break;
      }
      if (tableService[i].innerText.length != 0) {
        tableCheckImage[i].src = "./images/unknown_mark.png";
        tableCheckImage[i].style.visibility = "visible";
      }
    }
  }
  setButtonToNewForm();
}

function buildFailWindow(errorField) {
  wrapper.querySelector("#medCardWindow").style.pointerEvents = "none";
  let failWindow = document.createElement("div");
  failWindow.id = "failWindow";
  let p1 = document.createElement("p");
  p1.id = "failWindowHeader";
  if (errorField == "empty fields") {
    p1.append("Заполнены");
    p1.append(document.createElement("br"));
    p1.append("не все поля");
  } else if (errorField == "ID") {
    p1.append("Полис с указанным");
    p1.append(document.createElement("br"));
    p1.append("номером не обнаружен");
  } else if (errorField == "type") {
    p1.append("Полис с указанным");
    p1.append(document.createElement("br"));
    p1.append("типом не обнаружен");
  } else if (errorField == "company") {
    p1.append("Полис от указанной");
    p1.append(document.createElement("br"));
    p1.append("компании не обнаружен");
  }
  let p2 = document.createElement("p");
  p2.id = "failWindowText";
  p2.textContent = "Попробуйте изменить данные";
  let button = document.createElement("button");
  button.id = "failWindowButton";
  button.innerText = "ОК";
  const hideFailWindow = () => {
    let el = document.getElementById('failWindow');
    button.removeEventListener("click", hideFailWindow);
    el.remove();
    wrapper.querySelector("#medCardWindow").style.pointerEvents = "auto";
  }
  button.addEventListener("click", hideFailWindow);
  button.addEventListener("click", hideFailWindow);
  failWindow.append(p1, p2, button);
  document.body.append(failWindow);
  failWindow.style.pointerEvents = "auto";
}

async function checkData() {
  let insuranceID = document.querySelector("#insuranceID").value;
  obj.then(data => {
    let isPresent = false;
    let insurance = data.insurances.filter(elem => elem.insuranceID == insuranceID)[0];
    if (!insurance) {
      buildFailWindow("ID");
      return;
    }
    if (insurance.insuranceType == "ДМС" && document.querySelector("#DMS").style.backgroundColor == "rgb(255, 255, 255)" || insurance.insuranceType == "ОМС" && document.querySelector("#OMS").style.backgroundColor == "rgb(255, 255, 255)") {
      buildFailWindow("type");
      return;
    }
    if (insurance.insuranceCompany != document.querySelector("#insuranceCompany").value) {
      buildFailWindow("company");
      return;
    }
    outputAdditionalInfo(insurance);
  });
}

function checkInputFields() {
  if (submitButton.purpose == "newForm") {} else if ((document.querySelector("input#insuranceID").value.length > 0) && (document.querySelector("input#insuranceCompany").value.length > 0) && (document.querySelector("input#services").value.length > 0)) {
    submitButton.purpose = "checkData";
    submitButton.style.backgroundColor = "#ED462F";
    submitButton.style.borderColor = "#ED462F";
    submitButton.style.color = "#FFFFFF";
    submitButton.innerText = "Проверить";
  } else {
    submitButton.purpose = "await";
    submitButton.style.backgroundColor = "#FFFFFF";
    submitButton.style.borderColor = "#ED462F";
    submitButton.style.color = "#ED462F";
    submitButton.innerText = "Проверить";
  }
}

function startNewForm() {
  location.reload();
}

insuranceID.addEventListener("keydown", (event) => {
  if (!isAllowedinsuranceIDInputKey(event)) {
    event.preventDefault();
  }
})

insuranceID.addEventListener("keyup", (event) => {
  if (insuranceID.value.length) {
    predictInsuranceIDInput(event);
  }
  autofillParameters(event);
})

insuranceType.forEach((element) => {
  element.addEventListener("click", (event) => {
    if (event.target.id == "OMS") {
      changeInsuranceType(document.querySelector("#OMS"), true);
      changeInsuranceType(document.querySelector("#DMS"), false);
    } else {
      changeInsuranceType(document.querySelector("#OMS"), false);
      changeInsuranceType(document.querySelector("#DMS"), true);
    }
  })
});

window.addEventListener("click", event => {
  let isOutOfScope = true;
  let children = document.querySelectorAll("#insuranceCompanyWrapper, #insuranceCompanyWrapper *");
  for (let child of Array.from(children)) {
    if (event.target == child) {
      isOutOfScope = false;
      break;
    }
  };
  if (isOutOfScope) {
    hideInsuranceCompaniesList();
    insuranceCompanyWrapper.style.border = "1px solid #868686";
    insuranceCompanyWrapper.style.zIndex = 50;
  }

  isOutOfScope = true;
  children = document.querySelectorAll("#servicesWrapper, #servicesWrapper *");
  for (let child of Array.from(children)) {

    if (event.target == child) {
      isOutOfScope = false;
      break;
    }
  };
  if (isOutOfScope) {
    hideServicesList();
    servicesWrapper.style.border = "1px solid #868686";
    servicesWrapper.style.zIndex = 50;
  }
  if (event.target.id != "submitButton")
    checkInputFields();
  }
);

insuranceCompanyWrapper.addEventListener("click", (event) => {
  showInsuranceCompaniesList().then((res) => {
    let children = document.querySelectorAll(".insuranceCompanyName *");
    for (let child of Array.from(children)) {
      if (event.target.id == child.id) {
        chooseInsuranceCompany(event.target);
      }
    };
  });
});

insuranceCompanyWrapper.addEventListener("mouseover", (event) => {
  highlightElement(event.target)
});

insuranceCompanyWrapper.addEventListener("mouseout", (event) => {
  neutralizeElement(event.target);
});

insuranceCompanyWrapper.addEventListener("keydown", (event) => {
  if (event.key == "ArrowUp" || event.key == "ArrowDown" || event.key == "Enter") {
    cycleThroughList(event, ".insuranceCompanyName");
  }
});

insuranceCompanyWrapper.addEventListener("keyup", event => {
  if (!(event.key == "ArrowUp" || event.key == "ArrowDown" || event.key == "Enter" || event.key == "ArrowLeft" || event.key == "ArrowRight")) {
    checkCompanyName(event);
  }
});

servicesWrapper.addEventListener("click", (event) => {
  showServicesList().then((res) => {
    let children = document.querySelectorAll(".insuranceServiceName *");
    for (let child of Array.from(children)) {
      if (event.target.id == child.id) {
        chooseInsuranceService(event.target);
      }
    };
  });
});

servicesWrapper.addEventListener("mouseover", (event) => {
  highlightElement(event.target)
});

servicesWrapper.addEventListener("mouseout", (event) => {
  neutralizeElement(event.target);
});

servicesWrapper.addEventListener("keydown", (event) => {
  if (event.key == "ArrowUp" || event.key == "ArrowDown" || event.key == "Enter") {
    cycleThroughList(event, ".insuranceServiceName");
  }
});

servicesWrapper.addEventListener("keyup", event => {
  if (!(event.key == "ArrowUp" || event.key == "ArrowDown" || event.key == "Enter" || event.key == "ArrowLeft" || event.key == "ArrowRight")) {
    checkServices(event);
  }
});

submitButton.addEventListener("click", () => {
  checkInputFields();
  if (submitButton.purpose == "newForm") {
    startNewForm();
  } else if (submitButton.purpose == "checkData") {
    checkData();
  } else if (submitButton.purpose == "await") {
    buildFailWindow("empty fields");
  }
});
