![gnoll-maximum-mana-4k-512](https://github.com/hyvanmielenpelit/GnollHack/assets/16661034/3d72400d-821e-4e82-b5ad-76cbac54a04d)

The maximum mana is calculated as follows:

## Mana from Class and Race

Both [[character class|character classes]] and [[race|races]] contribute to the maximum mana as follows:

```
Mana_From_Race_And_Class
= Starting_mana_from_Race
+ Starting_mana_from_Class
+ Mana_per_Level_from_Race x (Level - 1)
+ Mana_per_Level_from_Class x (Level - 1)
```

## Mana from Intelligence and Wisdom

Additionally, intelligence and wisdom contribute to the maximum mana as follows:

```
Mana_From_Int_And_Wis = (Int * 2/3 + Wis * 1/3) * (Level + 3) / 6
```

The higher of intelligence and wisdom is used in the above formula.

## Mana from Items

The mana from the character class and and race are summed together with the mana from intelligence and wisdom. This amount is multiplied by the item percentage bonus and finally the fixed mana bonus from items is added to the result. The formula is as follows:

```
Maximum_Mana
= (Mana_From_Race_And_Class + Mana_From_Int_And_Wis)
x (1 + Item_Mana_Percentage_Bonus/100)
+ Item_Mana_Fixed_Bonus
```
