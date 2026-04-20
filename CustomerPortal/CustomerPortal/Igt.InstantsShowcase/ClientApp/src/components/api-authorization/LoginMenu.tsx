import * as React from "react";
import { Link } from "react-router-dom";
import authService from "./AuthorizeService";
import { ApplicationPaths } from "./ApiAuthorizationConstants";

//Styles
import { NavLink } from "../NavMenu.styles";
import "../NavMenu_Stylesheet.css";
import { Token } from "../../shared/utils/Token";
import { userCanAnalytics } from "../../shared/utils/functions";

interface IProps {}

interface IState {
  isAuthenticated: boolean;
  userName: string | null;
  user: any;
}

export default class LoginMenu extends React.Component<IProps, IState> {
  token = new Token();
  _subscription: any;
  private user = JSON.parse(localStorage.getItem("user") || "{}");

  constructor(props: IProps) {
    super(props);

    this.state = {
      isAuthenticated: false,
      userName: null,
      user: null,
    };
  }

  componentDidMount() {
    this._subscription = authService.subscribe(() => this.populateState());
    this.populateState();
  }

  componentWillUnmount() {
    authService.unsubscribe(this._subscription);
  }

  async populateState() {
    const [isAuthenticated, user] = await Promise.all([
      authService.isAuthenticated(),
      authService.getUser(),
    ]);
    this.setState({
      isAuthenticated,
      userName: user && user.name,
      user: user,
    });
  }
//if user is sucessfully logged in, this is their view
  authenticatedView(userName: string, profilePath: string, logoutPath: any) {
    return (
        <>
        <ul>
        <Link to="">
            HOME
        </Link>
        <Link to="/showroom">
            SHOWROOM
        </Link>
        {userCanAnalytics(userName) ? (
            <Link to="/analytics">
                ANALYTICS
            </Link>
        ) : (
                        <>
                        </>
                )
            }

        <div className="LogoutDropDown">                
            <span>LOGOUT</span>
                    <span>
                        <div>
                            <h1 style={{ padding: "0.1rem" }}>{this.user?.profile?.name}</h1>
                            <a href="/Identity/Account/Manage/ChangePassword">
                                <strong>MY ACCOUNT</strong>
                            </a>
                            <p>
                                <a href="/Identity/Account/Manage/ChangePassword">CHANGE PASSWORD</a>
                            </p>
                            <Link to={logoutPath}>
                                LOGOUT
                            </Link>
                        </div>
            </span>
        </div>
        </ul>
      </>
    );
  }
//if User is NOT logged in, this is their view
  anonymousView(registerPath: any, loginPath: any) {
    return (
        <>
            <ul>
                <Link to={loginPath}>
                    LOGIN
                </Link>
                
            </ul>
        </>
    );
  }

  render() {
    const { isAuthenticated, userName, user } = this.state;
    const registerPath = `${ApplicationPaths.Register}`;
    const loginPath = `${ApplicationPaths.Login}`;
    const profilePath = `${ApplicationPaths.Profile}`;
    const logoutPath = {
      pathname: `${ApplicationPaths.LogOut}`,
      state: { local: true },
    };

    return (
      <>
        {isAuthenticated
          ? this.authenticatedView(userName ?? "", profilePath, logoutPath)
          : this.anonymousView(registerPath, loginPath)}
      </>
    );
  }
}
