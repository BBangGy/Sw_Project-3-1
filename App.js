import React from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Header from "./components/Header";
import LoginForm from "./components/LoginForm";
import SearchForm from "./components/SearchForm";
import SearchResult from "./components/SearchResult";
import store from "./Store.js";
import Tabs, { TabType } from "./components/Tabs.js";
import KeywordList from "./components/KeywordList.js";
import HistoryList from "./components/HistoryList.js";

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            searchKeyword: "",
            searchResult: [],
            submitted: false,
            loggedIn: false,
            id: "",
            password: "",
            selectedTab: TabType.KEYWORD,
        };
    }

    handleChangeInput(searchKeyword) {
        if (searchKeyword.length <= 0) {
            this.handleReset();
        }
        this.setState({ searchKeyword });
    }

    handleLogin (id, password) {
        if (id === "1234" && password === "1234") {
            this.setState({ loggedIn: true });
        }
    };

    search(searchKeyword) {
        const searchResult = store.search(searchKeyword);
        this.setState({
            searchKeyword,
            searchResult,
            submitted: true,
        });
    }

    handleReset() {
        this.setState({
            searchKeyword: "",
            searchResult: [],
            submitted: false,
        });
    }

    render() {
        const { searchKeyword, searchResult, submitted, selectedTab, loggedIn, id, password } = this.state;

        return (
            <Router>
                <Header title="World Food Search" />
                <Switch>
                    <Route exact path="/">
                        {!loggedIn ? (
                            <div className="container">
                                <LoginForm
                                    onSubmit={(id, password) => this.handleLogin(id, password)}
                                    onReset={() => this.handleReset()}
                                />
                            </div>
                        ) : (
                            <Redirect to="/search" />
                        )}
                    </Route>
                    <Route path="/search">
                        {!loggedIn ? (
                            <Redirect to="/" />
                        ) : (
                            <div className="container">
                                <SearchForm
                                    value={searchKeyword}
                                    onChange={(value) => this.handleChangeInput(value)}
                                    onSubmit={() => this.search(searchKeyword)}
                                    onReset={() => this.handleReset()}
                                />
                                <div className="content">
                                    {submitted ? (
                                        <SearchResult data={searchResult} />
                                    ) : (
                                        <>
                                            <Tabs
                                                selectedTab={selectedTab}
                                                onChange={(selectedTab) => this.setState({ selectedTab })}
                                            />
                                            {selectedTab === TabType.KEYWORD && (
                                                <KeywordList onClick={(keyword) => this.search(keyword)} />
                                            )}
                                            {selectedTab === TabType.HISTORY && (
                                                <HistoryList onClick={(keyword) => this.search(keyword)} />
                                            )}
                                        </>
                                    )}
                                </div>
                            </div>
                        )}
                    </Route>
                </Switch>
            </Router>
        );
    }
}


