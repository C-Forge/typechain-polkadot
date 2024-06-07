import BN from 'bn.js';
import type * as ReturnTypes from '../types-returns/vester';

export interface Transfer {
  from: ReturnTypes.AccountId | null;
  to: ReturnTypes.AccountId | null;
  value: BN;
}

export interface Approval {
  owner: ReturnTypes.AccountId;
  spender: ReturnTypes.AccountId;
  value: BN;
}

export interface TokenReleased {
  caller: ReturnTypes.AccountId;
  to: ReturnTypes.AccountId;
  asset: ReturnTypes.AccountId | null;
  amount: BN;
}

export interface VestingScheduled {
  creator: ReturnTypes.AccountId;
  asset: ReturnTypes.AccountId | null;
  receiver: ReturnTypes.AccountId;
  amount: BN;
  schedule: ReturnTypes.VestingSchedule;
}
