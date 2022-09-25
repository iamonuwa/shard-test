import { VehicleRegistry } from './typechain/VehicleRegistry';
import { Signers } from './types'

type Fixture<T> = () => Promise<T>;

declare module "mocha" {
    export interface Context {
        vehicleRegistry: VehicleRegistry;
        loadFixture: <T>(fixture: Fixture<T>) => Promise<T>;
        signers: Signers;
    }
}