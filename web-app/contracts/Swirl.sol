// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Swirl {

  struct Advertiser {
        uint256 id;
        address wallet;
        uint256 balance;
        uint256 currentBalance; //new added
        string  orgUsername;
        string  orgname;
        string  orgLogo;
        string  orgdiscription;
        string  orgOrigin;
        string  empstrength;
        string  orgFounder;
        string  orgCatagory;
    }

struct Publisher {
        uint256 id;
        address wallet;
        string  orgUsername;
        string  orgname;
        string  orgLogo;
        string  orgdiscription;
        string  orgOrigin;
        string  empstrength;
        string  orgFounder;
        string  orgCatagory;
    }

   struct Campaign {
        uint256 id;
        uint256 advertiserId;
        uint256 balance;
        string  campaignName;
        string  budget;
        string  payclick;
        string  stringCID;
    }

    mapping(uint256 => Advertiser) private advertisers;
    mapping(uint256 => Campaign) private campaigns;
    mapping(uint256 => Publisher) private publishers;

    uint256 private advertiserCounter;
    uint256 private campaignCounter;
    uint256 private publisherCounter;

   function createAdvertiser(address _wallet,string memory _orgUsername, string memory _orgname, string memory _orgLogo, string memory _orgdiscription, string memory _orgOrigin, string memory _empstrength, string memory _orgFounder, string memory _orgCatagory) public returns(uint){
    require(advertiserExists(_wallet) == false, "Advertiser already exists");
    advertiserCounter++;
    advertisers[advertiserCounter] = Advertiser(advertiserCounter, _wallet, 0,0,_orgUsername,_orgname,_orgLogo,_orgdiscription,_orgOrigin,_empstrength,_orgFounder,_orgCatagory);
    return(advertiserCounter);
}

function createPublisher(address _wallet,string memory _orgUsername, string memory _orgname, string memory _orgLogo, string memory _orgdiscription, string memory _orgOrigin, string memory _empstrength, string memory _orgFounder, string memory _orgCatagory) public returns(uint){
    require(publisherExists(_wallet) == false, "Publisher already exists");
    publisherCounter++;
    publishers[publisherCounter] = Publisher(publisherCounter, _wallet,_orgUsername,_orgname,_orgLogo,_orgdiscription,_orgOrigin,_empstrength,_orgFounder,_orgCatagory);
return(publisherCounter);
}

function advertiserExists(address _wallet) private view returns (bool) {
    for (uint256 i = 1; i <= advertiserCounter; i++) {
        if (advertisers[i].wallet == _wallet) {
            return true;
        }
    }
    return false;
}

function publisherExists(address _wallet) private view returns (bool) {
    for (uint256 i = 1; i <= publisherCounter; i++) {
        if (publishers[i].wallet == _wallet) {
            return true;
        }
    }
    return false;
}

  function deposit(address _advertiserAddress)  public payable {
        uint256 advertiserId;
        for (uint256 i = 1; i <= advertiserCounter; i++) {
            if (advertisers[i].wallet == _advertiserAddress) {
                advertiserId = i;
                break;
            }
        }
        require(advertiserId > 0, "Advertiser does not exist");
        require(advertisers[advertiserId].wallet == msg.sender, "Only advertiser can deposit funds");
        advertisers[advertiserId].balance += msg.value;
        advertisers[advertiserId].currentBalance += msg.value;  // new added
    }
    function getAdvertiserBalance(address _wallet) public view returns (uint256) {
    for (uint256 i = 1; i <= advertiserCounter; i++) {
        if (advertisers[i].wallet == _wallet) {
            return advertisers[i].balance;
        }
    }
}
function withdraw(address _publisherAddress,uint256 _ammount) public {
    uint256 publisherId;
    for (uint256 i = 1; i <= publisherCounter; i++) {
        if (publishers[i].wallet == _publisherAddress) {
            publisherId = i;
            break;
        }
    }
    require(publisherId > 0, "Advertiser does not exist");
    require(publishers[publisherId].wallet == msg.sender, "Only advertiser can deposit funds");
    Campaign memory campaign = campaigns[publisherId];
    uint256 balance = campaign.balance;
    require(balance > 0, "Campaign balance is zero");
    require(balance >= _ammount, "Ammount is more than balance");
    campaigns[publisherId].balance = balance - _ammount;
    advertisers[campaigns[publisherId].advertiserId].balance -= _ammount;
    address payable publisherWallet = payable(publishers[publisherId].wallet);
    publisherWallet.transfer(_ammount);
}
function getPublisherWithdrawBalance(address _wallet) public view returns (uint256){
    uint256 publisherId;
    uint256 withdrawBalance = 0;
    for (uint256 i = 1; i <= publisherCounter; i++) {
        if (publishers[i].wallet == _wallet) {
            publisherId = i;
            break;
        }
    }
    require(publisherId > 0, "Publisher does not exist");
    for (uint256 j = 1; j <= campaignCounter; j++) {
        if (publisherId == campaigns[j].advertiserId) {
            withdrawBalance += campaigns[j].balance;
        }
    }
    return withdrawBalance;
}
function getAdvertiser(address _wallet) public view returns (Advertiser memory) {
   
    for (uint256 i = 1; i <= advertiserCounter; i++) {
        if (advertisers[i].wallet == _wallet) {
            Advertiser memory advertiser = advertisers[i];
            return advertiser;
        }
    }
   
}
function getPublisher(address _wallet) public view returns (Publisher memory) {
   
    for (uint256 i = 1; i <= publisherCounter; i++) {
        if (publishers[i].wallet == _wallet) {
            Publisher memory publisher = publishers[i];
           return publisher;
        }
    }
   
}

function createCampaign(address _advertiserAddress, uint256 _balance, string memory _campaignName, string memory _budget, string memory _payclick, string memory _stringCID) public returns(uint){
    require(advertiserExists(_advertiserAddress) == true, "Advertiser does not exist");
    uint256 advertiserId;
    for (uint256 i = 1; i <= advertiserCounter; i++) {
        if (advertisers[i].wallet == _advertiserAddress) {
            advertiserId = i;
            break;
        }
    }

    require(advertisers[advertiserId].currentBalance >= _balance, "Balance of advertiser is not enough"); //new added

    campaignCounter++;
    campaigns[campaignCounter] = Campaign(campaignCounter, advertiserId, _balance, _campaignName, _budget, _payclick, _stringCID);
    advertisers[advertiserId].balance -= _balance;
    return(campaignCounter);
}
    function getCurrentId() public view returns(uint)
    {
    return campaignCounter;
    }

function getCampaign(address _advertiserAddress) public view returns (uint256[] memory ids,  uint256[] memory balances, string[] memory campaignNames, string[] memory budgets, string[] memory payclicks, string[] memory stringCIDs) {
    ids = new uint256[](campaignCounter);
    balances = new uint256[](campaignCounter);
    campaignNames = new string[](campaignCounter);
    budgets = new string[](campaignCounter);
    payclicks = new string[](campaignCounter);
    stringCIDs = new string[](campaignCounter);
    for (uint256 i = 1; i <= campaignCounter; i++) {
        if (advertisers[campaigns[i].advertiserId].wallet == _advertiserAddress) {
            ids[i - 1] = campaigns[i].id;
            balances[i - 1] = campaigns[i].balance;
            campaignNames[i - 1] = campaigns[i].campaignName;
            budgets[i - 1] = campaigns[i].budget;
            payclicks[i - 1] = campaigns[i].payclick;
            stringCIDs[i - 1] = campaigns[i].stringCID;
        }
    }
    return (ids, balances, campaignNames, budgets, payclicks, stringCIDs);
}

function getAllAdvertisers() public view returns (Advertiser[] memory){
    Advertiser[] memory advertisersArray = new Advertiser[](advertiserCounter);
    uint256 i=0;
    for (uint256 j = 1; j <= advertiserCounter; j++) {
        advertisersArray[i] = advertisers[j];
        i++;
    }
    return advertisersArray;
}
function getAllPublishers() public view returns (Publisher[] memory){
    Publisher[] memory publishersArray = new Publisher[](publisherCounter);
    uint256 i=0;
    for (uint256 j = 1; j <= publisherCounter; j++) {
        publishersArray[i] = publishers[j];
        i++;
    }
    return publishersArray;
}
function getAllCampaigns() public view returns (Campaign[] memory){
    Campaign[] memory campaignsArray = new Campaign[](campaignCounter);
    uint256 i=0;
    for (uint256 j = 1; j <= campaignCounter; j++) {
        campaignsArray[i] = campaigns[j];
        i++;
    }
    return campaignsArray;
}
function getOneCampaigns(address _wallet) public view returns (Campaign[] memory){
    Campaign[] memory campaignsArray = new Campaign[](campaignCounter);
    uint256 i=0;
    for (uint256 j = 1; j <= campaignCounter; j++) {
        if (advertisers[campaigns[j].advertiserId].wallet == _wallet)
        campaignsArray[i] = campaigns[j];
        i++;
    }
    return campaignsArray;
}
}