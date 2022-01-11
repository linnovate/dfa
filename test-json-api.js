
// ----------------------------------------------------- //
// ------------------- Participant 1 ------------------- //
// ----------------------------------------------------- //


/*
 * Payload (generate by: https://jwt.io)
 */
let payload1 = {
  "https://daml.com/ledger-api": {
    "ledgerId": "participant1",
    "applicationId": "dfa-sandbox",
    "actAs": [
      "Admin::12202cc390fc1ea1470c2d61b903156644861d23bee1717deb7acc5514b0866bb1dd",
      "Hamal::12202cc390fc1ea1470c2d61b903156644861d23bee1717deb7acc5514b0866bb1dd"
    ]
  }
}


/*
 * Token
 */
let token1 = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwczovL2RhbWwuY29tL2xlZGdlci1hcGkiOnsibGVkZ2VySWQiOiJwYXJ0aWNpcGFudDEiLCJhcHBsaWNhdGlvbklkIjoiZGZhLXNhbmRib3giLCJhZG1pbiI6dHJ1ZSwiYWN0QXMiOlsiQWRtaW46OjEyMjAyY2MzOTBmYzFlYTE0NzBjMmQ2MWI5MDMxNTY2NDQ4NjFkMjNiZWUxNzE3ZGViN2FjYzU1MTRiMDg2NmJiMWRkIl19fQ._g04BZO7Ii3A7s0YrcoRS4Df8bciP9K3bMaaXZBRgKM"


/*
 * Parties
 */
let parties1 = () => fetch('http://localhost:4000/v1/parties', {
  method: 'GET',
  headers: {
    "Authorization": `Bearer ${token1}`,
    'Content-Type': 'application/json'
  },
})
.then(res => res.json())
.then(res => console.log(res));


/*
 * Add Parties
 */
let addParty1 = (name) => fetch('http://localhost:4000/v1/parties/allocate', {
  method: 'POST',
  headers: {
    "Authorization": `Bearer ${token1}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    "identifierHint": name,
    "displayName": name
  })
})
.then(res => res.json())
.then(res => console.log(res));


/*
 * Create
 */
let create1 = () => fetch('http://localhost:4000/v1/create', {
  method: 'POST',
  headers: {
    "Authorization": `Bearer ${token1}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ templateId: 'User:GroupMember', payload: {
   org: "Admin::12202cc390fc1ea1470c2d61b903156644861d23bee1717deb7acc5514b0866bb1dd",
   group: "test 1",
   member: "User::12205e22f04af67eb6175093b26498c29d3d1b3489982523d4c4bbc7a0cde70e0423",
  } })
})
.then(res => res.json())
.then(res => console.log(res));


/*
 * Query
 */
let query1 = () => fetch('http://localhost:4000/v1/query', {
  method: 'POST',
  headers: {
    "Authorization": `Bearer ${token1}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ templateIds: ['User:GroupMember'] })
})
.then(res => res.json())
.then(res => console.log(res));


// ----------------------------------------------------- //
// ------------------- Participant 2 ------------------- //
// ----------------------------------------------------- //


/*
 * Payload (generate by: https://jwt.io)
 */
let payload2 = {
  "https://daml.com/ledger-api": {
    "ledgerId": "participant2",
    "applicationId": "dfa-sandbddox",
    "actAs": ["User::12205e22f04af67eb6175093b26498c29d3d1b3489982523d4c4bbc7a0cde70e0423"]
  }
}


/*
 * Token
 */
let token2 = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwczovL2RhbWwuY29tL2xlZGdlci1hcGkiOnsibGVkZ2VySWQiOiJwYXJ0aWNpcGFudDIiLCJhcHBsaWNhdGlvbklkIjoiZGZhLXNhbmRiZHNzZG94IiwiYWN0QXMiOlsiVXNlcjo6MTIyMDVlMjJmMDRhZjY3ZWI2MTc1MDkzYjI2NDk4YzI5ZDNkMWIzNDg5OTgyNTIzZDRjNGJiYzdhMGNkZTcwZTA0MjMiXX19.5hd8T-D-yJDU2Ce8vEKhEL-XWu6bS1JWbq_B5U59C8E"


/*
 * Parties
 */
let parties2 = () => fetch('http://localhost:4001/v1/parties', {
  method: 'GET',
  headers: {
    "Authorization": `Bearer ${token2}`,
    'Content-Type': 'application/json'
  },
})
.then(res => res.json())
.then(res => console.log(res));


/*
 * Add Parties
 */
let addParty2 = (name) => fetch('http://localhost:4001/v1/parties/allocate', {
  method: 'POST',
  headers: {
    "Authorization": `Bearer ${token2}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    "identifierHint": name,
    "displayName": name
  })
})
.then(res => res.json())
.then(res => console.log(res));


/*
 * Create
 */
let create2 = () => fetch('http://localhost:4001/v1/create', {
  method: 'POST',
  headers: {
    "Authorization": `Bearer ${token2}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ templateId: 'User:GroupMember', payload: {
   org: "User::12205e22f04af67eb6175093b26498c29d3d1b3489982523d4c4bbc7a0cde70e0423",
   group: "test 2",
   member: "Admin::12202cc390fc1ea1470c2d61b903156644861d23bee1717deb7acc5514b0866bb1dd",
  } })
})
.then(res => res.json())
.then(res => console.log(res));


/*
 * Query
 */
let query2 = () => fetch('http://localhost:4001/v1/query', {
  method: 'POST',
  headers: {
    "Authorization": `Bearer ${token2}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ templateIds: ['User:GroupMember'] })
})
.then(res => res.json())
.then(res => console.log(res));

