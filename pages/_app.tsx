import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import App from 'next/app';
import Head from 'next/head';
import Router from 'next/router';

import PageChange from 'components/PageChange/PageChange';

import '@fortawesome/fontawesome-free/css/all.min.css';
import 'styles/tailwind.css';
import { Provider } from 'react-redux';
import store from "../redux/store";
import { createWrapper } from "next-redux-wrapper";

// Remove routeChangeStart and routeChangeComplete event handlers

class MyApp extends App {

    componentDidMount() {
        // Create a comment in the DOM
        let comment = document.createComment(`
===============================================================
* Finanças em Dia - Sistema Integrado de Gestão de Microcrédito
===============================================================

* Coded by Marcos Fabião Chichava

==============================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

`);
        document.insertBefore(comment, document.documentElement);
    }

    render() {
        const { Component, pageProps } = this.props;

        // Use a simple functional component for Layout
        const Layout = Component.layout || (({ children }) => <>{children}</>);

        return (
            <React.Fragment>
                <Head>
                    <meta
                        name="viewport"
                        content="width=device-width, initial-scale=1, shrink-to-fit=no"
                    />
                    <title>Finanças em Dia</title>
                    <link
                        href="https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700&display=swap"
                        rel="stylesheet"
                    />
                </Head>
                <Provider store={store}>
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </Provider>
            </React.Fragment>
        );
    }
}

const makeStore = () => store
const wrapper = createWrapper(makeStore)
export default wrapper.withRedux(MyApp)
