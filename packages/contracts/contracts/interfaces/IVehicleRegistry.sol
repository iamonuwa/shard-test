// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

interface IVehicleRegistry {
    event RegisterVehicle(bytes32 ipfsHash, string id, uint256 timestamp);
    event AddRepair(bytes32 ipfsHash, string id, uint256 timestamp);

    struct Vehicle {
        bytes32 ipfsHash;
        string vin;
    }

    function register(Vehicle memory data) external;

    function addRepair(bytes32 ipfsHash, string memory vin) external;
}
