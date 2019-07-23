if (typeof kotlin === 'undefined') {
  throw new Error("Error loading module 'App'. Its dependency 'kotlin' was not found. Please, check whether 'kotlin' is loaded prior to 'App'.");
}
var App = function (_, Kotlin) {
  'use strict';
  var throwCCE = Kotlin.throwCCE;
  var toInt = Kotlin.kotlin.text.toInt_pdl1vz$;
  var Unit = Kotlin.kotlin.Unit;
  var ensureNotNull = Kotlin.ensureNotNull;
  var Random = Kotlin.kotlin.random.Random;
  var Pair = Kotlin.kotlin.Pair;
  var Kind_OBJECT = Kotlin.Kind.OBJECT;
  var Kind_CLASS = Kotlin.Kind.CLASS;
  var equals = Kotlin.equals;
  var ArrayList_init = Kotlin.kotlin.collections.ArrayList_init_287e2$;
  function main$lambda(closure$player, closure$hpInput) {
    return function (it) {
      HPHeal(closure$player, toInt(closure$hpInput.value));
      return Unit;
    };
  }
  function main$lambda_0(closure$player, closure$hpInput) {
    return function (it) {
      HPDamage(closure$player, toInt(closure$hpInput.value));
      return Unit;
    };
  }
  function main$lambda_1(closure$player, closure$mpInput) {
    return function (it) {
      MPHeal(closure$player, toInt(closure$mpInput.value));
      return Unit;
    };
  }
  function main$lambda_2(closure$player, closure$mpInput) {
    return function (it) {
      MPDamage(closure$player, toInt(closure$mpInput.value));
      return Unit;
    };
  }
  function main$lambda_3(closure$player, closure$spInput) {
    return function (it) {
      SPHeal(closure$player, toInt(closure$spInput.value));
      return Unit;
    };
  }
  function main$lambda_4(closure$player, closure$spInput) {
    return function (it) {
      SPDamage(closure$player, toInt(closure$spInput.value));
      return Unit;
    };
  }
  function main() {
    var tmp$, tmp$_0, tmp$_1, tmp$_2, tmp$_3, tmp$_4, tmp$_5, tmp$_6, tmp$_7;
    var player = new Player();
    player.baseStats.setSTR_za3lpa$(35);
    player.baseStats.setCON_za3lpa$(50);
    player.baseStats.setINT_za3lpa$(10);
    player.baseStats.setWIL_za3lpa$(50);
    player.baseStats.setACC_za3lpa$(20);
    player.resources.setMaxHP_za3lpa$(400);
    player.resources.setMaxMP_za3lpa$(250);
    player.resources.setMaxSP_za3lpa$(200);
    player.resources.setCurrentHP_za3lpa$(400);
    player.resources.setCurrentMP_za3lpa$(250);
    player.resources.setCurrentSP_za3lpa$(200);
    displayStats(player);
    var hpInput = Kotlin.isType(tmp$ = document.getElementById('hpInput'), HTMLInputElement) ? tmp$ : throwCCE();
    var hpHeal = Kotlin.isType(tmp$_0 = document.getElementById('hpHeal'), HTMLButtonElement) ? tmp$_0 : throwCCE();
    hpHeal.addEventListener('click', main$lambda(player, hpInput));
    var hpDamage = Kotlin.isType(tmp$_1 = document.getElementById('hpDamage'), HTMLButtonElement) ? tmp$_1 : throwCCE();
    hpDamage.addEventListener('click', main$lambda_0(player, hpInput));
    var mpInput = Kotlin.isType(tmp$_2 = document.getElementById('mpInput'), HTMLInputElement) ? tmp$_2 : throwCCE();
    var mpHeal = Kotlin.isType(tmp$_3 = document.getElementById('mpHeal'), HTMLButtonElement) ? tmp$_3 : throwCCE();
    mpHeal.addEventListener('click', main$lambda_1(player, mpInput));
    var mpDamage = Kotlin.isType(tmp$_4 = document.getElementById('mpDamage'), HTMLButtonElement) ? tmp$_4 : throwCCE();
    mpDamage.addEventListener('click', main$lambda_2(player, mpInput));
    var spInput = Kotlin.isType(tmp$_5 = document.getElementById('spInput'), HTMLInputElement) ? tmp$_5 : throwCCE();
    var spHeal = Kotlin.isType(tmp$_6 = document.getElementById('spHeal'), HTMLButtonElement) ? tmp$_6 : throwCCE();
    spHeal.addEventListener('click', main$lambda_3(player, spInput));
    var spDamage = Kotlin.isType(tmp$_7 = document.getElementById('spDamage'), HTMLButtonElement) ? tmp$_7 : throwCCE();
    spDamage.addEventListener('click', main$lambda_4(player, spInput));
  }
  function generateID() {
    return '';
  }
  function displayStats(player) {
    ensureNotNull(document.getElementById('b1')).innerHTML = player.baseStats.getSTR().toString();
    ensureNotNull(document.getElementById('b2')).innerHTML = player.baseStats.getCON().toString();
    ensureNotNull(document.getElementById('b3')).innerHTML = player.baseStats.getINT().toString();
    ensureNotNull(document.getElementById('b4')).innerHTML = player.baseStats.getWIL().toString();
    ensureNotNull(document.getElementById('c1')).innerHTML = player.baseStats.combatStats.getAT().toString();
    ensureNotNull(document.getElementById('c2')).innerHTML = player.baseStats.combatStats.getDF().toString();
    ensureNotNull(document.getElementById('c3')).innerHTML = player.baseStats.combatStats.getMA().toString();
    ensureNotNull(document.getElementById('c4')).innerHTML = player.baseStats.combatStats.getMD().toString();
    ensureNotNull(document.getElementById('a1')).innerHTML = player.baseStats.getSPD().toString();
    ensureNotNull(document.getElementById('a2')).innerHTML = player.baseStats.getACC().toString();
    ensureNotNull(document.getElementById('b5')).innerHTML = player.resources.getCurrentHP().toString();
    ensureNotNull(document.getElementById('b6')).innerHTML = player.resources.getCurrentMP().toString();
    ensureNotNull(document.getElementById('b7')).innerHTML = player.resources.getCurrentSP().toString();
    ensureNotNull(document.getElementById('c5')).innerHTML = player.resources.getMaxHP().toString();
    ensureNotNull(document.getElementById('c6')).innerHTML = player.resources.getMaxMP().toString();
    ensureNotNull(document.getElementById('c7')).innerHTML = player.resources.getMaxSP().toString();
  }
  function HPDamage(player, damage) {
    var hp = player.resources.getCurrentHP();
    var df = player.baseStats.combatStats.getDF();
    player.resources.setCurrentHP_za3lpa$(hp - (damage - df) | 0);
    displayStats(player);
  }
  function HPHeal(player, heal) {
    var hp = player.resources.getCurrentHP();
    player.resources.setCurrentHP_za3lpa$(hp + heal | 0);
    displayStats(player);
  }
  function MPDamage(player, damage) {
    var mp = player.resources.getCurrentMP();
    player.resources.setCurrentMP_za3lpa$(mp - damage | 0);
    displayStats(player);
  }
  function MPHeal(player, heal) {
    var mp = player.resources.getCurrentMP();
    player.resources.setCurrentMP_za3lpa$(mp + heal | 0);
    displayStats(player);
  }
  function SPDamage(player, damage) {
    var sp = player.resources.getCurrentSP();
    player.resources.setCurrentSP_za3lpa$(sp - damage | 0);
    displayStats(player);
  }
  function SPHeal(player, heal) {
    var sp = player.resources.getCurrentSP();
    player.resources.setCurrentSP_za3lpa$(sp + heal | 0);
    displayStats(player);
  }
  function DiceRoller() {
    DiceRoller_instance = this;
  }
  DiceRoller.prototype.roll100 = function () {
    return new Pair(Random.Default.nextInt_vux9f0$(1, 100), 'crit success');
  };
  DiceRoller.prototype.roll20 = function () {
    return Random.Default.nextInt_vux9f0$(1, 20);
  };
  DiceRoller.prototype.roll12 = function () {
    return Random.Default.nextInt_vux9f0$(1, 12);
  };
  DiceRoller.prototype.roll10 = function () {
    return Random.Default.nextInt_vux9f0$(1, 10);
  };
  DiceRoller.prototype.roll8 = function () {
    return Random.Default.nextInt_vux9f0$(1, 8);
  };
  DiceRoller.prototype.roll6 = function () {
    return Random.Default.nextInt_vux9f0$(1, 6);
  };
  DiceRoller.prototype.roll4 = function () {
    return Random.Default.nextInt_vux9f0$(1, 4);
  };
  DiceRoller.$metadata$ = {
    kind: Kind_OBJECT,
    simpleName: 'DiceRoller',
    interfaces: []
  };
  var DiceRoller_instance = null;
  function DiceRoller_getInstance() {
    if (DiceRoller_instance === null) {
      new DiceRoller();
    }
    return DiceRoller_instance;
  }
  function Player() {
    this.resources = new Resources();
    this.baseStats = new BaseStats();
  }
  Player.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Player',
    interfaces: []
  };
  function BaseStats(str, con, int, wil, spd, acc) {
    if (str === void 0)
      str = new Value(0);
    if (con === void 0)
      con = new Value(0);
    if (int === void 0)
      int = new Value(0);
    if (wil === void 0)
      wil = new Value(0);
    if (spd === void 0)
      spd = new Value(0);
    if (acc === void 0)
      acc = new Value(0);
    this.str_0 = str;
    this.con_0 = con;
    this.int_0 = int;
    this.wil_0 = wil;
    this.spd_0 = spd;
    this.acc_0 = acc;
    this.combatStats = new CombatStats();
  }
  BaseStats.prototype.updateCombat = function () {
    this.combatStats.setATBase_za3lpa$(this.str_0.getValue() * 2 | 0);
    this.combatStats.setDFBase_za3lpa$(this.con_0.getValue() * 1 | 0);
    this.combatStats.setMABase_za3lpa$(this.int_0.getValue() * 2 | 0);
    this.combatStats.setMDBase_za3lpa$(this.wil_0.getValue() * 1 | 0);
  };
  BaseStats.prototype.setSTR_za3lpa$ = function (value) {
    this.str_0.setBase_za3lpa$(value);
    this.updateCombat();
  };
  BaseStats.prototype.setCON_za3lpa$ = function (value) {
    this.con_0.setBase_za3lpa$(value);
    this.updateCombat();
  };
  BaseStats.prototype.setINT_za3lpa$ = function (value) {
    this.int_0.setBase_za3lpa$(value);
    this.updateCombat();
  };
  BaseStats.prototype.setWIL_za3lpa$ = function (value) {
    this.wil_0.setBase_za3lpa$(value);
    this.updateCombat();
  };
  BaseStats.prototype.setSPD_za3lpa$ = function (value) {
    this.spd_0.setBase_za3lpa$(value);
  };
  BaseStats.prototype.setACC_za3lpa$ = function (value) {
    this.acc_0.setBase_za3lpa$(value);
  };
  BaseStats.prototype.getSTR = function () {
    return this.str_0.getValue();
  };
  BaseStats.prototype.getCON = function () {
    return this.con_0.getValue();
  };
  BaseStats.prototype.getINT = function () {
    return this.int_0.getValue();
  };
  BaseStats.prototype.getWIL = function () {
    return this.wil_0.getValue();
  };
  BaseStats.prototype.getSPD = function () {
    return this.spd_0.getValue();
  };
  BaseStats.prototype.getACC = function () {
    return this.acc_0.getValue();
  };
  BaseStats.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'BaseStats',
    interfaces: []
  };
  function Resources(hp, sp, mp) {
    if (hp === void 0)
      hp = new DynamicValue(150, 150);
    if (sp === void 0)
      sp = new DynamicValue(150, 150);
    if (mp === void 0)
      mp = new DynamicValue(150, 150);
    this.hp_0 = hp;
    this.sp_0 = sp;
    this.mp_0 = mp;
  }
  Resources.prototype.setMaxHP_za3lpa$ = function (value) {
    this.hp_0.max.setBase_za3lpa$(value);
  };
  Resources.prototype.setMaxMP_za3lpa$ = function (value) {
    this.mp_0.max.setBase_za3lpa$(value);
  };
  Resources.prototype.setMaxSP_za3lpa$ = function (value) {
    this.sp_0.max.setBase_za3lpa$(value);
  };
  Resources.prototype.setCurrentHP_za3lpa$ = function (value) {
    this.hp_0.current.setBase_za3lpa$(value);
    if (this.hp_0.current.getValue() > this.hp_0.max.getValue()) {
      this.hp_0.current.setBase_za3lpa$(this.hp_0.max.getValue());
    }
  };
  Resources.prototype.setCurrentMP_za3lpa$ = function (value) {
    this.mp_0.current.setBase_za3lpa$(value);
    if (this.mp_0.current.getValue() > this.mp_0.max.getValue()) {
      this.mp_0.current.setBase_za3lpa$(this.mp_0.max.getValue());
    }
  };
  Resources.prototype.setCurrentSP_za3lpa$ = function (value) {
    this.sp_0.current.setBase_za3lpa$(value);
    if (this.sp_0.current.getValue() > this.sp_0.max.getValue()) {
      this.sp_0.current.setBase_za3lpa$(this.sp_0.max.getValue());
    }
  };
  Resources.prototype.getMaxHP = function () {
    return this.hp_0.max.getValue();
  };
  Resources.prototype.getMaxMP = function () {
    return this.mp_0.max.getValue();
  };
  Resources.prototype.getMaxSP = function () {
    return this.sp_0.max.getValue();
  };
  Resources.prototype.getCurrentHP = function () {
    return this.hp_0.current.getValue();
  };
  Resources.prototype.getCurrentMP = function () {
    return this.mp_0.current.getValue();
  };
  Resources.prototype.getCurrentSP = function () {
    return this.sp_0.current.getValue();
  };
  Resources.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Resources',
    interfaces: []
  };
  Resources.prototype.component1_0 = function () {
    return this.hp_0;
  };
  Resources.prototype.component2_0 = function () {
    return this.sp_0;
  };
  Resources.prototype.component3_0 = function () {
    return this.mp_0;
  };
  Resources.prototype.copy_nbpdhs$ = function (hp, sp, mp) {
    return new Resources(hp === void 0 ? this.hp_0 : hp, sp === void 0 ? this.sp_0 : sp, mp === void 0 ? this.mp_0 : mp);
  };
  Resources.prototype.toString = function () {
    return 'Resources(hp=' + Kotlin.toString(this.hp_0) + (', sp=' + Kotlin.toString(this.sp_0)) + (', mp=' + Kotlin.toString(this.mp_0)) + ')';
  };
  Resources.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.hp_0) | 0;
    result = result * 31 + Kotlin.hashCode(this.sp_0) | 0;
    result = result * 31 + Kotlin.hashCode(this.mp_0) | 0;
    return result;
  };
  Resources.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.hp_0, other.hp_0) && Kotlin.equals(this.sp_0, other.sp_0) && Kotlin.equals(this.mp_0, other.mp_0)))));
  };
  function CombatStats(at, df, ma, md) {
    if (at === void 0)
      at = new Value(0);
    if (df === void 0)
      df = new Value(0);
    if (ma === void 0)
      ma = new Value(0);
    if (md === void 0)
      md = new Value(0);
    this.at_0 = at;
    this.df_0 = df;
    this.ma_0 = ma;
    this.md_0 = md;
  }
  CombatStats.prototype.getAT = function () {
    return this.at_0.getValue();
  };
  CombatStats.prototype.getDF = function () {
    return this.df_0.getValue();
  };
  CombatStats.prototype.getMA = function () {
    return this.ma_0.getValue();
  };
  CombatStats.prototype.getMD = function () {
    return this.md_0.getValue();
  };
  CombatStats.prototype.setATBase_za3lpa$ = function (base) {
    this.at_0.setBase_za3lpa$(base);
  };
  CombatStats.prototype.setDFBase_za3lpa$ = function (base) {
    this.df_0.setBase_za3lpa$(base);
  };
  CombatStats.prototype.setMABase_za3lpa$ = function (base) {
    this.ma_0.setBase_za3lpa$(base);
  };
  CombatStats.prototype.setMDBase_za3lpa$ = function (base) {
    this.md_0.setBase_za3lpa$(base);
  };
  CombatStats.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'CombatStats',
    interfaces: []
  };
  CombatStats.prototype.component1_0 = function () {
    return this.at_0;
  };
  CombatStats.prototype.component2_0 = function () {
    return this.df_0;
  };
  CombatStats.prototype.component3_0 = function () {
    return this.ma_0;
  };
  CombatStats.prototype.component4_0 = function () {
    return this.md_0;
  };
  CombatStats.prototype.copy_6znzmc$ = function (at, df, ma, md) {
    return new CombatStats(at === void 0 ? this.at_0 : at, df === void 0 ? this.df_0 : df, ma === void 0 ? this.ma_0 : ma, md === void 0 ? this.md_0 : md);
  };
  CombatStats.prototype.toString = function () {
    return 'CombatStats(at=' + Kotlin.toString(this.at_0) + (', df=' + Kotlin.toString(this.df_0)) + (', ma=' + Kotlin.toString(this.ma_0)) + (', md=' + Kotlin.toString(this.md_0)) + ')';
  };
  CombatStats.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.at_0) | 0;
    result = result * 31 + Kotlin.hashCode(this.df_0) | 0;
    result = result * 31 + Kotlin.hashCode(this.ma_0) | 0;
    result = result * 31 + Kotlin.hashCode(this.md_0) | 0;
    return result;
  };
  CombatStats.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.at_0, other.at_0) && Kotlin.equals(this.df_0, other.df_0) && Kotlin.equals(this.ma_0, other.ma_0) && Kotlin.equals(this.md_0, other.md_0)))));
  };
  function Skills(temp) {
    if (temp === void 0)
      temp = 0;
    this.temp = temp;
  }
  Skills.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Skills',
    interfaces: []
  };
  Skills.prototype.component1 = function () {
    return this.temp;
  };
  Skills.prototype.copy_za3lpa$ = function (temp) {
    return new Skills(temp === void 0 ? this.temp : temp);
  };
  Skills.prototype.toString = function () {
    return 'Skills(temp=' + Kotlin.toString(this.temp) + ')';
  };
  Skills.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.temp) | 0;
    return result;
  };
  Skills.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && Kotlin.equals(this.temp, other.temp))));
  };
  function Traits(name, age, species, _class, level) {
    if (level === void 0)
      level = 1;
    this.name = name;
    this.age = age;
    this.species = species;
    this._class = _class;
    this.level = level;
  }
  Traits.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Traits',
    interfaces: []
  };
  Traits.prototype.component1 = function () {
    return this.name;
  };
  Traits.prototype.component2 = function () {
    return this.age;
  };
  Traits.prototype.component3 = function () {
    return this.species;
  };
  Traits.prototype.component4 = function () {
    return this._class;
  };
  Traits.prototype.component5 = function () {
    return this.level;
  };
  Traits.prototype.copy_so35aq$ = function (name, age, species, _class, level) {
    return new Traits(name === void 0 ? this.name : name, age === void 0 ? this.age : age, species === void 0 ? this.species : species, _class === void 0 ? this._class : _class, level === void 0 ? this.level : level);
  };
  Traits.prototype.toString = function () {
    return 'Traits(name=' + Kotlin.toString(this.name) + (', age=' + Kotlin.toString(this.age)) + (', species=' + Kotlin.toString(this.species)) + (', _class=' + Kotlin.toString(this._class)) + (', level=' + Kotlin.toString(this.level)) + ')';
  };
  Traits.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.name) | 0;
    result = result * 31 + Kotlin.hashCode(this.age) | 0;
    result = result * 31 + Kotlin.hashCode(this.species) | 0;
    result = result * 31 + Kotlin.hashCode(this._class) | 0;
    result = result * 31 + Kotlin.hashCode(this.level) | 0;
    return result;
  };
  Traits.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.name, other.name) && Kotlin.equals(this.age, other.age) && Kotlin.equals(this.species, other.species) && Kotlin.equals(this._class, other._class) && Kotlin.equals(this.level, other.level)))));
  };
  function Class() {
    this.TEMP = 0;
  }
  Class.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Class',
    interfaces: []
  };
  function Value(base) {
    if (base === void 0)
      base = 0;
    this.base_f0nuyu$_0 = base;
    this.id = generateID();
    this.modifiers = ArrayList_init();
  }
  Value.prototype.getValue = function () {
    return this.base_f0nuyu$_0 + this.getModTotalValue() | 0;
  };
  Value.prototype.getModTotalValue = function () {
    var tmp$;
    var temp = 0;
    tmp$ = this.modifiers.iterator();
    while (tmp$.hasNext()) {
      var mod = tmp$.next();
      if (mod.active)
        temp = temp + mod.value | 0;
    }
    return temp;
  };
  Value.prototype.setBase_za3lpa$ = function (base) {
    this.base_f0nuyu$_0 = base;
  };
  Value.prototype.addBase_za3lpa$ = function (add) {
    this.base_f0nuyu$_0 = this.base_f0nuyu$_0 + add | 0;
    return this.base_f0nuyu$_0;
  };
  Value.prototype.getModBySource_61zpoe$ = function (SourceID) {
    var tmp$;
    tmp$ = this.modifiers.iterator();
    while (tmp$.hasNext()) {
      var mod = tmp$.next();
      if (equals(mod.source, SourceID)) {
        return mod;
      }
    }
    return new Modifier('');
  };
  Value.prototype.removeModBySource_61zpoe$ = function (SourceID) {
    var mod = this.getModBySource_61zpoe$(SourceID);
    this.modifiers.remove_11rb$(mod);
    return mod;
  };
  Value.prototype.getModByID_61zpoe$ = function (ID) {
    var tmp$;
    tmp$ = this.modifiers.iterator();
    while (tmp$.hasNext()) {
      var mod = tmp$.next();
      if (equals(mod.id, ID)) {
        return mod;
      }
    }
    return new Modifier('');
  };
  Value.prototype.removeModByID_61zpoe$ = function (ID) {
    var mod = this.getModByID_61zpoe$(ID);
    this.modifiers.remove_11rb$(mod);
    return mod;
  };
  Value.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Value',
    interfaces: []
  };
  function DynamicValue(current, max) {
    if (current === void 0)
      current = 150;
    if (max === void 0)
      max = 150;
    this.current = new Value(current);
    this.max = new Value(max);
  }
  DynamicValue.prototype.getMissing = function () {
    return this.max.getValue() - this.current.getValue() | 0;
  };
  DynamicValue.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'DynamicValue',
    interfaces: []
  };
  function Modifier(source, value, turns) {
    if (value === void 0)
      value = 0;
    if (turns === void 0)
      turns = 9999999;
    this.source = source;
    this.value = value;
    this.turns = turns;
    this.id = generateID();
    this.active = true;
  }
  Modifier.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Modifier',
    interfaces: []
  };
  var package$demigod = _.demigod || (_.demigod = {});
  var package$main = package$demigod.main || (package$demigod.main = {});
  package$main.main = main;
  package$main.generateID = generateID;
  package$main.displayStats_9r44yh$ = displayStats;
  package$main.HPDamage_1aah15$ = HPDamage;
  package$main.HPHeal_1aah15$ = HPHeal;
  package$main.MPDamage_1aah15$ = MPDamage;
  package$main.MPHeal_1aah15$ = MPHeal;
  package$main.SPDamage_1aah15$ = SPDamage;
  package$main.SPHeal_1aah15$ = SPHeal;
  Object.defineProperty(package$main, 'DiceRoller', {
    get: DiceRoller_getInstance
  });
  package$main.Player = Player;
  package$main.BaseStats = BaseStats;
  package$main.Resources = Resources;
  package$main.CombatStats = CombatStats;
  package$main.Skills = Skills;
  package$main.Traits = Traits;
  package$main.Class = Class;
  package$main.Value = Value;
  package$main.DynamicValue = DynamicValue;
  package$main.Modifier = Modifier;
  main();
  Kotlin.defineModule('App', _);
  return _;
}(typeof App === 'undefined' ? {} : App, kotlin);
