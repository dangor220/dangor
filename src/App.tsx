import './i18n/i18n';

import Background from './components/Background';
import Header from './components/Header';

import 'normalize.css';
import './scss/app.scss';
import Preview from './components/Preview';

export default function App(): React.ReactNode {
  return (
    <>
      <Header />
      <Preview />
      <Background />
    </>
  );
}
