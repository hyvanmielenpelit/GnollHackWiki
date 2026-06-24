## Hit Point Regeneration Rate

The hit point regeneration rate depends on a character's **maximum hit points** and **active HP regeneration effects** (HP regeneration state). If a character contracts **mummy rot**, it will stop or drastically decrease hit point regeneration, even killing the character over time.

Different HP regeneration effects don't stack. The game will always use the best one.

> ℹ️ **Note:** The game determines your regeneration rate by first calculating how many turns it will take to heal to full health (**Turns to Full**). Your exact hit points regenerated per turn is then calculated as `Maximum Hit Points / Turns to Full`. Because the "Turns to Full" calculation rounds down (integer division), the exact regeneration rate fluctuates slightly as your maximum hit points increase, and provides a much higher baseline rate at low hit points than a simple fraction would suggest.

| HP Regeneration State | Turns to Full Health | Approx. HP Regenerated per Turn | With Mummy Rot |
| :-------------------- | :------------------: | :-----------------------------: | :------------: |
| Default | $320$ | $\text{Max HP} / 320$ | $-\text{Max HP} / 960$ |
| Regeneration | $\max(1, \min(\lfloor\text{Max HP}\rfloor, 160))$ | $\approx \max(1, \text{Max HP}/160)$ | $0$ |
| Rapid Regeneration | $\max(1, \min(\lfloor\text{Max HP}/2\rfloor, 80))$ | $\approx \max(2, \text{Max HP}/80)$ | $+1$ |
| Rapider Regeneration | $\max(1, \min(\lfloor\text{Max HP}/4\rfloor, 40))$ | $\approx \max(4, \text{Max HP}/40)$ | $+2$ |
| Rapidest Regeneration | $\max(1, \min(\lfloor\text{Max HP}/8\rfloor, 20))$ | $\approx \max(8, \text{Max HP}/20)$ | $+3$ |
| Divine Regeneration | $\max(1, \min(\lfloor\text{Max HP}/16\rfloor, 10))$ | $\approx \max(16, \text{Max HP}/10)$ | $+4$ |


## Mana Regeneration Rate

The mana regeneration rate depends on a character's **maximum mana** and **active energy/mana regeneration effects** (mana regeneration state).

Different mana regeneration effects don't stack. The game will always use the best one.

> ℹ️ **Note:** Similar to hit points, the game calculates a **Turns to Full Mana** value using integer division.

| Mana Regeneration State | Turns to Full Mana | Approx. Mana Regenerated per Turn |
| :---------------------- | :----------------: | :-------------------------------: |
| Default | $240$ | $\text{Max Mana} / 240$ |
| Energy Regeneration | $\max(1, \min(\lfloor 2 \times \text{Max Mana}/3 \rfloor, 120))$ | $\approx \max(1.5, \text{Max Mana}/120)$ |
| Rapid Energy Regeneration | $\max(1, \min(\lfloor\text{Max Mana}/3\rfloor, 60))$ | $\approx \max(3, \text{Max Mana}/60)$ |
| Rapider Energy Regeneration | $\max(1, \min(\lfloor\text{Max Mana}/6\rfloor, 30))$ | $\approx \max(6, \text{Max Mana}/30)$ |
| Rapidest Energy Regeneration | $\max(1, \min(\lfloor\text{Max Mana}/12\rfloor, 15))$ | $\approx \max(12, \text{Max Mana}/15)$ |
