import { RoleControl, VehicleRegistry } from './typechain';
import { Signers } from './types'

type Fixture<T> = () => Promise<T>;

declare module "mocha" {
    export interface Context {
        vehicleRegistry: VehicleRegistry;
        roleControl: RoleControl
        loadFixture: <T>(fixture: Fixture<T>) => Promise<T>;
        signers: Signers;
    }
}