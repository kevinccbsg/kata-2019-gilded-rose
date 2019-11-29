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
});
