// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import {AccessControl} from "@openzeppelin/contracts/access/AccessControl.sol";


/**
 * @title RoleControl
 * @author Onuwa Nnachi Isaac <isaac.onuwa@gmail.com>
 * @dev Implements Admin and User roles.
 */
contract RoleControl is AccessControl {
    bytes32 public constant SERVICE_PROVIDER_ROLE = keccak256("SERVICE_PROVIDER"); // hash a SERVICE_PROVIDER as a role constant

    /// @dev Restricted to members of the admin role.
    modifier onlyAdmin() {
        require(isAdmin(msg.sender), "Restricted to admins.");
        _;
    }

    /// @dev Restricted to members of the service provider role.
    modifier onlyServiceProvider() {
        require(isServiceProvider(msg.sender), "Restricted to service provider.");
        _;
    }
    /**
     * @dev Add `root` to the admin role as a member.
     */
    constructor (address root) {
        _setupRole(DEFAULT_ADMIN_ROLE, root);
        _setRoleAdmin(SERVICE_PROVIDER_ROLE, DEFAULT_ADMIN_ROLE);
    }

    /**
     * @dev A method to verify if the account belongs to the admin role
     * @param account The address to verify.
     * @return Return `true` if the account belongs to the admin role.
     */
    function isAdmin(address account)
        public
        virtual
        view
        returns(bool)
    {
        return hasRole(DEFAULT_ADMIN_ROLE, account);
    }

    /**
     * @dev A method to verify if the account belongs to the service provider role
     * @param account The address to verify.
     * @return Return `true` if the account belongs to the service provider role.
     */
    function isServiceProvider(address account)
        public
        virtual
        view
        returns(bool)
    {
        return hasRole(SERVICE_PROVIDER_ROLE, account);
    }

    /**
     * @dev Add an account to the service provider role. Restricted to admins.
     * @param account The member to add as a member.
     */
    function addServiceProvider(address account)
        public
        virtual
        onlyAdmin
    {
        require(account != address(0), "RoleControl: INVALID_ADDRESS");
        grantRole(SERVICE_PROVIDER_ROLE, account);
    }

    /**
     * @dev Add an account to the admin role. Restricted to admins.
     * @param account The member to add as a admin.
     */
    function addAdmin(address account)
        public
        virtual
        onlyAdmin
    {
        require(account != address(0), "RoleControl: INVALID_ADDRESS");
        grantRole(DEFAULT_ADMIN_ROLE, account);
    }

    /**
     * @dev Remove an account from the service provider role. Restricted to admins.
     * @param account The member to remove.
     */
    function removeServiceProvider(address account)
        public
        virtual
        onlyAdmin
    {
        require(account != address(0), "RoleControl: INVALID_ADDRESS");
        revokeRole(SERVICE_PROVIDER_ROLE, account);
    }

    /**
     * @dev Remove oneself from the admin role.
     */
    function renounceAdmin()
        public virtual
    {
        renounceRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }
    
}