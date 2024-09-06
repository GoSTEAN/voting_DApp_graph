import { newMockEvent } from "matchstick-as"
import { ethereum, Address } from "@graphprotocol/graph-ts"
import {
  CandidateRegistered,
  VoteCast,
  VoterRegistered
} from "../generated/Voting/Voting"

export function createCandidateRegisteredEvent(
  candidate: Address
): CandidateRegistered {
  let candidateRegisteredEvent = changetype<CandidateRegistered>(newMockEvent())

  candidateRegisteredEvent.parameters = new Array()

  candidateRegisteredEvent.parameters.push(
    new ethereum.EventParam("candidate", ethereum.Value.fromAddress(candidate))
  )

  return candidateRegisteredEvent
}

export function createVoteCastEvent(
  voter: Address,
  candidate: Address,
  post: i32
): VoteCast {
  let voteCastEvent = changetype<VoteCast>(newMockEvent())

  voteCastEvent.parameters = new Array()

  voteCastEvent.parameters.push(
    new ethereum.EventParam("voter", ethereum.Value.fromAddress(voter))
  )
  voteCastEvent.parameters.push(
    new ethereum.EventParam("candidate", ethereum.Value.fromAddress(candidate))
  )
  voteCastEvent.parameters.push(
    new ethereum.EventParam(
      "post",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(post))
    )
  )

  return voteCastEvent
}

export function createVoterRegisteredEvent(voter: Address): VoterRegistered {
  let voterRegisteredEvent = changetype<VoterRegistered>(newMockEvent())

  voterRegisteredEvent.parameters = new Array()

  voterRegisteredEvent.parameters.push(
    new ethereum.EventParam("voter", ethereum.Value.fromAddress(voter))
  )

  return voterRegisteredEvent
}
