// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

interface IVehicleRegistry {
    event RegisterVehicle(bytes32 ipfsHash, string id, uint256 timestamp);
    event UpdateHistory(
        string vin,
        uint256 timestamp,
        string note,
        address indexed from
    );
    struct Vehicle {
        bytes32 ipfsHash;
        string vin;
    }

    struct VehicleHistory {
        string vin;
        uint256 timestamp;
        string note;
        address sp;
    }

    function register(Vehicle memory data) external;

    function addRepairHistory(string memory _vin, string memory note) external;

    function getVehicle(string memory _vin) external view;
}
