import './i18n/i18n';

import Header from './components/Header';

import 'normalize.css';
import './scss/app.scss';

export default function App(): React.ReactNode {
  return (
    <>
      <div className="background"></div>
      <Header />
    </>
  );
}
