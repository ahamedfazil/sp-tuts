function AddingItemByJSOM() {
  var titleVal = $('#titleId').val();

  var clientContext = new SP.ClientContext.get_current();
  var oList = clientContext.get_web().get_lists().getByTitle('My Test');

  var itemCreateInfo = new SP.ListItemCreationInformation();
  var listItem = oList.addItem(itemCreateInfo);

  listItem.set_item('Title', titleVal);
  listItem.update();

  clientContext.load(listItem);

  clientContext.executeQueryAsync(
    () => alert('successfully added by JSOM'),
    () => alert('failed to add by JSOM')
  );
}

function AddingItemByREST() {
  var titleVal = $('#titleId').val();

  var apiPath =
    _spPageContextInfo.siteAbsoluteUrl +
    "/_api/lists/getbytitle('My Test')/items";

  //check - /_api/web/lists/GetByTitle('ListName')/ListItemEntityTypeFullName
  var itemType = 'SP.Data.My_x0020_TestListItem';

  $.ajax({
    url: apiPath,
    type: 'POST',
    headers: {
      Accept: 'application/json;odata=verbose',
      'Content-Type': 'application/json;odata=verbose',
      'X-RequestDigest': $('#__REQUESTDIGEST').val(),
      'X-HTTP-Method': 'POST',
    },
    data: JSON.stringify({
      __metadata: {
        type: itemType,
      },
      Title: titleVal,
    }),
    success: function (data) {
      alert('successfully added by REST');
    },
    error: function (data) {
      alert('failed to add by REST');
    },
  });
}

function AddingItemBySPService() {
  var titleVal = $('#titleId').val();

  $().SPServices({
    operation: 'UpdateListItems',
    async: false,
    webURL: 'https://fazilsp.sharepoint.com/teams/SP2013Dev/',
    batchCmd: 'New',
    listName: 'My Test',
    valuepairs: [['Title', titleVal]],
    completefunc: function (xData, Status) {
      alert('Saved Successfully by SPService');
    },
  });
}

function AddingItemByPnP() {
  var titleVal = $('#titleId').val();

  $pnp.sp.web.lists
    .getByTitle('My Test')
    .items.add({
      Title: titleVal,
    })
    .then(function (data) {
      alert('Successfully added by PnP');
    })
    .catch((error) => {
      alert('Error while adding.');
    });
}
