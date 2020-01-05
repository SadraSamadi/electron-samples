import {Container} from 'inversify';
import {buildProviderModule} from 'inversify-binding-decorators';
import getDecorators from 'inversify-inject-decorators';

export const container = new Container({
	autoBindInjectable: true
});

let provider = buildProviderModule();
container.load(provider);

export const {lazyInject} = getDecorators(container);
