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
});
