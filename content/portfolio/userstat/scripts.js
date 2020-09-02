const get_data = () => {
  let date = new Date().toISOString().slice(0, 19).replace('T', ' ');

  const ua = navigator.userAgent;

  let device = /(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua) ? "Tablet" :
  /Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua) ? "Mobile" :
  "Desktop";

  let ip = new Promise((res, rej) => {
    fetch('http://api.ipify.org/?format=json').then(res => res.json()).then(response => {
      res(response.ip);
    }).catch((data, status) => {
      res("UNKNOWN");
    })
  });

  let city = new Promise((res, rej) => {
    fetch('https://extreme-ip-lookup.com/json/').then(res => res.json()).then(response => {
      res(response.city);
    }).catch((data, status) => {
      res("UNKNOWN");
    })
  });

  Promise.all([date, ip, city, device]).then((data) => {
    console.log(data[0]);
    console.log(data[1]);
    console.log(data[2]);
    console.log(data[3]);
    let formData = new FormData();
    formData.append('date', data[0]);
    formData.append('ip', data[1]);
    formData.append('city', data[2]);
    formData.append('device', data[3]);
    formData.append('method', "insert");
    const url = "db.php";
    fetch(url, {
        method: 'POST',
        body: formData
    });
  });
}

get_data();
