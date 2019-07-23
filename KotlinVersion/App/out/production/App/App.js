if (typeof kotlin === 'undefined') {
  throw new Error("Error loading module 'App'. Its dependency 'kotlin' was not found. Please, check whether 'kotlin' is loaded prior to 'App'.");
}
var App = function (_, Kotlin) {
  'use strict';
  var ensureNotNull = Kotlin.ensureNotNull;
  var Kind_CLASS = Kotlin.Kind.CLASS;
  var equals = Kotlin.equals;
  var ArrayList_init = Kotlin.kotlin.collections.ArrayList_init_287e2$;
  function main() {
    var tester = new Player();
    tester.baseStats.setSTR_za3lpa$(35);
    tester.baseStats.setCON_za3lpa$(50);
    tester.baseStats.setINT_za3lpa$(10);
    tester.baseStats.setWIL_za3lpa$(50);
    tester.baseStats.setACC_za3lpa$(20);
    tester.baseStats.setSPD_za3lpa$(15);
    tester.resources.setHP_za3lpa$(300);
    tester.resources.setMP_za3lpa$(250);
    tester.resources.setSP_za3lpa$(200);
  }
  function generateID() {
    return '';
  }
  function StatHandler() {
    this.at = 100;
    this.df = 50;
    this.hp = 300;
  }
  StatHandler.prototype.ouch_0 = function () {
    this.hp = this.hp - (this.at - this.df) | 0;
    ensureNotNull(document.getElementById('b5')).innerHTML = this.hp.toString();
  };
  StatHandler.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'StatHandler',
    interfaces: []
  };
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
    this.combatStats.at.setBase_za3lpa$(this.str_0.getValue() * 2 | 0);
    this.combatStats.df.setBase_za3lpa$(this.con_0.getValue() * 1 | 0);
    this.combatStats.ma.setBase_za3lpa$(this.int_0.getValue() * 2 | 0);
    this.combatStats.md.setBase_za3lpa$(this.wil_0.getValue() * 1 | 0);
  };
  BaseStats.prototype.setSTR_za3lpa$ = function (str) {
    this.str_0.setBase_za3lpa$(str);
    this.updateCombat();
  };
  BaseStats.prototype.setCON_za3lpa$ = function (con) {
    this.con_0.setBase_za3lpa$(con);
    this.updateCombat();
  };
  BaseStats.prototype.setINT_za3lpa$ = function (int) {
    this.int_0.setBase_za3lpa$(int);
    this.updateCombat();
  };
  BaseStats.prototype.setWIL_za3lpa$ = function (wil) {
    this.wil_0.setBase_za3lpa$(wil);
    this.updateCombat();
  };
  BaseStats.prototype.setSPD_za3lpa$ = function (spd) {
    this.spd_0.setBase_za3lpa$(spd);
  };
  BaseStats.prototype.setACC_za3lpa$ = function (acc) {
    this.acc_0.setBase_za3lpa$(acc);
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
    this.hp = hp;
    this.sp = sp;
    this.mp = mp;
  }
  Resources.prototype.setHP_za3lpa$ = function (hp) {
    this.hp.current.setBase_za3lpa$(hp);
    this.hp.max.setBase_za3lpa$(hp);
  };
  Resources.prototype.setMP_za3lpa$ = function (mp) {
    this.mp.current.setBase_za3lpa$(mp);
    this.mp.max.setBase_za3lpa$(mp);
  };
  Resources.prototype.setSP_za3lpa$ = function (sp) {
    this.sp.current.setBase_za3lpa$(sp);
    this.sp.max.setBase_za3lpa$(sp);
  };
  Resources.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Resources',
    interfaces: []
  };
  Resources.prototype.component1 = function () {
    return this.hp;
  };
  Resources.prototype.component2 = function () {
    return this.sp;
  };
  Resources.prototype.component3 = function () {
    return this.mp;
  };
  Resources.prototype.copy_nbpdhs$ = function (hp, sp, mp) {
    return new Resources(hp === void 0 ? this.hp : hp, sp === void 0 ? this.sp : sp, mp === void 0 ? this.mp : mp);
  };
  Resources.prototype.toString = function () {
    return 'Resources(hp=' + Kotlin.toString(this.hp) + (', sp=' + Kotlin.toString(this.sp)) + (', mp=' + Kotlin.toString(this.mp)) + ')';
  };
  Resources.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.hp) | 0;
    result = result * 31 + Kotlin.hashCode(this.sp) | 0;
    result = result * 31 + Kotlin.hashCode(this.mp) | 0;
    return result;
  };
  Resources.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.hp, other.hp) && Kotlin.equals(this.sp, other.sp) && Kotlin.equals(this.mp, other.mp)))));
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
    this.at = at;
    this.df = df;
    this.ma = ma;
    this.md = md;
  }
  CombatStats.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'CombatStats',
    interfaces: []
  };
  CombatStats.prototype.component1 = function () {
    return this.at;
  };
  CombatStats.prototype.component2 = function () {
    return this.df;
  };
  CombatStats.prototype.component3 = function () {
    return this.ma;
  };
  CombatStats.prototype.component4 = function () {
    return this.md;
  };
  CombatStats.prototype.copy_6znzmc$ = function (at, df, ma, md) {
    return new CombatStats(at === void 0 ? this.at : at, df === void 0 ? this.df : df, ma === void 0 ? this.ma : ma, md === void 0 ? this.md : md);
  };
  CombatStats.prototype.toString = function () {
    return 'CombatStats(at=' + Kotlin.toString(this.at) + (', df=' + Kotlin.toString(this.df)) + (', ma=' + Kotlin.toString(this.ma)) + (', md=' + Kotlin.toString(this.md)) + ')';
  };
  CombatStats.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.at) | 0;
    result = result * 31 + Kotlin.hashCode(this.df) | 0;
    result = result * 31 + Kotlin.hashCode(this.ma) | 0;
    result = result * 31 + Kotlin.hashCode(this.md) | 0;
    return result;
  };
  CombatStats.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.at, other.at) && Kotlin.equals(this.df, other.df) && Kotlin.equals(this.ma, other.ma) && Kotlin.equals(this.md, other.md)))));
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
  function Traits(temp) {
    if (temp === void 0)
      temp = 0;
    this.temp = temp;
  }
  Traits.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Traits',
    interfaces: []
  };
  Traits.prototype.component1 = function () {
    return this.temp;
  };
  Traits.prototype.copy_za3lpa$ = function (temp) {
    return new Traits(temp === void 0 ? this.temp : temp);
  };
  Traits.prototype.toString = function () {
    return 'Traits(temp=' + Kotlin.toString(this.temp) + ')';
  };
  Traits.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.temp) | 0;
    return result;
  };
  Traits.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && Kotlin.equals(this.temp, other.temp))));
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
  Value.prototype.setBase_za3lpa$ = function (newBase) {
    this.base_f0nuyu$_0 = newBase;
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
  package$main.StatHandler = StatHandler;
  package$main.Player = Player;
  package$main.BaseStats = BaseStats;
  package$main.Resources = Resources;
  package$main.CombatStats = CombatStats;
  package$main.Skills = Skills;
  package$main.Traits = Traits;
  package$main.Value = Value;
  package$main.DynamicValue = DynamicValue;
  package$main.Modifier = Modifier;
  main();
  Kotlin.defineModule('App', _);
  return _;
}(typeof App === 'undefined' ? {} : App, kotlin);
