"use strict";
/* eslint-disable-next-line no-unused-vars */
function __export(m) {
/* eslint-disable-next-line no-prototype-builtins */
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable-next-line no-unused-vars */
var jtv = require('@mojotech/json-type-validation');
/* eslint-disable-next-line no-unused-vars */
var damlTypes = require('@daml/types');
/* eslint-disable-next-line no-unused-vars */
var damlLedger = require('@daml/ledger');

var pkg40f452260bef3f29dede136108fc08a88d5a5250310281067087da6f0baddff7 = require('@daml.js/40f452260bef3f29dede136108fc08a88d5a5250310281067087da6f0baddff7');
var pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662 = require('@daml.js/d14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662');


exports.Remove = {
  decoder: damlTypes.lazyMemo(function () { return jtv.object({signer: damlTypes.Party.decoder, }); }),
  encode: function (__typed__) {
  return {
    signer: damlTypes.Party.encode(__typed__.signer),
  };
}
,
};



exports.Disapprove = {
  decoder: damlTypes.lazyMemo(function () { return jtv.object({signer: damlTypes.Party.decoder, }); }),
  encode: function (__typed__) {
  return {
    signer: damlTypes.Party.encode(__typed__.signer),
  };
}
,
};



exports.Finalize = {
  decoder: damlTypes.lazyMemo(function () { return jtv.object({signer: damlTypes.Party.decoder, }); }),
  encode: function (__typed__) {
  return {
    signer: damlTypes.Party.encode(__typed__.signer),
  };
}
,
};



exports.Sign = {
  decoder: damlTypes.lazyMemo(function () { return jtv.object({signer: damlTypes.Party.decoder, }); }),
  encode: function (__typed__) {
  return {
    signer: damlTypes.Party.encode(__typed__.signer),
  };
}
,
};



exports.Request = {
  templateId: '261fa82a29ecdac549180d3f8f06c763df9ee001d96f5537fccbd6dec37a5596:User:Request',
  keyDecoder: damlTypes.lazyMemo(function () { return damlTypes.lazyMemo(function () { return pkg40f452260bef3f29dede136108fc08a88d5a5250310281067087da6f0baddff7.DA.Types.Tuple2(damlTypes.Party, damlTypes.Text).decoder; }); }),
  keyEncode: function (__typed__) { return pkg40f452260bef3f29dede136108fc08a88d5a5250310281067087da6f0baddff7.DA.Types.Tuple2(damlTypes.Party, damlTypes.Text).encode(__typed__); },
  decoder: damlTypes.lazyMemo(function () { return jtv.object({sender: damlTypes.Party.decoder, admin: damlTypes.Party.decoder, contract: exports.Contract.decoder, receivers: damlTypes.List(damlTypes.Party).decoder, signed: damlTypes.List(damlTypes.Party).decoder, disapproved: damlTypes.List(damlTypes.Party).decoder, content: damlTypes.Text.decoder, status: damlTypes.Text.decoder, geo: pkg40f452260bef3f29dede136108fc08a88d5a5250310281067087da6f0baddff7.DA.Types.Tuple2(damlTypes.Int, damlTypes.Int).decoder, }); }),
  encode: function (__typed__) {
  return {
    sender: damlTypes.Party.encode(__typed__.sender),
    admin: damlTypes.Party.encode(__typed__.admin),
    contract: exports.Contract.encode(__typed__.contract),
    receivers: damlTypes.List(damlTypes.Party).encode(__typed__.receivers),
    signed: damlTypes.List(damlTypes.Party).encode(__typed__.signed),
    disapproved: damlTypes.List(damlTypes.Party).encode(__typed__.disapproved),
    content: damlTypes.Text.encode(__typed__.content),
    status: damlTypes.Text.encode(__typed__.status),
    geo: pkg40f452260bef3f29dede136108fc08a88d5a5250310281067087da6f0baddff7.DA.Types.Tuple2(damlTypes.Int, damlTypes.Int).encode(__typed__.geo),
  };
}
,
  Archive: {
    template: function () { return exports.Request; },
    choiceName: 'Archive',
    argumentDecoder: damlTypes.lazyMemo(function () { return pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive.decoder; }),
    argumentEncode: function (__typed__) { return pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.Unit.decoder; }),
    resultEncode: function (__typed__) { return damlTypes.Unit.encode(__typed__); },
  },
  Remove: {
    template: function () { return exports.Request; },
    choiceName: 'Remove',
    argumentDecoder: damlTypes.lazyMemo(function () { return exports.Remove.decoder; }),
    argumentEncode: function (__typed__) { return exports.Remove.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.Unit.decoder; }),
    resultEncode: function (__typed__) { return damlTypes.Unit.encode(__typed__); },
  },
  Disapprove: {
    template: function () { return exports.Request; },
    choiceName: 'Disapprove',
    argumentDecoder: damlTypes.lazyMemo(function () { return exports.Disapprove.decoder; }),
    argumentEncode: function (__typed__) { return exports.Disapprove.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.ContractId(exports.Request).decoder; }),
    resultEncode: function (__typed__) { return damlTypes.ContractId(exports.Request).encode(__typed__); },
  },
  Finalize: {
    template: function () { return exports.Request; },
    choiceName: 'Finalize',
    argumentDecoder: damlTypes.lazyMemo(function () { return exports.Finalize.decoder; }),
    argumentEncode: function (__typed__) { return exports.Finalize.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.ContractId(exports.Contract).decoder; }),
    resultEncode: function (__typed__) { return damlTypes.ContractId(exports.Contract).encode(__typed__); },
  },
  Sign: {
    template: function () { return exports.Request; },
    choiceName: 'Sign',
    argumentDecoder: damlTypes.lazyMemo(function () { return exports.Sign.decoder; }),
    argumentEncode: function (__typed__) { return exports.Sign.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.ContractId(exports.Request).decoder; }),
    resultEncode: function (__typed__) { return damlTypes.ContractId(exports.Request).encode(__typed__); },
  },
};


damlTypes.registerTemplate(exports.Request);



exports.SendRequest = {
  decoder: damlTypes.lazyMemo(function () { return jtv.object({receiver: damlTypes.Party.decoder, receivers: damlTypes.List(damlTypes.Party).decoder, contract: exports.Contract.decoder, content: damlTypes.Text.decoder, geo: pkg40f452260bef3f29dede136108fc08a88d5a5250310281067087da6f0baddff7.DA.Types.Tuple2(damlTypes.Int, damlTypes.Int).decoder, }); }),
  encode: function (__typed__) {
  return {
    receiver: damlTypes.Party.encode(__typed__.receiver),
    receivers: damlTypes.List(damlTypes.Party).encode(__typed__.receivers),
    contract: exports.Contract.encode(__typed__.contract),
    content: damlTypes.Text.encode(__typed__.content),
    geo: pkg40f452260bef3f29dede136108fc08a88d5a5250310281067087da6f0baddff7.DA.Types.Tuple2(damlTypes.Int, damlTypes.Int).encode(__typed__.geo),
  };
}
,
};



exports.User = {
  templateId: '261fa82a29ecdac549180d3f8f06c763df9ee001d96f5537fccbd6dec37a5596:User:User',
  keyDecoder: damlTypes.lazyMemo(function () { return damlTypes.lazyMemo(function () { return damlTypes.Party.decoder; }); }),
  keyEncode: function (__typed__) { return damlTypes.Party.encode(__typed__); },
  decoder: damlTypes.lazyMemo(function () { return jtv.object({username: damlTypes.Party.decoder, requests: damlTypes.List(exports.Request).decoder, }); }),
  encode: function (__typed__) {
  return {
    username: damlTypes.Party.encode(__typed__.username),
    requests: damlTypes.List(exports.Request).encode(__typed__.requests),
  };
}
,
  Archive: {
    template: function () { return exports.User; },
    choiceName: 'Archive',
    argumentDecoder: damlTypes.lazyMemo(function () { return pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive.decoder; }),
    argumentEncode: function (__typed__) { return pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.Unit.decoder; }),
    resultEncode: function (__typed__) { return damlTypes.Unit.encode(__typed__); },
  },
  SendRequest: {
    template: function () { return exports.User; },
    choiceName: 'SendRequest',
    argumentDecoder: damlTypes.lazyMemo(function () { return exports.SendRequest.decoder; }),
    argumentEncode: function (__typed__) { return exports.SendRequest.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.ContractId(exports.User).decoder; }),
    resultEncode: function (__typed__) { return damlTypes.ContractId(exports.User).encode(__typed__); },
  },
};


damlTypes.registerTemplate(exports.User);



exports.Contract = {
  templateId: '261fa82a29ecdac549180d3f8f06c763df9ee001d96f5537fccbd6dec37a5596:User:Contract',
  keyDecoder: damlTypes.lazyMemo(function () { return jtv.constant(undefined); }),
  keyEncode: function () { throw 'EncodeError'; },
  decoder: damlTypes.lazyMemo(function () { return jtv.object({signatories: damlTypes.List(damlTypes.Party).decoder, }); }),
  encode: function (__typed__) {
  return {
    signatories: damlTypes.List(damlTypes.Party).encode(__typed__.signatories),
  };
}
,
  Archive: {
    template: function () { return exports.Contract; },
    choiceName: 'Archive',
    argumentDecoder: damlTypes.lazyMemo(function () { return pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive.decoder; }),
    argumentEncode: function (__typed__) { return pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.Unit.decoder; }),
    resultEncode: function (__typed__) { return damlTypes.Unit.encode(__typed__); },
  },
};


damlTypes.registerTemplate(exports.Contract);



exports.Admin = {
  templateId: '261fa82a29ecdac549180d3f8f06c763df9ee001d96f5537fccbd6dec37a5596:User:Admin',
  keyDecoder: damlTypes.lazyMemo(function () { return damlTypes.lazyMemo(function () { return damlTypes.Party.decoder; }); }),
  keyEncode: function (__typed__) { return damlTypes.Party.encode(__typed__); },
  decoder: damlTypes.lazyMemo(function () { return jtv.object({adminame: damlTypes.Party.decoder, }); }),
  encode: function (__typed__) {
  return {
    adminame: damlTypes.Party.encode(__typed__.adminame),
  };
}
,
  Archive: {
    template: function () { return exports.Admin; },
    choiceName: 'Archive',
    argumentDecoder: damlTypes.lazyMemo(function () { return pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive.decoder; }),
    argumentEncode: function (__typed__) { return pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.Unit.decoder; }),
    resultEncode: function (__typed__) { return damlTypes.Unit.encode(__typed__); },
  },
};


damlTypes.registerTemplate(exports.Admin);

