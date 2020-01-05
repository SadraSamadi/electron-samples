import '../src/main/init';
import {Client} from '../src/renderer/app/client';
import {container} from '../src/renderer/app/ioc';

it('should inject client', () => {
	let client = container.get(Client);
	expect(client).toBeInstanceOf(Client);
});
