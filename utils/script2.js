function addMemberToList(memberAddress) {
  const membersList = document.getElementById("membersList");
  const listItem = document.createElement("li");
  listItem.textContent = memberAddress;
  membersList.appendChild(listItem);
}

function addProposalToList(description) {
  const proposalsList = document.getElementById("proposalsList");
  const listItem = document.createElement("li");
  listItem.textContent = description;
  proposalsList.appendChild(listItem);
}

document
  .getElementById("addMemberForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const memberAddress = this.elements.memberAddress.value;
    addMemberToList(memberAddress);
  });

document
  .getElementById("createProposalForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const proposalDescription = this.elements.proposalDescription.value;
    addProposalToList(proposalDescription);
  });
