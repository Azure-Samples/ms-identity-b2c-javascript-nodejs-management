// Select DOM elements to work with
const welcomeDiv = document.getElementById("WelcomeMessage");
const signInButton = document.getElementById("SignIn");
const cardDiv = document.getElementById("card-div");

function showWelcomeMessage(username) {
    // Reconfiguring DOM elements
    cardDiv.style.display = 'initial';
    welcomeDiv.innerHTML = `Welcome ${username}`;
    signInButton.setAttribute("onclick", "signOut();");
    signInButton.setAttribute('class', "btn btn-success")
    signInButton.innerHTML = "Sign Out";
}

function updateUI(data) {
    console.log('Graph API responded at: ' + new Date().toString());

    const tabContent = document.getElementById("nav-tabContent");
    const tabList = document.getElementById("list-tab");
    tabList.innerHTML = ''; // clear tabList at each readMail call

    data.value.map((d, i) => {
        const listItem = document.createElement("a");
        listItem.setAttribute("class", "list-group-item list-group-item-action")
        listItem.setAttribute("id", "list" + i + "list")
        listItem.setAttribute("data-toggle", "list")
        listItem.setAttribute("href", "#list" + i)
        listItem.setAttribute("role", "tab")
        listItem.setAttribute("aria-controls", i)
        listItem.innerHTML = d.displayName;
        tabList.appendChild(listItem)

        const contentItem = document.createElement("div");
        contentItem.setAttribute("class", "tab-pane fade")
        contentItem.setAttribute("id", "list" + i)
        contentItem.setAttribute("role", "tabpanel")
        contentItem.setAttribute("aria-labelledby", "list" + i + "list")

        contentItem.append(dataToTable(d));
        
        const editButton = document.createElement("button");
        editButton.innerHTML = "Edit";
        editButton.setAttribute("type", "button");
        editButton.setAttribute("class", "btn btn-primary");
        editButton.addEventListener('click', async() => {
            await updateUser(d.id, {
                businessPhones: [
                  '+1 425 555 0109'
                ],
                officeLocation: 'CA'
              });
            await getUsers();
        });

        const deleteButton = document.createElement("button");
        deleteButton.innerHTML = "Delete";
        deleteButton.setAttribute("type", "button");
        deleteButton.setAttribute("class", "btn btn-primary");
        deleteButton.addEventListener('click', async() => {
            await deleteUser(d.id);
            await getUsers();
        });

        contentItem.append(editButton);
        contentItem.append(deleteButton);

        tabContent.appendChild(contentItem);
    });
}

function dataToTable(data) {
    const tableNode = document.createElement('table');
    tableNode.setAttribute('id', 'userTable');
    tableNode.setAttribute('class', 'table');

    Object.entries(data).filter(datum => datum !== null).map((datum) => {
        const rowNode = document.createElement('tr');
        const dataNode1 = document.createElement('td');
        const dataNode2 = document.createElement('td');
        const valueNode1 = document.createTextNode(datum[0]);
        const valueNode2 = document.createTextNode(datum[1]);
        dataNode1.appendChild(valueNode1);
        dataNode2.appendChild(valueNode2);
        rowNode.appendChild(dataNode1);
        rowNode.appendChild(dataNode2);
        tableNode.appendChild(rowNode);
    });
    return tableNode;
}