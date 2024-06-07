import type BN from 'bn.js';

export type AccountId = string | number[];

export type Mapping = {};

export type VestingData = {
  creationTime: number | string | BN;
  schedule: VestingSchedule;
  amount: string | number | BN;
  released: string | number | BN;
};

export interface VestingSchedule {
  constant?: [number | string | BN, number | string | BN];
  external?: ExternalTimeConstraint;
}

export class VestingScheduleBuilder {
  static Constant(value: [number | string | BN, number | string | BN]): VestingSchedule {
    return {
      constant: value,
    };
  }
  static External(value: ExternalTimeConstraint): VestingSchedule {
    return {
      external: value,
    };
  }
}

export type ExternalTimeConstraint = {
  account: AccountId;
  fallbackValues: [number | string | BN, number | string | BN];
};

export type GeneralVestData = {
  vestingDatas: Mapping;
  nextId: Mapping;
};

export enum LangError {
  couldNotReadInput = 'CouldNotReadInput',
}

export interface VestingError {
  psp22Error?: PSP22Error;
  invalidScheduleKey?: null;
  nativeTransferFailed?: null;
  invalidAmountPaid?: null;
  couldNotResolveTimeConstraint?: null;
  mathError?: MathError;
}

export class VestingErrorBuilder {
  static PSP22Error(value: PSP22Error): VestingError {
    return {
      psp22Error: value,
    };
  }
  static InvalidScheduleKey(): VestingError {
    return {
      invalidScheduleKey: null,
    };
  }
  static NativeTransferFailed(): VestingError {
    return {
      nativeTransferFailed: null,
    };
  }
  static InvalidAmountPaid(): VestingError {
    return {
      invalidAmountPaid: null,
    };
  }
  static CouldNotResolveTimeConstraint(): VestingError {
    return {
      couldNotResolveTimeConstraint: null,
    };
  }
  static MathError(value: MathError): VestingError {
    return {
      mathError: value,
    };
  }
}

export interface PSP22Error {
  custom?: string;
  mathError?: MathError;
  insufficientBalance?: null;
  insufficientAllowance?: null;
  zeroRecipientAddress?: null;
  zeroSenderAddress?: null;
  safeTransferCheckFailed?: string;
  permitInvalidSignature?: null;
  permitExpired?: null;
}

export class PSP22ErrorBuilder {
  static Custom(value: string): PSP22Error {
    return {
      custom: value,
    };
  }
  static MathError(value: MathError): PSP22Error {
    return {
      mathError: value,
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
  static SafeTransferCheckFailed(value: string): PSP22Error {
    return {
      safeTransferCheckFailed: value,
    };
  }
  static PermitInvalidSignature(): PSP22Error {
    return {
      permitInvalidSignature: null,
    };
  }
  static PermitExpired(): PSP22Error {
    return {
      permitExpired: null,
    };
  }
}

export enum MathError {
  underflow = 'Underflow',
  overflow = 'Overflow',
  divByZero = 'DivByZero',
}
