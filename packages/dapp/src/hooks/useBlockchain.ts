import { VehicleRegistry } from "@shardlabs/contracts/typechain/contracts/VehicleRegistry"
import { VehicleRegistry__factory } from "@shardlabs/contracts/typechain/factories/contracts/VehicleRegistry__factory"
import { CONTRACT_ADDRESS } from "constants/index"
import { useActiveWeb3React } from "./useActiveWeb3React"
import { IpfsHashToBytes32 } from "utils/convert";

type Blockchain = {
    registerVehicle: (hash: string, vin: string) => void
    addRepairHistory: (hash: string, vin: string) => void
    addServiceProvider: (account: string) => void
}

export const useBlockchain = (): Blockchain => {
    const { library } = useActiveWeb3React()
    const signer = library?.getSigner()
    const registerVehicle = async (hash: string, vin: string) => {
        const bytes = IpfsHashToBytes32(hash);
        const vehicleRegistry: VehicleRegistry = VehicleRegistry__factory.connect(CONTRACT_ADDRESS, signer!);
        const tx = await vehicleRegistry.register({ ipfsHash: bytes, vin });
        tx.wait(2);
        console.log(tx)
    }

    const addServiceProvider = async (account: string) => {
        const vehicleRegistry: VehicleRegistry = VehicleRegistry__factory.connect(CONTRACT_ADDRESS, signer!);
        const tx = await vehicleRegistry.addServiceProvider(account);
        tx.wait(2);
        console.log(tx)
    }

    const addRepairHistory = async (hash: string, vin: string) => {
        const ipfsBytes = IpfsHashToBytes32(hash);
        const vehicleRegistry: VehicleRegistry = VehicleRegistry__factory.connect(CONTRACT_ADDRESS, signer!);
        const tx = await vehicleRegistry.addRepair(ipfsBytes, vin)
        tx.wait(2)
        console.log(tx)
    }

    return { addServiceProvider, registerVehicle, addRepairHistory }
}