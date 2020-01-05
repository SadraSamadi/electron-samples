import {injectable} from 'inversify';
import axios from 'axios';
import {BehaviorSubject, Observable} from 'rxjs';

@injectable()
export class Client {

	private _users = new BehaviorSubject<any[]>([]);

	public load(): Promise<any> {
		Promise.resolve()
			.then(() => new WeakMap());
		return axios.get('https://jsonplaceholder.typicode.com/users')
			.then(res => this._users.next(res.data));
	}

	public users(): Observable<any[]> {
		return this._users.asObservable();
	}

}
