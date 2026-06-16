## Hit Point Regeneration Rate

The hit point regeneration rate depends on a character's **maximum hit points** and **active HP regeneration effects** (HP regeneration state). If a character contracts **mummy rot**, it will stop or drastically decrease hit point regeneration, even killing the character over time.

Different HP regeneration effects don't stack. The game will always use the best one.

| HP Regeneration State | Hit Points Regenerated per Turn | With Mummy Rot |
| :-------------------- | :-----------------------------: | :------------: |
| Default | $\text{Maximum Hit Points}/320$ | $-1\times\text{Maximum Hit Points}/960$ |
| Regeneration | $\text{Maximum Hit Points}/160$ | $0$ |
| Rapid Regeneration | $\text{Maximum Hit Points}/80$ | $+1$ |
| Rapider Regeneration | $\text{Maximum Hit Points}/40$ | $+2$ |
| Rapidest Regeneration | $\text{Maximum Hit Points}/20$ | $+3$ |
| Divine Regeneration | $\text{Maximum Hit Points}/10$ | $+4$ |


## Mana Regeneration Rate

The mana regeneration rate depends on a character's **maximum mana** and **active energy/mana regeneration effects** (mana regeneration state).

Different mana regeneration effects don't stack. The game will always use the best one.

| Mana Regeneration State | Mana Regenerated per Turn |
| :---------------------- | :-----------------------: |
| Default | $\text{Maximum Mana}/240$ |
| Energy Regeneration | $\text{Maximum Mana}/120$ |
| Rapid Energy Regeneration | $\text{Maximum Mana}/60$ |
| Rapider Energy Regeneration | $\text{Maximum Mana}/30$ |
| Rapidest Energy Regeneration | $\text{Maximum Mana}/15$ |
