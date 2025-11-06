import { create } from "zustand";
import { persist } from "zustand/middleware";

export type UserRole = "investor" | "company" | null;

interface WalletState {
  isConnected: boolean;
  address: string | null;
  role: UserRole;
  companyDocumentsSubmitted: boolean;
  companyTargetsConfigured: boolean;
  connect: (role: UserRole) => void;
  disconnect: () => void;
  setRole: (role: UserRole) => void;
  setCompanyDocumentsSubmitted: (submitted: boolean) => void;
  setCompanyTargetsConfigured: (configured: boolean) => void;
}

export const useWallet = create<WalletState>()(
  persist(
    (set) => ({
      isConnected: false,
      address: null,
      role: null,
      companyDocumentsSubmitted: false,
      companyTargetsConfigured: false,
      connect: (role: UserRole) => {
        const mockAddress = `${Math.random().toString(36).substring(2, 15)}...${Math.random().toString(36).substring(2, 6)}`;
        set({ isConnected: true, address: mockAddress, role });
      },
      disconnect: () =>
        set({
          isConnected: false,
          address: null,
          role: null,
          companyDocumentsSubmitted: false,
          companyTargetsConfigured: false,
        }),
      setRole: (role: UserRole) => set({ role }),
      setCompanyDocumentsSubmitted: (submitted: boolean) =>
        set({ companyDocumentsSubmitted: submitted }),
      setCompanyTargetsConfigured: (configured: boolean) =>
        set({ companyTargetsConfigured: configured }),
    }),
    {
      name: "wallet-storage",
    }
  )
);
