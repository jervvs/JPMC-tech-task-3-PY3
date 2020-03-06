import { ServerRespond } from './DataStreamer';

export interface Row {
  price_ABC: number,
  price_DEF: number,
  ratio:number,
  timestamp: Date,
  upperbound: number,
  lowerbound: number
  trigger_alert: number | undefined,
}


export class DataManipulator {
  static generateRow(serverResponds: ServerRespond[]): Row[] {
    const price_ABC = (serverResponds[0].top_ask.price + serverResponds[0].top_bid.price)/2;
    const price_DEF = (serverResponds[1].top_ask.price + serverResponds[1].top_bid.price)/2;
    const ratio = price_ABC/price_DEF;
    const upperbound = 1 + 0.05;
    const lowerbound = 1 - 0.05;
    return {
      price_ABC,
      price_DEF,
      ratio,
      timestamp: serverResponds[0].timestamp > serverResponds[1].timestamp ? serverResponds[0].timestamp : serverResponds[1].timestamp,
      upperbound,
      lowerbound,
      trigger_alert: (ratio>upperbound || ratio < lowerbound) ? ratio: undefined,
    };
  }
}
