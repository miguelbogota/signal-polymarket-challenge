import { describe, it, expect } from 'vitest';
import { marketsService } from './markets.service';
import { mockedMarkets } from './mocked-markets';

describe('markets', () =>
  it('filters the provided Gamma-shaped mock markets', async () => {
    const results = await marketsService.getMarkets({ search: 'Xi Jinping' });
    expect(results[0].id).toBe(mockedMarkets[0].id);
  }));

describe('Gamma market helpers', () => {
  it("parses Polymarket's serialized outcome prices", () => {
    expect(marketsService.getYesPrice(mockedMarkets[0])).toBe(5);
  });

  it('returns the strongest one-day movements', async () => {
    expect((await marketsService.getTrendingMarkets()).length).toBeGreaterThan(
      0,
    );
  });
});
