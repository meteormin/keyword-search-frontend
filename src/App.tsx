import 'App.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'assets/css/styles.css';
import { auth, config } from 'helpers';
import Header from 'components/layouts/Header';
import Container from 'components/layouts/Container';
import { UserRole } from 'config/UserType';
import { handleMenuVisible } from 'routes/handler';
import Router from 'routes/Router';

function App() {
    const htmlTitle = document.querySelector('title');
    if (htmlTitle) {
        htmlTitle.innerHTML = config.app.name || 'title';
    }

    const user = auth.user();
    const isLogin = auth.isLogin();

    let userType = user?.role;
    switch (userType) {
        case UserRole.ADMIN:
            userType = 'ADMIN';
            break;
        default:
            auth.logout();
            break;
    }

    const updateMenu = Object.assign({}, config.layouts.menu);
    updateMenu.header = userType as string;

    return (
        <div className="sb-nav">
            <Header
                appName={config.app.name as string}
                isLogin={isLogin}
                dropDownMenu={config.layouts.header.dropDownMenu}
                userName={user?.username || ''}
            />
            <Container
                menu={handleMenuVisible(updateMenu)}
                isLogin={isLogin}
                footer={config.layouts.footer}
            >
                <Router isLogin={isLogin} authUser={user} />
            </Container>
        </div>
    );
}

export default App;
