// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Swirl {

    
    struct Advertiser {
        uint256 id;
        address wallet;
        uint256 balance;
    }

    struct Campaign {
        uint256 id;
        uint256 advertiserId;
        uint256 balance;
    }

    struct Publisher {
        uint256 id;
        address wallet;
    }

    mapping(uint256 => Advertiser) private advertisers;
    mapping(uint256 => Campaign) private campaigns;
    mapping(uint256 => Publisher) private publishers;

    uint256 private advertiserCounter;
    uint256 private campaignCounter;
    uint256 private publisherCounter;

   function createAdvertiser(address _wallet) public {
    require(advertiserExists(_wallet) == false, "Advertiser already exists");
    advertiserCounter++;
    advertisers[advertiserCounter] = Advertiser(advertiserCounter, _wallet, 0);
}

function createPublisher(address _wallet) public {
    require(publisherExists(_wallet) == false, "Publisher already exists");
    publisherCounter++;
    publishers[publisherCounter] = Publisher(publisherCounter, _wallet);
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

    function createCampaign(uint256 _advertiserId, uint256 _balance) public {
        require(_advertiserId <= advertiserCounter, "Advertiser does not exist");
        require(advertisers[_advertiserId].wallet == msg.sender, "Only advertiser can create campaign");

        campaignCounter++;
        campaigns[campaignCounter] = Campaign(campaignCounter, _advertiserId, _balance);
        advertisers[_advertiserId].balance += _balance;
    }

    function deposit(uint256 _advertiserId) public payable {
        require(_advertiserId <= advertiserCounter, "Advertiser does not exist");
        require(advertisers[_advertiserId].wallet == msg.sender, "Only advertiser can deposit funds");

        advertisers[_advertiserId].balance += msg.value;
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


    function getAdvertiser(uint256 _advertiserId) public view returns (uint256, address, uint256) {
        require(_advertiserId <= advertiserCounter, "Advertiser does not exist");

        Advertiser memory advertiser = advertisers[_advertiserId];
        return (advertiser.id, advertiser.wallet, advertiser.balance);
    }

    function getAllAdvertisers() public view returns (uint256[] memory, address[] memory) {
    uint256[] memory ids = new uint256[](advertiserCounter);
    address[] memory addresses = new address[](advertiserCounter);
    for (uint256 i = 1; i <= advertiserCounter; i++) {
        ids[i - 1] = advertisers[i].id;
        addresses[i - 1] = advertisers[i].wallet;
    }
    return (ids, addresses);
}

    function getPublisher(uint256 _publisherId) public view returns (uint256, address) {
        require(_publisherId <= publisherCounter, "Publisher does not exist");

        Publisher memory publisher = publishers[_publisherId];
        return (publisher.id, publisher.wallet);
    }

   function getAllPublishers() public view returns (uint256[] memory) {
    uint256[] memory ids = new uint256[](publisherCounter);
    for (uint256 i = 1; i <= publisherCounter; i++) {
        ids[i - 1] = publishers[i].id;
    }
    return ids;
}

function getCampaign(uint256 _campaignId) public view returns (uint256, uint256, uint256) {
    require(_campaignId <= campaignCounter, "Campaign does not exist");

    Campaign memory campaign = campaigns[_campaignId];
    return (campaign.id, campaign.advertiserId, campaign.balance);
}

function getAllCampaigns() public view returns (uint256[] memory) {
    uint256[] memory ids = new uint256[](campaignCounter);
    for (uint256 i = 1; i <= campaignCounter; i++) {
        ids[i - 1] = campaigns[i].id;
    }
    return ids;
}
function getAllCampaignsWithAdvertiserInfo() public view returns (uint256[] memory, uint256[] memory, address[] memory) {
    uint256[] memory campaignIds = new uint256[](campaignCounter);
    uint256[] memory advertiserIds = new uint256[](campaignCounter);
    address[] memory advertiserAddresses = new address[](campaignCounter);

    for (uint256 i = 1; i <= campaignCounter; i++) {
        campaignIds[i - 1] = campaigns[i].id;
        advertiserIds[i - 1] = campaigns[i].advertiserId;
        advertiserAddresses[i - 1] = advertisers[campaigns[i].advertiserId].wallet;
    }

    return (campaignIds, advertiserIds, advertiserAddresses);
}

}
