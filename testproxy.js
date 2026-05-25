fetch('https://proxy.cors.sh/https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=26.87560&lng=80.91150&restaurantId=66861&catalog_qa=undefined&submitAction=ENTER', {
  headers: {
    "x-cors-api-key": "temp_09a95c2e6da960653de51c2deccb8507",
    "Origin": "http://localhost:5173"
  }
}).then(res => res.text()).then(text => console.log('RESPONSE STATUS:', text ? 'GOT SOME TEXT' : 'EMPTY TEXT'));
