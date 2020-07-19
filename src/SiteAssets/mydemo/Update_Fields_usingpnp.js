async function textFieldOperation() {
  try {
    // Update/Add Single line of text
    $pnp.sp.web.lists.getByTitle('My Test').items.add({
      Title: 'Hello from single line of text',
    });

    // Update/Add Multi line of text
    $pnp.sp.web.lists.getByTitle('My Test').items.add({
      Description:
        'In March 2005, Agence France-Presse (AFP) sued Google for $17.5 million, alleging that Google News infringed on its copyright because Google includes AFPs photos, stories and news headlines on Google News without permission from Agence France Presse.[19][20] It was also alleged that Google ignored a cease and desist order, though Google counters that it has opt-out procedures which AFP could have followed but did not. Google now hosts Agence France-Presse news, as well as the Associated Press, Press Association and the Canadian Press. This arrangement started in August 2007.[21] In 2007, Google announced it was paying for Associated Press content displayed in Google News, however the articles are not permanently archived.[22][23] That arrangement ceased on December 23, 2009 when Google News ceased carrying Associated Press content.',
    });
    alert('Successfully added text fields');
  } catch (error) {
    alert('Error while adding text fields');
    console.log('Faz: Log: textFieldOperation -> error', error);
  }
}

async function choiceFieldOperation() {
  try {
    // Update/Add Dropdown field

    var weatherElement = document.getElementById('weather');
    console.log(
      'Faz: Log: choiceFieldOperation -> weatherElement',
      weatherElement
    );
    var selectedValue =
      weatherElement.options[weatherElement.selectedIndex].value;

    $pnp.sp.web.lists.getByTitle('My Test').items.add({
      MyChoice: selectedValue,
    });

    // Update/Add Radio field
    $pnp.sp.web.lists.getByTitle('My Test').items.add({
      Suggestion: 'Maybe',
    });

    // Update/Add Checkbox Multi choice field
    const myPreferences = ['Cricket', 'Tennis'];
    $pnp.sp.web.lists.getByTitle('My Test').items.add({
      Preference: {
        results: myPreferences,
      },
    });

    // Update/Add Checkbox single choice field (Yes/No)
    $pnp.sp.web.lists.getByTitle('My Test').items.add({
      MyCheckbox: false,
    });

    alert('Successfully added choice fields');
  } catch (error) {
    alert('Error while adding choice fields');
    console.log('Faz: Log: choiceFieldOperation -> error', error);
  }
}

async function dateField() {
  try {
    // Update/Add DateTime field
    $pnp.sp.web.lists.getByTitle('My Test').items.add({
      DueDate: addDays(new Date(), 7),
    });
    alert('Successfully added date field');
  } catch (error) {
    alert('Error while adding date field');
    console.log('Faz: Log: dateField -> error', error);
  }
}

async function personField() {
  try {
    // Update/Add People Picker single user
    const myUserId = await getUserIDFromPP('fazil@fazilsp.onmicrosoft.com');
    $pnp.sp.web.lists.getByTitle('My Test').items.add({
      MyPersonId: myUserId,
    });

    // Update/Add People Picker multi user
    const otherUserId = await getUserIDFromPP('rabi.k@fazilsp.onmicrosoft.com');
    $pnp.sp.web.lists.getByTitle('My Test').items.add({
      UsersId: {
        results: [myUserId, otherUserId],
      },
    });

    alert('Successfully added person fields');
  } catch (error) {
    alert('Error while adding person fields');
    console.log('Faz: Log: personField -> error', error);
  }
}

async function hyperlinkField() {
  try {
    // Update/Add Hyperlink field
    const URL = 'https://www.google.com/';
    const desc = 'This is the link to google...';
    $pnp.sp.web.lists.getByTitle('My Test').items.add({
      MyLink: {
        __metadata: { type: 'SP.FieldUrlValue' },
        Description: desc,
        Url: URL,
      },
    });

    alert('Successfully added hyperlink field');
  } catch (error) {
    alert('Error while adding hyperlink field');
    console.log('Faz: Log: HyperlinkField -> error', error);
  }
}

async function lookupField() {
  try {
    // Update/Add Single lookup field
    $pnp.sp.web.lists.getByTitle('My Test').items.add({
      shoplookupId: 2,
    });

    // Update/Add Multi lookup field
    $pnp.sp.web.lists.getByTitle('My Test').items.add({
      manyshopsId: {
        results: [2, 3],
      },
    });
    alert('Successfully added lookup field');
  } catch (error) {
    alert('Error while adding lookup field');
    console.log('Faz: Log: lookupField -> error', error);
  }
}

//#region supporting functions
function addDays(date, days) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

async function getUserIDFromPP(pplValue) {
  let userID = null;
  if (pplValue !== '') {
    await $pnp.sp.web.ensureUser(pplValue).then((results) => {
      console.log('Faz: Log: getUserIDFromPP -> results', results);
      userID = results.data.Id;
    });
  }
  return userID;
}
//#endregion
