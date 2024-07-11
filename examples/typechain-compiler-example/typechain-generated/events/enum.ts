export enum MyPsp22Event {
  CustomTransferEvent = 'CustomTransferEvent',
  Transfer = 'Transfer',
  Approval = 'Approval',
}

export enum Psp22Event {
  Transfer = 'Transfer',
  Approval = 'Approval',
}
export type AnyContractEvent = MyPsp22Event | Psp22Event;
export const ContractsEvents = {
  MyPsp22Event,
  Psp22Event,
};
