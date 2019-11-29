const {Shop, Item} = require('../src/gilded_rose');

describe('Gilded Rose', function() {
  it('should foo', function() {
    const gildedRose = new Shop([new Item('foo', 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe('foo');
  });

  it(`items should have a SellIn value which denotes
      the number of days we have to sell the item`, () => {
    const item = new Item('foo', 0, 0);
    expect(item).toHaveProperty('sellIn');
  });

  it('All items have a Quality value which denotes how valuable the item is', () => {
    const item = new Item('foo', 0, 0);
    expect(item).toHaveProperty('quality');
  });

  it('At the end of each day our system lowers both values for every item', () => {
    const initQuality = 20;
    const initSellIn = 10;
    const gildedRose = new Shop([new Item('My product', initSellIn, initQuality)]);
    const result = gildedRose.updateQuality();
    expect(result[0].quality).toBeLessThan(initQuality);
    expect(result[0].sellIn).toBeLessThan(initSellIn);
  });

  it('Quality should never be negative', () => {
    const gildedRose = new Shop([new Item('My product', 1, 1)]);
    gildedRose.updateQuality();
    gildedRose.updateQuality();
    const result = gildedRose.updateQuality();
    expect(result[0].quality).not.toBeLessThan(0);
  });

  it('Quality should decrease twice when sellIn is expired (equal 0)', () => {
    const initQuality = 48;
    const expectedQuality = 46;
    const gildedRose = new Shop([new Item('My product', 0, initQuality)]);
    const result = gildedRose.updateQuality();
    expect(result[0].quality).toEqual(expectedQuality);
  });

  it('"Sulfuras, Hand of Ragnaros" never has to be sold or decreases in Quality', () => {
    const initQuality = 20;
    const initSellIn = 10;
    const gildedRose = new Shop([new Item('Sulfuras, Hand of Ragnaros', initSellIn, initQuality)]);
    const result = gildedRose.updateQuality();
    expect(result[0].quality).toEqual(initQuality);
    expect(result[0].sellIn).toEqual(initSellIn);
  });
});
