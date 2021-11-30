export enum CategoryType {
  EXPENSE,
  INCOME,
  LOAN,
  RECOVER_DEBT,
  DEBT,
  BACK_DEBT,
}

export enum MessageType {
  INFO = "info",
  SUCCESS = "success",
  WARNING = "warning",
  ERROR = "error",
}

export enum WalletTab {
  TRANSACTION = "transaction",
  MEMBER = "member",
}

export enum UserRole {
  OWNER = 0,
  MANAGER = 1,
  OBSERVER = 2,
}
