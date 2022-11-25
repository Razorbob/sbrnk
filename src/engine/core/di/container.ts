import { find } from 'lodash';

export interface IContainerProvider {
    useValue: any;
    token: string;
}
  
export class Container {
  private _providers: { [key: string]: any } = {};

  public resolve(token: string) {
    const matchedProvider = find(
      this._providers,
      (_provider, key) => key === token
    );

    if (matchedProvider) {
      return matchedProvider;
    } else {
      throw new Error(`No provider found for ${token}!`);
    }
  }

  public get providers():{ [key: string]: any }{
    return this._providers
  }

  public provide(details: IContainerProvider): void {
    this.providers[details.token] = details.useValue;
  }
}

export const container = new Container();