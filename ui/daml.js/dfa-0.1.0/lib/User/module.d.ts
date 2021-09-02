// Generated from User.daml
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/no-use-before-define */
import * as jtv from '@mojotech/json-type-validation';
import * as damlTypes from '@daml/types';
/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
import * as damlLedger from '@daml/ledger';

import * as pkg40f452260bef3f29dede136108fc08a88d5a5250310281067087da6f0baddff7 from '@daml.js/40f452260bef3f29dede136108fc08a88d5a5250310281067087da6f0baddff7';
import * as pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662 from '@daml.js/d14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662';

export declare type CompletedRequest = {
  user: damlTypes.Party;
  admin: damlTypes.Party;
  approvers: damlTypes.Party[];
  disapprovers: damlTypes.Party[];
  flight: Flight;
};

export declare const CompletedRequest:
  damlTypes.Template<CompletedRequest, CompletedRequest.Key, 'c2100db0c56b69c11bde20ced3a2209eba1f79e904bb21bc79f3fac69e891687:User:CompletedRequest'> & {
  Archive: damlTypes.Choice<CompletedRequest, pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive, {}, CompletedRequest.Key>;
};

export declare namespace CompletedRequest {
  export type Key = pkg40f452260bef3f29dede136108fc08a88d5a5250310281067087da6f0baddff7.DA.Types.Tuple2<damlTypes.Party, string>
  export type CreateEvent = damlLedger.CreateEvent<CompletedRequest, CompletedRequest.Key, typeof CompletedRequest.templateId>
  export type ArchiveEvent = damlLedger.ArchiveEvent<CompletedRequest, typeof CompletedRequest.templateId>
  export type Event = damlLedger.Event<CompletedRequest, CompletedRequest.Key, typeof CompletedRequest.templateId>
  export type QueryResult = damlLedger.QueryResult<CompletedRequest, CompletedRequest.Key, typeof CompletedRequest.templateId>
}



export declare type CreateRequest = {
  flight: Flight;
  admin: damlTypes.Party;
  parties: damlTypes.Party[];
};

export declare const CreateRequest:
  damlTypes.Serializable<CreateRequest> & {
  }
;


export declare type User = {
  username: damlTypes.Party;
  requests: damlTypes.ContractId<FlightRequest>[];
};

export declare const User:
  damlTypes.Template<User, User.Key, 'c2100db0c56b69c11bde20ced3a2209eba1f79e904bb21bc79f3fac69e891687:User:User'> & {
  Archive: damlTypes.Choice<User, pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive, {}, User.Key>;
  CreateRequest: damlTypes.Choice<User, CreateRequest, damlTypes.ContractId<User>, User.Key>;
};

export declare namespace User {
  export type Key = damlTypes.Party
  export type CreateEvent = damlLedger.CreateEvent<User, User.Key, typeof User.templateId>
  export type ArchiveEvent = damlLedger.ArchiveEvent<User, typeof User.templateId>
  export type Event = damlLedger.Event<User, User.Key, typeof User.templateId>
  export type QueryResult = damlLedger.QueryResult<User, User.Key, typeof User.templateId>
}



export declare type Disapproved = {
  disapprover: damlTypes.Party;
};

export declare const Disapproved:
  damlTypes.Serializable<Disapproved> & {
  }
;


export declare type Approved = {
  approver: damlTypes.Party;
};

export declare const Approved:
  damlTypes.Serializable<Approved> & {
  }
;


export declare type FlightRequest = {
  user: damlTypes.Party;
  admin: damlTypes.Party;
  parties: damlTypes.Party[];
  approvers: damlTypes.Party[];
  disapprovers: damlTypes.Party[];
  flight: Flight;
};

export declare const FlightRequest:
  damlTypes.Template<FlightRequest, FlightRequest.Key, 'c2100db0c56b69c11bde20ced3a2209eba1f79e904bb21bc79f3fac69e891687:User:FlightRequest'> & {
  Archive: damlTypes.Choice<FlightRequest, pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive, {}, FlightRequest.Key>;
  Approved: damlTypes.Choice<FlightRequest, Approved, {}, FlightRequest.Key>;
  Disapproved: damlTypes.Choice<FlightRequest, Disapproved, {}, FlightRequest.Key>;
};

export declare namespace FlightRequest {
  export type Key = pkg40f452260bef3f29dede136108fc08a88d5a5250310281067087da6f0baddff7.DA.Types.Tuple2<damlTypes.Party, string>
  export type CreateEvent = damlLedger.CreateEvent<FlightRequest, FlightRequest.Key, typeof FlightRequest.templateId>
  export type ArchiveEvent = damlLedger.ArchiveEvent<FlightRequest, typeof FlightRequest.templateId>
  export type Event = damlLedger.Event<FlightRequest, FlightRequest.Key, typeof FlightRequest.templateId>
  export type QueryResult = damlLedger.QueryResult<FlightRequest, FlightRequest.Key, typeof FlightRequest.templateId>
}



export declare type Flight = {
  location: pkg40f452260bef3f29dede136108fc08a88d5a5250310281067087da6f0baddff7.DA.Types.Tuple2<damlTypes.Numeric, damlTypes.Numeric>;
  time: string;
  altitude: string;
};

export declare const Flight:
  damlTypes.Serializable<Flight> & {
  }
;

