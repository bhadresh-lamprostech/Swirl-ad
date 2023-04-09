// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Swirl {

    
  struct Advertiser {
        uint256 id;
        address wallet;
        uint256 balance;
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

   function createAdvertiser(address _wallet,string memory _orgUsername, string memory _orgname, string memory _orgLogo, string memory _orgdiscription, string memory _orgOrigin, string memory _empstrength, string memory _orgFounder, string memory _orgCatagory) public {
    require(advertiserExists(_wallet) == false, "Advertiser already exists");
    advertiserCounter++;
    advertisers[advertiserCounter] = Advertiser(advertiserCounter, _wallet, 0,_orgUsername,_orgname,_orgLogo,_orgdiscription,_orgOrigin,_empstrength,_orgFounder,_orgCatagory);
}

function createPublisher(address _wallet,string memory _orgUsername, string memory _orgname, string memory _orgLogo, string memory _orgdiscription, string memory _orgOrigin, string memory _empstrength, string memory _orgFounder, string memory _orgCatagory) public {
    require(publisherExists(_wallet) == false, "Publisher already exists");
    publisherCounter++;
    publishers[publisherCounter] = Publisher(publisherCounter, _wallet,_orgUsername,_orgname,_orgLogo,_orgdiscription,_orgOrigin,_empstrength,_orgFounder,_orgCatagory);
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
    }
    function getAdvertiserBalance(address _wallet) public view returns (uint256) {
    for (uint256 i = 1; i <= advertiserCounter; i++) {
        if (advertisers[i].wallet == _wallet) {
            return advertisers[i].balance;
        }
    }
}
    function withdraw(uint256 _publisherId, uint256 _campaignId) public {
    require(_publisherId <= publisherCounter, "Publisher does not exist");
    require(_campaignId <= campaignCounter, "Campaign does not exist");
    require(publishers[_publisherId].wallet == msg.sender, "Only publisher can withdraw");

    uint256 balance = campaigns[_campaignId].balance;
    require(balance > 0, "Campaign balance is zero");

    campaigns[_campaignId].balance = 0;
    advertisers[campaigns[_campaignId].advertiserId].balance -= balance;
    address payable publisherWallet = payable(publishers[_publisherId].wallet);
    publisherWallet.transfer(balance);
}


function getAdvertiser(address _wallet) public view returns (uint256, address, uint256, string memory, string memory, string memory, string memory, string memory, string memory, string memory, string memory) {
   
    for (uint256 i = 1; i <= advertiserCounter; i++) {
        if (advertisers[i].wallet == _wallet) {
            Advertiser memory advertiser = advertisers[i];
            return (advertiser.id, advertiser.wallet, advertiser.balance,advertiser.orgUsername,advertiser.orgname,advertiser.orgLogo,advertiser.orgdiscription,advertiser.orgOrigin,advertiser.empstrength,advertiser.orgFounder,advertiser.orgCatagory);
        }
    }
   
}

function getPublisher(address _wallet) public view returns (uint256, address, string memory, string memory, string memory, string memory, string memory, string memory, string memory, string memory) {
   
    for (uint256 i = 1; i <= publisherCounter; i++) {
        if (publishers[i].wallet == _wallet) {
            Publisher memory publisher = publishers[i];
            return (publisher.id, publisher.wallet,publisher.orgUsername,publisher.orgname,publisher.orgLogo,publisher.orgdiscription,publisher.orgOrigin,publisher.empstrength,publisher.orgFounder,publisher.orgCatagory);
        }
    }
   
}





function createCampaign(address _advertiserAddress, uint256 _balance, string memory _campaignName, string memory _budget, string memory _payclick, string memory _stringCID) public {
    require(advertiserExists(_advertiserAddress) == true, "Advertiser does not exist");
    uint256 advertiserId;
    for (uint256 i = 1; i <= advertiserCounter; i++) {
        if (advertisers[i].wallet == _advertiserAddress) {
            advertiserId = i;
            break;
        }
    }

    require(advertisers[advertiserId].balance >= _balance, "Balance of advertiser is not enough");

    campaignCounter++;
    campaigns[campaignCounter] = Campaign(campaignCounter, advertiserId, _balance, _campaignName, _budget, _payclick, _stringCID);
    advertisers[advertiserId].balance -= _balance;
}

function isPublished(uint256 _campaignId) public view returns (bool) {
    require(_campaignId <= campaignCounter, "Campaign does not exist");
    
    Campaign memory campaign = campaigns[_campaignId];
    return (campaign.balance > 0);
}

// Function to check if the campaign is withdrawn
function isWithdrawn(uint256 _campaignId) public view returns (bool) {
    require(_campaignId <= campaignCounter, "Campaign does not exist");
    
    Campaign memory campaign = campaigns[_campaignId];
    return (campaign.balance == 0);
}

// Function to publish the campaign
function publishCampaign(uint256 _campaignId) public {
    require(_campaignId <= campaignCounter, "Campaign does not exist");
    Campaign memory campaign = campaigns[_campaignId];
    require(advertisers[campaign.advertiserId].balance >= campaign.balance, "Balance of advertiser is not enough");

    advertisers[campaign.advertiserId].balance -= campaign.balance;
}

// Function to withdraw the campaign
function withdrawCampaign(uint256 _campaignId) public {
    require(_campaignId <= campaignCounter, "Campaign does not exist");
    Campaign memory campaign = campaigns[_campaignId];

    advertisers[campaign.advertiserId].balance += campaign.balance;
    campaign.balance = 0;
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