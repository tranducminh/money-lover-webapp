export interface ITransaction {
  id: number;
  amount: number;
  note: string;
  date: string;
  debt_exp: string;
  category: {
    id: number;
    name: string;
    icon: string;
    main_type: number;
  };
}

export interface ITransactionByDate {
  inflow: number;
  outflow: number;
  transactions: {
    date: string;
    total: number;
    items: ITransaction[];
  }[];
}

export interface IWallet {
  id: number;
  name: string;
  is_freezed: boolean;
  team: {
    id: number;
    name: string;
  };
  categories: ICategory[];
}

export interface IWalletGroupByTeam {
  name: string;
  wallets: IWallet[];
}

export interface ICategory {
  id: number;
  name: string;
  icon: string;
  mainType: number;
}

export interface IOption {
  label: string;
  value: number;
}

export interface ITeam {
  id: number;
  name: string;
  owner: {
    id: number;
    name: string;
    email: string;
  };
}
