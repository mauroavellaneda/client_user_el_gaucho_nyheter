const stubLocation = (options) => ({
  onBeforeLoad(win) {
    const stubLocation = {
      coords: {
        latitude: options.latitude,
        longitude: options.longitude,
      },
    };
    cy.stub(win.navigator.geolocation, "getCurrentPosition").callsFake(
      (callback) => {
        return callback(stubLocation);
      }
    );
  },
});
export default stubLocation;
