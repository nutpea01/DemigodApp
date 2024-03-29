if (typeof kotlin === 'undefined') {
  throw new Error("Error loading module 'DemigodApp'. Its dependency 'kotlin' was not found. Please, check whether 'kotlin' is loaded prior to 'DemigodApp'.");
}
var DemigodApp = function (_, Kotlin) {
  'use strict';
  var Kind_CLASS = Kotlin.Kind.CLASS;
  var ArrayList_init = Kotlin.kotlin.collections.ArrayList_init_287e2$;
  var Random = Kotlin.kotlin.random.Random;
  var throwCCE = Kotlin.throwCCE;
  var Kind_OBJECT = Kotlin.Kind.OBJECT;
  var equals = Kotlin.equals;
  var ensureNotNull = Kotlin.ensureNotNull;
  var Unit = Kotlin.kotlin.Unit;
  var IllegalStateException_init = Kotlin.kotlin.IllegalStateException_init_pdl1vj$;
  var toInt = Kotlin.kotlin.text.toInt_pdl1vz$;
  var addClass = Kotlin.kotlin.dom.addClass_hhb33f$;
  var toString = Kotlin.toString;
  var Math_0 = Math;
  Spell.prototype = Object.create(Ability.prototype);
  Spell.prototype.constructor = Spell;
  Special.prototype = Object.create(Ability.prototype);
  Special.prototype.constructor = Special;
  ClassAbility.prototype = Object.create(Ability.prototype);
  ClassAbility.prototype.constructor = ClassAbility;
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
  function Spell() {
    Ability.call(this);
  }
  Spell.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Spell',
    interfaces: [Ability]
  };
  function Special() {
    Ability.call(this);
  }
  Special.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Special',
    interfaces: [Ability]
  };
  function ClassAbility() {
    Ability.call(this);
  }
  ClassAbility.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'ClassAbility',
    interfaces: [Ability]
  };
  function Abilities() {
    this.spellList_0 = ArrayList_init();
    this.specialList_0 = ArrayList_init();
    this.classAbilityList_0 = ArrayList_init();
  }
  Abilities.prototype.getSpellList = function () {
    return this.spellList_0;
  };
  Abilities.prototype.getSpecialList = function () {
    return this.specialList_0;
  };
  Abilities.prototype.getClassAbilityList = function () {
    return this.classAbilityList_0;
  };
  Abilities.prototype.setSpellList_2a6ot6$ = function (list) {
    var tmp$;
    this.spellList_0.clear();
    for (tmp$ = 0; tmp$ !== list.length; ++tmp$) {
      var spell = list[tmp$];
      insertSpellSlot(this, spell);
    }
  };
  Abilities.prototype.setSpecialList_7wy4xh$ = function (list) {
    var tmp$;
    this.specialList_0.clear();
    for (tmp$ = 0; tmp$ !== list.length; ++tmp$) {
      var special = list[tmp$];
      insertSpecialSlot(this, special);
    }
  };
  Abilities.prototype.setClassAbilityList_8n0v8c$ = function (list) {
    var tmp$;
    this.classAbilityList_0.clear();
    for (tmp$ = 0; tmp$ !== list.length; ++tmp$) {
      var classAbility = list[tmp$];
      insertClassSlot(this, classAbility);
    }
  };
  Abilities.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Abilities',
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
    this.rollCounter_0 = 0;
    this.rollID_0 = 0;
    this.rolling_0 = false;
  }
  DiceRoller.prototype.roll_za3lpa$ = function (outOf) {
    if (outOf === void 0)
      outOf = 100;
    return Random.Default.nextInt_vux9f0$(1, outOf);
  };
  function DiceRoller$rollStatButton$lambda(this$DiceRoller, closure$stat, closure$rollStatDisplay, closure$rollRollDisplay) {
    return function (it) {
      var tmp$;
      var lastRoll = this$DiceRoller.roll_za3lpa$();
      closure$rollStatDisplay.textContent = closure$stat.toString();
      closure$rollRollDisplay.textContent = '+ ' + lastRoll;
      if ((tmp$ = this$DiceRoller.rollCounter_0, this$DiceRoller.rollCounter_0 = tmp$ + 1 | 0, tmp$) > 100)
        this$DiceRoller.endRoll_0(closure$stat, lastRoll);
      return null;
    };
  }
  DiceRoller.prototype.rollStatButton_vgc0e7$ = function (player) {
    var tmp$, tmp$_0, tmp$_1, tmp$_2;
    if (this.rolling_0)
      return false;
    this.rolling_0 = true;
    this.resetRoll_0();
    var statSelector = Kotlin.isType(tmp$ = document.getElementById('roll-stat-select'), HTMLSelectElement) ? tmp$ : throwCCE();
    var rollRollDisplay = Kotlin.isType(tmp$_0 = document.getElementById('roll-roll-display'), HTMLSpanElement) ? tmp$_0 : throwCCE();
    var rollStatDisplay = Kotlin.isType(tmp$_1 = document.getElementById('roll-stat-display'), HTMLSpanElement) ? tmp$_1 : throwCCE();
    switch (statSelector.value) {
      case 'AT':
        tmp$_2 = player.baseStats.getAT_6taknv$();
        break;
      case 'DF':
        tmp$_2 = player.baseStats.getDF_6taknv$();
        break;
      case 'MA':
        tmp$_2 = player.baseStats.getMA_6taknv$();
        break;
      case 'MD':
        tmp$_2 = player.baseStats.getMD_6taknv$();
        break;
      case 'STR':
        tmp$_2 = player.baseStats.getSTR_6taknv$();
        break;
      case 'CON':
        tmp$_2 = player.baseStats.getCON_6taknv$();
        break;
      case 'INT':
        tmp$_2 = player.baseStats.getINT_6taknv$();
        break;
      case 'WILL':
        tmp$_2 = player.baseStats.getWIL_6taknv$();
        break;
      case 'SPD':
        tmp$_2 = player.baseStats.getSPD_6taknv$();
        break;
      case 'AC':
        tmp$_2 = player.baseStats.getACC_6taknv$();
        break;
      default:tmp$_2 = player.baseStats.getAT_6taknv$();
        break;
    }
    var stat = tmp$_2;
    this.rollID_0 = setInterval(DiceRoller$rollStatButton$lambda(this, stat, rollStatDisplay, rollRollDisplay), 10);
    return false;
  };
  DiceRoller.prototype.endRoll_0 = function (stat, lastRoll) {
    var tmp$, tmp$_0;
    this.rollCounter_0 = 0;
    this.rolling_0 = false;
    clearInterval(this.rollID_0);
    var rollTypeDisplay = Kotlin.isType(tmp$ = document.getElementById('roll-type-display'), HTMLSpanElement) ? tmp$ : throwCCE();
    var rollTotalDisplay = Kotlin.isType(tmp$_0 = document.getElementById('roll-total-display'), HTMLSpanElement) ? tmp$_0 : throwCCE();
    var tmp$_1;
    tmp$_1 = rollTypeDisplay.textContent;
    var tmp$_2;
    switch (lastRoll) {
      case 100:
        tmp$_2 = 'Perfect Success!!!';
        break;
      case 90:
      case 91:
      case 92:
      case 93:
      case 94:
      case 95:
      case 96:
      case 97:
      case 98:
      case 99:
        tmp$_2 = 'Critical Success!';
        break;
      case 1:
        tmp$_2 = 'Perfect Fail...!';
        break;
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
      case 7:
      case 8:
      case 9:
      case 10:
        tmp$_2 = 'Critical Fail...';
        break;
      default:tmp$_2 = ' ';
        break;
    }
    rollTypeDisplay.textContent = tmp$_1 + tmp$_2;
    rollTotalDisplay.textContent = '= ' + (lastRoll + stat | 0).toString();
  };
  DiceRoller.prototype.resetRoll_0 = function () {
    var tmp$, tmp$_0;
    var rollTypeDisplay = Kotlin.isType(tmp$ = document.getElementById('roll-type-display'), HTMLSpanElement) ? tmp$ : throwCCE();
    var rollTotalDisplay = Kotlin.isType(tmp$_0 = document.getElementById('roll-total-display'), HTMLSpanElement) ? tmp$_0 : throwCCE();
    rollTypeDisplay.textContent = ' ';
    rollTotalDisplay.textContent = ' ';
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
  function Equipment() {
    this.data_nrdhv4$_0 = new Equipment$EquipmentData();
  }
  Equipment.prototype.getEquipmentData = function () {
    return this.data_nrdhv4$_0;
  };
  Equipment.prototype.setEquipmentData_y93d54$ = function (data) {
    this.data_nrdhv4$_0 = data;
  };
  function Equipment$EquipmentData(name, description, icon) {
    if (name === void 0)
      name = '';
    if (description === void 0)
      description = '';
    if (icon === void 0)
      icon = 0;
    this.name = name;
    this.description = description;
    this.icon = icon;
    this.id = generateID();
    this.modifiers = [new Modifier(), new Modifier(), new Modifier(), new Modifier(), new Modifier(), new Modifier(), new Modifier(), new Modifier(), new Modifier(), new Modifier(), new Modifier(), new Modifier(), new Modifier(), new Modifier(), new Modifier(), new Modifier(), new Modifier(), new Modifier(), new Modifier(), new Modifier()];
  }
  Equipment$EquipmentData.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'EquipmentData',
    interfaces: []
  };
  Equipment$EquipmentData.prototype.component1 = function () {
    return this.name;
  };
  Equipment$EquipmentData.prototype.component2 = function () {
    return this.description;
  };
  Equipment$EquipmentData.prototype.component3 = function () {
    return this.icon;
  };
  Equipment$EquipmentData.prototype.copy_rjan26$ = function (name, description, icon) {
    return new Equipment$EquipmentData(name === void 0 ? this.name : name, description === void 0 ? this.description : description, icon === void 0 ? this.icon : icon);
  };
  Equipment$EquipmentData.prototype.toString = function () {
    return 'EquipmentData(name=' + Kotlin.toString(this.name) + (', description=' + Kotlin.toString(this.description)) + (', icon=' + Kotlin.toString(this.icon)) + ')';
  };
  Equipment$EquipmentData.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.name) | 0;
    result = result * 31 + Kotlin.hashCode(this.description) | 0;
    result = result * 31 + Kotlin.hashCode(this.icon) | 0;
    return result;
  };
  Equipment$EquipmentData.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.name, other.name) && Kotlin.equals(this.description, other.description) && Kotlin.equals(this.icon, other.icon)))));
  };
  Equipment.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Equipment',
    interfaces: []
  };
  function Wearable() {
    Equipment.call(this);
    this.data_u1be3f$_0 = new Wearable$WearableData(0);
    this.linkAugSlots_vd9sq1$_0();
  }
  Wearable.prototype.getAugmentSlots = function () {
    return this.data_u1be3f$_0.augmentSlots;
  };
  Wearable.prototype.addAugmentSlot = function () {
    var tmp$;
    tmp$ = this.data_u1be3f$_0;
    tmp$.augmentSlots = tmp$.augmentSlots + 1 | 0;
    this.linkAugSlots_vd9sq1$_0();
  };
  Wearable.prototype.equipAugment_gn419t$ = function (augment) {
    var i = 0;
    while (i < this.data_u1be3f$_0.augments.size) {
      if (equals(this.data_u1be3f$_0.augments.get_za3lpa$(i), new Augment())) {
        this.data_u1be3f$_0.augments.set_wxm5ur$(i, augment);
        return;
      }
      i = i + 1 | 0;
    }
  };
  Wearable.prototype.linkAugSlots_vd9sq1$_0 = function () {
    while (this.data_u1be3f$_0.augments.size < this.data_u1be3f$_0.augmentSlots) {
      this.data_u1be3f$_0.augments.add_11rb$(new Augment());
    }
  };
  Wearable.prototype.getAugmentByID_61zpoe$ = function (ID) {
    var tmp$;
    tmp$ = this.data_u1be3f$_0.augments.iterator();
    while (tmp$.hasNext()) {
      var aug = tmp$.next();
      if (equals(aug.getEquipmentData().id, ID)) {
        return aug;
      }
    }
    return new Augment();
  };
  Wearable.prototype.geGlyphByID_61zpoe$ = function (ID) {
    var tmp$;
    tmp$ = this.data_u1be3f$_0.glyphs.iterator();
    while (tmp$.hasNext()) {
      var gly = tmp$.next();
      if (equals(gly.getEquipmentData().id, ID)) {
        return gly;
      }
    }
    return new Glyph();
  };
  Wearable.prototype.getAbiltyByID_61zpoe$ = function (ID) {
    return new Ability();
  };
  function Wearable$WearableData(augmentSlots) {
    if (augmentSlots === void 0)
      augmentSlots = 0;
    this.augmentSlots = augmentSlots;
    this.augments = ArrayList_init();
    this.glyphs = ArrayList_init();
    this.abilities = ArrayList_init();
  }
  Wearable$WearableData.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'WearableData',
    interfaces: []
  };
  Wearable$WearableData.prototype.component1 = function () {
    return this.augmentSlots;
  };
  Wearable$WearableData.prototype.copy_za3lpa$ = function (augmentSlots) {
    return new Wearable$WearableData(augmentSlots === void 0 ? this.augmentSlots : augmentSlots);
  };
  Wearable$WearableData.prototype.toString = function () {
    return 'WearableData(augmentSlots=' + Kotlin.toString(this.augmentSlots) + ')';
  };
  Wearable$WearableData.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.augmentSlots) | 0;
    return result;
  };
  Wearable$WearableData.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && Kotlin.equals(this.augmentSlots, other.augmentSlots))));
  };
  Wearable.prototype.getData = function () {
    return this.data_u1be3f$_0;
  };
  Wearable.prototype.setData_bqtaff$ = function (augmentList, glyphList, abilityList) {
    this.setAugments_a83qlf$(augmentList);
    this.setGlyphs_80khb2$(glyphList);
    this.setAbilities_41ks7w$(abilityList);
  };
  Wearable.prototype.setAugments_a83qlf$ = function (list) {
    var tmp$;
    this.data_u1be3f$_0.augments.clear();
    for (tmp$ = 0; tmp$ !== list.length; ++tmp$) {
      var augment = list[tmp$];
      this.data_u1be3f$_0.augments.add_11rb$(augment);
    }
    this.linkAugSlots_vd9sq1$_0();
  };
  Wearable.prototype.setGlyphs_80khb2$ = function (list) {
    var tmp$;
    this.data_u1be3f$_0.glyphs.clear();
    for (tmp$ = 0; tmp$ !== list.length; ++tmp$) {
      var glyph = list[tmp$];
      this.data_u1be3f$_0.glyphs.add_11rb$(glyph);
    }
  };
  Wearable.prototype.setAbilities_41ks7w$ = function (list) {
    var tmp$;
    this.data_u1be3f$_0.abilities.clear();
    for (tmp$ = 0; tmp$ !== list.length; ++tmp$) {
      var ability = list[tmp$];
      this.data_u1be3f$_0.abilities.add_11rb$(ability);
    }
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
    this.fileID = 0;
  }
  FileHandler.prototype.save_vgc0e7$ = function (player) {
    var tmp$;
    var playerName = player.traits.getName();
    var clazz = player.traits.getClassName();
    var file = playerName + '-' + clazz + '.demi';
    var text = '{';
    text += '"traits":' + JSON.stringify(player.traits.getData()) + ',';
    text += '"resources":' + JSON.stringify(player.resources.getData()) + ',';
    text += '"baseStats":' + JSON.stringify(player.baseStats.getData()) + ',';
    text += '"combatStats":' + JSON.stringify(player.baseStats.getCombatStats()) + ',';
    text += '"weaponE":' + JSON.stringify(player.weapon.getEquipmentData()) + ',';
    text += '"weaponW":' + JSON.stringify(player.weapon.getData()) + ',';
    text += '"armorE":' + JSON.stringify(player.armor.getEquipmentData()) + ',';
    text += '"armorW":' + JSON.stringify(player.armor.getData()) + ',';
    text += '"accessoryE":' + JSON.stringify(player.accessory.getEquipmentData()) + ',';
    text += '"accessoryW":' + JSON.stringify(player.accessory.getData()) + ',';
    text += '"skills":' + JSON.stringify(player.skills.getSkillList()) + ',';
    text += '"spells":' + JSON.stringify(player.abilities.getSpellList()) + ',';
    text += '"specials":' + JSON.stringify(player.abilities.getSpecialList()) + ',';
    text += '"classAbilities":' + JSON.stringify(player.abilities.getClassAbilityList()) + ',';
    text += '"inventory":' + JSON.stringify(player.inventory.getData());
    text += '}';
    var save = Kotlin.isType(tmp$ = document.createElement('a'), HTMLAnchorElement) ? tmp$ : throwCCE();
    save.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    save.setAttribute('download', file);
    save.style.display = 'none';
    ensureNotNull(document.body).appendChild(save);
    save.click();
    ensureNotNull(document.body).removeChild(save);
  };
  function FileHandler$load$lambda(closure$load, closure$player, this$FileHandler) {
    return function (it) {
      if (!equals(closure$load.value, '')) {
        this$FileHandler.readLoadedFile_0(closure$load, closure$player);
      }
      return null;
    };
  }
  FileHandler.prototype.load_vgc0e7$ = function (player) {
    var tmp$;
    var load = Kotlin.isType(tmp$ = document.createElement('input'), HTMLInputElement) ? tmp$ : throwCCE();
    load.id = 'load-file';
    load.type = 'file';
    load.style.display = 'none';
    ensureNotNull(document.body).appendChild(load);
    load.click();
    this.fileID = setInterval(FileHandler$load$lambda(load, player, this), 10);
    ensureNotNull(document.body).removeChild(load);
  };
  function FileHandler$readLoadedFile$lambda(it) {
    throw IllegalStateException_init('error reading file'.toString());
  }
  function FileHandler$readLoadedFile$lambda_0(closure$fileReader, closure$player, this$FileHandler) {
    return function (it) {
      var tmp$;
      var json = JSON.parse(typeof (tmp$ = closure$fileReader.result) === 'string' ? tmp$ : throwCCE());
      this$FileHandler.assignLoadedData_0(json, closure$player);
      return Unit;
    };
  }
  FileHandler.prototype.readLoadedFile_0 = function (load, player) {
    var tmp$;
    clearInterval(this.fileID);
    var file = ensureNotNull(load.files)[0];
    var fileReader = new FileReader();
    fileReader.onerror = FileHandler$readLoadedFile$lambda;
    fileReader.readAsText(Kotlin.isType(tmp$ = file, Blob) ? tmp$ : throwCCE());
    fileReader.onloadend = FileHandler$readLoadedFile$lambda_0(fileReader, player, this);
  };
  FileHandler.prototype.assignLoadedData_0 = function (json, player) {
    resetPage(player);
    this.assignTraits_0(json, player);
    this.assignResources_0(json, player);
    this.assignStats_0(json, player);
    this.assignEquipment_0(json, player);
    this.assignSkills_0(json, player);
    this.assignAbilities_0(json, player);
    this.assignInventory_0(json, player);
  };
  FileHandler.prototype.assignTraits_0 = function (json, player) {
    var tmp$, tmp$_0, tmp$_1, tmp$_2, tmp$_3;
    player.traits.setData_51v960$(json['traits']);
    (Kotlin.isType(tmp$ = document.getElementById('Name'), HTMLInputElement) ? tmp$ : throwCCE()).value = player.traits.getName();
    (Kotlin.isType(tmp$_0 = document.getElementById('Age'), HTMLInputElement) ? tmp$_0 : throwCCE()).value = player.traits.getAge().toString();
    (Kotlin.isType(tmp$_1 = document.getElementById('Species'), HTMLInputElement) ? tmp$_1 : throwCCE()).value = player.traits.getSpecies();
    (Kotlin.isType(tmp$_2 = document.getElementById('Class'), HTMLInputElement) ? tmp$_2 : throwCCE()).value = player.traits.getClassName();
    (Kotlin.isType(tmp$_3 = document.getElementById('Level'), HTMLInputElement) ? tmp$_3 : throwCCE()).value = player.traits.getLevel().toString();
  };
  FileHandler.prototype.assignResources_0 = function (json, player) {
    var tmp$, tmp$_0, tmp$_1, tmp$_2, tmp$_3, tmp$_4, tmp$_5, tmp$_6, tmp$_7;
    player.resources.setData_1efdba$(json['resources']);
    (Kotlin.isType(tmp$ = document.getElementById('currentHP'), HTMLInputElement) ? tmp$ : throwCCE()).value = player.resources.getCurrentHP().toString();
    (Kotlin.isType(tmp$_0 = document.getElementById('currentMP'), HTMLInputElement) ? tmp$_0 : throwCCE()).value = player.resources.getCurrentMP().toString();
    (Kotlin.isType(tmp$_1 = document.getElementById('currentSP'), HTMLInputElement) ? tmp$_1 : throwCCE()).value = player.resources.getCurrentSP().toString();
    (Kotlin.isType(tmp$_2 = document.getElementById('maxHP'), HTMLInputElement) ? tmp$_2 : throwCCE()).value = player.resources.getMaxHP().toString();
    (Kotlin.isType(tmp$_3 = document.getElementById('maxMP'), HTMLInputElement) ? tmp$_3 : throwCCE()).value = player.resources.getMaxMP().toString();
    (Kotlin.isType(tmp$_4 = document.getElementById('maxSP'), HTMLInputElement) ? tmp$_4 : throwCCE()).value = player.resources.getMaxSP().toString();
    (Kotlin.isType(tmp$_5 = document.getElementById('maxHP-MOD'), HTMLInputElement) ? tmp$_5 : throwCCE()).value = player.resources.getMaxHPModifiers()[0].value.toString();
    (Kotlin.isType(tmp$_6 = document.getElementById('maxMP-MOD'), HTMLInputElement) ? tmp$_6 : throwCCE()).value = player.resources.getMaxMPModifiers()[0].value.toString();
    (Kotlin.isType(tmp$_7 = document.getElementById('maxSP-MOD'), HTMLInputElement) ? tmp$_7 : throwCCE()).value = player.resources.getMaxSPModifiers()[0].value.toString();
  };
  FileHandler.prototype.assignStats_0 = function (json, player) {
    var tmp$, tmp$_0, tmp$_1, tmp$_2, tmp$_3, tmp$_4, tmp$_5, tmp$_6, tmp$_7, tmp$_8, tmp$_9, tmp$_10, tmp$_11, tmp$_12, tmp$_13, tmp$_14, tmp$_15, tmp$_16, tmp$_17, tmp$_18, tmp$_19, tmp$_20, tmp$_21, tmp$_22, tmp$_23, tmp$_24, tmp$_25, tmp$_26, tmp$_27, tmp$_28;
    player.baseStats.setData_jo81tk$(json['baseStats']);
    player.baseStats.setCombatStats_9v9adx$(json['combatStats']);
    (Kotlin.isType(tmp$ = document.getElementById('STR-BASE'), HTMLInputElement) ? tmp$ : throwCCE()).value = player.baseStats.getSTR_6taknv$().toString();
    (Kotlin.isType(tmp$_0 = document.getElementById('CON-BASE'), HTMLInputElement) ? tmp$_0 : throwCCE()).value = player.baseStats.getCON_6taknv$().toString();
    (Kotlin.isType(tmp$_1 = document.getElementById('INT-BASE'), HTMLInputElement) ? tmp$_1 : throwCCE()).value = player.baseStats.getINT_6taknv$().toString();
    (Kotlin.isType(tmp$_2 = document.getElementById('WILL-BASE'), HTMLInputElement) ? tmp$_2 : throwCCE()).value = player.baseStats.getWIL_6taknv$().toString();
    (Kotlin.isType(tmp$_3 = document.getElementById('SPD-BASE'), HTMLInputElement) ? tmp$_3 : throwCCE()).value = player.baseStats.getSPD_6taknv$().toString();
    (Kotlin.isType(tmp$_4 = document.getElementById('AC-BASE'), HTMLInputElement) ? tmp$_4 : throwCCE()).value = player.baseStats.getACC_6taknv$().toString();
    (Kotlin.isType(tmp$_5 = document.getElementById('STR-MOD'), HTMLInputElement) ? tmp$_5 : throwCCE()).value = player.baseStats.getSTRModifiers()[0].value.toString();
    (Kotlin.isType(tmp$_6 = document.getElementById('CON-MOD'), HTMLInputElement) ? tmp$_6 : throwCCE()).value = player.baseStats.getCONModifiers()[0].value.toString();
    (Kotlin.isType(tmp$_7 = document.getElementById('INT-MOD'), HTMLInputElement) ? tmp$_7 : throwCCE()).value = player.baseStats.getINTModifiers()[0].value.toString();
    (Kotlin.isType(tmp$_8 = document.getElementById('WILL-MOD'), HTMLInputElement) ? tmp$_8 : throwCCE()).value = player.baseStats.getWILModifiers()[0].value.toString();
    (Kotlin.isType(tmp$_9 = document.getElementById('SPD-MOD'), HTMLInputElement) ? tmp$_9 : throwCCE()).value = player.baseStats.getSPDModifiers()[0].value.toString();
    (Kotlin.isType(tmp$_10 = document.getElementById('AC-MOD'), HTMLInputElement) ? tmp$_10 : throwCCE()).value = player.baseStats.getACCModifiers()[0].value.toString();
    (Kotlin.isType(tmp$_11 = document.getElementById('AT-MOD'), HTMLInputElement) ? tmp$_11 : throwCCE()).value = player.baseStats.getATModifiers()[0].value.toString();
    (Kotlin.isType(tmp$_12 = document.getElementById('DF-MOD'), HTMLInputElement) ? tmp$_12 : throwCCE()).value = player.baseStats.getDFModifiers()[0].value.toString();
    (Kotlin.isType(tmp$_13 = document.getElementById('MA-MOD'), HTMLInputElement) ? tmp$_13 : throwCCE()).value = player.baseStats.getMAModifiers()[0].value.toString();
    (Kotlin.isType(tmp$_14 = document.getElementById('MD-MOD'), HTMLInputElement) ? tmp$_14 : throwCCE()).value = player.baseStats.getMDModifiers()[0].value.toString();
    (Kotlin.isType(tmp$_15 = document.getElementById('AT-BASE'), HTMLTableCellElement) ? tmp$_15 : throwCCE()).innerText = player.baseStats.getAT_6taknv$(false).toString();
    (Kotlin.isType(tmp$_16 = document.getElementById('DF-BASE'), HTMLTableCellElement) ? tmp$_16 : throwCCE()).innerText = player.baseStats.getDF_6taknv$(false).toString();
    (Kotlin.isType(tmp$_17 = document.getElementById('MA-BASE'), HTMLTableCellElement) ? tmp$_17 : throwCCE()).innerText = player.baseStats.getMA_6taknv$(false).toString();
    (Kotlin.isType(tmp$_18 = document.getElementById('MD-BASE'), HTMLTableCellElement) ? tmp$_18 : throwCCE()).innerText = player.baseStats.getMD_6taknv$(false).toString();
    (Kotlin.isType(tmp$_19 = document.getElementById('AT-TOTAL'), HTMLTableCellElement) ? tmp$_19 : throwCCE()).innerText = player.baseStats.getAT_6taknv$().toString();
    (Kotlin.isType(tmp$_20 = document.getElementById('DF-TOTAL'), HTMLTableCellElement) ? tmp$_20 : throwCCE()).innerText = player.baseStats.getDF_6taknv$().toString();
    (Kotlin.isType(tmp$_21 = document.getElementById('MA-TOTAL'), HTMLTableCellElement) ? tmp$_21 : throwCCE()).innerText = player.baseStats.getMA_6taknv$().toString();
    (Kotlin.isType(tmp$_22 = document.getElementById('MD-TOTAL'), HTMLTableCellElement) ? tmp$_22 : throwCCE()).innerText = player.baseStats.getMD_6taknv$().toString();
    (Kotlin.isType(tmp$_23 = document.getElementById('STR-TOTAL'), HTMLTableCellElement) ? tmp$_23 : throwCCE()).innerText = player.baseStats.getSTR_6taknv$().toString();
    (Kotlin.isType(tmp$_24 = document.getElementById('CON-TOTAL'), HTMLTableCellElement) ? tmp$_24 : throwCCE()).innerText = player.baseStats.getCON_6taknv$().toString();
    (Kotlin.isType(tmp$_25 = document.getElementById('INT-TOTAL'), HTMLTableCellElement) ? tmp$_25 : throwCCE()).innerText = player.baseStats.getINT_6taknv$().toString();
    (Kotlin.isType(tmp$_26 = document.getElementById('WILL-TOTAL'), HTMLTableCellElement) ? tmp$_26 : throwCCE()).innerText = player.baseStats.getWIL_6taknv$().toString();
    (Kotlin.isType(tmp$_27 = document.getElementById('SPD-TOTAL'), HTMLTableCellElement) ? tmp$_27 : throwCCE()).innerText = player.baseStats.getSPD_6taknv$().toString();
    (Kotlin.isType(tmp$_28 = document.getElementById('AC-TOTAL'), HTMLTableCellElement) ? tmp$_28 : throwCCE()).innerText = player.baseStats.getACC_6taknv$().toString();
    player.baseStats.updateCombat();
  };
  FileHandler.prototype.assignEquipment_0 = function (json, player) {
    var tmp$, tmp$_0, tmp$_1;
    player.weapon.setEquipmentData_y93d54$(json['weaponE']);
    player.weapon.setData_bqtaff$(json['weaponW']['augments'], json['weaponW']['glyphs'], json['weaponW']['abilities']);
    player.armor.setEquipmentData_y93d54$(json['armorE']);
    player.armor.setData_bqtaff$(json['armorW']['augments'], json['armorW']['glyphs'], json['armorW']['abilities']);
    player.accessory.setEquipmentData_y93d54$(json['accessoryE']);
    player.accessory.setData_bqtaff$(json['accessoryW']['augments'], json['accessoryW']['glyphs'], json['accessoryW']['abilities']);
    (Kotlin.isType(tmp$ = document.getElementById('weapon'), HTMLTextAreaElement) ? tmp$ : throwCCE()).value = player.weapon.getEquipmentData().description;
    (Kotlin.isType(tmp$_0 = document.getElementById('armor'), HTMLTextAreaElement) ? tmp$_0 : throwCCE()).value = player.armor.getEquipmentData().description;
    (Kotlin.isType(tmp$_1 = document.getElementById('accessory'), HTMLTextAreaElement) ? tmp$_1 : throwCCE()).value = player.accessory.getEquipmentData().description;
  };
  FileHandler.prototype.assignSkills_0 = function (json, player) {
    player.skills.setSkillList_1mzfy9$(json['skills']);
    var times = player.skills.getSkillList().size;
    for (var index = 0; index < times; index++) {
      var tmp$, tmp$_0;
      var skill = player.skills.getSkill_za3lpa$(index);
      var name = skill.name;
      (Kotlin.isType(tmp$ = document.getElementById(name + '-Value'), HTMLInputElement) ? tmp$ : throwCCE()).value = ValueFunctions_getInstance().getValue_4z11p2$(skill.value).toString();
      (Kotlin.isType(tmp$_0 = document.getElementById(name + '-Check'), HTMLInputElement) ? tmp$_0 : throwCCE()).checked = skill.check;
    }
  };
  FileHandler.prototype.assignAbilities_0 = function (json, player) {
    player.abilities.setSpellList_2a6ot6$(json['spells']);
    player.abilities.setSpecialList_7wy4xh$(json['specials']);
    player.abilities.setClassAbilityList_8n0v8c$(json['classAbilities']);
    var times = player.abilities.getSpellList().size;
    for (var index = 0; index < times; index++) {
      var tmp$;
      (Kotlin.isType(tmp$ = document.getElementById('spells-textarea-' + (index + 1 | 0)), HTMLTextAreaElement) ? tmp$ : throwCCE()).value = player.abilities.getSpellList().get_za3lpa$(index).description;
    }
    var times_0 = player.abilities.getSpecialList().size;
    for (var index_0 = 0; index_0 < times_0; index_0++) {
      var tmp$_0;
      (Kotlin.isType(tmp$_0 = document.getElementById('special-textarea-' + (index_0 + 1 | 0)), HTMLTextAreaElement) ? tmp$_0 : throwCCE()).value = player.abilities.getSpecialList().get_za3lpa$(index_0).description;
    }
    var times_1 = player.abilities.getClassAbilityList().size;
    for (var index_1 = 0; index_1 < times_1; index_1++) {
      var tmp$_1;
      (Kotlin.isType(tmp$_1 = document.getElementById('class-abilities-textarea-' + (index_1 + 1 | 0)), HTMLTextAreaElement) ? tmp$_1 : throwCCE()).value = player.abilities.getClassAbilityList().get_za3lpa$(index_1).description;
    }
  };
  FileHandler.prototype.assignInventory_0 = function (json, player) {
    var tmp$, tmp$_0, tmp$_1;
    player.inventory.setData_w0nlav$(json['inventory']['gold'], json['inventory']['items'], json['inventory']['bagType'], json['inventory']['notes']);
    var times = player.inventory.getItems().size;
    for (var index = 0; index < times; index++) {
      var tmp$_2;
      (Kotlin.isType(tmp$_2 = document.getElementById('inventory-slot-' + (index + 1 | 0)), HTMLTextAreaElement) ? tmp$_2 : throwCCE()).value = player.inventory.getItem_za3lpa$(index).description;
    }
    (Kotlin.isType(tmp$ = document.getElementById('gold__textarea'), HTMLTextAreaElement) ? tmp$ : throwCCE()).value = player.inventory.getGold().toString();
    (Kotlin.isType(tmp$_0 = document.getElementById('bag-type__textarea'), HTMLTextAreaElement) ? tmp$_0 : throwCCE()).value = player.inventory.getBagType();
    (Kotlin.isType(tmp$_1 = document.getElementById('notes-div__textarea'), HTMLTextAreaElement) ? tmp$_1 : throwCCE()).value = player.inventory.getNotes();
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
  function setupPage(player) {
    initCharacterSheetListeners(player);
    initSlots(player, 3, 3, 4);
    initItems(player, 10);
    initSkills(player);
    initButtons(player);
    initNavigationBar(player);
  }
  function resetPage(player) {
    while (player.abilities.getSpellList().size > 0) {
      deleteSpellSlot(player.abilities);
    }
    while (player.abilities.getSpecialList().size > 0) {
      deleteSpecialSlot(player.abilities);
    }
    while (player.abilities.getClassAbilityList().size > 0) {
      deleteClassSlot(player.abilities);
    }
    while (player.inventory.getItems().size > 0) {
      deleteItemSlot(player.inventory);
    }
  }
  function initCharacterSheetListeners(player) {
    initTraitListener(player);
    initResourceListener(player);
    initStatListener(player);
    initEquipmentListener(player);
    initInventoryListener(player);
  }
  function initTraitListener$lambda(closure$player) {
    return function (it) {
      var trait = it.target;
      if (Kotlin.isType(trait, HTMLInputElement)) {
        switch (trait.id) {
          case 'Name':
            closure$player.traits.setName_61zpoe$(trait.value);
            break;
          case 'Age':
            closure$player.traits.setAge_za3lpa$(toInt(trait.value));
            break;
          case 'Species':
            closure$player.traits.setSpecies_61zpoe$(trait.value);
            break;
          case 'Class':
            closure$player.traits.setClassName_61zpoe$(trait.value);
            break;
          case 'Level':
            closure$player.traits.setLevel_za3lpa$(toInt(trait.value));
            break;
        }
      }
      return Unit;
    };
  }
  function initTraitListener(player) {
    document.addEventListener('change', initTraitListener$lambda(player));
  }
  function initResourceListener$lambda(closure$player) {
    return function (it) {
      var tmp$, tmp$_0, tmp$_1;
      var resource = it.target;
      if (Kotlin.isType(resource, HTMLInputElement)) {
        switch (resource.id) {
          case 'currentHP':
            closure$player.resources.setCurrentHP_za3lpa$(toInt(resource.value));
            break;
          case 'currentMP':
            closure$player.resources.setCurrentMP_za3lpa$(toInt(resource.value));
            break;
          case 'currentSP':
            closure$player.resources.setCurrentSP_za3lpa$(toInt(resource.value));
            break;
          case 'maxHP':
            closure$player.resources.setMaxHP_za3lpa$(toInt(resource.value));
            break;
          case 'maxMP':
            closure$player.resources.setMaxMP_za3lpa$(toInt(resource.value));
            break;
          case 'maxSP':
            closure$player.resources.setMaxSP_za3lpa$(toInt(resource.value));
            break;
          case 'maxHP-MOD':
            closure$player.resources.getMaxHPModifiers()[0].value = toInt(resource.value);
            break;
          case 'maxMP-MOD':
            closure$player.resources.getMaxMPModifiers()[0].value = toInt(resource.value);
            break;
          case 'maxSP-MOD':
            closure$player.resources.getMaxSPModifiers()[0].value = toInt(resource.value);
            break;
        }
        (Kotlin.isType(tmp$ = document.getElementById('maxHP'), HTMLInputElement) ? tmp$ : throwCCE()).value = closure$player.resources.getMaxHP().toString();
        (Kotlin.isType(tmp$_0 = document.getElementById('maxMP'), HTMLInputElement) ? tmp$_0 : throwCCE()).value = closure$player.resources.getMaxMP().toString();
        (Kotlin.isType(tmp$_1 = document.getElementById('maxSP'), HTMLInputElement) ? tmp$_1 : throwCCE()).value = closure$player.resources.getMaxSP().toString();
      }
      return Unit;
    };
  }
  function initResourceListener(player) {
    document.addEventListener('change', initResourceListener$lambda(player));
  }
  function initStatListener$lambda(closure$player) {
    return function (it) {
      var tmp$, tmp$_0, tmp$_1, tmp$_2, tmp$_3, tmp$_4, tmp$_5, tmp$_6, tmp$_7, tmp$_8, tmp$_9, tmp$_10, tmp$_11, tmp$_12;
      var stat = it.target;
      if (Kotlin.isType(stat, HTMLInputElement)) {
        switch (stat.id) {
          case 'STR-BASE':
            closure$player.baseStats.setSTR_za3lpa$(toInt(stat.value));
            break;
          case 'CON-BASE':
            closure$player.baseStats.setCON_za3lpa$(toInt(stat.value));
            break;
          case 'INT-BASE':
            closure$player.baseStats.setINT_za3lpa$(toInt(stat.value));
            break;
          case 'WILL-BASE':
            closure$player.baseStats.setWIL_za3lpa$(toInt(stat.value));
            break;
          case 'SPD-BASE':
            closure$player.baseStats.setSPD_za3lpa$(toInt(stat.value));
            break;
          case 'AC-BASE':
            closure$player.baseStats.setACC_za3lpa$(toInt(stat.value));
            break;
          case 'STR-MOD':
            closure$player.baseStats.getSTRModifiers()[0].value = toInt(stat.value);
            break;
          case 'CON-MOD':
            closure$player.baseStats.getCONModifiers()[0].value = toInt(stat.value);
            break;
          case 'INT-MOD':
            closure$player.baseStats.getINTModifiers()[0].value = toInt(stat.value);
            break;
          case 'WILL-MOD':
            closure$player.baseStats.getWILModifiers()[0].value = toInt(stat.value);
            break;
          case 'SPD-MOD':
            closure$player.baseStats.getSPDModifiers()[0].value = toInt(stat.value);
            break;
          case 'AC-MOD':
            closure$player.baseStats.getACCModifiers()[0].value = toInt(stat.value);
            break;
          case 'AT-MOD':
            closure$player.baseStats.getATModifiers()[0].value = toInt(stat.value);
            break;
          case 'DF-MOD':
            closure$player.baseStats.getDFModifiers()[0].value = toInt(stat.value);
            break;
          case 'MA-MOD':
            closure$player.baseStats.getMAModifiers()[0].value = toInt(stat.value);
            break;
          case 'MD-MOD':
            closure$player.baseStats.getMDModifiers()[0].value = toInt(stat.value);
            break;
        }
        closure$player.baseStats.updateCombat();
        (Kotlin.isType(tmp$ = document.getElementById('AT-BASE'), HTMLTableCellElement) ? tmp$ : throwCCE()).innerText = closure$player.baseStats.getAT_6taknv$(false).toString();
        (Kotlin.isType(tmp$_0 = document.getElementById('DF-BASE'), HTMLTableCellElement) ? tmp$_0 : throwCCE()).innerText = closure$player.baseStats.getDF_6taknv$(false).toString();
        (Kotlin.isType(tmp$_1 = document.getElementById('MA-BASE'), HTMLTableCellElement) ? tmp$_1 : throwCCE()).innerText = closure$player.baseStats.getMA_6taknv$(false).toString();
        (Kotlin.isType(tmp$_2 = document.getElementById('MD-BASE'), HTMLTableCellElement) ? tmp$_2 : throwCCE()).innerText = closure$player.baseStats.getMD_6taknv$(false).toString();
        (Kotlin.isType(tmp$_3 = document.getElementById('AT-TOTAL'), HTMLTableCellElement) ? tmp$_3 : throwCCE()).innerText = closure$player.baseStats.getAT_6taknv$().toString();
        (Kotlin.isType(tmp$_4 = document.getElementById('DF-TOTAL'), HTMLTableCellElement) ? tmp$_4 : throwCCE()).innerText = closure$player.baseStats.getDF_6taknv$().toString();
        (Kotlin.isType(tmp$_5 = document.getElementById('MA-TOTAL'), HTMLTableCellElement) ? tmp$_5 : throwCCE()).innerText = closure$player.baseStats.getMA_6taknv$().toString();
        (Kotlin.isType(tmp$_6 = document.getElementById('MD-TOTAL'), HTMLTableCellElement) ? tmp$_6 : throwCCE()).innerText = closure$player.baseStats.getMD_6taknv$().toString();
        (Kotlin.isType(tmp$_7 = document.getElementById('STR-TOTAL'), HTMLTableCellElement) ? tmp$_7 : throwCCE()).innerText = closure$player.baseStats.getSTR_6taknv$().toString();
        (Kotlin.isType(tmp$_8 = document.getElementById('CON-TOTAL'), HTMLTableCellElement) ? tmp$_8 : throwCCE()).innerText = closure$player.baseStats.getCON_6taknv$().toString();
        (Kotlin.isType(tmp$_9 = document.getElementById('INT-TOTAL'), HTMLTableCellElement) ? tmp$_9 : throwCCE()).innerText = closure$player.baseStats.getINT_6taknv$().toString();
        (Kotlin.isType(tmp$_10 = document.getElementById('WILL-TOTAL'), HTMLTableCellElement) ? tmp$_10 : throwCCE()).innerText = closure$player.baseStats.getWIL_6taknv$().toString();
        (Kotlin.isType(tmp$_11 = document.getElementById('SPD-TOTAL'), HTMLTableCellElement) ? tmp$_11 : throwCCE()).innerText = closure$player.baseStats.getSPD_6taknv$().toString();
        (Kotlin.isType(tmp$_12 = document.getElementById('AC-TOTAL'), HTMLTableCellElement) ? tmp$_12 : throwCCE()).innerText = closure$player.baseStats.getACC_6taknv$().toString();
      }
      return Unit;
    };
  }
  function initStatListener(player) {
    document.addEventListener('change', initStatListener$lambda(player));
  }
  function initEquipmentListener$lambda(closure$player) {
    return function (it) {
      var equipment = it.target;
      if (Kotlin.isType(equipment, HTMLTextAreaElement)) {
        switch (equipment.id) {
          case 'weapon':
            closure$player.weapon.getEquipmentData().description = equipment.value;
            break;
          case 'armor':
            closure$player.armor.getEquipmentData().description = equipment.value;
            break;
          case 'accessory':
            closure$player.accessory.getEquipmentData().description = equipment.value;
            break;
        }
      }
      return Unit;
    };
  }
  function initEquipmentListener(player) {
    document.addEventListener('change', initEquipmentListener$lambda(player));
  }
  function initInventoryListener$lambda(closure$player, closure$gold) {
    return function (it) {
      closure$player.inventory.setGold_za3lpa$(toInt(closure$gold.value));
      return Unit;
    };
  }
  function initInventoryListener$lambda_0(closure$player, closure$bagType) {
    return function (it) {
      closure$player.inventory.setBagType_61zpoe$(closure$bagType.value);
      return Unit;
    };
  }
  function initInventoryListener$lambda_1(closure$player, closure$notes) {
    return function (it) {
      closure$player.inventory.setNotes_61zpoe$(closure$notes.value);
      return Unit;
    };
  }
  function initInventoryListener(player) {
    var tmp$, tmp$_0, tmp$_1;
    var gold = Kotlin.isType(tmp$ = document.getElementById('gold__textarea'), HTMLTextAreaElement) ? tmp$ : throwCCE();
    gold.addEventListener('change', initInventoryListener$lambda(player, gold));
    var bagType = Kotlin.isType(tmp$_0 = document.getElementById('bag-type__textarea'), HTMLTextAreaElement) ? tmp$_0 : throwCCE();
    bagType.addEventListener('change', initInventoryListener$lambda_0(player, bagType));
    var notes = Kotlin.isType(tmp$_1 = document.getElementById('notes-div__textarea'), HTMLTextAreaElement) ? tmp$_1 : throwCCE();
    notes.addEventListener('change', initInventoryListener$lambda_1(player, notes));
  }
  function initNavigationBar$lambda(closure$player) {
    return function (it) {
      FileHandler_getInstance().save_vgc0e7$(closure$player);
      return Unit;
    };
  }
  function initNavigationBar$lambda_0(closure$player) {
    return function (it) {
      FileHandler_getInstance().load_vgc0e7$(closure$player);
      return Unit;
    };
  }
  function initNavigationBar(player) {
    var tmp$, tmp$_0;
    (Kotlin.isType(tmp$ = document.getElementById('main-navbar__icon__save-button'), HTMLButtonElement) ? tmp$ : throwCCE()).onclick = initNavigationBar$lambda(player);
    (Kotlin.isType(tmp$_0 = document.getElementById('main-navbar__icon__load-button'), HTMLButtonElement) ? tmp$_0 : throwCCE()).onclick = initNavigationBar$lambda_0(player);
  }
  function initButtons$lambda(closure$player) {
    return function (it) {
      return insertSpellSlot(closure$player.abilities);
    };
  }
  function initButtons$lambda_0(closure$player) {
    return function (it) {
      return insertSpecialSlot(closure$player.abilities);
    };
  }
  function initButtons$lambda_1(closure$player) {
    return function (it) {
      return insertClassSlot(closure$player.abilities);
    };
  }
  function initButtons$lambda_2(closure$player) {
    return function (it) {
      return deleteSpellSlot(closure$player.abilities);
    };
  }
  function initButtons$lambda_3(closure$player) {
    return function (it) {
      return deleteSpecialSlot(closure$player.abilities);
    };
  }
  function initButtons$lambda_4(closure$player) {
    return function (it) {
      return deleteClassSlot(closure$player.abilities);
    };
  }
  function initButtons$lambda_5(closure$player) {
    return function (it) {
      return insertItemSlot(closure$player.inventory);
    };
  }
  function initButtons$lambda_6(closure$player) {
    return function (it) {
      return deleteItemSlot(closure$player.inventory);
    };
  }
  function initButtons$lambda_7(closure$player) {
    return function (it) {
      return DiceRoller_getInstance().rollStatButton_vgc0e7$(closure$player).toString();
    };
  }
  function initButtons$lambda_8(closure$rollStatSelector, closure$player) {
    return function (it) {
      var tmp$, tmp$_0;
      var span = document.getElementById('roll-stat-display');
      tmp$_0 = ensureNotNull(span);
      switch (closure$rollStatSelector.value) {
        case 'AT':
          tmp$ = closure$player.baseStats.getAT_6taknv$().toString();
          break;
        case 'DF':
          tmp$ = closure$player.baseStats.getDF_6taknv$().toString();
          break;
        case 'MA':
          tmp$ = closure$player.baseStats.getMA_6taknv$().toString();
          break;
        case 'MD':
          tmp$ = closure$player.baseStats.getMD_6taknv$().toString();
          break;
        case 'STR':
          tmp$ = closure$player.baseStats.getSTR_6taknv$().toString();
          break;
        case 'CON':
          tmp$ = closure$player.baseStats.getCON_6taknv$().toString();
          break;
        case 'INT':
          tmp$ = closure$player.baseStats.getINT_6taknv$().toString();
          break;
        case 'WILL':
          tmp$ = closure$player.baseStats.getWIL_6taknv$().toString();
          break;
        case 'SPD':
          tmp$ = closure$player.baseStats.getSPD_6taknv$().toString();
          break;
        case 'AC':
          tmp$ = closure$player.baseStats.getACC_6taknv$().toString();
          break;
        default:tmp$ = closure$player.baseStats.getAT_6taknv$().toString();
          break;
      }
      tmp$_0.textContent = tmp$;
      return Unit;
    };
  }
  function initButtons(player) {
    var tmp$, tmp$_0, tmp$_1, tmp$_2, tmp$_3, tmp$_4, tmp$_5, tmp$_6, tmp$_7, tmp$_8;
    (Kotlin.isType(tmp$ = document.getElementById('spells-div__button-add'), HTMLButtonElement) ? tmp$ : throwCCE()).onclick = initButtons$lambda(player);
    (Kotlin.isType(tmp$_0 = document.getElementById('special-div__button-add'), HTMLButtonElement) ? tmp$_0 : throwCCE()).onclick = initButtons$lambda_0(player);
    (Kotlin.isType(tmp$_1 = document.getElementById('class-abilities-div__button-add'), HTMLButtonElement) ? tmp$_1 : throwCCE()).onclick = initButtons$lambda_1(player);
    (Kotlin.isType(tmp$_2 = document.getElementById('spells-div__button-del'), HTMLButtonElement) ? tmp$_2 : throwCCE()).onclick = initButtons$lambda_2(player);
    (Kotlin.isType(tmp$_3 = document.getElementById('special-div__button-del'), HTMLButtonElement) ? tmp$_3 : throwCCE()).onclick = initButtons$lambda_3(player);
    (Kotlin.isType(tmp$_4 = document.getElementById('class-abilities-div__button-del'), HTMLButtonElement) ? tmp$_4 : throwCCE()).onclick = initButtons$lambda_4(player);
    (Kotlin.isType(tmp$_5 = document.getElementById('inventory-div__button-add'), HTMLButtonElement) ? tmp$_5 : throwCCE()).onclick = initButtons$lambda_5(player);
    (Kotlin.isType(tmp$_6 = document.getElementById('inventory-div__button-del'), HTMLButtonElement) ? tmp$_6 : throwCCE()).onclick = initButtons$lambda_6(player);
    var rollStatButton = Kotlin.isType(tmp$_7 = document.getElementById('roll'), HTMLButtonElement) ? tmp$_7 : throwCCE();
    rollStatButton.onclick = initButtons$lambda_7(player);
    var rollStatSelector = Kotlin.isType(tmp$_8 = document.getElementById('roll-stat-select'), HTMLSelectElement) ? tmp$_8 : throwCCE();
    rollStatSelector.addEventListener('change', initButtons$lambda_8(rollStatSelector, player));
  }
  function initSlots(player, spellSlots, specialSlots, classSlots) {
    for (var index = 0; index < spellSlots; index++) {
      insertSpellSlot(player.abilities);
    }
    for (var index_0 = 0; index_0 < specialSlots; index_0++) {
      insertSpecialSlot(player.abilities);
    }
    for (var index_1 = 0; index_1 < classSlots; index_1++) {
      insertClassSlot(player.abilities);
    }
  }
  function initSkills$lambda$lambda(closure$player, closure$skillName) {
    return function (it) {
      var tmp$;
      ensureNotNull(closure$player.skills.getSkill_61zpoe$(closure$skillName)).value.base = toInt((Kotlin.isType(tmp$ = it.target, HTMLInputElement) ? tmp$ : throwCCE()).value);
      return Unit;
    };
  }
  function initSkills$lambda$lambda_0(closure$checkbox, closure$player, closure$skillName) {
    return function (it) {
      ensureNotNull(closure$player.skills.getSkill_61zpoe$(closure$skillName)).check = closure$checkbox.checked;
      return Unit;
    };
  }
  function initSkills(player) {
    var tmp$;
    var table = Kotlin.isType(tmp$ = document.getElementById('skill-tree'), HTMLTableElement) ? tmp$ : throwCCE();
    var index = {v: 0};
    while (index.v < player.skills.getSkillList().size) {
      var row = table.insertRow();
      for (var index_0 = 0; index_0 < 2; index_0++) {
        var tmp$_0, tmp$_1;
        var skillName = player.skills.getSkillList().get_za3lpa$(index.v).name;
        var label = row.insertCell();
        addClass(label, ['skill-tree__label']);
        label.innerText = skillName;
        var value = row.insertCell();
        var input = Kotlin.isType(tmp$_0 = document.createElement('input'), HTMLInputElement) ? tmp$_0 : throwCCE();
        input.type = 'number';
        input.name = 'skill-number';
        input.id = skillName + '-Value';
        input.placeholder = '0';
        addClass(input, ['skill-tree__number']);
        input.addEventListener('change', initSkills$lambda$lambda(player, skillName));
        value.appendChild(input);
        var check = row.insertCell();
        addClass(check, ['skill-tree__td-checkbox']);
        var checkbox = Kotlin.isType(tmp$_1 = document.createElement('input'), HTMLInputElement) ? tmp$_1 : throwCCE();
        checkbox.type = 'checkbox';
        checkbox.name = 'roll-check';
        checkbox.id = skillName + '-Check';
        addClass(checkbox, ['skill-tree__checkbox']);
        checkbox.addEventListener('change', initSkills$lambda$lambda_0(checkbox, player, skillName));
        check.appendChild(checkbox);
        index.v = index.v + 1 | 0;
      }
    }
  }
  function initItems(player, amount) {
    for (var index = 0; index < amount; index++) {
      insertItemSlot(player.inventory);
    }
  }
  function insertSpellSlot(abilities, spell, image) {
    if (spell === void 0)
      spell = new Spell();
    if (image === void 0)
      image = 'Spell-Circle-Icon-Web-Dev80px.png';
    abilities.getSpellList().add_11rb$(spell);
    return insertAbilitySlot(abilities, 'spells', image, abilities.getSpellList().size);
  }
  function insertSpecialSlot(abilities, special, image) {
    if (special === void 0)
      special = new Special();
    if (image === void 0)
      image = 'Triangle Icon - Web Dev.png';
    abilities.getSpecialList().add_11rb$(special);
    return insertAbilitySlot(abilities, 'special', image, abilities.getSpecialList().size);
  }
  function insertClassSlot(abilities, classAbility, image) {
    if (classAbility === void 0)
      classAbility = new ClassAbility();
    if (image === void 0)
      image = 'class-abilities-demigod100px.png';
    abilities.getClassAbilityList().add_11rb$(classAbility);
    return insertAbilitySlot(abilities, 'class-abilities', image, abilities.getClassAbilityList().size);
  }
  function insertAbilitySlot$lambda(closure$type, closure$abilities, closure$size) {
    return function (it) {
      var tmp$, tmp$_0, tmp$_1;
      switch (closure$type) {
        case 'spells':
          closure$abilities.getSpellList().get_za3lpa$(closure$size - 1 | 0).description = (Kotlin.isType(tmp$ = it.target, HTMLTextAreaElement) ? tmp$ : throwCCE()).value;
          break;
        case 'special':
          closure$abilities.getSpecialList().get_za3lpa$(closure$size - 1 | 0).description = (Kotlin.isType(tmp$_0 = it.target, HTMLTextAreaElement) ? tmp$_0 : throwCCE()).value;
          break;
        case 'class-abilities':
          closure$abilities.getClassAbilityList().get_za3lpa$(closure$size - 1 | 0).description = (Kotlin.isType(tmp$_1 = it.target, HTMLTextAreaElement) ? tmp$_1 : throwCCE()).value;
          break;
      }
      return Unit;
    };
  }
  function insertAbilitySlot(abilities, type, image, size) {
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
    img.id = type + '-img-' + size;
    icon.appendChild(img);
    var text = row.insertCell(1);
    addClass(text, [type + '-div__td-textarea']);
    var textarea = Kotlin.isType(tmp$_1 = document.createElement('textarea'), HTMLTextAreaElement) ? tmp$_1 : throwCCE();
    addClass(textarea, [type + '-div__textarea']);
    textarea.id = type + '-textarea-' + size;
    textarea.addEventListener('change', insertAbilitySlot$lambda(type, abilities, size));
    text.appendChild(textarea);
    return false;
  }
  function deleteSpellSlot(abilities) {
    var tmp$;
    var table = Kotlin.isType(tmp$ = document.getElementById('spells-div__table'), HTMLTableElement) ? tmp$ : throwCCE();
    table.deleteRow(table.rows.length - 1 | 0);
    abilities.getSpellList().removeAt_za3lpa$(abilities.getSpellList().size - 1 | 0);
    return false;
  }
  function deleteSpecialSlot(abilities) {
    var tmp$;
    var table = Kotlin.isType(tmp$ = document.getElementById('special-div__table'), HTMLTableElement) ? tmp$ : throwCCE();
    table.deleteRow(table.rows.length - 1 | 0);
    abilities.getSpecialList().removeAt_za3lpa$(abilities.getSpecialList().size - 1 | 0);
    return false;
  }
  function deleteClassSlot(abilities) {
    var tmp$;
    var table = Kotlin.isType(tmp$ = document.getElementById('class-abilities-div__table'), HTMLTableElement) ? tmp$ : throwCCE();
    table.deleteRow(table.rows.length - 1 | 0);
    abilities.getClassAbilityList().removeAt_za3lpa$(abilities.getClassAbilityList().size - 1 | 0);
    return false;
  }
  function insertItemSlot(inventory, item) {
    if (item === void 0)
      item = new Item();
    var tmp$, tmp$_0;
    var table = Kotlin.isType(tmp$ = document.getElementById('inventory-div__slot-table'), HTMLTableElement) ? tmp$ : throwCCE();
    var row;
    if (table.rows.length === 0) {
      row = table.insertRow();
    }
     else {
      row = Kotlin.isType(tmp$_0 = table.rows[table.rows.length - 1 | 0], HTMLTableRowElement) ? tmp$_0 : throwCCE();
      if (row.cells.length === 3) {
        row = table.insertRow();
      }
    }
    row.insertCell().appendChild(createItemSlot(inventory, item));
    return false;
  }
  function createItemSlot$lambda(closure$inventory, closure$index) {
    return function (it) {
      var tmp$;
      closure$inventory.getItem_za3lpa$(closure$index).description = (Kotlin.isType(tmp$ = it.target, HTMLTextAreaElement) ? tmp$ : throwCCE()).value;
      return Unit;
    };
  }
  function createItemSlot(inventory, item) {
    var tmp$;
    inventory.addItem_1d2k3$(item);
    var textarea = Kotlin.isType(tmp$ = document.createElement('textarea'), HTMLTextAreaElement) ? tmp$ : throwCCE();
    textarea.name = 'inventory-slot';
    addClass(textarea, ['inventory-div__slot']);
    textarea.id = 'inventory-slot-' + toString(inventory.getSize());
    var index = inventory.getSize() - 1 | 0;
    textarea.addEventListener('change', createItemSlot$lambda(inventory, index));
    return textarea;
  }
  function deleteItemSlot(inventory) {
    var tmp$, tmp$_0, tmp$_1;
    if (inventory.getSize() === 0) {
      return false;
    }
    inventory.removeLastItem();
    var table = Kotlin.isType(tmp$ = document.getElementById('inventory-div__slot-table'), HTMLTableElement) ? tmp$ : throwCCE();
    var row = Kotlin.isType(tmp$_0 = table.rows[table.rows.length - 1 | 0], HTMLTableRowElement) ? tmp$_0 : throwCCE();
    if (row.cells.length === 1) {
      table.deleteRow(table.rows.length - 1 | 0);
    }
     else if (row.cells.length === 3) {
      row.deleteCell(row.cells.length - 1 | 0);
    }
     else {
      var item = inventory.removeLastItem();
      table.deleteRow(table.rows.length - 1 | 0);
      insertItemSlot(inventory, item);
      var size = inventory.getSize();
      (Kotlin.isType(tmp$_1 = document.getElementById('inventory-slot-' + size), HTMLTextAreaElement) ? tmp$_1 : throwCCE()).value = inventory.getItem_za3lpa$(size - 1 | 0).description;
    }
    return false;
  }
  function Inventory() {
    this.data_0 = new Inventory$InventoryData();
  }
  Inventory.prototype.addItem_1d2k3$ = function (item) {
    this.data_0.items.add_11rb$(item);
  };
  Inventory.prototype.getItem_61zpoe$ = function (ID) {
    return null;
  };
  Inventory.prototype.getItem_za3lpa$ = function (index) {
    return this.data_0.items.get_za3lpa$(index);
  };
  Inventory.prototype.removeItem_61zpoe$ = function (ID) {
    var tmp$;
    tmp$ = this.data_0.items.iterator();
    while (tmp$.hasNext()) {
      var item = tmp$.next();
      if (equals(item.id, ID)) {
        this.data_0.items.remove_11rb$(item);
        return item;
      }
    }
    return null;
  };
  Inventory.prototype.removeLastItem = function () {
    return this.data_0.items.removeAt_za3lpa$(this.data_0.items.size - 1 | 0);
  };
  Inventory.prototype.useItem_61zpoe$ = function (ID) {
    var tmp$;
    tmp$ = this.data_0.items.iterator();
    while (tmp$.hasNext()) {
      var item = tmp$.next();
      if (equals(item.id, ID)) {
        item.amount = item.amount - 1 | 0;
        if (item.amount === 0) {
          this.data_0.items.remove_11rb$(item);
        }
        return true;
      }
    }
    return false;
  };
  Inventory.prototype.getGold = function () {
    return this.data_0.gold;
  };
  Inventory.prototype.getSize = function () {
    return this.data_0.items.size;
  };
  Inventory.prototype.getItems = function () {
    return this.data_0.items;
  };
  Inventory.prototype.getBagType = function () {
    return this.data_0.bagType;
  };
  Inventory.prototype.getNotes = function () {
    return this.data_0.notes;
  };
  Inventory.prototype.setGold_za3lpa$ = function (gold) {
    this.data_0.gold = gold;
  };
  Inventory.prototype.setItems_b8cx4r$ = function (list) {
    var tmp$;
    this.data_0.items.clear();
    for (tmp$ = 0; tmp$ !== list.length; ++tmp$) {
      var item = list[tmp$];
      insertItemSlot(this, item);
    }
  };
  Inventory.prototype.setBagType_61zpoe$ = function (bagType) {
    this.data_0.bagType = bagType;
  };
  Inventory.prototype.setNotes_61zpoe$ = function (notes) {
    this.data_0.notes = notes;
  };
  function Inventory$InventoryData(gold) {
    if (gold === void 0)
      gold = 0;
    this.gold = gold;
    this.items = ArrayList_init();
    this.bagType = '';
    this.notes = '';
  }
  Inventory$InventoryData.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'InventoryData',
    interfaces: []
  };
  Inventory$InventoryData.prototype.component1 = function () {
    return this.gold;
  };
  Inventory$InventoryData.prototype.copy_za3lpa$ = function (gold) {
    return new Inventory$InventoryData(gold === void 0 ? this.gold : gold);
  };
  Inventory$InventoryData.prototype.toString = function () {
    return 'InventoryData(gold=' + Kotlin.toString(this.gold) + ')';
  };
  Inventory$InventoryData.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.gold) | 0;
    return result;
  };
  Inventory$InventoryData.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && Kotlin.equals(this.gold, other.gold))));
  };
  Inventory.prototype.getData = function () {
    return this.data_0;
  };
  Inventory.prototype.setData_w0nlav$ = function (gold, items, bagType, notes) {
    this.setGold_za3lpa$(gold);
    this.setItems_b8cx4r$(items);
    this.setBagType_61zpoe$(bagType);
    this.setNotes_61zpoe$(notes);
  };
  Inventory.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Inventory',
    interfaces: []
  };
  function Item(name, amount, description, effect) {
    if (name === void 0)
      name = '';
    if (amount === void 0)
      amount = 1;
    if (description === void 0)
      description = '';
    if (effect === void 0)
      effect = new Ability();
    this.name = name;
    this.amount = amount;
    this.description = description;
    this.effect = effect;
    this.id = generateID();
  }
  Item.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Item',
    interfaces: []
  };
  function main$lambda(it) {
    it.preventDefault();
    return Unit;
  }
  function main() {
    var player = new Player();
    tempSheetLogic(player);
    setupPage(player);
    ensureNotNull(document.getElementById('resource-stats__form')).addEventListener('submit', main$lambda);
  }
  function tempSheetLogic(player) {
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
    this.traits = new Traits();
    this.resources = new Resources();
    this.baseStats = new BaseStats();
    this.skills = new Skills();
    this.statChecker = new StatChecker(this);
    this.weapon = new Weapon();
    this.armor = new Armor();
    this.accessory = new Accessory();
    this.abilities = new Abilities();
    this.inventory = new Inventory();
  }
  Player.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Player',
    interfaces: []
  };
  function BaseStats(data) {
    if (data === void 0)
      data = new BaseStats$BaseStatsData();
    this.data_0 = data;
    this.combatStats_0 = new BaseStats$CombatStats();
  }
  BaseStats.prototype.updateCombat = function () {
    this.setATBase_za3lpa$(ValueFunctions_getInstance().getValue_4z11p2$(this.data_0.str) * 2 | 0);
    this.setDFBase_za3lpa$(ValueFunctions_getInstance().getValue_4z11p2$(this.data_0.con) * 1 | 0);
    this.setMABase_za3lpa$(ValueFunctions_getInstance().getValue_4z11p2$(this.data_0.int) * 2 | 0);
    this.setMDBase_za3lpa$(ValueFunctions_getInstance().getValue_4z11p2$(this.data_0.wil) * 1 | 0);
  };
  BaseStats.prototype.setSTR_za3lpa$ = function (value) {
    this.data_0.str.base = value;
    this.updateCombat();
  };
  BaseStats.prototype.setCON_za3lpa$ = function (value) {
    this.data_0.con.base = value;
    this.updateCombat();
  };
  BaseStats.prototype.setINT_za3lpa$ = function (value) {
    this.data_0.int.base = value;
    this.updateCombat();
  };
  BaseStats.prototype.setWIL_za3lpa$ = function (value) {
    this.data_0.wil.base = value;
    this.updateCombat();
  };
  BaseStats.prototype.setSPD_za3lpa$ = function (value) {
    this.data_0.spd.base = value;
  };
  BaseStats.prototype.setACC_za3lpa$ = function (value) {
    this.data_0.acc.base = value;
  };
  BaseStats.prototype.setATBase_za3lpa$ = function (base) {
    this.combatStats_0.at.base = base;
  };
  BaseStats.prototype.setDFBase_za3lpa$ = function (base) {
    this.combatStats_0.df.base = base;
  };
  BaseStats.prototype.setMABase_za3lpa$ = function (base) {
    this.combatStats_0.ma.base = base;
  };
  BaseStats.prototype.setMDBase_za3lpa$ = function (base) {
    this.combatStats_0.md.base = base;
  };
  BaseStats.prototype.getSTR_6taknv$ = function (includeMods) {
    if (includeMods === void 0)
      includeMods = true;
    return ValueFunctions_getInstance().getValue_4z11p2$(this.data_0.str, includeMods);
  };
  BaseStats.prototype.getCON_6taknv$ = function (includeMods) {
    if (includeMods === void 0)
      includeMods = true;
    return ValueFunctions_getInstance().getValue_4z11p2$(this.data_0.con, includeMods);
  };
  BaseStats.prototype.getINT_6taknv$ = function (includeMods) {
    if (includeMods === void 0)
      includeMods = true;
    return ValueFunctions_getInstance().getValue_4z11p2$(this.data_0.int, includeMods);
  };
  BaseStats.prototype.getWIL_6taknv$ = function (includeMods) {
    if (includeMods === void 0)
      includeMods = true;
    return ValueFunctions_getInstance().getValue_4z11p2$(this.data_0.wil, includeMods);
  };
  BaseStats.prototype.getSPD_6taknv$ = function (includeMods) {
    if (includeMods === void 0)
      includeMods = true;
    return ValueFunctions_getInstance().getValue_4z11p2$(this.data_0.spd, includeMods);
  };
  BaseStats.prototype.getACC_6taknv$ = function (includeMods) {
    if (includeMods === void 0)
      includeMods = true;
    return ValueFunctions_getInstance().getValue_4z11p2$(this.data_0.acc, includeMods);
  };
  BaseStats.prototype.getAT_6taknv$ = function (includeMods) {
    if (includeMods === void 0)
      includeMods = true;
    return ValueFunctions_getInstance().getValue_4z11p2$(this.combatStats_0.at, includeMods);
  };
  BaseStats.prototype.getDF_6taknv$ = function (includeMods) {
    if (includeMods === void 0)
      includeMods = true;
    return ValueFunctions_getInstance().getValue_4z11p2$(this.combatStats_0.df, includeMods);
  };
  BaseStats.prototype.getMA_6taknv$ = function (includeMods) {
    if (includeMods === void 0)
      includeMods = true;
    return ValueFunctions_getInstance().getValue_4z11p2$(this.combatStats_0.ma, includeMods);
  };
  BaseStats.prototype.getMD_6taknv$ = function (includeMods) {
    if (includeMods === void 0)
      includeMods = true;
    return ValueFunctions_getInstance().getValue_4z11p2$(this.combatStats_0.md, includeMods);
  };
  BaseStats.prototype.getSTRModifiers = function () {
    return this.data_0.str.modifiers;
  };
  BaseStats.prototype.getCONModifiers = function () {
    return this.data_0.con.modifiers;
  };
  BaseStats.prototype.getINTModifiers = function () {
    return this.data_0.int.modifiers;
  };
  BaseStats.prototype.getWILModifiers = function () {
    return this.data_0.wil.modifiers;
  };
  BaseStats.prototype.getSPDModifiers = function () {
    return this.data_0.spd.modifiers;
  };
  BaseStats.prototype.getACCModifiers = function () {
    return this.data_0.acc.modifiers;
  };
  BaseStats.prototype.getATModifiers = function () {
    return this.combatStats_0.at.modifiers;
  };
  BaseStats.prototype.getDFModifiers = function () {
    return this.combatStats_0.df.modifiers;
  };
  BaseStats.prototype.getMAModifiers = function () {
    return this.combatStats_0.ma.modifiers;
  };
  BaseStats.prototype.getMDModifiers = function () {
    return this.combatStats_0.md.modifiers;
  };
  function BaseStats$BaseStatsData(str, con, int, wil, spd, acc) {
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
    this.str = str;
    this.con = con;
    this.int = int;
    this.wil = wil;
    this.spd = spd;
    this.acc = acc;
  }
  BaseStats$BaseStatsData.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'BaseStatsData',
    interfaces: []
  };
  BaseStats$BaseStatsData.prototype.component1 = function () {
    return this.str;
  };
  BaseStats$BaseStatsData.prototype.component2 = function () {
    return this.con;
  };
  BaseStats$BaseStatsData.prototype.component3 = function () {
    return this.int;
  };
  BaseStats$BaseStatsData.prototype.component4 = function () {
    return this.wil;
  };
  BaseStats$BaseStatsData.prototype.component5 = function () {
    return this.spd;
  };
  BaseStats$BaseStatsData.prototype.component6 = function () {
    return this.acc;
  };
  BaseStats$BaseStatsData.prototype.copy_43thh2$ = function (str, con, int, wil, spd, acc) {
    return new BaseStats$BaseStatsData(str === void 0 ? this.str : str, con === void 0 ? this.con : con, int === void 0 ? this.int : int, wil === void 0 ? this.wil : wil, spd === void 0 ? this.spd : spd, acc === void 0 ? this.acc : acc);
  };
  BaseStats$BaseStatsData.prototype.toString = function () {
    return 'BaseStatsData(str=' + Kotlin.toString(this.str) + (', con=' + Kotlin.toString(this.con)) + (', int=' + Kotlin.toString(this.int)) + (', wil=' + Kotlin.toString(this.wil)) + (', spd=' + Kotlin.toString(this.spd)) + (', acc=' + Kotlin.toString(this.acc)) + ')';
  };
  BaseStats$BaseStatsData.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.str) | 0;
    result = result * 31 + Kotlin.hashCode(this.con) | 0;
    result = result * 31 + Kotlin.hashCode(this.int) | 0;
    result = result * 31 + Kotlin.hashCode(this.wil) | 0;
    result = result * 31 + Kotlin.hashCode(this.spd) | 0;
    result = result * 31 + Kotlin.hashCode(this.acc) | 0;
    return result;
  };
  BaseStats$BaseStatsData.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.str, other.str) && Kotlin.equals(this.con, other.con) && Kotlin.equals(this.int, other.int) && Kotlin.equals(this.wil, other.wil) && Kotlin.equals(this.spd, other.spd) && Kotlin.equals(this.acc, other.acc)))));
  };
  BaseStats.prototype.getData = function () {
    return this.data_0;
  };
  BaseStats.prototype.setData_jo81tk$ = function (data) {
    this.data_0 = data;
  };
  function BaseStats$CombatStats(at, df, ma, md) {
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
  BaseStats$CombatStats.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'CombatStats',
    interfaces: []
  };
  BaseStats$CombatStats.prototype.component1 = function () {
    return this.at;
  };
  BaseStats$CombatStats.prototype.component2 = function () {
    return this.df;
  };
  BaseStats$CombatStats.prototype.component3 = function () {
    return this.ma;
  };
  BaseStats$CombatStats.prototype.component4 = function () {
    return this.md;
  };
  BaseStats$CombatStats.prototype.copy_5uymv4$ = function (at, df, ma, md) {
    return new BaseStats$CombatStats(at === void 0 ? this.at : at, df === void 0 ? this.df : df, ma === void 0 ? this.ma : ma, md === void 0 ? this.md : md);
  };
  BaseStats$CombatStats.prototype.toString = function () {
    return 'CombatStats(at=' + Kotlin.toString(this.at) + (', df=' + Kotlin.toString(this.df)) + (', ma=' + Kotlin.toString(this.ma)) + (', md=' + Kotlin.toString(this.md)) + ')';
  };
  BaseStats$CombatStats.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.at) | 0;
    result = result * 31 + Kotlin.hashCode(this.df) | 0;
    result = result * 31 + Kotlin.hashCode(this.ma) | 0;
    result = result * 31 + Kotlin.hashCode(this.md) | 0;
    return result;
  };
  BaseStats$CombatStats.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.at, other.at) && Kotlin.equals(this.df, other.df) && Kotlin.equals(this.ma, other.ma) && Kotlin.equals(this.md, other.md)))));
  };
  BaseStats.prototype.getCombatStats = function () {
    return this.combatStats_0;
  };
  BaseStats.prototype.setCombatStats_9v9adx$ = function (combatStats) {
    this.combatStats_0 = combatStats;
  };
  BaseStats.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'BaseStats',
    interfaces: []
  };
  function Resources() {
    this.data_0 = new Resources$ResourcesData();
  }
  Resources.prototype.setMaxHP_za3lpa$ = function (value) {
    this.data_0.hp.max.base = value;
  };
  Resources.prototype.setMaxMP_za3lpa$ = function (value) {
    this.data_0.mp.max.base = value;
  };
  Resources.prototype.setMaxSP_za3lpa$ = function (value) {
    this.data_0.sp.max.base = value;
  };
  Resources.prototype.setCurrentHP_za3lpa$ = function (value) {
    this.data_0.hp.current.base = value;
  };
  Resources.prototype.setCurrentMP_za3lpa$ = function (value) {
    this.data_0.mp.current.base = value;
  };
  Resources.prototype.setCurrentSP_za3lpa$ = function (value) {
    this.data_0.sp.current.base = value;
  };
  Resources.prototype.getMaxHP = function () {
    return ValueFunctions_getInstance().getValue_4z11p2$(this.data_0.hp.max);
  };
  Resources.prototype.getMaxMP = function () {
    return ValueFunctions_getInstance().getValue_4z11p2$(this.data_0.mp.max);
  };
  Resources.prototype.getMaxSP = function () {
    return ValueFunctions_getInstance().getValue_4z11p2$(this.data_0.sp.max);
  };
  Resources.prototype.getCurrentHP = function () {
    return ValueFunctions_getInstance().getValue_4z11p2$(this.data_0.hp.current);
  };
  Resources.prototype.getCurrentMP = function () {
    return ValueFunctions_getInstance().getValue_4z11p2$(this.data_0.mp.current);
  };
  Resources.prototype.getCurrentSP = function () {
    return ValueFunctions_getInstance().getValue_4z11p2$(this.data_0.sp.current);
  };
  Resources.prototype.getMaxHPModifiers = function () {
    return this.data_0.hp.max.modifiers;
  };
  Resources.prototype.getMaxMPModifiers = function () {
    return this.data_0.mp.max.modifiers;
  };
  Resources.prototype.getMaxSPModifiers = function () {
    return this.data_0.sp.max.modifiers;
  };
  Resources.prototype.getCurrentHPModifiers = function () {
    return this.data_0.hp.current.modifiers;
  };
  Resources.prototype.getCurrentMPModifiers = function () {
    return this.data_0.mp.current.modifiers;
  };
  Resources.prototype.getCurrentSPModifiers = function () {
    return this.data_0.sp.current.modifiers;
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
  function Resources$ResourcesData(hp, sp, mp) {
    if (hp === void 0)
      hp = new DynamicValue();
    if (sp === void 0)
      sp = new DynamicValue();
    if (mp === void 0)
      mp = new DynamicValue();
    this.hp = hp;
    this.sp = sp;
    this.mp = mp;
  }
  Resources$ResourcesData.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'ResourcesData',
    interfaces: []
  };
  Resources$ResourcesData.prototype.component1 = function () {
    return this.hp;
  };
  Resources$ResourcesData.prototype.component2 = function () {
    return this.sp;
  };
  Resources$ResourcesData.prototype.component3 = function () {
    return this.mp;
  };
  Resources$ResourcesData.prototype.copy_ayn8wi$ = function (hp, sp, mp) {
    return new Resources$ResourcesData(hp === void 0 ? this.hp : hp, sp === void 0 ? this.sp : sp, mp === void 0 ? this.mp : mp);
  };
  Resources$ResourcesData.prototype.toString = function () {
    return 'ResourcesData(hp=' + Kotlin.toString(this.hp) + (', sp=' + Kotlin.toString(this.sp)) + (', mp=' + Kotlin.toString(this.mp)) + ')';
  };
  Resources$ResourcesData.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.hp) | 0;
    result = result * 31 + Kotlin.hashCode(this.sp) | 0;
    result = result * 31 + Kotlin.hashCode(this.mp) | 0;
    return result;
  };
  Resources$ResourcesData.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.hp, other.hp) && Kotlin.equals(this.sp, other.sp) && Kotlin.equals(this.mp, other.mp)))));
  };
  Resources.prototype.getData = function () {
    return this.data_0;
  };
  Resources.prototype.setData_1efdba$ = function (data) {
    this.data_0 = data;
  };
  Resources.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Resources',
    interfaces: []
  };
  function Skills() {
    this.skillList_0 = this.initSkills_0();
  }
  function Skills$SkillData(name, check, value) {
    if (check === void 0)
      check = false;
    if (value === void 0)
      value = new Value(0);
    this.name = name;
    this.check = check;
    this.value = value;
  }
  Skills$SkillData.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'SkillData',
    interfaces: []
  };
  Skills$SkillData.prototype.component1 = function () {
    return this.name;
  };
  Skills$SkillData.prototype.component2 = function () {
    return this.check;
  };
  Skills$SkillData.prototype.component3 = function () {
    return this.value;
  };
  Skills$SkillData.prototype.copy_6a8q4y$ = function (name, check, value) {
    return new Skills$SkillData(name === void 0 ? this.name : name, check === void 0 ? this.check : check, value === void 0 ? this.value : value);
  };
  Skills$SkillData.prototype.toString = function () {
    return 'SkillData(name=' + Kotlin.toString(this.name) + (', check=' + Kotlin.toString(this.check)) + (', value=' + Kotlin.toString(this.value)) + ')';
  };
  Skills$SkillData.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.name) | 0;
    result = result * 31 + Kotlin.hashCode(this.check) | 0;
    result = result * 31 + Kotlin.hashCode(this.value) | 0;
    return result;
  };
  Skills$SkillData.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.name, other.name) && Kotlin.equals(this.check, other.check) && Kotlin.equals(this.value, other.value)))));
  };
  Skills.prototype.initSkills_0 = function () {
    var list = ArrayList_init();
    list.add_11rb$(new Skills$SkillData('Common Sense'));
    list.add_11rb$(new Skills$SkillData('Spell-Craft'));
    list.add_11rb$(new Skills$SkillData('Cartography'));
    list.add_11rb$(new Skills$SkillData('Ancient World'));
    list.add_11rb$(new Skills$SkillData('Study/Reading'));
    list.add_11rb$(new Skills$SkillData('Magic Knowledge'));
    list.add_11rb$(new Skills$SkillData('Herbology'));
    list.add_11rb$(new Skills$SkillData('Advanced Medicine'));
    list.add_11rb$(new Skills$SkillData('Detective'));
    list.add_11rb$(new Skills$SkillData('Awareness'));
    list.add_11rb$(new Skills$SkillData('Disguise'));
    list.add_11rb$(new Skills$SkillData('Puzzle'));
    list.add_11rb$(new Skills$SkillData('Sense Motive'));
    list.add_11rb$(new Skills$SkillData('Escape Artist'));
    list.add_11rb$(new Skills$SkillData('Stealth/Sneak'));
    list.add_11rb$(new Skills$SkillData('Trickery/Stealing'));
    list.add_11rb$(new Skills$SkillData('Lock Picking'));
    list.add_11rb$(new Skills$SkillData('Free Running'));
    list.add_11rb$(new Skills$SkillData('Tracking/Hunting'));
    list.add_11rb$(new Skills$SkillData('Basic Survival'));
    list.add_11rb$(new Skills$SkillData('Advanced Riding'));
    list.add_11rb$(new Skills$SkillData('Cooking'));
    list.add_11rb$(new Skills$SkillData('Beast Taming'));
    list.add_11rb$(new Skills$SkillData('Pain Tolerance'));
    list.add_11rb$(new Skills$SkillData('First Aid'));
    list.add_11rb$(new Skills$SkillData('Inspiration'));
    list.add_11rb$(new Skills$SkillData('Seduction'));
    list.add_11rb$(new Skills$SkillData('Charm'));
    list.add_11rb$(new Skills$SkillData('Speech'));
    list.add_11rb$(new Skills$SkillData('Persuasion'));
    list.add_11rb$(new Skills$SkillData('Intimidate'));
    list.add_11rb$(new Skills$SkillData('Guile'));
    list.add_11rb$(new Skills$SkillData('Composure/Calm'));
    list.add_11rb$(new Skills$SkillData('War Tactics'));
    list.add_11rb$(new Skills$SkillData('Group Management'));
    list.add_11rb$(new Skills$SkillData('Hand To Hand Combat'));
    list.add_11rb$(new Skills$SkillData('Weapons Play'));
    list.add_11rb$(new Skills$SkillData('Specialty Weapon'));
    list.add_11rb$(new Skills$SkillData('Swimming'));
    list.add_11rb$(new Skills$SkillData('Climbing'));
    return list;
  };
  Skills.prototype.getSkill_61zpoe$ = function (name) {
    var tmp$;
    tmp$ = this.skillList_0.iterator();
    while (tmp$.hasNext()) {
      var skill = tmp$.next();
      if (equals(skill.name, name)) {
        return skill;
      }
    }
    return null;
  };
  Skills.prototype.getSkill_za3lpa$ = function (index) {
    return this.skillList_0.get_za3lpa$(index);
  };
  Skills.prototype.getSkillList = function () {
    return this.skillList_0;
  };
  Skills.prototype.setSkillList_1mzfy9$ = function (list) {
    var tmp$;
    this.skillList_0.clear();
    for (tmp$ = 0; tmp$ !== list.length; ++tmp$) {
      var skill = list[tmp$];
      this.skillList_0.add_11rb$(skill);
    }
  };
  Skills.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Skills',
    interfaces: []
  };
  function Traits() {
    this.data_0 = new Traits$TraitsData();
  }
  Traits.prototype.getName = function () {
    return this.data_0.name;
  };
  Traits.prototype.setName_61zpoe$ = function (name) {
    this.data_0.name = name;
  };
  Traits.prototype.getAge = function () {
    return this.data_0.age;
  };
  Traits.prototype.setAge_za3lpa$ = function (age) {
    this.data_0.age = age;
  };
  Traits.prototype.getSpecies = function () {
    return this.data_0.species;
  };
  Traits.prototype.setSpecies_61zpoe$ = function (species) {
    this.data_0.species = species;
  };
  Traits.prototype.getClassName = function () {
    return this.data_0._class.name;
  };
  Traits.prototype.setClassName_61zpoe$ = function (name) {
    this.data_0._class.name = name;
  };
  Traits.prototype.getLevel = function () {
    return this.data_0.level;
  };
  Traits.prototype.setLevel_za3lpa$ = function (level) {
    this.data_0.level = level;
  };
  function Traits$TraitsData(name, age, species, _class, level, icon) {
    if (name === void 0)
      name = 'player';
    if (age === void 0)
      age = 0;
    if (species === void 0)
      species = 'Human';
    if (_class === void 0)
      _class = new Class();
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
  Traits$TraitsData.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'TraitsData',
    interfaces: []
  };
  Traits$TraitsData.prototype.component1 = function () {
    return this.name;
  };
  Traits$TraitsData.prototype.component2 = function () {
    return this.age;
  };
  Traits$TraitsData.prototype.component3 = function () {
    return this.species;
  };
  Traits$TraitsData.prototype.component4 = function () {
    return this._class;
  };
  Traits$TraitsData.prototype.component5 = function () {
    return this.level;
  };
  Traits$TraitsData.prototype.component6 = function () {
    return this.icon;
  };
  Traits$TraitsData.prototype.copy_46c0s2$ = function (name, age, species, _class, level, icon) {
    return new Traits$TraitsData(name === void 0 ? this.name : name, age === void 0 ? this.age : age, species === void 0 ? this.species : species, _class === void 0 ? this._class : _class, level === void 0 ? this.level : level, icon === void 0 ? this.icon : icon);
  };
  Traits$TraitsData.prototype.toString = function () {
    return 'TraitsData(name=' + Kotlin.toString(this.name) + (', age=' + Kotlin.toString(this.age)) + (', species=' + Kotlin.toString(this.species)) + (', _class=' + Kotlin.toString(this._class)) + (', level=' + Kotlin.toString(this.level)) + (', icon=' + Kotlin.toString(this.icon)) + ')';
  };
  Traits$TraitsData.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.name) | 0;
    result = result * 31 + Kotlin.hashCode(this.age) | 0;
    result = result * 31 + Kotlin.hashCode(this.species) | 0;
    result = result * 31 + Kotlin.hashCode(this._class) | 0;
    result = result * 31 + Kotlin.hashCode(this.level) | 0;
    result = result * 31 + Kotlin.hashCode(this.icon) | 0;
    return result;
  };
  Traits$TraitsData.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.name, other.name) && Kotlin.equals(this.age, other.age) && Kotlin.equals(this.species, other.species) && Kotlin.equals(this._class, other._class) && Kotlin.equals(this.level, other.level) && Kotlin.equals(this.icon, other.icon)))));
  };
  Traits.prototype.getData = function () {
    return this.data_0;
  };
  Traits.prototype.setData_51v960$ = function (data) {
    this.data_0 = data;
  };
  Traits.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Traits',
    interfaces: []
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
    this.base = base;
    this.id = generateID();
    this.modifiers = [new Modifier(), new Modifier(), new Modifier(), new Modifier(), new Modifier(), new Modifier(), new Modifier(), new Modifier(), new Modifier(), new Modifier(), new Modifier(), new Modifier(), new Modifier(), new Modifier(), new Modifier(), new Modifier(), new Modifier(), new Modifier(), new Modifier(), new Modifier()];
  }
  Value.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Value',
    interfaces: []
  };
  Value.prototype.component1 = function () {
    return this.base;
  };
  Value.prototype.copy_za3lpa$ = function (base) {
    return new Value(base === void 0 ? this.base : base);
  };
  Value.prototype.toString = function () {
    return 'Value(base=' + Kotlin.toString(this.base) + ')';
  };
  Value.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.base) | 0;
    return result;
  };
  Value.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && Kotlin.equals(this.base, other.base))));
  };
  function DynamicValue(current, max) {
    if (current === void 0)
      current = new Value(150);
    if (max === void 0)
      max = new Value(150);
    this.current = current;
    this.max = max;
  }
  DynamicValue.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'DynamicValue',
    interfaces: []
  };
  DynamicValue.prototype.component1 = function () {
    return this.current;
  };
  DynamicValue.prototype.component2 = function () {
    return this.max;
  };
  DynamicValue.prototype.copy_ewpvbe$ = function (current, max) {
    return new DynamicValue(current === void 0 ? this.current : current, max === void 0 ? this.max : max);
  };
  DynamicValue.prototype.toString = function () {
    return 'DynamicValue(current=' + Kotlin.toString(this.current) + (', max=' + Kotlin.toString(this.max)) + ')';
  };
  DynamicValue.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.current) | 0;
    result = result * 31 + Kotlin.hashCode(this.max) | 0;
    return result;
  };
  DynamicValue.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.current, other.current) && Kotlin.equals(this.max, other.max)))));
  };
  function Modifier(source, value, turns) {
    if (source === void 0)
      source = null;
    if (value === void 0)
      value = 0;
    if (turns === void 0)
      turns = 9999999;
    this.source = source;
    this.value = value;
    this.turns = turns;
    this.id = generateID();
    this.active = true;
    this.exists = false;
  }
  Modifier.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Modifier',
    interfaces: []
  };
  Modifier.prototype.component1 = function () {
    return this.source;
  };
  Modifier.prototype.component2 = function () {
    return this.value;
  };
  Modifier.prototype.component3 = function () {
    return this.turns;
  };
  Modifier.prototype.copy_hs9j5r$ = function (source, value, turns) {
    return new Modifier(source === void 0 ? this.source : source, value === void 0 ? this.value : value, turns === void 0 ? this.turns : turns);
  };
  Modifier.prototype.toString = function () {
    return 'Modifier(source=' + Kotlin.toString(this.source) + (', value=' + Kotlin.toString(this.value)) + (', turns=' + Kotlin.toString(this.turns)) + ')';
  };
  Modifier.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.source) | 0;
    result = result * 31 + Kotlin.hashCode(this.value) | 0;
    result = result * 31 + Kotlin.hashCode(this.turns) | 0;
    return result;
  };
  Modifier.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.source, other.source) && Kotlin.equals(this.value, other.value) && Kotlin.equals(this.turns, other.turns)))));
  };
  function ValueFunctions() {
    ValueFunctions_instance = this;
  }
  ValueFunctions.prototype.getValue_4z11p2$ = function (value, includeMods) {
    if (includeMods === void 0)
      includeMods = true;
    if (includeMods) {
      var a = value.base + this.getModTotalValue_1d2jpt$(value) | 0;
      return Math_0.min(a, 9999);
    }
    var a_0 = value.base;
    return Math_0.min(a_0, 9999);
  };
  ValueFunctions.prototype.getDifference_ewpvbe$ = function (value1, value2) {
    return this.getValue_4z11p2$(value1) - this.getValue_4z11p2$(value2) | 0;
  };
  ValueFunctions.prototype.getModTotalValue_1d2jpt$ = function (value) {
    var tmp$, tmp$_0;
    var temp = 0;
    tmp$ = value.modifiers;
    for (tmp$_0 = 0; tmp$_0 !== tmp$.length; ++tmp$_0) {
      var mod = tmp$[tmp$_0];
      if (mod.active)
        temp = temp + mod.value | 0;
    }
    return temp;
  };
  ValueFunctions.prototype.getModBySource_3pd7kz$ = function (value, SourceID) {
    var tmp$, tmp$_0;
    tmp$ = value.modifiers;
    for (tmp$_0 = 0; tmp$_0 !== tmp$.length; ++tmp$_0) {
      var mod = tmp$[tmp$_0];
      if (equals(mod.source, SourceID)) {
        return mod;
      }
    }
    return new Modifier('');
  };
  ValueFunctions.prototype.removeModBySource_3pd7kz$ = function (value, SourceID) {
    var mod = this.getModBySource_3pd7kz$(value, SourceID);
    return mod;
  };
  ValueFunctions.prototype.getModByID_3pd7kz$ = function (value, ID) {
    var tmp$, tmp$_0;
    tmp$ = value.modifiers;
    for (tmp$_0 = 0; tmp$_0 !== tmp$.length; ++tmp$_0) {
      var mod = tmp$[tmp$_0];
      if (equals(mod.id, ID)) {
        return mod;
      }
    }
    return new Modifier('');
  };
  ValueFunctions.prototype.removeModByID_3pd7kz$ = function (value, ID) {
    var mod = this.getModByID_3pd7kz$(value, ID);
    return mod;
  };
  ValueFunctions.$metadata$ = {
    kind: Kind_OBJECT,
    simpleName: 'ValueFunctions',
    interfaces: []
  };
  var ValueFunctions_instance = null;
  function ValueFunctions_getInstance() {
    if (ValueFunctions_instance === null) {
      new ValueFunctions();
    }
    return ValueFunctions_instance;
  }
  _.Ability = Ability;
  _.Spell = Spell;
  _.Special = Special;
  _.ClassAbility = ClassAbility;
  _.Abilities = Abilities;
  _.StatChecker = StatChecker;
  Object.defineProperty(_, 'DiceRoller', {
    get: DiceRoller_getInstance
  });
  Equipment.EquipmentData = Equipment$EquipmentData;
  _.Equipment = Equipment;
  Wearable.WearableData = Wearable$WearableData;
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
  _.setupPage_vgc0e7$ = setupPage;
  _.resetPage_vgc0e7$ = resetPage;
  _.initCharacterSheetListeners_vgc0e7$ = initCharacterSheetListeners;
  _.initTraitListener_vgc0e7$ = initTraitListener;
  _.initResourceListener_vgc0e7$ = initResourceListener;
  _.initStatListener_vgc0e7$ = initStatListener;
  _.initEquipmentListener_vgc0e7$ = initEquipmentListener;
  _.initInventoryListener_vgc0e7$ = initInventoryListener;
  _.initNavigationBar_vgc0e7$ = initNavigationBar;
  _.initButtons_vgc0e7$ = initButtons;
  _.initSlots_m4me0d$ = initSlots;
  _.initSkills_vgc0e7$ = initSkills;
  _.initItems_ejyyoj$ = initItems;
  _.insertSpellSlot_c2cup6$ = insertSpellSlot;
  _.insertSpecialSlot_z95207$ = insertSpecialSlot;
  _.insertClassSlot_m0lkjs$ = insertClassSlot;
  _.insertAbilitySlot_pvcpxe$ = insertAbilitySlot;
  _.deleteSpellSlot_agn7bs$ = deleteSpellSlot;
  _.deleteSpecialSlot_agn7bs$ = deleteSpecialSlot;
  _.deleteClassSlot_agn7bs$ = deleteClassSlot;
  _.insertItemSlot_hx33od$ = insertItemSlot;
  _.createItemSlot_hx33od$ = createItemSlot;
  _.deleteItemSlot_9wgxw$ = deleteItemSlot;
  Inventory.InventoryData = Inventory$InventoryData;
  _.Inventory = Inventory;
  _.Item = Item;
  _.main = main;
  _.tempSheetLogic_vgc0e7$ = tempSheetLogic;
  _.generateID = generateID;
  _.Player = Player;
  BaseStats.BaseStatsData = BaseStats$BaseStatsData;
  BaseStats.CombatStats = BaseStats$CombatStats;
  _.BaseStats = BaseStats;
  Resources.ResourcesData = Resources$ResourcesData;
  _.Resources = Resources;
  Skills.SkillData = Skills$SkillData;
  _.Skills = Skills;
  Traits.TraitsData = Traits$TraitsData;
  _.Traits = Traits;
  _.Class = Class;
  _.Value = Value;
  _.DynamicValue = DynamicValue;
  _.Modifier = Modifier;
  Object.defineProperty(_, 'ValueFunctions', {
    get: ValueFunctions_getInstance
  });
  main();
  Kotlin.defineModule('DemigodApp', _);
  return _;
}(typeof DemigodApp === 'undefined' ? {} : DemigodApp, kotlin);
