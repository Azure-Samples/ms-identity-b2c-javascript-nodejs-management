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
        contentItem.innerHTML = "<strong>Display Name:</strong> " + d.displayName + "<br> <strong>User Principal Name:</strong> " + d.userPrincipalName + "<br> <strong>Given Name:</strong> " + d.givenName + "<br> <strong>Surname:</strong> " + d.surname + "<br> <strong>ID:</strong> " + d.id;
        tabContent.appendChild(contentItem);
    });

}