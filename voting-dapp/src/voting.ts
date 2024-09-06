import {
  CandidateRegistered as CandidateRegisteredEvent,
  VoteCast as VoteCastEvent,
  VoterRegistered as VoterRegisteredEvent
} from "../generated/Voting/Voting"
import {
  CandidateRegistered,
  VoteCast,
  VoterRegistered
} from "../generated/schema"

export function handleCandidateRegistered(
  event: CandidateRegisteredEvent
): void {
  let entity = new CandidateRegistered(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.candidate = event.params.candidate

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleVoteCast(event: VoteCastEvent): void {
  let entity = new VoteCast(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.voter = event.params.voter
  entity.candidate = event.params.candidate
  entity.post = event.params.post

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleVoterRegistered(event: VoterRegisteredEvent): void {
  let entity = new VoterRegistered(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.voter = event.params.voter

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
