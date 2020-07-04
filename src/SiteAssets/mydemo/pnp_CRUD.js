async function createItemByPnP() {
  try {
    // Adding SP list item
    $pnp.sp.web.lists.getByTitle('My Test').items.add({
      Title: 'Hello',
    });

    alert('Successfully added');
  } catch (error) {
    alert('Error while CreateItemByPnP');
    console.log('Faz: Log: CreateItemByPnP -> error', error);
  }
}

async function readSPListItem() {
  try {
    // Getting item by ID
    const itemByID = await $pnp.sp.web.lists
      .getByTitle('My Test')
      .items.getById(22)
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
      .items.select('Title')
      .top(100)
      .orderBy('Modified', true)
      .filter("Title eq 'Hello'")
      .getAll();
    console.log('Faz: Log: ReadSPListItem -> filteredItems', filteredItems);
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
        const updatedItem = await $pnp.sp.web.lists
          .getByTitle('My Test')
          .items.getById(myItem.Id)
          .update({
            Title: 'Hello World',
          });
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
  } catch (error) {
    alert('Error while executing DeleteSPListItem');
    console.log('Faz: Log: DeleteSPListItemById -> error', error);
  }
}
