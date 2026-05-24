fetch('https://proxy.cors.sh/https://www.swiggy.com/mapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=26.87560&lng=80.91150&restaurantId=66861', {
  headers: { 'x-cors-api-key': 'temp_09a95c2e6da960653de51c2deccb8507', 'Origin': 'http://localhost:5173' }
}).then(res => res.json()).then(json => {
  const restInfo = json?.data?.cards?.find((res) =>
        res?.card?.card['@type']?.includes('food.v2.Restaurant')
      );
  console.log('Rest Info:', !!restInfo);
  if(restInfo) console.log('Name:', restInfo.card.card.info.name);
  
  const restOffer = json?.data?.cards?.find((res) =>
        res?.card?.card?.gridElements?.infoWithStyle['@type']?.includes(
          'food.v2.OfferInfoWithStyle'
        )
      );
  console.log('Offers:', !!restOffer);

  const restMenus = json?.data?.cards?.find((res) =>
        res?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter((menu) =>
          menu?.card?.card['@type']?.includes('food.v2.ItemCategory')
        )
      );
  console.log('Menus:', !!restMenus);
});
