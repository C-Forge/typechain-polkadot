import BN from 'bn.js';
import type * as ReturnTypes from '../types-returns/my_psp22';

export interface CustomTransferEvent {
  from: ReturnTypes.AccountId | null;
  to: ReturnTypes.AccountId | null;
  value: BN;
}

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
