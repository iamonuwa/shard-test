import { VehicleRegistry } from "@shardlabs/contracts/typechain/contracts/VehicleRegistry"
import { VehicleRegistry__factory } from "@shardlabs/contracts/typechain/factories/contracts/VehicleRegistry__factory"
import { CONTRACT_ADDRESS } from "constants/index"
import { useActiveWeb3React } from "./useActiveWeb3React"
import { IpfsHashToBytes32 } from "utils/convert";
import { useToasts } from 'react-toast-notifications'

type Blockchain = {
    registerVehicle: (hash: string, vin: string) => void
    addRepairHistory: (hash: string, vin: string) => void
    addServiceProvider: (account: string) => void
}

export const useBlockchain = (): Blockchain => {
    const { library } = useActiveWeb3React()
    const { addToast } = useToasts()
    const signer = library?.getSigner()
    const registerVehicle = async (hash: string, vin: string) => {
        const ipfsBytes = IpfsHashToBytes32(hash);
        const vehicleRegistry: VehicleRegistry = VehicleRegistry__factory.connect(CONTRACT_ADDRESS, signer!);
        const tx = await vehicleRegistry.register(ipfsBytes, vin);
        await tx.wait(1);
        addToast("Transaction submitted on-chain")
    }

    const addServiceProvider = async (account: string) => {
        const vehicleRegistry: VehicleRegistry = VehicleRegistry__factory.connect(CONTRACT_ADDRESS, signer!);
        const tx = await vehicleRegistry.addServiceProvider(account);
        await tx.wait(1);
        addToast("Transaction submitted on-chain")
    }

    const addRepairHistory = async (hash: string, vin: string) => {
        const ipfsBytes = IpfsHashToBytes32(hash);
        const vehicleRegistry: VehicleRegistry = VehicleRegistry__factory.connect(CONTRACT_ADDRESS, signer!);
        const tx = await vehicleRegistry.addRepair(ipfsBytes, vin)
        await tx.wait(1)
        addToast("Transaction submitted on-chain")
    }

    return { addServiceProvider, registerVehicle, addRepairHistory }
}