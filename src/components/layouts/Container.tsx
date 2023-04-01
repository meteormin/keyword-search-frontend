import React, { Fragment } from 'react';
import Loading from 'components/common/Loading';
import AlertModal from 'components/modals/AlertModal';
import Footer from 'components/layouts/Footer';
import { guard } from 'helpers';
import Navigator, { Menu } from 'components/layouts/Navigator';

export interface ContainerProps {
    isLogin: boolean;
    menu: Menu;
    children: React.ReactNode | React.ReactNode[];
    footer: ContainerFooter;
}

export interface ContainerFooter {
    company: string;
    privacyUrl: string;
    termsUrl: string;
}

const Container = ({ isLogin, menu, footer, children }: ContainerProps) => {
    const year = new Date().getFullYear().toString();
    return (
        <Fragment>
            {/* 로그인 상태 */}
            <guard.Protected auth={isLogin}>
                <div id="layoutSidenav">
                    <Navigator menu={menu as Menu} />
                    <div id="layoutSidenav_content">
                        <main>
                            {children}
                            <Loading />
                            <AlertModal />
                        </main>
                        <Footer year={year} {...footer} />
                    </div>
                </div>
            </guard.Protected>
            {/* 로그인 X */}
            <guard.Restricted condition={isLogin}>
                <div id="layoutAuthentication">
                    <div id="layoutAuthentication_content">
                        <main>
                            {children}
                            <Loading />
                            <AlertModal />
                        </main>
                    </div>
                    <Footer year={year} {...footer} />
                </div>
            </guard.Restricted>
        </Fragment>
    );
};

export default Container;
