import { Link } from "react-router-dom";
import LoginPage from "../features/counter/auth/LoginPage";

const Public = () => {
  const content = (
    <section className="public">
      <div className="logo" style={{ width: "10rem" }}>
        <Link className="nav-link" to="/">
          <img
            className="h-8 md:h-10 self-center"
            src="https://meet.dolphinvc.com/console/static/media/logo.ef0825c5.svg"
            alt="logo"
          />
        </Link>
      </div>
      <header>
        <h1 className="amplify-tabs-item">Welcome to Dolphin video app</h1>
      </header>
      <main>
        <LoginPage />
      </main>
      {/* <footer>
        <Link to="/login">Login</Link>
        <br />
        <Link to="/singUp">Sing Up</Link>
      </footer> */}
    </section>
  );
  return content;
};
export default Public;
