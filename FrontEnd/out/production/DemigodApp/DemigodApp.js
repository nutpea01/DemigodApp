if (typeof kotlin === 'undefined') {
  throw new Error("Error loading module 'DemigodApp'. Its dependency 'kotlin' was not found. Please, check whether 'kotlin' is loaded prior to 'DemigodApp'.");
}
var DemigodApp = function (_, Kotlin) {
  'use strict';
  var Kind_CLASS = Kotlin.Kind.CLASS;
  var Random = Kotlin.kotlin.random.Random;
  var Kind_OBJECT = Kotlin.Kind.OBJECT;
  var equals = Kotlin.equals;
  var ArrayList_init = Kotlin.kotlin.collections.ArrayList_init_287e2$;
  var throwCCE = Kotlin.throwCCE;
  var println = Kotlin.kotlin.io.println_s8jyv4$;
  var toInt = Kotlin.kotlin.text.toInt_pdl1vz$;
  var Unit = Kotlin.kotlin.Unit;
  var addClass = Kotlin.kotlin.dom.addClass_hhb33f$;
  Wearable.prototype = Object.create(Equipment.prototype);
  Wearable.prototype.constructor = Wearable;
  Upgrade.prototype = Object.create(Equipment.prototype);
  Upgrade.prototype.constructor = Upgrade;
  Glyph.prototype = Object.create(Upgrade.prototype);
  Glyph.prototype.constructor = Glyph;
  Augment.prototype = Object.create(Upgrade.prototype);
  Augment.prototype.constructor = Augment;
  Weapon.prototype = Object.create(Wearable.prototype);
  Weapon.prototype.constructor = Weapon;
  Armor.prototype = Object.create(Wearable.prototype);
  Armor.prototype.constructor = Armor;
  Accessory.prototype = Object.create(Wearable.prototype);
  Accessory.prototype.constructor = Accessory;
  function Ability(name, description) {
    if (name === void 0)
      name = '';
    if (description === void 0)
      description = '';
    this.name = name;
    this.description = description;
    this.id = generateID();
    this.icon = 0;
  }
  Ability.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Ability',
    interfaces: []
  };
  function StatChecker(player) {
    this.player_0 = player;
  }
  StatChecker.prototype.getPlayer = function () {
    return this.player_0;
  };
  StatChecker.prototype.checkStat_vux9f0$ = function (stat, mod) {
    return stat + mod + DiceRoller_getInstance().roll_za3lpa$() | 0;
  };
  StatChecker.prototype.checkSkill_vux9f0$ = function (skill, mod) {
    return (skill + mod | 0) >= DiceRoller_getInstance().roll_za3lpa$();
  };
  StatChecker.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'StatChecker',
    interfaces: []
  };
  function DiceRoller() {
    DiceRoller_instance = this;
  }
  DiceRoller.prototype.roll_za3lpa$ = function (outOf) {
    if (outOf === void 0)
      outOf = 100;
    return Random.Default.nextInt_vux9f0$(1, outOf);
  };
  DiceRoller.prototype.displayRoll = function () {
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
  function Equipment(name, description) {
    if (name === void 0)
      name = '';
    if (description === void 0)
      description = '';
    this.name = name;
    this.description = description;
    this.id = generateID();
    this.modifiers = ArrayList_init();
    this.icon = 0;
  }
  Equipment.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Equipment',
    interfaces: []
  };
  function Wearable(augmentSlots) {
    if (augmentSlots === void 0)
      augmentSlots = 0;
    Equipment.call(this);
    this.augmentSlots_661rdt$_0 = augmentSlots;
    this.augments_uf0hx9$_0 = ArrayList_init();
    this.glyphs_4vz6xq$_0 = ArrayList_init();
    this.abilities_p4dwg7$_0 = ArrayList_init();
    this.linkAugSlots_vd9sq1$_0();
  }
  Wearable.prototype.getAugmentSlots = function () {
    return this.augmentSlots_661rdt$_0;
  };
  Wearable.prototype.addAugmentSlot = function () {
    this.augmentSlots_661rdt$_0 = this.augmentSlots_661rdt$_0 + 1 | 0;
    this.linkAugSlots_vd9sq1$_0();
  };
  Wearable.prototype.equipAugment_gn419t$ = function (augment) {
    var i = 0;
    while (i < this.augments_uf0hx9$_0.size) {
      if (equals(this.augments_uf0hx9$_0.get_za3lpa$(i), new Augment())) {
        this.augments_uf0hx9$_0.set_wxm5ur$(i, augment);
        return;
      }
      i = i + 1 | 0;
    }
  };
  Wearable.prototype.linkAugSlots_vd9sq1$_0 = function () {
    while (this.augments_uf0hx9$_0.size < this.augmentSlots_661rdt$_0) {
      this.augments_uf0hx9$_0.add_11rb$(new Augment());
    }
  };
  Wearable.prototype.getAugmentByID_61zpoe$ = function (ID) {
    var tmp$;
    tmp$ = this.augments_uf0hx9$_0.iterator();
    while (tmp$.hasNext()) {
      var aug = tmp$.next();
      if (equals(aug.id, ID)) {
        return aug;
      }
    }
    return new Augment();
  };
  Wearable.prototype.geGlyphByID_61zpoe$ = function (ID) {
    var tmp$;
    tmp$ = this.glyphs_4vz6xq$_0.iterator();
    while (tmp$.hasNext()) {
      var gly = tmp$.next();
      if (equals(gly.id, ID)) {
        return gly;
      }
    }
    return new Glyph();
  };
  Wearable.prototype.getAbiltyByID_61zpoe$ = function (ID) {
    return new Ability();
  };
  Wearable.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Wearable',
    interfaces: [Equipment]
  };
  function Upgrade() {
    Equipment.call(this);
    this.isAbility = false;
    this.effect = new Ability();
  }
  Upgrade.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Upgrade',
    interfaces: [Equipment]
  };
  function Glyph() {
    Upgrade.call(this);
  }
  Glyph.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Glyph',
    interfaces: [Upgrade]
  };
  function Augment() {
    Upgrade.call(this);
  }
  Augment.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Augment',
    interfaces: [Upgrade]
  };
  function Weapon() {
    Wearable.call(this);
  }
  Weapon.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Weapon',
    interfaces: [Wearable]
  };
  function Armor() {
    Wearable.call(this);
  }
  Armor.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Armor',
    interfaces: [Wearable]
  };
  function Accessory() {
    Wearable.call(this);
  }
  Accessory.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Accessory',
    interfaces: [Wearable]
  };
  function FileHandler() {
    FileHandler_instance = this;
    this.filename = '';
  }
  FileHandler.prototype.setFilename_61zpoe$ = function (filename) {
    this.filename = filename;
  };
  FileHandler.prototype.save_jj7jqn$ = function (filename, player) {
    var file = filename + '.demigod';
    var text = '[';
    text += JSON.stringify(player.traits) + ',';
    text += JSON.stringify(player.resources) + ',';
    text += JSON.stringify(player.baseStats) + ',';
    text += JSON.stringify(player.weapon) + ',';
    text += JSON.stringify(player.armor) + ',';
    text += JSON.stringify(player.accessory);
    text += ']';
    var save = document.createElement('a');
    save.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    save.setAttribute('download', file);
    save.style.display = 'none';
    document.body.appendChild(save);
    save.click();
    document.body.removeChild(save);
  };
  FileHandler.prototype.load = function () {
    var tmp$, tmp$_0, tmp$_1, tmp$_2, tmp$_3, tmp$_4;
    var iframe = Kotlin.isType(tmp$ = document.createElement('iframe'), HTMLIFrameElement) ? tmp$ : throwCCE();
    iframe.id = 'iframe';
    iframe.style.display = 'none';
    (tmp$_0 = document.body) != null ? tmp$_0.appendChild(iframe) : null;
    iframe.src = this.filename;
    var text = (tmp$_4 = (tmp$_3 = (tmp$_2 = (Kotlin.isType(tmp$_1 = document.getElementById('iframe'), HTMLIFrameElement) ? tmp$_1 : throwCCE()).contentDocument) != null ? tmp$_2.body : null) != null ? tmp$_3.firstChild : null) != null ? tmp$_4.nodeValue : null;
    println(text);
    var load = JSON.parse(text);
  };
  FileHandler.$metadata$ = {
    kind: Kind_OBJECT,
    simpleName: 'FileHandler',
    interfaces: []
  };
  var FileHandler_instance = null;
  function FileHandler_getInstance() {
    if (FileHandler_instance === null) {
      new FileHandler();
    }
    return FileHandler_instance;
  }
  function initTraitListeners$lambda(closure$player) {
    return function (it) {
      var tmp$;
      var trait = Kotlin.isType(tmp$ = it.target, HTMLInputElement) ? tmp$ : throwCCE();
      switch (trait.id) {
        case 'Name':
          closure$player.traits.name = trait.value;
          break;
        case 'Age':
          closure$player.traits.age = toInt(trait.value);
          break;
        case 'Species':
          closure$player.traits.species = trait.value;
          break;
        case 'Class':
          closure$player.traits._class.name = trait.value;
          break;
        case 'Level':
          closure$player.traits.level = toInt(trait.value);
          break;
        case 'Icon':
          closure$player.traits.icon = toInt(trait.value);
          break;
      }
      return Unit;
    };
  }
  function initTraitListeners(player) {
    document.addEventListener('change', initTraitListeners$lambda(player));
  }
  function initStatListener$lambda(closure$level, closure$player) {
    return function (it) {
      closure$player.traits.level = toInt(closure$level.value);
      return Unit;
    };
  }
  function initStatListener(player) {
    var tmp$;
    var level = Kotlin.isType(tmp$ = document.getElementById('Level'), HTMLInputElement) ? tmp$ : throwCCE();
    level.addEventListener('change', initStatListener$lambda(level, player));
  }
  function initNavigationBar$lambda(closure$player) {
    return function (it) {
      FileHandler_getInstance().save_jj7jqn$('test', closure$player);
      return Unit;
    };
  }
  function initNavigationBar$lambda_0(it) {
    FileHandler_getInstance().load();
    return Unit;
  }
  function initNavigationBar(player) {
    var tmp$, tmp$_0;
    (Kotlin.isType(tmp$ = document.getElementById('main-navbar__icon__save-button'), HTMLButtonElement) ? tmp$ : throwCCE()).onclick = initNavigationBar$lambda(player);
    (Kotlin.isType(tmp$_0 = document.getElementById('main-navbar__icon__load-button'), HTMLButtonElement) ? tmp$_0 : throwCCE()).onclick = initNavigationBar$lambda_0;
  }
  function initSlotButtons$lambda(it) {
    return insertSpellSlot();
  }
  function initSlotButtons$lambda_0(it) {
    return insertSpecialSlot();
  }
  function initSlotButtons$lambda_1(it) {
    return insertClassSlot();
  }
  function initSlotButtons$lambda_2(it) {
    return deleteSpellSlot();
  }
  function initSlotButtons$lambda_3(it) {
    return deleteSpecialSlot();
  }
  function initSlotButtons$lambda_4(it) {
    return deleteClassSlot();
  }
  function initSlotButtons() {
    var tmp$, tmp$_0, tmp$_1, tmp$_2, tmp$_3, tmp$_4;
    (Kotlin.isType(tmp$ = document.getElementById('spells-div__button-add'), HTMLButtonElement) ? tmp$ : throwCCE()).onclick = initSlotButtons$lambda;
    (Kotlin.isType(tmp$_0 = document.getElementById('special-div__button-add'), HTMLButtonElement) ? tmp$_0 : throwCCE()).onclick = initSlotButtons$lambda_0;
    (Kotlin.isType(tmp$_1 = document.getElementById('class-abilities-div__button-add'), HTMLButtonElement) ? tmp$_1 : throwCCE()).onclick = initSlotButtons$lambda_1;
    (Kotlin.isType(tmp$_2 = document.getElementById('spells-div__button-del'), HTMLButtonElement) ? tmp$_2 : throwCCE()).onclick = initSlotButtons$lambda_2;
    (Kotlin.isType(tmp$_3 = document.getElementById('special-div__button-del'), HTMLButtonElement) ? tmp$_3 : throwCCE()).onclick = initSlotButtons$lambda_3;
    (Kotlin.isType(tmp$_4 = document.getElementById('class-abilities-div__button-del'), HTMLButtonElement) ? tmp$_4 : throwCCE()).onclick = initSlotButtons$lambda_4;
  }
  function initSlots(spellSlots, specialSlots, classSlots) {
    for (var index = 0; index < spellSlots; index++) {
      insertSpellSlot();
    }
    for (var index_0 = 0; index_0 < specialSlots; index_0++) {
      insertSpecialSlot();
    }
    for (var index_1 = 0; index_1 < classSlots; index_1++) {
      insertClassSlot();
    }
  }
  function insertSpellSlot() {
    return insertAbilitySlot('spells');
  }
  function insertSpecialSlot() {
    return insertAbilitySlot('special');
  }
  function insertClassSlot() {
    return insertAbilitySlot('class-abilities');
  }
  function insertAbilitySlot(type, image) {
    if (image === void 0)
      image = 'Hold Primary Logo 240px.png';
    var tmp$, tmp$_0, tmp$_1;
    var table = Kotlin.isType(tmp$ = document.getElementById(type + '-div__table'), HTMLTableElement) ? tmp$ : throwCCE();
    var row = table.insertRow();
    var icon = row.insertCell(0);
    addClass(icon, [type + '-div__td-image']);
    var img = Kotlin.isType(tmp$_0 = document.createElement('img'), HTMLImageElement) ? tmp$_0 : throwCCE();
    addClass(img, [type + '-div__image']);
    img.src = image;
    icon.appendChild(img);
    var text = row.insertCell(1);
    addClass(text, [type + '-div__td-textarea']);
    var textarea = Kotlin.isType(tmp$_1 = document.createElement('textarea'), HTMLTextAreaElement) ? tmp$_1 : throwCCE();
    addClass(textarea, [type + '-div__textarea']);
    text.appendChild(textarea);
    return false;
  }
  function deleteSpellSlot() {
    var tmp$;
    var table = Kotlin.isType(tmp$ = document.getElementById('spells-div__table'), HTMLTableElement) ? tmp$ : throwCCE();
    table.deleteRow(table.rows.length - 1 | 0);
    return false;
  }
  function deleteSpecialSlot() {
    var tmp$;
    var table = Kotlin.isType(tmp$ = document.getElementById('special-div__table'), HTMLTableElement) ? tmp$ : throwCCE();
    table.deleteRow(table.rows.length - 1 | 0);
    return false;
  }
  function deleteClassSlot() {
    var tmp$;
    var table = Kotlin.isType(tmp$ = document.getElementById('class-abilities-div__table'), HTMLTableElement) ? tmp$ : throwCCE();
    table.deleteRow(table.rows.length - 1 | 0);
    return false;
  }
  function main() {
    var player = new Player();
    initTraitListeners(player);
    initSlots(0, 0, 0);
    initSlotButtons();
    initNavigationBar(player);
  }
  function generateID() {
    var uuid = '';
    var dt = (new Date()).getTime();
    uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = (dt + Math.random() * 16) % 16 | 0;
      dt = Math.floor(dt / 16);
      return (c == 'x' ? r : r & 3 | 8).toString(16);
    });
    return uuid;
  }
  function Player() {
    this.traits = new Traits('player', 30, 'Human', new Class());
    this.resources = new Resources();
    this.baseStats = new BaseStats();
    this.statChecker = new StatChecker(this);
    this.weapon = new Weapon();
    this.armor = new Armor();
    this.accessory = new Accessory();
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
  Resources.prototype.dealDamage_zih9xn$ = function (damage, target) {
    target.resources.setCurrentHP_za3lpa$(damage + DiceRoller_getInstance().roll_za3lpa$() | 0);
  };
  Resources.prototype.takeDamage_vux9f0$ = function (damage, defense) {
    if (defense === void 0)
      defense = 0;
    this.setCurrentHP_za3lpa$(this.getCurrentHP() - (damage + DiceRoller_getInstance().roll_za3lpa$() - defense) | 0);
  };
  Resources.prototype.calculateDamage_vux9f0$ = function (damage, defense) {
    return damage + DiceRoller_getInstance().roll_za3lpa$() - defense | 0;
  };
  Resources.prototype.healHP_za3lpa$ = function (heal) {
    this.setCurrentHP_za3lpa$(this.getCurrentHP() + heal | 0);
  };
  Resources.prototype.spendMP_za3lpa$ = function (cost) {
    this.setCurrentMP_za3lpa$(this.getCurrentMP() - cost | 0);
  };
  Resources.prototype.spendSP_za3lpa$ = function (cost) {
    this.setCurrentSP_za3lpa$(this.getCurrentSP() - cost | 0);
  };
  Resources.prototype.restoreMP_za3lpa$ = function (restore) {
    this.setCurrentMP_za3lpa$(this.getCurrentMP() + restore | 0);
  };
  Resources.prototype.restoreSP_za3lpa$ = function (restore) {
    this.setCurrentSP_za3lpa$(this.getCurrentSP() + restore | 0);
  };
  Resources.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Resources',
    interfaces: []
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
  CombatStats.prototype.copy_5uymv4$ = function (at, df, ma, md) {
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
  function Traits(name, age, species, _class, level, icon) {
    if (level === void 0)
      level = 1;
    if (icon === void 0)
      icon = 0;
    this.name = name;
    this.age = age;
    this.species = species;
    this._class = _class;
    this.level = level;
    this.icon = icon;
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
  Traits.prototype.component6 = function () {
    return this.icon;
  };
  Traits.prototype.copy_46c0s2$ = function (name, age, species, _class, level, icon) {
    return new Traits(name === void 0 ? this.name : name, age === void 0 ? this.age : age, species === void 0 ? this.species : species, _class === void 0 ? this._class : _class, level === void 0 ? this.level : level, icon === void 0 ? this.icon : icon);
  };
  Traits.prototype.toString = function () {
    return 'Traits(name=' + Kotlin.toString(this.name) + (', age=' + Kotlin.toString(this.age)) + (', species=' + Kotlin.toString(this.species)) + (', _class=' + Kotlin.toString(this._class)) + (', level=' + Kotlin.toString(this.level)) + (', icon=' + Kotlin.toString(this.icon)) + ')';
  };
  Traits.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.name) | 0;
    result = result * 31 + Kotlin.hashCode(this.age) | 0;
    result = result * 31 + Kotlin.hashCode(this.species) | 0;
    result = result * 31 + Kotlin.hashCode(this._class) | 0;
    result = result * 31 + Kotlin.hashCode(this.level) | 0;
    result = result * 31 + Kotlin.hashCode(this.icon) | 0;
    return result;
  };
  Traits.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.name, other.name) && Kotlin.equals(this.age, other.age) && Kotlin.equals(this.species, other.species) && Kotlin.equals(this._class, other._class) && Kotlin.equals(this.level, other.level) && Kotlin.equals(this.icon, other.icon)))));
  };
  function Class(name) {
    if (name === void 0)
      name = '';
    this.name = name;
  }
  Class.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Class',
    interfaces: []
  };
  Class.prototype.component1 = function () {
    return this.name;
  };
  Class.prototype.copy_61zpoe$ = function (name) {
    return new Class(name === void 0 ? this.name : name);
  };
  Class.prototype.toString = function () {
    return 'Class(name=' + Kotlin.toString(this.name) + ')';
  };
  Class.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.name) | 0;
    return result;
  };
  Class.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && Kotlin.equals(this.name, other.name))));
  };
  function Value(base) {
    if (base === void 0)
      base = 0;
    this.base_ds0yms$_0 = base;
    this.id = generateID();
    this.modifiers = ArrayList_init();
  }
  Value.prototype.getValue = function () {
    return this.base_ds0yms$_0 + this.getModTotalValue() | 0;
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
    this.base_ds0yms$_0 = base;
  };
  Value.prototype.addBase_za3lpa$ = function (add) {
    this.base_ds0yms$_0 = this.base_ds0yms$_0 + add | 0;
    return this.base_ds0yms$_0;
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
  _.Ability = Ability;
  _.StatChecker = StatChecker;
  Object.defineProperty(_, 'DiceRoller', {
    get: DiceRoller_getInstance
  });
  _.Equipment = Equipment;
  _.Wearable = Wearable;
  _.Upgrade = Upgrade;
  _.Glyph = Glyph;
  _.Augment = Augment;
  _.Weapon = Weapon;
  _.Armor = Armor;
  _.Accessory = Accessory;
  Object.defineProperty(_, 'FileHandler', {
    get: FileHandler_getInstance
  });
  _.initTraitListeners_vgc0e7$ = initTraitListeners;
  _.initStatListener_vgc0e7$ = initStatListener;
  _.initNavigationBar_vgc0e7$ = initNavigationBar;
  _.initSlotButtons = initSlotButtons;
  _.initSlots_qt1dr2$ = initSlots;
  _.insertSpellSlot = insertSpellSlot;
  _.insertSpecialSlot = insertSpecialSlot;
  _.insertClassSlot = insertClassSlot;
  _.insertAbilitySlot_puj7f4$ = insertAbilitySlot;
  _.deleteSpellSlot = deleteSpellSlot;
  _.deleteSpecialSlot = deleteSpecialSlot;
  _.deleteClassSlot = deleteClassSlot;
  _.main = main;
  _.generateID = generateID;
  _.Player = Player;
  _.BaseStats = BaseStats;
  _.Resources = Resources;
  _.CombatStats = CombatStats;
  _.Skills = Skills;
  _.Traits = Traits;
  _.Class = Class;
  _.Value = Value;
  _.DynamicValue = DynamicValue;
  _.Modifier = Modifier;
  main();
  Kotlin.defineModule('DemigodApp', _);
  return _;
}(typeof DemigodApp === 'undefined' ? {} : DemigodApp, kotlin);
