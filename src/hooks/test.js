const fetch = require('node-fetch');

const getRestaurantMenu = async () => {
    try {
      const swiggyUrl = `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=28.7041&lng=77.1025&restaurantId=66861&catalog_qa=undefined&submitAction=ENTER`;
      const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(swiggyUrl)}`;

      const data = await fetch(proxyUrl);
      const output = await data.json();
      const text = output.contents;
      const json = JSON.parse(text);
      
      const restMenus = json?.data?.cards?.find((res) =>
        res?.groupedCard?.cardGroupMap?.REGULAR?.cards?.filter((menu) =>
          menu?.card?.card["@type"]?.includes("ItemCategory") || 
          menu?.card?.card?.itemCards
        )
      );

      console.log(restMenus?.groupedCard?.cardGroupMap?.REGULAR?.cards?.map(c => [c.card.card['@type'], Object.keys(c.card.card)]));
    } catch (err) {
      console.log(err);
    }
}
getRestaurantMenu();
