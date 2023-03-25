export interface MinimalPoliticalParty {
  name: string;
  id: number;
}

export interface PoliticalPartyObject {
  politicalParty: MinimalPoliticalParty;
}

export interface IElection {
  electionDate: Date;
  electionType: string;
  id: string;
  politicalParties: PoliticalPartyObject[];
}