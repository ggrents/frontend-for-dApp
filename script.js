window.addEventListener("load", async () => {
  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum);
    await window.ethereum.enable();
  } else if (window.web3) {
    window.web3 = new Web3(window.web3.currentProvider);
  } else {
    console.log(
      "Non-Ethereum browser detected. You should consider trying MetaMask!"
    );
  }

  const contractAddress = "0xd9145CCE52D386f254917e481eB44e9943F39138";
  const contractABI = [
    {
      inputs: [
        {
          internalType: "address",
          name: "_member",
          type: "address",
        },
      ],
      name: "addMember",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "string",
          name: "_description",
          type: "string",
        },
      ],
      name: "createProposal",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_proposalId",
          type: "uint256",
        },
      ],
      name: "executeProposal",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "uint256",
          name: "proposalId",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "string",
          name: "message",
          type: "string",
        },
      ],
      name: "ProposalAccepted",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "uint256",
          name: "proposalId",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "string",
          name: "description",
          type: "string",
        },
      ],
      name: "ProposalCreated",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "uint256",
          name: "proposalId",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "string",
          name: "message",
          type: "string",
        },
      ],
      name: "ProposalRejected",
      type: "event",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_member",
          type: "address",
        },
      ],
      name: "removeMember",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_proposalId",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "_tokenAmount",
          type: "uint256",
        },
      ],
      name: "vote",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "voter",
          type: "address",
        },
        {
          indexed: true,
          internalType: "uint256",
          name: "proposalId",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "tokenAmount",
          type: "uint256",
        },
      ],
      name: "VoteCast",
      type: "event",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      name: "balances",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      name: "memberInfo",
      outputs: [
        {
          internalType: "address",
          name: "memberAddress",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "memberSince",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "tokenBalance",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      name: "members",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      name: "proposals",
      outputs: [
        {
          internalType: "string",
          name: "description",
          type: "string",
        },
        {
          internalType: "uint256",
          name: "voteCount",
          type: "uint256",
        },
        {
          internalType: "bool",
          name: "executed",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "totalSupply",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      name: "votes",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
  ];

  const contract = new web3.eth.Contract(contractABI, contractAddress);

  const addMemberForm = document.getElementById("addMemberForm");
  addMemberForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const memberAddress = addMemberForm.elements.memberAddress.value;

    try {
      await contract.methods
        .addMember(memberAddress)
        .send({ from: ethereum.selectedAddress });
      console.log("Участник успешно добавлен");
    } catch (error) {
      console.error("Ошибка при добавлении участника:", error);
    }
  });

  const createProposalForm = document.getElementById("createProposalForm");
  createProposalForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const proposalDescription =
      createProposalForm.elements.proposalDescription.value;

    try {
      await contract.methods
        .createProposal(proposalDescription)
        .send({ from: ethereum.selectedAddress });
      console.log("Предложение успешно создано");
    } catch (error) {
      console.error("Ошибка при создании предложения:", error);
    }
  });
});
