import type BN from 'bn.js';
import type { ReturnNumber } from 'wookashwackomytest-typechain-types';

export enum LangError {
  couldNotReadInput = 'CouldNotReadInput',
}

export type AccountId = string | number[];

export interface PSP22Error {
  custom?: Array<ReturnNumber>;
  insufficientBalance?: null;
  insufficientAllowance?: null;
  zeroRecipientAddress?: null;
  zeroSenderAddress?: null;
  safeTransferCheckFailed?: Array<ReturnNumber>;
}

export class PSP22ErrorBuilder {
  static Custom(value: Array<ReturnNumber>): PSP22Error {
    return {
      custom: value,
    };
  }
  static InsufficientBalance(): PSP22Error {
    return {
      insufficientBalance: null,
    };
  }
  static InsufficientAllowance(): PSP22Error {
    return {
      insufficientAllowance: null,
    };
  }
  static ZeroRecipientAddress(): PSP22Error {
    return {
      zeroRecipientAddress: null,
    };
  }
  static ZeroSenderAddress(): PSP22Error {
    return {
      zeroSenderAddress: null,
    };
  }
  static SafeTransferCheckFailed(value: Array<ReturnNumber>): PSP22Error {
    return {
      safeTransferCheckFailed: value,
    };
  }
}
