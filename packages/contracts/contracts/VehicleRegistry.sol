// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import {IVehicleRegistry} from "./interfaces/IVehicleRegistry.sol";
import {RoleControl} from "./RoleControl.sol";

import {StringUtil} from "./libraries/String.sol";

contract VehicleRegistry is IVehicleRegistry, RoleControl {
    using StringUtil for string;

    Vehicle[] public vehicles;

    mapping(string => VehicleHistory) public vehicleRepairHistory;

    constructor() RoleControl(msg.sender) {}

    function register(Vehicle memory data) public onlyServiceProvider {
        require(data.ipfsHash != 0, "VehicleRegistry: Invalid IPFS HASH");
        require(!data.vin.isEmpty(), "VehicleRegistry: Invalid VIN");
        vehicles.push(Vehicle({vin: data.vin, ipfsHash: data.ipfsHash}));
        emit RegisterVehicle(data.ipfsHash, data.vin, block.timestamp);
    }

    function addRepairHistory(string memory VIN, string memory note)
        public
        onlyServiceProvider
    {
        vehicleRepairHistory[VIN].vin = VIN;
        vehicleRepairHistory[VIN].sp = msg.sender;
        vehicleRepairHistory[VIN].timestamp = block.timestamp;
        vehicleRepairHistory[VIN].note = note;

        emit UpdateHistory(VIN, block.timestamp, note, msg.sender);
    }

    function getVehicle(string memory _vin) public view {}
}
