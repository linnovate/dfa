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

export declare type Finalize = {
  signer: damlTypes.Party;
};

export declare const Finalize:
  damlTypes.Serializable<Finalize> & {
  }
;


export declare type Sign = {
  signer: damlTypes.Party;
};

export declare const Sign:
  damlTypes.Serializable<Sign> & {
  }
;


export declare type Request = {
  sender: damlTypes.Party;
  admin: damlTypes.Party;
  contract: Contract;
  receivers: damlTypes.Party[];
  signed: damlTypes.Party[];
  content: string;
  status: string;
  geo: pkg40f452260bef3f29dede136108fc08a88d5a5250310281067087da6f0baddff7.DA.Types.Tuple2<damlTypes.Int, damlTypes.Int>;
};

export declare const Request:
  damlTypes.Template<Request, Request.Key, '5546e2cf08b9915486df890c5aa604508b765e12790e5a6abbec3666978bee6f:User:Request'> & {
  Archive: damlTypes.Choice<Request, pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive, {}, Request.Key>;
  Finalize: damlTypes.Choice<Request, Finalize, damlTypes.ContractId<Contract>, Request.Key>;
  Sign: damlTypes.Choice<Request, Sign, damlTypes.ContractId<Request>, Request.Key>;
};

export declare namespace Request {
  export type Key = pkg40f452260bef3f29dede136108fc08a88d5a5250310281067087da6f0baddff7.DA.Types.Tuple2<damlTypes.Party, string>
  export type CreateEvent = damlLedger.CreateEvent<Request, Request.Key, typeof Request.templateId>
  export type ArchiveEvent = damlLedger.ArchiveEvent<Request, typeof Request.templateId>
  export type Event = damlLedger.Event<Request, Request.Key, typeof Request.templateId>
  export type QueryResult = damlLedger.QueryResult<Request, Request.Key, typeof Request.templateId>
}



export declare type SendRequest = {
  receiver: damlTypes.Party;
  receivers: damlTypes.Party[];
  contract: Contract;
  content: string;
  geo: pkg40f452260bef3f29dede136108fc08a88d5a5250310281067087da6f0baddff7.DA.Types.Tuple2<damlTypes.Int, damlTypes.Int>;
};

export declare const SendRequest:
  damlTypes.Serializable<SendRequest> & {
  }
;


export declare type User = {
  username: damlTypes.Party;
  requests: Request[];
};

export declare const User:
  damlTypes.Template<User, User.Key, '5546e2cf08b9915486df890c5aa604508b765e12790e5a6abbec3666978bee6f:User:User'> & {
  Archive: damlTypes.Choice<User, pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive, {}, User.Key>;
  SendRequest: damlTypes.Choice<User, SendRequest, damlTypes.ContractId<User>, User.Key>;
};

export declare namespace User {
  export type Key = damlTypes.Party
  export type CreateEvent = damlLedger.CreateEvent<User, User.Key, typeof User.templateId>
  export type ArchiveEvent = damlLedger.ArchiveEvent<User, typeof User.templateId>
  export type Event = damlLedger.Event<User, User.Key, typeof User.templateId>
  export type QueryResult = damlLedger.QueryResult<User, User.Key, typeof User.templateId>
}



export declare type Contract = {
  signatories: damlTypes.Party[];
};

export declare const Contract:
  damlTypes.Template<Contract, undefined, '5546e2cf08b9915486df890c5aa604508b765e12790e5a6abbec3666978bee6f:User:Contract'> & {
  Archive: damlTypes.Choice<Contract, pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive, {}, undefined>;
};

export declare namespace Contract {
  export type CreateEvent = damlLedger.CreateEvent<Contract, undefined, typeof Contract.templateId>
  export type ArchiveEvent = damlLedger.ArchiveEvent<Contract, typeof Contract.templateId>
  export type Event = damlLedger.Event<Contract, undefined, typeof Contract.templateId>
  export type QueryResult = damlLedger.QueryResult<Contract, undefined, typeof Contract.templateId>
}



export declare type Admin = {
  adminame: damlTypes.Party;
};

export declare const Admin:
  damlTypes.Template<Admin, Admin.Key, '5546e2cf08b9915486df890c5aa604508b765e12790e5a6abbec3666978bee6f:User:Admin'> & {
  Archive: damlTypes.Choice<Admin, pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive, {}, Admin.Key>;
};

export declare namespace Admin {
  export type Key = damlTypes.Party
  export type CreateEvent = damlLedger.CreateEvent<Admin, Admin.Key, typeof Admin.templateId>
  export type ArchiveEvent = damlLedger.ArchiveEvent<Admin, typeof Admin.templateId>
  export type Event = damlLedger.Event<Admin, Admin.Key, typeof Admin.templateId>
  export type QueryResult = damlLedger.QueryResult<Admin, Admin.Key, typeof Admin.templateId>
}


