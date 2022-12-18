import 'App.css';
import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'assets/css/styles.css';
import { auth, config } from 'helpers';
import Header from 'components/layouts/Header';
import Container from 'components/layouts/Container';
import { Menu } from 'components/layouts/Navigator';
import { UserType } from 'config/UserType';
import { handleMenuVisible } from 'routes/handler';
import Router from 'routes/Router';

function App() {
  useEffect(() => {
    const htmlTitle = document.querySelector('title');
    if (htmlTitle) {
      htmlTitle.innerHTML = config.app.name || 'title';
    }
  });

  const menu: Menu = config.layouts.menu;

  let userType = auth.user()?.userType;

  switch (userType) {
    case UserType.ADMIN:
      userType = 'ADMIN';
      break;
    default:
      auth.logout();
      break;
  }

  menu.header = userType as string;

  return (
    <div className="sb-nav">
      <Header
        appName={config.app.name as string}
        isLogin={auth.isLogin()}
        dropDownMenu={config.layouts.header.dropDownMenu}
        userName={auth.user()?.loginId || ''}
      />
      <Container
        menu={handleMenuVisible(menu as Menu)}
        isLogin={auth.isLogin()}
        footer={config.layouts.footer}
      >
        <Router />
      </Container>
    </div>
  );
}

export default App;
