![gnoll-loot-4k-512](https://github.com/hyvanmielenpelit/GnollHack/assets/16661034/ac830e66-6142-4509-8a50-872edab8c381)

## 1. Overview

The score determines how well your GnollHack run went. The scoring system in GnollHack differs greatly from that of NetHack.

### 1.1. You Gain Score From

In GnollHack, you get score from the following things:

1. **Delving deeper into the dungeon** — The deepest level you have reached
2. **Achievements** — Such as obtaining [[the Gladstone]] from Mines' End
3. **Small achievements** — Such as visiting a shop
4. **Difficulty level** — The higher difficulty levels give out more score

Additionally, if you ascend, you get score from:

5. **Conducts** — Such as being vegetarian
6. Role-specific achievement and mechanic (_see below_)
7. **Low turn count** — The faster you ascend the more score you get

The scoring system has been designed so that your current score can be shown at all times in the status bar.

### 1.2. You Do Not Gain Score From

Contrary to NetHack, you do not get score from:

1. Artifacts — Unless you have [[Archaeologist role]].
2. Amulets — Unless you have [[Caveman role]].
3. Gold pieces — Unless you have [[Rogue role]].
4. Gems — Unless you have [[Rogue role]].

## 2. Calculating Score

The score is calculated as follows:

`Score = Base_Score * Ascension_Multiplier * Difficulty_Multiplier * Modern_Multiplier`

### 2.1. Base Score

`Base_Score = (Deepest_Dungeon_Level - 1) * 1000 + Achievements_Count * 50000 + Small_Achievements_Count * 5000 + Conduct_Score * 10000 + min(Role_Max_Score, Role_Achievement_Score + Role_Specific_Score)`

- `Deepest_Dungeon_Level` is the max dungeon depth the character has reached
- `Achievements_Count` is the number of achievements
- `Small_Achievements_Count` is the number of small achievements
- `Conduct_Score` is the sum of conduct values *(see below)*
- `Role_Max_Score` is `600000` *(worth 12 achievements)*
- `Role_Achievement_Score` is the score gained from completing the role's optional quest
- `Role_Specific_Score` is the score earned via a role-specific mechanic *(see below)*

### 2.2. Ascension Multiplier

`Ascension_Multiplier=`
- **If ascension failed:** 1
- **If ascension succeeded:** `4 * Turn_Count_Multiplier` *(capped at maximum of 16 and minimum of 2)*

#### 2.2.1. Turn Count Multiplier

`Turn_Count_Multiplier = √(50000) / √(Turn_Count)`

- `Turn_Count` = The turn when you ascended.

Turn Count Multiplier is 1, if you ascended on turn 50000. It is capped at 4 and 0.5.

- Minimum turn count multiplier is 0.5 at 200000 turns.
- Maximum turn count multiplier is 4 at 3125 turns.

This means that you do not lose score from ascensions slower than 200000 turns and you do not gain score from ascensions faster than 3125 turns.

### 2.3. Conduct Score

`Conduct_Score=`
- If you did not ascend: 0
- If you ascended, the sum of the following values:
    - [[Foodless]]: 50
    - [[Vegan]]: 10
    - [[Vegetarian]]: 10
    - [[Atheist]]: 15
    - [[Pacifist]]: 60
    - [[Never hit with a wielded weapon]]: 5
    - [[Illiterate]]: 30
    - [[Never polymorphed an object]]: 2
    - [[Never change a form]]: 2
    - [[Genocideless]]: 15
    - [[Wishless]]: 15
    - [[Artifact Wishless]]: 5
    - [[Zen]]: 80
    - [[Nudist]]: 60
    - [[Elberethless]]: 10
    - [[Conflictless]]: 15
    - [[Boneless]]: 2
    - [[Petless]]: 2
    - Temporary alignment change: -20 *(e.g. [[Helm of Opposite Alignment]])*
    - Permanent alignment change: -20 *(conversion)*

### 2.4. Difficulty Multiplier

`Difficulty_Multiplier = 10 ^ (1/4) ^ Difficulty_Level ^ 2`

or more consicely

`Difficulty_Multiplier = √(10) ^ Difficulty_Level`

- Difficulty_Level is:
    - Standard: -4
    - Experienced: -3
    - Adept: -2
    - Veteran: -1
    - Expert: 0
    - Master: 1
    - Grand Master: 2

Note that `10 ^ (1/4) = 1.7783`, which comes from the monster damage multiplier of `1.3` per difficulty level and the monster hit point multiplier of `1.7783 / 1.3 = 1.3679` per difficulty level. We have chosen to use this total multiplier to get nicely rounded scores for non-ascensions on Standard, Adept, Expert, and Grand Master difficulties.

**Difficulty_Multiplier** is the following on different difficulties:
- **Standard:** 0.01 *(=1/100)*
- **Experienced:** 0.03162 *(=10^(-3/2))*
- **Adept:** 0.1 *(=1/10)*
- **Veteran:** 0.3162 *(=1/√(10))*
- **Expert:** 1.0
- **Master:** 3.162 *(=√(10))*
- **Grand Master:** 10.0


### 2.5 Modern Mode Multiplier

Until 2 deaths, **Modern_Multiplier** penalizes each character death by dividing the score by 3. Beyond 2 deaths, it becomes linear so that 3rd death divides the score further by 2, and 4th by 3 (instead of 2), 5th by 4 (instead of 3), and so on.

`Modern_Multiplier =`
- **If Number_of_Deaths ≤ 2:** `1 / (3 ^ (1 + Number_of_Deaths))`
- **Else:** `1 / ((Number_of_Deaths - 1) * (3 ^ 3))`

Only true deaths count here, so that life being saved by [[Amulet of Life Saving]] does not impact the score. The multiplier starts at 1/3 at 0 deaths, which is the scoring difference between classic and modern modes if the character survives without being killed.

### 2.6 Role-Specific Scores
#### 2.6.1 Archaeologist Artifact Score

Archaeologist gains 30000 points for each artifact, 15000 points for each historic statue, and 10 times the gold piece value of each art object, which are carried in the inventory or in bags, or deposited in a sandalwood chest.

Archaeologist's role achievement is to find and defeat Amonket, Ruler of Greater Mummies (60000 points).

#### 2.6.2 Barbarian Melee Weapon Score

Barbarian gains 30000 points for each melee weapon of artifact or legendary quality carried in the inventory or in bags, or deposited in a sandalwood chest.

Barbarian's role achievement is to find Stormbringer and Mournblade if chaotic, and Vorpal Blade and Cleaver otherwise (60000 points).

#### 2.6.3 Caveman Amulet Score

Caveman gains 70000 points for each [[Amulet of Life Saving]] and 15000 points for each non-prediscovered amulet carried in the inventory or in bags, or deposited in a sandalwood chest. Prediscovered amulets are Amulet of Life Saving and the amulet the caveman starts with.

Caveman's role achievement is to attain the level of Grand Master in Bludgeoning Weapons (40000 points).

#### 2.6.4 Healer Spell Score

Healer gains score for each new spell learnt in unrestricted schools as follows:

`Healer_Spell_Score = For each new spell in unrestricted schools, 2000 * (Spell_Level + 2)`

Healer's role achievement is to successfully cast a healing or abjuration spell of level 9 or higher (50000 points).

#### 2.6.5 Knight Slaying Score

A lawful Knight gains score for each slain demon, devil, or chaotic dragon, including imps, as follows:

```
Knight_Slaying_Score = For each slain demon, devil, or chaotic dragon:
  If Unique: 200 * (Monster_Difficulty_Level + 1)
  Else: 50 * (Monster_Difficulty_Level + 1)
```

A chaotic Knight gains score for each slain angel and lawful dragon in the same way. A neutral Knight gains extra score from slaying undead creatures.

Knight's role achievement is to find and defeat Asmodeus, Ruler of Nine Hells (50000 points).

#### 2.6.6 Monk Extra Conduct Score

Monk gains 50% extra score from all conducts.

Monk's role achievement is to attain the level of Grand Master in Martial Arts (60000 points).

#### 2.6.7 Priest Spell Score

Priest gains score for each new spell learnt in unrestricted schools as follows:

`Priest_Spell_Score = For each new spell in unrestricted schools, 1500 * (Spell_Level + 2)`

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

`Tourist_Selfie_Score = For each monster type, 100 * (Monster_Difficulty_Level + 1)`

Tourist's role achievement is to take a selfie with Demogorgon (50000 points).

#### 2.6.12 Valkyrie Item Score

Valkyrie gains 60000 points for each  celestial / primordial / infernal item (based on the Valkyrie's alignment) carried in the inventory or in bags, or deposited in a sandalwood chest, except for ammo for which 1000 points are gained.

Valkyrie's role achievement is to attain the level of Grand Master in Dual Wielding (40000 points).

#### 2.6.13 Wizard Spell Score

Wizard gains score for each new spell learnt in unrestricted schools as follows:

`Wizard_Spell_Score = For each new spell in unrestricted schools, 1000 * (Spell_Level + 2)`

Wizard's role achievement is to successfully cast a spell of level 10 or higher (50000 points).
