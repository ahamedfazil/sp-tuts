function Basic2() {
  //                         *SharePoint API*                         //

  $(document).ready(function () {
    $pnp.sp.web.lists
      .getByTitle('My Test')
      .items.getById(1)
      .fieldValuesAsHTML.get()
      .then(function (data) {
        //Populate all field values for the List Item
        for (var k in data) {
          console.log(k + ' - ' + data[k]);
        }
      });

    $pnp.sp.web.webs
      .get()
      .then(function (result) {
        if (result.length > 0)
          $('#countid').html('Total subsites: ' + result.length);

        for (var i = 0; i < result.length; i++) {
          $('#webTable tbody').append(
            '<tr>' +
              '<td>' +
              result[i].Title +
              '</td>' +
              '<td>' +
              result[i].Id +
              '</td>' +
              '<td>' +
              result[i].Created +
              '</td>' +
              '<td>' +
              result[i].WebTemplate +
              '</td>' +
              '</tr>'
          );
        }
      })
      .catch(function (err) {
        alert(err);
      });
  });
}

Basic2();
