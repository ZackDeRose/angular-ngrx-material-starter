import { Stock, StockMarketState } from './stock-market.model';
import { HttpErrorResponse } from '@angular/common/http';
import { stockMarketReducer, initialState } from './stock-market.reducer';
import {
  StockMarketActions,
  ActionStockMarketRetrieve,
  ActionStockMarketRetrieveError,
  ActionStockMarketRetrieveSuccess
} from './stock-market.actions';

const originalState = {
  symbol: 'LCLT',
  loading: false,
  stock: {
    symbol: 'LCLT',
    exchange: 'TestExchange',
    last: '1.00',
    ccy: 'USD',
    change: '+0.05',
    changePositive: true,
    changeNegative: false,
    changePercent: '+5%'
  }
} as StockMarketState;

describe('StockMarketReducer', () => {
  describe('undefined action', () => {
    describe('with undefined original state', () => {
      it('should return the initial state', () => {
        const action = {} as StockMarketActions;
        const state = stockMarketReducer(undefined, action);

        expect(state).toBe(initialState);
      });
    });

    describe('with a valid original state', () => {
      it('should return the original state', () => {
        const action = {} as StockMarketActions;
        const state = stockMarketReducer(originalState, action);

        expect(state).toBe(originalState);
      });
    });
  });

  describe('RETRIEVE action', () => {
    it('should reflect that it has started loading the provided symbol', () => {
      const action = new ActionStockMarketRetrieve({ symbol: 'AEONS' });
      const state = stockMarketReducer(originalState, action);

      expect(state.loading).toBeTruthy();
      expect(state.stock).toBeNull();
      expect(state.error).toBeNull();
      expect(state.symbol).toBe(action.payload.symbol);
    });
  });

  describe('RETRIEVE_ERROR action', () => {
    it('should reflect the Error that occured', () => {
      const error = new HttpErrorResponse({});
      const action = new ActionStockMarketRetrieveError({ error: error });
      const state = stockMarketReducer(originalState, action);

      expect(state.symbol).toBe(state.symbol);
      expect(state.loading).toBeFalsy();
      expect(state.stock).toBeNull();
      expect(state.error).toBe(error);
    });
  });

  describe('RETRIEVE_SUCCESS action', () => {
    it('should reflect the retrieved information', () => {
      const stock = {
        symbol: 'AEONS',
        exchange: 'TestExchange2',
        last: '2.00',
        ccy: 'USD',
        change: '+0.10',
        changePositive: true,
        changeNegative: false,
        changePercent: '+5%'
      } as Stock;
      const action = new ActionStockMarketRetrieveSuccess({ stock: stock });
      const state = stockMarketReducer(originalState, action);

      expect(state.loading).toBeFalsy();
      expect(state.stock).toBe(stock);
      expect(state.error).toBeNull();
      expect(state.symbol).toBe(state.symbol);
    });
  });
});
