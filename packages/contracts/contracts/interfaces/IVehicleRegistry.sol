// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

interface IVehicleRegistry {
    event RegisterVehicle(bytes32 ipfsHash, string id, uint256 timestamp);
    event AddRepair(bytes32 ipfsHash, string id, uint256 timestamp);

    struct Vehicle {
        string vin;
    }

    function register(bytes32 ipfsHash, string memory vin) external;

    function addRepair(bytes32 ipfsHash, string memory vin) external;
}
