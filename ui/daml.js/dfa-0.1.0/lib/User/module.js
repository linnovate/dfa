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


exports.CreateRequest = {
  decoder: damlTypes.lazyMemo(function () { return jtv.object({flight: exports.Flight.decoder, }); }),
  encode: function (__typed__) {
  return {
    flight: exports.Flight.encode(__typed__.flight),
  };
}
,
};



exports.User = {
  templateId: 'dee4517467071e8622936e9bc1785b69e5c84cc7a1842d809412b4bd7e2781d4:User:User',
  keyDecoder: damlTypes.lazyMemo(function () { return damlTypes.lazyMemo(function () { return damlTypes.Party.decoder; }); }),
  keyEncode: function (__typed__) { return damlTypes.Party.encode(__typed__); },
  decoder: damlTypes.lazyMemo(function () { return jtv.object({username: damlTypes.Party.decoder, parties: damlTypes.List(damlTypes.Party).decoder, }); }),
  encode: function (__typed__) {
  return {
    username: damlTypes.Party.encode(__typed__.username),
    parties: damlTypes.List(damlTypes.Party).encode(__typed__.parties),
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
  CreateRequest: {
    template: function () { return exports.User; },
    choiceName: 'CreateRequest',
    argumentDecoder: damlTypes.lazyMemo(function () { return exports.CreateRequest.decoder; }),
    argumentEncode: function (__typed__) { return exports.CreateRequest.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.ContractId(exports.User).decoder; }),
    resultEncode: function (__typed__) { return damlTypes.ContractId(exports.User).encode(__typed__); },
  },
};


damlTypes.registerTemplate(exports.User);



exports.CompletedRequest = {
  templateId: 'dee4517467071e8622936e9bc1785b69e5c84cc7a1842d809412b4bd7e2781d4:User:CompletedRequest',
  keyDecoder: damlTypes.lazyMemo(function () { return jtv.constant(undefined); }),
  keyEncode: function () { throw 'EncodeError'; },
  decoder: damlTypes.lazyMemo(function () { return jtv.object({user: damlTypes.Party.decoder, parties: damlTypes.List(damlTypes.Party).decoder, approvers: damlTypes.List(damlTypes.Party).decoder, disapprovers: damlTypes.List(damlTypes.Party).decoder, flight: exports.Flight.decoder, }); }),
  encode: function (__typed__) {
  return {
    user: damlTypes.Party.encode(__typed__.user),
    parties: damlTypes.List(damlTypes.Party).encode(__typed__.parties),
    approvers: damlTypes.List(damlTypes.Party).encode(__typed__.approvers),
    disapprovers: damlTypes.List(damlTypes.Party).encode(__typed__.disapprovers),
    flight: exports.Flight.encode(__typed__.flight),
  };
}
,
  Archive: {
    template: function () { return exports.CompletedRequest; },
    choiceName: 'Archive',
    argumentDecoder: damlTypes.lazyMemo(function () { return pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive.decoder; }),
    argumentEncode: function (__typed__) { return pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.Unit.decoder; }),
    resultEncode: function (__typed__) { return damlTypes.Unit.encode(__typed__); },
  },
};


damlTypes.registerTemplate(exports.CompletedRequest);



exports.Disapproved = {
  decoder: damlTypes.lazyMemo(function () { return jtv.object({disapprover: damlTypes.Party.decoder, }); }),
  encode: function (__typed__) {
  return {
    disapprover: damlTypes.Party.encode(__typed__.disapprover),
  };
}
,
};



exports.Approved = {
  decoder: damlTypes.lazyMemo(function () { return jtv.object({approver: damlTypes.Party.decoder, }); }),
  encode: function (__typed__) {
  return {
    approver: damlTypes.Party.encode(__typed__.approver),
  };
}
,
};



exports.FlightRequest = {
  templateId: 'dee4517467071e8622936e9bc1785b69e5c84cc7a1842d809412b4bd7e2781d4:User:FlightRequest',
  keyDecoder: damlTypes.lazyMemo(function () { return damlTypes.lazyMemo(function () { return pkg40f452260bef3f29dede136108fc08a88d5a5250310281067087da6f0baddff7.DA.Types.Tuple2(damlTypes.Party, exports.Flight).decoder; }); }),
  keyEncode: function (__typed__) { return pkg40f452260bef3f29dede136108fc08a88d5a5250310281067087da6f0baddff7.DA.Types.Tuple2(damlTypes.Party, exports.Flight).encode(__typed__); },
  decoder: damlTypes.lazyMemo(function () { return jtv.object({user: damlTypes.Party.decoder, parties: damlTypes.List(damlTypes.Party).decoder, approvers: damlTypes.List(damlTypes.Party).decoder, disapprovers: damlTypes.List(damlTypes.Party).decoder, flight: exports.Flight.decoder, }); }),
  encode: function (__typed__) {
  return {
    user: damlTypes.Party.encode(__typed__.user),
    parties: damlTypes.List(damlTypes.Party).encode(__typed__.parties),
    approvers: damlTypes.List(damlTypes.Party).encode(__typed__.approvers),
    disapprovers: damlTypes.List(damlTypes.Party).encode(__typed__.disapprovers),
    flight: exports.Flight.encode(__typed__.flight),
  };
}
,
  Approved: {
    template: function () { return exports.FlightRequest; },
    choiceName: 'Approved',
    argumentDecoder: damlTypes.lazyMemo(function () { return exports.Approved.decoder; }),
    argumentEncode: function (__typed__) { return exports.Approved.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.Unit.decoder; }),
    resultEncode: function (__typed__) { return damlTypes.Unit.encode(__typed__); },
  },
  Disapproved: {
    template: function () { return exports.FlightRequest; },
    choiceName: 'Disapproved',
    argumentDecoder: damlTypes.lazyMemo(function () { return exports.Disapproved.decoder; }),
    argumentEncode: function (__typed__) { return exports.Disapproved.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.Unit.decoder; }),
    resultEncode: function (__typed__) { return damlTypes.Unit.encode(__typed__); },
  },
  Archive: {
    template: function () { return exports.FlightRequest; },
    choiceName: 'Archive',
    argumentDecoder: damlTypes.lazyMemo(function () { return pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive.decoder; }),
    argumentEncode: function (__typed__) { return pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.Unit.decoder; }),
    resultEncode: function (__typed__) { return damlTypes.Unit.encode(__typed__); },
  },
};


damlTypes.registerTemplate(exports.FlightRequest);



exports.Flight = {
  decoder: damlTypes.lazyMemo(function () { return jtv.object({lat: damlTypes.Text.decoder, lng: damlTypes.Text.decoder, timeStart: damlTypes.Text.decoder, timeEnd: damlTypes.Text.decoder, altitude: damlTypes.Text.decoder, }); }),
  encode: function (__typed__) {
  return {
    lat: damlTypes.Text.encode(__typed__.lat),
    lng: damlTypes.Text.encode(__typed__.lng),
    timeStart: damlTypes.Text.encode(__typed__.timeStart),
    timeEnd: damlTypes.Text.encode(__typed__.timeEnd),
    altitude: damlTypes.Text.encode(__typed__.altitude),
  };
}
,
};



exports.GroupMember = {
  templateId: 'dee4517467071e8622936e9bc1785b69e5c84cc7a1842d809412b4bd7e2781d4:User:GroupMember',
  keyDecoder: damlTypes.lazyMemo(function () { return damlTypes.lazyMemo(function () { return pkg40f452260bef3f29dede136108fc08a88d5a5250310281067087da6f0baddff7.DA.Types.Tuple3(damlTypes.Party, damlTypes.Party, damlTypes.Party).decoder; }); }),
  keyEncode: function (__typed__) { return pkg40f452260bef3f29dede136108fc08a88d5a5250310281067087da6f0baddff7.DA.Types.Tuple3(damlTypes.Party, damlTypes.Party, damlTypes.Party).encode(__typed__); },
  decoder: damlTypes.lazyMemo(function () { return jtv.object({org: damlTypes.Party.decoder, group: damlTypes.Party.decoder, member: damlTypes.Party.decoder, }); }),
  encode: function (__typed__) {
  return {
    org: damlTypes.Party.encode(__typed__.org),
    group: damlTypes.Party.encode(__typed__.group),
    member: damlTypes.Party.encode(__typed__.member),
  };
}
,
  Archive: {
    template: function () { return exports.GroupMember; },
    choiceName: 'Archive',
    argumentDecoder: damlTypes.lazyMemo(function () { return pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive.decoder; }),
    argumentEncode: function (__typed__) { return pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662.DA.Internal.Template.Archive.encode(__typed__); },
    resultDecoder: damlTypes.lazyMemo(function () { return damlTypes.Unit.decoder; }),
    resultEncode: function (__typed__) { return damlTypes.Unit.encode(__typed__); },
  },
};


damlTypes.registerTemplate(exports.GroupMember);

