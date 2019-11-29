class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  constructor(items=[]){
    this.items = items;
    this.exceptions = [
      'Backstage passes to a TAFKAL80ETC concert',
      'Sulfuras, Hand of Ragnaros',
      'Aged Brie',
      'Conjured',
    ];
    this.qualityOperator = 1;
    this.sellInOperator = 1;
    this.qualityLimit = 50;
    this.backstageDeadline = 0;
    this.backstagePromo1 = 5;
    this.backstagePromo2 = 10;
  }

  expiredItem(item) {
    if (item.sellIn <= 0) return true;
    return false
  }

  setQualityOperator(value) {
    this.qualityOperator = value;
  }

  commonItem(item) {
    if (this.exceptions.includes(item.name)) return item;
    if (this.expiredItem(item)) this.setQualityOperator(this.qualityOperator * 2);
    if (item.quality === 0) this.setQualityOperator(0);
    return {
      ...item,
      quality: item.quality - this.qualityOperator,
      sellIn: item.sellIn - this.sellInOperator,
    };
  }

  sulfuras(item) {
    if (this.exceptions[1] !== item.name) return item;
    return {
      ...item,
      quality: 80,
      sellIn: item.sellIn,
    };
  }

  agedBrie(item) {
    if (this.exceptions[2] !== item.name) return item;
    if (item.quality === this.qualityLimit) this.setQualityOperator(0);
    return {
      ...item,
      quality: item.quality + this.qualityOperator,
      sellIn: item.sellIn - this.sellInOperator,
    };
  }

  backstage(item) {
    if (this.exceptions[0] !== item.name) return item;
    if (item.sellIn === this.backstageDeadline) return { ...item, quality: 0 };
    if (item.sellIn <= this.backstagePromo2) this.setQualityOperator(2);
    if (item.sellIn <= this.backstagePromo1) this.setQualityOperator(3);
    return {
      ...item,
      quality: item.quality + this.qualityOperator,
      sellIn: item.sellIn - this.sellInOperator,
    };
  }

  conjured(item) {
    if (this.exceptions[3] !== item.name) return item;
    this.setQualityOperator(2);
    return {
      ...item,
      quality: item.quality - this.qualityOperator,
      sellIn: item.sellIn - this.sellInOperator,
    };
  }

  updateQuality() {
    this.items = this.items
    .map(this.commonItem.bind(this))
    .map(this.sulfuras.bind(this))
    .map(this.agedBrie.bind(this))
    .map(this.backstage.bind(this))
    .map(this.conjured.bind(this));
    return this.items;
  }
}

module.exports = {
  Item,
  Shop
}
