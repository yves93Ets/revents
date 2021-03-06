import React from "react";
import { Grid } from "semantic-ui-react";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import SettingsNav from "./SettingsNav";
import BasicPage from "./BasicPage";
import AboutPage from "./AboutPage";
import PhotosPage from "./PhotosPage";
import AccountPage from "./AccountPage";
import { updatePassword } from "../../auth/authActions";
import { updateProfile } from "../userActions";

const actions = {
  updatePassword,
  updateProfile
};
const mapState = state => ({
  providerId: state.firebase.auth.providerData[0].providerId,
  user: state.firebase.profile
});
const SettingsDashboard = ({
  updatePassword,
  providerId,
  user,
  updateProfile
}) => {
  return (
    <Grid>
      <Grid.Column width={12}>
        <Switch>
          <Redirect exact from="/settings" to="/settings/basic" />
          <Route
            path="/settings/basic"
            render={() => (
              <BasicPage intilaValues={user} updateProfile={updateProfile} />
            )}
          />
          <Route
            path="/settings/about"
            render={() => (
              <AboutPage intilaValues={user} updateProfile={updateProfile} />
            )}
          />
          <Route
            path="/settings/photo"
            render={() => (
              <PhotosPage intilaValues={user} updateProfile={updateProfile} />
            )}
          />
          <Route
            path="/settings/account"
            render={() => (
              <AccountPage
                updatePassword={updatePassword}
                providerId={providerId}
              />
            )}
          />
        </Switch>
      </Grid.Column>
      <Grid.Column width={4}>
        <SettingsNav />
      </Grid.Column>
    </Grid>
  );
};

export default connect(
  mapState,
  actions
)(SettingsDashboard);
