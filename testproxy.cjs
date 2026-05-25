const fetch = require('node-fetch'); // actually I can just use global fetch since Node 20
fetch('https://proxy.cors.sh/https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=26.87560&lng=80.91150&restaurantId=66861&catalog_qa=undefined&submitAction=ENTER', {
  headers: {
    "x-cors-api-key": "temp_09a95c2e6da960653de51c2deccb8507",
    "User-Agent": "Mozilla/5.0"
  }
}).then(res => res.text()).then(text => console.log('RESPONSE:', text.substring(0, 300)));
