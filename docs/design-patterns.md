# Four Design Patterns Used:

In my project, I have inherited from OpenZeppelin's contract library which is built on a solid foundation of community-vetted code.

This has provided me with implementations of standards like ERC721 and a flexible role-based permissioning (access control) scheme.

## 1. ERC721

```
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
```

This core set of contracts is designed to be unopinionated, allowing developers to access the internal functions in ERC721 (such as safeMint) and expose them as external functions in the way they prefer.

## 2. Pausable

```
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Pausable.sol";
```

ERC20 token with pausable token transfers, minting and burning.

Useful for scenarios such as preventing trades until the end of an evaluation period, or having an emergency switch for freezing all token transfers in the event of a large bug.

## 3. Ownable

```
import "@openzeppelin/contracts/access/Ownable.sol";
```

Contract module which provides a basic access control mechanism, where there is an account (an owner) that can be granted exclusive access to specific functions.

By default, the owner account will be the one that deploys the contract. This can later be changed with transferOwnership.

This module is used through inheritance. It will make available the modifier onlyOwner, which can be applied to functions to restrict their use to the owner.