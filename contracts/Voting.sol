// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

enum Posts {
    President,
    VicePresident,
    Pro1,
    Pro2,
    Dos1,
    Dos2,
    FinSec,
    Treasurer,
    Welfare
}

struct Candidate {
    address id;
    string name;
    Posts post;
    uint32 voteCount;
}

struct Voter {
    address id;
    string name;
    uint256 level;
    string matno;
    bool hasVoted; 
}

contract Voting  {
    mapping(address => Voter) private voters;
    mapping(address => Candidate) private candidates;
    mapping(string => bool) private usedMatNumbers;

    uint256 public totalVoteCount = 0;
    uint256 public totalParticipant = 0;

    event VoterRegistered(address indexed voter);
    event CandidateRegistered(address indexed candidate);
    event VoteCast(address indexed voter, address indexed candidate, Posts post);

    modifier validAddress(address _addr) {
        require(_addr != address(0), "Invalid address");
        _;
    }

    function registerVoter(address _id, string calldata _name,   uint256 _level, 
        string calldata _matno) external validAddress(_id) {
        require(voters[_id].id == address(0), "Voter already registered");
        require(!usedMatNumbers[_matno], "Matriculation number already used");

        Voter memory voter = Voter({
          id: _id,
          name: _name,
          level: _level,
          matno: _matno,
          hasVoted: false
        });   
        voters[_id] = voter;

        usedMatNumbers[_matno] = true;
        totalParticipant++;

        emit VoterRegistered(_id);
    }

    function registerCandidate(
        address _id,
        string calldata _name,
        string calldata _matno,
        uint256 _level, 
        Posts _post
    ) external validAddress(_id) {
        require(candidates[_id].id == address(0), "Candidate already registered");
        require(voters[_id].id == _id, "Voter must be registered first");
        require(!usedMatNumbers[_matno], "Matriculation number already used");
        require(voters[_id].level == _level, "Level does not match");   

        Candidate memory candidate = Candidate({
            id: _id,
            name: _name,
            post: _post,
            voteCount: 0
        });      
        usedMatNumbers[_matno] = true;
        candidates[_id] = candidate;


        emit CandidateRegistered(_id);
    }

    function vote(address _candidateAddr, Posts _post) external {
        Voter storage voter = voters[msg.sender];
        require(voter.id == msg.sender, "You must register as a voter first");
        require(!voter.hasVoted, "You have already voted");

        Candidate storage candidate = candidates[_candidateAddr];
        require(candidate.id != address(0), "Invalid candidate");
        require(candidate.post == _post, "Candidate not running for this post");

        candidate.voteCount++;
        voter.hasVoted = true;
        totalVoteCount++;

        emit VoteCast(msg.sender, _candidateAddr, _post);
    }

    function getCandidateVoteCount(address _candidateAddr) external view returns (uint256) {
        return candidates[_candidateAddr].voteCount;
    }

    function getTotalParticipants() external view returns (uint256) {
        return totalParticipant;
    }
}