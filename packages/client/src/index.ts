import './styles/main.css';
import App from './components/App';
import initPolyfills from './utils/polyfills';

import { ArrayHelper } from '@felixgrohs/common';

ArrayHelper.asyncMap([1, 2, 3], async x => x + 1).then(console.log);

initPolyfills();

export default App;
