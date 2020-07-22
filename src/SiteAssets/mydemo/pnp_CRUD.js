async function createItemByPnP() {
  try {
    // Adding SP list item
    $pnp.sp.web.lists.getByTitle('My Test').items.add({
      Movie_x0020_Tile: 'World',
      Title: 'Hello',
      Age: 4,
    });

    alert('Successfully added');
  } catch (error) {
    alert('Error while CreateItemByPnP');
    console.log('Faz: Log: CreateItemByPnP -> error', error);
  }
}

async function readSPListItem() {
  try {
    const dd = $('.');
    // Getting item by ID
    const itemByID = await $pnp.sp.web.lists
      .getByTitle('My Test')
      .items.getById(59)
      .get();
    console.log('Faz: Log: ReadSPListItem -> itemByID', itemByID);

    // Getting all items
    const allItems = await $pnp.sp.web.lists
      .getByTitle('My Test')
      .items.getAll();
    console.log('Faz: Log: ReadSPListItem -> allItems', allItems);

    // Getting item by filter (ODATA)
    const filteredItems = await $pnp.sp.web.lists
      .getByTitle('My Test')
      .items.select('Title', 'Modified')
      .top(100)
      .orderBy('Modified', false)
      .filter("Title eq 'Hello'")
      .getAll();
    console.log('Faz: Log: ReadSPListItem -> filteredItems', filteredItems);

    // Getting item by filter (ODATA)
    const filteredItemsTest = await $pnp.sp.web.lists
      .getByTitle('My Test')
      .items.select('Title', 'Modified')
      .top(100)
      .orderBy('Modified', true)
      .filter("Title eq 'Hello'")
      .getAll();
    console.log(
      'Faz: Log: ReadSPListItem -> filteredItemsTest',
      filteredItemsTest
    );

    alert('Successfully fetched items');
  } catch (error) {
    alert('Error while executing ReadSPListItem');
    console.log(error);
  }
}

async function quickDemo() {
  try {
    const myHelloITems = await $pnp.sp.web.lists
      .getByTitle('My Test')
      .items.filter("Title eq 'Hello'")
      .get();

    console.log('Faz: Log: QuickDemo -> myHelloITems', myHelloITems);

    if (myHelloITems && myHelloITems.length > 0) {
      myHelloITems.map(async (myItem) => {
        if (myItem.Id === 60) {
          const updatedItem = await $pnp.sp.web.lists
            .getByTitle('My Test')
            .items.getById(myItem.Id)
            .update({
              Title: 'Hello World',
              Age: 6,
            });
        } else {
          const updatedItem = await $pnp.sp.web.lists
            .getByTitle('My Test')
            .items.getById(myItem.Id)
            .update({
              Title: 'Hello World',
            });
        }
      });
    }
    alert('Successfully updated items have Hello title');
  } catch (error) {
    alert('Error while updating items');
    console.log('Faz: Log: QuickDemo -> error', error);
  }
}

async function deleteSPListItemById() {
  try {
    let list = $pnp.sp.web.lists.getByTitle('My Test');
    await list.items.getById(31).delete();
  } catch (error) {
    alert('Error while executing DeleteSPListItem');
    console.log('Faz: Log: DeleteSPListItemById -> error', error);
  }

  const myHelloWorldItems = await $pnp.sp.web.lists
    .getByTitle('My Test')
    .items.filter("Title eq 'Hello World'")
    .get();

  console.log(
    'Faz: Log: deleteSPListItemById -> myHelloWorldItems',
    myHelloWorldItems
  );

  if (myHelloWorldItems && myHelloWorldItems.length > 0) {
    myHelloWorldItems.map(async (myItem) => {
      const updatedItem = await $pnp.sp.web.lists
        .getByTitle('My Test')
        .items.getById(parseInt(myItem.Id))
        .delete();
    });
  }
  alert('Successfully removed items have Hello World title');
}

async function getDynamicListItem() {
  var cContext = SP.ClientContext.get_current();
  var mySelectedItems = SP.ListOperation.Selection.getSelectedItems(cContext);

  if (mySelectedItems && mySelectedItems.length > 0) {
    mySelectedItems.map(async (item) => {
      const updatedItem = await $pnp.sp.web.lists
        .getByTitle('My Test')
        .items.getById(item.Id)
        .update({
          Title: 'Hello World - Updated by context',
        });
      alert('Updated the item id ' + item.Id);
      location.reload();
    });
  }
}
