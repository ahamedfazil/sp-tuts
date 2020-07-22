async function getListItemsByOdata() {
  try {
    // Get Items using OData
    const items = await $pnp.sp.web.lists
      .getByTitle('My Test')
      .items.select('Title', 'ID')
      .top(7)
      .orderBy('Modified', false)
      .get();
    console.log('items', items);

    const items2 = await $pnp.sp.web.lists
      .getByTitle('My Test')
      .items.filter('ID eq 93')
      .get();
    console.log('items2', items2);

    items2.map(async (myItem) => {
      const updatedItem = await $pnp.sp.web.lists
        .getByTitle('My Test')
        .items.getById(myItem.Id)
        .update({
          Title: 'Hello World',
        });
    });

    const item3 = await $pnp.sp.web.lists
      .getByTitle('My Test')
      .items.filter(`substringof('${encodeURIComponent('')}',Title)`)
      .get();
    console.log('item3 ', item3);

    const item4 = await $pnp.sp.web.lists
      .getByTitle('My Test')
      .items.filter(`substringof('Winter',MyChoice)`)
      .get();
    console.log('item4 ', item4);

    const item5 = await $pnp.sp.web.lists
      .getByTitle('My Test')
      .items.filter(`startswith(MyChoice,'Winter')`)
      .get();
    console.log('item5', item5);

    const dummyDate = new Date();
    const item6 = await $pnp.sp.web.lists
      .getByTitle('My Test')
      .items.filter(`Modified gt datetime'${dummyDate.toISOString()}'`)
      .get();
    console.log('item6', item6);

    alert('Successfully fetched items by OData, please check console log');
  } catch (error) {
    alert('Error while getting items by OData');
    console.log('Faz: Log: getListItemsByOdata -> error', error);
  }
}

async function getListItemsByCAML() {
  try {
    // Get Items using CAML

    const caml = {
      ViewXml: `<View>
          <ViewFields>
            <FieldRef Name='Title' />
            <FieldRef Name='Age' />
          </ViewFields>
          <RowLimit>5</RowLimit>
        </View>`,
    };
    const items = await $pnp.sp.web.lists
      .getByTitle('My Test')
      .getItemsByCAMLQuery(caml);
    console.log('items', items);

    const caml2 = {
      ViewXml: `<View>
                  <Query>
                    <Where>
                        <Neq>
                          <FieldRef Name='Age' />
                          <Value Type='Number'>18</Value>
                        </Neq>
                    </Where>
                  </Query>
                  <ViewFields>
                    <FieldRef Name='Title' />
                  </ViewFields>
                  <RowLimit>50</RowLimit>
                </View>`,
    };

    const item2 = await $pnp.sp.web.lists
      .getByTitle('My Test')
      .getItemsByCAMLQuery(caml2);
    console.log('item2 ', item2);

    const caml3 = {
      ViewXml: `<View>
                  <Query>
                    <Where>
                      <And>
                          <Neq>
                            <FieldRef Name='Age' />
                            <Value Type='Number'>18</Value>
                          </Neq>
                          <And>
                            <Neq>
                              <FieldRef Name='Age' />
                              <Value Type='Number'>18</Value>
                            </Neq>
                            <Eq>
                              <FieldRef Name='Users' LookupId='TRUE'/>
                              <Value Type='Integer'>10</Value>
                            </Eq>
                          </And>
                      </And>
                    </Where>
                    <OrderBy>
                      <FieldRef Name='Author' Ascending='True' />
                    </OrderBy>
                  </Query>
                  <ViewFields>
                    <FieldRef Name='Title' />
                  </ViewFields>
                  <RowLimit>50</RowLimit>
                </View>`,
    };

    const item3 = await $pnp.sp.web.lists
      .getByTitle('My Test')
      .getItemsByCAMLQuery(caml3);
    console.log('item3 ', item3);

    alert('Successfully fetched items by CAMLQuery, please check console log');
  } catch (error) {
    alert('Error while getting items by CAMLQuery');
    console.log('Faz: Log: getListItemsByCAML -> error', error);
  }
}
