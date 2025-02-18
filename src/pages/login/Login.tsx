import { Github } from "@styled-icons/boxicons-logos";
import { observer } from "mobx-react-lite";
import { Helmet } from "react-helmet";
import { Link, Route, Switch } from "react-router-dom";

import styles from "./Login.module.scss";
import { Text } from "preact-i18n";

import { useApplicationState } from "../../mobx/State";

import wideSVG from "/assets/wide.svg";

import LocaleSelector from "../../components/common/LocaleSelector";
import { Titlebar } from "../../components/native/Titlebar";
import { useSystemAlert } from "../../updateWorker";
import { StatusBar } from "../RevoltApp";
import { FormCreate } from "./forms/FormCreate";
import { FormLogin } from "./forms/FormLogin";
import { FormReset, FormSendReset } from "./forms/FormReset";
import { FormResend, FormVerify } from "./forms/FormVerify";

export default observer(() => {
    const state = useApplicationState();
    const theme = state.settings.theme;

    const alert = useSystemAlert();

    return (
        <>
            {window.isNative && !window.native.getConfig().frame && (
                <Titlebar overlay />
            )}
            {alert && (
                <StatusBar>
                    <div className="title">{alert.text}</div>
                    <div className="actions">
                        {alert.actions?.map((action) =>
                            action.type === "internal" ? null : action.type ===
                              "external" ? (
                                <a
                                    href={action.href}
                                    target="_blank"
                                    rel="noreferrer">
                                    <div className="button">{action.text}</div>{" "}
                                </a>
                            ) : null,
                        )}
                    </div>
                </StatusBar>
            )}
            <div className={styles.login}>
                <Helmet>
                    <meta
                        name="theme-color"
                        content={theme.getVariable("background")}
                    />
                </Helmet>
                <div className={styles.content}>
                    <div className={styles.nav}>
                        <a className={styles.logo}>
                            {!("native" in window) && (
                                <img src={wideSVG} draggable={false} />
                            )}
                        </a>
                        <LocaleSelector />
                    </div>
                    {/*<div className={styles.middle}>*/}
                    <div className={styles.form}>
                        {/*<div style={styles.version}>
                            API: <code>{configuration?.revolt ?? "???"}</code>{" "}
                            &middot; revolt.js: <code>{LIBRARY_VERSION}</code>{" "}
                            &middot; App: <code>{APP_VERSION}</code>
                        </div>*/}
                        <Switch>
                            <Route path="/login/create">
                                <FormCreate />
                            </Route>
                            <Route path="/login/resend">
                                <FormResend />
                            </Route>
                            <Route path="/login/verify/:token">
                                <FormVerify />
                            </Route>
                            <Route path="/login/reset/:token">
                                <FormReset />
                            </Route>
                            <Route path="/login/reset">
                                <FormSendReset />
                            </Route>
                            <Route path="/">
                                <FormLogin />
                            </Route>
                        </Switch>
                    </div>
                    {/*<div className={styles.loginQR}></div>*/}
                    {/*</div>*/}
                    <div className={styles.bottom}>
                        <div className={styles.links}>
                            <div className={styles.socials}>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
});
