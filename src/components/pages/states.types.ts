export interface IState {
  id: number;
  state_id: number;
  name: string;
}

export interface ILga {
  id: number;
  lga_id: number;
  name: string;
  stateId: number;
}

export interface IWard {
  id: number;
  lgaId: number;
  name: string;
  ward_id: number;
}