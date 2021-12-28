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

export declare type CreateRequest = {
  flight: Flight;
};

export declare const CreateRequest:
  damlTypes.Serializable<CreateRequest> & {
  }
;


export declare type User = {
  username: damlTypes.Party;
  parties: damlTypes.Party[];
};

export declare interface UserInterface {
  Archive: damlTypes.Choice<User, pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive, {}, User.Key>;
  CreateRequest: damlTypes.Choice<User, CreateRequest, damlTypes.ContractId<User>, User.Key>;
}
export declare const User:
  damlTypes.Template<User, User.Key, 'dee4517467071e8622936e9bc1785b69e5c84cc7a1842d809412b4bd7e2781d4:User:User'> & UserInterface;

export declare namespace User {
  export type Key = damlTypes.Party
  export type CreateEvent = damlLedger.CreateEvent<User, User.Key, typeof User.templateId>
  export type ArchiveEvent = damlLedger.ArchiveEvent<User, typeof User.templateId>
  export type Event = damlLedger.Event<User, User.Key, typeof User.templateId>
  export type QueryResult = damlLedger.QueryResult<User, User.Key, typeof User.templateId>
}



export declare type CompletedRequest = {
  user: damlTypes.Party;
  parties: damlTypes.Party[];
  approvers: damlTypes.Party[];
  disapprovers: damlTypes.Party[];
  flight: Flight;
};

export declare interface CompletedRequestInterface {
  Archive: damlTypes.Choice<CompletedRequest, pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive, {}, undefined>;
}
export declare const CompletedRequest:
  damlTypes.Template<CompletedRequest, undefined, 'dee4517467071e8622936e9bc1785b69e5c84cc7a1842d809412b4bd7e2781d4:User:CompletedRequest'> & CompletedRequestInterface;

export declare namespace CompletedRequest {
  export type CreateEvent = damlLedger.CreateEvent<CompletedRequest, undefined, typeof CompletedRequest.templateId>
  export type ArchiveEvent = damlLedger.ArchiveEvent<CompletedRequest, typeof CompletedRequest.templateId>
  export type Event = damlLedger.Event<CompletedRequest, undefined, typeof CompletedRequest.templateId>
  export type QueryResult = damlLedger.QueryResult<CompletedRequest, undefined, typeof CompletedRequest.templateId>
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
  parties: damlTypes.Party[];
  approvers: damlTypes.Party[];
  disapprovers: damlTypes.Party[];
  flight: Flight;
};

export declare interface FlightRequestInterface {
  Approved: damlTypes.Choice<FlightRequest, Approved, {}, FlightRequest.Key>;
  Disapproved: damlTypes.Choice<FlightRequest, Disapproved, {}, FlightRequest.Key>;
  Archive: damlTypes.Choice<FlightRequest, pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive, {}, FlightRequest.Key>;
}
export declare const FlightRequest:
  damlTypes.Template<FlightRequest, FlightRequest.Key, 'dee4517467071e8622936e9bc1785b69e5c84cc7a1842d809412b4bd7e2781d4:User:FlightRequest'> & FlightRequestInterface;

export declare namespace FlightRequest {
  export type Key = pkg40f452260bef3f29dede136108fc08a88d5a5250310281067087da6f0baddff7.DA.Types.Tuple2<damlTypes.Party, Flight>
  export type CreateEvent = damlLedger.CreateEvent<FlightRequest, FlightRequest.Key, typeof FlightRequest.templateId>
  export type ArchiveEvent = damlLedger.ArchiveEvent<FlightRequest, typeof FlightRequest.templateId>
  export type Event = damlLedger.Event<FlightRequest, FlightRequest.Key, typeof FlightRequest.templateId>
  export type QueryResult = damlLedger.QueryResult<FlightRequest, FlightRequest.Key, typeof FlightRequest.templateId>
}



export declare type Flight = {
  lat: string;
  lng: string;
  timeStart: string;
  timeEnd: string;
  altitude: string;
};

export declare const Flight:
  damlTypes.Serializable<Flight> & {
  }
;


export declare type GroupMember = {
  org: damlTypes.Party;
  group: damlTypes.Party;
  member: damlTypes.Party;
};

export declare interface GroupMemberInterface {
  Archive: damlTypes.Choice<GroupMember, pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive, {}, GroupMember.Key>;
}
export declare const GroupMember:
  damlTypes.Template<GroupMember, GroupMember.Key, 'dee4517467071e8622936e9bc1785b69e5c84cc7a1842d809412b4bd7e2781d4:User:GroupMember'> & GroupMemberInterface;

export declare namespace GroupMember {
  export type Key = pkg40f452260bef3f29dede136108fc08a88d5a5250310281067087da6f0baddff7.DA.Types.Tuple3<damlTypes.Party, damlTypes.Party, damlTypes.Party>
  export type CreateEvent = damlLedger.CreateEvent<GroupMember, GroupMember.Key, typeof GroupMember.templateId>
  export type ArchiveEvent = damlLedger.ArchiveEvent<GroupMember, typeof GroupMember.templateId>
  export type Event = damlLedger.Event<GroupMember, GroupMember.Key, typeof GroupMember.templateId>
  export type QueryResult = damlLedger.QueryResult<GroupMember, GroupMember.Key, typeof GroupMember.templateId>
}


