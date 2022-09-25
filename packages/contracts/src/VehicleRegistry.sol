// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import {IVehicleRegistry} from "./interfaces/IVehicleRegistry.sol";
import {AccessControl} from "./AccessControl.sol";

import {StringUtil} from "./libraries/String.sol";

contract VehicleRegistry is IVehicleRegistry, AccessControl {
    using StringUtil for string;

    Vehicle[] public vehicles;

    mapping(string => uint) public vehicleRepairHistory;

    event RegisterVehicle(bytes32 ipfsHash, string id, uint256 timestamp);
    event UpdateHistory(bytes32 ipfsHash, string id, uint256 timestamp);

    constructor() AccessControl() {}

    function register(Vehicle memory data) onlyRole(SERVICE_PROVIDER) external {
        require(data.ipfsHash != 0, "VehicleRegistry: Invalid IPFS HASH");
        require(!data.vin.isEmpty(), "VehicleRegistry: Invalid VIN");
        vehicles.push(Vehicle({
            vin: data.vin,
            ipfsHash: data.ipfsHash
        }));
        emit RegisterVehicle(data.ipfsHash, data.vin, block.timestamp);
    }

    function getRepairHistory(string memory _vin) external view {
    //    return vehicleRepairsHistory[_vin]; 
    }

    function getVehicle(string memory _vin) external view {}
}