import 'App.css';
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'assets/css/styles.css';
import { auth, config } from 'helpers';
import Header from 'components/layouts/Header';
import Container from 'components/layouts/Container';
import { Menu } from 'components/layouts/Navigator';
import { UserRole } from 'config/UserType';
import { handleMenuVisible } from 'routes/handler';
import Router from 'routes/Router';
import { User } from './utils/auth';

function App() {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [authUser, setAuthUser] = useState<User | null>(null);
  const [menu, setMenu] = useState<Menu>(config.layouts.menu);

  useEffect(() => {
    const htmlTitle = document.querySelector('title');
    if (htmlTitle) {
      htmlTitle.innerHTML = config.app.name || 'title';
    }

    const user = auth.user();
    setIsLogin(auth.isLogin());
    setAuthUser(auth.user());

    let userType = user?.role;
    switch (userType) {
      case UserRole.ADMIN:
        userType = 'ADMIN';
        break;
      default:
        auth.logout();
        break;
    }

    const updateMenu = Object.assign({}, menu);
    updateMenu.header = userType as string;
    setMenu(updateMenu);
  }, []);

  return (
    <div className="sb-nav">
      <Header
        appName={config.app.name as string}
        isLogin={isLogin}
        dropDownMenu={config.layouts.header.dropDownMenu}
        userName={authUser?.username || ''}
      />
      <Container
        menu={handleMenuVisible(menu)}
        isLogin={isLogin}
        footer={config.layouts.footer}
      >
        <Router isLogin={isLogin} authUser={authUser} />
      </Container>
    </div>
  );
}

export default App;
