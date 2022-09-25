// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

interface IVehicleRegistry {

    struct Vehicle {
        bytes32 ipfsHash;
        string vin;
    }

    function register(Vehicle memory data) external;
    function getRepairHistory(string memory _vin) external view;
    function getVehicle(string memory _vin) external view;
}