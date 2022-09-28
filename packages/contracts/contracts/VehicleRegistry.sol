// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import {IVehicleRegistry} from "./interfaces/IVehicleRegistry.sol";
import {RoleControl} from "./RoleControl.sol";

import {StringUtil} from "./libraries/String.sol";

contract VehicleRegistry is IVehicleRegistry, RoleControl {
    using StringUtil for string;

    Vehicle[] public vehicles;

    mapping(string => mapping(string => bytes32)) public vehicleRepairHistory;

    constructor() RoleControl(msg.sender) {}

    function register(bytes32 ipfsHash, string memory vin) public onlyAdmin onlyServiceProvider {
        require(ipfsHash != 0, "VehicleRegistry: Invalid IPFS HASH");
        require(!vin.isEmpty(), "VehicleRegistry: Invalid VIN");
        vehicles.push(Vehicle({vin: vin}));
        emit RegisterVehicle(ipfsHash, vin, block.timestamp);
    }

    function addRepair(bytes32 ipfsHash, string memory vin) public onlyAdmin onlyServiceProvider {
        require(ipfsHash != 0, "VehicleRegistry: Invalid IPFS HASH");
        require(!vin.isEmpty(), "VehicleRegistry: Invalid VIN");
        vehicleRepairHistory[vin][vin] = ipfsHash;
        emit AddRepair(ipfsHash, vin, block.timestamp);
    }

}
