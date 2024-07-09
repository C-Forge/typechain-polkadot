import type BN from 'bn.js';

export enum LangError {
  couldNotReadInput = 'CouldNotReadInput',
}

export type AccountId = string | number[];

export interface PSP22Error {
  custom?: Array<BN>;
  insufficientBalance?: null;
  insufficientAllowance?: null;
  zeroRecipientAddress?: null;
  zeroSenderAddress?: null;
  safeTransferCheckFailed?: Array<BN>;
}

export class PSP22ErrorBuilder {
  static Custom(value: Array<BN>): PSP22Error {
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
  static SafeTransferCheckFailed(value: Array<BN>): PSP22Error {
    return {
      safeTransferCheckFailed: value,
    };
  }
}
