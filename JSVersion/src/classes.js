//useful functions saved for later
//let rand = obj.modifiers[Math.floor(Math.random() * obj.modifiers.length)];
/*for (let i = 1; i < args.length; i++) {
        obj.modifiers.push(args[i]);
  }*/
let IDGenerator = 0;
function generateID() {
    return IDGenerator++;
}

function GameObject() {
    let obj;
    return obj = {
        id: generateID()
    }
}
function Player() {
    let obj = {
        traits: new Traits(),
        resources: new Resources(),
        baseStats: new BaseStats(),
        combatStats: new CombatStats()
    };
    return obj;
}
function Resources(hp=150,mp=150,sp=150) {
    let obj = {
        hp: new DynamicValue(hp),
        sp: new DynamicValue(mp),
        mp: new DynamicValue(sp)
    };
    return obj;
}
function BaseStats(str=0,con=0,int=0,wil=0,spd=0,acc=0) {
    let obj = {
        str: new StaticValue(str),
        con: new StaticValue(con),
        int: new StaticValue(int),
        wil: new StaticValue(wil),
        spd: new StaticValue(spd),
        acc: new StaticValue(acc)
    };
    return obj;
}
function CombatStats(baseStats) {
    let obj = {
        base: baseStats(),
        at: new StaticValue(),
        df: new StaticValue(),
        ma: new StaticValue(),
        md: new StaticValue()
    };
    obj.at = obj.base.str.base*2;
    obj.ma = obj.base.int.base*2;
    obj.df = obj.base.con.base*1;
    obj.md = obj.base.wil.base*1;

    return obj;
}
function Traits(trait) {
    let obj = {
        name: "",
        age: 0,
        species: "",
        level: 1,
        _class: ""
    };
    if (trait['name']!== null)     obj.name     = trait['name'];
    if (trait['age']!== null)      obj.age      = trait['age'];
    if (trait['species']!== null)  obj.species  = trait['species'];
    if (trait['level']!== null)    obj.level    = trait['level'];
    if (trait['_class']!== null)   obj._class   = trait['_class'];

    return obj;
}
/**
 * StaticValue class. Holds information necessary for most stat values.
 *
 * @param base: base value of stat.
 * @constructor
 */
function StaticValue(base=0) {
    let obj = {
        base: base,
        modifiers: [new Modifier(obj,)]
    };
    obj.getModTotalValue = function() {
        let temp = 0;
        for (let i = 0; i < obj.modifiers.length; i++) {
            temp += obj.modifiers[i].value;
        }
        return temp;
    };
    return obj;
}
/**
 * DynamicValue class. Holds information necessary for resource stats.
 *
 * @param max*: max resource value.
 * @param current*: starting resource value.
 * @constructor
 */
function DynamicValue(max=150, current=max) {
    let obj = {
        max: max,
        current: current,
        currentModifiers: [],
        maxModifiers: []
    };
    obj.getCurrentModTotalValue = function() {
        let temp = 0;
        for (let i = 0; i < obj.currentModifiers.length; i++) {
            if (obj.currentModifiers[i].active) {
                temp += obj.currentModifiers[i].value;
            }
        }
        return temp;
    };
    obj.getMaxModTotalValue = function() {
        let temp = 0;
        for (let i = 0; i < obj.maxModifiers.length; i++) {
            if (obj.maxModifiers[i].active) {
                temp += obj.maxModifiers[i].value;
            }
        }
        return temp;
    };
    obj.getMissing = function() {
      return obj.max - obj.current;
    };

    return obj;
}
/**
 * Modifier class. Handles all stat buffs/debuffs, and for how long.
 *
 * @param source: source id of buff/debuff.
 * @param value: positive or negative, simply added to stat.
 * @param turns*: number of turns this modifier will last.
 * @param active*: whether the buff should be applied or not.
 * @constructor
 */
function Modifier(source, value, turns=99999999, active=true) {
    let obj = {
        source: source,
        id: generateID(),
        value: value,
        turns: turns,
        active: active
    };
    return obj;
}

/*
What needs to be taken care of each turn:

    modifiers: decrement turn by 1
 */

// build scripts
