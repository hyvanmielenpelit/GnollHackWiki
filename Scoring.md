![scoring](/uploads/Scoring/scoring.webp)

## 1. Overview

The score determines how well your GnollHack run went. The scoring system in GnollHack differs greatly from that of NetHack.

### 1.1. You Gain Score From

In GnollHack, you get score from the following things:

1. **Delving deeper into the dungeon** — The deepest level you have reached
2. **Achievements** — Such as obtaining [[/Artifacts/the Gladstone]] from Mines' End
3. **Small achievements** — Such as visiting a shop
4. **Difficulty level** — The higher difficulty levels give out more score

Additionally, if you ascend, you get score from:

5. **Conducts** — Such as being vegetarian
6. Role-specific achievement and mechanic (_see below_)
7. **Low turn count** — The faster you ascend the more score you get

The scoring system has been designed so that your current score can be shown at all times in the status bar.

### 1.2. You Do Not Gain Score From

Contrary to NetHack, you do not get score from:

1. Artifacts — Unless you have [[/Roles/Archaeologist]].
2. Amulets — Unless you have [[/Roles/Caveman]].
3. Gold pieces — Unless you have [[/Roles/Rogue]].
4. Gems — Unless you have [[/Roles/Rogue]].

## 2. Calculating Score

The score is calculated as follows:

$Score = BaseScore \times AscensionMultiplier \times DifficultyMultiplier \times ModernMultiplier$

### 2.1. Base Score

$$
\begin{aligned}
BaseScore & = (MaxDungeonLevel - 1) \times 1000\\
& + AchievementCount \times 50000\\
& + SmallAchievementCount \times 5000\\
& + ConductScore \times 10000\\
& + RoleScore
\end{aligned}
$$

- $MaxDungeonLevel$ is the maximum dungeon depth the character has reached
- $AchievementCount$ is the number of achievements
- $SmallAchievementCount$ is the number of small achievements
- $ConductScore$ is the sum of conduct values *([[see below|#2-3-conduct-score]])*

#### 2.1.1. Role Score

$RoleScore = RoleAchievementScore + RoleSpecificScore$

- $RoleAchievementScore$ is the score gained from completing the role's optional quest
- $RoleSpecificScore$ is the score earned via a role-specific mechanic *([[see below|#2-6-role-specific-scores]])*

$RoleScore$ is capped at 600000 *(worth 12 achievements)*.

### 2.2. Ascension Multiplier

$AscensionMultiplier=$
- **If ascension failed:** $1$
- **If ascension succeeded:** $4 \times TurnCountMultiplier$ *(capped at maximum of 16 and minimum of 2)*

#### 2.2.1. Turn Count Multiplier

$TurnCountMultiplier = {50000\over\sqrt{TurnCount}}$

- $TurnCount$ = The turn when you ascended.

Turn Count Multiplier is 1, if you ascended on turn 50000. It is capped at 4 and 0.5.

- Minimum turn count multiplier is 0.5 at 200000 turns.
- Maximum turn count multiplier is 4 at 3125 turns.

This means that you do not lose score from ascensions slower than 200000 turns, and you do not gain score from ascensions faster than 3125 turns.

### 2.3. Conduct Score

$ConductScore=$
- If you did not ascend: 0
- If you ascended, the sum of the following values:
    - [[/Conducts/Foodless]]: 50
    - [[/Conducts/Vegan]]: 10
    - [[/Conducts/Vegetarian]]: 10
    - [[/Conducts/Atheist]]: 15
    - [[/Conducts/Pacifist]]: 60
    - [[/Conducts/Never hit with a wielded weapon]]: 5
    - [[/Conducts/Illiterate]]: 30
    - [[/Conducts/Never polymorphed an object]]: 2
    - [[/Conducts/Never change a form]]: 2
    - [[/Conducts/Genocideless]]: 15
    - [[/Conducts/Wishless]]: 15
    - [[/Conducts/Artifact Wishless]]: 5
    - [[/Conducts/Zen]]: 80
    - [[/Conducts/Nudist]]: 60
    - [[/Conducts/Elberethless]]: 10
    - [[/Conducts/Conflictless]]: 15
    - [[/Conducts/Boneless]]: 2
    - [[/Conducts/Petless]]: 2
    - Temporary alignment change: -20 *(e.g. [[/Items/Helm of Opposite Alignment]])*
    - Permanent alignment change: -20 *(conversion)*

### 2.4. Difficulty Multiplier

$DifficultyMultiplier = ((10^\frac14)^{DifficultyLevel})^2$

or more concisely

$DifficultyMultiplier = (\sqrt{10})^{DifficultyLevel}$

$DifficultyLevel$ is:

| Difficulty | Difficulty<br />Level<br />Value |
| :--------- | :------------------------------: |
| **Standard** | -4 |
| **Experienced** | -3 |
| **Adept** | -2 |
| **Veteran** | -1 |
| **Expert** | 0 |
| **Master** | 1 |
| **Grand Master** | 2 |

Note that $10^\frac14 = 1.7783$, which comes from the monster damage multiplier of $1.3$ per difficulty level and the monster hit point multiplier of ${1.7783\over1.3} = 1.3679$ per difficulty level. We have chosen to use this total multiplier to get nicely rounded scores for non-ascensions on Standard, Adept, Expert, and Grand Master difficulties.

$DifficultyMultiplier$ is the following on different difficulties:

| Difficulty | Difficulty<br />Multiplier | Formula |
| :--------- | :------------------------- | :------ |
| **Standard** | 0.01 | $10^{-2} = {1\over100}$ |
| **Experienced** | 0.03162 | $10^{-{3\over2}}$ |
| **Adept** | 0.1 | $10^{-1} = {1\over10}$ |
| **Veteran** | 0.3162 | $10^{-\frac12} = {1\over{\sqrt{10}}}$ |
| **Expert** | 1.0 | $10^0$ |
| **Master** | 3.162 | $10^\frac12 = \sqrt{10}$ |
| **Grand Master** | 10.0 | $10^1$ |

### 2.5 Modern Mode Multiplier

Until 2 deaths, $ModernMultiplier$ penalizes each character death by dividing the score by 3. Beyond 2 deaths, it becomes linear so that 3rd death divides the score further by 2, and 4th by 3 (instead of 2), 5th by 4 (instead of 3), and so on.

$ModernMultiplier =$
- **If Number_of_Deaths ≤ 2:** ${1\over{3^{(1 + NumberOfDeaths)}}}$
- **Else:** ${1\over{(NumberOfDeaths - 1) \times 3^3}}$

Only true deaths count here, so that life being saved by [[/Items/Amulet of Life Saving]] does not impact the score. The multiplier starts at $\frac13$ at 0 deaths, which is the scoring difference between classic and modern modes if the character survives without being killed.

### 2.6 Role-Specific Scores

#### 2.6.1 Archaeologist Artifact Score

Archaeologist gains 30000 points for each artifact, 15000 points for each historic statue, and 10 times the gold piece value of each art object, which are carried in the inventory or in bags, or deposited in a sandalwood chest.

Archaeologist's role achievement is to find and defeat Amonket, Ruler of Greater Mummies (60000 points).

#### 2.6.2 Barbarian Melee Weapon Score

Barbarian gains 30000 points for each melee weapon of artifact or legendary quality carried in the inventory or in bags, or deposited in a sandalwood chest.

Barbarian's role achievement is to find Stormbringer and Mournblade if chaotic, and Vorpal Blade and Cleaver otherwise (60000 points).

#### 2.6.3 Caveman Amulet Score

Caveman gains 70000 points for each [[/Items/Amulet of Life Saving]] and 15000 points for each non-prediscovered amulet carried in the inventory or in bags, or deposited in a sandalwood chest. Prediscovered amulets are Amulet of Life Saving and the amulet the caveman starts with.

Caveman's role achievement is to attain the level of Grand Master in Bludgeoning Weapons (40000 points).

#### 2.6.4 Healer Spell Score

Healer gains score for each new spell learnt in unrestricted schools as follows:

$HealerSpellScore =$ For each new spell in unrestricted schools, $2000 \times (SpellLevel + 2)$

Healer's role achievement is to successfully cast a healing or abjuration spell of level 9 or higher (50000 points).

#### 2.6.5 Knight Slaying Score

A lawful Knight gains score for each slain demon, devil, or chaotic dragon, including imps, as follows:

$KnightSlayingScore =$
- For each slain demon, devil, or chaotic dragon:
    - If Unique: $200 \times (MonsterDifficultyLevel + 1)$
    - Else: $50 \times (MonsterDifficultyLevel + 1)$


A chaotic Knight gains score for each slain angel and lawful dragon in the same way. A neutral Knight gains extra score from slaying undead creatures.

Knight's role achievement is to find and defeat Asmodeus, Ruler of Nine Hells (50000 points).

#### 2.6.6 Monk Extra Conduct Score

Monk gains 50% extra score from all conducts.

Monk's role achievement is to attain the level of Grand Master in Martial Arts (60000 points).

#### 2.6.7 Priest Spell Score

Priest gains score for each new spell learnt in unrestricted schools as follows:

$PriestSpellScore =$ For each new spell in unrestricted schools, $1500 \times (SpellLevel + 2)$

Priest's role achievement is to successfully cast a spell of level 10 or higher (50000 points).

#### 2.6.8 Ranger Ranged Weapon Score

Ranger gains 40000 points for each ranged weapon of at least artifact, elite, or mythic quality carried in the inventory or in bags, or deposited in a sandalwood chest, and 2000 for each such ammo.

Ranger's role achievement is to attain the level of Grand Master in Bow or Crossbow (40000 points).

#### 2.6.9 Rogue Loot Score

Rogue gains score equal to the gold piece value of all gold, gems, and art objects carried in the inventory or in bags, or deposited in a sandalwood chest.

Rogue's role achievement is find and defeat Croesus (50000 points).

#### 2.6.10 Samurai Item Score

Samurai gains 50000 points for each Japanese item of at least artifact, exceptional, or mythic quality carried in the inventory or in bags, or deposited in a sandalwood chest, except for ammo for which 1500 points are gained.

Samurai's role achievement is to find both Katana of Masamune and the Kusanagi (100000 points).

#### 2.6.11 Tourist Selfie Score

Tourist gains score from taking selfies (with his/her camera) together with different monster types as follows:

$TouristSelfieScore =$ For each monster type, $100 \times (MonsterDifficultyLevel + 1)$

Tourist's role achievement is to take a selfie with Demogorgon (50000 points).

#### 2.6.12 Valkyrie Item Score

Valkyrie gains 60000 points for each celestial / primordial / infernal item (based on the Valkyrie's alignment) carried in the inventory or in bags, or deposited in a sandalwood chest, except for ammo for which 1000 points are gained.

Valkyrie's role achievement is to attain the level of Grand Master in Dual Wielding (40000 points).

#### 2.6.13 Wizard Spell Score

Wizard gains score for each new spell learnt in unrestricted schools as follows:

$WizardSpellScore =$ For each new spell in unrestricted schools, $1000 \times (SpellLevel + 2)$

Wizard's role achievement is to successfully cast a spell of level 10 or higher (50000 points).
